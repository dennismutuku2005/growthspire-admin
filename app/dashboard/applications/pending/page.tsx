"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Check, X, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function PendingApplicationsPage() {
    const [applications, setApplications] = useState([
        {
            id: 1,
            applicant: "Jane Doe",
            email: "jane@solarsolution.com",
            project: "Solar Solution",
            description: "A decentralized solar energy trading platform using blockchain.",
            submissionDate: "2024-03-10",
            status: "Pending Review",
        },
        {
            id: 2,
            applicant: "John Smith",
            email: "john@agritech.ai",
            project: "AgriTech AI",
            description: "AI-powered crop disease detection for rural farmers.",
            submissionDate: "2024-03-09",
            status: "Pending Review",
        },
        {
            id: 3,
            applicant: "Alice Brown",
            email: "alice@edusphere.io",
            project: "EduSphere",
            description: "VR classrooms for remote education in developing regions.",
            submissionDate: "2024-03-12",
            status: "Pending Review",
        },
    ])

    const [selectedApp, setSelectedApp] = useState<any>(null)
    const [isViewOpen, setIsViewOpen] = useState(false)

    const handleApprove = (id: number) => {
        setApplications(applications.filter(app => app.id !== id))
        // In a real app, this would make an API call to change status
    }

    const handleReject = (id: number) => {
        setApplications(applications.filter(app => app.id !== id))
    }

    const handleDelete = (id: number) => {
        setApplications(applications.filter(app => app.id !== id))
    }

    const openViewModal = (app: any) => {
        setSelectedApp(app)
        setIsViewOpen(true)
    }

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Pending Applications</h1>
                    <p className="text-muted-foreground mt-1">Review waiting applications.</p>
                </div>

                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Queue ({applications.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-border/50">
                                    <TableHead>Applicant</TableHead>
                                    <TableHead>Project Name</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {applications.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                            No pending applications. Good job!
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    applications.map((app) => (
                                        <TableRow key={app.id} className="hover:bg-accent/50 border-border/50 transition-colors">
                                            <TableCell className="font-medium">
                                                <div>{app.applicant}</div>
                                                <div className="text-xs text-muted-foreground">{app.email}</div>
                                            </TableCell>
                                            <TableCell>{app.project}</TableCell>
                                            <TableCell>{app.submissionDate}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-200">
                                                    {app.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button size="icon" variant="ghost" onClick={() => openViewModal(app)} title="View Details">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button size="icon" variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-100" onClick={() => handleApprove(app.id)} title="Approve">
                                                        <Check className="h-4 w-4" />
                                                    </Button>
                                                    <Button size="icon" variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-100" onClick={() => handleReject(app.id)} title="Reject">
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Application Details</DialogTitle>
                            <DialogDescription>Review the full application submission.</DialogDescription>
                        </DialogHeader>
                        {selectedApp && (
                            <div className="space-y-4 py-4">
                                <div className="grid grid-cols-4 items-start gap-4">
                                    <Label className="text-right font-medium">Applicant</Label>
                                    <div className="col-span-3">
                                        <p className="font-semibold">{selectedApp.applicant}</p>
                                        <p className="text-sm text-muted-foreground">{selectedApp.email}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-start gap-4">
                                    <Label className="text-right font-medium">Project</Label>
                                    <div className="col-span-3 font-semibold">{selectedApp.project}</div>
                                </div>
                                <div className="grid grid-cols-4 items-start gap-4">
                                    <Label className="text-right font-medium">Description</Label>
                                    <div className="col-span-3 p-3 bg-muted rounded-md text-sm">
                                        {selectedApp.description}
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-start gap-4">
                                    <Label className="text-right font-medium">Submitted</Label>
                                    <div className="col-span-3">{selectedApp.submissionDate}</div>
                                </div>
                            </div>
                        )}
                        <DialogFooter className="gap-2 sm:gap-0">
                            <Button variant="outline" className="text-destructive hover:text-destructive" onClick={() => { handleReject(selectedApp?.id); setIsViewOpen(false); }}>Reject</Button>
                            <Button className="bg-green-600 hover:bg-green-700" onClick={() => { handleApprove(selectedApp?.id); setIsViewOpen(false); }}>Approve Application</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </DashboardLayout>
    )
}
