"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Building2, ExternalLink, Pencil, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

    // State for Dialog interactions
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [currentSponsor, setCurrentSponsor] = useState<any>(null)
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
        setSponsors([...sponsors, { id, ...newSponsor }])
        setIsAddOpen(false)
        setNewSponsor({ name: "", type: "Corporate", tier: "Bronze", contribution: "", status: "Active" })
    }

    const handleDeleteSponsor = (id: number) => {
        setSponsors(sponsors.filter(s => s.id !== id))
    }

    const handleEditSponsor = () => {
        setSponsors(sponsors.map(s => s.id === currentSponsor.id ? currentSponsor : s))
        setIsEditOpen(false)
        setCurrentSponsor(null)
    }

    const openEditModal = (sponsor: any) => {
        setCurrentSponsor(sponsor)
        setIsEditOpen(true)
    }

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Sponsors</h1>
                        <p className="text-muted-foreground mt-1">Manage relationships with your key partners and sponsors.</p>
                    </div>

                    <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                                <Plus className="mr-2 h-4 w-4" /> Add Sponsor
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add New Sponsor</DialogTitle>
                                <DialogDescription>
                                    Enter the details of the new sponsor organization.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">Name</Label>
                                    <Input
                                        id="name"
                                        value={newSponsor.name}
                                        onChange={(e) => setNewSponsor({ ...newSponsor, name: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="type" className="text-right">Type</Label>
                                    <div className="col-span-3">
                                        <Select
                                            value={newSponsor.type}
                                            onValueChange={(val) => setNewSponsor({ ...newSponsor, type: val })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Venture Capital">Venture Capital</SelectItem>
                                                <SelectItem value="Corporate">Corporate</SelectItem>
                                                <SelectItem value="Non-Profit">Non-Profit</SelectItem>
                                                <SelectItem value="Technology Partner">Technology Partner</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="tier" className="text-right">Tier</Label>
                                    <div className="col-span-3">
                                        <Select
                                            value={newSponsor.tier}
                                            onValueChange={(val) => setNewSponsor({ ...newSponsor, tier: val })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select tier" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Platinum">Platinum</SelectItem>
                                                <SelectItem value="Gold">Gold</SelectItem>
                                                <SelectItem value="Silver">Silver</SelectItem>
                                                <SelectItem value="Bronze">Bronze</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="contribution" className="text-right">Contribution</Label>
                                    <Input
                                        id="contribution"
                                        placeholder="$50,000"
                                        value={newSponsor.contribution}
                                        onChange={(e) => setNewSponsor({ ...newSponsor, contribution: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={handleAddSponsor}>Save Sponsor</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-border/50">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-medium">Total Funding</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-primary">$1.75M</div>
                            <p className="text-xs text-muted-foreground mt-1">+12% from last quarter</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 border-border/50">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-medium">Active Partners</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{sponsors.length}</div>
                            <p className="text-xs text-muted-foreground mt-1">Total active entries</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 border-border/50">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-medium">Pending Renewals</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-orange-500">
                                {sponsors.filter(s => s.status === 'Pending Renewal').length}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Sponsor Directory</CardTitle>
                        <CardDescription>A detailed list of all organizations supporting the accelerator.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-border/50">
                                    <TableHead>Organization</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Tier</TableHead>
                                    <TableHead>Contribution</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sponsors.map((sponsor) => (
                                    <TableRow key={sponsor.id} className="hover:bg-accent/50 border-border/50 transition-colors">
                                        <TableCell className="font-medium flex items-center gap-2">
                                            <div className="bg-primary/10 p-2 rounded-lg">
                                                <Building2 className="h-4 w-4 text-primary" />
                                            </div>
                                            {sponsor.name}
                                        </TableCell>
                                        <TableCell>{sponsor.type}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={`
                        ${sponsor.tier === 'Platinum' ? 'border-indigo-300 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' : ''}
                        ${sponsor.tier === 'Gold' ? 'border-yellow-300 bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300' : ''}
                        ${sponsor.tier === 'Silver' ? 'border-slate-300 bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-300' : ''}
                        ${sponsor.tier === 'Bronze' ? 'border-orange-300 bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300' : ''}
                    `}>
                                                {sponsor.tier}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{sponsor.contribution}</TableCell>
                                        <TableCell>
                                            <Badge
                                                className={
                                                    sponsor.status === "Active" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25 border-emerald-200/20" :
                                                        "bg-orange-500/15 text-orange-600 dark:text-orange-400 hover:bg-orange-500/25 border-orange-200/20"
                                                }
                                                variant="secondary"
                                            >
                                                {sponsor.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => openEditModal(sponsor)}>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteSponsor(sponsor.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Edit Modal (Dialog) */}
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Sponsor</DialogTitle>
                            <DialogDescription>
                                Update the details of the sponsor.
                            </DialogDescription>
                        </DialogHeader>
                        {currentSponsor && (
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-name" className="text-right">Name</Label>
                                    <Input
                                        id="edit-name"
                                        value={currentSponsor.name}
                                        onChange={(e) => setCurrentSponsor({ ...currentSponsor, name: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-type" className="text-right">Type</Label>
                                    <div className="col-span-3">
                                        <Select
                                            value={currentSponsor.type}
                                            onValueChange={(val) => setCurrentSponsor({ ...currentSponsor, type: val })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Venture Capital">Venture Capital</SelectItem>
                                                <SelectItem value="Corporate">Corporate</SelectItem>
                                                <SelectItem value="Non-Profit">Non-Profit</SelectItem>
                                                <SelectItem value="Technology Partner">Technology Partner</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-tier" className="text-right">Tier</Label>
                                    <div className="col-span-3">
                                        <Select
                                            value={currentSponsor.tier}
                                            onValueChange={(val) => setCurrentSponsor({ ...currentSponsor, tier: val })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select tier" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Platinum">Platinum</SelectItem>
                                                <SelectItem value="Gold">Gold</SelectItem>
                                                <SelectItem value="Silver">Silver</SelectItem>
                                                <SelectItem value="Bronze">Bronze</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-contribution" className="text-right">Contribution</Label>
                                    <Input
                                        id="edit-contribution"
                                        value={currentSponsor.contribution}
                                        onChange={(e) => setCurrentSponsor({ ...currentSponsor, contribution: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button type="submit" onClick={handleEditSponsor}>Update Sponsor</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </DashboardLayout>
    )
}
