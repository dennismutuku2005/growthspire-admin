"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Rocket, CheckCircle, Clock, Search, Filter, Edit2, Trash2, Plus, Loader2, Globe, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Modal } from "@/components/Modal"
import { toast } from "sonner"

export default function StartupsPage() {
    const [startups, setStartups] = useState([])
    const [loading, setLoading] = useState(true)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedStartup, setSelectedStartup] = useState(null)
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
            const res = await fetch("http://localhost/growthspire/backend/startups.php?action=get_startups")
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
        const body = isEdit ? { action, id: selectedStartup.id, ...formData } : { action, ...formData }
        
        try {
            const res = await fetch("http://localhost/growthspire/backend/startups.php", {
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
            const res = await fetch("http://localhost/growthspire/backend/startups.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "delete_startup", id: selectedStartup.id })
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

    const openEdit = (startup) => {
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

    const filteredStartups = startups.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.founder?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <DashboardLayout>
            <div className="space-y-8 animate-in fade-in duration-500 pb-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
                    <div>
                        <h1 className="text-[18px] font-bold tracking-widest text-foreground uppercase flex items-center gap-3">
                            <Rocket size={20} className="text-primary" />
                            Startup Registry
                        </h1>
                        <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest mt-1 opacity-60">
                            Central database for GrowthSpire portfolio companies
                        </p>
                    </div>
                    <Button
                        onClick={() => { resetForm(); setIsFormOpen(true); }}
                        className="admin-button-primary"
                    >
                        <Plus size={16} /> <span>Add Startup</span>
                    </Button>
                </div>

                {/* Filter Bar */}
                <div className="flex gap-2 bg-muted/30 border border-border p-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="SEARCH BY NAME, FOUNDER OR SECTOR..."
                            className="w-full bg-white h-10 pl-10 pr-4 text-[11px] font-bold tracking-widest uppercase outline-none focus:border-foreground border border-border/50"
                        />
                    </div>
                </div>

                {/* Table Layout */}
                <div className="admin-table-container">
                    {loading ? (
                        <div className="p-20 flex justify-center"><Loader2 className="animate-spin h-6 w-6 text-muted-foreground" /></div>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Company</th>
                                    <th>Founder</th>
                                    <th>Sector/Stage</th>
                                    <th>Status</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStartups.length > 0 ? filteredStartups.map((startup) => (
                                    <tr key={startup.id} className="group">
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 bg-muted border border-border flex items-center justify-center shrink-0">
                                                    {startup.logo ? (
                                                        <img src={startup.logo} alt="" className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                                                    ) : (
                                                        <Rocket size={14} className="text-muted-foreground/40" />
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="text-[13px] font-bold text-foreground block uppercase leading-tight">
                                                        {startup.name}
                                                    </span>
                                                    {startup.website && (
                                                       <a href={startup.website} target="_blank" className="text-[9px] font-bold text-primary uppercase tracking-tighter flex items-center gap-0.5 hover:underline">
                                                           {new URL(startup.website).hostname} <Globe size={8} />
                                                       </a>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-[11px] font-bold text-muted-foreground uppercase">
                                            <div className="flex items-center gap-1.5 font-bold">
                                                <User size={12} className="opacity-40" />
                                                {startup.founder}
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-[11px] font-bold text-muted-foreground uppercase opacity-80">
                                                {startup.sector}
                                            </span>
                                            <p className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-widest">{startup.stage}</p>
                                        </td>
                                        <td>
                                            <span className={cn(
                                                "text-[9px] font-black uppercase px-2 py-0.5 border flex items-center gap-1 w-fit tracking-tighter",
                                                startup.status === 'Active' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : 
                                                startup.status === 'Accelerated' ? "bg-blue-50 text-blue-700 border-blue-100" : "bg-muted text-muted-foreground border-border"
                                            )}>
                                                {startup.status}
                                            </span>
                                        </td>
                                        <td className="text-right">
                                            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => openEdit(startup)}
                                                    className="h-8 w-8 flex items-center justify-center border border-border hover:border-foreground transition-all"
                                                >
                                                    <Edit2 size={14} />
                                                </button>
                                                <button
                                                    onClick={() => { setSelectedStartup(startup); setIsDeleteOpen(true); }}
                                                    className="h-8 w-8 flex items-center justify-center border border-border hover:border-destructive hover:text-destructive transition-all"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="5" className="text-center py-20 text-muted-foreground font-bold uppercase text-[11px]">No portfolio startups discovered</td></tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Form Modal */}
                <Modal
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    title={isEdit ? "Update Registry" : "Onboard Startup"}
                    description={isEdit ? `MODIFYING PROFILE FOR ${formData.name.toUpperCase()}` : "DETERMINE THE CORE DETAILS FOR A NEW ECOSYSTEM MEMBER"}
                    confirmText={isEdit ? "Update Record" : "Confirm Onboarding"}
                    onConfirm={handleSubmit}
                    maxWidth="max-w-2xl"
                >
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="admin-label">Startup Name</label>
                                <input 
                                    className="admin-input" 
                                    placeholder="E.G. TECHNOVA" 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="admin-label">Founder</label>
                                <input 
                                    className="admin-input" 
                                    placeholder="JOHN DOE" 
                                    value={formData.founder}
                                    onChange={(e) => setFormData({...formData, founder: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-1">
                                <label className="admin-label">Sector</label>
                                <input 
                                    className="admin-input" 
                                    placeholder="FINTECH" 
                                    value={formData.category}
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="admin-label">Stage</label>
                                <select 
                                    className="admin-input"
                                    value={formData.stage}
                                    onChange={(e) => setFormData({...formData, stage: e.target.value})}
                                >
                                    <option>Idea</option>
                                    <option>Pre-Seed</option>
                                    <option>Seed</option>
                                    <option>Series A</option>
                                    <option>Series B</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="admin-label">Status</label>
                                <select 
                                    className="admin-input"
                                    value={formData.status}
                                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                                >
                                    <option>Active</option>
                                    <option>Accelerated</option>
                                    <option>Pending</option>
                                    <option>Exit</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="admin-label">Website URL</label>
                                <input 
                                    className="admin-input" 
                                    placeholder="HTTPS://..." 
                                    value={formData.website_url}
                                    onChange={(e) => setFormData({...formData, website_url: e.target.value})}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="admin-label">Logo URL</label>
                                <input 
                                    className="admin-input" 
                                    placeholder="HTTPS://IMAGE.URL/LOGO.PNG" 
                                    value={formData.logo_url}
                                    onChange={(e) => setFormData({...formData, logo_url: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="admin-label">Mission / One-Liner</label>
                            <textarea 
                                className="admin-input h-20" 
                                placeholder="THE CORE VALUE PROPOSITION..." 
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                            />
                        </div>
                    </div>
                </Modal>

                <Modal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    title="Expunge Record"
                    description={`PERMANENTLY REMOVE "${selectedStartup?.name}" FROM THE SYSTEM REPOSITORY?`}
                    type="danger"
                    confirmText="Remove Irreversibly"
                    onConfirm={handleDelete}
                />
            </div>
        </DashboardLayout>
    )
}
