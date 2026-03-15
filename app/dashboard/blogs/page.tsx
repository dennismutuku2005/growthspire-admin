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

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedBlog, setSelectedBlog] = useState(null)
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

    const openEdit = (blog) => {
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
                        <h1 className="text-[18px] font-bold tracking-widest text-foreground uppercase flex items-center gap-3">
                            <PenTool size={20} className="text-primary" />
                            Content Management
                        </h1>
                        <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest mt-1 opacity-60">
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
                <div className="flex gap-2 bg-muted/30 border border-border p-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="SEARCH BY TITLE OR TAGS..."
                            className="w-full bg-white h-10 pl-10 pr-4 text-[11px] font-bold tracking-widest uppercase outline-none focus:border-foreground border border-border/50"
                        />
                    </div>
                </div>

                {/* Table Layout */}
                <div className="admin-table-container">
                    {loading ? (
                        <div className="p-20 flex justify-center"><Loader2 className="animate-spin h-6 w-6 text-muted-foreground" /></div>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Article</th>
                                    <th>Details</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBlogs.length > 0 ? filteredBlogs.map((blog) => (
                                    <tr key={blog.id} className="group">
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-16 bg-muted border border-border flex items-center justify-center shrink-0 overflow-hidden">
                                                    {blog.image_url ? (
                                                        <img src={blog.image_url} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                                    ) : (
                                                        <ImageIcon size={18} className="text-muted-foreground/40" />
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="text-[13px] font-bold text-foreground block uppercase leading-tight">
                                                        {blog.title}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60 tracking-tighter">
                                                        By {blog.author_name}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-[11px] font-bold text-muted-foreground hover:text-primary cursor-default uppercase">
                                                {blog.category}
                                            </span>
                                            <p className="text-[10px] text-muted-foreground/60">{blog.read_time}</p>
                                        </td>
                                        <td>
                                            <span className={cn(
                                                "text-[9px] font-black uppercase px-2 py-0.5 border flex items-center gap-1 w-fit tracking-tighter",
                                                blog.image_url ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-muted text-muted-foreground border-border"
                                            )}>
                                                {blog.image_url ? <CheckCircle size={10} /> : <Clock size={10} />}
                                                {blog.image_url ? "LIVE" : "DRAFT"}
                                            </span>
                                        </td>
                                        <td className="text-[11px] font-bold text-muted-foreground whitespace-nowrap">
                                            {new Date(blog.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="text-right">
                                            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => openEdit(blog)}
                                                    className="h-8 w-8 flex items-center justify-center border border-border hover:border-foreground transition-all"
                                                >
                                                    <Edit2 size={14} />
                                                </button>
                                                <button
                                                    onClick={() => { setSelectedBlog(blog); setIsDeleteOpen(true); }}
                                                    className="h-8 w-8 flex items-center justify-center border border-border hover:border-destructive hover:text-destructive transition-all"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="5" className="text-center py-20 text-muted-foreground font-bold uppercase text-[11px]">No matching articles found</td></tr>
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
                    description={isEditOpen ? `EDITING METADATA AND CONTENT FOR "${formData.title}"` : "DRAFT A NEW EDUCATIONAL PIECE FOR THE STARTUP COMMUNITY"}
                    confirmText={isEditOpen ? "Save Changes" : "Publish Now"}
                    onConfirm={isEditOpen ? handleUpdateBlog : handleCreateBlog}
                    maxWidth="max-w-2xl"
                >
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="admin-label">Article Title</label>
                                <input 
                                    className="admin-input" 
                                    placeholder="THE FUTURE OF FINTECH..." 
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="admin-label">Category</label>
                                <select 
                                    className="admin-input"
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
                            <div className="space-y-1">
                                <label className="admin-label">Author Name</label>
                                <input 
                                    className="admin-input" 
                                    placeholder="JANE DOE" 
                                    value={formData.author_name}
                                    onChange={(e) => setFormData({...formData, author_name: e.target.value})}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="admin-label">Image URL</label>
                                <input 
                                    className="admin-input" 
                                    placeholder="HTTPS://IMAGE.URL/POST.JPG" 
                                    value={formData.image_url}
                                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="admin-label">Excerpt / Short Description</label>
                            <textarea 
                                className="admin-input h-20" 
                                placeholder="BRIEF SUMMARY FOR THE FEED CLIP..." 
                                value={formData.excerpt}
                                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="admin-label">Full Article Content (Markdown/Text)</label>
                            <textarea 
                                className="admin-input h-40 font-mono" 
                                placeholder="WRITE YOUR MASTERPIECE HERE..." 
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
                    description={`ARE YOU ABSOLUTELY SURE YOU WANT TO DELETE "${selectedBlog?.title}"? THIS IS IRREVERSIBLE.`}
                    type="danger"
                    confirmText="Delete Irreversibly"
                    onConfirm={handleDeleteBlog}
                />
            </div>
        </DashboardLayout>
    )
}
