"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function TermsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-primary">Terms & Conditions</h1>
                        <p className="text-muted-foreground mt-1">Edit the terms of service for the platform.</p>
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                </div>

                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardContent className="pt-6">
                        <Textarea
                            className="min-h-[500px] font-mono text-sm"
                            defaultValue={`1. Introduction
Welcome to GrowthSpire. By accessing our platform, you agree to these terms...

2. Intellectual Property
All content...

3. User Responsibilities
Users must...
`}
                        />
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
