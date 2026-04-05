"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Search, Plus, Trash2, Edit2, ExternalLink, Image as ImageIcon, BarChart2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Modal } from "@/components/Modal"
import { toast } from "sonner"

const API = "https://api.growthspire.org/events.php"

const defaultForm = {
    title: "",
    description: "",
    event_date: "",
    start_time: "09:00",
    end_time: "17:00",
    location: "Nairobi, KE",
    event_type: "In-Person",
    image_url: "",
    registration_link: "",
    featured: 0
}

function SkeletonRow() {
    return (
        <div className="animate-pulse flex items-center gap-4 border-b border-border px-5 py-4">
            <div className="h-12 w-12 bg-muted rounded flex-shrink-0" />
            <div className="flex-1 space-y-2">
                <div className="h-3 w-48 bg-muted rounded" />
                <div className="h-2 w-32 bg-muted rounded" />
            </div>
            <div className="h-3 w-20 bg-muted rounded hidden md:block" />
            <div className="h-3 w-16 bg-muted rounded hidden lg:block" />
            <div className="flex gap-2 ml-auto">
                <div className="h-8 w-14 bg-muted rounded" />
                <div className="h-8 w-8 bg-muted rounded" />
            </div>
        </div>
    )
}

export default function PastEventsPage() {
    const [events, setEvents] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState<any>(null)
    const [formData, setFormData] = useState(defaultForm)

    useEffect(() => { fetchEvents() }, [])

    const fetchEvents = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${API}?action=get_events`)
            const data = await res.json()
            if (data.success) {
                const now = new Date()
                const past = data.data.filter((e: any) => new Date(e.event_date) < now)
                setEvents(past)
            }
        } catch {
            toast.error("Failed to fetch past events")
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async () => {
        if (!formData.title || !formData.event_date || !formData.event_type) {
            toast.error("Title, date and type are required")
            return
        }
        const action = isEdit ? "update_event" : "create_event"
        const body = isEdit ? { action, id: selectedEvent.id, ...formData } : { action, ...formData }
        try {
            const res = await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            const data = await res.json()
            if (data.success) {
                toast.success(isEdit ? "Event updated" : "Past event recorded")
                setIsFormOpen(false)
                fetchEvents()
                resetForm()
            } else {
                toast.error(data.message)
            }
        } catch {
            toast.error("An error occurred")
        }
    }

    const handleDelete = async () => {
        try {
            const res = await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "delete_event", id: selectedEvent.id })
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Event removed from archives")
                setIsDeleteOpen(false)
                fetchEvents()
            }
        } catch {
            toast.error("Failed to delete")
        }
    }

    const openEdit = (event: any) => {
        setSelectedEvent(event)
        setIsEdit(true)
        setFormData({
            title: event.title,
            description: event.description || "",
            event_date: event.event_date,
            start_time: event.start_time || "09:00",
            end_time: event.end_time || "17:00",
            location: event.location || "Nairobi, KE",
            event_type: event.event_type,
            image_url: event.image_url || "",
            registration_link: event.registration_link || "",
            featured: event.featured || 0
        })
        setIsFormOpen(true)
    }

    const resetForm = () => {
        setIsEdit(false)
        setSelectedEvent(null)
        setFormData(defaultForm)
    }

    const filtered = events.filter(e =>
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (e.location?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    )

    return (
        <DashboardLayout>
            <div className="space-y-8 animate-in fade-in duration-500 pb-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
                    <div>
                        <h1 className="text-xl font-semibold text-foreground flex items-center gap-3">
                            <Calendar size={20} className="text-muted-foreground" />
                            Event Archives
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Historical record of all completed GrowthSpire engagements
                        </p>
                    </div>
                    <Button
                        onClick={() => { resetForm(); setIsFormOpen(true) }}
                        className="admin-button-primary"
                    >
                        <Plus size={16} /> <span>Add Past Event</span>
                    </Button>
                </div>

                {/* Search */}
                <div className="flex gap-2 bg-muted/30 border border-border p-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="SEARCH ARCHIVED EVENTS..."
                            className="w-full bg-card h-12 pl-10 pr-4 text-[11px] font-black uppercase tracking-widest outline-none focus:border-primary border border-border/50 rounded-lg"
                        />
                    </div>
                </div>

                {/* Stats bar */}
                {!loading && (
                    <div className="flex gap-6 p-4 bg-muted/30 border border-border">
                        <div>
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Total Archived</span>
                            <p className="text-xl font-bold text-foreground">{events.length}</p>
                        </div>
                    </div>
                )}

                {/* List */}
                <div className="border border-border bg-card overflow-hidden">
                    {/* Table Header */}
                    <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_auto] gap-4 bg-muted/30 border-b border-border px-5 py-3 rounded-t-xl">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Event Title</span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Location</span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Actions</span>
                    </div>

                    {loading ? (
                        Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                    ) : filtered.length > 0 ? (
                        filtered.map((event) => (
                            <div key={event.id} className="group flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_auto] gap-4 items-center border-b border-border last:border-0 px-5 py-4 hover:bg-muted/20 transition-colors">
                                <div className="flex items-center gap-3 w-full">
                                    <div className="h-10 w-10 bg-muted border border-border flex items-center justify-center overflow-hidden flex-shrink-0">
                                        {event.image_url ? (
                                            <img src={event.image_url} alt="" className="h-full w-full object-cover" />
                                        ) : (
                                            <Calendar size={16} className="text-muted-foreground/40" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                            {event.title}
                                        </p>
                                        <span className="text-xs font-medium px-2 py-0.5 bg-muted text-muted-foreground border border-border rounded-md mt-1 inline-block">
                                            {event.event_type}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground w-full md:w-auto">
                                    <Clock size={12} className="text-muted-foreground/40 flex-shrink-0" />
                                    {new Date(event.event_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground w-full md:w-auto">
                                    <MapPin size={12} className="text-muted-foreground/40 flex-shrink-0" />
                                    <span className="truncate max-w-[120px]">{event.location || "N/A"}</span>
                                </div>
                                <div className="flex gap-2 ml-auto">
                                    <button
                                        onClick={() => openEdit(event)}
                                        className="px-3 py-1.5 border border-border text-xs font-medium hover:border-foreground transition-all flex items-center gap-1 rounded-md"
                                    >
                                        <Edit2 size={12} /> Edit
                                    </button>
                                    <button
                                        onClick={() => { setSelectedEvent(event); setIsDeleteOpen(true) }}
                                        className="px-3 py-2 border border-border text-muted-foreground hover:text-destructive hover:border-destructive transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-20 text-center text-muted-foreground text-sm">
                            No past events recorded.
                        </div>
                    )}
                </div>

                {/* Form Modal */}
                <Modal
                    isOpen={isFormOpen}
                    onClose={() => { setIsFormOpen(false); resetForm() }}
                    title={isEdit ? "Edit Archived Event" : "Record Past Event"}
                    description={isEdit ? `Editing: ${formData.title}` : "Log a completed GrowthSpire event into archives"}
                    confirmText={isEdit ? "Save Changes" : "Save to Archives"}
                    onConfirm={handleSubmit}
                    maxWidth="max-w-2xl"
                >
                    <div className="space-y-5">
                        <div className="space-y-1">
                            <label className="admin-label">Event Title *</label>
                            <input className="admin-input" placeholder="E.G. COHORT 3 DEMO DAY" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1">
                                <label className="admin-label">Event Date *</label>
                                <input type="date" className="admin-input" value={formData.event_date} onChange={e => setFormData({ ...formData, event_date: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                                <label className="admin-label">Event Type *</label>
                                <select className="admin-input" value={formData.event_type} onChange={e => setFormData({ ...formData, event_type: e.target.value })}>
                                    <option value="In-Person">In-Person</option>
                                    <option value="Online">Online Webinar</option>
                                    <option value="Hybrid">Hybrid Session</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1">
                                <label className="admin-label">Start Time</label>
                                <input type="time" className="admin-input" value={formData.start_time} onChange={e => setFormData({ ...formData, start_time: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                                <label className="admin-label">Location</label>
                                <input className="admin-input" placeholder="Innovation Hub, Nairobi" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="admin-label">Banner Image URL</label>
                            <input className="admin-input" placeholder="HTTPS://IMAGE.URL/RECAP.JPG" value={formData.image_url} onChange={e => setFormData({ ...formData, image_url: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <label className="admin-label">Description / Recap</label>
                            <textarea className="admin-input h-24" placeholder="WHAT HAPPENED AT THIS EVENT?" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                        </div>
                    </div>
                </Modal>

                {/* Delete Modal */}
                <Modal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    title="Remove Archived Event"
                    description={`Permanently delete "${selectedEvent?.title}" from the archives?`}
                    type="danger"
                    confirmText="Delete Archive"
                    onConfirm={handleDelete}
                />
            </div>
        </DashboardLayout>
    )
}
