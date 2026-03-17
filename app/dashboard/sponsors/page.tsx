"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Building, Shield, Search, Filter, Edit2, Trash2, Plus, Loader2, Globe, Heart, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Modal } from "@/components/Modal"
import { toast } from "sonner"

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
            const res = await fetch("http://localhost/growthspire/backend/sponsors.php?action=get_sponsors")
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
            const res = await fetch("http://localhost/growthspire/backend/sponsors.php", {
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
            const res = await fetch("http://localhost/growthspire/backend/sponsors.php", {
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
            is_active: sponsor.is_active || 1
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
            <div className="space-y-8 animate-in fade-in duration-500 pb-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
                    <div>
                        <h1 className="text-[18px] font-semibold text-foreground flex items-center gap-3">
                            <Heart size={20} className="text-primary" />
                            Partner Network
                        </h1>
                        <p className="text-[13px] text-muted-foreground mt-1">
                            Manage relationships with organizations supporting GrowthSpire
                        </p>
                    </div>
                    <Button
                        onClick={() => { resetForm(); setIsFormOpen(true); }}
                        className="admin-button-primary"
                    >
                        <Plus size={16} /> <span>Add Partner</span>
                    </Button>
                </div>

                {/* Filter Bar */}
                <div className="flex gap-2 bg-muted/30 border border-border p-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search partners by name..."
                            className="w-full bg-white h-10 pl-10 pr-4 text-sm outline-none focus:border-foreground border border-border/50 rounded-lg"
                        />
                    </div>
                </div>

                {/* Grid Layout for Sponsors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {loading ? (
                        <div className="col-span-full py-20 flex justify-center"><Loader2 className="animate-spin h-6 w-6 text-muted-foreground" /></div>
                    ) : filteredSponsors.length > 0 ? (
                        filteredSponsors.map((sponsor) => (
                            <div key={sponsor.id} className="admin-card group hover:border-foreground transition-all flex flex-col h-full bg-card">
                                <div className="h-32 bg-muted border-b border-border flex items-center justify-center p-6 bg-white shrink-0">
                                    {sponsor.logo_url ? (
                                        <img src={sponsor.logo_url} alt="" className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                                    ) : (
                                        <Building size={32} className="text-muted-foreground/20" />
                                    )}
                                </div>
                                <div className="p-4 flex-1 flex flex-col">
                                    <h3 className="text-base font-semibold leading-tight mb-1 group-hover:text-primary transition-colors">
                                        {sponsor.name}
                                    </h3>
                                    {sponsor.website_url && (
                                       <a href={sponsor.website_url} target="_blank" className="text-xs text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors">
                                           Visit Hub <ExternalLink size={10} />
                                       </a>
                                    )}
                                    
                                    <div className="flex gap-2 pt-6 border-t border-border mt-auto">
                                        <button 
                                            onClick={() => openEdit(sponsor)}
                                            className="flex-1 py-1.5 border border-border text-xs font-medium hover:border-foreground transition-all rounded-md"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => { setSelectedSponsor(sponsor); setIsDeleteOpen(true); }}
                                            className="px-2 py-1.5 border border-border text-muted-foreground hover:text-destructive hover:border-destructive transition-all"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-muted-foreground text-sm border border-dashed border-border opacity-50 rounded-xl">No partner records found.</div>
                    )}
                </div>

                {/* Form Modal */}
                <Modal
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    title={isEdit ? "Update Partnership" : "Register Partner"}
                    description={isEdit ? `Modifying metadata for ${formData.name}` : "Determine the core data for a new ecosystem sponsor"}
                    confirmText={isEdit ? "Update Profile" : "Confirm Partner"}
                    onConfirm={handleSubmit}
                    maxWidth="max-w-md"
                >
                    <div className="space-y-6">
                        <div className="space-y-1">
                            <label className="admin-label">Partner Name</label>
                            <input 
                                className="admin-input" 
                                placeholder="e.g. Safaricom" 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="admin-label">Logo URL</label>
                            <input 
                                className="admin-input" 
                                placeholder="https://image.url/logo.png" 
                                value={formData.logo_url}
                                onChange={(e) => setFormData({...formData, logo_url: e.target.value})}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="admin-label">Website URL</label>
                            <input 
                                className="admin-input" 
                                placeholder="https://website.com" 
                                value={formData.website_url}
                                onChange={(e) => setFormData({...formData, website_url: e.target.value})}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="admin-label">Status</label>
                            <select 
                                className="admin-input"
                                value={formData.is_active}
                                onChange={(e) => setFormData({...formData, is_active: parseInt(e.target.value)})}
                            >
                                <option value={1}>Active Partner</option>
                                <option value={0}>Inactive / Past</option>
                            </select>
                        </div>
                    </div>
                </Modal>

                <Modal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    title="Dissolve Partnership"
                    description={`Remove "${selectedSponsor?.name}" from the partner directory?`}
                    type="danger"
                    confirmText="Remove Irreversibly"
                    onConfirm={handleDelete}
                />
            </div>
        </DashboardLayout>
    )
}
