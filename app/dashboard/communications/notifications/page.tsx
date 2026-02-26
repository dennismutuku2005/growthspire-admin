"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Bell, ChevronLeft, Layout, Send, Info } from "lucide-react"
import Link from "next/link"

export default function NotificationsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-4 animate-in fade-in duration-500">
                {/* 2D Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/communications">
                            <div className="p-1 hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-200">
                                <ChevronLeft size={16} className="text-gray-400" />
                            </div>
                        </Link>
                        <div>
                            <h1 className="text-lg font-bold tracking-tight text-gray-900 uppercase flex items-center gap-2">
                                <Bell size={18} className="text-black" />
                                System Push
                            </h1>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                                DISPATCH REAL-TIME IN-APP NOTIFICATIONS TO THE USER DASHBOARD FEED
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3 max-w-6xl">
                    {/* Main Form */}
                    <div className="md:col-span-2 bg-white border border-gray-200 p-8 space-y-6 border-t-2 border-t-black">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-[11px] font-bold uppercase text-gray-400 tracking-widest">Notification Headline</Label>
                            <Input id="title" placeholder="E.G. NEW MENTORSHIP PROGRAM AVAILABLE" className="h-10 rounded-none border-gray-200 text-[13px] font-bold focus-visible:ring-0 focus-visible:border-gray-400 uppercase" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message" className="text-[11px] font-bold uppercase text-gray-400 tracking-widest">Detail Payload</Label>
                            <Textarea id="message" placeholder="ENTER THE MESSAGE BODY..." className="rounded-none border-gray-200 text-[13px] min-h-[150px] focus-visible:ring-0 font-bold uppercase bg-gray-50/20" />
                        </div>

                        <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Info size={14} className="text-blue-500" />
                                <span className="text-[10px] font-bold text-gray-400 uppercase">Target: All Platform Users</span>
                            </div>
                            <Button className="bg-black text-white hover:bg-black/90 rounded-none h-8 text-[11px] font-bold uppercase tracking-[0.2em] px-8">
                                <Send className="mr-2 h-3.5 w-3.5" /> Fire Push
                            </Button>
                        </div>
                    </div>

                    {/* Preview/Side Info */}
                    <div className="space-y-4">
                        <div className="bg-gray-50 border border-gray-200 p-4 border-t-2 border-t-black">
                            <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Layout size={14} className="text-black" />
                                Live Preview Mockup
                            </h3>
                            <div className="bg-white border border-gray-200 p-3 relative opacity-60 pointer-events-none">
                                <div className="h-1.5 w-8 bg-black mb-2" />
                                <div className="h-3 w-[80%] bg-gray-200 mb-2" />
                                <div className="h-2 w-[40%] bg-gray-100" />
                            </div>
                            <p className="text-[10px] text-gray-400 font-bold mt-3 uppercase">
                                Previews are approximate. Content will be optimized for mobile screens automatically.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
