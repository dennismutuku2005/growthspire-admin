"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Users,
  Rocket,
  Building,
  Calendar,
  FileText,
  BarChart3,
  ArrowRight,
  Zap,
  CheckCircle2,
  Clock,
  TrendingUp,
  Activity,
  Layers,
  ChevronRight
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock Data
const statsData = [
  {
    title: "Vetted Startups",
    value: "24",
    change: "+12.4%",
    trend: "up",
    icon: Rocket,
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    title: "Intake Queue",
    value: "156",
    change: "+82 New",
    trend: "up",
    icon: Layers,
    color: "text-purple-600",
    bg: "bg-purple-50"
  },
  {
    title: "Global Mentors",
    value: "42",
    change: "+4.1%",
    trend: "up",
    icon: Users,
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  {
    title: "Deployments",
    value: "07",
    change: "This Week",
    trend: "neutral",
    icon: Activity,
    color: "text-amber-600",
    bg: "bg-amber-50"
  }
];

const sectorData = [
  { name: "Fintech", value: 35, color: "#3b82f6" },
  { name: "HealthTech", value: 25, color: "#10b981" },
  { name: "EdTech", value: 20, color: "#8b5cf6" },
  { name: "AgriTech", value: 15, color: "#f59e0b" },
  { name: "Other", value: 5, color: "#6b7280" },
];

const performanceData = [
  { name: "Jan", val: 400, acc: 240 },
  { name: "Feb", val: 300, acc: 139 },
  { name: "Mar", val: 200, acc: 980 },
  { name: "Apr", val: 278, acc: 390 },
  { name: "May", val: 189, acc: 480 },
  { name: "Jun", val: 239, acc: 380 },
];

const recentApplications = [
  { id: 1, name: "EcoFlow", sector: "CleanTech", score: "88/100", date: "2 mins ago", status: "New" },
  { id: 2, name: "MedAI", sector: "HealthTech", score: "72/100", date: "1 hr ago", status: "Reviewing" },
  { id: 3, name: "PayEasy", sector: "Fintech", score: "94/100", date: "3 hrs ago", status: "Interview" },
  { id: 4, name: "LearnLoop", sector: "EdTech", score: "61/100", date: "5 hrs ago", status: "New" },
  { id: 5, name: "AgriSmart", sector: "AgriTech", score: "45/100", date: "1 day ago", status: "Rejected" },
];

const upcomingEvents = [
  { id: 1, title: "Demo Day Rehearsal", time: "14:00", date: "Today", type: "Internal" },
  { id: 2, title: "Mentor Mixer", time: "18:00", date: "Tomorrow", type: "Networking" },
  { id: 3, title: "Workshop: Valuation", time: "10:00", date: "Friday", type: "Workshop" },
];

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in fade-in duration-500">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
              <BarChart3 className="text-blue-600" size={24} />
              Accelerator Command Center
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              GrowthSpire Core Analytics • Version 4.2.0
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard/applications">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm">
                Process Pipeline
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon size={16} className={stat.color} />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className={cn(
                  "text-xs font-medium px-2 py-1 rounded-full",
                  stat.trend === 'up' ? 'text-emerald-700 bg-emerald-50' : 'text-gray-600 bg-gray-50'
                )}>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Operational Grid */}
        <div className="grid gap-6 lg:grid-cols-12">

          {/* Center Column: Big Chart & Activity */}
          <div className="lg:col-span-8 space-y-6">
            {/* Analytics Panel */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp size={18} className="text-blue-600" />
                  <h3 className="text-sm font-semibold text-gray-900">Growth Vector Analysis</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} tick={{ fill: '#6b7280' }} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} tick={{ fill: '#6b7280' }} />
                      <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Line type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="acc" stroke="#e5e7eb" strokeWidth={2} dot={{ r: 0 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Submission Pipeline */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-900">Recent Intake Pipeline</h3>
                <Link href="/dashboard/applications" className="text-xs font-medium text-blue-600 hover:text-blue-700">View All</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-50">
                      <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Venture</th>
                      <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Sector</th>
                      <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                      <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentApplications.map((app) => (
                      <tr key={app.id} className="border-b last:border-0 border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4">
                          <span className="text-sm font-medium text-gray-900 block">{app.name}</span>
                          <span className="text-xs text-gray-400">{app.date}</span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{app.sector}</td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{app.score}</td>
                        <td className="py-3 px-4 text-right">
                          <span className={cn(
                            "text-xs font-medium px-2.5 py-0.5 rounded-full inline-block",
                            app.status === 'New' ? 'text-blue-700 bg-blue-50' :
                              app.status === 'Rejected' ? 'text-red-700 bg-red-50' :
                                'text-emerald-700 bg-emerald-50'
                          )}>{app.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Events & Distribution */}
          <div className="lg:col-span-4 space-y-6">

            {/* Sector Distribution */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-50">
                <h3 className="text-sm font-semibold text-gray-900">Ecosystem Density</h3>
              </div>
              <div className="p-6">
                <div className="h-[200px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sectorData}
                        cx="50%" cy="50%"
                        innerRadius={60} outerRadius={80}
                        paddingAngle={5} dataKey="value"
                      >
                        {sectorData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="none" cornerRadius={4} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center Text */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900 leading-none">100%</p>
                      <p className="text-xs text-gray-400 mt-1">Total</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 mt-6">
                  {sectorData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-gray-600">{item.name}</span>
                      </div>
                      <span className="font-medium text-gray-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Briefing */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-900">Briefing Calendar</h3>
                <Calendar size={16} className="text-gray-400" />
              </div>
              <div className="divide-y divide-gray-50">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-medium text-blue-600 mb-1">{event.date} • {event.time}</p>
                        <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{event.title}</p>
                      </div>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-gray-50 border-t border-gray-100">
                <Button variant="ghost" className="w-full text-xs text-gray-600 hover:text-gray-900 h-8">
                  View Full Calendar
                </Button>
              </div>
            </div>

            {/* Platform Status */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-4 text-white flex items-center justify-between shadow-md">
              <div>
                <p className="text-xs font-medium opacity-80">Network Status</p>
                <p className="text-sm font-bold mt-0.5 flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  Operational
                </p>
              </div>
              <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}