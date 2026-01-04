"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, PlayCircle } from "lucide-react"

export default function ResourcesPage() {
    const resources = [
        {
            id: 1,
            title: "Seed Funding Term Sheet Template",
            type: "Document",
            format: "PDF",
            size: "2.5 MB",
        },
        {
            id: 2,
            title: "Market Analysis Framework",
            type: "Template",
            format: "XLSX",
            size: "1.2 MB",
        },
        {
            id: 3,
            title: "How to Build a Pitch Deck",
            type: "Video Course",
            format: "MP4",
            size: "15 mins",
        },
    ]

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-primary">Resources Library</h1>
                        <p className="text-muted-foreground mt-1">Tools, templates, and guides for startups.</p>
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Upload Resource
                    </Button>
                </div>

                <div className="grid gap-4">
                    {resources.map((resource) => (
                        <Card key={resource.id} className="border-border/50 bg-card/50 hover:bg-accent/5 transition-colors">
                            <CardContent className="flex items-center justify-between p-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-secondary rounded-lg">
                                        {resource.type === 'Video Course' ? <PlayCircle className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{resource.title}</h3>
                                        <p className="text-sm text-muted-foreground">{resource.type} • {resource.format} • {resource.size}</p>
                                    </div>
                                </div>
                                <Button variant="outline">
                                    <Download className="mr-2 h-4 w-4" /> Download
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}
