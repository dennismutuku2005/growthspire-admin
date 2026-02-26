"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Linkedin, Mail, Search, Filter, Plus, Users, Edit2, Trash2, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Modal } from "@/components/Modal"
import { Label } from "@/components/ui/label"

export default function MentorsPage() {
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedMentor, setSelectedMentor] = useState(null)

    const mentors = [
        {
            id: 1,
            name: "Elena Rodriguez",
            role: "Product Strategy",
            company: "Google",
            specialty: ["Product Market Fit", "UX"],
        },
        {
            id: 2,
            name: "Marcus Johnson",
            role: "CMO",
            company: "TechStar",
            specialty: ["Marketing", "Branding"],
        },
        {
            id: 3,
            name: "Dr. Alan Grant",
            role: "Investor",
            company: "Horizon VC",
            specialty: ["Fundraising", "Pitching"],
        },
    ]

    const handleEdit = (mentor) => {
        setSelectedMentor(mentor)
        setIsEditOpen(true)
    }

    const handleDelete = (mentor) => {
        setSelectedMentor(mentor)
        setIsDeleteOpen(true)
    }

    return (
        <DashboardLayout>
            <div className="space-y-4 animate-in fade-in duration-500">
                {/* 2D Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div>
                        <h1 className="text-lg font-semibold tracking-tight text-gray-900 uppercase flex items-center gap-2">
                            <Users size={18} className="text-black" />
                            Mentor Directory
                        </h1>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                            CONNECT STARTUPS WITH INDUSTRY EXPERTS AND INVESTORS
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsAddOpen(true)}
                        size="sm"
                        className="bg-black text-white hover:bg-black/90 rounded-none h-8 text-[11px] font-bold uppercase tracking-wide"
                    >
                        <Plus className="mr-1.5 h-3.5 w-3.5" /> Invite New Mentor
                    </Button>
                </div>

                {/* 2D Filter Bar */}
                <div className="flex flex-col md:flex-row gap-2 bg-gray-50 border border-t-2 border-t-black p-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name, role or expertise..."
                            className="pl-8 h-8 rounded-none border-gray-200 bg-white text-[12px] focus-visible:ring-0 focus-visible:border-gray-400"
                        />
                    </div>
                    <Button variant="outline" className="h-8 rounded-none border-gray-200 bg-white text-[11px] font-medium uppercase tracking-wider px-4">
                        <Filter className="mr-1.5 h-3.5 w-3.5 text-gray-400" /> Filter
                    </Button>
                </div>

                {/* 2D Table Layout */}
                <div className="border border-gray-200 bg-white overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">MENTOR NAME</th>
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">ROLE / COMPANY</th>
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">SPECIALTIES</th>
                                <th className="py-2.5 px-3 text-right text-[10px] font-bold text-gray-400 uppercase">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mentors.map((mentor) => (
                                <tr key={mentor.id} className="group border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                    <td className="py-2.5 px-3">
                                        <div className="flex items-center gap-2">
                                            <div className="h-7 w-7 bg-gray-100 text-gray-400 flex items-center justify-center text-[10px] font-bold border border-gray-200">
                                                {mentor.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <span className="text-[13px] font-bold text-gray-900 group-hover:text-black">
                                                {mentor.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-2.5 px-3">
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-bold text-gray-800 leading-tight">{mentor.role}</span>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase">{mentor.company}</span>
                                        </div>
                                    </td>
                                    <td className="py-2.5 px-3">
                                        <div className="flex flex-wrap gap-1">
                                            {mentor.specialty.map((spec) => (
                                                <span key={spec} className="text-[9px] font-bold uppercase px-1.5 py-0.5 bg-gray-50 text-gray-500 border border-gray-100">
                                                    {spec}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="py-2.5 px-3 text-right">
                                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                onClick={() => handleEdit(mentor)}
                                                variant="ghost" className="h-7 px-2 rounded-none text-gray-400 hover:text-black text-[10px] font-bold uppercase"
                                            >
                                                <Edit2 size={12} className="mr-1" /> Edit
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(mentor)}
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

                {/* Add Mentor Modal */}
                <Modal
                    isOpen={isAddOpen}
                    onClose={() => setIsAddOpen(false)}
                    title="Invite New Mentor"
                    description="Enter mentor details to send an invitation."
                    type="info"
                    confirmText="Send Invite"
                    onConfirm={() => setIsAddOpen(false)}
                >
                    <div className="space-y-4 pt-2">
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold uppercase text-gray-400">Full Name</Label>
                            <Input className="rounded-none border-gray-200 h-9 text-[12px] font-bold uppercase" placeholder="E.G. JOHN DOE" />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold uppercase text-gray-400">Email Address</Label>
                            <Input className="rounded-none border-gray-200 h-9 text-[12px] font-bold uppercase" placeholder="JOHN@COMPANY.COM" />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold uppercase text-gray-400">Specialty</Label>
                            <Input className="rounded-none border-gray-200 h-9 text-[12px] font-bold uppercase" placeholder="E.G. MARKETING, SALES" />
                        </div>
                    </div>
                </Modal>

                {/* Edit Mentor Modal */}
                <Modal
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    title="Edit Mentor Profile"
                    description={`Updating details for ${selectedMentor?.name}`}
                    type="info"
                    confirmText="Save Changes"
                    onConfirm={() => setIsEditOpen(false)}
                >
                    <div className="space-y-4 pt-2">
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold uppercase text-gray-400">Role / Designation</Label>
                            <Input
                                defaultValue={selectedMentor?.role}
                                className="rounded-none border-gray-200 h-9 text-[12px] font-bold uppercase"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold uppercase text-gray-400">Company</Label>
                            <Input
                                defaultValue={selectedMentor?.company}
                                className="rounded-none border-gray-200 h-9 text-[12px] font-bold uppercase"
                            />
                        </div>
                    </div>
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    title="Confirm Removal"
                    description={`Are you sure you want to remove ${selectedMentor?.name} from the directory?`}
                    type="danger"
                    confirmText="Remove Mentor"
                    onConfirm={() => setIsDeleteOpen(false)}
                />

                {/* 2D Metrics Callout */}
                <div className="flex gap-4 p-2 bg-gray-50 border border-gray-200">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Mentors:</span>
                        <span className="text-sm font-bold text-gray-800">{mentors.length}</span>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
