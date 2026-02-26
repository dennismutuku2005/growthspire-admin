"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Shield, FileText, Lock, ChevronRight, Settings } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function SystemUpdatesPage() {
    const policies = [
        {
            title: "Privacy Policy",
            description: "MANAGE HOW USER DATA IS COLLECTED AND USED BY THE SYSTEM.",
            icon: Shield,
            href: "/dashboard/system/privacy-policy",
            lastUpdated: "2 DAYS AGO",
            color: "text-gray-950",
            bg: "bg-gray-50"
        },
        {
            title: "Terms & Conditions",
            description: "DEFINE THE RULES AND REGULATIONS FOR USING THE GROWTHSPIRE PLATFORM.",
            icon: FileText,
            href: "/dashboard/system/terms",
            lastUpdated: "1 MONTH AGO",
            color: "text-gray-950",
            bg: "bg-gray-50"
        },
        {
            title: "User Data Policy",
            description: "SPECIFIC REGULATIONS REGARDING USER DATA RIGHTS AND COMPLIANCE.",
            icon: Lock,
            href: "/dashboard/system/user-data-policy",
            lastUpdated: "3 WEEKS AGO",
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
                            <Settings size={18} className="text-black" />
                            System Governance
                        </h1>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                            MANAGE LEGAL DOCUMENTS, COMPLIANCE AND SYSTEM-WIDE POLICIES
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-black text-white hover:bg-black/90 rounded-none h-8 text-[11px] font-bold uppercase tracking-wide">
                            Security Audit
                        </Button>
                    </div>
                </div>

                {/* 2D Grid Section */}
                <div className="grid gap-2 md:grid-cols-3">
                    {policies.map((policy, i) => (
                        <Link key={policy.title} href={policy.href}>
                            <div className="group bg-white border border-gray-200 p-4 h-full relative cursor-pointer hover:border-black transition-all border-t-2 border-t-transparent hover:border-t-black">
                                <div className="flex items-start justify-between">
                                    <div className={cn("p-2", policy.bg)}>
                                        <policy.icon size={16} className={policy.color} />
                                    </div>
                                    <ChevronRight size={14} className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-[13px] font-bold text-gray-900 uppercase tracking-tight">{policy.title}</h3>
                                    <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">
                                        UPDATED: {policy.lastUpdated}
                                    </p>
                                    <p className="text-[11px] text-gray-500 mt-2 leading-relaxed font-bold uppercase">
                                        {policy.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* 2D Additional Settings Section */}
                <div className="border border-gray-200 bg-white">
                    <div className="p-3 bg-gray-50 border-b border-gray-100">
                        <h3 className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Additional Configurations</h3>
                    </div>
                    <div className="p-0">
                        <table className="w-full text-left">
                            <tbody>
                                <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group">
                                    <td className="p-3">
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-bold text-gray-800 uppercase">Operational Guidelines</span>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase">INTERNAL PROCEDURES AND STAFF COMPLIANCE MANUALS</span>
                                        </div>
                                    </td>
                                    <td className="p-3 text-right">
                                        <ChevronRight size={14} className="text-gray-200 group-hover:text-black ml-auto" />
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors cursor-pointer group">
                                    <td className="p-3">
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-bold text-gray-800 uppercase">API Usage Policy</span>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase">THIRD-PARTY INTEGRATION AND DATA ACCESS LIMITS</span>
                                        </div>
                                    </td>
                                    <td className="p-3 text-right">
                                        <ChevronRight size={14} className="text-gray-200 group-hover:text-black ml-auto" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
