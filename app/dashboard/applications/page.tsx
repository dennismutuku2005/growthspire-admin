"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle2, XCircle, FileText, ChevronRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function ApplicationsDashboard() {
    const categories = [
        {
            title: "Pending Review",
            count: "12 WAITING",
            description: "APPLICATIONS WAITING FOR INITIAL SCREENING AND DOCUMENT VERIFICATION.",
            href: "/dashboard/applications/pending",
            icon: Clock,
            color: "text-gray-950",
            bg: "bg-gray-50"
        },
        {
            title: "Approved",
            count: "45 ACCEPTED",
            description: "APPLICATIONS THAT HAVE BEEN SUCCESSFULLY ACCEPTED INTO THE COHORT.",
            href: "/dashboard/applications/approved",
            icon: CheckCircle2,
            color: "text-gray-950",
            bg: "bg-gray-50"
        },
        {
            title: "Rejected",
            count: "23 ARCHIVED",
            description: "APPLICATIONS THAT DID NOT MEET THE REQUIRED PROGRAM CRITERIA.",
            href: "/dashboard/applications/rejected",
            icon: XCircle,
            color: "text-gray-950",
            bg: "bg-gray-50"
        }
    ]

    return (
        <DashboardLayout>
            <div className="space-y-4 animate-in fade-in duration-500">
                {/* 2D Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-gray-900 uppercase flex items-center gap-2">
                            <FileText size={18} className="text-black" />
                            Applications Hub
                        </h1>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                            TRACK AND MANAGE ALL INCOMING STARTUP APPLICATIONS
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-black text-white hover:bg-black/90 rounded-none h-8 text-[11px] font-bold uppercase tracking-wide">
                            Process Queue
                        </Button>
                    </div>
                </div>

                {/* Flat 2D Grid Section */}
                <div className="grid gap-2 md:grid-cols-3">
                    {categories.map((cat, i) => (
                        <Link href={cat.href} key={i}>
                            <div className="group bg-white border border-gray-200 p-4 h-full relative cursor-pointer hover:border-black transition-all border-t-2 border-t-transparent hover:border-t-black">
                                <div className="flex items-start justify-between">
                                    <div className={cn("p-2", cat.bg)}>
                                        <cat.icon size={16} className={cat.color} />
                                    </div>
                                    <ChevronRight size={14} className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-[13px] font-bold text-gray-900 uppercase tracking-tight">{cat.title}</h3>
                                    <p className="text-[11px] font-bold text-black bg-gray-50 inline-block px-1.5 py-0.5 mt-1 uppercase">
                                        {cat.count}
                                    </p>
                                    <p className="text-[11px] text-gray-500 mt-2 leading-relaxed font-bold uppercase">
                                        {cat.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* 2D Info Table Style Callout */}
                <div className="bg-gray-50 border border-gray-200 p-4">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-white border border-gray-200 flex items-center justify-center">
                            <FileText size={20} className="text-gray-400" />
                        </div>
                        <div>
                            <p className="text-[12px] font-bold text-gray-800 uppercase tracking-tight">Application Processing Tip</p>
                            <p className="text-[11px] text-gray-500 font-bold uppercase">AVERAGE REVIEW TIME: 4.2 DAYS PER SUBMISSION</p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
