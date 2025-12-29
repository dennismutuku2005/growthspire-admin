"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Image from "next/image"
import Cookies from "js-cookie"
import CustomToast from "@/components/customtoast"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [identifier, setIdentifier] = useState("") // username or mobile
  const [password, setPassword] = useState("")
  const [showLoadingScreen, setShowLoadingScreen] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true) // New state to track auth check

  // Custom toast states
  const [toast, setToast] = useState({
    message: "",
    type: "error", // 'success' or 'error'
    isVisible: false
  })

  const router = useRouter()

  // Custom toast function
  const showToast = (message, type = "error") => {
    setToast({
      message,
      type,
      isVisible: true
    })

    // Auto hide after 5 seconds
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }))
    }, 5000)
  }

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }))
  }

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const cookieData = Cookies.get("user_data")
        if (cookieData) {
          // Parse the cookie to validate it's proper JSON
          JSON.parse(cookieData)
          setShowLoadingScreen(true)
          setTimeout(() => {
            router.push("/dashboard")
          }, 1000)
          return
        }
      } catch (err) {
        console.error("Cookie parsing error:", err)
        // If cookie is corrupted, remove it
        Cookies.remove("user_data")
      }

      // If no valid user data, show login page
      setIsCheckingAuth(false)
    }

    checkAuthStatus()
  }, [router])

  const handleLogin = async () => {
    if (!identifier || !password) {
      showToast("Please fill in all fields", "error")
      return
    }

    setIsLoading(true)
    setShowLoadingScreen(true)

    // Build payload dynamically (if digits → mobile, else → username)
    const payload = /^\d+$/.test(identifier)
      ? { mobile: identifier, password }
      : { username: identifier, password }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const contentType = res.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON")
      }

      const data = await res.json()
      console.log("🔑 Login Response:", data)

      if (!res.ok) {
        showToast(data.message || "❌ Login failed", "error")
        setShowLoadingScreen(false)
        return
      }

      if (data.success) {
        if (rememberMe) {
          Cookies.set("user_data", JSON.stringify(data), { expires: 7 })
        } else {
          Cookies.set("user_data", JSON.stringify(data), { expires: 1 })
        }

        showToast("✅ Login successful!", "success")
        // Keep loading screen visible while redirecting
        setTimeout(() => router.push("/dashboard"), 2000)
      } else {
        showToast(data.message || "❌ Login failed", "error")
        setShowLoadingScreen(false)
      }
    } catch (err) {
      console.error("❌ Login error:", err)
      showToast("Something went wrong. Please try again.", "error")
      setShowLoadingScreen(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading screen while checking authentication or during login
  if (isCheckingAuth || showLoadingScreen) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <div className="relative mx-auto w-16 h-16">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            {/* Animated ring */}
            <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
          </div>
          <div className="text-sm text-gray-600">
            {isCheckingAuth ? "Checking authentication..." : "Signing you in..."}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Custom Toast Component */}
      <CustomToast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      <div className="min-h-screen flex bg-gray-50">
        {/* Left Side */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md space-y-6">

            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="text-center pb-6 pt-5">
                <Image src="/logo.png" alt="One Network Logo" width={70} height={30} className="mx-auto mb-2" />

                <p className="text-sm text-gray-500">Sign in with your account</p>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <div className="space-y-4">
                  {/* Username or Mobile */}
                  <div className="space-y-2">
                    <Label htmlFor="identifier" className="text-sm font-medium text-gray-700">Username or Mobile</Label>
                    <Input
                      id="identifier"
                      type="text"
                      placeholder="Enter your username or mobile"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pr-12 h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 rounded-md"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center space-x-2.5">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(val) => setRememberMe(!!val)}
                        className="h-5 w-5 border-2 border-gray-300 rounded text-blue-600 focus:ring-2 focus:ring-blue-500 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <Label htmlFor="remember" className="text-sm font-medium text-gray-700 cursor-pointer">
                        Remember me
                      </Label>

                    </div>
                    <Button type="button" variant="link" className="text-sm text-blue-600 hover:text-blue-700 font-medium p-0 h-auto">
                      Forgot password?
                    </Button>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg mt-6 shadow-sm transition-all duration-200 hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={handleLogin}
                  >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : "Sign in"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <p className="text-center text-xs text-gray-500">© 2024 One Network. All rights reserved.</p>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="hidden lg:flex flex-1 relative">
          <Image src="/sideimage.png" alt="Network dashboard illustration" fill className="object-cover" priority />
        </div>
      </div>
    </>
  )
}