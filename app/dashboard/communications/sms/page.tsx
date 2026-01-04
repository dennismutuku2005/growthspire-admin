"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, Smartphone } from "lucide-react"

export default function SMSPage() {
    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
                        <Smartphone className="h-8 w-8 text-primary" />
                        Send SMS Broadcast
                    </h1>
                    <p className="text-muted-foreground mt-1">Send quick alerts to users' phones.</p>
                </div>

                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardContent className="space-y-4 pt-6">
                        <div className="space-y-2">
                            <Label htmlFor="recipients">Recipients</Label>
                            <Input id="recipients" placeholder="Select Group (e.g., Active Startups)" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="Type your SMS here (max 160 chars)..." className="min-h-[100px]" maxLength={160} />
                            <p className="text-xs text-muted-foreground text-right">0/160</p>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                                <Send className="mr-2 h-4 w-4" /> Send SMS
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
