"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MessageSquare, Bell } from "lucide-react"
import Link from "next/link"

export default function CommunicationsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Communications Center</h1>
                    <p className="text-muted-foreground mt-1">Manage all outbound channels.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Link href="/dashboard/communications/email">
                        <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer border-border/50">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-blue-500/10 rounded-lg">
                                        <Mail className="h-6 w-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <CardTitle>Email Campaigns</CardTitle>
                                        <CardDescription>Newsletters & Updates</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Send bulk emails to startups, mentors, or sponsors.</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/dashboard/communications/sms">
                        <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer border-border/50">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-green-500/10 rounded-lg">
                                        <MessageSquare className="h-6 w-6 text-green-500" />
                                    </div>
                                    <div>
                                        <CardTitle>SMS Broadcasts</CardTitle>
                                        <CardDescription>Instant Alerts</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Reach users directly on their mobile devices.</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/dashboard/communications/notifications">
                        <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer border-border/50">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-orange-500/10 rounded-lg">
                                        <Bell className="h-6 w-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <CardTitle>In-App Notifications</CardTitle>
                                        <CardDescription>System Alerts</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Push notifications to the dashboard.</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    )
}
