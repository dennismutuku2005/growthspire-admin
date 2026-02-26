"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Clock, Plus, Filter, Search, Edit2, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Modal } from "@/components/Modal"
import { Label } from "@/components/ui/label"

export default function EventsPage() {
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null)

    const events = [
        {
            id: 1,
            title: "Startup Pitch Night",
            date: "2024-04-15",
            time: "18:00",
            location: "Innovation Hub Auditrium",
            attendees: 120,
            type: "Networking",
            status: "Upcoming",
        },
        {
            id: 2,
            title: "Founder's Workshop: Fundraising",
            date: "2024-04-20",
            time: "10:00",
            location: "Virtual (Zoom)",
            attendees: 45,
            type: "Workshop",
            status: "Upcoming",
        },
        {
            id: 3,
            title: "Tech Trends 2024",
            date: "2024-03-10",
            time: "14:00",
            location: "Main Hall",
            attendees: 200,
            type: "Conference",
            status: "Past",
        },
    ]

    const handleEdit = (event) => {
        setSelectedEvent(event)
        setIsEditOpen(true)
    }

    const handleDelete = (event) => {
        setSelectedEvent(event)
        setIsDeleteOpen(true)
    }

    return (
        <DashboardLayout>
            <div className="space-y-4 animate-in fade-in duration-500">
                {/* 2D Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-gray-900 uppercase flex items-center gap-2">
                            <Calendar size={18} className="text-black" />
                            Eco-System Events
                        </h1>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                            MANAGE ECOSYSTEM EVENTS AND NETWORKING OPPORTUNITIES
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsAddOpen(true)}
                        size="sm"
                        className="bg-black text-white hover:bg-black/90 rounded-none h-8 text-[11px] font-bold uppercase tracking-wide"
                    >
                        <Plus className="mr-1.5 h-3.5 w-3.5" /> Create New Event
                    </Button>
                </div>

                {/* 2D Filter Bar */}
                <div className="flex flex-col md:flex-row gap-2 bg-gray-50 border border-t-2 border-t-black p-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search events by title, location or type..."
                            className="pl-8 h-8 rounded-none border-gray-200 bg-white text-[12px] focus-visible:ring-0 focus-visible:border-gray-400"
                        />
                    </div>
                    <Button variant="outline" className="h-8 rounded-none border-gray-200 bg-white text-[11px] font-bold uppercase tracking-wider px-4">
                        <Filter className="mr-1.5 h-3.5 w-3.5 text-gray-400" /> Filter
                    </Button>
                </div>

                {/* 2D Table Layout */}
                <div className="border border-gray-200 bg-white overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">EVENT TITLE</th>
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">DATE & TIME</th>
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">LOCATION</th>
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">TYPE</th>
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">STATUS</th>
                                <th className="py-2.5 px-3 text-right text-[10px] font-bold text-gray-400 uppercase">RSVPS</th>
                                <th className="py-2.5 px-3 text-right text-[10px] font-bold text-gray-400 uppercase">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event) => (
                                <tr key={event.id} className="group border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                    <td className="py-2.5 px-3">
                                        <div className="flex flex-col">
                                            <span className="text-[13px] font-bold text-gray-900 group-hover:text-black uppercase">
                                                {event.title}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-2.5 px-3">
                                        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase">
                                            <Calendar size={12} className="text-gray-300" />
                                            {event.date}
                                            <Clock size={12} className="text-gray-300 ml-1" />
                                            {event.time}
                                        </div>
                                    </td>
                                    <td className="py-2.5 px-3">
                                        <div className="flex items-center gap-1.5 text-[11px] text-gray-600 font-bold uppercase">
                                            <MapPin size={12} className="text-gray-300" />
                                            {event.location}
                                        </div>
                                    </td>
                                    <td className="py-2.5 px-3">
                                        <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 bg-gray-100 text-gray-600 border border-gray-200">
                                            {event.type}
                                        </span>
                                    </td>
                                    <td className="py-2.5 px-3">
                                        <span className={cn(
                                            "text-[10px] font-bold uppercase px-1.5 py-0.5 border",
                                            event.status === "Upcoming" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                                "bg-gray-50 text-gray-400 border-gray-200"
                                        )}>
                                            {event.status}
                                        </span>
                                    </td>
                                    <td className="py-2.5 px-3 text-right">
                                        <div className="flex items-center justify-end gap-1.5 text-[11px] font-bold text-gray-700 uppercase">
                                            <Users size={12} className="text-gray-300" />
                                            {event.attendees}
                                        </div>
                                    </td>
                                    <td className="py-2.5 px-3 text-right">
                                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                onClick={() => handleEdit(event)}
                                                variant="ghost" className="h-7 px-2 rounded-none text-gray-400 hover:text-black text-[10px] font-bold uppercase"
                                            >
                                                <Edit2 size={12} className="mr-1" /> Edit
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(event)}
                                                variant="ghost" className="h-7 px-2 rounded-none text-gray-400 hover:text-red-600 text-[10px] font-bold uppercase"
                                            >
                                                <Trash2 size={12} className="mr-1" /> Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Add Event Modal */}
                <Modal
                    isOpen={isAddOpen}
                    onClose={() => setIsAddOpen(false)}
                    title="Create New Event"
                    description="Schedule a new workshop, meetup or conference."
                    type="info"
                    confirmText="Schedule Event"
                    onConfirm={() => setIsAddOpen(false)}
                >
                    <div className="space-y-4 pt-2">
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold uppercase text-gray-400">Event Title</Label>
                            <Input className="rounded-none border-gray-200 h-9 text-[12px] font-bold uppercase" placeholder="E.G. SUMMER DEMO DAY" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label className="text-[10px] font-bold uppercase text-gray-400">Date</Label>
                                <Input type="date" className="rounded-none border-gray-200 h-9 text-[12px] font-bold uppercase" />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-[10px] font-bold uppercase text-gray-400">Time</Label>
                                <Input type="time" className="rounded-none border-gray-200 h-9 text-[12px] font-bold uppercase" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold uppercase text-gray-400">Location</Label>
                            <Input className="rounded-none border-gray-200 h-9 text-[12px] font-bold uppercase" placeholder="E.G. MAIN AUDITORIUM OR ZOOM LINK" />
                        </div>
                    </div>
                </Modal>

                {/* Edit Event Modal */}
                <Modal
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    title="Edit Event Details"
                    description={`Updating information for ${selectedEvent?.title}`}
                    type="info"
                    confirmText="Save Updates"
                    onConfirm={() => setIsEditOpen(false)}
                >
                    <div className="space-y-4 pt-2">
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold uppercase text-gray-400">Title</Label>
                            <Input
                                defaultValue={selectedEvent?.title}
                                className="rounded-none border-gray-200 h-9 text-[12px] font-bold uppercase"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold uppercase text-gray-400">Status</Label>
                            <select className="w-full h-9 border border-gray-200 text-[12px] px-2 font-bold uppercase outline-none focus:border-black">
                                <option>Upcoming</option>
                                <option>Past</option>
                                <option>Cancelled</option>
                            </select>
                        </div>
                    </div>
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    title="Cancel Event"
                    description={`Are you sure you want to cancel and remove ${selectedEvent?.title}?`}
                    type="danger"
                    confirmText="Cancel Event"
                    onConfirm={() => setIsDeleteOpen(false)}
                />

                {/* 2D Metrics Footer */}
                <div className="flex gap-4 p-2 bg-gray-50 border border-gray-200">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Events:</span>
                        <span className="text-sm font-bold text-gray-900">{events.length}</span>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Upcoming:</span>
                        <span className="text-sm font-bold text-black bg-gray-200 px-1.5">2</span>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
