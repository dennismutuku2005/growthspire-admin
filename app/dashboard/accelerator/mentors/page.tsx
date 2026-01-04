"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Linkedin, Mail } from "lucide-react"

export default function MentorsPage() {
    const mentors = [
        {
            id: 1,
            name: "Elena Rodriguez",
            role: "Product Strategy",
            company: "Google",
            specialty: ["Product Market Fit", "UX"],
        },
        {
            id: 2,
            name: "Marcus Johnson",
            role: "CMO",
            company: "TechStar",
            specialty: ["Marketing", "Branding"],
        },
        {
            id: 3,
            name: "Dr. Alan Grant",
            role: "Investor",
            company: "Horizon VC",
            specialty: ["Fundraising", "Pitching"],
        },
    ]

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-primary">Mentors</h1>
                        <p className="text-muted-foreground mt-1">Connect startups with industry experts.</p>
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Invite Mentor
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {mentors.map((mentor) => (
                        <Card key={mentor.id} className="border-border/50 bg-card/50 text-center">
                            <CardHeader className="flex flex-col items-center pb-2">
                                <Avatar className="h-20 w-20 mb-4">
                                    <AvatarFallback className="text-lg bg-primary/10 text-primary">{mentor.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <CardTitle>{mentor.name}</CardTitle>
                                <CardDescription>{mentor.role} at {mentor.company}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {mentor.specialty.map((spec) => (
                                        <Badge key={spec} variant="secondary" className="bg-secondary/50 font-normal">
                                            {spec}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex justify-center gap-2 pt-2">
                                    <Button size="icon" variant="ghost">
                                        <Linkedin className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost">
                                        <Mail className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}
