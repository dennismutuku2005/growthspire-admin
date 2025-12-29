"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Cookies from "js-cookie"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  Bell,
  Home,
  Users,
  Package,
  MessageSquare,
  CreditCard,
  Search,
  Receipt,
  Router,
  User,
  Wifi,
  BarChart3,
  Phone,
  ChevronRight,
  UserPlus,
  FileText,
  Eye,
  Plus,
  TrendingUp,
  Timer,
  NotebookPen,
  NotebookIcon,
  BarChart3Icon,
  LucideDollarSign,
  ChevronLeft,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

const navigation = [
  { 
    name: "Dashboard", 
    href: "/dashboard", 
    icon: Home 
  },
  { 
    name: "Customers", 
    href: "/dashboard/customers", 
    icon: Users,
    submenu: [
      { name: "View Customers", href: "/dashboard/customers", icon: Eye },
      { name: "Add Customer", href: "/dashboard/customers/addcustomer", icon: UserPlus },
      //{ name: "Customer Reports", href: "/dashboard/customers/customer-reports", icon: FileText },
    ]
  },
   { 
    name: "Isp NoteBook", 
    href: "/dashboard/ispnotepad", 
    icon: NotebookIcon
  },
  { 
    name: "Packages", 
    href: "/dashboard/packages", 
    icon: Package,
    submenu: [
      { name: "View Packages", href: "/dashboard/packages", icon: Eye },
      { name: "Add Package", href: "/dashboard/packages/add-package", icon: Plus },
    ]
  },
 // { 
   // name: "Communication", 
  //  href: "/dashboard/sms", 
  //  icon: MessageSquare 
 // },
  { 
    name: "Payments", 
    href: "/dashboard/payments", 
    icon: CreditCard,
    submenu: [
      { name: "Transactions", href: "/dashboard/payments", icon: CreditCard },
      { name: "Withdrawals", href: "/dashboard/payments/withdrawals", icon: LucideDollarSign },
      { name: "Auto Bills", href: "/dashboard/payments/autopayments", icon: Timer },
    ]
  },
  { 
    name: "Router", 
    href: "/dashboard/network", 
    icon: Router 
  },
  { 
    name: "Notifications", 
    href: "/dashboard/notifications", 
    icon: Bell,
    submenu: [
      { name: "View Notifications", href: "/dashboard/notifications", icon: Eye },
      { name: "Server Report", href: "/dashboard/reports", icon: BarChart3Icon },
    ]
  },
  { 
    name: "Billing", 
    href: "/dashboard/billing", 
    icon: Receipt 
  },
]

export function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true) // Default to collapsed
  const [userData, setuserData] = useState(null)
  const [isCardOpen, setIsCardOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [expandedItems, setExpandedItems] = useState({})
  const pathname = usePathname()
  const router = useRouter()

  // Capitalize first letter of username
  const capitalizeUsername = (username) => {
    if (!username) return "user"
    return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()
  }

  // Get user initials for avatar
  const getInitials = (username) => {
    if (!username) return "US"
    return username
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  // Check authentication and get user data
  useEffect(() => {
    const checkAuth = () => {
      try {
        const userCookie = Cookies.get("user_data")
        const sidebarPref = Cookies.get("sidebar_collapsed")

        if (!userCookie) {
          router.replace("/login")
          return
        }

        // Parse the user data from cookie
        const parseduserData = JSON.parse(userCookie)

        // Validate required fields
        if (!parseduserData.username || !parseduserData.mobile) {
          console.warn("Invalid user data in cookie")
          router.replace("/login")
          return
        }

        // Set sidebar preference if exists
        if (sidebarPref !== undefined) {
          setSidebarCollapsed(sidebarPref === "true")
        }

        setuserData(parseduserData)
        setIsLoading(false)
      } catch (error) {
        console.error("Error parsing user data:", error)
        Cookies.remove("user_data")
        Cookies.remove("sidebar_collapsed")
        router.replace("/login")
      }
    }

    checkAuth() // Run immediately
    const interval = setInterval(checkAuth, 60 * 1000) // Check every minute

    return () => clearInterval(interval)
  }, [router])

  // Save sidebar preference to cookie
  const toggleSidebar = () => {
    const newCollapsedState = !sidebarCollapsed
    setSidebarCollapsed(newCollapsedState)
    Cookies.set("sidebar_collapsed", newCollapsedState.toString(), { 
      expires: 365, // Store for 1 year
      sameSite: 'strict'
    })
  }

  // Close card when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isCardOpen && !event.target.closest('.user-card-trigger')) {
        setIsCardOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isCardOpen])

  // Toggle submenu expansion for mobile
  const toggleSubmenu = (itemName) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }))
  }

  // Logout handler
  const handleLogout = () => {
    Cookies.remove("user_data")
    Cookies.remove("sidebar_collapsed")
    setuserData(null)
    router.replace("/login")
  }

  // Show loading or redirect if no user data
  if (isLoading || !userData) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <div className="relative mx-auto w-16 h-16">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            {/* Animated ring */}
            <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
          </div>
        </div>
      </div>
    )
  }

  const SidebarContent = ({ collapsed = true }) => (
    <div className="flex h-full flex-col bg-blue-900 text-white">
      {/* Logo and Toggle Area */}
      <div
        className={cn(
          "flex h-16 items-center border-b border-blue-800 transition-all duration-300 ease-in-out justify-between",
          collapsed ? "px-2" : "px-4",
        )}
      >
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="flex-shrink-0 relative w-8 h-8">
            <Image
              src="/logo.png"
              alt="One Network Logo"
              width={32}
              height={32}
              className="rounded-lg object-contain transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
          <div
            className={cn(
              "transition-all duration-300 ease-in-out overflow-hidden",
              collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
            )}
          >
            <h1 className="text-sm font-semibold text-white whitespace-nowrap">One Network</h1>
            <p className="text-xs text-blue-200 whitespace-nowrap">ISP Management</p>
          </div>
        </div>
        
        {/* Toggle Button - Only show when not collapsed */}
        {!collapsed && (
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="h-8 w-8 p-0 hover:bg-blue-800 hover:text-white transition-all duration-200"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.submenu && item.submenu.some(sub => pathname === sub.href))
          const hasSubmenu = item.submenu && item.submenu.length > 0
          const isExpanded = expandedItems[item.name]
          
          return (
            <div 
              key={item.name} 
              className="group relative"
              onMouseEnter={() => collapsed && setHoveredItem(item.name)}
              onMouseLeave={() => collapsed && setHoveredItem(null)}
            >
              {/* Main Menu Item */}
              <div className="relative">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-3 text-sm transition-all duration-200 ease-in-out group relative overflow-hidden",
                    collapsed ? "justify-center" : "space-x-3 justify-between",
                    isActive
                      ? "bg-blue-600 text-white shadow-lg transform scale-[1.02]"
                      : "text-blue-100 hover:bg-blue-800 hover:text-white hover:transform hover:scale-[1.02] hover:shadow-md",
                  )}
                  onClick={(e) => {
                    if (hasSubmenu && !collapsed) {
                      e.preventDefault()
                      toggleSubmenu(item.name)
                    } else {
                      setSidebarOpen(false)
                    }
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5 flex-shrink-0 transition-transform duration-200 ease-in-out group-hover:scale-110" />
                    <span
                      className={cn(
                        "transition-all duration-300 ease-in-out whitespace-nowrap font-medium",
                        collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                      )}
                    >
                      {item.name}
                    </span>
                  </div>
                  
                  {/* Submenu indicator for expanded sidebar */}
                  {hasSubmenu && !collapsed && (
                    <ChevronRight className={cn(
                      "h-4 w-4 transition-transform duration-200 flex-shrink-0",
                      isExpanded && "rotate-90"
                    )} />
                  )}
                  
                  {/* Tooltip for main item */}
                  {collapsed && (
                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg border border-gray-700">
                      {item.name}
                    </div>
                  )}
                </Link>

                {/* Hover submenu for collapsed sidebar (DESKTOP) */}
                {collapsed && hasSubmenu && hoveredItem === item.name && (
                  <div className="absolute left-full top-0 ml-1 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-48 z-50">
                    <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
                      <h3 className="text-sm font-semibold text-gray-800">{item.name}</h3>
                    </div>
                    <div className="py-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                          onClick={() => {
                            setSidebarOpen(false)
                            setHoveredItem(null)
                          }}
                        >
                          <subItem.icon className="h-4 w-4 flex-shrink-0" />
                          <span className="whitespace-nowrap">{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Expanded submenu for non-collapsed sidebar (MOBILE) */}
              {hasSubmenu && !collapsed && isExpanded && (
                <div className="ml-4 mt-1 space-y-1 border-l border-blue-700 pl-2">
                  {item.submenu.map((subItem) => {
                    const isSubActive = pathname === subItem.href
                    return (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={cn(
                          "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 ease-in-out",
                          isSubActive
                            ? "bg-blue-700 text-white"
                            : "text-blue-200 hover:bg-blue-800 hover:text-white"
                        )}
                        onClick={() => setSidebarOpen(false)}
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

      {/* Footer with user info and expand button */}
      <div className={cn(
        "border-t border-blue-800 transition-all duration-300",
        collapsed ? "p-3" : "p-3"
      )}>
        {collapsed ? (
          <div className="flex flex-col items-center space-y-3">
            <Avatar className="h-8 w-8 ring-2 ring-blue-400 transition-transform duration-200 ease-in-out hover:scale-105">
              <AvatarFallback className="bg-blue-600 text-white text-xs font-semibold">
                {getInitials(userData?.username)}
              </AvatarFallback>
            </Avatar>
            {/* Expand button for collapsed sidebar */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="h-8 w-8 p-0 hover:bg-blue-800 hover:text-white transition-all duration-200"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8 ring-2 ring-blue-400 transition-transform duration-200 ease-in-out hover:scale-105">
                <AvatarFallback className="bg-blue-600 text-white text-xs font-semibold">
                  {getInitials(userData?.username)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white whitespace-nowrap">
                  {capitalizeUsername(userData?.username)}
                </p>
                <p className="text-xs text-blue-200 whitespace-nowrap">
                  {userData?.mobile || "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar - Toggleable */}
      <div 
        className={cn(
          "hidden lg:flex h-screen shadow-xl transition-all duration-300 ease-in-out relative bg-blue-900",
          sidebarCollapsed ? "w-16" : "w-64"
        )}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <SidebarContent collapsed={sidebarCollapsed} />
      </div>

      {/* Mobile Sidebar - Full Width */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0 sm:w-72">
          <SidebarContent collapsed={false} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-14 sm:h-16 items-center justify-between border-b border-gray-200 px-3 sm:px-6 bg-white shadow-sm transition-all duration-200 ease-in-out">
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Menu Button */}
            <div
              className="lg:hidden flex items-center justify-center h-14 w-14 rounded-md transition-all duration-200 ease-in-out hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-7 w-7" />
            </div>

            {/* Desktop Toggle Button - Only show when sidebar is collapsed */}
            {sidebarCollapsed && (
              <div
                className="hidden lg:flex items-center justify-center h-10 w-10 rounded-md transition-all duration-200 ease-in-out hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                onClick={toggleSidebar}
              >
                <ChevronRight className="h-5 w-5" />
              </div>
            )}

            {/* Mobile Search - Hidden on desktop */}
            <div className="lg:hidden flex-1 max-w-xs">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors duration-200" />
                <Input
                  placeholder="Search..."
                  className="w-full pl-9 pr-3 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 ease-in-out h-9 text-sm"
                />
              </div>
            </div>

            {/* Desktop Search */}
            <div className="hidden lg:block relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors duration-200" />
              <Input
                placeholder="Search..."
                className="w-full pl-9 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 ease-in-out"
              />
            </div>
          </div>

          {/* Avatar with improved mobile design */}
          <div className="relative user-card-trigger">
            <div
              className="flex items-center gap-2 cursor-pointer p-1 rounded-lg transition-all duration-200 hover:bg-gray-100"
              onClick={() => setIsCardOpen(!isCardOpen)}
            >
              <Avatar className="h-8 w-8 sm:h-9 sm:w-9 ring-2 ring-transparent hover:ring-blue-200 transition-all duration-200">
                <AvatarFallback className="bg-blue-500 text-white text-xs font-semibold">
                  {getInitials(userData?.username)}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:block text-sm font-medium text-gray-700">
                {capitalizeUsername(userData?.username)}
              </span>
            </div>

            {/* Enhanced Hover Card */}
            <div
              className={cn(
                "absolute right-0 mt-2 w-72 sm:w-80 rounded-xl bg-white shadow-xl border border-gray-100 overflow-hidden z-50 transition-all duration-300 ease-out backdrop-blur-sm",
                isCardOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              )}
            >

              {/* Card Content */}
              <div className="p-4 space-y-3">
                {/* User Info Items */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                    <User className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Username</p>
                      <p className="text-sm font-medium text-gray-800 truncate">{capitalizeUsername(userData?.username)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                    <Phone className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Mobile</p>
                      <p className="text-sm font-medium text-gray-800">{userData?.mobile || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Logout Button */}
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  size="sm"
                  className="w-full bg-red-500 hover:bg-red-600 text-white transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 transition-all duration-300 ease-in-out">
          <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}