"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

export default function EmailPage() {
    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Compose Email</h1>
                    <p className="text-muted-foreground mt-1">Send updates to your community.</p>
                </div>

                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardContent className="space-y-4 pt-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="to">To:</Label>
                                <Input id="to" placeholder="All Startups" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject:</Label>
                                <Input id="subject" placeholder="Important Update" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="Type your email content here..." className="min-h-[300px]" />
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                                <Send className="mr-2 h-4 w-4" /> Send Email
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
