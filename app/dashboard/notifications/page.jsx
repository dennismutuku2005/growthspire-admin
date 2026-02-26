"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Clock,
  Mail,
  Calendar,
  Search,
  X,
  Filter,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function NotificationsPage() {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "New Startup Application",
      description: "EcoFlow has submitted their pitch deck for review.",
      time: "2 minutes ago",
      type: "application",
      isRead: false,
      priority: "high"
    },
    {
      id: 2,
      title: "System Update Complete",
      description: "Phase 2 of the database migration deployed.",
      time: "1 hour ago",
      type: "system",
      isRead: true,
      priority: "medium"
    },
    {
      id: 3,
      title: "Monthly Revenue Report",
      description: "The report for January 2024 is now available.",
      time: "3 hours ago",
      type: "report",
      isRead: false,
      priority: "low"
    },
    {
      id: 4,
      title: "Mentor Meeting Request",
      description: "Sarah Johnson wants a session with AgriSmart.",
      time: "5 hours ago",
      type: "meeting",
      isRead: true,
      priority: "medium"
    },
    {
      id: 5,
      title: "Abnormal Login Detected",
      description: "A login attempt from unrecognized device.",
      time: "1 day ago",
      type: "security",
      isRead: false,
      priority: "high"
    }
  ]

  const filteredNotifications = notifications.filter(n => {
    const matchesFilter = filter === "all" || n.type === filter
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getIcon = (type) => {
    switch (type) {
      case 'application': return <Mail size={14} />
      case 'system': return <CheckCircle2 size={14} />
      case 'report': return <Calendar size={14} />
      case 'meeting': return <Clock size={14} />
      case 'security': return <AlertCircle size={14} />
      default: return <Bell size={14} />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 animate-in fade-in duration-500">
        {/* 2D Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-gray-900 flex items-center gap-2">
              <Bell size={18} className="text-pace-purple" />
              Notification Center
            </h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 text-[11px] font-medium uppercase tracking-wide rounded-none">
              Mark All Read
            </Button>
          </div>
        </div>

        {/* 2D Filter Bar */}
        <div className="flex flex-col md:flex-row gap-2 bg-gray-50 border border-t-2 border-t-pace-purple p-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Filter by title or message..."
              className="pl-8 h-8 rounded-none border-gray-200 bg-white text-[12px] focus-visible:ring-0 focus-visible:border-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="h-8 border border-gray-200 bg-white text-[12px] px-2 rounded-none outline-none focus:border-gray-400"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">ALL CATEGORIES</option>
            <option value="application">APPLICATIONS</option>
            <option value="system">SYSTEM</option>
            <option value="report">REPORTS</option>
            <option value="security">SECURITY</option>
          </select>
        </div>

        {/* 2D Table Layout */}
        <div className="border border-gray-200 bg-white overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="w-10"></th>
                <th>NOTIFICATION</th>
                <th className="w-32 hidden md:table-cell">TIME</th>
                <th className="w-32 hidden md:table-cell">TYPE</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notif) => (
                  <tr
                    key={notif.id}
                    className={cn(
                      "group cursor-pointer border-b border-gray-100 last:border-0",
                      !notif.isRead ? "bg-pace-purple/5 border-l-2 border-l-pace-purple" : "opacity-70 border-l-2 border-l-transparent"
                    )}
                  >
                    <td className="text-center py-2 px-3">
                      <div className={cn(
                        "mx-auto flex items-center justify-center",
                        !notif.isRead ? "text-pace-purple" : "text-gray-400"
                      )}>
                        {getIcon(notif.type)}
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex flex-col">
                        <span className={cn(
                          "text-[13px]",
                          !notif.isRead ? "font-semibold text-gray-900" : "font-medium text-gray-600"
                        )}>
                          {notif.title}
                        </span>
                        <span className="text-[11px] text-gray-500 line-clamp-1">
                          {notif.description}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 px-3 hidden md:table-cell">
                      <span className="text-[11px] font-medium text-gray-400 uppercase tracking-tight">
                        {notif.time}
                      </span>
                    </td>
                    <td className="py-2 px-3 hidden md:table-cell">
                      <span className={cn(
                        "text-[10px] font-bold uppercase px-1.5 py-0.5 border border-transparent",
                        notif.priority === 'high' ? "text-red-600 bg-red-50 border-red-100" :
                          notif.priority === 'medium' ? "text-amber-600 bg-amber-50 border-amber-100" :
                            "text-blue-600 bg-blue-50 border-blue-100"
                      )}>
                        {notif.priority}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right">
                      <ChevronRight size={14} className="text-gray-300 group-hover:text-pace-purple group-hover:translate-x-1 transition-all" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400 italic font-medium">
                    No notifications found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 2D Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="bg-white border border-gray-200 p-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</p>
            <p className="text-lg font-bold text-gray-900">{notifications.length}</p>
          </div>
          <div className="bg-white border border-gray-200 p-3 border-l-pace-purple border-l-4">
            <p className="text-[10px] font-bold text-pace-purple uppercase tracking-widest">Unread</p>
            <p className="text-lg font-bold text-gray-900">3</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}