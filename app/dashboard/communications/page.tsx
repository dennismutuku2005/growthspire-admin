"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Mail, MessageSquare, Bell, ChevronRight, Send, Activity } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function CommunicationsPage() {
    const channels = [
        {
            title: "Email Campaigns",
            count: "12 ACTIVE LISTS",
            description: "SEND BULK EMAILS TO STARTUPS, MENTORS, OR SPONSORS WITH TRACKABLE COHORTS.",
            href: "/dashboard/communications/email",
            icon: Mail,
            color: "text-gray-950",
            bg: "bg-gray-50"
        },
        {
            title: "SMS Broadcasts",
            count: "READY TO SEND",
            description: "REACH USERS DIRECTLY ON THEIR MOBILE DEVICES FOR URGENT ALERTS AND REMINDERS.",
            href: "/dashboard/communications/sms",
            icon: MessageSquare,
            color: "text-gray-950",
            bg: "bg-gray-50"
        },
        {
            title: "In-App Notifications",
            count: "SYSTEM WIDE",
            description: "PUSH NOTIFICATIONS TO THE USER DASHBOARD AND REAL-TIME ACTIVITY FEEDS.",
            href: "/dashboard/communications/notifications",
            icon: Bell,
            color: "text-gray-950",
            bg: "bg-gray-50"
        },
    ]

    return (
        <DashboardLayout>
            <div className="space-y-4 animate-in fade-in duration-500">
                {/* 2D Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-gray-900 uppercase flex items-center gap-2">
                            <Send size={18} className="text-black" />
                            Engagement Center
                        </h1>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                            MANAGE ALL OUTBOUND COMMUNICATION CHANNELS AND BROADCASTS
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-black text-white hover:bg-black/90 rounded-none h-8 text-[11px] font-bold uppercase tracking-wide">
                            Queue Message
                        </Button>
                    </div>
                </div>

                {/* Flat 2D Grid Section */}
                <div className="grid gap-2 md:grid-cols-3">
                    {channels.map((channel, i) => (
                        <Link key={channel.title} href={channel.href}>
                            <div className="group bg-white border border-gray-200 p-4 h-full relative cursor-pointer hover:border-black transition-all border-t-2 border-t-transparent hover:border-t-black">
                                <div className="flex items-start justify-between">
                                    <div className={cn("p-2", channel.bg)}>
                                        <channel.icon size={16} className={channel.color} />
                                    </div>
                                    <ChevronRight size={14} className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-[13px] font-bold text-gray-900 uppercase tracking-tight">{channel.title}</h3>
                                    <p className="text-[10px] text-black font-bold mt-1 uppercase">
                                        {channel.count}
                                    </p>
                                    <p className="text-[11px] text-gray-500 mt-2 leading-relaxed font-bold uppercase">
                                        {channel.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* 2D Activity Callout */}
                <div className="bg-gray-50 border border-gray-200 p-2">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Global Send Status:</span>
                            <span className="text-[10px] font-bold text-emerald-600 uppercase">OPERATIONAL</span>
                        </div>
                        <span className="text-[9px] font-bold text-gray-400 uppercase">LAST SYNC: 2 SECONDS AGO</span>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
