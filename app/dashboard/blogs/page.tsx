"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { PenTool, CheckCircle, Clock, Search, Filter, Eye, ChevronRight, FileText, Edit2, Trash2, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Modal } from "@/components/Modal"
import { Label } from "@/components/ui/label"

export default function BlogsPage() {
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedBlog, setSelectedBlog] = useState(null)

    const blogs = [
        {
            id: 1,
            title: "5 Tips for Pitching to VCs",
            author: "Sarah Jenkins",
            date: "2024-03-20",
            category: "Fundraising",
            status: "Published",
            views: "1.2k",
        },
        {
            id: 2,
            title: "Building a Resilient Team",
            author: "Mike Ross",
            date: "2024-03-15",
            category: "Leadership",
            status: "Published",
            views: "850",
        },
        {
            id: 3,
            title: "Understanding Term Sheets",
            author: "Admin",
            date: "Last edited 2h ago",
            category: "Legal",
            status: "Draft",
            views: "0",
        },
    ]

    const handleEdit = (blog) => {
        setSelectedBlog(blog)
        setIsEditOpen(true)
    }

    const handleDelete = (blog) => {
        setSelectedBlog(blog)
        setIsDeleteOpen(true)
    }

    return (
        <DashboardLayout>
            <div className="space-y-4 animate-in fade-in duration-500">
                {/* 2D Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-gray-900 uppercase flex items-center gap-2">
                            <PenTool size={18} className="text-black" />
                            Content Center
                        </h1>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                            MANAGE BLOG POSTS, RESOURCES AND COMMUNITY CONTENT
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsAddOpen(true)}
                        size="sm"
                        className="bg-black text-white hover:bg-black/90 rounded-none h-8 text-[11px] font-bold uppercase tracking-wide"
                    >
                        <Plus className="mr-1.5 h-3.5 w-3.5" /> Create New Post
                    </Button>
                </div>

                {/* 2D Filter Bar */}
                <div className="flex flex-col md:flex-row gap-2 bg-gray-50 border border-t-2 border-t-black p-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                        <Input
                            placeholder="Filter by title, author or category..."
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
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">POST TITLE</th>
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">AUTHOR</th>
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">CATEGORY</th>
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">STATUS</th>
                                <th className="py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">DATE</th>
                                <th className="py-2.5 px-3 text-right text-[10px] font-bold text-gray-400 uppercase">VIEWS</th>
                                <th className="py-2.5 px-3 text-right text-[10px] font-bold text-gray-400 uppercase">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog) => (
                                <tr key={blog.id} className="group border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                    <td className="py-2.5 px-3">
                                        <div className="flex items-center gap-2">
                                            <div className="text-gray-400">
                                                <FileText size={14} />
                                            </div>
                                            <span className="text-[13px] font-bold text-gray-900 group-hover:text-black uppercase">
                                                {blog.title}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-2.5 px-3 text-[12px] font-bold text-gray-600 uppercase">
                                        {blog.author}
                                    </td>
                                    <td className="py-2.5 px-3">
                                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">
                                            {blog.category}
                                        </span>
                                    </td>
                                    <td className="py-2.5 px-3">
                                        <span className={cn(
                                            "text-[10px] font-bold uppercase px-1.5 py-0.5 border flex items-center gap-1 w-fit",
                                            blog.status === 'Published' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                                        )}>
                                            {blog.status === 'Published' ? <CheckCircle size={10} /> : <Clock size={10} />}
                                            {blog.status}
                                        </span>
                                    </td>
                                    <td className="py-2.5 px-3 text-[11px] font-bold text-gray-400 uppercase">
                                        {blog.date}
                                    </td>
                                    <td className="py-2.5 px-3 text-right">
                                        <div className="flex items-center justify-end gap-1.5 text-[11px] font-bold text-gray-700 uppercase">
                                            <Eye size={12} className="text-gray-300" />
                                            {blog.views}
                                        </div>
                                    </td>
                                    <td className="py-2.5 px-3 text-right">
                                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                onClick={() => handleEdit(blog)}
                                                variant="ghost" className="h-7 px-2 rounded-none text-gray-400 hover:text-black text-[10px] font-bold uppercase"
                                            >
                                                <Edit2 size={12} className="mr-1" /> Edit
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(blog)}
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

                {/* Add Blog Modal */}
                <Modal
                    isOpen={isAddOpen}
                    onClose={() => setIsAddOpen(false)}
                    title="Create New Post"
                    description="Draft a new blog post or resource article."
                    type="info"
                    confirmText="Create Draft"
                    onConfirm={() => setIsAddOpen(false)}
                >
                    <div className="space-y-4 pt-2">
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold uppercase text-gray-400">Post Title</Label>
                            <Input className="rounded-none border-gray-200 h-9 text-[12px] font-bold uppercase" placeholder="E.G. MARKET TRENDS 2024" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label className="text-[10px] font-bold uppercase text-gray-400">Category</Label>
                                <Input className="rounded-none border-gray-200 h-9 text-[12px] font-bold uppercase" placeholder="E.G. FUNDRAISING" />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-[10px] font-bold uppercase text-gray-400">Author</Label>
                                <Input className="rounded-none border-gray-200 h-9 text-[12px] font-bold uppercase" placeholder="AUTHOR NAME" />
                            </div>
                        </div>
                    </div>
                </Modal>

                {/* Edit Blog Modal */}
                <Modal
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    title="Edit Post Details"
                    description={`Updating metadata for ${selectedBlog?.title}`}
                    type="info"
                    confirmText="Save Changes"
                    onConfirm={() => setIsEditOpen(false)}
                >
                    <div className="space-y-4 pt-2">
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold uppercase text-gray-400">Title</Label>
                            <Input
                                defaultValue={selectedBlog?.title}
                                className="rounded-none border-gray-200 h-9 text-[12px] font-bold uppercase"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold uppercase text-gray-400">Status</Label>
                            <select className="w-full h-9 border border-gray-200 text-[12px] px-2 font-bold uppercase outline-none focus:border-black">
                                <option>Draft</option>
                                <option>Published</option>
                                <option>Archived</option>
                            </select>
                        </div>
                    </div>
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    title="Confirm Deletion"
                    description={`Are you sure you want to delete ${selectedBlog?.title}? This action cannot be undone.`}
                    type="danger"
                    confirmText="Delete Post"
                    onConfirm={() => setIsDeleteOpen(false)}
                />

                {/* 2D Categories Callout */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {['Fundraising', 'Leadership', 'Legal', 'Marketing'].map((cat) => (
                        <div key={cat} className="p-2 border border-gray-100 bg-white hover:border-black transition-colors cursor-pointer flex items-center justify-between group">
                            <span className="text-[11px] font-bold text-gray-500 uppercase group-hover:text-black">{cat}</span>
                            <ChevronRight size={12} className="text-gray-200 group-hover:text-black" />
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}
