"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, PieChart } from "lucide-react"

export default function SponsorshipFundingPage() {
    const transactions = [
        {
            id: 1,
            source: "Global Tech Ventures",
            amount: "$250,000",
            date: "2024-03-01",
            type: "Wire Transfer",
            status: "Received"
        },
        {
            id: 2,
            source: "Future Fund Foundation",
            amount: "$500,000",
            date: "2024-02-15",
            type: "Check",
            status: "Received"
        },
        {
            id: 3,
            source: "Innovate Bank",
            amount: "$125,000",
            date: "2024-03-20",
            type: "Wire Transfer",
            status: "Pending"
        }
    ]

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Funding & Grants</h1>
                    <p className="text-muted-foreground mt-1">Track financial contributions and grant disbursements.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="border-border/50 bg-card/50">
                        <CardHeader>
                            <CardTitle>Total Raised (YTD)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-primary">$1,750,000</div>
                            <p className="text-sm text-muted-foreground mt-2">Target: $2.5M (70% Achieved)</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/50 bg-card/50">
                        <CardHeader>
                            <CardTitle>Upcoming Disbursements</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-500">$200,000</div>
                            <p className="text-sm text-muted-foreground mt-2">Scheduled for April 1st</p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                        <CardDescription>Incoming sponsorship funds and grants.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-border/50">
                                    <TableHead>Source</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.map((t) => (
                                    <TableRow key={t.id} className="hover:bg-accent/50 border-border/50 transition-colors">
                                        <TableCell className="font-medium">{t.source}</TableCell>
                                        <TableCell className="text-emerald-600 font-semibold">{t.amount}</TableCell>
                                        <TableCell>{t.date}</TableCell>
                                        <TableCell>{t.type}</TableCell>
                                        <TableCell>
                                            <Badge variant={t.status === 'Received' ? 'default' : 'secondary'}>
                                                {t.status}
                                            </Badge>
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
