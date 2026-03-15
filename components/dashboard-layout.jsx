"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Cookies from "js-cookie"
import { Button } from "@/components/ui/button"
import {
  Menu,
  LogOut,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sidebar } from "@/components/Sidebar"

export function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Check authentication
  useEffect(() => {
    const checkAuth = () => {
      try {
        const userCookie = Cookies.get("user_data")
        if (!userCookie) {
          router.replace("/login")
          return
        }
        const parsedUserData = JSON.parse(userCookie)
        setUserData(parsedUserData)
        setIsLoading(false)
      } catch (error) {
        console.error("Auth error:", error)
        Cookies.remove("user_data")
        router.replace("/login")
      }
    }
    checkAuth()
  }, [router])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isProfileOpen])

  const handleLogout = () => {
    Cookies.remove("user_data")
    router.replace("/login")
  }

  const getInitials = (username) => {
    if (!username) return "U"
    return username.charAt(0).toUpperCase()
  }

  if (isLoading || !userData) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-4 w-4 border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    )
  }

  const username = userData.user?.username || userData.username || "User"
  const userRole = userData.user?.role || userData.role || "Admin"

  return (
    <div className="flex h-screen bg-background text-foreground font-sans">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isMobile={false}
        pathname={pathname}
      />

      {/* Main Content */}
      <div className={cn(
        "flex-1 flex flex-col overflow-hidden transition-all duration-300",
        isSidebarOpen ? "lg:pl-60" : "lg:pl-16"
      )}>
        {/* Header - 2D Elegant */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button
               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
               className="p-2 border border-border hover:bg-muted transition-colors"
            >
              <Menu className="h-4 w-4 text-foreground" />
            </button>
            <div className="hidden lg:block">
              <h2 className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40">
                Core / {pathname.split('/').pop()?.replace('-', ' ') || "Overview"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Profile Dropdown */}
            <div className="relative profile-dropdown">
              <button
                className="flex items-center gap-3 py-1 px-2 border border-transparent hover:border-border transition-all"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="h-7 w-7 bg-foreground flex items-center justify-center text-background text-[10px] font-bold">
                    {getInitials(username)}
                </div>
                <span className="hidden sm:inline text-[11px] font-bold uppercase tracking-wider">{username}</span>
                <ChevronDown size={14} className={cn("transition-transform opacity-40", isProfileOpen ? "rotate-180" : "")} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-background border-2 border-foreground shadow-none z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="p-4 border-b border-border bg-muted/20">
                    <p className="text-[11px] font-black uppercase tracking-widest">{username}</p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1 opacity-60">Session Role: {userRole}</p>
                  </div>
                  <div className="p-1">
                    <button
                      className="w-full flex items-center gap-2 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-destructive hover:bg-destructive/5 transition-all"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Terminate Session
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}