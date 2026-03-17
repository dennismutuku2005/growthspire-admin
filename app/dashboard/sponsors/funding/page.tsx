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
                        <h1 className="text-xl font-semibold tracking-tight text-foreground flex items-center gap-2">
                            <DollarSign size={20} className="text-primary" />
                            Funding Ledger
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Track financial contributions, disbursements and grant compliance
                        </p>
                    </div>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md h-9 text-sm font-medium px-4">
                        Process Disbursement
                    </Button>
                </div>

                {/* 2D Summary Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="bg-card border border-border p-6 rounded-xl shadow-sm border-l-4 border-l-emerald-500">
                        <div className="flex justify-between items-start">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Total Raised (YTD)</p>
                            <ArrowUpRight size={16} className="text-emerald-500" />
                        </div>
                        <p className="text-2xl font-bold text-foreground mt-1">$1,750,000</p>
                        <div className="mt-4 bg-muted h-1.5 w-full rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full w-[70%]" />
                        </div>
                        <p className="text-xs text-muted-foreground font-medium mt-2">Target: $2.5M (70% Achieved)</p>
                    </div>
                    <div className="bg-card border border-border p-6 rounded-xl shadow-sm border-l-4 border-l-amber-500">
                        <div className="flex justify-between items-start">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Upcoming Disbursements</p>
                            <PieChart size={16} className="text-amber-500" />
                        </div>
                        <p className="text-2xl font-bold text-foreground mt-1">$200,000</p>
                        <p className="text-xs text-amber-700 font-medium mt-5 bg-amber-50/50 border border-amber-100 px-2 py-1 rounded-md w-fit">Scheduled for April 1st</p>
                    </div>
                </div>

                {/* 2D Filter Bar */}
                <div className="flex flex-col md:flex-row gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by source or transaction type..."
                            className="pl-9 h-10 border-border bg-background text-sm rounded-lg focus-visible:ring-primary focus-visible:border-primary"
                        />
                    </div>
                    <Button variant="outline" className="h-10 border-border bg-background text-sm font-medium px-4 rounded-lg">
                        <Filter className="mr-1.5 h-4 w-4 text-muted-foreground" /> Filter
                    </Button>
                </div>

                {/* 2D Table Layout */}
                <div className="border border-border bg-card overflow-hidden rounded-xl shadow-sm">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-muted/30 border-b border-border">
                                <th className="py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Funding Source</th>
                                <th className="py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount</th>
                                <th className="py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                                <th className="py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Method</th>
                                <th className="py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                                <th className="py-3 px-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((t) => (
                                <tr key={t.id} className="group border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-primary" />
                                            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                                {t.source}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className="text-sm font-semibold text-emerald-600">
                                            {t.amount}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-muted-foreground">
                                        {t.date}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-muted-foreground">
                                        {t.type}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={cn(
                                            "text-xs font-medium px-2.5 py-1 rounded-md border",
                                            t.status === 'Received' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-amber-50 text-amber-700 border-amber-100"
                                        )}>
                                            {t.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <Button variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground">
                                            <MoreHorizontal size={16} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 2D Footer Stats */}
                <div className="bg-primary p-4 flex items-center justify-between rounded-xl shadow-sm">
                    <p className="text-xs font-semibold text-primary-foreground uppercase tracking-widest opacity-90">GrowthSpire Treasury Verified</p>
                    <div className="flex items-center gap-4">
                        <p className="text-sm font-medium text-primary-foreground">Total Vetted: $4.2M</p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
