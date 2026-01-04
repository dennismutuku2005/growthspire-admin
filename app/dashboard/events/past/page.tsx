"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users } from "lucide-react"

export default function PastEventsPage() {
    const events = [
        {
            id: 3,
            title: "Tech Trends 2024",
            date: "2024-03-10",
            time: "14:00",
            location: "Main Hall",
            attendees: 200,
            type: "Conference",
            status: "Past",
        },
        {
            id: 4,
            title: "Winter Cohort Demo Day",
            date: "2024-02-15",
            time: "09:00",
            location: "Innovation Hub",
            attendees: 350,
            type: "Demo Day",
            status: "Past",
        },
    ]

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Past Events</h1>
                    <p className="text-muted-foreground mt-1">Archive of previous events.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                        <Card key={event.id} className="flex flex-col border-border/50 bg-card/50 opacity-75 hover:opacity-100 transition-opacity">
                            <CardHeader>
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant="outline" className="bg-secondary/50">{event.type}</Badge>
                                    <Badge variant="secondary">{event.status}</Badge>
                                </div>
                                <CardTitle className="text-xl">{event.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4">
                                <div className="flex items-center text-sm text-muted-foreground gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>{event.date}</span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground gap-2">
                                    <Users className="h-4 w-4" />
                                    <span>{event.attendees} Attended</span>
                                </div>
                                <Button variant="outline" className="w-full mt-4">View Report</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}
