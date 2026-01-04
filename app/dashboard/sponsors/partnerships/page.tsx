"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Handshake, Download, ExternalLink } from "lucide-react"

export default function PartnershipsPage() {
    const partnerships = [
        {
            id: 1,
            partner: "TechGiant Corp",
            type: "Strategic",
            agreementDate: "2024-01-15",
            status: "Active",
            benefits: "Cloud Credits, Hardware Access"
        },
        {
            id: 2,
            partner: "University Innovation Hub",
            type: "Academic",
            agreementDate: "2023-11-20",
            status: "Active",
            benefits: "Research Labs, Intern Talent"
        },
        {
            id: 3,
            partner: "Legal Eagles LLP",
            type: "Service Provider",
            agreementDate: "2024-02-01",
            status: "Pending Renewal",
            benefits: "Pro-bono Legal Advice"
        }
    ]

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Strategic Partnerships</h1>
                    <p className="text-muted-foreground mt-1">Manage partnership agreements and benefits.</p>
                </div>

                <Card className="border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Active Agreements</CardTitle>
                        <CardDescription>Current partnership MoUs and deliverables.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-border/50">
                                    <TableHead>Partner</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Benefits</TableHead>
                                    <TableHead>Agreement Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {partnerships.map((p) => (
                                    <TableRow key={p.id} className="hover:bg-accent/50 border-border/50 transition-colors">
                                        <TableCell className="font-medium flex items-center gap-2">
                                            <Handshake className="h-4 w-4 text-primary" />
                                            {p.partner}
                                        </TableCell>
                                        <TableCell>{p.type}</TableCell>
                                        <TableCell>{p.benefits}</TableCell>
                                        <TableCell>{p.agreementDate}</TableCell>
                                        <TableCell>
                                            <Badge variant={p.status === 'Active' ? 'default' : 'secondary'}>
                                                {p.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button size="icon" variant="ghost">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                                <Button size="icon" variant="ghost">
                                                    <ExternalLink className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
