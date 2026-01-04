"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Users,
  Rocket,
  Building,
  Calendar,
  TrendingUp,
  FileText,
  BarChart3,
  ArrowRight,
  MoreHorizontal,
  Zap,
  CheckCircle2,
  Clock
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Mock Data
const statsData = [
  {
    title: "Active Startups",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: Rocket,
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/20"
  },
  {
    title: "Pending Applications",
    value: "156",
    change: "+8.2%",
    trend: "up",
    icon: FileText,
    color: "text-purple-600",
    bg: "bg-purple-100 dark:bg-purple-900/20"
  },
  {
    title: "Active Mentors",
    value: "42",
    change: "+4%",
    trend: "up",
    icon: Users,
    color: "text-green-600",
    bg: "bg-green-100 dark:bg-green-900/20"
  },
  {
    title: "Upcoming Events",
    value: "7",
    change: "This Week",
    trend: "neutral",
    icon: Calendar,
    color: "text-orange-600",
    bg: "bg-orange-100 dark:bg-orange-900/20"
  }
];

const sectorData = [
  { name: "Fintech", value: 35, color: "#3B82F6" },
  { name: "HealthTech", value: 25, color: "#10B981" },
  { name: "EdTech", value: 20, color: "#F59E0B" },
  { name: "AgriTech", value: 15, color: "#6366F1" },
  { name: "Other", value: 5, color: "#EC4899" },
];

const performanceData = [
  { name: "Jan", applications: 40, accepted: 4 },
  { name: "Feb", applications: 30, accepted: 3 },
  { name: "Mar", applications: 55, accepted: 6 },
  { name: "Apr", applications: 45, accepted: 5 },
  { name: "May", applications: 60, accepted: 7 },
  { name: "Jun", applications: 75, accepted: 8 },
];

const recentApplications = [
  { id: 1, name: "EcoFlow", sector: "CleanTech", stage: "Seed", date: "2 mins ago", status: "New" },
  { id: 2, name: "MedAI", sector: "HealthTech", stage: "Pre-Seed", date: "1 hour ago", status: "Reviewing" },
  { id: 3, name: "PayEasy", sector: "Fintech", stage: "Series A", date: "3 hours ago", status: "Interview" },
  { id: 4, name: "LearnLoop", sector: "EdTech", stage: "Seed", date: "5 hours ago", status: "New" },
  { id: 5, name: "AgriSmart", sector: "AgriTech", stage: "Pre-Seed", date: "1 day ago", status: "Rejected" },
];

const upcomingEvents = [
  { id: 1, title: "Demo Day Rehearsal", date: "Today, 2:00 PM", type: "Internal" },
  { id: 2, title: "Mentor Mixer", date: "Tomorrow, 6:00 PM", type: "Networking" },
  { id: 3, title: "Workshop: Valuation", date: "Fri, 10:00 AM", type: "Workshop" },
];

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">

        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Accelerator Overview</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here's what's happening in your ecosystem today.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard/applications">
              <Button>
                <FileText className="mr-2 h-4 w-4" /> Review Applications
              </Button>
            </Link>
            <Button variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" /> Generate Report
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, i) => (
            <Card key={i} className="border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className={`p-2 rounded-full ${stat.bg}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${stat.trend === 'up' ? 'text-green-700 bg-green-100' : 'text-gray-600 bg-gray-100'
                    }`}>
                    {stat.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Info */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

          {/* Charts - Left Column */}
          <div className="col-span-4 space-y-4">

            {/* Applicant Growth Chart */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Application Growth</CardTitle>
                <CardDescription>Monthly application submissions vs acceptances</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                      <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '8px', border: '1px solid var(--border)' }}
                      />
                      <Bar dataKey="applications" name="Applications" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="accepted" name="Accepted" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Upcoming Events</CardTitle>
                  <Link href="/dashboard/events" className="text-sm text-primary hover:underline">View All</Link>
                </div>
                <CardDescription>Key dates for the accelerated cohorts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs uppercase">
                          {event.date.split(',')[0].slice(0, 3)}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{event.title}</p>
                          <p className="text-xs text-muted-foreground">{event.date.includes(',') ? event.date.split(',')[1] : event.date}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">{event.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Right Column */}
          <div className="col-span-3 space-y-4">

            {/* Sector Distribution */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Portfolio Distribution</CardTitle>
                <CardDescription>Startups by industry sector</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sectorData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {sectorData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {sectorData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}</span>
                      <span className="font-medium ml-auto">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Applications */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Latest submissions requiring review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {app.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium leading-none">{app.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{app.sector} • {app.stage}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge variant={app.status === 'New' ? 'default' : 'secondary'} className="text-[10px]">
                          {app.status}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">{app.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4 text-xs" asChild>
                  <Link href="/dashboard/applications">
                    View All Applications <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}