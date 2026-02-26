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
                        <h1 className="text-lg font-semibold tracking-tight text-gray-900 uppercase flex items-center gap-2">
                            <BarChart2 size={18} className="text-pace-purple" />
                            Eco-System Insights
                        </h1>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                            QUANTITATIVE ANALYSIS OF STARTUP PERFORMANCE AND PROGRAM METRICS
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 rounded-none border-gray-200 bg-white text-[11px] font-medium uppercase tracking-wider px-3">
                            <Calendar size={14} className="mr-1.5 text-gray-400" /> This Year
                        </Button>
                        <Button size="sm" className="bg-pace-purple text-white hover:bg-pace-purple/90 rounded-none h-8 text-[11px] font-medium uppercase tracking-wide">
                            <Download className="mr-1.5 h-3.5 w-3.5" /> Export Data
                        </Button>
                    </div>
                </div>

                {/* 2D Summary Widgets */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="bg-white border border-gray-200 p-3">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Aggregate Val</p>
                        <p className="text-lg font-bold text-gray-900">$24.8M</p>
                        <p className="text-[10px] font-bold text-emerald-600">+12.4%</p>
                    </div>
                    <div className="bg-white border border-gray-200 p-3">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Seats</p>
                        <p className="text-lg font-bold text-gray-900">142</p>
                        <p className="text-[10px] font-bold text-gray-400">94.6% UTIL</p>
                    </div>
                    <div className="bg-white border border-gray-200 p-3">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Survival Rate</p>
                        <p className="text-lg font-bold text-gray-900">89.2%</p>
                        <p className="text-[10px] font-bold text-emerald-600">ABOVE AVG</p>
                    </div>
                    <div className="bg-white border border-gray-200 p-3">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">New Enquiries</p>
                        <p className="text-lg font-bold text-gray-900">1,248</p>
                        <p className="text-[10px] font-bold text-blue-600">+458 NEW</p>
                    </div>
                </div>

                {/* 2D Flat Charts */}
                <div className="grid gap-2 md:grid-cols-2">
                    <div className="bg-white border border-gray-200 p-4">
                        <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-2">
                            <h3 className="text-[11px] font-bold text-gray-700 uppercase tracking-widest">Valuation Growth (YoY)</h3>
                            <TrendingUp size={14} className="text-gray-300" />
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

                    <div className="bg-white border border-gray-200 p-4">
                        <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-2">
                            <h3 className="text-[11px] font-bold text-gray-700 uppercase tracking-widest">New Applications Stream</h3>
                            <Users size={14} className="text-gray-300" />
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
                <div className="bg-pace-purple text-white p-3 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Data Accuracy Level</p>
                        <p className="text-[12px] font-bold italic tracking-tight">VERIFIED REAL-TIME ANALYTICS FEED</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase opacity-80">System Health</span>
                        <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
