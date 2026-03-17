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
                        <h1 className="text-xl font-semibold tracking-tight text-foreground flex items-center gap-2">
                            <Handshake className="text-primary" size={20} />
                            Strategic Partnerships
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Manage partnership agreements, MoUs and ecosystem deliverables.
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsAddOpen(true)}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg shadow-sm h-10 px-4"
                    >
                        <Plus className="mr-2 h-4 w-4" /> New Agreement
                    </Button>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row gap-3 bg-card p-4 border border-border rounded-xl shadow-sm">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Filter by partner or partnership type..."
                            className="pl-9 h-10 rounded-lg border-border bg-background focus:ring-primary focus:border-primary text-sm"
                        />
                    </div>
                    <Button variant="outline" className="h-10 rounded-lg border-border text-foreground hover:text-foreground/80 px-4">
                        <Filter className="mr-2 h-4 w-4 text-muted-foreground" /> Filter
                    </Button>
                </div>

                {/* Table Layout */}
                <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-muted/30 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
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
                                <tr key={p.id} className="hover:bg-muted/20 transition-colors border-b border-border last:border-0">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                                                <Handshake size={14} />
                                            </div>
                                            <span className="text-sm font-semibold text-foreground">
                                                {p.partner}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm text-muted-foreground">
                                            {p.type}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-muted-foreground">
                                        {p.benefits}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-muted-foreground">
                                        {p.agreementDate}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={cn(
                                            "text-xs font-medium px-2.5 py-1 rounded-md inline-block border",
                                            p.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                                                "bg-amber-50 text-amber-700 border-amber-100"
                                        )}>
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-muted text-muted-foreground">
                                                    <MoreHorizontal className="h-4 w-4" />
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
                            <Input className="rounded-lg border-border" placeholder="e.g. Microsoft for Startups" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Partnership Type</Label>
                                <Input className="rounded-lg border-border" placeholder="Strategic" />
                            </div>
                            <div className="space-y-2">
                                <Label>Agreement Date</Label>
                                <Input type="date" className="rounded-lg border-border" />
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
                                className="rounded-lg border-border"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <select className="w-full h-10 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
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
                <div className="p-5 bg-gradient-to-r from-primary to-primary/80 rounded-xl text-primary-foreground flex items-center justify-between shadow-sm border border-border/10">
                    <div>
                        <p className="text-sm font-medium opacity-90">Total Value Generated via MoUs</p>
                        <p className="text-2xl font-bold mt-1">$1.2M <span className="text-sm font-medium opacity-80">This Year</span></p>
                    </div>
                    <div className="px-3 py-1.5 bg-white/10 rounded-full text-xs font-semibold backdrop-blur-sm border border-white/20">
                        Top Performer
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
