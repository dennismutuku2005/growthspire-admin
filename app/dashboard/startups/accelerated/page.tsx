"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Rocket, Filter, Search, MoreHorizontal, ArrowUpRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export default function AcceleratedStartupsPage() {
    const [startups, setStartups] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        fetchStartups()
    }, [])

    const fetchStartups = async () => {
        setLoading(true)
        try {
            const res = await fetch("http://localhost/growthspire/backend/startups.php?action=get_startups")
            const data = await res.json()
            if (data.success) {
                // Filter only accelerated ones
                const accelerated = data.data.filter((s: any) => s.status === 'Accelerated')
                setStartups(accelerated)
            }
        } catch (err) {
            toast.error("Failed to load portfolio")
        } finally {
            setLoading(false)
        }
    }

    const filteredStartups = startups.filter((s: any) => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.sector?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in duration-500">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight text-foreground flex items-center gap-2">
                            <Rocket className="text-primary" size={20} />
                            Accelerated Portfolio
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Track the progress and valuation of portfolio companies.
                        </p>
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 rounded-lg shadow-sm">
                        <ArrowUpRight className="mr-2 h-4 w-4" /> Export Report
                    </Button>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row gap-3 bg-card p-4 border border-border rounded-xl shadow-sm">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search portfolio companies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 h-10 rounded-lg border-border bg-background focus:ring-primary focus:border-primary text-sm"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
                        <h3 className="text-sm font-semibold text-foreground">Portfolio Performance</h3>
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                            Total Members: {filteredStartups.length}
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-muted/30 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    <th className="py-3 px-6">Startup</th>
                                    <th className="py-3 px-6">Sector</th>
                                    <th className="py-3 px-6">Stage</th>
                                    <th className="py-3 px-6">Status</th>
                                    <th className="py-3 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {loading ? (
                                    <tr><td colSpan={5} className="py-20 text-center"><Loader2 className="animate-spin h-6 w-6 mx-auto text-muted-foreground" /></td></tr>
                                ) : filteredStartups.length > 0 ? filteredStartups.map((s) => (
                                    <tr key={s.id} className="hover:bg-muted/20 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase overflow-hidden border border-primary/20">
                                                    {s.logo ? <img src={s.logo} alt="" className="w-full h-full object-contain" /> : s.name.substring(0, 2)}
                                                </div>
                                                <span className="text-sm font-semibold text-foreground">
                                                    {s.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-muted-foreground">
                                            {s.sector}
                                        </td>
                                        <td className="py-4 px-6">
                                            <Badge variant="outline" className="rounded-md font-medium border-border text-muted-foreground bg-muted/50">
                                                {s.stage}
                                            </Badge>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={cn(
                                                "text-xs font-medium px-2.5 py-1 rounded-md inline-block border",
                                                "bg-emerald-50 text-emerald-700 border-emerald-100"
                                            )}>
                                                {s.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-muted text-muted-foreground">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan={5} className="py-20 text-center text-sm text-muted-foreground">No accelerated startups discovered.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
