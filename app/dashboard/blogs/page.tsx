"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PenTool, CheckCircle, Clock } from "lucide-react"

export default function BlogsPage() {
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
            author: "Unknown",
            date: "Last edited 2h ago",
            category: "Legal",
            status: "Draft",
            views: "-",
        },
    ]

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-primary">Blogs & Resources</h1>
                        <p className="text-muted-foreground mt-1">Manage content for the community.</p>
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <PenTool className="mr-2 h-4 w-4" /> Write New Post
                    </Button>
                </div>

                <Card className="border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>All Posts</CardTitle>
                        <CardDescription>Manage your blog posts and articles.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-border/50">
                                    <TableHead>Title</TableHead>
                                    <TableHead>Author</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Views</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {blogs.map((blog) => (
                                    <TableRow key={blog.id} className="hover:bg-accent/50 border-border/50 transition-colors">
                                        <TableCell className="font-medium">{blog.title}</TableCell>
                                        <TableCell>{blog.author}</TableCell>
                                        <TableCell>{blog.category}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={
                                                blog.status === 'Published' ? "bg-green-500/10 text-green-600 border-green-200" : "bg-gray-500/10 text-gray-600 border-gray-200"
                                            }>
                                                {blog.status === 'Published' ? <CheckCircle className="mr-1 h-3 w-3" /> : <Clock className="mr-1 h-3 w-3" />}
                                                {blog.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">{blog.views}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
