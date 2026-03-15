"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle, Clock, Search, Filter, Eye, ChevronRight, MapPin, Edit2, Trash2, Plus, Loader2, Image as ImageIcon, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Modal } from "@/components/Modal"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function EventsPage() {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null)
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

    const openEdit = (event) => {
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

    const filteredEvents = events.filter(e => 
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        e.location?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <DashboardLayout>
            <div className="space-y-8 animate-in fade-in duration-500 pb-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
                    <div>
                        <h1 className="text-[18px] font-bold tracking-widest text-foreground uppercase flex items-center gap-3">
                            <Calendar size={20} className="text-primary" />
                            Event Command
                        </h1>
                        <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest mt-1 opacity-60">
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
                            placeholder="FIND EVENTS BY TITLE OR LOCATION..."
                            className="w-full bg-white h-10 pl-10 pr-4 text-[11px] font-bold tracking-widest uppercase outline-none focus:border-foreground border border-border/50"
                        />
                    </div>
                </div>

                {/* Grid Layout for Events */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <div className="col-span-full py-20 flex justify-center"><Loader2 className="animate-spin h-6 w-6 text-muted-foreground" /></div>
                    ) : filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <div key={event.id} className="admin-card group hover:border-foreground transition-all flex flex-col h-full bg-card">
                                <div className="h-40 bg-muted border-b border-border flex items-center justify-center overflow-hidden relative">
                                    {event.image_url ? (
                                        <img src={event.image_url} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                    ) : (
                                        <ImageIcon size={24} className="text-muted-foreground/30" />
                                    )}
                                    <div className="absolute top-3 left-3">
                                        <span className="bg-foreground text-background text-[9px] font-bold py-1 px-2 uppercase tracking-widest border border-foreground">
                                            {event.event_type}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 mb-2 text-[10px] font-bold text-primary uppercase tracking-wider">
                                        <Clock size={12} />
                                        {new Date(event.event_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        <span>•</span>
                                        {event.start_time}
                                    </div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest leading-tight mb-2 group-hover:text-primary transition-colors">
                                        {event.title}
                                    </h3>
                                    <p className="text-[11px] text-muted-foreground line-clamp-2 mb-4 leading-relaxed font-medium">
                                        {event.description || "No detailed description provided for this session."}
                                    </p>
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase mt-auto pb-4">
                                        <MapPin size={12} className="text-muted-foreground/60" />
                                        {event.location}
                                    </div>
                                    <div className="flex gap-2 pt-4 border-t border-border mt-auto">
                                        <button 
                                            onClick={() => openEdit(event)}
                                            className="flex-1 py-2 border border-border text-[10px] font-bold uppercase tracking-widest hover:border-foreground transition-all"
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
                        <div className="col-span-full py-20 text-center text-muted-foreground font-bold uppercase text-[11px] border border-dashed border-border">No events scheduled.</div>
                    )}
                </div>

                {/* Form Modal */}
                <Modal
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    title={isEdit ? "Revise Event" : "Brief New Event"}
                    description={isEdit ? `MODIFYING PARAMETERS FOR ${formData.title.toUpperCase()}` : "DETERMINE THE LOGISTICS FOR AN UPCOMING GROWTHSPIRE GATHERING"}
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
                    description={`PERMANENTLY REMOVE "${selectedEvent?.title}" FROM THE CALENDAR?`}
                    type="danger"
                    confirmText="Remove Irreversibly"
                    onConfirm={handleDelete}
                />
            </div>
        </DashboardLayout>
    )
}
