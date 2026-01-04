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

// Updated navigation hierarchy based on your requirements
const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Startups",
    href: "/dashboard/startups",
    icon: Rocket,
    submenu: [
      { name: "All Startups", href: "/dashboard/startups", icon: Users },
      { name: "Accelerated", href: "/dashboard/startups/accelerated", icon: Zap },
      { name: "Applications", href: "/dashboard/startups/applications", icon: FileText },
      { name: "Analytics", href: "/dashboard/startups/analytics", icon: BarChart },
    ]
  },
  {
    name: "Sponsors",
    href: "/dashboard/sponsors",
    icon: Building,
    submenu: [
      { name: "All Sponsors", href: "/dashboard/sponsors", icon: Building },
      { name: "Partnerships", href: "/dashboard/sponsors/partnerships", icon: TrendingUp },
      { name: "Funding", href: "/dashboard/sponsors/funding", icon: CreditCard },
    ]
  },
  {
    name: "Events",
    href: "/dashboard/events",
    icon: Calendar,
    submenu: [
      { name: "All Events", href: "/dashboard/events", icon: Calendar },
      { name: "Upcoming", href: "/dashboard/events/upcoming", icon: Calendar },
      { name: "Past Events", href: "/dashboard/events/past", icon: Calendar },
    ]
  },
  {
    name: "Blogs",
    href: "/dashboard/blogs",
    icon: FileText,
    submenu: [
      { name: "All Blogs", href: "/dashboard/blogs", icon: FileText },
      { name: "Create Blog", href: "/dashboard/blogs/create", icon: FileText },
      { name: "Categories", href: "/dashboard/blogs/categories", icon: Tag },
    ]
  },
  {
    name: "System Updates",
    href: "/dashboard/system",
    icon: Settings,
    submenu: [
      { name: "Privacy Policy", href: "/dashboard/system/privacy-policy", icon: Shield },
      { name: "Terms & Conditions", href: "/dashboard/system/terms", icon: FileText },
      { name: "User Data Policy", href: "/dashboard/system/user-data-policy", icon: Shield },
      { name: "Other Policies", href: "/dashboard/system/policies", icon: FileCode },
    ]
  },
  {
    name: "Accelerator",
    href: "/dashboard/accelerator",
    icon: Zap,
    submenu: [
      { name: "Programs", href: "/dashboard/accelerator/programs", icon: Zap },
      { name: "Mentors", href: "/dashboard/accelerator/mentors", icon: Users },
      { name: "Resources", href: "/dashboard/accelerator/resources", icon: BookOpen },
    ]
  },
  {
    name: "FAQs",
    href: "/dashboard/faqs",
    icon: HelpCircle,
    submenu: [
      { name: "Manage FAQs", href: "/dashboard/faqs", icon: HelpCircle },
      { name: "Add FAQ", href: "/dashboard/faqs/add", icon: HelpCircle },
    ]
  },
  {
    name: "Applications",
    href: "/dashboard/applications",
    icon: FileText,
    description: "Using calculus-based hierarchy",
    submenu: [
      { name: "All Applications", href: "/dashboard/applications", icon: FileText },
      { name: "Pending Review", href: "/dashboard/applications/pending", icon: FileText },
      { name: "Approved", href: "/dashboard/applications/approved", icon: FileText },
      { name: "Rejected", href: "/dashboard/applications/rejected", icon: FileText },
    ]
  },
  {
    name: "Communications",
    href: "/dashboard/communications",
    icon: MessageSquare,
    submenu: [
      { name: "Email", href: "/dashboard/communications/email", icon: Mail },
      { name: "SMS", href: "/dashboard/communications/sms", icon: Smartphone },
      { name: "Notifications", href: "/dashboard/communications/notifications", icon: Bell },
    ]
  },
]

export function DashboardLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState({})
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
  const Sidebar = () => (
    <div className="h-full bg-sidebar border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-primary">GrowthSpire</h1>
              <p className="text-xs text-muted-foreground">Startup Ecosystem</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href ||
            (item.submenu && item.submenu.some(sub => pathname === sub.href))
          const hasSubmenu = item.submenu && item.submenu.length > 0
          const isExpanded = expandedItems[item.name]

          return (
            <div key={item.name} className="space-y-1">
              <div
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={() => hasSubmenu ? toggleSubmenu(item.name) : router.push(item.href)}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">{item.name}</span>
                </div>
                {hasSubmenu && (
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    isExpanded && "rotate-180"
                  )} />
                )}
              </div>

              {hasSubmenu && isExpanded && (
                <div className="ml-9 space-y-1 animate-in fade-in-50 slide-in-from-top-2">
                  {item.submenu.map((subItem) => {
                    const isSubActive = pathname === subItem.href
                    return (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                          isSubActive
                            ? "bg-secondary text-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <subItem.icon className="h-4 w-4 flex-shrink-0" />
                        <span>{subItem.name}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(username)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{capitalize(username)}</p>
            <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="h-8 w-8"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar - Always visible */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-sidebar">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-sidebar border-r border-border animate-in slide-in-from-left">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="hidden lg:block">
              <h2 className="text-lg font-semibold">
                {navigation.find(item =>
                  item.href === pathname ||
                  (item.submenu && item.submenu.some(sub => sub.href === pathname))
                )?.name || "Dashboard"}
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