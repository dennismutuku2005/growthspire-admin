"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Save, ShieldCheck, Lock, ChevronLeft } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export default function PrivacyPolicyPage() {
    return (
        <DashboardLayout>
            <div className="space-y-4 animate-in fade-in duration-500">
                {/* 2D Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/system">
                            <div className="p-1 hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-200">
                                <ChevronLeft size={16} className="text-gray-400" />
                            </div>
                        </Link>
                        <div>
                            <h1 className="text-lg font-semibold tracking-tight text-gray-900 uppercase flex items-center gap-2">
                                <ShieldCheck size={18} className="text-pace-purple" />
                                Privacy Statement
                            </h1>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                                EDIT AND MANAGE THE LEGAL DATA PRIVACY DECLARATION
                            </p>
                        </div>
                    </div>
                    <Button size="sm" className="bg-pace-purple text-white hover:bg-pace-purple/90 rounded-none h-8 text-[11px] font-bold uppercase tracking-wide px-6">
                        <Save className="mr-2 h-3.5 w-3.5" /> Save Changes
                    </Button>
                </div>

                {/* 2D Content Area */}
                <div className="bg-white border border-gray-200 p-6 space-y-4 border-t-2 border-t-gray-900">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">
                        <Lock size={12} fill="currentColor" />
                        Live Document Content
                    </div>
                    <Textarea
                        className="min-h-[500px] rounded-none border-gray-100 bg-gray-50/30 font-mono text-[12px] leading-relaxed focus-visible:ring-0 focus-visible:border-gray-200 text-gray-700 p-4"
                        defaultValue={`1. INFORMATION WE COLLECT
We collect information provided directly by you during the application and account creation process. This includes, but is not limited to, full name, email address, physical address, and startup-related data.

2. HOW WE USE INFORMATION
The information gathered is utilized to analyze startup performance, facilitate mentor-mentee connections, and improve the overall accelerator experience. We do not sell or trade your data to third parties.

3. DATA SECURITY
GrowthSpire implements modern encryption and security protocols to ensure your data is protected from unauthorized access or disclosure.

4. USER RIGHTS
Users retain the right to request a copy of their stored data or request immediate deletion from our production servers.`}
                    />
                </div>

                {/* 2D Footer Notification */}
                <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-200">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Compliance: V-2.0.4.8 Internal</p>
                    <span className="text-[9px] font-medium text-gray-500">LAST UPDATED: MARCH 15, 2024</span>
                </div>
            </div>
        </DashboardLayout>
    )
}
