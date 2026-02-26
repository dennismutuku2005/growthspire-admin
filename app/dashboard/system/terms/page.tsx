"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Save, Gavel, ChevronLeft, FileText } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export default function TermsPage() {
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
                                <Gavel size={18} className="text-pace-purple" />
                                Terms & Conditions
                            </h1>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                                MANAGE THE LEGAL AGREEMENTS AND TERMS OF SERVICE FOR ALL USERS
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
                        <FileText size={12} fill="currentColor" />
                        Terms of Service Master Document
                    </div>
                    <Textarea
                        className="min-h-[500px] rounded-none border-gray-100 bg-gray-50/30 font-mono text-[12px] leading-relaxed focus-visible:ring-0 focus-visible:border-gray-200 text-gray-700 p-4"
                        defaultValue={`1. INTRODUCTION
Welcome to GrowthSpire. By accessing our platform, you agree to these terms and conditions in their entirety. GrowthSpire provides a startup accelerator platform and related services ("Services").

2. INTELLECTUAL PROPERTY
All content included on the platform, such as text, graphics, logos, images, and software, is the property of GrowthSpire or its content suppliers and protected by international copyright laws.

3. USER RESPONSIBILITIES
Users must provide accurate information during registration. Any fraudulent or misleading information may lead to immediate termination of the user account.

4. LIMITATION OF LIABILITY
GrowthSpire shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services.`}
                    />
                </div>

                {/* 2D Footer Notification */}
                <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-200">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Legal Version: v.3.1.2 Public</p>
                    <span className="text-[9px] font-medium text-gray-500">LAST REVIEWED: FEBRUARY 10, 2024</span>
                </div>
            </div>
        </DashboardLayout>
    )
}
