"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Building, Shield, Search, Filter, Edit2, Trash2, Plus, Loader2, Globe, Heart, ExternalLink } from "lucide-react"
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

interface Sponsor {
    id: string | number;
    name: string;
    logo_url: string;
    website_url: string;
    is_active: number;
}

export default function SponsorsPage() {
    const [sponsors, setSponsors] = useState<Sponsor[]>([])
    const [loading, setLoading] = useState(true)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [isEdit, setIsEdit] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        logo_url: "",
        website_url: "",
        is_active: 1
    })

    useEffect(() => {
        fetchSponsors()
    }, [])

    const fetchSponsors = async () => {
        setLoading(true)
        try {
            const res = await fetch("https://api.growthspire.org/sponsors.php?action=get_sponsors")
            const data = await res.json()
            if (data.success) {
                setSponsors(data.data)
            }
        } catch (err) {
            toast.error("Failed to fetch sponsors")
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async () => {
        if (isEdit && !selectedSponsor) return;
        const action = isEdit ? "update_sponsor" : "create_sponsor"
        const body = isEdit ? { action, id: selectedSponsor!.id, ...formData } : { action, ...formData }
        
        try {
            const res = await fetch("https://api.growthspire.org/sponsors.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            const data = await res.json()
            if (data.success) {
                toast.success(isEdit ? "Partner updated" : "Partner onboarded")
                setIsFormOpen(false)
                fetchSponsors()
                resetForm()
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            toast.error("An error occurred")
        }
    }

    const handleDelete = async () => {
        if (!selectedSponsor) return;
        try {
            const res = await fetch("https://api.growthspire.org/sponsors.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "delete_sponsor", id: selectedSponsor.id })
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Partner removed")
                setIsDeleteOpen(false)
                fetchSponsors()
            }
        } catch (err) {
            toast.error("Failed to delete")
        }
    }

    const openEdit = (sponsor: Sponsor) => {
        setSelectedSponsor(sponsor)
        setIsEdit(true)
        setFormData({
            name: sponsor.name,
            logo_url: sponsor.logo_url || "",
            website_url: sponsor.website_url || "",
            is_active: sponsor.is_active
        })
        setIsFormOpen(true)
    }

    const resetForm = () => {
        setIsEdit(false)
        setFormData({
            name: "",
            logo_url: "",
            website_url: "",
            is_active: 1
        })
    }

    const filteredSponsors = sponsors.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <DashboardLayout>
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-8 pb-10"
            >
                {/* Header Row */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6 font-sans">
                    <div>
                        <h1 className="text-xl font-semibold text-foreground flex items-center gap-3">
                            <Building size={20} className="text-primary" />
                            Sponsorship Network
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1 font-medium opacity-70">
                            Coordinate and manage corporate partnerships
                        </p>
                    </div>
                    <Button 
                        onClick={() => { resetForm(); setIsFormOpen(true); }}
                        className="admin-button-primary h-10 px-6"
                    >
                        <Plus size={16} />
                        <span>Add Partner</span>
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

                {/* Portfolio Content */}
                <motion.div variants={itemVariants} className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Partner Entity</th>
                                <th>Digital Assets</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array.from({ length: 4 }).map((_, i) => (
                                    <tr key={i}>
                                        <td colSpan={4} className="p-0"><Skeleton className="h-16 w-full" /></td>
                                    </tr>
                                ))
                            ) : filteredSponsors.length > 0 ? (
                                filteredSponsors.map((sponsor) => (
                                    <tr key={sponsor.id} className="group">
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded bg-muted/50 p-1 flex items-center justify-center border border-border overflow-hidden">
                                                    {sponsor.logo_url ? (
                                                        <img src={sponsor.logo_url} alt={sponsor.name} className="h-8 w-auto object-contain" />
                                                    ) : (
                                                        <Building size={16} className="text-muted-foreground opacity-30" />
                                                    )}
                                                </div>
                                                <div className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{sponsor.name}</div>
                                            </div>
                                        </td>
                                        <td>
                                            {sponsor.website_url ? (
                                                <a href={sponsor.website_url} target="_blank" className="flex items-center gap-1.5 text-xs text-blue-500 hover:underline">
                                                    <Globe size={12} />
                                                    {new URL(sponsor.website_url).hostname}
                                                    <ExternalLink size={10} />
                                                </a>
                                            ) : (
                                                <span className="text-[10px] text-muted-foreground italic">No URL linked</span>
                                            )}
                                        </td>
                                        <td>
                                            <span className={cn(
                                                "text-[10px] font-bold px-2 py-1 rounded-full border",
                                                sponsor.is_active ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-muted text-muted-foreground border-border"
                                            )}>
                                                {sponsor.is_active ? "ACTIVE" : "INACTIVE"}
                                            </span>
                                        </td>
                                        <td className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="h-8 w-8 p-0 text-muted-foreground hover:text-primary hover:bg-primary/5"
                                                    onClick={() => openEdit(sponsor)}
                                                >
                                                    <Edit2 size={14} />
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                                                    onClick={() => { setSelectedSponsor(sponsor); setIsDeleteOpen(true); }}
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-20 text-muted-foreground italic text-sm">No partners found in core network</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </motion.div>

                {/* Partner Form */}
                <Modal
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    title={isEdit ? "Edit Partner" : "Onboard Partner"}
                    description={isEdit ? "Update existing partnership records" : "Add a new strategic partner to the system"}
                    footer={
                        <div className="flex gap-3 w-full">
                            <Button variant="outline" className="flex-1 font-bold text-[10px] uppercase tracking-widest h-10" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                            <Button className="flex-1 admin-button-primary h-10" onClick={handleSubmit}>
                                {isEdit ? "Finalize Updates" : "Confirm Onboarding"}
                            </Button>
                        </div>
                    }
                >
                    <div className="space-y-5 p-1">
                        <div className="space-y-1.5">
                            <label className="admin-label">Partner Name</label>
                            <input className="admin-input" placeholder="e.g. Google Cloud" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="admin-label">Corporate Website URL</label>
                            <div className="relative">
                                <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-40" />
                                <input className="admin-input pl-10" placeholder="https://company.com" value={formData.website_url} onChange={e => setFormData({ ...formData, website_url: e.target.value })} />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="admin-label">Asset URL (Logo)</label>
                            <input className="admin-input tabular-nums" placeholder="https://cdn..." value={formData.logo_url} onChange={e => setFormData({ ...formData, logo_url: e.target.value })} />
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border border-border">
                            <input 
                                type="checkbox" 
                                id="is_active" 
                                className="h-4 w-4 rounded border-border bg-card text-primary" 
                                checked={formData.is_active === 1}
                                onChange={e => setFormData({ ...formData, is_active: e.target.checked ? 1 : 0 })}
                            />
                            <label htmlFor="is_active" className="text-xs font-bold uppercase tracking-wider cursor-pointer">Partner Active Status</label>
                        </div>
                    </div>
                </Modal>

                {/* Delete Confirmation */}
                <Modal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    title="DELETE PARTNER"
                    description={`Permanently remove ${selectedSponsor?.name}? This cannot be undone.`}
                    type="danger"
                    confirmText="Delete Record"
                    onConfirm={handleDelete}
                />
            </motion.div>
        </DashboardLayout>
    )
}
