"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Cookies from "js-cookie"
import { Button } from "@/components/ui/button"
import {
  Home,
  Users,
  Rocket,
  Building,
  Calendar,
  FileText,
  Settings,
  Zap,
  HelpCircle,
  Search,
  Bell,
  User,
  LogOut,
  Shield,
  Globe,
  TrendingUp,
  BookOpen,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  BarChart,
  CreditCard,
  FileCode,
  Tag,
  Mail,
  Smartphone,
  LayoutDashboard,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { Sidebar } from "@/components/Sidebar"

// Updated navigation hierarchy based on your requirements
// Redundant navigation removed - now managed in Sidebar.jsx


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
          console.log("No user cookie found")
          router.replace("/login")
          return
        }

        const parsedUserData = JSON.parse(userCookie)
        console.log("Parsed user data:", parsedUserData) // Debug log

        // Check multiple possible structures
        let username = null
        let userData = null

        if (parsedUserData.user?.username) {
          // Structure from login: { user: { username, ... } }
          username = parsedUserData.user.username
          userData = parsedUserData
        } else if (parsedUserData.username) {
          // Direct user object: { username, ... }
          username = parsedUserData.username
          userData = { user: parsedUserData }
        } else if (parsedUserData.success && parsedUserData.user?.username) {
          // Success wrapper: { success: true, user: { username, ... } }
          username = parsedUserData.user.username
          userData = parsedUserData
        }

        if (!username) {
          console.error("Invalid user data structure:", parsedUserData)
          Cookies.remove("user_data")
          router.replace("/login")
          return
        }

        setUserData(userData)
        setIsLoading(false)

      } catch (error) {
        console.error("Auth error:", error)
        Cookies.remove("user_data")
        router.replace("/login")
      }
    }

    checkAuth()
  }, [router])

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isProfileOpen])

  const toggleSubmenu = (itemName) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }))
  }

  const handleLogout = () => {
    Cookies.remove("user_data")
    router.replace("/login")
  }

  const getInitials = (username) => {
    if (!username) return "U"
    return username.charAt(0).toUpperCase()
  }

  const capitalize = (str) => {
    if (!str) return ""
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  if (isLoading || !userData) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="relative mx-auto w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-border animate-pulse"></div>
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
        </div>
      </div>
    )
  }

  const username = userData.user?.username || "User"
  const userRole = userData.user?.role || "Admin"

  // Sidebar component
  // Sidebar now imported from external component


  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isMobile={false}
        pathname={pathname}
      />

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isMobile={true}
          pathname={pathname}
        />
      </div>

      {/* Main Content */}
      <div className={cn(
        "flex-1 flex flex-col overflow-hidden transition-all duration-300",
        isSidebarOpen ? "lg:pl-60" : "lg:pl-16"
      )}>
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden lg:flex p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="h-5 w-5 text-gray-500" />
            </button>
            <div className="hidden lg:block">
              <h2 className="text-lg font-semibold capitalize">
                {pathname.split('/').pop()?.replace('-', ' ') || "Dashboard"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/dashboard/notifications">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-destructive"></span>
              </Button>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative profile-dropdown">
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(username)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline">{capitalize(username)}</span>
              </Button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-popover shadow-lg animate-in fade-in-80 slide-in-from-top-2">
                  <div className="p-4 border-b border-border">
                    <p className="font-medium">{capitalize(username)}</p>
                    <p className="text-sm text-muted-foreground capitalize">{userRole}</p>
                  </div>
                  <div className="p-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-destructive hover:text-destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}