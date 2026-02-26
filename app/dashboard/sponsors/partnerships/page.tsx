"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Handshake, Download, ExternalLink, Search, Filter, Plus, Edit2, Trash2, MoreHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Modal } from "@/components/Modal"
import { Label } from "@/components/ui/label"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function PartnershipsPage() {
    interface Partner {
        id: number
        partner: string
        type: string
        agreementDate: string
        status: string
        benefits: string
    }

    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)

    const partnerships: Partner[] = [
        {
            id: 1,
            partner: "TechGiant Corp",
            type: "Strategic",
            agreementDate: "2024-01-15",
            status: "Active",
            benefits: "Cloud Credits, Hardware Access"
        },
        {
            id: 2,
            partner: "University Innovation Hub",
            type: "Academic",
            agreementDate: "2023-11-20",
            status: "Active",
            benefits: "Research Labs, Intern Talent"
        },
        {
            id: 3,
            partner: "Legal Eagles LLP",
            type: "Service Provider",
            agreementDate: "2024-02-01",
            status: "Pending Renewal",
            benefits: "Pro-bono Legal Advice"
        }
    ]

    const handleEdit = (partner: Partner) => {
        setSelectedPartner(partner)
        setIsEditOpen(true)
    }

    const handleDelete = (partner: Partner) => {
        setSelectedPartner(partner)
        setIsDeleteOpen(true)
    }

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in duration-500">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 flex items-center gap-2">
                            <Handshake className="text-blue-600" size={24} />
                            Strategic Partnerships
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Manage partnership agreements, MoUs and ecosystem deliverables.
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsAddOpen(true)}
                        className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-sm"
                    >
                        <Plus className="mr-2 h-4 w-4" /> New Agreement
                    </Button>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row gap-3 bg-white p-4 border border-gray-100 rounded-xl shadow-sm">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Filter by partner or partnership type..."
                            className="pl-9 h-10 rounded-lg border-gray-200 bg-white focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <Button variant="outline" className="h-10 rounded-lg border-gray-200 text-gray-600 hover:text-gray-900">
                        <Filter className="mr-2 h-4 w-4 text-gray-400" /> Filter
                    </Button>
                </div>

                {/* Table Layout */}
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <th className="py-3 px-6">Partner Organization</th>
                                <th className="py-3 px-6">Type</th>
                                <th className="py-3 px-6">Key Benefits</th>
                                <th className="py-3 px-6">Date</th>
                                <th className="py-3 px-6">Status</th>
                                <th className="py-3 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {partnerships.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                                                <Handshake size={14} />
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">
                                                {p.partner}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm text-gray-600">
                                            {p.type}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-600">
                                        {p.benefits}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-500">
                                        {p.agreementDate}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={cn(
                                            "text-xs font-medium px-2.5 py-0.5 rounded-full inline-block",
                                            p.status === "Active" ? "bg-emerald-50 text-emerald-700" :
                                                "bg-amber-50 text-amber-700"
                                        )}>
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-gray-100">
                                                    <MoreHorizontal className="h-4 w-4 text-gray-500" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-[160px]">
                                                <DropdownMenuItem onClick={() => handleEdit(p)}>
                                                    <Edit2 className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Download className="mr-2 h-4 w-4" /> Download
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => handleDelete(p)}>
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Add Partner Modal */}
                <Modal
                    isOpen={isAddOpen}
                    onClose={() => setIsAddOpen(false)}
                    title="New Strategic Partner"
                    description="Enter partnership details and agreement terms."
                    type="info"
                    confirmText="Create Agreement"
                    onConfirm={() => setIsAddOpen(false)}
                >
                    <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label>Organization Name</Label>
                            <Input className="rounded-lg border-gray-200" placeholder="e.g. Microsoft for Startups" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Partnership Type</Label>
                                <Input className="rounded-lg border-gray-200" placeholder="Strategic" />
                            </div>
                            <div className="space-y-2">
                                <Label>Agreement Date</Label>
                                <Input type="date" className="rounded-lg border-gray-200" />
                            </div>
                        </div>
                    </div>
                </Modal>

                {/* Edit Partner Modal */}
                <Modal
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    title="Edit Agreement Details"
                    description={`Updating terms for ${selectedPartner?.partner}`}
                    type="info"
                    confirmText="Update Terms"
                    onConfirm={() => setIsEditOpen(false)}
                >
                    <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label>Partner Organization</Label>
                            <Input
                                defaultValue={selectedPartner?.partner}
                                className="rounded-lg border-gray-200"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <select className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                <option>Active</option>
                                <option>Pending Renewal</option>
                                <option>Terminated</option>
                            </select>
                        </div>
                    </div>
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    title="Terminate Partnership"
                    description={`Are you sure you want to terminate the agreement with ${selectedPartner?.partner}?`}
                    type="danger"
                    confirmText="Terminate Agreement"
                    onConfirm={() => setIsDeleteOpen(false)}
                    children={null}
                />

                {/* Top Banner Style Callout */}
                <div className="p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl text-white flex items-center justify-between shadow-md">
                    <div>
                        <p className="text-sm font-medium opacity-90">Total Value Generated via MoUs</p>
                        <p className="text-2xl font-bold mt-1">$1.2M <span className="text-sm font-normal opacity-70">This Year</span></p>
                    </div>
                    <div className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium backdrop-blur-sm border border-white/20">
                        Top Performer
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
