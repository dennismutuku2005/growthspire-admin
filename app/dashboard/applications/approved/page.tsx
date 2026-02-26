"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Eye, CheckCircle2, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function ApprovedApplicationsPage() {
    const applications = [
        {
            id: 3,
            applicant: "Emily White",
            project: "EduLearn",
            submissionDate: "2024-02-15",
            status: "Approved",
        },
        {
            id: 4,
            applicant: "David Chen",
            project: "NextGen Robotics",
            submissionDate: "2024-02-10",
            status: "Approved",
        },
    ]

    return (
        <DashboardLayout>
            <div className="space-y-4 animate-in fade-in duration-500">
                {/* 2D Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div>
                        <h1 className="text-lg font-semibold tracking-tight text-gray-900 uppercase flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-emerald-600" />
                            Approved Roster
                        </h1>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                            LIST OF ALL STARTUPS SUCCESSFULLY ADMITTED INTO THE ACCELERATOR
                        </p>
                    </div>
                </div>

                {/* 2D Filter Bar */}
                <div className="flex flex-col md:flex-row gap-2 bg-gray-50 border border-t-2 border-t-emerald-500 p-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Filter approved projects..."
                            className="pl-8 h-8 rounded-none border-gray-200 bg-white text-[12px] focus-visible:ring-0 focus-visible:border-gray-400"
                        />
                    </div>
                    <Button variant="outline" className="h-8 rounded-none border-gray-200 bg-white text-[11px] font-medium uppercase tracking-wider px-4">
                        <Filter className="mr-1.5 h-3.5 w-3.5 text-gray-400" /> Filter
                    </Button>
                </div>

                {/* 2D Table Layout */}
                <div className="border border-gray-200 bg-white overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th>APPLICANT</th>
                                <th>PROJECT NAME</th>
                                <th>ADMISSION DATE</th>
                                <th>STATUS</th>
                                <th className="text-right">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app) => (
                                <tr key={app.id} className="group border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                    <td className="py-2 px-3">
                                        <div className="flex items-center gap-2">
                                            <div className="h-7 w-7 bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold">
                                                {app.applicant.substring(0, 2).toUpperCase()}
                                            </div>
                                            <span className="text-[13px] font-semibold text-gray-900 group-hover:text-pace-purple">
                                                {app.applicant}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-2 px-3 text-[12px] font-bold text-gray-700">
                                        {app.project}
                                    </td>
                                    <td className="py-2 px-3 text-[11px] font-medium text-gray-400">
                                        {app.submissionDate}
                                    </td>
                                    <td className="py-2 px-3">
                                        <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 italic">
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="py-2 px-3">
                                        <div className="flex justify-end gap-1">
                                            <Button variant="ghost" className="h-6 gap-1 px-2 rounded-none text-gray-400 hover:text-pace-purple font-bold text-[10px] uppercase">
                                                <Eye size={12} />
                                                View Profile
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    )
}
