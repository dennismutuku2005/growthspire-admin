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
import { motion } from "framer-motion"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
}

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
            const res = await fetch("https://api.growthspire.org/blogs.php?action=get_blogs")
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
            const res = await fetch("https://api.growthspire.org/blogs.php", {
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
            const res = await fetch("https://api.growthspire.org/blogs.php", {
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
            const res = await fetch("https://api.growthspire.org/blogs.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "delete_blog", id: selectedBlog.id })
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Blog deleted successfully")
                setIsDeleteOpen(false)
                fetchBlogs()
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            toast.error("An error occurred")
        }
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

    const openEdit = (blog: any) => {
        setSelectedBlog(blog)
        setFormData({
            title: blog.title,
            category: blog.category,
            author_name: blog.author_name,
            image_url: blog.image_url,
            excerpt: blog.excerpt,
            content: blog.content,
            read_time: blog.read_time,
            featured: blog.featured
        })
        setIsEditOpen(true)
    }

    const filteredBlogs = blogs.filter(b => 
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author_name?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <DashboardLayout>
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-8 pb-10"
            >
                {/* Header Content Overview */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6 font-sans">
                    <div>
                        <h1 className="text-xl font-semibold text-foreground flex items-center gap-3">
                            <PenTool size={20} className="text-primary" />
                            Content Matrix
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1 font-medium opacity-70">
                            Coordinate ecosystem updates and thought leadership
                        </p>
                    </div>
                    <Button 
                        onClick={() => { resetForm(); setIsAddOpen(true); }}
                        className="admin-button-primary h-10 px-6"
                    >
                        <Plus size={16} />
                        <span>Create Post</span>
                    </Button>
                </motion.div>

                {/* Filters Search Matrix */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-50" />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="OPERATIONAL SEARCH..."
                            className="w-full bg-card h-12 pl-10 pr-4 text-[11px] font-bold uppercase tracking-widest outline-none focus:border-primary border border-border/50 rounded-lg"
                        />
                    </div>
                </motion.div>

                {/* Narrative Table Repository */}
                <motion.div variants={itemVariants} className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Strategic Narrative (Post)</th>
                                <th>Authorship</th>
                                <th>Metrics (Read Time)</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array.from({ length: 4 }).map((_, i) => (
                                    <tr key={i}><td colSpan={5} className="p-0"><Skeleton className="h-16 w-full" /></td></tr>
                                ))
                            ) : filteredBlogs.length > 0 ? (
                                filteredBlogs.map((blog) => (
                                    <tr key={blog.id} className="group transition-all">
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center border border-border shrink-0 overflow-hidden">
                                                    {blog.image_url ? (
                                                        <img src={blog.image_url} alt="" className="h-full w-full object-cover" />
                                                    ) : <FileText size={18} className="text-muted-foreground opacity-30" />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-bold text-sm text-foreground group-hover:text-primary transition-colors truncate">{blog.title}</div>
                                                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{blog.category}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-xs font-semibold uppercase tracking-wider text-muted-foreground opacity-80">{blog.author_name}</td>
                                        <td className="text-[11px] tabular-nums font-medium text-muted-foreground">{blog.read_time}</td>
                                        <td>
                                            {blog.featured ? <span className="text-[9px] font-bold px-2 py-0.5 bg-amber-500/10 text-amber-600 border border-amber-500/20 rounded-full">FEATURED</span> : <span className="text-[9px] font-bold px-2 py-0.5 bg-muted text-muted-foreground border border-border rounded-full">STANDARD</span>}
                                        </td>
                                        <td className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="h-8 w-8 p-0 text-muted-foreground hover:text-primary hover:bg-primary/5"
                                                    onClick={() => openEdit(blog)}
                                                >
                                                    <Edit2 size={14} />
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                                                    onClick={() => { setSelectedBlog(blog); setIsDeleteOpen(true); }}
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-24 text-muted-foreground italic text-sm italic">No blog repository entries found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </motion.div>

                {/* Narrative Form Component */}
                <Modal
                    isOpen={isAddOpen || isEditOpen}
                    onClose={() => { setIsAddOpen(false); setIsEditOpen(false); }}
                    title={isEditOpen ? "Refine Post" : "Draft New Narrative"}
                    description={isEditOpen ? "Modify existing ecosystem thought leadership" : "Initialize a new post for the platform"}
                    footer={
                        <div className="flex gap-3 w-full">
                            <Button variant="outline" className="flex-1 font-bold text-[10px] uppercase tracking-widest h-10" onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }}>Cancel</Button>
                            <Button className="flex-1 admin-button-primary h-10" onClick={isEditOpen ? handleUpdateBlog : handleCreateBlog}>
                                {isEditOpen ? "Update Publication" : "Publish Entry"}
                            </Button>
                        </div>
                    }
                >
                    <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar p-1">
                        <div className="col-span-2 space-y-1.5">
                            <label className="admin-label">Post Title</label>
                            <input className="admin-input" placeholder="e.g. Scaling Startup Operations in 2026" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="admin-label">Core Category</label>
                            <input className="admin-input" placeholder="e.g. Insights" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="admin-label">Asset (Cover URL)</label>
                            <input className="admin-input tabular-nums" placeholder="https://cdn..." value={formData.image_url} onChange={e => setFormData({ ...formData, image_url: e.target.value })} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="admin-label">Author Identity</label>
                            <input className="admin-input" placeholder="e.g. GS Editorial" value={formData.author_name} onChange={e => setFormData({ ...formData, author_name: e.target.value })} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="admin-label">Consumption Time</label>
                            <input className="admin-input" placeholder="e.g. 5 min read" value={formData.read_time} onChange={e => setFormData({ ...formData, read_time: e.target.value })} />
                        </div>
                        <div className="col-span-2 space-y-1.5">
                            <label className="admin-label">Strategic Overview (Excerpt)</label>
                            <textarea className="admin-input h-20 resize-none py-3" placeholder="Brief summary for indexing..." value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} />
                        </div>
                        <div className="col-span-2 space-y-1.5">
                            <label className="admin-label">Primary Narrative (Content)</label>
                            <textarea className="admin-input h-48 resize-none py-3" placeholder="Full post content in markdown/HTML..." value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} />
                        </div>
                        <div className="col-span-2 flex items-center gap-3 p-4 bg-muted/30 border border-border rounded-lg">
                            <input type="checkbox" id="is_featured_blog" checked={formData.featured === 1} onChange={e => setFormData({...formData, featured: e.target.checked ? 1 : 0})} />
                            <label htmlFor="is_featured_blog" className="text-xs font-bold uppercase tracking-wider cursor-pointer">Feature on platform overview</label>
                        </div>
                    </div>
                </Modal>

                {/* Delete Confirmation */}
                <Modal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    title="DELETE NARRATIVE"
                    description={`Permanently remove "${selectedBlog?.title}"? This cannot be undone.`}
                    type="danger"
                    confirmText="Delete Record"
                    onConfirm={handleDeleteBlog}
                />
            </motion.div>
        </DashboardLayout>
    )
}
