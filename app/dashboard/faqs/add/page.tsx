"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"

export default function AddFAQPage() {
    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Add New FAQ</h1>
                    <p className="text-muted-foreground mt-1">Create a new question and answer pair.</p>
                </div>

                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardContent className="space-y-4 pt-6">
                        <div className="space-y-2">
                            <Label htmlFor="question">Question</Label>
                            <Input id="question" placeholder="e.g., How long is the program?" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="answer">Answer</Label>
                            <Textarea id="answer" placeholder="Enter the detailed answer..." className="min-h-[150px]" />
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                                <Save className="mr-2 h-4 w-4" /> Save FAQ
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
