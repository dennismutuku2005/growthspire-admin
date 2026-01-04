"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Clock } from "lucide-react"

export default function UpcomingEventsPage() {
    const events = [
        {
            id: 1,
            title: "Startup Pitch Night",
            date: "2024-04-15",
            time: "18:00",
            location: "Innovation Hub Auditrium",
            attendees: 120,
            type: "Networking",
            status: "Upcoming",
        },
        {
            id: 2,
            title: "Founder's Workshop: Fundraising",
            date: "2024-04-20",
            time: "10:00",
            location: "Virtual (Zoom)",
            attendees: 45,
            type: "Workshop",
            status: "Upcoming",
        },
    ]

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Upcoming Events</h1>
                    <p className="text-muted-foreground mt-1">Next events on the calendar.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                        <Card key={event.id} className="flex flex-col border-border/50 bg-card/50">
                            <CardHeader>
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant="outline" className="bg-secondary/50">{event.type}</Badge>
                                    <Badge>{event.status}</Badge>
                                </div>
                                <CardTitle className="text-xl">{event.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4">
                                <div className="flex items-center text-sm text-muted-foreground gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>{event.date}</span>
                                    <Clock className="h-4 w-4 ml-2" />
                                    <span>{event.time}</span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>{event.location}</span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground gap-2">
                                    <Users className="h-4 w-4" />
                                    <span>{event.attendees} Registered</span>
                                </div>
                                <Button className="w-full mt-4">View Registrations</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}
