"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, Smartphone, ChevronLeft, Activity } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function SMSPage() {
    const [message, setMessage] = useState("")

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
                                <Smartphone size={18} className="text-black" />
                                SMS Gateway
                            </h1>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                                SEND INSTANT SMS ALERTS AND BROADCASTS TO REGISTERED MOBILE NUMBERS
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 max-w-5xl">
                    {/* SMS Composer */}
                    <div className="bg-white border border-gray-200 p-6 space-y-4 border-t-2 border-t-black">
                        <div className="space-y-2">
                            <Label htmlFor="recipients" className="text-[11px] font-bold uppercase text-gray-400 tracking-widest">Target Numbers Group</Label>
                            <Input id="recipients" placeholder="E.G. ACTIVE STARTUPS" className="h-9 rounded-none border-gray-200 text-[12px] font-bold uppercase focus-visible:ring-0 focus-visible:border-gray-400" />
                        </div>

                        <div className="space-y-2 relative">
                            <Label htmlFor="message" className="text-[11px] font-bold uppercase text-gray-400 tracking-widest">Message Content</Label>
                            <Textarea
                                id="message"
                                placeholder="TYPE BRIEF ALERT..."
                                className="min-h-[120px] rounded-none border-gray-200 text-[13px] focus-visible:ring-0 font-bold uppercase bg-gray-50/30"
                                maxLength={160}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <div className="flex justify-between mt-1">
                                <span className="text-[9px] font-bold uppercase text-amber-600">Standard 160-char GSM limit applies</span>
                                <span className={cn(
                                    "text-[10px] font-bold uppercase tracking-tight",
                                    message.length > 150 ? "text-red-500" : "text-gray-400"
                                )}>
                                    {message.length} / 160
                                </span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex justify-end">
                            <Button className="bg-black text-white hover:bg-black/90 rounded-none h-8 text-[11px] font-bold uppercase tracking-[0.2em] px-8">
                                <Send className="mr-2 h-3.5 w-3.5" /> Push SMS
                            </Button>
                        </div>
                    </div>

                    {/* Quick Info / Recent */}
                    <div className="space-y-4">
                        <div className="bg-gray-900 border border-gray-800 p-4 border-l-4 border-l-black h-fit">
                            <div className="flex items-center gap-2 mb-4">
                                <Activity size={14} className="text-white" />
                                <h3 className="text-[11px] font-bold text-white uppercase tracking-widest">Gateway Health</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase">Balance</span>
                                    <span className="text-[12px] text-emerald-400 font-bold uppercase">KES 14,280.00</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase">Uptime</span>
                                    <span className="text-[10px] text-white font-bold uppercase">99.98% (ACTIVE)</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase">Today's Sent</span>
                                    <span className="text-[10px] text-white font-bold uppercase">142 UNITS</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 p-4 border-t-2 border-t-gray-400 uppercase tracking-tight">
                            <p className="text-[10px] text-gray-400 font-bold mb-2">Notice</p>
                            <p className="text-[11px] text-gray-600 font-bold uppercase">
                                SMS broadcasts are sent via the "GROWTHSPIRE" sender ID. Estimated delivery time: 2-5 seconds.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
