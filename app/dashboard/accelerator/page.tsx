"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, Zap } from "lucide-react"
import Link from "next/link"

export default function AcceleratorDashboard() {
    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Accelerator Overview</h1>
                    <p className="text-muted-foreground mt-1">Monitor program health and resources.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Link href="/dashboard/accelerator/programs">
                        <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer border-border/50">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Zap className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle>Programs</CardTitle>
                                        <CardDescription>3 Active Batches</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Manage ongoing accelerator cohorts and curriculum.</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/dashboard/accelerator/mentors">
                        <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer border-border/50">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-purple-500/10 rounded-lg">
                                        <Users className="h-6 w-6 text-purple-500" />
                                    </div>
                                    <div>
                                        <CardTitle>Mentors</CardTitle>
                                        <CardDescription>45 Active Mentors</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Coordinate mentorship sessions and office hours.</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/dashboard/accelerator/resources">
                        <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer border-border/50">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-blue-500/10 rounded-lg">
                                        <BookOpen className="h-6 w-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <CardTitle>Resources</CardTitle>
                                        <CardDescription>120+ Documents</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Manage digital library and tools for startups.</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    )
}
