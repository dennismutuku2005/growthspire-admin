"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { PenTool, CheckCircle, Clock, Search, Filter, Eye, ChevronRight, FileText, Edit2, Trash2, Plus, Loader2, Image as ImageIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Modal } from "@/components/Modal"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedBlog, setSelectedBlog] = useState<any>(null)
    const [searchQuery, setSearchQuery] = useState("")

    // Form inputs state
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        author_name: "",
        image_url: "",
        excerpt: "",
        content: "",
        read_time: "5 min read",
        featured: 0
    })

    useEffect(() => {
        fetchBlogs()
    }, [])

    const fetchBlogs = async () => {
        setLoading(true)
        try {
            const res = await fetch("http://localhost/growthspire/backend/blogs.php?action=get_blogs")
            const data = await res.json()
            if (data.success) {
                setBlogs(data.data)
            }
        } catch (err) {
            toast.error("Failed to fetch blogs")
        } finally {
            setLoading(false)
        }
    }

    const handleCreateBlog = async () => {
        try {
            const res = await fetch("http://localhost/growthspire/backend/blogs.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "create_blog", ...formData })
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Blog created successfully")
                setIsAddOpen(false)
                fetchBlogs()
                resetForm()
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            toast.error("An error occurred")
        }
    }

    const handleUpdateBlog = async () => {
        try {
            const res = await fetch("http://localhost/growthspire/backend/blogs.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "update_blog", id: selectedBlog.id, ...formData })
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Blog updated successfully")
                setIsEditOpen(false)
                fetchBlogs()
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            toast.error("An error occurred")
        }
    }

    const handleDeleteBlog = async () => {
        try {
            const res = await fetch("http://localhost/growthspire/backend/blogs.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "delete_blog", id: selectedBlog.id })
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Blog deleted")
                setIsDeleteOpen(false)
                fetchBlogs()
            }
        } catch (err) {
            toast.error("Failed to delete")
        }
    }

    const openEdit = (blog: any) => {
        setSelectedBlog(blog)
        setFormData({
            title: blog.title,
            category: blog.category,
            author_name: blog.author_name,
            image_url: blog.image_url || "",
            excerpt: blog.excerpt || "",
            content: blog.content || "",
            read_time: blog.read_time || "5 min read",
            featured: blog.featured || 0
        })
        setIsEditOpen(true)
    }

    const resetForm = () => {
        setFormData({
            title: "",
            category: "",
            author_name: "",
            image_url: "",
            excerpt: "",
            content: "",
            read_time: "5 min read",
            featured: 0
        })
    }

    const filteredBlogs = blogs.filter(b => 
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        b.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <DashboardLayout>
            <div className="space-y-8 animate-in fade-in duration-500 pb-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight text-foreground flex items-center gap-3">
                            <PenTool size={20} className="text-primary" />
                            Content Management
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Create and manage articles for the GrowthSpire ecosystem
                        </p>
                    </div>
                    <Button
                        onClick={() => { resetForm(); setIsAddOpen(true); }}
                        className="admin-button-primary"
                    >
                        <Plus size={16} /> <span>Write New</span>
                    </Button>
                </div>

                {/* Filter Bar */}
                <div className="flex gap-2 bg-card border border-border p-4 rounded-xl shadow-sm">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by title or tags..."
                            className="w-full bg-background h-10 pl-9 pr-4 text-sm rounded-lg focus-visible:ring-primary focus-visible:border-primary border border-border"
                        />
                    </div>
                </div>

                {/* Table Layout */}
                <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden mt-6">
                    {loading ? (
                        <div className="space-y-4 p-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex justify-between items-center gap-6">
                                    <div className="flex items-center gap-3 flex-1">
                                        <Skeleton className="h-10 w-16" />
                                        <Skeleton className="h-4 w-48" />
                                    </div>
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-8 w-16" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-muted/30 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    <th className="py-3 px-6">Article</th>
                                    <th className="py-3 px-6">Details</th>
                                    <th className="py-3 px-6">Status</th>
                                    <th className="py-3 px-6">Date</th>
                                    <th className="py-3 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredBlogs.length > 0 ? filteredBlogs.map((blog) => (
                                    <tr key={blog.id} className="group hover:bg-muted/20 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-16 bg-muted border border-border flex items-center justify-center shrink-0 overflow-hidden rounded-md">
                                                    {blog.image_url ? (
                                                        <img src={blog.image_url} alt="" className="w-full h-full object-cover transition-all" />
                                                    ) : (
                                                        <ImageIcon size={18} className="text-muted-foreground/40" />
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="text-sm font-semibold text-foreground block leading-tight">
                                                        {blog.title}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        By {blog.author_name}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-sm text-foreground">
                                                {blog.category}
                                            </span>
                                            <p className="text-xs text-muted-foreground mt-0.5">{blog.read_time}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={cn(
                                                "text-[10px] font-bold px-2 py-0.5 uppercase tracking-tighter border flex items-center gap-1 w-fit",
                                                blog.image_url ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-muted text-muted-foreground border-border"
                                            )}>
                                                {blog.image_url ? <CheckCircle size={14} /> : <Clock size={14} />}
                                                {blog.image_url ? "Published" : "Draft"}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-muted-foreground whitespace-nowrap">
                                            {new Date(blog.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost" size="sm"
                                                    onClick={() => openEdit(blog)}
                                                    className="h-8 w-8 p-0 rounded-full hover:bg-muted text-muted-foreground"
                                                >
                                                    <Edit2 size={16} />
                                                </Button>
                                                <Button
                                                    variant="ghost" size="sm"
                                                    onClick={() => { setSelectedBlog(blog); setIsDeleteOpen(true); }}
                                                    className="h-8 w-8 p-0 rounded-full hover:bg-destructive/10 hover:text-destructive text-muted-foreground"
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan={5} className="py-20 text-center text-sm text-muted-foreground">No matching articles found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Form Modals */}
                <Modal
                    isOpen={isAddOpen || isEditOpen}
                    onClose={() => { setIsAddOpen(false); setIsEditOpen(false); }}
                    title={isEditOpen ? "Update Article" : "Write Article"}
                    description={isEditOpen ? `Editing metadata and content for "${formData.title}"` : "Draft a new educational piece for the startup community"}
                    confirmText={isEditOpen ? "Save Changes" : "Publish Now"}
                    onConfirm={isEditOpen ? handleUpdateBlog : handleCreateBlog}
                    maxWidth="max-w-2xl"
                >
                    <div className="space-y-6 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Article Title</Label>
                                <Input 
                                    placeholder="e.g. The Future of Fintech" 
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    className="rounded-lg border-border"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Category</Label>
                                <select 
                                    className="w-full h-10 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    value={formData.category}
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                >
                                    <option value="">Select Category</option>
                                    <option value="Fundraising">Fundraising</option>
                                    <option value="Product">Product</option>
                                    <option value="Growth">Growth</option>
                                    <option value="Team">Team</option>
                                    <option value="Strategy">Strategy</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Author Name</Label>
                                <Input 
                                    placeholder="e.g. Jane Doe" 
                                    value={formData.author_name}
                                    onChange={(e) => setFormData({...formData, author_name: e.target.value})}
                                    className="rounded-lg border-border"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Image URL</Label>
                                <Input 
                                    placeholder="https://image.url/post.jpg" 
                                    value={formData.image_url}
                                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                                    className="rounded-lg border-border"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Excerpt / Short Description</Label>
                            <textarea 
                                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent h-20 resize-y" 
                                placeholder="Brief summary for the preview..." 
                                value={formData.excerpt}
                                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Full Article Content (Markdown/Text)</Label>
                            <textarea 
                                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent h-40 resize-y" 
                                placeholder="Write your masterpiece here..." 
                                value={formData.content}
                                onChange={(e) => setFormData({...formData, content: e.target.value})}
                            />
                        </div>
                    </div>
                </Modal>

                <Modal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    title="Remove Article"
                    description={`Are you absolutely sure you want to delete "${selectedBlog?.title}"? This is irreversible.`}
                    type="danger"
                    confirmText="Delete Irreversibly"
                    onConfirm={handleDeleteBlog}
                />
            </div>
        </DashboardLayout>
    )
}
