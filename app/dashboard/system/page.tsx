"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, FileText, Lock } from "lucide-react"
import Link from "next/link"

export default function SystemUpdatesPage() {
    const policies = [
        {
            title: "Privacy Policy",
            description: "Manage how user data is collected and used.",
            icon: Shield,
            href: "/dashboard/system/privacy-policy",
            lastUpdated: "2 days ago",
        },
        {
            title: "Terms & Conditions",
            description: "Define the rules and regulations for using the platform.",
            icon: FileText,
            href: "/dashboard/system/terms",
            lastUpdated: "1 month ago",
        },
        {
            title: "User Data Policy",
            description: "Specific regulations regarding user data rights.",
            icon: Lock,
            href: "/dashboard/system/user-data-policy",
            lastUpdated: "3 weeks ago",
        },
    ]

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">System Policies</h1>
                    <p className="text-muted-foreground mt-1">Manage legal documents and system-wide policies.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {policies.map((policy) => (
                        <Link key={policy.title} href={policy.href}>
                            <Card className="h-full border-border/50 hover:border-primary/50 cursor-pointer transition-all hover:shadow-md bg-card/50">
                                <CardHeader>
                                    <div className="bg-primary/10 p-3 rounded-lg w-fit mb-3">
                                        <policy.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-xl">{policy.title}</CardTitle>
                                    <CardDescription>{policy.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs text-muted-foreground">Last updated: {policy.lastUpdated}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}
