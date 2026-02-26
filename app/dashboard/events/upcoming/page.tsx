"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Clock, Search, Filter, Plus, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function UpcomingEventsPage() {
    const events = [
        {
            id: 1,
            title: "Startup Pitch Night",
            date: "2024-04-15",
            time: "18:00",
            location: "Innovation Hub Auditrium",
            attendees: 120,
            type: "Networking",
            status: "Upcoming",
        },
        {
            id: 2,
            title: "Founder's Workshop: Fundraising",
            date: "2024-04-20",
            time: "10:00",
            location: "Virtual (Zoom)",
            attendees: 45,
            type: "Workshop",
            status: "Upcoming",
        },
    ]

    return (
        <DashboardLayout>
            <div className="space-y-4 animate-in fade-in duration-500">
                {/* 2D Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div>
                        <h1 className="text-lg font-semibold tracking-tight text-gray-900 uppercase flex items-center gap-2">
                            <Calendar size={18} className="text-pace-purple" />
                            Upcoming Pipeline
                        </h1>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                            MANAGE ALL FUTURE ENGAGEMENTS, WORKSHOPS AND NETWORKING EVENTS
                        </p>
                    </div>
                </div>

                {/* 2D Filter Bar */}
                <div className="flex flex-col md:flex-row gap-2 bg-gray-50 border border-t-2 border-t-pace-purple p-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Filter upcoming events..."
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
                                <th>DATE & TIME</th>
                                <th>LOCATION</th>
                                <th>CAPACITY</th>
                                <th>TYPE</th>
                                <th className="text-right">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event) => (
                                <tr key={event.id} className="group border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                    <td className="py-2 px-3">
                                        <span className="text-[13px] font-bold text-gray-900 group-hover:text-pace-purple tracking-tight">
                                            {event.title}
                                        </span>
                                    </td>
                                    <td className="py-2 px-3">
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-bold text-gray-800 tracking-tight">{event.date}</span>
                                            <span className="text-[10px] text-gray-400 font-medium uppercase">{event.time} HRS</span>
                                        </div>
                                    </td>
                                    <td className="py-2 px-3 text-[11px] font-medium text-gray-500 italic max-w-[150px] truncate">
                                        {event.location}
                                    </td>
                                    <td className="py-2 px-3">
                                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600">
                                            <Users size={12} className="text-gray-300" />
                                            {event.attendees} REG.
                                        </div>
                                    </td>
                                    <td className="py-2 px-3">
                                        <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 bg-gray-50 text-gray-500 border border-gray-100">
                                            {event.type}
                                        </span>
                                    </td>
                                    <td className="py-2 px-3 text-right">
                                        <div className="flex items-center justify-end gap-1 px-2">
                                            <span className="text-[10px] font-bold text-pace-purple opacity-0 group-hover:opacity-100 transition-opacity uppercase">Manifest</span>
                                            <ChevronRight size={14} className="text-gray-200 group-hover:text-pace-purple group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 2D Summary Callout */}
                <div className="bg-emerald-50 border border-emerald-100 p-2 flex items-center justify-between px-3">
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">Next Engagement Begins in 24 Hours</span>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
