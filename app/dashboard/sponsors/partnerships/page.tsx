"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Handshake, Download, ExternalLink, Search, Filter, Plus, Edit2, Trash2, MoreHorizontal, Loader2 } from "lucide-react"
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
            const res = await fetch("http://localhost/growthspire/backend/sponsors.php?action=get_partnerships")
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
            const res = await fetch("http://localhost/growthspire/backend/sponsors.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "create_partnership", ...formData })
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Partnership created")
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
            const res = await fetch("http://localhost/growthspire/backend/sponsors.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "delete_partnership", id: selectedPartner.id })
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Partnership deleted successfully")
                setIsDeleteOpen(false)
                fetchPartnerships()
            }
        } catch (err) {
            toast.error("Failed to delete partnership")
        }
    }

    const filteredPartnerships = partnerships.filter(p => 
        p.partner_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.partnership_type.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in duration-500 pb-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
                    <div>
                        <h1 className="text-[18px] font-bold tracking-widest text-foreground uppercase flex items-center gap-3">
                            <Handshake className="text-primary" size={20} />
                            Partnerships & MoUs
                        </h1>
                        <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest mt-1 opacity-60">
                            Formalize and monitor ecosystem strategic collaborations
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsAddOpen(true)}
                        className="admin-button-primary"
                    >
                        <Plus size={16} /> <span>New Agreement</span>
                    </Button>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row gap-3 bg-card p-4 border border-border rounded-xl">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="SEARCH PARTNERSHIPS..."
                            className="bg-card pl-9 h-10 rounded-lg border-border focus:ring-primary focus:border-primary text-sm uppercase font-bold tracking-widest text-[11px]"
                        />
                    </div>
                </div>

                {/* Table Layout */}
                <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                    {loading ? (
                        <div className="p-4 space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-12 w-full" />)}
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-muted/30 border-b border-border text-xs font-black text-muted-foreground uppercase tracking-wider">
                                    <th className="py-4 px-6">Partner Organization</th>
                                    <th className="py-4 px-6">Type</th>
                                    <th className="py-4 px-6">Key Benefits</th>
                                    <th className="py-4 px-6">Date</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPartnerships.length > 0 ? filteredPartnerships.map((p) => (
                                    <tr key={p.id} className="hover:bg-muted/20 transition-colors border-b border-border last:border-0 group">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                                                    <Handshake size={14} />
                                                </div>
                                                <span className="text-[12px] font-bold text-foreground uppercase tracking-tight">
                                                    {p.partner_name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-[11px] font-bold text-muted-foreground uppercase">
                                                {p.partnership_type}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-[11px] font-medium text-muted-foreground">
                                            {p.benefits || "N/A"}
                                        </td>
                                        <td className="py-4 px-6 text-[11px] font-bold text-muted-foreground uppercase">
                                            {p.agreement_date}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={cn(
                                                "text-[9px] font-black px-2 py-0.5 border uppercase tracking-tighter",
                                                p.status === "Active" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
                                                    "bg-amber-500/10 text-amber-600 border-amber-500/20"
                                            )}>
                                                {p.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" className="h-8 w-8 p-0 hover:text-destructive" onClick={() => { setSelectedPartner(p); setIsDeleteOpen(true); }}>
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan={6} className="py-20 text-center text-[11px] font-bold text-muted-foreground uppercase opacity-40">No records discovered</td></tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Add Partner Modal */}
                <Modal
                    isOpen={isAddOpen}
                    onClose={() => setIsAddOpen(false)}
                    title="New Strategic Partner"
                    description="Enter partnership details and agreement terms."
                    confirmText="Create Agreement"
                    onConfirm={handleCreate}
                >
                <div className="space-y-6 pt-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] uppercase font-black tracking-widest opacity-60">Organization Name</Label>
                            <Input 
                                value={formData.partner_name}
                                onChange={(e) => setFormData({...formData, partner_name: e.target.value})}
                                className="bg-card border-border uppercase font-bold text-[12px] h-12" 
                                placeholder="E.G. MICROSOFT FOR STARTUPS" 
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-black tracking-widest opacity-60">Partnership Type</Label>
                                <Input 
                                    value={formData.partnership_type}
                                    onChange={(e) => setFormData({...formData, partnership_type: e.target.value})}
                                    className="bg-card border-border uppercase font-bold text-[12px] h-12" 
                                    placeholder="STRATEGIC" 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-black tracking-widest opacity-60">Agreement Date</Label>
                                <Input 
                                    type="date" 
                                    value={formData.agreement_date}
                                    onChange={(e) => setFormData({...formData, agreement_date: e.target.value})}
                                    className="bg-card border-border uppercase font-bold text-[12px] h-12" 
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] uppercase font-black tracking-widest opacity-60">Key Benefits</Label>
                            <Input 
                                value={formData.benefits}
                                onChange={(e) => setFormData({...formData, benefits: e.target.value})}
                                className="bg-card border-border uppercase font-bold text-[12px] h-12" 
                                placeholder="E.G. CLOUD CREDITS, MENTORSHIP" 
                            />
                        </div>
                    </div>
                </Modal>

                <Modal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    title="DELETE PARTNERSHIP"
                    description={`Permanently remove ${selectedPartner?.partner_name} from the ecosystem database?`}
                    type="danger"
                    confirmText="Delete Irreversibly"
                    onConfirm={handleDelete}
                />
            </div>
        </DashboardLayout>
    )
}
