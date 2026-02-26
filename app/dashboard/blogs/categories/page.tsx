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
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div>
                        <h1 className="text-lg font-semibold tracking-tight text-gray-900 uppercase flex items-center gap-2">
                            <Tag size={18} className="text-pace-purple" />
                            Content Taxonomy
                        </h1>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                            MANAGE BLOG CATEGORIES, TAGS AND CONTENT THEMES
                        </p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {/* Category List Table */}
                    <div className="md:col-span-2 space-y-2">
                        <div className="flex flex-col md:flex-row gap-2 bg-gray-50 border border-t-2 border-t-pace-purple p-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Filter categories..."
                                    className="pl-8 h-8 rounded-none border-gray-200 bg-white text-[12px] focus-visible:ring-0 focus-visible:border-gray-400"
                                />
                            </div>
                        </div>

                        <div className="border border-gray-200 bg-white overflow-hidden">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th>CATEGORY NAME</th>
                                        <th className="text-right">POST COUNT</th>
                                        <th className="text-right">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((cat) => (
                                        <tr key={cat.id} className="group border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                            <td className="py-2 px-3">
                                                <span className="text-[13px] font-bold text-gray-900 group-hover:text-pace-purple tracking-tight">
                                                    {cat.name}
                                                </span>
                                            </td>
                                            <td className="py-2 px-3 text-right">
                                                <span className="text-[11px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 border border-gray-100">
                                                    {cat.count} POSTS
                                                </span>
                                            </td>
                                            <td className="py-2 px-3 text-right">
                                                <Button variant="ghost" className="h-6 w-6 p-0 rounded-none text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Trash2 size={12} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Add Category Sidebar */}
                    <div className="bg-white border border-gray-200 p-4 h-fit border-t-2 border-t-gray-900">
                        <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-widest mb-4">Add Category</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tight block mb-1">Name</label>
                                <Input placeholder="e.g. Scaling Tech" className="h-8 rounded-none border-gray-200 text-[12px] focus-visible:ring-0" />
                            </div>
                            <Button className="w-full bg-pace-purple text-white hover:bg-pace-purple/90 rounded-none h-8 text-[11px] font-bold uppercase tracking-wide">
                                <Plus className="mr-1.5 h-3.5 w-3.5" /> Save Category
                            </Button>
                        </div>
                    </div>
                </div>

                {/* 2D Footer Info */}
                <div className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] italic">
                    <Tag size={12} />
                    Taxonomy synchronization complete
                </div>
            </div>
        </DashboardLayout>
    )
}
