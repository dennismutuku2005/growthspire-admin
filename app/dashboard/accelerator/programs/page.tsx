"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Plus, Filter, Search, Layers, ChevronRight, Edit2, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Modal } from "@/components/Modal"
import { Label } from "@/components/ui/label"

export default function ProgramsPage() {
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedProgram, setSelectedProgram] = useState(null)

    const programs = [
        {
            id: 1,
            name: "Spring 2024 Batch",
            startDate: "2024-02-01",
            endDate: "2024-05-30",
            startups: 15,
            status: "Active",
        },
        {
            id: 2,
            name: "Fintech Focus 2024",
            startDate: "2024-06-01",
            endDate: "2024-09-01",
            startups: 10,
            status: "Upcoming",
        },
        {
            id: 3,
            name: "Winter 2023 Batch",
            startDate: "2023-11-01",
            endDate: "2024-02-01",
            startups: 12,
            status: "Completed",
        },
    ]

    const handleEdit = (program) => {
        setSelectedProgram(program)
        setIsEditOpen(true)
    }

    const handleDelete = (program) => {
        setSelectedProgram(program)
        setIsDeleteOpen(true)
    }

    return (
        <DashboardLayout>
            <div className="space-y-4 animate-in fade-in duration-500">
                {/* 2D Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div>
                        <h1 className="text-lg font-semibold tracking-tight text-gray-900 uppercase flex items-center gap-2">
                            <Layers size={18} className="text-black" />
                            Program Cohorts
                        </h1>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                            MANAGE CURRICULUM, COHORT SCHEDULES AND SELECTION CYCLES
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsAddOpen(true)}
                        size="sm"
                        className="bg-black text-white hover:bg-black/90 rounded-none h-8 text-[11px] font-bold uppercase tracking-wide"
                    >
                        <Plus className="mr-1.5 h-3.5 w-3.5" /> Create New Program
                    </Button>
                </div>

                {/* 2D Filter Bar */}
                <div className="flex flex-col md:flex-row gap-2 bg-gray-50 border border-t-2 border-t-black p-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by program name or status..."
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
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">PROGRAM NAME</th>
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">DURATION</th>
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">ENROLLMENT</th>
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">STATUS</th>
                                <th className="py-2.5 px-3 text-right text-[10px] font-bold text-gray-400 uppercase">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {programs.map((program) => (
                                <tr key={program.id} className="group border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                    <td className="py-2.5 px-3">
                                        <div className="flex flex-col">
                                            <span className="text-[13px] font-bold text-gray-900 group-hover:text-black">
                                                {program.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-2.5 px-3">
                                        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase">
                                            <Calendar size={12} className="text-gray-300" />
                                            {program.startDate} – {program.endDate}
                                        </div>
                                    </td>
                                    <td className="py-2.5 px-3">
                                        <div className="flex items-center gap-1.5 text-[11px] text-gray-600 font-bold">
                                            <Users size={12} className="text-gray-300" />
                                            {program.startups} STARTUPS
                                        </div>
                                    </td>
                                    <td className="py-2.5 px-3">
                                        <span className={cn(
                                            "text-[10px] font-bold uppercase px-1.5 py-0.5 border",
                                            program.status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                                program.status === "Upcoming" ? "bg-blue-50 text-blue-600 border-blue-100" :
                                                    "bg-gray-50 text-gray-400 border-gray-200"
                                        )}>
                                            {program.status}
                                        </span>
                                    </td>
                                    <td className="py-2.5 px-3 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                onClick={() => handleEdit(program)}
                                                variant="ghost" className="h-7 px-2 rounded-none text-gray-400 hover:text-black text-[10px] font-bold uppercase"
                                            >
                                                <Edit2 size={12} className="mr-1" /> Edit
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(program)}
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

                {/* Add Program Modal */}
                <Modal
                    isOpen={isAddOpen}
                    onClose={() => setIsAddOpen(false)}
                    title="Create New Program"
                    description="Define a new accelerator cohort."
                    type="info"
                    confirmText="Create Program"
                    onConfirm={() => setIsAddOpen(false)}
                >
                    <div className="space-y-4 pt-2">
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold uppercase text-gray-400">Program Name</Label>
                            <Input className="rounded-none border-gray-200 h-9 text-[12px] font-bold uppercase" placeholder="E.G. FALL 2024" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label className="text-[10px] font-bold uppercase text-gray-400">Start Date</Label>
                                <Input type="date" className="rounded-none border-gray-200 h-9 text-[12px] font-bold" />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-[10px] font-bold uppercase text-gray-400">End Date</Label>
                                <Input type="date" className="rounded-none border-gray-200 h-9 text-[12px] font-bold" />
                            </div>
                        </div>
                    </div>
                </Modal>

                {/* Edit Program Modal */}
                <Modal
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    title="Edit Program"
                    description={`Modifying ${selectedProgram?.name}`}
                    type="info"
                    confirmText="Save Changes"
                    onConfirm={() => setIsEditOpen(false)}
                >
                    <div className="space-y-4 pt-2">
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold uppercase text-gray-400">Status</Label>
                            <Input
                                defaultValue={selectedProgram?.status}
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
                    description={`Are you sure you want to delete ${selectedProgram?.name}? All associated cohort data will be archived.`}
                    type="danger"
                    confirmText="Delete Program"
                    onConfirm={() => setIsDeleteOpen(false)}
                />

                {/* 2D Metrics Footer */}
                <div className="bg-gray-50 border border-gray-200 p-2 flex items-center justify-between px-3">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Batch:</span>
                            <span className="text-sm font-bold text-gray-800">4</span>
                        </div>
                        <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Startups:</span>
                            <span className="text-sm font-bold text-gray-800">37</span>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
