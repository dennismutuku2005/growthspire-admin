"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, User, Mail, Lock, Settings as SettingsIcon, Save, Loader2, BadgeCheck } from "lucide-react"
import Cookies from "js-cookie"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
}

export default function SettingsPage() {
    const [userData, setUserData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const userCookie = Cookies.get("user_data")
        if (userCookie) {
            const parsed = JSON.parse(userCookie)
            setUserData(parsed.user || parsed)
        }
        setLoading(false)
    }, [])

    const handleSave = () => {
        setSaving(true)
        // Simulate a save
        setTimeout(() => {
            setSaving(false)
            toast.success("Profile/Settings updated successfully")
        }, 1000)
    }

    if (loading) {
        return (
            <DashboardLayout>
                <div className="space-y-8 pb-20 mt-4">
                    <div className="flex justify-between border-b border-border pb-6">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-4 space-y-6">
                            <Skeleton className="h-64 w-full" />
                        </div>
                        <div className="lg:col-span-8">
                            <Skeleton className="h-[500px] w-full" />
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-8 pb-20 mt-4"
            >
                {/* Header Configuration */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6 font-sans">
                    <div>
                        <h1 className="text-xl font-semibold text-foreground flex items-center gap-3">
                            <SettingsIcon size={20} className="text-primary" />
                            System Configuration
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1 font-medium opacity-70">
                            Manage your administrative profile and portal settings
                        </p>
                    </div>
                    <Button onClick={handleSave} disabled={saving} className="admin-button-primary h-10 px-6">
                        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        <span>Save Changes</span>
                    </Button>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Identity Profile Section */}
                    <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
                        <div className="admin-card p-6 flex flex-col items-center text-center space-y-4 shadow-sm border-primary/10 transition-all hover:border-primary/20">
                            <div className="h-24 w-24 bg-primary flex items-center justify-center text-primary-foreground text-3xl font-black rounded-2xl shadow-lg border-4 border-background">
                                {userData?.name?.charAt(0).toUpperCase() || "A"}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground">{userData?.name || "Admin User"}</h3>
                                <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider flex items-center justify-center gap-1">
                                    <BadgeCheck size={12} className="text-primary" /> Verified System {userData?.role || "Administrator"}
                                </p>
                            </div>
                            <div className="w-full pt-4 border-t border-border space-y-2">
                                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                                    <span className="text-muted-foreground opacity-50">Operational Status</span>
                                    <span className="text-emerald-500">ACTIVE</span>
                                </div>
                                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                                    <span className="text-muted-foreground opacity-50">Last Access</span>
                                    <span className="tabular-nums">{new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>

                        <div className="admin-card p-6 space-y-4 shadow-sm border-primary/10">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                                <Shield size={14} className="text-primary" /> Security Integrity
                            </h4>
                            <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider leading-relaxed">
                                    Your account is currently secured with role-based access control (RBAC). 
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Operational Settings Section */}
                    <motion.div variants={itemVariants} className="lg:col-span-8 space-y-8">
                        <div className="space-y-6 bg-card border border-border rounded-xl p-8 shadow-sm">
                            <div className="border-b border-border pb-4">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                                    <User size={16} className="text-primary" /> Personal Identity
                                </h3>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="admin-label">Full Name</label>
                                    <div className="relative">
                                        <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-40" />
                                        <input className="admin-input pl-10" defaultValue={userData?.name || "Admin"} />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="admin-label">Administrative Role</label>
                                    <div className="relative">
                                        <Shield size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-40" />
                                        <input className="admin-input pl-10 opacity-70 cursor-not-allowed" disabled value={userData?.role || "Super Admin"} />
                                    </div>
                                </div>
                                <div className="col-span-2 space-y-1.5">
                                    <label className="admin-label">Communication Access (Email)</label>
                                    <div className="relative">
                                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-40" />
                                        <input className="admin-input pl-10" defaultValue={userData?.email || "admin@growthspire.com"} />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-border">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2 mb-6">
                                    <Lock size={16} className="text-primary" /> Narrative Authentication (Password)
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="admin-label">Current Key</label>
                                        <input className="admin-input" type="password" placeholder="••••••••" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="admin-label">New Strategy</label>
                                        <input className="admin-input" type="password" placeholder="New Secret" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-muted/20 border border-dashed border-border rounded-xl">
                            <p className="text-[10px] text-muted-foreground font-bold text-center uppercase tracking-widest">
                                Core System Configuration Version 2.4.0 • Updated Weekly
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </DashboardLayout>
    )
}
