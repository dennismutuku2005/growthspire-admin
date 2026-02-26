"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Save, Database, ChevronLeft, Shield } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export default function UserDataPolicyPage() {
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
                                <Database size={18} className="text-pace-purple" />
                                User Data Policy
                            </h1>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                                SPECIFIC REGULATIONS ON USER DATA HANDLING, RETENTION AND DELETION
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
                        <Shield size={12} fill="currentColor" />
                        Data Infrastructure & Rights Management
                    </div>
                    <Textarea
                        className="min-h-[500px] rounded-none border-gray-100 bg-gray-50/30 font-mono text-[12px] leading-relaxed focus-visible:ring-0 focus-visible:border-gray-200 text-gray-700 p-4"
                        defaultValue={`1. DATA OWNERSHIP
GrowhtSpire users retain full ownership of their proprietary business data. We act as data processors while the user remains the data owner.

2. DATA RETENTION
We retain user data for the duration of the program plus an additional five years for historical performance tracking, unless a deletion request is received.

3. DATA DELETION
Verified users may request the permanent deletion of their account and all associated startup metadata. This process is irreversible once confirmed.

4. THIRD-PARTY ACCESS
We do not permit third-party access to raw user data without explicit cryptographic authorization from the data owner.`}
                    />
                </div>

                {/* 2D Footer Notification */}
                <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-200">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Policy ID: GS-DATA-001</p>
                    <span className="text-[9px] font-medium text-gray-500">VERSION 4.0 ACTIVE</span>
                </div>
            </div>
        </DashboardLayout>
    )
}
