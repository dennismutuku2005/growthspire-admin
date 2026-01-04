"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Zap, CheckCircle2 } from "lucide-react"

export default function AcceleratedStartupsPage() {
    const acceleratedStartups = [
        {
            id: 2,
            name: "GreenLeaf",
            cohort: "Winter 2023",
            growth: "+200%",
            fundingRaised: "$1.2M",
            status: "Graduated",
        },
        {
            id: 5,
            name: "SolarStream",
            cohort: "Summer 2023",
            growth: "+150%",
            fundingRaised: "$850k",
            status: "In Program",
        },
        {
            id: 6,
            name: "BioGenix",
            cohort: "Winter 2024",
            growth: "+45%",
            fundingRaised: "$300k",
            status: "In Program",
        },
    ]

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Accelerated Startups</h1>
                    <p className="text-muted-foreground mt-1">High-performing startups currently in or graduated from the acceleration program.</p>
                </div>

                <Card className="border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Cohort Performance</CardTitle>
                                <CardDescription>Tracking growth and funding metrics.</CardDescription>
                            </div>
                            <Zap className="h-5 w-5 text-yellow-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-border/50">
                                    <TableHead>Startups</TableHead>
                                    <TableHead>Cohort</TableHead>
                                    <TableHead>Growth (YoY)</TableHead>
                                    <TableHead>Funding Raised</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {acceleratedStartups.map((startup) => (
                                    <TableRow key={startup.id} className="hover:bg-accent/50 border-border/50 transition-colors">
                                        <TableCell className="font-medium">{startup.name}</TableCell>
                                        <TableCell>{startup.cohort}</TableCell>
                                        <TableCell className="text-emerald-600 font-semibold">{startup.growth}</TableCell>
                                        <TableCell>{startup.fundingRaised}</TableCell>
                                        <TableCell>
                                            <Badge
                                                className={
                                                    startup.status === "Graduated" ? "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-200/20" :
                                                        "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-200/20"
                                                }
                                                variant="secondary"
                                            >
                                                {startup.status === "Graduated" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                                                {startup.status}
                                            </Badge>
                                        </TableCell>
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
