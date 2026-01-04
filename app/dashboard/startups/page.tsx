"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function StartupsPage() {
    const startups = [
        {
            id: 1,
            name: "TechNova",
            founder: "Sarah Johnson",
            stage: "Seed",
            sector: "Fintech",
            status: "Active",
            joined: "2024-01-15",
        },
        {
            id: 2,
            name: "GreenLeaf",
            founder: "David Chen",
            stage: "Series A",
            sector: "AgriTech",
            status: "Accelerated",
            joined: "2023-11-20",
        },
        {
            id: 3,
            name: "HealthConnect",
            founder: "Dr. Emily Smith",
            stage: "Pre-Seed",
            sector: "HealthTech",
            status: "Pending",
            joined: "2024-02-01",
        },
        {
            id: 4,
            name: "EduSphere",
            founder: "James Wilson",
            stage: "Idea",
            sector: "EdTech",
            status: "Active",
            joined: "2024-02-10",
        },
    ]

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Startups</h1>
                        <p className="text-muted-foreground mt-1">Manage and track the growth of your startup ecosystem.</p>
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                        <Plus className="mr-2 h-4 w-4" /> Add Startup
                    </Button>
                </div>

                <div className="flex gap-4 items-center">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search startups..." className="pl-9 bg-card border-border/50 focus:border-primary/50 transition-colors" />
                    </div>
                    <Button variant="outline" className="border-border/50 bg-card hover:bg-accent hover:text-accent-foreground">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                </div>

                <Card className="border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>All Startups</CardTitle>
                        <CardDescription>A list of all startups currently in the program.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-border/50">
                                    <TableHead>Company Name</TableHead>
                                    <TableHead>Founder</TableHead>
                                    <TableHead>Sector</TableHead>
                                    <TableHead>Stage</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Joined Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {startups.map((startup) => (
                                    <TableRow key={startup.id} className="hover:bg-accent/50 border-border/50 transition-colors">
                                        <TableCell className="font-medium">{startup.name}</TableCell>
                                        <TableCell>{startup.founder}</TableCell>
                                        <TableCell>{startup.sector}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-secondary/50 border-secondary-foreground/20">
                                                {startup.stage}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className={
                                                    startup.status === "Active" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25 border-emerald-200/20" :
                                                        startup.status === "Accelerated" ? "bg-blue-500/15 text-blue-600 dark:text-blue-400 hover:bg-blue-500/25 border-blue-200/20" :
                                                            "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/25 border-yellow-200/20"
                                                }
                                                variant="secondary"
                                            >
                                                {startup.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">{startup.joined}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
