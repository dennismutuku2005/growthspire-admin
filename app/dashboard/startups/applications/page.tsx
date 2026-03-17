"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Filter, Search, MoreHorizontal, Download, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function ApplicationsPage() {
    const applications = [
        {
            id: 1,
            founder: "Sarah Jenkins",
            startup: "GreenRoof Systems",
            sector: "CleanTech",
            submitted: "2024-03-10",
            score: "88/100",
            status: "Under Review"
        },
        {
            id: 2,
            founder: "Michael Chen",
            startup: "NeuroLink",
            sector: "HealthTech",
            submitted: "2024-03-09",
            score: "92/100",
            status: "Interview Scheduled"
        },
        {
            id: 3,
            founder: "Amara Okeke",
            startup: "FinPath",
            sector: "Fintech",
            submitted: "2024-03-08",
            score: "76/100",
            status: "New"
        },
        {
            id: 4,
            founder: "David Rossi",
            startup: "LearnVR",
            sector: "EdTech",
            submitted: "2024-03-05",
            score: "45/100",
            status: "Rejected"
        }
    ]

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in duration-500">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight text-foreground flex items-center gap-2">
                            <FileText className="text-primary" size={20} />
                            Startup Intake Pipeline
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Review and manage incoming startup applications.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="border-border rounded-lg h-10 px-4 text-sm font-medium">
                            <Download className="mr-2 h-4 w-4 text-muted-foreground" /> Export CSV
                        </Button>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row gap-3 bg-card p-4 border border-border rounded-xl shadow-sm">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Find application by startup or founder..."
                            className="pl-9 h-10 rounded-lg border-border bg-background focus:ring-primary focus:border-primary text-sm"
                        />
                    </div>
                    <Button variant="outline" className="h-10 rounded-lg border-border text-foreground hover:text-foreground/80 px-4">
                        <Filter className="mr-2 h-4 w-4 text-muted-foreground" /> Filter
                    </Button>
                </div>

                {/* Table */}
                <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
                        <h3 className="text-sm font-semibold text-foreground">Recent Submissions</h3>
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                            {applications.length} New Applications
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-muted/30 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    <th className="py-3 px-6">Startup / Founder</th>
                                    <th className="py-3 px-6">Sector</th>
                                    <th className="py-3 px-6">Submission Date</th>
                                    <th className="py-3 px-6">Score</th>
                                    <th className="py-3 px-6">Status</th>
                                    <th className="py-3 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {applications.map((app) => (
                                    <tr key={app.id} className="hover:bg-muted/20 transition-colors">
                                        <td className="py-4 px-6">
                                            <div>
                                                <span className="text-sm font-semibold text-foreground block">
                                                    {app.startup}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    by {app.founder}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-muted-foreground">
                                            {app.sector}
                                        </td>
                                        <td className="py-4 px-6 text-sm text-muted-foreground">
                                            {app.submitted}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={cn(
                                                "text-xs font-semibold",
                                                parseInt(app.score) > 80 ? "text-emerald-600" :
                                                    parseInt(app.score) > 50 ? "text-amber-600" : "text-destructive"
                                            )}>
                                                {app.score}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={cn(
                                                "text-xs font-medium px-2.5 py-1 rounded-md inline-block border",
                                                app.status === "New" ? "bg-primary/10 text-primary border-primary/20" :
                                                    app.status === "Rejected" ? "bg-destructive/10 text-destructive border-destructive/20" :
                                                        app.status === "Interview Scheduled" ? "bg-indigo-50 text-indigo-700 border-indigo-100" :
                                                            "bg-amber-50 text-amber-700 border-amber-100"
                                            )}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-primary/10 hover:text-primary text-muted-foreground">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-muted text-muted-foreground">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </div>
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
