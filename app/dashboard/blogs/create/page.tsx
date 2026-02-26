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
                {/* 2D Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-gray-900 uppercase flex items-center gap-2">
                            <PenTool size={18} className="text-black" />
                            Compose New Post
                        </h1>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                            DRAFT AND PUBLISH THOUGHT LEADERSHIP CONTENT FOR THE COMMUNITY
                        </p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {/* Editor Section */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="bg-white border border-gray-200 p-6 space-y-4 border-t-2 border-t-black">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-[11px] font-bold uppercase text-gray-400 tracking-widest">Entry Title</Label>
                                <Input id="title" placeholder="ENTER POST TITLE..." className="h-10 rounded-none border-gray-200 text-[14px] font-bold focus-visible:ring-0 focus-visible:border-gray-400 uppercase" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="excerpt" className="text-[11px] font-bold uppercase text-gray-400 tracking-widest">Summary/Excerpt</Label>
                                <Textarea id="excerpt" placeholder="BRIEF SUMMARY FOR CARD PREVIEWS..." className="rounded-none border-gray-200 text-[12px] min-h-[80px] focus-visible:ring-0 font-bold uppercase" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content" className="text-[11px] font-bold uppercase text-gray-400 tracking-widest">Post Content (Markdown Supported)</Label>
                                <Textarea id="content" placeholder="WRITE YOUR MASTERPIECE HERE..." className="rounded-none border-gray-200 text-[13px] min-h-[400px] focus-visible:ring-0 font-bold leading-relaxed uppercase" />
                            </div>
                        </div>

                        {/* 2D Action Bar */}
                        <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Autosave: 4:12 PM</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Words: 0</span>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="h-8 rounded-none border-gray-200 bg-white text-[11px] font-bold uppercase tracking-wide">
                                    Discard Draft
                                </Button>
                                <Button size="sm" className="bg-gray-900 text-white hover:bg-black rounded-none h-8 text-[11px] font-bold uppercase tracking-wide px-6">
                                    <Save className="mr-2 h-4 w-4" /> Save Work
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Settings Sidebar */}
                    <div className="space-y-4">
                        <div className="bg-white border border-gray-200 p-4 border-t-2 border-t-gray-900">
                            <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Layout size={14} className="text-gray-400" />
                                Publishing Options
                            </h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold text-gray-500 uppercase">Category</Label>
                                    <Select>
                                        <SelectTrigger className="h-8 rounded-none border-gray-200 text-[11px] uppercase font-bold">
                                            <SelectValue placeholder="SET CATEGORY" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-none border-gray-200">
                                            <SelectItem value="fundraising" className="text-[11px] uppercase font-bold">Fundraising</SelectItem>
                                            <SelectItem value="leadership" className="text-[11px] uppercase font-bold">Leadership</SelectItem>
                                            <SelectItem value="product" className="text-[11px] uppercase font-bold">Product Mgmt</SelectItem>
                                            <SelectItem value="marketing" className="text-[11px] uppercase font-bold">Marketing</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold text-gray-500 uppercase">Visibility</Label>
                                    <Select defaultValue="public">
                                        <SelectTrigger className="h-8 rounded-none border-gray-200 text-[11px] uppercase font-bold">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-none border-gray-200">
                                            <SelectItem value="public" className="text-[11px] uppercase font-bold">Public (Globe)</SelectItem>
                                            <SelectItem value="private" className="text-[11px] uppercase font-bold">Private (Internal)</SelectItem>
                                            <SelectItem value="cohort" className="text-[11px] uppercase font-bold">Cohort Only</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 p-4 border-t-2 border-t-black">
                            <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Globe size={14} className="text-black" />
                                Public Deployment
                            </h3>
                            <p className="text-[10px] text-gray-500 font-bold mb-4 uppercase">
                                Once published, this entry will be visible on the main GrowthSpire feed.
                            </p>
                            <Button className="w-full bg-black text-white hover:bg-black/90 rounded-none h-9 text-[11px] font-bold uppercase tracking-[0.2em]">
                                <Send className="mr-2 h-3.5 w-3.5" /> Publish Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
