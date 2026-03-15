"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  FileText,
  Rocket,
  Calendar,
  Building,
  MessageSquare,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle2,
  ChevronRight,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("http://localhost/growthspire/backend/dashboard_stats.php");
      const result = await response.json();
      if (result.success) {
        setData(result);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  const quickStats = [
    { label: "New Applications", value: data?.stats?.applications || "0", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Portfolio Startups", value: data?.stats?.startups || "0", icon: Rocket, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Active Sponsors", value: data?.stats?.sponsors || "0", icon: Building, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Mentors Joined", value: data?.stats?.mentors || "0", icon: CheckCircle2, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-10 pb-12 animate-in fade-in duration-700">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground uppercase tracking-widest text-[18px]">
              System Overview
            </h1>
            <p className="text-muted-foreground mt-1 text-[12px] uppercase tracking-wider font-medium opacity-70">
              Live metrics and recent activity across the platform
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard/blogs/create">
              <Button className="admin-button-primary">
                <Plus size={16} />
                <span>New Article</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-border divide-x divide-y sm:divide-y-0 border-collapse">
          {quickStats.map((stat, i) => (
            <div key={i} className="p-6 bg-card hover:bg-muted/5 transition-colors group">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                <stat.icon size={16} className={cn("opacity-40 group-hover:opacity-100 transition-opacity", stat.color)} />
              </div>
              <h3 className="text-3xl font-bold tracking-tighter">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Main Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Recent Applications */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                Recent Applications
              </h2>
              <Link href="/dashboard/applications" className="text-[10px] uppercase tracking-wider font-bold text-primary hover:underline flex items-center gap-1">
                Full Pipeline <ChevronRight size={12} />
              </Link>
            </div>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Industry</th>
                    <th>Status</th>
                    <th>Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.recentApplications?.length > 0 ? (
                    data.recentApplications.map((app, i) => (
                      <tr key={i}>
                        <td className="font-semibold">{app.name}</td>
                        <td className="text-muted-foreground">{app.sector || 'N/A'}</td>
                        <td>
                          <span className={cn(
                            "text-[10px] font-bold px-2 py-0.5 uppercase tracking-tighter",
                            app.status === 'pending' ? "bg-amber-50 text-amber-700" : 
                            app.status === 'accepted' ? "bg-emerald-50 text-emerald-700" : "bg-muted text-muted-foreground"
                          )}>
                            {app.status}
                          </span>
                        </td>
                        <td className="text-muted-foreground text-[11px]">{new Date(app.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="4" className="text-center py-8 text-muted-foreground">No recent applications</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Side Column */}
          <div className="lg:col-span-4 space-y-8">
            {/* Recent Portfolio */}
            <div className="space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                   Portfolio Updates
                </h2>
                <div className="divide-y divide-border border border-border bg-card">
                  {data?.recentStartups?.length > 0 ? (
                    data.recentStartups.map((startup, i) => (
                      <div key={i} className="p-3 hover:bg-muted/5 transition-colors cursor-default group">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[13px] font-bold group-hover:text-primary transition-colors">{startup.name}</p>
                            <p className="text-[11px] text-muted-foreground">{startup.category}</p>
                          </div>
                          <span className="text-[10px] font-bold text-muted-foreground">{startup.founded_year}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground text-xs text-[11px]">No portfolio data</div>
                  )}
                </div>
            </div>

            {/* Platform Status */}
            <div className="admin-card p-4 border-2 border-primary/20 bg-primary/5">
               <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[11px] font-bold uppercase tracking-widest">GrowthSpire Node: Operational</p>
               </div>
               <p className="text-[10px] text-muted-foreground mt-2 font-medium">Latency: 24ms • Uptime: 99.9%</p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-border flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
          <span>GrowthSpire Admin Alpha v2.5</span>
          <span>© 2024 GS-CORE</span>
        </div>

      </div>
    </DashboardLayout>
  );
}