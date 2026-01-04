"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X, FileText } from "lucide-react"

export default function StartupApplicationsPage() {
    const applications = [
        {
            id: 101,
            startup: "QuantumLeap",
            founder: "Alice Wong",
            submitted: "2024-03-01",
            status: "Under Review",
            score: "85/100",
        },
        {
            id: 102,
            startup: "CyberShield",
            founder: "Bob Martin",
            submitted: "2024-02-28",
            status: "Pending",
            score: "-",
        },
        {
            id: 103,
            startup: "EcoWare",
            founder: "Charlie Day",
            submitted: "2024-02-25",
            status: "interview",
            score: "92/100",
        },
    ]

    return (
        <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-primary">Startup Applications</h1>
                <p className="text-muted-foreground mt-1">Review and manage incoming startup applications.</p>
            </div>

            <Card className="border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>New applications requiring review.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-border/50">
                                <TableHead>Startup Name</TableHead>
                                <TableHead>Founder</TableHead>
                                <TableHead>Submission Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Score</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applications.map((app) => (
                                <TableRow key={app.id} className="hover:bg-accent/50 border-border/50 transition-colors">
                                    <TableCell className="font-medium flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                        {app.startup}
                                    </TableCell>
                                    <TableCell>{app.founder}</TableCell>
                                    <TableCell>{app.submitted}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={
                                            app.status === "interview" ? "border-purple-500 text-purple-600 bg-purple-50" :
                                                app.status === "Under Review" ? "border-blue-500 text-blue-600 bg-blue-50" :
                                                    "border-slate-500 text-slate-600 bg-slate-50"
                                        }>
                                            {app.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{app.score}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50">
                                                <Check className="h-4 w-4" />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                                                <X className="h-4 w-4" />
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
    )
}
