"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Rocket, CheckCircle, Clock, Search, Filter, Edit2, Trash2, Plus, Loader2, Globe, User } from "lucide-react"
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

interface Startup {
    id: string | number;
    name: string;
    founder: string;
    sector?: string;
    category?: string;
    stage: string;
    status: string;
    description: string;
    website?: string;
    website_url?: string;
    logo?: string;
    logo_url?: string;
}

export default function StartupsPage() {
    const [startups, setStartups] = useState<Startup[]>([])
    const [loading, setLoading] = useState(true)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [isEdit, setIsEdit] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        founder: "",
        category: "",
        stage: "Seed",
        status: "Active",
        description: "",
        website_url: "",
        logo_url: ""
    })

    useEffect(() => {
        fetchStartups()
    }, [])

    const fetchStartups = async () => {
        setLoading(true)
        try {
            const res = await fetch("https://api.growthspire.org/startups.php?action=get_startups")
            const data = await res.json()
            if (data.success) {
                setStartups(data.data)
            }
        } catch (err) {
            toast.error("Failed to fetch startups")
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async () => {
        const action = isEdit ? "update_startup" : "create_startup"
        const body = isEdit ? { action, id: selectedStartup?.id, ...formData } : { action, ...formData }
        
        try {
            const res = await fetch("https://api.growthspire.org/startups.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            const data = await res.json()
            if (data.success) {
                toast.success(isEdit ? "Profile updated" : "Startup onboarded")
                setIsFormOpen(false)
                fetchStartups()
                resetForm()
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            toast.error("An error occurred")
        }
    }

    const handleDelete = async () => {
        try {
            const res = await fetch("https://api.growthspire.org/startups.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "delete_startup", id: selectedStartup?.id })
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Startup removed")
                setIsDeleteOpen(false)
                fetchStartups()
            }
        } catch (err) {
            toast.error("Failed to delete")
        }
    }

    const openEdit = (startup: Startup) => {
        setSelectedStartup(startup)
        setIsEdit(true)
        setFormData({
            name: startup.name,
            founder: startup.founder,
            category: startup.sector || startup.category || "",
            stage: startup.stage || "Seed",
            status: startup.status || "Active",
            description: startup.description || "",
            website_url: startup.website || startup.website_url || "",
            logo_url: startup.logo || startup.logo_url || ""
        })
        setIsFormOpen(true)
    }

    const resetForm = () => {
        setIsEdit(false)
        setFormData({
            name: "",
            founder: "",
            category: "",
            stage: "Seed",
            status: "Active",
            description: "",
            website_url: "",
            logo_url: ""
        })
    }

    const filteredStartups = startups.filter((s: Startup) => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.founder?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.sector?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <DashboardLayout>
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-8 pb-10"
            >
                {/* Header Section */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6 font-sans">
                    <div>
                        <h1 className="text-xl font-semibold text-foreground flex items-center gap-3">
                            <Rocket size={20} className="text-primary" />
                            Startup Ecosystem
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1 font-medium opacity-70">
                            Monitor and manage your portfolio of curated startups
                        </p>
                    </div>
                    <Button 
                        onClick={() => { resetForm(); setIsFormOpen(true); }}
                        className="admin-button-primary h-10 px-6"
                    >
                        <Plus size={16} />
                        <span>Onboard Startup</span>
                    </Button>
                </motion.div>

                {/* Filters Row */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-50" />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="OPERATIONAL SEARCH..."
                            className="w-full bg-card h-12 pl-10 pr-4 text-[11px] font-bold uppercase tracking-widest outline-none focus:border-primary border border-border/50 rounded-lg"
                        />
                    </div>
                </motion.div>

                {/* Main Table */}
                <motion.div variants={itemVariants} className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Identification</th>
                                <th>Category / Sector</th>
                                <th>Execution Stage</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i}>
                                        <td colSpan={5} className="p-0">
                                            <Skeleton className="h-16 w-full" />
                                        </td>
                                    </tr>
                                ))
                            ) : filteredStartups.length > 0 ? (
                                filteredStartups.map((startup) => (
                                    <tr key={startup.id} className="group transition-all">
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/10">
                                                    <Rocket size={16} className="text-primary" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{startup.name}</div>
                                                    <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{startup.founder}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-xs font-semibold text-muted-foreground uppercase">{startup.sector || startup.category || 'N/A'}</td>
                                        <td>
                                            <span className="text-[10px] font-bold px-2 py-0.5 bg-muted rounded border border-border">
                                                {startup.stage}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={cn(
                                                "text-[10px] font-bold px-2 py-1 rounded-full border",
                                                startup.status === 'Active' ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-muted text-muted-foreground border-border"
                                            )}>
                                                {startup.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="h-8 w-8 p-0 text-muted-foreground hover:text-primary hover:bg-primary/5"
                                                    onClick={() => openEdit(startup)}
                                                >
                                                    <Edit2 size={14} />
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                                                    onClick={() => { setSelectedStartup(startup); setIsDeleteOpen(true); }}
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-20 text-muted-foreground italic text-sm">
                                        No startup portfolio entities discovered
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </motion.div>

                {/* Creation/Edit Form */}
                <Modal
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    title={isEdit ? "Edit Profile" : "Onboard New Startup"}
                    description={isEdit ? "Update existing startup information" : "Add a new vetted startup to the ecosystem"}
                    footer={
                        <div className="flex gap-3 w-full">
                            <Button variant="outline" className="flex-1 font-bold text-[10px] uppercase tracking-widest h-10" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                            <Button className="flex-1 admin-button-primary h-10" onClick={handleSubmit}>
                                {isEdit ? "Update Record" : "Finalize Entry"}
                            </Button>
                        </div>
                    }
                >
                    <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar p-1">
                        <div className="col-span-2 space-y-1.5">
                            <label className="admin-label">Startup Name</label>
                            <input className="admin-input" placeholder="e.g. Acme AI" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="admin-label">Primary Founder</label>
                            <div className="relative">
                                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-40" />
                                <input className="admin-input pl-10" placeholder="Full Name" value={formData.founder} onChange={e => setFormData({ ...formData, founder: e.target.value })} />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="admin-label">Category / Sector</label>
                            <input className="admin-input" placeholder="e.g. Fintech" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="admin-label">Execution Stage</label>
                            <select className="admin-input" value={formData.stage} onChange={e => setFormData({ ...formData, stage: e.target.value })}>
                                <option value="Ideation">Ideation</option>
                                <option value="MVP">MVP</option>
                                <option value="Pre-seed">Pre-seed</option>
                                <option value="Seed">Seed</option>
                                <option value="Series A+">Series A+</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="admin-label">Platform Status</label>
                            <select className="admin-input" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                <option value="Active">Active</option>
                                <option value="Stealth">Stealth</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        <div className="col-span-2 space-y-1.5">
                            <label className="admin-label">Strategic Narrative (Description)</label>
                            <textarea className="admin-input min-h-[100px] resize-none py-3" placeholder="Core mission and value proposition..." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                        </div>
                        <div className="col-span-2 space-y-1.5">
                            <label className="admin-label">Digital Presence (URL)</label>
                            <div className="relative">
                                <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-40" />
                                <input className="admin-input pl-10" placeholder="https://..." value={formData.website_url} onChange={e => setFormData({ ...formData, website_url: e.target.value })} />
                            </div>
                        </div>
                    </div>
                </Modal>

                {/* Delete Confirmation */}
                <Modal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    title="DELETE RECORDS"
                    description={`Permanently remove ${selectedStartup?.name} from the active portfolio?`}
                    type="danger"
                    confirmText="Delete Record"
                    onConfirm={handleDelete}
                />
            </motion.div>
        </DashboardLayout>
    )
}
