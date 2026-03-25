"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  FileText,
  Rocket,
  Calendar,
  Building,
  Plus,
  ArrowRight,
  ChevronRight,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-10 pb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <Skeleton className="h-24 w-full rounded-xl" />
             <Skeleton className="h-24 w-full rounded-xl" />
             <Skeleton className="h-24 w-full rounded-xl" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const applications = data?.recentApplications?.slice(0, 3) || [];
  const startups = data?.recentStartups?.slice(0, 3) || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <DashboardLayout>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-10 pb-12"
      >
        
        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground text-[20px]">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-1 text-xs font-medium opacity-70">
              Overview of the most recent activities within the GrowthSpire network.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard/blogs/create">
              <Button className="admin-button-primary h-9">
                <Plus size={14} />
                <span>New Article</span>
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Primary Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div variants={itemVariants} className="admin-card p-5 flex items-center gap-4 hover:border-primary/20 transition-all cursor-default group">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20 group-hover:bg-blue-500/20">
                    <Building size={18} className="text-blue-500" />
                </div>
                <div>
                    <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Total Sponsors</h4>
                    <p className="text-xl font-bold mt-0.5">{data?.stats?.sponsors || "0"}</p>
                </div>
            </motion.div>
            <motion.div variants={itemVariants} className="admin-card p-5 flex items-center gap-4 hover:border-primary/20 transition-all cursor-default group">
                <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20 group-hover:bg-purple-500/20">
                    <Users size={18} className="text-purple-500" />
                </div>
                <div>
                    <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Active Mentors</h4>
                    <p className="text-xl font-bold mt-0.5">{data?.stats?.mentors || "0"}</p>
                </div>
            </motion.div>
            <motion.div variants={itemVariants} className="admin-card p-5 flex items-center gap-4 hover:border-primary/20 transition-all cursor-default group">
                <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20 group-hover:bg-orange-500/20">
                    <Calendar size={18} className="text-orange-500" />
                </div>
                <div>
                    <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Live Events</h4>
                    <p className="text-xl font-bold mt-0.5">3 Active</p>
                </div>
            </motion.div>
        </div>

        {/* Main Content Grid - Small Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Latest Applications Table */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-bold flex items-center gap-2 text-foreground/80 uppercase tracking-wider">
                <FileText size={14} className="text-primary" />
                Latest Applications
              </h2>
              <Link href="/dashboard/applications" className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1 uppercase tracking-widest">
                View All <ChevronRight size={10} />
              </Link>
            </div>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Sector</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.length > 0 ? (
                    applications.map((app, i) => (
                      <tr key={i} className="group">
                        <td>
                            <div className="font-bold text-foreground group-hover:text-primary transition-colors text-xs">{app.name}</div>
                            <div className="text-[10px] text-muted-foreground">{new Date(app.created_at).toLocaleDateString()}</div>
                        </td>
                        <td>
                            <div className="text-[10px] font-medium text-muted-foreground uppercase">{app.sector || 'N/A'}</div>
                        </td>
                        <td className="text-right">
                           <Link href="/dashboard/applications">
                             <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-primary/5 hover:text-primary">
                               <ArrowRight size={12} />
                             </Button>
                           </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="3" className="text-center py-10 text-[10px] font-bold text-muted-foreground uppercase opacity-50">Empty Queue</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Latest Startups Table */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-bold flex items-center gap-2 text-foreground/80 uppercase tracking-wider">
                <Rocket size={14} className="text-primary" />
                Latest Startups
              </h2>
              <Link href="/dashboard/startups" className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1 uppercase tracking-widest">
                Directory <ChevronRight size={10} />
              </Link>
            </div>
            <div className="admin-table-container">
               <table className="admin-table">
                <thead>
                  <tr>
                    <th>Startup</th>
                    <th>Category</th>
                    <th className="text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {startups.length > 0 ? (
                    startups.map((startup, i) => (
                      <tr key={i} className="group">
                        <td>
                            <div className="font-bold text-foreground group-hover:text-primary transition-colors text-xs">{startup.name}</div>
                            <div className="text-[10px] text-muted-foreground">Founded {startup.founded_year}</div>
                        </td>
                        <td>
                            <div className="text-[10px] font-medium text-muted-foreground uppercase">{startup.category || 'N/A'}</div>
                        </td>
                        <td className="text-right">
                            <span className="text-[9px] font-bold px-1.5 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded">
                                ACTIVE
                            </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="3" className="text-center py-10 text-[10px] font-bold text-muted-foreground uppercase opacity-50">No Data</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

        </div>

      </motion.div>
    </DashboardLayout>
  );
}