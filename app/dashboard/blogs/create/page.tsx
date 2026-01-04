"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save } from "lucide-react"

export default function CreateBlogPage() {
    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Create New Blog Post</h1>
                    <p className="text-muted-foreground mt-1">Share insights with the community.</p>
                </div>

                <Card className="border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Post Details</CardTitle>
                        <CardDescription>Fill in the information below to create a new post.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" placeholder="Enter post title" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="fundraising">Fundraising</SelectItem>
                                        <SelectItem value="leadership">Leadership</SelectItem>
                                        <SelectItem value="product">Product Management</SelectItem>
                                        <SelectItem value="marketing">Marketing</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select defaultValue="draft">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="excerpt">Excerpt</Label>
                            <Textarea id="excerpt" placeholder="Brief summary of the post..." />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea id="content" placeholder="Write your post content here..." className="min-h-[300px]" />
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                                <Save className="mr-2 h-4 w-4" /> Save Post
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
