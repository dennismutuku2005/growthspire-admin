"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileCode, Download, Upload } from "lucide-react"

export default function OtherPoliciesPage() {
    const otherPolicies = [
        { name: "Cookie Policy", size: "125 KB", lastUpdated: "Jan 2024" },
        { name: "Acceptable Use Policy", size: "200 KB", lastUpdated: "Dec 2023" },
        { name: "DMCA Policy", size: "85 KB", lastUpdated: "Nov 2023" },
    ]

    return (
        <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Other Policies</h1>
                    <p className="text-muted-foreground mt-1">Upload and manage supplementary policy documents.</p>
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Upload className="mr-2 h-4 w-4" /> Upload Policy
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {otherPolicies.map((policy) => (
                    <Card key={policy.name} className="border-border/50 bg-card/50 hover:bg-accent/5 transition-colors">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-secondary rounded-lg">
                                    <FileCode className="h-5 w-5" />
                                </div>
                                <CardTitle className="text-lg">{policy.name}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                                <span>{policy.size}</span>
                                <span>{policy.lastUpdated}</span>
                            </div>
                            <Button variant="outline" className="w-full">
                                <Download className="mr-2 h-4 w-4" /> Download PDF
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
