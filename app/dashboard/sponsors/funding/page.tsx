"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { DollarSign, Search, Filter, MoreHorizontal, PieChart, ArrowUpRight, Plus, Trash2, Loader2, Calendar, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Modal } from "@/components/Modal"
import { Label } from "@/components/ui/label"
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
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-8 pb-10"
            >
                {/* Header Metrics Summary */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6 font-sans">
                    <div>
                        <h1 className="text-xl font-semibold text-foreground flex items-center gap-3">
                            <DollarSign size={20} className="text-primary" />
                            Funding Repository
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1 font-medium opacity-70">
                            Monitor and manage ecosystem sponsorship capital
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-4 py-2 bg-primary/5 border border-primary/20 rounded-lg text-right hidden md:block">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-primary opacity-60">Cumulative Funding</div>
                            <div className="text-sm font-black tabular-nums text-primary">${totalFunding.toLocaleString()}</div>
                        </div>
                        <Button 
                            onClick={() => setIsAddOpen(true)}
                            className="admin-button-primary h-10 px-6"
                        >
                            <Plus size={16} />
                            <span>Log Inbound Capital</span>
                        </Button>
                    </div>
                </motion.div>

                {/* Filters & Total Metric (Mobile) */}
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
                    <div className="md:hidden w-full p-4 bg-primary/5 border border-primary/20 rounded-lg flex justify-between items-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary opacity-60">Total Portfolio Funding</span>
                        <span className="text-sm font-black tabular-nums text-primary">${totalFunding.toLocaleString()}</span>
                    </div>
                </motion.div>

                {/* Capital Flow Table */}
                <motion.div variants={itemVariants} className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Funding Entity</th>
                                <th>Net Amount</th>
                                <th>Temporal (Date)</th>
                                <th>Methodology</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i}><td colSpan={6} className="p-0"><Skeleton className="h-16 w-full" /></td></tr>
                                ))
                            ) : filteredFunding.length > 0 ? (
                                filteredFunding.map((item) => (
                                    <tr key={item.id} className="group">
                                        <td>
                                            <div className="flex items-center gap-3 font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                                                <div className="h-8 w-8 rounded bg-primary/5 flex items-center justify-center border border-primary/10">
                                                    <TrendingUp size={14} className="text-primary" />
                                                </div>
                                                {item.source_name}
                                            </div>
                                        </td>
                                        <td className="text-sm font-black tabular-nums text-foreground opacity-90">${parseFloat(item.amount).toLocaleString()}</td>
                                        <td>
                                            <div className="text-[11px] font-medium text-foreground flex items-center gap-1.5 opacity-80">
                                                <Calendar size={12} className="text-muted-foreground" />
                                                {new Date(item.funding_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                        </td>
                                        <td className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-70">{item.method}</td>
                                        <td>
                                                <span className={cn(
                                                    "text-[10px] font-bold px-2 py-1 rounded-full border",
                                                    item.status === 'Received' ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                                                )}>
                                                    {item.status.toUpperCase()}
                                                </span>
                                        </td>
                                        <td className="text-right">
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                                                onClick={() => { setSelectedFunding(item); setIsDeleteOpen(true); }}
                                            >
                                                <Trash2 size={14} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center py-24 text-muted-foreground italic text-sm">No inbound capital records discovered</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </motion.div>

                {/* Capital Logging Modal */}
                <Modal
                    isOpen={isAddOpen}
                    onClose={() => setIsAddOpen(false)}
                    title="Log Inbound Capital"
                    description="Initialize a new records for sponsorship funding received"
                    footer={
                        <div className="flex gap-3 w-full">
                            <Button variant="outline" className="flex-1 font-bold text-[10px] uppercase tracking-widest h-10" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                            <Button className="flex-1 admin-button-primary h-10" onClick={handleCreate}>
                                Confirm Record
                            </Button>
                        </div>
                    }
                >
                    <div className="space-y-4 p-1">
                        <div className="space-y-1.5">
                            <label className="admin-label">Funding Primary Entity</label>
                            <input className="admin-input" placeholder="e.g. Mastercard Foundation" value={formData.source_name} onChange={e => setFormData({ ...formData, source_name: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="admin-label">Net Amount (USD)</label>
                                <input type="number" className="admin-input tabular-nums" placeholder="00.00" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="admin-label">Temporal (Date)</label>
                                <input type="date" className="admin-input tabular-nums" value={formData.funding_date} onChange={e => setFormData({ ...formData, funding_date: e.target.value })} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="admin-label">Transfer Methodology</label>
                                <select className="admin-input" value={formData.method} onChange={e => setFormData({ ...formData, method: e.target.value })}>
                                    <option value="Wire Transfer">Wire Transfer</option>
                                    <option value="Credit Card">Credit Card</option>
                                    <option value="Crypto">Crypto (USDT)</option>
                                    <option value="In-Kind">In-Kind</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="admin-label">Transaction Status</label>
                                <select className="admin-input" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                    <option value="Received">Received</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Failed">Failed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </Modal>

                {/* Delete Confirmation Component */}
                <Modal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    title="DELETE CAPITAL RECORD"
                    description={`Permanently remove administrative records for funding from ${selectedFunding?.source_name}?`}
                    type="danger"
                    confirmText="Delete Record"
                    onConfirm={handleDelete}
                />
            </motion.div>
        </DashboardLayout>
    )
}
