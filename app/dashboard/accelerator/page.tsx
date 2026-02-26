"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, Activity, ChevronRight, Rocket } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function AcceleratorDashboard() {
    const modules = [
        {
            title: "Programs",
            count: "3 ACTIVE BATCHES",
            description: "MANAGE ONGOING ACCELERATOR COHORTS, CURRICULUM AND SELECTION PHASES.",
            href: "/dashboard/accelerator/programs",
            icon: Activity,
            color: "text-gray-950",
            bg: "bg-gray-50"
        },
        {
            title: "Mentors",
            count: "45 ACTIVE MENTORS",
            description: "COORDINATE MENTORSHIP SESSIONS, OFFICE HOURS AND MENTOR MATCHING.",
            href: "/dashboard/accelerator/mentors",
            icon: Users,
            color: "text-gray-950",
            bg: "bg-gray-50"
        },
        {
            title: "Resources",
            count: "120+ DOCUMENTS",
            description: "MANAGE DIGITAL LIBRARY, TEMPLATES AND SOFTWARE TOOLS FOR STARTUPS.",
            href: "/dashboard/accelerator/resources",
            icon: BookOpen,
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
                        <h1 className="text-lg font-semibold tracking-tight text-gray-900 uppercase flex items-center gap-2">
                            <Rocket size={18} className="text-black" />
                            Program Management
                        </h1>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                            MONITOR PROGRAM HEALTH, RESOURCES AND ECOSYSTEM GROWTH
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-black text-white hover:bg-black/90 rounded-none h-8 text-[11px] font-medium uppercase tracking-wide">
                            View Roadmap
                        </Button>
                    </div>
                </div>

                {/* Flat 2D Grid Section */}
                <div className="grid gap-2 md:grid-cols-3">
                    {modules.map((mod, i) => (
                        <Link key={mod.title} href={mod.href}>
                            <div className="group bg-white border border-gray-200 p-4 h-full relative cursor-pointer hover:border-black transition-all border-t-2 border-t-transparent hover:border-t-black">
                                <div className="flex items-start justify-between">
                                    <div className={cn("p-2", mod.bg)}>
                                        <mod.icon size={16} className={mod.color} />
                                    </div>
                                    <ChevronRight size={14} className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-[13px] font-bold text-gray-900 uppercase tracking-tight">{mod.title}</h3>
                                    <p className="text-[10px] text-black font-bold mt-1 uppercase">
                                        {mod.count}
                                    </p>
                                    <p className="text-[11px] text-gray-500 mt-2 leading-relaxed font-medium">
                                        {mod.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* 2D Stats Info Bar */}
                <div className="bg-gray-50 border border-gray-200 p-3 flex flex-wrap gap-6 items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Cohorts:</span>
                        <span className="text-sm font-semibold text-gray-800">C2, C3, C4</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Enrollment Rate:</span>
                        <span className="text-sm font-semibold text-emerald-600">84%</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Success Metric:</span>
                        <span className="text-sm font-semibold text-gray-800">4.8/5.0</span>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
