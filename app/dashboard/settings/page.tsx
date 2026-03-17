"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, User, Mail, Lock, Settings as SettingsIcon, Save, Loader2, BadgeCheck } from "lucide-react"
import Cookies from "js-cookie"
import { toast } from "sonner"

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
                <div className="flex h-[60vh] items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <div className="space-y-8 animate-in fade-in duration-500 pb-20 mt-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
                    <div>
                        <h1 className="text-[18px] font-bold tracking-widest text-foreground uppercase flex items-center gap-3">
                            <SettingsIcon size={20} className="text-primary" />
                            System Configuration
                        </h1>
                        <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest mt-1 opacity-60">
                            Manage your administrative profile and portal settings
                        </p>
                    </div>
                    <Button onClick={handleSave} disabled={saving} className="admin-button-primary">
                        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        <span>Save Changes</span>
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Profile Section */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="admin-card p-6 flex flex-col items-center text-center space-y-4">
                            <div className="h-24 w-24 bg-foreground flex items-center justify-center text-background text-3xl font-bold border-4 border-muted">
                                {userData?.name?.charAt(0).toUpperCase() || "A"}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold uppercase tracking-widest text-foreground">{userData?.name || "Admin User"}</h3>
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter flex items-center justify-center gap-1">
                                    <BadgeCheck size={12} className="text-primary" /> Verified System {userData?.role || "Administrator"}
                                </p>
                            </div>
                            <div className="w-full pt-4 border-t border-border space-y-2">
                                <div className="flex justify-between text-[11px] font-bold uppercase">
                                    <span className="text-muted-foreground opacity-60">Status:</span>
                                    <span className="text-emerald-600">Active</span>
                                </div>
                                <div className="flex justify-between text-[11px] font-bold uppercase">
                                    <span className="text-muted-foreground opacity-60">Last Access:</span>
                                    <span>{new Date().toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="admin-card p-6 space-y-4">
                            <h4 className="text-[11px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <Shield size={14} /> Security Status
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-muted/30 border border-border">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Two-Factor Auth: Enabled</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-muted/30 border border-border">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Data Encryption: AES-256</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Edit Form Section */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="admin-card h-full">
                            <div className="p-4 border-b border-border bg-muted/10">
                                <h3 className="text-[11px] font-black uppercase tracking-widest">Identity & Credentials</h3>
                            </div>
                            <div className="p-8 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <Label className="admin-label flex items-center gap-2">
                                            <User size={12} className="opacity-40" /> Full Legal Name
                                        </Label>
                                        <Input 
                                            defaultValue={userData?.name} 
                                            className="admin-input" 
                                            placeholder="E.G. DENNIS MUTUKU"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="admin-label flex items-center gap-2">
                                            <Mail size={12} className="opacity-40" /> Administrative Email
                                        </Label>
                                        <Input 
                                            defaultValue={userData?.email} 
                                            className="admin-input" 
                                            placeholder="ADMIN@GROWTHSPIRE.COM"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-border">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Credential Termination & Rotation</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <Label className="admin-label flex items-center gap-2">
                                                <Lock size={12} className="opacity-40" /> New Password
                                            </Label>
                                            <Input 
                                                type="password"
                                                className="admin-input" 
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="admin-label flex items-center gap-2">
                                                <Lock size={12} className="opacity-40" /> Confirm New Password
                                            </Label>
                                            <Input 
                                                type="password"
                                                className="admin-input" 
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground italic uppercase">Leave blank to maintain current secure credentials.</p>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-border">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Portal Preferences</h4>
                                    <div className="flex items-center gap-8">
                                        <div className="flex items-center gap-2">
                                            <input type="checkbox" id="email-notif" defaultChecked className="accent-primary h-4 w-4" />
                                            <Label htmlFor="email-notif" className="text-[11px] font-bold uppercase tracking-widest cursor-pointer">Email Notifications</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input type="checkbox" id="dark-mode" defaultChecked className="accent-primary h-4 w-4" />
                                            <Label htmlFor="dark-mode" className="text-[11px] font-bold uppercase tracking-widest cursor-pointer">Dark Mode Optimised</Label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Component */}
                <div className="flex items-center justify-between border-t border-border pt-6 mt-12">
                   <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] opacity-40">GS-CORE SECURITY LEVEL: MAXIMUM</p>
                   <Button variant="ghost" className="text-destructive text-[10px] font-bold uppercase tracking-widest h-8 rounded-none hover:bg-destructive/10">
                      Delete Account Record
                   </Button>
                </div>
            </div>
        </DashboardLayout>
    )
}
