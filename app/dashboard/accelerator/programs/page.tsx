"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users } from "lucide-react"

export default function ProgramsPage() {
    const programs = [
        {
            id: 1,
            name: "Spring 2024 Batch",
            startDate: "2024-02-01",
            endDate: "2024-05-30",
            startups: 15,
            status: "Active",
        },
        {
            id: 2,
            name: "Fintech Focus 2024",
            startDate: "2024-06-01",
            endDate: "2024-09-01",
            startups: 10,
            status: "Upcoming",
        },
        {
            id: 3,
            name: "Winter 2023 Batch",
            startDate: "2023-11-01",
            endDate: "2024-02-01",
            startups: 12,
            status: "Completed",
        },
    ]

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-primary">Accelerator Programs</h1>
                        <p className="text-muted-foreground mt-1">Manage cohorts and curriculum schedules.</p>
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Create New Program
                    </Button>
                </div>

                <div className="grid gap-6">
                    {programs.map((program) => (
                        <Card key={program.id} className="border-border/50 bg-card/50">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-xl">{program.name}</CardTitle>
                                        <CardDescription className="mt-1 flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            {program.startDate} - {program.endDate}
                                        </CardDescription>
                                    </div>
                                    <Badge variant={program.status === 'Active' ? 'default' : 'secondary'}>
                                        {program.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Users className="h-4 w-4" />
                                        {program.startups} Startups Enrolled
                                    </div>
                                    <Button variant="outline" size="sm">Manage Cohort</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}
