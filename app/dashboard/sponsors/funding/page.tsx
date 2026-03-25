"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { DollarSign, Search, Filter, MoreHorizontal, PieChart, ArrowUpRight, Plus, Trash2, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Modal } from "@/components/Modal"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

export default function SponsorshipFundingPage() {
    const [funding, setFunding] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedFunding, setSelectedFunding] = useState<any>(null)
    const [searchQuery, setSearchQuery] = useState("")

    const [formData, setFormData] = useState({
        source_name: "",
        amount: "",
        funding_date: "",
        method: "Wire Transfer",
        status: "Received"
    })

    useEffect(() => {
        fetchFunding()
    }, [])

    const fetchFunding = async () => {
        setLoading(true)
        try {
            const res = await fetch("http://localhost/growthspire/backend/sponsors.php?action=get_funding")
            const data = await res.json()
            if (data.success) {
                setFunding(data.data)
            }
        } catch (err) {
            toast.error("Failed to fetch funding data")
        } finally {
            setLoading(false)
        }
    }

    const handleCreate = async () => {
        try {
            const res = await fetch("http://localhost/growthspire/backend/sponsors.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "create_funding", ...formData })
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Funding record created")
                setIsAddOpen(false)
                fetchFunding()
                setFormData({ source_name: "", amount: "", funding_date: "", method: "Wire Transfer", status: "Received" })
            }
        } catch (err) {
            toast.error("An error occurred")
        }
    }

    const handleDelete = async () => {
        if (!selectedFunding) return
        try {
            const res = await fetch("http://localhost/growthspire/backend/sponsors.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "delete_funding", id: selectedFunding.id })
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Record deleted")
                setIsDeleteOpen(false)
                fetchFunding()
            }
        } catch (err) {
            toast.error("Failed to delete record")
        }
    }

    const filteredFunding = funding.filter(f => 
        f.source_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        f.method.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const totalFunding = funding.reduce((sum, f) => sum + parseFloat(f.amount || 0), 0)

    return (
        <DashboardLayout>
            <div className="space-y-8 animate-in fade-in duration-500 pb-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
                    <div>
                        <h1 className="text-[18px] font-bold tracking-widest text-foreground uppercase flex items-center gap-3">
                            <DollarSign className="text-primary" size={20} />
                            Funding Ledger
                        </h1>
                        <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest mt-1 opacity-60">
                            Track financial contributions and grant compliance
                        </p>
                    </div>
                    <Button onClick={() => setIsAddOpen(true)} className="admin-button-primary">
                        <Plus size={16} /> <span>Add Record</span>
                    </Button>
                </div>

                {/* Summary Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-card border border-border p-6 rounded-xl border-l-4 border-l-emerald-500">
                        <div className="flex justify-between items-start">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Total Capital Secured</p>
                            <ArrowUpRight size={16} className="text-emerald-500" />
                        </div>
                        <p className="text-2xl font-black text-foreground mt-1">${totalFunding.toLocaleString()}</p>
                    </div>
                    <div className="bg-card border border-border p-6 rounded-xl border-l-4 border-l-amber-500">
                        <div className="flex justify-between items-start">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Active Stakeholders</p>
                            <PieChart size={16} className="text-amber-500" />
                        </div>
                        <p className="text-2xl font-black text-foreground mt-1">{new Set(funding.map(f => f.source_name)).size}</p>
                    </div>
                </div>

                {/* Search */}
                <div className="bg-card p-4 border border-border rounded-xl">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="SEARCH TRANSACTIONS..."
                            className="bg-card pl-9 h-12 uppercase font-black text-[11px] tracking-widest"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                    {loading ? (
                        <div className="p-4 space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-12 w-full" />)}
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-muted/30 border-b border-border text-xs font-black text-muted-foreground uppercase tracking-wider">
                                    <th className="py-4 px-6">Funding Source</th>
                                    <th className="py-4 px-6">Amount</th>
                                    <th className="py-4 px-6">Date</th>
                                    <th className="py-4 px-6">Method</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFunding.length > 0 ? filteredFunding.map((f) => (
                                    <tr key={f.id} className="hover:bg-muted/20 transition-colors border-b border-border last:border-0 group">
                                        <td className="py-4 px-6">
                                            <span className="text-[12px] font-bold text-foreground uppercase tracking-tight">
                                                {f.source_name}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-[12px] font-black text-emerald-600">
                                                ${parseFloat(f.amount).toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-[11px] font-bold text-muted-foreground uppercase">
                                            {f.funding_date}
                                        </td>
                                        <td className="py-4 px-6 text-[11px] font-bold text-muted-foreground uppercase">
                                            {f.method}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={cn(
                                                "text-[9px] font-black px-2 py-0.5 border uppercase tracking-tighter",
                                                f.status === 'Received' ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                                            )}>
                                                {f.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 hover:text-destructive" onClick={() => { setSelectedFunding(f); setIsDeleteOpen(true); }}>
                                                <Trash2 size={14} />
                                            </Button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan={6} className="py-20 text-center text-[11px] font-bold text-muted-foreground uppercase opacity-40">No transactions recovered</td></tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Add Modal */}
                <Modal
                    isOpen={isAddOpen}
                    onClose={() => setIsAddOpen(false)}
                    title="NEW FUNDING RECORD"
                    description="Enter capital injection details for the treasury."
                    confirmText="Save Record"
                    onConfirm={handleCreate}
                >
                    <div className="space-y-6 pt-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Source Name</Label>
                            <Input 
                                value={formData.source_name}
                                onChange={(e) => setFormData({...formData, source_name: e.target.value})}
                                className="bg-card border-border uppercase font-bold text-[12px] h-12" 
                                placeholder="E.G. GLOBAL TECH VENTURES" 
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Amount ($)</Label>
                                <Input 
                                    type="number"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                                    className="bg-card border-border uppercase font-bold text-[12px] h-12" 
                                    placeholder="250000" 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Funding Date</Label>
                                <Input 
                                    type="date" 
                                    value={formData.funding_date}
                                    onChange={(e) => setFormData({...formData, funding_date: e.target.value})}
                                    className="bg-card border-border h-12" 
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Method</Label>
                                <select 
                                    className="w-full h-12 rounded-md border border-border bg-card px-3 py-2 text-[12px] font-bold uppercase focus:outline-none focus:ring-2 focus:ring-primary"
                                    value={formData.method}
                                    onChange={(e) => setFormData({...formData, method: e.target.value})}
                                >
                                    <option>Wire Transfer</option>
                                    <option>Check</option>
                                    <option>Grant</option>
                                    <option>Equity</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Status</Label>
                                <select 
                                    className="w-full h-12 rounded-md border border-border bg-card px-3 py-2 text-[12px] font-bold uppercase focus:outline-none focus:ring-2 focus:ring-primary"
                                    value={formData.status}
                                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                                >
                                    <option>Received</option>
                                    <option>Pending</option>
                                    <option>Canceled</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    title="DELETE RECORD"
                    description={`Permanently expunge the record from ${selectedFunding?.source_name}?`}
                    type="danger"
                    confirmText="Delete Record"
                    onConfirm={handleDelete}
                />
            </div>
        </DashboardLayout>
    )
}
