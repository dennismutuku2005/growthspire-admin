"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle, Clock, Search, Filter, Eye, ChevronRight, MapPin, Edit2, Trash2, Plus, Image as ImageIcon, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Modal } from "@/components/Modal"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

export default function EventsPage() {
    const [events, setEvents] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState<any>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [isEdit, setIsEdit] = useState(false)

    const [formData, setFormData] = useState({
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
    })

    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        setLoading(true)
        try {
            const res = await fetch("http://localhost/growthspire/backend/events.php?action=get_events")
            const data = await res.json()
            if (data.success) {
                setEvents(data.data)
            }
        } catch (err) {
            toast.error("Failed to fetch events")
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async () => {
        const action = isEdit ? "update_event" : "create_event"
        const body = isEdit ? { action, id: selectedEvent.id, ...formData } : { action, ...formData }
        
        try {
            const res = await fetch("http://localhost/growthspire/backend/events.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            const data = await res.json()
            if (data.success) {
                toast.success(isEdit ? "Event updated" : "Event created")
                setIsFormOpen(false)
                fetchEvents()
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
            const res = await fetch("http://localhost/growthspire/backend/events.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "delete_event", id: selectedEvent.id })
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Event removed")
                setIsDeleteOpen(false)
                fetchEvents()
            }
        } catch (err) {
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
        setFormData({
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
        })
    }

    const filteredEvents = (events as any[]).filter((e: any) => 
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
                            <Calendar size={20} className="text-primary" />
                            Event Command
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Orchestrate meetups, demo days and networking events
                        </p>
                    </div>
                    <Button
                        onClick={() => { resetForm(); setIsFormOpen(true); }}
                        className="admin-button-primary"
                    >
                        <Plus size={16} /> <span>Schedule Event</span>
                    </Button>
                </div>

                {/* Filter Bar */}
                <div className="flex gap-2 bg-muted/30 border border-border p-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search events by title or location..."
                            className="w-full bg-card h-12 pl-10 pr-4 text-[11px] font-black uppercase tracking-widest outline-none focus:border-primary border border-border/50 rounded-lg"
                        />
                    </div>
                </div>

                {/* Grid Layout for Events */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="admin-card flex flex-col h-full bg-card animate-pulse">
                                <div className="h-40 bg-muted border-b border-border" />
                                <div className="p-5 flex-1 flex flex-col gap-3">
                                    <div className="h-3 w-24 bg-muted rounded" />
                                    <div className="h-4 w-3/4 bg-muted rounded" />
                                    <div className="h-3 w-full bg-muted rounded" />
                                    <div className="h-3 w-5/6 bg-muted rounded" />
                                    <div className="mt-auto flex gap-2 pt-4 border-t border-border">
                                        <div className="flex-1 h-9 bg-muted rounded" />
                                        <div className="w-9 h-9 bg-muted rounded" />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : filteredEvents.length > 0 ? (
                        (filteredEvents as any[]).map((event: any) => (
                            <div key={event.id} className="admin-card group hover:border-foreground transition-all flex flex-col h-full bg-card">
                                <div className="h-40 bg-muted border-b border-border flex items-center justify-center overflow-hidden relative">
                                    {event.image_url ? (
                                        <img src={event.image_url} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                    ) : (
                                        <ImageIcon size={24} className="text-muted-foreground/30" />
                                    )}
                                    <div className="absolute top-3 left-3">
                                        <span className="bg-primary text-primary-foreground text-xs font-semibold py-1 px-3 rounded-full border border-primary">
                                            {event.event_type}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 mb-2 text-xs font-medium text-primary">
                                        <Clock size={12} />
                                        {new Date(event.event_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        <span>•</span>
                                        {event.start_time}
                                    </div>
                                    <h3 className="text-lg font-semibold leading-tight mb-2 group-hover:text-primary transition-colors">
                                        {event.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                                        {event.description || "No detailed description provided for this session."}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto pb-4">
                                        <MapPin size={12} className="text-muted-foreground/60" />
                                        {event.location}
                                    </div>
                                    <div className="flex gap-2 pt-4 border-t border-border mt-auto">
                                        <button 
                                            onClick={() => openEdit(event)}
                                            className="flex-1 py-2 border border-border text-xs font-medium hover:border-foreground transition-all rounded-md"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => { setSelectedEvent(event); setIsDeleteOpen(true); }}
                                            className="px-3 py-2 border border-border text-muted-foreground hover:text-destructive hover:border-destructive transition-all"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-muted-foreground text-sm border border-dashed border-border rounded-xl">No events scheduled.</div>
                    )}
                </div>

                {/* Form Modal */}
                <Modal
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    title={isEdit ? "Revise Event" : "Brief New Event"}
                    description={isEdit ? `Modifying parameters for ${formData.title}` : "Determine the logistics for an upcoming GrowthSpire gathering"}
                    confirmText={isEdit ? "Save Changes" : "Confirm Schedule"}
                    onConfirm={handleSubmit}
                    maxWidth="max-w-2xl"
                >
                    <div className="space-y-6">
                        <div className="space-y-1">
                            <label className="admin-label">Event Title</label>
                            <input 
                                className="admin-input" 
                                placeholder="E.G. GROWTH SUMMIT 2024" 
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="admin-label">Date</label>
                                <input 
                                    type="date"
                                    className="admin-input"
                                    value={formData.event_date}
                                    onChange={(e) => setFormData({...formData, event_date: e.target.value})}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="admin-label">Event Type</label>
                                <select 
                                    className="admin-input"
                                    value={formData.event_type}
                                    onChange={(e) => setFormData({...formData, event_type: e.target.value})}
                                >
                                    <option value="In-Person">In-Person</option>
                                    <option value="Online">Online Webinar</option>
                                    <option value="Hybrid">Hybrid Session</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="admin-label">Start Time</label>
                                <input 
                                    type="time"
                                    className="admin-input" 
                                    value={formData.start_time}
                                    onChange={(e) => setFormData({...formData, start_time: e.target.value})}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="admin-label">Location / Link</label>
                                <input 
                                    className="admin-input" 
                                    placeholder="Nairobi Garage or Zoom Link" 
                                    value={formData.location}
                                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="admin-label">Banner Image URL</label>
                                <input 
                                    className="admin-input" 
                                    placeholder="HTTPS://IMAGE.URL/BANNER.JPG" 
                                    value={formData.image_url}
                                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="admin-label">Registration URL</label>
                                <input 
                                    className="admin-input" 
                                    placeholder="HTTPS://EVENTBRITE.COM/..." 
                                    value={formData.registration_link}
                                    onChange={(e) => setFormData({...formData, registration_link: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="admin-label">Description / Agenda</label>
                            <textarea 
                                className="admin-input h-24" 
                                placeholder="WHAT SHOULD ATTENDEES EXPECT?" 
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                            />
                        </div>
                    </div>
                </Modal>

                <Modal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    title="Cancel Event"
                    description={`Permanently remove "${selectedEvent?.title}" from the calendar?`}
                    type="danger"
                    confirmText="Remove Irreversibly"
                    onConfirm={handleDelete}
                />
            </div>
        </DashboardLayout>
    )
}
