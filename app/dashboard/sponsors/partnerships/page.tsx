"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Handshake, Download, ExternalLink, Search, Filter, Plus, Edit2, Trash2, MoreHorizontal, Loader2, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Modal } from "@/components/Modal"
import { Label } from "@/components/ui/label"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

export default function PartnershipsPage() {
    interface Partner {
        id: number
        partner_name: string
        partnership_type: string
        agreement_date: string
        status: string
        benefits: string
    }

    const [partnerships, setPartnerships] = useState<Partner[]>([])
    const [loading, setLoading] = useState(true)
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
    const [searchQuery, setSearchQuery] = useState("")

    const [formData, setFormData] = useState({
        partner_name: "",
        partnership_type: "",
        agreement_date: "",
        status: "Active",
        benefits: ""
    })

    useEffect(() => {
        fetchPartnerships()
    }, [])

    const fetchPartnerships = async () => {
        setLoading(true)
        try {
            const res = await fetch("https://api.growthspire.org/sponsors.php?action=get_partnerships")
            const data = await res.json()
            if (data.success) {
                setPartnerships(data.data)
            }
        } catch (err) {
            toast.error("Failed to fetch partnerships")
        } finally {
            setLoading(false)
        }
    }

    const handleCreate = async () => {
        try {
            const res = await fetch("https://api.growthspire.org/sponsors.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "create_partnership", ...formData })
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Partnership onboarded")
                setIsAddOpen(false)
                fetchPartnerships()
                setFormData({ partner_name: "", partnership_type: "", agreement_date: "", status: "Active", benefits: "" })
            }
        } catch (err) {
            toast.error("An error occurred")
        }
    }

    const handleDelete = async () => {
        if (!selectedPartner) return
        try {
            const res = await fetch("https://api.growthspire.org/sponsors.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "delete_partnership", id: selectedPartner.id })
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Partnership record removed")
                setIsDeleteOpen(false)
                fetchPartnerships()
            }
        } catch (err) {
            toast.error("Failed to delete partnership")
        }
    }

    const filteredPartners = partnerships.filter(p => 
        p.partner_name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <DashboardLayout>
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-8 pb-10"
            >
                {/* Header Title Grid */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6 font-sans">
                    <div>
                        <h1 className="text-xl font-semibold text-foreground flex items-center gap-3">
                            <Handshake size={20} className="text-primary" />
                            Administrative Partnerships
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1 font-medium opacity-70">
                            Coordinate strategic alliances and verified ecosystem benefits
                        </p>
                    </div>
                    <Button 
                        onClick={() => setIsAddOpen(true)}
                        className="admin-button-primary h-10 px-6"
                    >
                        <Plus size={16} />
                        <span>Initialize Partnership</span>
                    </Button>
                </motion.div>

                {/* Filters Row Component */}
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

                {/* Alliances Table Asset */}
                <motion.div variants={itemVariants} className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Identification (Entity)</th>
                                <th>Strategic Type</th>
                                <th>Temporal Bound (Date)</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i}><td colSpan={5} className="p-0"><Skeleton className="h-16 w-full" /></td></tr>
                                ))
                            ) : filteredPartners.length > 0 ? (
                                filteredPartners.map((partner) => (
                                    <tr key={partner.id} className="group">
                                        <td>
                                            <div className="flex items-center gap-3 font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                                                <div className="h-8 w-8 rounded bg-primary/5 flex items-center justify-center border border-primary/10">
                                                    <Handshake size={14} className="text-primary" />
                                                </div>
                                                {partner.partner_name}
                                            </div>
                                        </td>
                                        <td className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-70">{partner.partnership_type}</td>
                                        <td>
                                            <div className="text-[11px] font-medium text-foreground flex items-center gap-1.5 opacity-80">
                                                <Calendar size={12} className="text-muted-foreground" />
                                                {new Date(partner.agreement_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                        </td>
                                        <td>
                                            <span className={cn(
                                                "text-[10px] font-bold px-2 py-1 rounded-full border",
                                                partner.status === 'Active' ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-muted text-muted-foreground border-border"
                                            )}>
                                                {partner.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="h-8 w-8 p-0 text-muted-foreground hover:text-primary hover:bg-primary/5"
                                                    onClick={() => { setSelectedPartner(partner); setIsEditOpen(true); }}
                                                >
                                                    <Edit2 size={14} />
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                                                    onClick={() => { setSelectedPartner(partner); setIsDeleteOpen(true); }}
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-24 text-muted-foreground italic text-sm">No active alliances in core repository</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </motion.div>

                {/* Creation/Edit Form Asset */}
                <Modal
                    isOpen={isAddOpen || isEditOpen}
                    onClose={() => { setIsAddOpen(false); setIsEditOpen(false); }}
                    title={isEditOpen ? "Update Alliance" : "Onboard Partnership"}
                    description={isEditOpen ? "Update strategic partnership parameters" : "Initialize a new agreement with an ecosystem entity"}
                    footer={
                        <div className="flex gap-3 w-full">
                            <Button variant="outline" className="flex-1 font-bold text-[10px] uppercase tracking-widest h-10" onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }}>Cancel</Button>
                            <Button className="flex-1 admin-button-primary h-10" onClick={handleCreate}>
                                {isEditOpen ? "Finalize Entry" : "Onboard Alliance"}
                            </Button>
                        </div>
                    }
                >
                    <div className="space-y-5 p-1">
                        <div className="space-y-1.5">
                            <label className="admin-label">Partner Entity Name</label>
                            <input className="admin-input" placeholder="e.g. AWS Startup Program" value={formData.partner_name} onChange={e => setFormData({ ...formData, partner_name: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="admin-label">Alliance Category</label>
                                <input className="admin-input" placeholder="e.g. Technology" value={formData.partnership_type} onChange={e => setFormData({ ...formData, partnership_type: e.target.value })} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="admin-label">Temporal Bound (Date)</label>
                                <input type="date" className="admin-input" value={formData.agreement_date} onChange={e => setFormData({ ...formData, agreement_date: e.target.value })} />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="admin-label">Strategic Status</label>
                            <select className="admin-input" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                <option value="Active">Active</option>
                                <option value="Expired">Expired</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="admin-label">Ecosystem Benefits (Overview)</label>
                            <textarea className="admin-input h-24 resize-none py-3" placeholder="Core value proposition of the partnership..." value={formData.benefits} onChange={e => setFormData({ ...formData, benefits: e.target.value })} />
                        </div>
                    </div>
                </Modal>

                {/* Delete Confirmation Asset */}
                <Modal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    title="DELETE PARTNERSHIP"
                    description={`Permanently remove administrative records for ${selectedPartner?.partner_name}?`}
                    type="danger"
                    confirmText="Delete Record"
                    onConfirm={handleDelete}
                />
            </motion.div>
        </DashboardLayout>
    )
}
