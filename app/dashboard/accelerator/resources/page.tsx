"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { FileText, Download, PlayCircle, Search, Filter, Plus, BookOpen, ChevronRight, Edit2, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Modal } from "@/components/Modal"
import { Label } from "@/components/ui/label"

export default function ResourcesPage() {
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedResource, setSelectedResource] = useState(null)

    const resources = [
        {
            id: 1,
            title: "Seed Funding Term Sheet Template",
            type: "Document",
            format: "PDF",
            size: "2.5 MB",
        },
        {
            id: 2,
            title: "Market Analysis Framework",
            type: "Template",
            format: "XLSX",
            size: "1.2 MB",
        },
        {
            id: 3,
            title: "How to Build a Pitch Deck",
            type: "Video Course",
            format: "MP4",
            size: "15 mins",
        },
    ]

    const handleDelete = (resource) => {
        setSelectedResource(resource)
        setIsDeleteOpen(true)
    }

    return (
        <DashboardLayout>
            <div className="space-y-4 animate-in fade-in duration-500">
                {/* 2D Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-gray-900 uppercase flex items-center gap-2">
                            <BookOpen size={18} className="text-black" />
                            Digital Resource Library
                        </h1>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                            ACCESS TOOLS, TEMPLATES AND GUIDES FOR COHORT STARTUPS
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsAddOpen(true)}
                        size="sm"
                        className="bg-black text-white hover:bg-black/90 rounded-none h-8 text-[11px] font-bold uppercase tracking-wide"
                    >
                        <Plus className="mr-1.5 h-3.5 w-3.5" /> Upload Asset
                    </Button>
                </div>

                {/* 2D Filter Bar */}
                <div className="flex flex-col md:flex-row gap-2 bg-gray-50 border border-t-2 border-t-black p-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Filter resources by name, type or format..."
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
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">RESOURCE TITLE</th>
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">TYPE</th>
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">FORMAT</th>
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">SIZE/LENGTH</th>
                                <th className="py-2.5 px-3 text-right text-[10px] font-bold text-gray-400 uppercase">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resources.map((resource) => (
                                <tr key={resource.id} className="group border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                    <td className="py-2.5 px-3">
                                        <div className="flex items-center gap-2">
                                            <div className="text-gray-400">
                                                {resource.type === 'Video Course' ? <PlayCircle size={14} /> : <FileText size={14} />}
                                            </div>
                                            <span className="text-[13px] font-bold text-gray-900 group-hover:text-black uppercase">
                                                {resource.title}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-2.5 px-3">
                                        <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 border bg-white border-gray-100 text-gray-500">
                                            {resource.type}
                                        </span>
                                    </td>
                                    <td className="py-2.5 px-3 text-[11px] font-bold text-gray-400 tracking-widest uppercase">
                                        {resource.format}
                                    </td>
                                    <td className="py-2.5 px-3 text-[11px] font-bold text-gray-600 uppercase">
                                        {resource.size}
                                    </td>
                                    <td className="py-2.5 px-3 text-right">
                                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" className="h-7 gap-1 px-2 rounded-none text-gray-400 hover:text-black font-bold text-[10px] uppercase">
                                                <Download size={12} />
                                                Download
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(resource)}
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

                {/* Add Resource Modal */}
                <Modal
                    isOpen={isAddOpen}
                    onClose={() => setIsAddOpen(false)}
                    title="Upload New Asset"
                    description="Add a document, template or video to the library."
                    type="info"
                    confirmText="Upload File"
                    onConfirm={() => setIsAddOpen(false)}
                >
                    <div className="space-y-4 pt-2">
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold uppercase text-gray-400">Resource Title</Label>
                            <Input className="rounded-none border-gray-200 h-9 text-[12px] font-bold uppercase" placeholder="E.G. Q3 REPORT TEMPLATE" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label className="text-[10px] font-bold uppercase text-gray-400">Resource Type</Label>
                                <select className="w-full h-9 border border-gray-200 text-[12px] px-2 font-bold uppercase outline-none focus:border-black">
                                    <option>Document</option>
                                    <option>Template</option>
                                    <option>Video Course</option>
                                    <option>External Link</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-[10px] font-bold uppercase text-gray-400">File Format</Label>
                                <Input className="rounded-none border-gray-200 h-9 text-[12px] font-bold uppercase" placeholder="PDF, XLSX, MP4..." />
                            </div>
                        </div>
                    </div>
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    title="Confirm Deletion"
                    description={`Are you sure you want to delete ${selectedResource?.title}? This action cannot be undone.`}
                    type="danger"
                    confirmText="Delete Asset"
                    onConfirm={() => setIsDeleteOpen(false)}
                />

                {/* 2D Categories Footer */}
                <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 border border-gray-200 bg-gray-50/50 flex items-center justify-between group cursor-pointer hover:border-black transition-all">
                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tight group-hover:text-black">Templates</span>
                        <ChevronRight size={12} className="text-gray-300 group-hover:text-black" />
                    </div>
                    <div className="p-2 border border-gray-200 bg-gray-50/50 flex items-center justify-between group cursor-pointer hover:border-black transition-all">
                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tight group-hover:text-black">Legal Docs</span>
                        <ChevronRight size={12} className="text-gray-300 group-hover:text-black" />
                    </div>
                    <div className="p-2 border border-gray-200 bg-gray-50/50 flex items-center justify-between group cursor-pointer hover:border-black transition-all">
                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tight group-hover:text-black">Recordings</span>
                        <ChevronRight size={12} className="text-gray-300 group-hover:text-black" />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
