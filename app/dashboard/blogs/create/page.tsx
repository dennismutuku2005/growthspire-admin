"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, PenTool, Layout, FileText, Globe, Send } from "lucide-react"

export default function CreateBlogPage() {
    return (
        <DashboardLayout>
            <div className="space-y-4 animate-in fade-in duration-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight text-foreground flex items-center gap-2">
                            <PenTool size={20} className="text-primary" />
                            Compose New Post
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Draft and publish thought leadership content for the community
                        </p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {/* Editor Section */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="bg-card border border-border p-6 rounded-xl shadow-sm space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-sm font-medium text-muted-foreground">Entry Title</Label>
                                <Input id="title" placeholder="Enter post title..." className="h-10 rounded-lg border-border bg-background focus-visible:ring-primary focus-visible:border-primary text-sm" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="excerpt" className="text-sm font-medium text-muted-foreground">Summary/Excerpt</Label>
                                <Textarea id="excerpt" placeholder="Brief summary for card previews..." className="rounded-lg border-border bg-background text-sm min-h-[80px] focus-visible:ring-primary focus-visible:border-primary resize-y" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content" className="text-sm font-medium text-muted-foreground">Post Content (Markdown Supported)</Label>
                                <Textarea id="content" placeholder="Write your masterpiece here..." className="rounded-lg border-border bg-background text-sm min-h-[400px] focus-visible:ring-primary focus-visible:border-primary resize-y leading-relaxed" />
                            </div>
                        </div>

                        {/* Action Bar */}
                        <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl shadow-sm">
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-semibold text-muted-foreground">Autosave: 4:12 PM</span>
                                <span className="text-xs font-semibold text-muted-foreground">Words: 0</span>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="outline" size="sm" className="h-9 px-4 rounded-lg border-border bg-background text-sm font-medium">
                                    Discard Draft
                                </Button>
                                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground h-9 px-6 rounded-lg text-sm font-medium shadow-sm">
                                    <Save className="mr-2 h-4 w-4" /> Save Work
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Settings Sidebar */}
                    <div className="space-y-4">
                        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
                            <h3 className="text-sm font-semibold text-foreground tracking-tight mb-4 flex items-center gap-2">
                                <Layout size={18} className="text-muted-foreground" />
                                Publishing Options
                            </h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-muted-foreground">Category</Label>
                                    <Select>
                                        <SelectTrigger className="h-10 rounded-lg border-border text-sm bg-background">
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-lg border-border">
                                            <SelectItem value="fundraising" className="text-sm">Fundraising</SelectItem>
                                            <SelectItem value="leadership" className="text-sm">Leadership</SelectItem>
                                            <SelectItem value="product" className="text-sm">Product Mgmt</SelectItem>
                                            <SelectItem value="marketing" className="text-sm">Marketing</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-muted-foreground">Visibility</Label>
                                    <Select defaultValue="public">
                                        <SelectTrigger className="h-10 rounded-lg border-border text-sm bg-background">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-lg border-border">
                                            <SelectItem value="public" className="text-sm">Public (Globe)</SelectItem>
                                            <SelectItem value="private" className="text-sm">Private (Internal)</SelectItem>
                                            <SelectItem value="cohort" className="text-sm">Cohort Only</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
                            <h3 className="text-sm font-semibold text-foreground tracking-tight mb-4 flex items-center gap-2">
                                <Globe size={18} className="text-primary" />
                                Public Deployment
                            </h3>
                            <p className="text-xs text-muted-foreground font-medium mb-6">
                                Once published, this entry will be visible on the main GrowthSpire feed.
                            </p>
                            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-10 rounded-lg text-sm font-medium shadow-sm">
                                <Send className="mr-2 h-4 w-4" /> Publish Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
