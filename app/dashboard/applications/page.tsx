"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"

export default function ApplicationsDashboard() {
    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Applications Overview</h1>
                    <p className="text-muted-foreground mt-1">Track and manage all incoming applications.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Link href="/dashboard/applications/pending">
                        <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer border-border/50">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                                        <Clock className="h-6 w-6 text-yellow-500" />
                                    </div>
                                    <div>
                                        <CardTitle>Pending Review</CardTitle>
                                        <CardDescription>12 Waiting</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Applications waiting for initial screening.</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/dashboard/applications/approved">
                        <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer border-border/50">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                                        <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                                    </div>
                                    <div>
                                        <CardTitle>Approved</CardTitle>
                                        <CardDescription>45 Accepted</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Applications that have been accepted into the program.</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/dashboard/applications/rejected">
                        <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer border-border/50">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-red-500/10 rounded-lg">
                                        <XCircle className="h-6 w-6 text-red-500" />
                                    </div>
                                    <div>
                                        <CardTitle>Rejected</CardTitle>
                                        <CardDescription>23 Archived</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Applications that did not meet criteria.</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    )
}
