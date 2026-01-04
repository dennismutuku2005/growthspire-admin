"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function StartupAnalyticsPage() {
    const data = [
        { name: 'Jan', value: 400, growth: 240 },
        { name: 'Feb', value: 300, growth: 139 },
        { name: 'Mar', value: 200, growth: 980 },
        { name: 'Apr', value: 278, growth: 390 },
        { name: 'May', value: 189, growth: 480 },
        { name: 'Jun', value: 239, growth: 380 },
        { name: 'Jul', value: 349, growth: 430 },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Ecosystem Analytics</h1>
                    <p className="text-muted-foreground mt-1">Insights into startup performance and ecosystem growth.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Total Valuation Growth</CardTitle>
                            <CardDescription>Aggregate valuation of all startups (in millions).</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '8px', border: '1px solid var(--border)' }}
                                        />
                                        <Line type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>New Applications per Month</CardTitle>
                            <CardDescription>Volume of startup applications received.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
                                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip
                                            cursor={{ fill: 'transparent' }}
                                            contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '8px', border: '1px solid var(--border)' }}
                                        />
                                        <Bar dataKey="growth" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
