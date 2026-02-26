"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Plus, Search, Filter, Rocket, Edit2, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Modal } from "@/components/Modal"
import { Label } from "@/components/ui/label"

export default function StartupsPage() {
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedStartup, setSelectedStartup] = useState(null)

    const startups = [
        {
            id: 1,
            name: "TechNova",
            founder: "Sarah Johnson",
            stage: "Seed",
            sector: "Fintech",
            status: "Active",
            joined: "2024-01-15",
        },
        {
            id: 2,
            name: "GreenLeaf",
            founder: "David Chen",
            stage: "Series A",
            sector: "AgriTech",
            status: "Accelerated",
            joined: "2023-11-20",
        },
        {
            id: 3,
            name: "HealthConnect",
            founder: "Dr. Emily Smith",
            stage: "Pre-Seed",
            sector: "HealthTech",
            status: "Pending",
            joined: "2024-02-01",
        },
        {
            id: 4,
            name: "EduSphere",
            founder: "James Wilson",
            stage: "Idea",
            sector: "EdTech",
            status: "Active",
            joined: "2024-02-10",
        },
    ]

    const handleEdit = (startup) => {
        setSelectedStartup(startup)
        setIsEditOpen(true)
    }

    const handleDelete = (startup) => {
        setSelectedStartup(startup)
        setIsDeleteOpen(true)
    }

    return (
        <DashboardLayout>
            <div className="space-y-4 animate-in fade-in duration-500">
                {/* 2D Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-gray-900 flex items-center gap-2 uppercase">
                            <Rocket size={18} className="text-black" />
                            Startup Ecosystem
                        </h1>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                            MANAGE AND TRACK THE GROWTH OF YOUR PORTFOLIO
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsAddOpen(true)}
                        size="sm"
                        className="bg-black text-white hover:bg-black/90 rounded-none h-8 text-[11px] font-bold uppercase tracking-wide"
                    >
                        <Plus className="mr-1.5 h-3.5 w-3.5" /> Add New Startup
                    </Button>
                </div>

                {/* 2D Filter Bar */}
                <div className="flex flex-col md:flex-row gap-2 bg-gray-50 border border-t-2 border-t-black p-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                        <Input
                            placeholder="Search by company name, founder or sector..."
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
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">COMPANY NAME</th>
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">FOUNDER</th>
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">SECTOR</th>
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">STAGE</th>
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">STATUS</th>
                                <th className="py-2.5 px-3 text-right text-[10px] font-bold text-gray-400 uppercase">JOINED</th>
                                <th className="py-2.5 px-3 text-right text-[10px] font-bold text-gray-400 uppercase">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {startups.map((startup) => (
                                <tr key={startup.id} className="group border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                    <td className="py-2.5 px-3">
                                        <span className="text-[13px] font-bold text-gray-900 group-hover:text-black uppercase">
                                            {startup.name}
                                        </span>
                                    </td>
                                    <td className="py-2.5 px-3 text-[12px] font-bold text-gray-600 uppercase">
                                        {startup.founder}
                                    </td>
                                    <td className="py-2.5 px-3">
                                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">
                                            {startup.sector}
                                        </span>
                                    </td>
                                    <td className="py-2.5 px-3">
                                        <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 bg-gray-100 text-gray-600 border border-gray-200">
                                            {startup.stage}
                                        </span>
                                    </td>
                                    <td className="py-2.5 px-3">
                                        <span className={cn(
                                            "text-[10px] font-bold uppercase px-1.5 py-0.5 border",
                                            startup.status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                                startup.status === "Accelerated" ? "bg-blue-50 text-blue-600 border-blue-100" :
                                                    "bg-amber-50 text-amber-600 border-amber-100"
                                        )}>
                                            {startup.status}
                                        </span>
                                    </td>
                                    <td className="py-2.5 px-3 text-right text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                                        {startup.joined}
                                    </td>
                                    <td className="py-2.5 px-3 text-right">
                                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                onClick={() => handleEdit(startup)}
                                                variant="ghost" className="h-7 px-2 rounded-none text-gray-400 hover:text-black text-[10px] font-bold uppercase"
                                            >
                                                <Edit2 size={12} className="mr-1" /> Edit
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(startup)}
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

                {/* Add Startup Modal */}
                <Modal
                    isOpen={isAddOpen}
                    onClose={() => setIsAddOpen(false)}
                    title="Add New Startup"
                    description="Enter startup details to add to portfolio."
                    type="info"
                    confirmText="Add Startup"
                    onConfirm={() => setIsAddOpen(false)}
                >
                    <div className="space-y-4 pt-2">
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold uppercase text-gray-400">Company Name</Label>
                            <Input className="rounded-none border-gray-200 h-9 text-[12px] font-bold uppercase" placeholder="E.G. TECHNOVA" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label className="text-[10px] font-bold uppercase text-gray-400">Founder Name</Label>
                                <Input className="rounded-none border-gray-200 h-9 text-[12px] font-bold uppercase" placeholder="JOHN DOE" />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-[10px] font-bold uppercase text-gray-400">Sector</Label>
                                <Input className="rounded-none border-gray-200 h-9 text-[12px] font-bold uppercase" placeholder="FINTECH" />
                            </div>
                        </div>
                    </div>
                </Modal>

                {/* Edit Startup Modal */}
                <Modal
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    title="Edit Startup Profile"
                    description={`Updating details for ${selectedStartup?.name}`}
                    type="info"
                    confirmText="Save Changes"
                    onConfirm={() => setIsEditOpen(false)}
                >
                    <div className="space-y-4 pt-2">
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold uppercase text-gray-400">Stage</Label>
                            <Input
                                defaultValue={selectedStartup?.stage}
                                className="rounded-none border-gray-200 h-9 text-[12px] font-bold uppercase"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold uppercase text-gray-400">Status</Label>
                            <Input
                                defaultValue={selectedStartup?.status}
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
                    description={`Are you sure you want to remove ${selectedStartup?.name} from the ecosystem? This action is irreversible.`}
                    type="danger"
                    confirmText="Remove Startup"
                    onConfirm={() => setIsDeleteOpen(false)}
                />

                {/* 2D Metrics Footer */}
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Startups:</span>
                        <span className="text-sm font-bold text-gray-900">{startups.length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active:</span>
                        <span className="text-sm font-bold text-emerald-600">2</span>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
