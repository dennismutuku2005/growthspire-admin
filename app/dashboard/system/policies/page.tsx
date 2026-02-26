"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { FileCode, Download, Upload, Search, Filter, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function OtherPoliciesPage() {
    const otherPolicies = [
        { name: "Cookie Policy", size: "125 KB", lastUpdated: "Jan 2024" },
        { name: "Acceptable Use Policy", size: "200 KB", lastUpdated: "Dec 2023" },
        { name: "DMCA Policy", size: "85 KB", lastUpdated: "Nov 2023" },
    ]

    return (
        <DashboardLayout>
            <div className="space-y-4 animate-in fade-in duration-500">
                {/* 2D Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div>
                        <h1 className="text-lg font-semibold tracking-tight text-gray-900 uppercase flex items-center gap-2">
                            <FileCode size={18} className="text-pace-purple" />
                            Policy Archives
                        </h1>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                            UPLOAD AND MANAGE SUPPLEMENTARY LEGAL POLICY DOCUMENTS IN PDF FORMAT
                        </p>
                    </div>
                    <Button size="sm" className="bg-pace-purple text-white hover:bg-pace-purple/90 rounded-none h-8 text-[11px] font-bold uppercase tracking-wide">
                        <Upload className="mr-1.5 h-3.5 w-3.5" /> Upload Archive
                    </Button>
                </div>

                {/* 2D Filter Bar */}
                <div className="flex flex-col md:flex-row gap-2 bg-gray-50 border border-t-2 border-t-pace-purple p-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Filter archives..."
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
                                <th>DOCUMENT FILENAME</th>
                                <th>FILE SIZE</th>
                                <th>LAST MODIFIED</th>
                                <th className="text-right">RETRIEVE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {otherPolicies.map((policy) => (
                                <tr key={policy.name} className="group border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                    <td className="py-2 px-3">
                                        <div className="flex items-center gap-2">
                                            <div className="h-7 w-7 bg-pace-purple/5 border border-pace-purple/10 text-pace-purple flex items-center justify-center">
                                                <FileCode size={12} />
                                            </div>
                                            <span className="text-[13px] font-bold text-gray-900 group-hover:text-pace-purple tracking-tight">
                                                {policy.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-2 px-3">
                                        <span className="text-[11px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 border border-gray-100 uppercase">
                                            {policy.size}
                                        </span>
                                    </td>
                                    <td className="py-2 px-3 text-[11px] font-medium text-gray-400 uppercase">
                                        {policy.lastUpdated}
                                    </td>
                                    <td className="py-2 px-3 text-right">
                                        <Button variant="ghost" className="h-8 rounded-none text-pace-purple font-bold text-[10px] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Download size={14} className="mr-1" />
                                            PDF
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 2D Info Footer */}
                <div className="bg-gray-950 p-3 flex items-center justify-between">
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest italic">Encrypted Policy Storage Active</p>
                    <span className="text-[9px] font-bold text-white uppercase opacity-40">STORAGE QUOTA: 1.2MB / 500MB</span>
                </div>
            </div>
        </DashboardLayout>
    )
}
