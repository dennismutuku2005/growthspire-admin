"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Button } from "@/components/ui/button"
import { Download, Filter, BarChart2, TrendingUp, Users, Calendar } from "lucide-react"

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
            <div className="space-y-4 animate-in fade-in duration-500">
                {/* 2D Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight text-foreground flex items-center gap-2">
                            <BarChart2 size={18} className="text-primary" />
                            Eco-System Insights
                        </h1>
                        <p className="text-sm text-muted-foreground font-medium mt-1">
                            Quantitative analysis of startup performance and program metrics
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 border-border bg-background text-sm font-medium px-3 rounded-md">
                            <Calendar size={14} className="mr-1.5 text-muted-foreground" /> This Year
                        </Button>
                        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 h-8 text-sm font-medium rounded-md">
                            <Download className="mr-1.5 h-3.5 w-3.5" /> Export Data
                        </Button>
                    </div>
                </div>

                {/* 2D Summary Widgets */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="bg-card border border-border p-4 rounded-xl shadow-sm">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Aggregate Val</p>
                        <p className="text-2xl font-bold text-foreground mt-1">$24.8M</p>
                        <p className="text-xs font-medium text-emerald-600 mt-1">+12.4%</p>
                    </div>
                    <div className="bg-card border border-border p-4 rounded-xl shadow-sm">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Active Seats</p>
                        <p className="text-2xl font-bold text-foreground mt-1">142</p>
                        <p className="text-xs font-medium text-muted-foreground mt-1">94.6% UTIL</p>
                    </div>
                    <div className="bg-card border border-border p-4 rounded-xl shadow-sm">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Survival Rate</p>
                        <p className="text-2xl font-bold text-foreground mt-1">89.2%</p>
                        <p className="text-xs font-medium text-emerald-600 mt-1">ABOVE AVG</p>
                    </div>
                    <div className="bg-card border border-border p-4 rounded-xl shadow-sm">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">New Enquiries</p>
                        <p className="text-2xl font-bold text-foreground mt-1">1,248</p>
                        <p className="text-xs font-medium text-blue-600 mt-1">+458 NEW</p>
                    </div>
                </div>

                {/* 2D Flat Charts */}
                <div className="grid gap-2 md:grid-cols-2">
                    <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between mb-4 border-b border-border pb-4">
                            <h3 className="text-sm font-semibold text-foreground">Valuation Growth (YoY)</h3>
                            <TrendingUp size={16} className="text-muted-foreground/60" />
                        </div>
                        <div className="h-[250px] w-full mt-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}m`} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '0', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 'bold' }}
                                    />
                                    <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3, fill: '#8b5cf6', strokeWidth: 0 }} activeDot={{ r: 5 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between mb-4 border-b border-border pb-4">
                            <h3 className="text-sm font-semibold text-foreground">New Applications Stream</h3>
                            <Users size={16} className="text-muted-foreground/60" />
                        </div>
                        <div className="h-[250px] w-full mt-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#f1f1f1" />
                                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '0', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 'bold' }}
                                    />
                                    <Bar dataKey="growth" fill="#8b5cf6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* 2D Flat Footer Callout */}
                <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between rounded-xl shadow-sm">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest opacity-80">Data Accuracy Level</p>
                        <p className="text-sm font-medium tracking-tight mt-0.5">Verified Real-Time Analytics Feed</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-widest opacity-80">System Health</span>
                        <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
