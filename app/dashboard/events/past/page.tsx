"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Search, Filter, BarChart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function PastEventsPage() {
    const events = [
        {
            id: 3,
            title: "Tech Trends 2024",
            date: "2024-03-10",
            time: "14:00",
            location: "Main Hall",
            attendees: 200,
            type: "Conference",
            status: "Past",
        },
        {
            id: 4,
            title: "Winter Cohort Demo Day",
            date: "2024-02-15",
            time: "09:00",
            location: "Innovation Hub",
            attendees: 350,
            type: "Demo Day",
            status: "Past",
        },
    ]

    return (
        <DashboardLayout>
            <div className="space-y-4 animate-in fade-in duration-500">
                {/* 2D Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div>
                        <h1 className="text-lg font-semibold tracking-tight text-gray-900 uppercase flex items-center gap-2">
                            <Calendar size={18} className="text-gray-400" />
                            Event Archives
                        </h1>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                            HISTORICAL RECORD OF COMPLETED ENGAGEMENTS AND ATTENDANCE METRICS
                        </p>
                    </div>
                </div>

                {/* 2D Filter Bar */}
                <div className="flex flex-col md:flex-row gap-2 bg-gray-50 border border-t-2 border-t-gray-400 p-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search historical events..."
                            className="pl-8 h-8 rounded-none border-gray-200 bg-white text-[12px] focus-visible:ring-0 focus-visible:border-gray-400"
                        />
                    </div>
                    <Button variant="outline" className="h-8 rounded-none border-gray-200 bg-white text-[11px] font-medium uppercase tracking-wider px-4">
                        <Filter className="mr-1.5 h-3.5 w-3.5 text-gray-400" /> Filter
                    </Button>
                </div>

                {/* 2D Table Layout */}
                <div className="border border-gray-200 bg-white overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th>EVENT TITLE</th>
                                <th>COMPLETION DATE</th>
                                <th>LOCATION</th>
                                <th>TOTAL ATTENDEES</th>
                                <th>CATEGORY</th>
                                <th className="text-right">ANALYTICS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event) => (
                                <tr key={event.id} className="group border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                    <td className="py-2 px-3">
                                        <span className="text-[13px] font-semibold text-gray-500 group-hover:text-pace-purple tracking-tight">
                                            {event.title}
                                        </span>
                                    </td>
                                    <td className="py-2 px-3 text-[11px] font-bold text-gray-400 uppercase tracking-tight">
                                        {event.date}
                                    </td>
                                    <td className="py-2 px-3 text-[11px] font-medium text-gray-400 italic">
                                        {event.location}
                                    </td>
                                    <td className="py-2 px-3">
                                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600">
                                            <Users size={12} className="text-gray-300" />
                                            {event.attendees} REACH
                                        </div>
                                    </td>
                                    <td className="py-2 px-3">
                                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 bg-gray-50 text-gray-400 border border-gray-100">
                                            {event.type}
                                        </span>
                                    </td>
                                    <td className="py-2 px-3 text-right">
                                        <Button variant="ghost" className="h-6 gap-1 px-2 rounded-none text-gray-400 hover:text-pace-purple font-bold text-[10px] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                                            <BarChart size={12} />
                                            Post-Event
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 2D Stat Info */}
                <div className="flex gap-4 p-2 bg-gray-50 border border-gray-200">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lifetime Reach:</span>
                        <span className="text-sm font-semibold text-gray-800">4,280+ PARTICIPANTS</span>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
