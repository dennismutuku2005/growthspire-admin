"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Rocket, Filter, Search, MoreHorizontal, ArrowUpRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function AcceleratedStartupsPage() {
    const startups = [
        {
            id: 1,
            name: "EcoCharge",
            sector: "CleanTech",
            stage: "Series A",
            valuation: "$12M",
            status: "Graduated"
        },
        {
            id: 2,
            name: "MediFlow",
            sector: "HealthTech",
            stage: "Seed",
            valuation: "$5M",
            status: "Active"
        },
        {
            id: 3,
            name: "AgriSense",
            sector: "AgriTech",
            stage: "Pre-Seed",
            valuation: "$2.5M",
            status: "Active"
        },
        {
            id: 4,
            name: "PayUnit",
            sector: "Fintech",
            stage: "Series B",
            valuation: "$45M",
            status: "Exited"
        }
    ]

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in duration-500">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 flex items-center gap-2">
                            <Rocket className="text-purple-600" size={24} />
                            Accelerated Portfolio
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Track the progress and valuation of portfolio companies.
                        </p>
                    </div>
                    <Button className="bg-purple-600 text-white hover:bg-purple-700 rounded-lg shadow-sm">
                        <ArrowUpRight className="mr-2 h-4 w-4" /> Export Report
                    </Button>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row gap-3 bg-white p-4 border border-gray-100 rounded-xl shadow-sm">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search portfolio companies..."
                            className="pl-9 h-10 rounded-lg border-gray-200 bg-white focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>
                    <Button variant="outline" className="h-10 rounded-lg border-gray-200 text-gray-600 hover:text-gray-900">
                        <Filter className="mr-2 h-4 w-4 text-gray-400" /> Filter
                    </Button>
                </div>

                {/* Table */}
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h3 className="text-sm font-semibold text-gray-900">Portfolio Performance</h3>
                        <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                            Total Valuation: $64.5M
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <th className="py-3 px-6">Startup</th>
                                    <th className="py-3 px-6">Sector</th>
                                    <th className="py-3 px-6">Stage</th>
                                    <th className="py-3 px-6">Valuation</th>
                                    <th className="py-3 px-6">Status</th>
                                    <th className="py-3 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {startups.map((s) => (
                                    <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs uppercase">
                                                    {s.name.substring(0, 2)}
                                                </div>
                                                <span className="text-sm font-medium text-gray-900">
                                                    {s.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-600">
                                            {s.sector}
                                        </td>
                                        <td className="py-4 px-6">
                                            <Badge variant="outline" className="rounded-md font-normal border-gray-200 text-gray-600">
                                                {s.stage}
                                            </Badge>
                                        </td>
                                        <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                                            {s.valuation}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={cn(
                                                "text-xs font-medium px-2.5 py-0.5 rounded-full inline-block",
                                                s.status === "Active" ? "bg-emerald-50 text-emerald-700" :
                                                    s.status === "Exited" ? "bg-blue-50 text-blue-700" :
                                                        "bg-gray-100 text-gray-700"
                                            )}>
                                                {s.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-gray-100">
                                                <MoreHorizontal className="h-4 w-4 text-gray-500" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
