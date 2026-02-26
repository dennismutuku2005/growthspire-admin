"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Building2, Pencil, Trash2, Search, Filter, Edit2, X, MoreHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Modal } from "@/components/Modal"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function SponsorsPage() {
    // Initial Data
    const [sponsors, setSponsors] = useState([
        {
            id: 1,
            name: "Global Tech Ventures",
            type: "Venture Capital",
            tier: "Gold",
            contribution: "$500,000",
            status: "Active",
        },
        {
            id: 2,
            name: "Future Fund Foundation",
            type: "Non-Profit",
            tier: "Platinum",
            contribution: "$1,000,000",
            status: "Active",
        },
        {
            id: 3,
            name: "Innovate Bank",
            type: "Corporate",
            tier: "Silver",
            contribution: "$250,000",
            status: "Pending Renewal",
        },
        {
            id: 4,
            name: "TechHub Systems",
            type: "Technology Partner",
            tier: "Bronze",
            contribution: "In-Kind",
            status: "Active",
        },
    ])

    // State for Modals
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [currentSponsor, setCurrentSponsor] = useState(null)
    const [newSponsor, setNewSponsor] = useState({
        name: "",
        type: "Corporate",
        tier: "Bronze",
        contribution: "",
        status: "Active"
    })

    // Handlers
    const handleAddSponsor = () => {
        const id = sponsors.length + 1
        setSponsors([{ id, ...newSponsor }, ...sponsors])
        setIsAddOpen(false)
        setNewSponsor({ name: "", type: "Corporate", tier: "Bronze", contribution: "", status: "Active" })
    }

    const handleDeleteSponsor = () => {
        setSponsors(sponsors.filter(s => s.id !== currentSponsor.id))
        setIsDeleteOpen(false)
        setCurrentSponsor(null)
    }

    const handleEditSponsor = () => {
        setSponsors(sponsors.map(s => s.id === currentSponsor.id ? currentSponsor : s))
        setIsEditOpen(false)
        setCurrentSponsor(null)
    }

    const openEditModal = (sponsor) => {
        setCurrentSponsor(sponsor)
        setIsEditOpen(true)
    }

    const openDeleteModal = (sponsor) => {
        setCurrentSponsor(sponsor)
        setIsDeleteOpen(true)
    }

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in duration-500">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                            <Building2 className="text-blue-600" size={24} />
                            Sponsor Network
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Manage relationships with key partners and sponsors
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsAddOpen(true)}
                        size="sm"
                        className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-sm"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add New Sponsor
                    </Button>
                </div>

                {/* Metrics Bar */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                        <p className="text-sm font-medium text-gray-500">Total Funding</p>
                        <div className="mt-2 text-3xl font-bold text-gray-900">$1.75M</div>
                        <div className="mt-1 flex items-center text-sm font-medium text-emerald-600">
                            +12% <span className="text-gray-500 ml-1">from last quarter</span>
                        </div>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                        <p className="text-sm font-medium text-gray-500">Active Partners</p>
                        <div className="mt-2 text-3xl font-bold text-gray-900">{sponsors.length}</div>
                        <div className="mt-1 flex items-center text-sm font-medium text-gray-500">
                            Across 4 regions
                        </div>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                        <p className="text-sm font-medium text-gray-500">Pending Renewals</p>
                        <div className="mt-2 text-3xl font-bold text-amber-600">
                            {sponsors.filter(s => s.status === 'Pending Renewal').length}
                        </div>
                        <div className="mt-1 flex items-center text-sm font-medium text-amber-600">
                            Requires attention
                        </div>
                    </div>
                </div>

                {/* Filter and Table Section */}
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                    {/* Filter Bar */}
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search organization or type..."
                                className="pl-9 h-10 rounded-lg border-gray-200 bg-white focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <Button variant="outline" className="h-10 rounded-lg border-gray-200 text-gray-600 hover:text-gray-900">
                            <Filter className="mr-2 h-4 w-4" /> Filter
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-medium tracking-wider">
                                    <th className="py-3 px-6">Organization</th>
                                    <th className="py-3 px-6">Type</th>
                                    <th className="py-3 px-6">Tier</th>
                                    <th className="py-3 px-6">Contribution</th>
                                    <th className="py-3 px-6">Status</th>
                                    <th className="py-3 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {sponsors.map((sponsor) => (
                                    <tr key={sponsor.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                                    <Building2 size={16} />
                                                </div>
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {sponsor.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-600">
                                            {sponsor.type}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={cn(
                                                "text-xs font-medium px-2.5 py-0.5 rounded-full inline-block border",
                                                sponsor.tier === 'Platinum' ? "bg-indigo-50 text-indigo-700 border-indigo-100" :
                                                    sponsor.tier === 'Gold' ? "bg-amber-50 text-amber-700 border-amber-100" :
                                                        sponsor.tier === 'Silver' ? "bg-slate-50 text-slate-700 border-slate-100" :
                                                            "bg-orange-50 text-orange-700 border-orange-100"
                                            )}>
                                                {sponsor.tier}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                                            {sponsor.contribution}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={cn(
                                                "text-xs font-medium px-2.5 py-0.5 rounded-full inline-block",
                                                sponsor.status === "Active" ? "bg-emerald-50 text-emerald-700" :
                                                    "bg-amber-50 text-amber-700"
                                            )}>
                                                {sponsor.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-gray-100">
                                                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-[160px] rounded-lg shadow-lg border-gray-100">
                                                    <DropdownMenuItem onClick={() => openEditModal(sponsor)} className="cursor-pointer text-sm font-medium text-gray-700">
                                                        <Edit2 className="mr-2 h-4 w-4" /> Edit Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => openDeleteModal(sponsor)} className="cursor-pointer text-sm font-medium text-red-600 focus:text-red-700 focus:bg-red-50">
                                                        <Trash2 className="mr-2 h-4 w-4" /> Terminate
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add Sponsor Modal */}
                <Modal
                    isOpen={isAddOpen}
                    onClose={() => setIsAddOpen(false)}
                    title="Add New Sponsor"
                    description="Enter organization details to register a new partner."
                    type="info"
                    confirmText="Save Sponsor"
                    onConfirm={handleAddSponsor}
                >
                    <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label>Organization Name</Label>
                            <Input
                                value={newSponsor.name}
                                onChange={(e) => setNewSponsor({ ...newSponsor, name: e.target.value })}
                                className="rounded-lg border-gray-200"
                                placeholder="e.g. Acme Corp"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Category</Label>
                                <select
                                    className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={newSponsor.type}
                                    onChange={(e) => setNewSponsor({ ...newSponsor, type: e.target.value })}
                                >
                                    <option value="Venture Capital">Venture Capital</option>
                                    <option value="Corporate">Corporate</option>
                                    <option value="Non-Profit">Non-Profit</option>
                                    <option value="Technology Partner">Technology Partner</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label>Partnership Tier</Label>
                                <select
                                    className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={newSponsor.tier}
                                    onChange={(e) => setNewSponsor({ ...newSponsor, tier: e.target.value })}
                                >
                                    <option value="Platinum">Platinum</option>
                                    <option value="Gold">Gold</option>
                                    <option value="Silver">Silver</option>
                                    <option value="Bronze">Bronze</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </Modal>

                {/* Edit Sponsor Modal */}
                <Modal
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    title="Edit Partner Profile"
                    description={`Updating details for ${currentSponsor?.name}`}
                    type="info"
                    confirmText="Update Record"
                    onConfirm={handleEditSponsor}
                >
                    {currentSponsor && (
                        <div className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label>Organization Name</Label>
                                <Input
                                    value={currentSponsor.name}
                                    onChange={(e) => setCurrentSponsor({ ...currentSponsor, name: e.target.value })}
                                    className="rounded-lg border-gray-200"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Category</Label>
                                    <select
                                        className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={currentSponsor.type}
                                        onChange={(e) => setCurrentSponsor({ ...currentSponsor, type: e.target.value })}
                                    >
                                        <option value="Venture Capital">Venture Capital</option>
                                        <option value="Corporate">Corporate</option>
                                        <option value="Non-Profit">Non-Profit</option>
                                        <option value="Technology Partner">Technology Partner</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Status</Label>
                                    <select
                                        className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={currentSponsor.status}
                                        onChange={(e) => setCurrentSponsor({ ...currentSponsor, status: e.target.value })}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Pending Renewal">Pending Renewal</option>
                                        <option value="Suspended">Suspended</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    title="Confirm Termination"
                    description={`Are you sure you want to remove ${currentSponsor?.name}? This action will archive all partnership history.`}
                    type="danger"
                    confirmText="Terminate Partner"
                    onConfirm={handleDeleteSponsor}
                />
            </div>
        </DashboardLayout>
    )
}
