"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Inbox, CheckCircle, Clock, XCircle, Search, Filter, Loader2, User, Building, Landmark, ExternalLink, MessageSquare, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Modal } from "@/components/Modal"
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

export default function ApplicationsPage() {
    const [apps, setApps] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedApp, setSelectedApp] = useState<any>(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        fetchApps()
    }, [])

    const fetchApps = async () => {
        setLoading(true)
        try {
            const res = await fetch("https://api.growthspire.org/applications.php?action=get_applications")
            const data = await res.json()
            if (data.success) {
                setApps(data.data)
            }
        } catch (err) {
            toast.error("Failed to fetch applications")
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (appId: string, status: string) => {
        try {
            const res = await fetch("https://api.growthspire.org/applications.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "update_status", id: appId, status })
            })
            const data = await res.json()
            if (data.success) {
                toast.success(`Marked as ${status.replace('_', ' ')}`)
                setIsDetailOpen(false)
                fetchApps()
            }
        } catch (err) {
            toast.error("Status update failed")
        }
    }

    const deleteApp = async () => {
        try {
            const res = await fetch("https://api.growthspire.org/applications.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "delete_application", id: selectedApp.id })
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Record deleted")
                setIsDeleteOpen(false)
                fetchApps()
            }
        } catch (err) {
            toast.error("Deletion failed")
        }
    }

    const filteredApps = apps.filter(app => {
        const matchesSearch = app.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             app.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             app.email.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (activeTab === "all") return matchesSearch;
        return matchesSearch && app.status === activeTab;
    })

    const statusMap: Record<string, any> = {
        pending: { label: "PENDING", color: "bg-amber-500/10 text-amber-600 border-amber-500/20", icon: Clock },
        under_review: { label: "REVIEWING", color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: Search },
        interview: { label: "INTERVIEW", color: "bg-purple-500/10 text-purple-600 border-purple-500/20", icon: User },
        accepted: { label: "ACCEPTED", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: CheckCircle },
        rejected: { label: "REJECTED", color: "bg-red-500/10 text-red-600 border-red-500/20", icon: XCircle },
    }

    return (
        <DashboardLayout>
            <div className="space-y-8 animate-in fade-in duration-500 pb-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
                    <div>
                        <h1 className="text-[18px] font-bold tracking-widest text-foreground uppercase flex items-center gap-3">
                            <Inbox size={20} className="text-primary" />
                            Applications Inbox
                        </h1>
                        <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest mt-1 opacity-60">
                            Manage startup applications and partner inquiries
                        </p>
                    </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex bg-muted/30 border border-border p-1 gap-1 w-fit">
                        {["all", "pending", "under_review", "accepted", "rejected"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all",
                                    activeTab === tab ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {tab.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="OPERATIONAL SEARCH: NAME, COMPANY, EMAIL..."
                            className="w-full bg-card h-10 pl-10 pr-4 text-[11px] font-bold tracking-widest uppercase outline-none border border-border focus:border-primary transition-colors"
                        />
                    </div>
                </div>

                {/* Table Layout */}
                <div className="admin-table-container">
                    {loading ? (
                        <div className="border border-border rounded-xl">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="p-4 border-b border-border flex justify-between gap-4">
                                    <Skeleton className="h-6 w-48" />
                                    <Skeleton className="h-6 w-32" />
                                    <Skeleton className="h-6 w-24" />
                                    <Skeleton className="h-6 w-20" />
                                    <Skeleton className="h-6 w-10" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Applicant & Lead</th>
                                    <th>Submission Type</th>
                                    <th>Phase / Sector</th>
                                    <th>Status</th>
                                    <th className="text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredApps.length > 0 ? filteredApps.map((app) => (
                                    <tr key={app.id} className="group cursor-pointer" onClick={() => { setSelectedApp(app); setIsDetailOpen(true); }}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 bg-muted border border-border flex items-center justify-center shrink-0">
                                                    <span className="text-[10px] font-black">{app.full_name.charAt(0)}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[12px] font-bold text-foreground block uppercase leading-tight">
                                                        {app.full_name}
                                                    </span>
                                                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter opacity-60">
                                                        {app.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                {app.application_type === 'startup' ? <Building size={12} className="opacity-40" /> : <Landmark size={12} className="opacity-40" />}
                                                <span className="text-[11px] font-bold text-foreground uppercase">
                                                    {app.company_name}
                                                </span>
                                            </div>
                                            <p className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-widest">{app.application_type}</p>
                                        </td>
                                        <td>
                                            <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-80">
                                                {app.industry || "General"}
                                            </span>
                                            <p className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-widest">{app.startup_stage || "N/A"}</p>
                                        </td>
                                        <td>
                                            <span className={cn(
                                                "text-[9px] font-black uppercase px-2 py-0.5 border flex items-center gap-1 w-fit tracking-tighter",
                                                statusMap[app.status]?.color || "bg-muted text-muted-foreground"
                                            )}>
                                                {statusMap[app.status]?.label || app.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="text-right">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-none border border-transparent hover:border-border">
                                                <ExternalLink size={14} className="opacity-40" />
                                            </Button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan={5} className="text-center py-20 text-muted-foreground font-bold uppercase text-[11px] border border-dashed border-border">No records discovered in this sector</td></tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Detail Modal */}
                <Modal
                    isOpen={isDetailOpen}
                    onClose={() => setIsDetailOpen(false)}
                    title="Application Details"
                    description={`REVIEWING: ${selectedApp?.full_name.toUpperCase()}`}
                    confirmText="Save Details"
                    onConfirm={() => setIsDetailOpen(false)}
                    maxWidth="max-w-4xl"
                >
                    {selectedApp && (
                        <div className="space-y-10 py-4">
                            {/* Summary Bar */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-muted/20 border border-border p-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest opacity-40">Current Status</label>
                                    <div className={cn("text-[10px] font-black uppercase px-2 py-0.5 border w-fit", statusMap[selectedApp.status]?.color)}>
                                        {selectedApp.status.replace('_', ' ')}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest opacity-40">Submission Date</label>
                                    <div className="text-[11px] font-bold uppercase">{new Date(selectedApp.created_at).toLocaleDateString()}</div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest opacity-40">Category</label>
                                    <div className="text-[11px] font-bold uppercase">{selectedApp.application_type}</div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest opacity-40">Reference ID</label>
                                    <div className="text-[11px] font-bold uppercase opacity-60 font-mono">{selectedApp.id.substring(0,8)}...</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                            <User size={14} /> Contact Information
                                        </h3>
                                        <div className="grid gap-4 border-l-2 border-border pl-4">
                                            <div>
                                                <p className="text-[9px] font-bold text-muted-foreground uppercase">Full Legal Name</p>
                                                <p className="text-[13px] font-bold uppercase">{selectedApp.full_name}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-bold text-muted-foreground uppercase">Electronic Mail</p>
                                                <p className="text-[13px] font-bold uppercase">{selectedApp.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-bold text-muted-foreground uppercase">Communication Line</p>
                                                <p className="text-[13px] font-bold uppercase">{selectedApp.phone}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                            <Building size={14} /> Startup Profile
                                        </h3>
                                        <div className="grid gap-4 border-l-2 border-border pl-4">
                                            <div>
                                                <p className="text-[9px] font-bold text-muted-foreground uppercase">Organization Name</p>
                                                <p className="text-[14px] font-black uppercase tracking-tight">{selectedApp.company_name}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-[9px] font-bold text-muted-foreground uppercase">Sector</p>
                                                    <p className="text-[12px] font-bold uppercase">{selectedApp.industry || "UNSPECIFIED"}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-bold text-muted-foreground uppercase">Growth Stage</p>
                                                    <p className="text-[12px] font-bold uppercase">{selectedApp.startup_stage || "UNSPECIFIED"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                            <MessageSquare size={14} /> Application Message
                                        </h3>
                                        <div className="bg-muted/30 border border-border p-4 min-h-[120px] relative">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-primary/20"></div>
                                            <p className="text-[12px] font-medium leading-relaxed italic text-foreground/80">
                                                "{selectedApp.message}"
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                            Quick Actions
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            <button 
                                                onClick={() => updateStatus(selectedApp.id, 'under_review')}
                                                className="flex-1 border border-border py-3 text-[10px] font-black uppercase tracking-widest hover:border-blue-500 hover:bg-blue-50/50 transition-all"
                                            >
                                                Initiate Review
                                            </button>
                                            <button 
                                                onClick={() => updateStatus(selectedApp.id, 'accepted')}
                                                className="flex-1 border border-border py-3 text-[10px] font-black uppercase tracking-widest hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-emerald-700"
                                            >
                                                Confirm Acceptance
                                            </button>
                                            <button 
                                                onClick={() => updateStatus(selectedApp.id, 'rejected')}
                                                className="flex-1 border border-border py-3 text-[10px] font-black uppercase tracking-widest hover:border-red-500 hover:bg-red-50/50 transition-all text-red-700"
                                            >
                                                Reject Entry
                                            </button>
                                        </div>
                                        <button 
                                            onClick={() => { setIsDetailOpen(false); setIsDeleteOpen(true); }}
                                            className="w-full border-t border-border pt-4 flex items-center justify-center gap-2 text-[9px] font-bold uppercase text-muted-foreground hover:text-destructive transition-colors"
                                        >
                                            <Trash2 size={12} /> Delete Application Record
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>

                <Modal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    title="DELETE RECORD"
                    description={`WARNING: This will permanently delete the application for "${selectedApp?.full_name.toUpperCase()}".`}
                    type="danger"
                    confirmText="Delete Permanently"
                    onConfirm={deleteApp}
                >
                    <div />
                </Modal>
            </div>
        </DashboardLayout>
    )
}
