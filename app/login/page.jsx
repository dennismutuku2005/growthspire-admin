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
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  // Custom toast states
  const [toast, setToast] = useState({
    message: "",
    type: "error",
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
          JSON.parse(cookieData)
          setShowLoadingScreen(true)
          setTimeout(() => {
            router.push("/dashboard")
          }, 1000)
          return
        }
      } catch (err) {
        console.error("Cookie parsing error:", err)
        Cookies.remove("user_data")
      }

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

    // Accept any credentials - create dummy user data
    setTimeout(() => {
      const userData = {
        success: true,
        message: "Login successful",
        user: {
          id: Math.floor(Math.random() * 1000) + 1,
          name: identifier === "admin" ? "Admin User" : 
                identifier === "1234567890" ? "Mobile User" : 
                `User ${identifier}`,
          username: identifier,
          role: identifier === "admin" ? "admin" : "user",
          email: `${identifier}@example.com`,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(identifier)}&background=oklch(0.68%200.22%20285)&color=fff`
        },
        token: `dummy_jwt_token_${Date.now()}`
      }

      if (rememberMe) {
        Cookies.set("user_data", JSON.stringify(userData), { expires: 7 })
      } else {
        Cookies.set("user_data", JSON.stringify(userData), { expires: 1 })
      }

      showToast("✅ Login successful!", "success")
      setTimeout(() => router.push("/dashboard"), 2000)
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  // Show loading screen while checking authentication or during login
  if (isCheckingAuth || showLoadingScreen) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="relative mx-auto w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
          <div className="text-sm text-muted-foreground">
            {isCheckingAuth ? "Checking authentication..." : "Signing you in..."}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <CustomToast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      <div className="min-h-screen flex bg-background">
        {/* Left Side */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md space-y-6">
            <Card className="bg-card">
              <CardHeader className="text-center pb-2 pt-5">
                <Image 
                  src="/logo.png" 
                  alt="One Network Logo" 
                  width={70} 
                  height={30} 
                  className="mx-auto mb-2" 
                />
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <div className="space-y-4">
                  {/* Username or Mobile */}
                  <div className="space-y-2">
                    <Label htmlFor="identifier" className="text-sm font-medium text-card-foreground">
                      Username or Mobile
                    </Label>
                    <Input
                      id="identifier"
                      type="text"
                      placeholder="Enter any username or mobile"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="h-12 px-4 border-border focus:border-primary focus:ring-2 focus:ring-ring/20 rounded-lg bg-input"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-card-foreground">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter any password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pr-12 h-12 px-4 border-border focus:border-primary focus:ring-2 focus:ring-ring/20 rounded-lg bg-input"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-secondary rounded-md"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
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
                        className="h-5 w-5 border-2 border-border rounded text-primary focus:ring-2 focus:ring-ring data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <Label htmlFor="remember" className="text-sm font-medium text-card-foreground cursor-pointer">
                        Remember me
                      </Label>
                    </div>
                    <Button type="button" variant="link" className="text-sm text-primary hover:text-primary/80 font-medium p-0 h-auto">
                      Forgot password?
                    </Button>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg mt-6 shadow-sm transition-all duration-200 hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={handleLogin}
                  >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : "Sign in"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <p className="text-center text-xs text-muted-foreground">© 2026 GrowthSpire. All rights reserved.</p>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="hidden lg:flex flex-1 relative">
          <Image 
            src="/images/sideimage.png" 
            alt="Network dashboard illustration" 
            fill 
            className="object-cover" 
            priority 
          />
        </div>
      </div>
    </>
  )
}