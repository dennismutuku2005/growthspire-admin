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
            event_date: event.event_date || "",
            start_time: event.start_time || "09:00",
            end_time: event.end_time || "17:00",
            location: event.location || "Nairobi, KE",
            event_type: event.event_type || "In-Person",
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
        e.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <DashboardLayout>
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-8 pb-10"
            >
                {/* Header Page Title */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6 font-sans">
                    <div>
                        <h1 className="text-xl font-semibold text-foreground flex items-center gap-3">
                            <Calendar size={20} className="text-primary" />
                            Events Calendar
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1 font-medium opacity-70">
                            Coordinate workshops, demo days, and ecosystem networking
                        </p>
                    </div>
                    <Button 
                        onClick={() => { resetForm(); setIsFormOpen(true); }}
                        className="admin-button-primary h-10 px-6"
                    >
                        <Plus size={16} />
                        <span>Schedule Event</span>
                    </Button>
                </motion.div>

                {/* Filters & Search Row */}
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

                {/* Events Portfolio Map */}
                <motion.div variants={itemVariants} className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Identification</th>
                                <th>Schedule</th>
                                <th>Location</th>
                                <th>Featured</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array.from({ length: 4 }).map((_, i) => (
                                    <tr key={i}><td colSpan={5} className="p-0"><Skeleton className="h-16 w-full" /></td></tr>
                                ))
                            ) : filteredEvents.length > 0 ? (
                                filteredEvents.map((event) => (
                                    <tr key={event.id} className="group">
                                        <td>
                                            <div className="flex items-center gap-3 font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                                                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center border border-border shrink-0 overflow-hidden">
                                                    {event.image_url ? (
                                                        <img src={event.image_url} alt="" className="h-full w-full object-cover" />
                                                    ) : <Calendar size={18} className="text-muted-foreground opacity-30" />}
                                                </div>
                                                <div className="truncate max-w-[200px]">{event.title}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{new Date(event.event_date).toLocaleDateString()}</div>
                                            <div className="text-[10px] tabular-nums text-muted-foreground/60">{event.start_time} - {event.end_time}</div>
                                        </td>
                                        <td className="text-xs font-semibold text-muted-foreground opacity-80 uppercase tracking-wider">{event.location}</td>
                                        <td className="text-center">
                                            {event.featured ? <CheckCircle size={14} className="text-emerald-500 mx-auto" /> : <div className="h-1 w-4 bg-muted mx-auto rounded" />}
                                        </td>
                                        <td className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="h-8 w-8 p-0 text-muted-foreground hover:text-primary hover:bg-primary/5"
                                                    onClick={() => openEdit(event)}
                                                >
                                                    <Edit2 size={14} />
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                                                    onClick={() => { setSelectedEvent(event); setIsDeleteOpen(true); }}
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-24 text-muted-foreground italic text-sm">No events scheduled in core repository</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </motion.div>

                {/* Event Form Asset */}
                <Modal
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    title={isEdit ? "Edit Records" : "Schedule New Event"}
                    description={isEdit ? "Refine scheduled parameters" : "Initialize a new ecosystem gathering"}
                    footer={
                        <div className="flex gap-3 w-full">
                            <Button variant="outline" className="flex-1 font-bold text-[10px] uppercase tracking-widest h-10" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                            <Button className="flex-1 admin-button-primary h-10" onClick={handleSubmit}>
                                {isEdit ? "Finalize Record" : "Confirm Schedule"}
                            </Button>
                        </div>
                    }
                >
                    <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar p-1">
                        <div className="col-span-2 space-y-1.5">
                            <label className="admin-label">Strategic Narrative (Title)</label>
                            <input className="admin-input" placeholder="e.g. GS Demo Day Q3" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="admin-label">Date (ISO)</label>
                            <input type="date" className="admin-input" value={formData.event_date} onChange={e => setFormData({ ...formData, event_date: e.target.value })} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="admin-label">Location Type</label>
                            <select className="admin-input" value={formData.event_type} onChange={e => setFormData({ ...formData, event_type: e.target.value })}>
                                <option value="In-Person">In-Person</option>
                                <option value="Virtual">Virtual</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="admin-label">Commencement Time</label>
                            <input type="time" className="admin-input" value={formData.start_time} onChange={e => setFormData({ ...formData, start_time: e.target.value })} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="admin-label">Conclusion Time</label>
                            <input type="time" className="admin-input" value={formData.end_time} onChange={e => setFormData({ ...formData, end_time: e.target.value })} />
                        </div>
                        <div className="col-span-2 space-y-1.5">
                            <label className="admin-label">Physical Coordinates (Location)</label>
                            <div className="relative">
                                <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-40" />
                                <input className="admin-input pl-10" placeholder="e.g. GS Headquarters, Nairobi" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                            </div>
                        </div>
                        <div className="col-span-2 space-y-1.5">
                            <label className="admin-label">Digital Presence (Registration URL)</label>
                            <input className="admin-input" placeholder="https://registry..." value={formData.registration_link} onChange={e => setFormData({ ...formData, registration_link: e.target.value })} />
                        </div>
                        <div className="col-span-2 flex items-center gap-3 p-4 bg-muted/30 border border-border rounded-lg">
                            <input type="checkbox" id="is_featured" checked={formData.featured === 1} onChange={e => setFormData({...formData, featured: e.target.checked ? 1 : 0})} />
                            <label htmlFor="is_featured" className="text-xs font-bold uppercase tracking-wider cursor-pointer">Feature on platform overview</label>
                        </div>
                    </div>
                </Modal>

                {/* Delete Confirmation */}
                <Modal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    title="DELETE EVENT"
                    description={`Permanently remove ${selectedEvent?.title}?`}
                    type="danger"
                    confirmText="Delete Record"
                    onConfirm={handleDelete}
                />
            </motion.div>
        </DashboardLayout>
    )
}
