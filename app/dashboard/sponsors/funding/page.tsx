"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { DollarSign, Search, Filter, MoreHorizontal, PieChart, ArrowUpRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function SponsorshipFundingPage() {
    const transactions = [
        {
            id: 1,
            source: "Global Tech Ventures",
            amount: "$250,000",
            date: "2024-03-01",
            type: "Wire Transfer",
            status: "Received"
        },
        {
            id: 2,
            source: "Future Fund Foundation",
            amount: "$500,000",
            date: "2024-02-15",
            type: "Check",
            status: "Received"
        },
        {
            id: 3,
            source: "Innovate Bank",
            amount: "$125,000",
            date: "2024-03-20",
            type: "Wire Transfer",
            status: "Pending"
        }
    ]

    return (
        <DashboardLayout>
            <div className="space-y-4 animate-in fade-in duration-500">
                {/* 2D Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-gray-900 uppercase flex items-center gap-2">
                            <DollarSign size={18} className="text-black" />
                            Funding Ledger
                        </h1>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                            TRACK FINANCIAL CONTRIBUTIONS, DISBURSEMENTS AND GRANT COMPLIANCE
                        </p>
                    </div>
                    <Button size="sm" className="bg-black text-white hover:bg-black/90 rounded-none h-8 text-[11px] font-bold uppercase tracking-wide px-4">
                        Process Disbursement
                    </Button>
                </div>

                {/* 2D Summary Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="bg-white border border-gray-200 p-4 border-l-4 border-l-emerald-500">
                        <div className="flex justify-between items-start">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Raised (YTD)</p>
                            <ArrowUpRight size={14} className="text-emerald-500" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900 mt-1">$1,750,000</p>
                        <div className="mt-3 bg-gray-50 h-1.5 w-full">
                            <div className="bg-emerald-500 h-full w-[70%]" />
                        </div>
                        <p className="text-[10px] text-gray-500 font-bold mt-2 uppercase tracking-tight">TARGET: $2.5M (70% ACHIEVED)</p>
                    </div>
                    <div className="bg-white border border-gray-200 p-4 border-l-4 border-l-amber-500">
                        <div className="flex justify-between items-start">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Upcoming Disbursements</p>
                            <PieChart size={14} className="text-amber-500" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900 mt-1">$200,000</p>
                        <p className="text-[10px] text-amber-600 font-bold mt-5 uppercase tracking-tight bg-amber-50 px-2 py-0.5 w-fit">SCHEDULED FOR APRIL 1ST</p>
                    </div>
                </div>

                {/* 2D Filter Bar */}
                <div className="flex flex-col md:flex-row gap-2 bg-gray-50 border border-t-2 border-t-black p-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by source or transaction type..."
                            className="pl-8 h-8 rounded-none border-gray-200 bg-white text-[12px] focus-visible:ring-0 focus-visible:border-gray-400"
                        />
                    </div>
                    <Button variant="outline" className="h-8 rounded-none border-gray-200 bg-white text-[11px] font-bold uppercase tracking-wider px-4">
                        <Filter className="mr-1.5 h-3.5 w-3.5 text-gray-400" /> Filter
                    </Button>
                </div>

                {/* 2D Table Layout */}
                <div className="border border-gray-200 bg-white overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">FUNDING SOURCE</th>
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">AMOUNT</th>
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">DATE</th>
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">METHOD</th>
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">STATUS</th>
                                <th className="py-2.5 px-3 text-right text-[10px] font-bold text-gray-400 uppercase">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((t) => (
                                <tr key={t.id} className="group border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                    <td className="py-2.5 px-3">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-black" />
                                            <span className="text-[13px] font-bold text-gray-900 group-hover:text-black uppercase">
                                                {t.source}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-2.5 px-3">
                                        <span className="text-[13px] font-bold text-emerald-600 tracking-tight">
                                            {t.amount}
                                        </span>
                                    </td>
                                    <td className="py-2.5 px-3 text-[11px] font-bold text-gray-400 uppercase">
                                        {t.date}
                                    </td>
                                    <td className="py-2.5 px-3 text-[11px] font-bold text-gray-500 uppercase tracking-tight">
                                        {t.type}
                                    </td>
                                    <td className="py-2.5 px-3">
                                        <span className={cn(
                                            "text-[10px] font-bold uppercase px-1.5 py-0.5 border",
                                            t.status === 'Received' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                                        )}>
                                            {t.status}
                                        </span>
                                    </td>
                                    <td className="py-2.5 px-3 text-right">
                                        <Button variant="ghost" className="h-6 w-6 p-0 rounded-none text-gray-300 hover:text-black">
                                            <MoreHorizontal size={14} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 2D Footer Stats */}
                <div className="bg-gray-950 p-3 flex items-center justify-between">
                    <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">GrowthSpire Treasury Verified</p>
                    <div className="flex items-center gap-4">
                        <p className="text-[10px] font-bold text-white uppercase tracking-widest opacity-60">Total Vetted: $4.2M</p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
