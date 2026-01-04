"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Bell } from "lucide-react"

export default function NotificationsPage() {
    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
                        <Bell className="h-8 w-8 text-primary" />
                        Send System Notification
                    </h1>
                    <p className="text-muted-foreground mt-1">Push alerts to users' dashboard notification center.</p>
                </div>

                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardContent className="space-y-4 pt-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Notification Title</Label>
                            <Input id="title" placeholder="e.g., System Maintenance" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="Type your notification message here..." className="min-h-[100px]" />
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                                <Bell className="mr-2 h-4 w-4" /> Push Notification
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
