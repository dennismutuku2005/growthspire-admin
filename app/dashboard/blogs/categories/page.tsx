"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Tag, Search, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BlogCategoriesPage() {
    const categories = [
        { id: 1, name: "Fundraising", count: 12 },
        { id: 2, name: "Leadership", count: 8 },
        { id: 3, name: "Product Management", count: 15 },
        { id: 4, name: "Marketing", count: 6 },
    ]

    return (
        <DashboardLayout>
            <div className="space-y-4 animate-in fade-in duration-500">
                {/* 2D Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight text-foreground flex items-center gap-2">
                            <Tag size={20} className="text-primary" />
                            Content Taxonomy
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Manage blog categories, tags and content themes
                        </p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {/* Category List Table */}
                    <div className="md:col-span-2 space-y-2">
                        <div className="flex flex-col md:flex-row gap-2 bg-card border border-border p-4 rounded-xl shadow-sm">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Filter categories..."
                                    className="pl-9 h-10 rounded-lg border-border bg-background focus:ring-primary focus:border-primary text-sm"
                                />
                            </div>
                        </div>

                        <div className="border border-border bg-card overflow-hidden shadow-sm rounded-xl">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-muted/30 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        <th className="py-3 px-4">Category Name</th>
                                        <th className="py-3 px-4 text-right">Post Count</th>
                                        <th className="py-3 px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((cat) => (
                                        <tr key={cat.id} className="group border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                                            <td className="py-3 px-4">
                                                <span className="text-sm font-semibold text-foreground group-hover:text-primary">
                                                    {cat.name}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-md border border-border">
                                                    {cat.count} Posts
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <Button variant="ghost" className="h-8 w-8 p-0 rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Trash2 size={16} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Add Category Sidebar */}
                    <div className="bg-card border border-border p-6 h-fit rounded-xl shadow-sm">
                        <h3 className="text-sm font-semibold text-foreground tracking-tight mb-4">Add Category</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground block">Name</label>
                                <Input placeholder="e.g. Scaling Tech" className="h-10 rounded-lg border-border text-sm focus-visible:ring-primary focus-visible:border-primary" />
                            </div>
                            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-lg text-sm font-medium">
                                <Plus className="mr-2 h-4 w-4" /> Save Category
                            </Button>
                        </div>
                    </div>
                </div>

                {/* 2D Footer Info */}
                <div className="flex items-center gap-2 p-3 bg-muted/30 border border-border text-xs font-semibold text-muted-foreground rounded-xl shadow-sm">
                    <Tag size={14} className="text-muted-foreground" />
                    Taxonomy synchronization complete
                </div>
            </div>
        </DashboardLayout>
    )
}
