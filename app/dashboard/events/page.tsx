"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Clock } from "lucide-react"

export default function EventsPage() {
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
    ]

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-primary">Events</h1>
                        <p className="text-muted-foreground mt-1">Manage ecosystem events and networking opportunities.</p>
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Create Event
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                        <Card key={event.id} className="flex flex-col border-border/50 bg-card/50 hover:bg-accent/5 transition-colors">
                            <CardHeader>
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant="outline" className="bg-secondary/50">{event.type}</Badge>
                                    <Badge variant={event.status === 'Upcoming' ? 'default' : 'secondary'}>{event.status}</Badge>
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
                                <Button variant="outline" className="w-full mt-4">Manage Details</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}
