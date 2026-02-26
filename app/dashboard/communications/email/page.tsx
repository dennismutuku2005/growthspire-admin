"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, Mail, Users, FileText, ChevronLeft, Plus } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function EmailPage() {
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
                                <Mail size={18} className="text-black" />
                                Email Dispatch
                            </h1>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                                COMPOSE AND SEND BULK OR INDIVIDUAL EMAILS TO YOUR ECOSYSTEM
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {/* Main Composer */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="bg-white border border-gray-200 p-6 space-y-4 border-t-2 border-t-black">
                            <div className="grid grid-cols-2 gap-4 border-b border-gray-50 pb-4">
                                <div className="space-y-2">
                                    <Label htmlFor="to" className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Recipient Group</Label>
                                    <Input id="to" placeholder="E.G. ALL STARTUPS" className="h-8 rounded-none border-gray-200 text-[12px] font-bold uppercase focus-visible:ring-0 focus-visible:border-gray-400" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subject" className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Subject Line</Label>
                                    <Input id="subject" placeholder="CAMPAIGN SUBJECT..." className="h-8 rounded-none border-gray-200 text-[12px] font-bold uppercase focus-visible:ring-0 focus-visible:border-gray-400" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Email Body</Label>
                                <Textarea id="message" placeholder="TYPE YOUR MESSAGE HERE..." className="min-h-[350px] rounded-none border-gray-200 text-[13px] focus-visible:ring-0 font-bold uppercase bg-gray-50/20" />
                            </div>
                        </div>

                        {/* Dispatch Bar */}
                        <div className="flex items-center justify-between p-3 bg-gray-900 text-white">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">System: SMTP Relay Ready</p>
                            <Button className="bg-white text-black hover:bg-white/90 rounded-none h-8 text-[11px] font-extrabold uppercase tracking-[0.2em] px-8">
                                <Send className="mr-2 h-3.5 w-3.5" /> Blast Email
                            </Button>
                        </div>
                    </div>

                    {/* Quick Stats/Lists */}
                    <div className="space-y-4">
                        <div className="bg-white border border-gray-200 p-4 border-t-2 border-t-gray-950 h-fit">
                            <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Users size={14} className="text-gray-400" />
                                Target Segments
                            </h3>
                            <div className="space-y-2">
                                {['All Startups', 'Active Mentors', 'Sponsor Contacts', 'Rejected Applicants'].map(group => (
                                    <div key={group} className="flex items-center justify-between p-2 bg-gray-50 border border-gray-100 hover:border-black cursor-pointer transition-colors group">
                                        <span className="text-[10px] font-extrabold text-gray-600 uppercase group-hover:text-black">{group}</span>
                                        <Plus size={12} className="text-gray-300 group-hover:text-black" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 p-4 border-t-2 border-t-gray-200">
                            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <FileText size={14} />
                                Templates
                            </h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">No custom templates found. Use the master editor to compose.</p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
