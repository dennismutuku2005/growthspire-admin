"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Check, X, Search, Filter, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function PendingApplicationsPage() {
    const [applications, setApplications] = useState([
        {
            id: 1,
            applicant: "Jane Doe",
            email: "jane@solarsolution.com",
            project: "Solar Solution",
            description: "A decentralized solar energy trading platform using blockchain for peer-to-peer energy sharing in off-grid communities.",
            submissionDate: "2024-03-10",
            status: "Pending Review",
        },
        {
            id: 2,
            applicant: "John Smith",
            email: "john@agritech.ai",
            project: "AgriTech AI",
            description: "AI-powered crop disease detection for rural farmers through accessible mobile imaging and climate data analysis.",
            submissionDate: "2024-03-09",
            status: "Pending Review",
        },
        {
            id: 3,
            applicant: "Alice Brown",
            email: "alice@edusphere.io",
            project: "EduSphere",
            description: "VR classrooms for remote education in developing regions, providing immersive learning experiences without infrastructure.",
            submissionDate: "2024-03-12",
            status: "Pending Review",
        },
    ])

    const [selectedApp, setSelectedApp] = useState<any>(null)
    const [isViewOpen, setIsViewOpen] = useState(false)

    const handleApprove = (id: number) => {
        setApplications(applications.filter(app => app.id !== id))
    }

    const handleReject = (id: number) => {
        setApplications(applications.filter(app => app.id !== id))
    }

    const openViewModal = (app: any) => {
        setSelectedApp(app)
        setIsViewOpen(true)
    }

    return (
        <DashboardLayout>
            <div className="space-y-4 animate-in fade-in duration-500">
                {/* 2D Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div>
                        <h1 className="text-lg font-semibold tracking-tight text-gray-900 uppercase flex items-center gap-2">
                            <Clock size={18} className="text-amber-600" />
                            Review Queue
                        </h1>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                            MANAGE INCOMING APPLICATIONS WAITING FOR INITIAL SCREENING
                        </p>
                    </div>
                </div>

                {/* 2D Filter Bar */}
                <div className="flex flex-col md:flex-row gap-2 bg-gray-50 border border-t-2 border-t-amber-500 p-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Filter by applicant or project..."
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
                                <th>APPLICANT</th>
                                <th>PROJECT NAME</th>
                                <th>SUBMISSION DATE</th>
                                <th>STATUS</th>
                                <th className="text-right">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-[11px] font-bold text-gray-400 uppercase italic">
                                        No pending applications in queue.
                                    </td>
                                </tr>
                            ) : (
                                applications.map((app) => (
                                    <tr key={app.id} className="group border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                        <td className="py-2 px-3">
                                            <div className="flex flex-col">
                                                <span className="text-[13px] font-semibold text-gray-900 group-hover:text-pace-purple">
                                                    {app.applicant}
                                                </span>
                                                <span className="text-[10px] text-gray-400 font-medium uppercase truncate max-w-[150px]">
                                                    {app.email}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-2 px-3 text-[12px] font-bold text-gray-700">
                                            {app.project}
                                        </td>
                                        <td className="py-2 px-3 text-[11px] font-medium text-gray-400">
                                            {app.submissionDate}
                                        </td>
                                        <td className="py-2 px-3">
                                            <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 bg-amber-50 text-amber-600 border border-amber-100">
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="py-2 px-3">
                                            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" className="h-6 w-6 p-0 rounded-none text-gray-400 hover:text-pace-purple" onClick={() => openViewModal(app)}>
                                                    <Eye size={12} />
                                                </Button>
                                                <Button variant="ghost" className="h-6 w-6 p-0 rounded-none text-emerald-500 hover:bg-emerald-50" onClick={() => handleApprove(app.id)}>
                                                    <Check size={12} />
                                                </Button>
                                                <Button variant="ghost" className="h-6 w-6 p-0 rounded-none text-red-500 hover:bg-red-50" onClick={() => handleReject(app.id)}>
                                                    <X size={12} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* View Details Modal */}
                <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                    <DialogContent className="sm:max-w-[600px] rounded-none">
                        <DialogHeader>
                            <DialogTitle className="text-[14px] font-bold uppercase italic">Application Review</DialogTitle>
                            <DialogDescription className="text-[11px]">REVIEW THE FULL SUBMISSION FOR PROJECT: {selectedApp?.project.toUpperCase()}</DialogDescription>
                        </DialogHeader>
                        {selectedApp && (
                            <div className="space-y-4 py-2">
                                <div className="grid grid-cols-4 items-start gap-4 pb-2 border-b border-gray-100">
                                    <Label className="text-right text-[11px] font-bold uppercase text-gray-500 mt-1">Applicant</Label>
                                    <div className="col-span-3">
                                        <p className="text-[13px] font-bold">{selectedApp.applicant}</p>
                                        <p className="text-[11px] text-gray-400 font-medium">{selectedApp.email}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-start gap-4 pb-2 border-b border-gray-100">
                                    <Label className="text-right text-[11px] font-bold uppercase text-gray-500">Project</Label>
                                    <div className="col-span-3 text-[13px] font-bold text-pace-purple">{selectedApp.project}</div>
                                </div>
                                <div className="grid grid-cols-4 items-start gap-4 pb-2 border-b border-gray-100">
                                    <Label className="text-right text-[11px] font-bold uppercase text-gray-500">Pitch Info</Label>
                                    <div className="col-span-3 p-3 bg-gray-50 border border-gray-100 text-[11px] text-gray-600 leading-relaxed font-medium">
                                        {selectedApp.description}
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-start gap-4">
                                    <Label className="text-right text-[11px] font-bold uppercase text-gray-500">Received</Label>
                                    <div className="col-span-3 text-[11px] font-bold">{selectedApp.submissionDate}</div>
                                </div>
                            </div>
                        )}
                        <DialogFooter className="gap-2 sm:gap-1">
                            <Button size="sm" variant="outline" className="rounded-none border-red-200 text-red-500 hover:bg-red-50 h-8 text-[11px] font-bold uppercase px-6" onClick={() => { handleReject(selectedApp?.id); setIsViewOpen(false); }}>Reject</Button>
                            <Button size="sm" className="rounded-none bg-emerald-600 h-8 text-[11px] font-bold uppercase px-6" onClick={() => { handleApprove(selectedApp?.id); setIsViewOpen(false); }}>Approve</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </DashboardLayout>
    )
}
