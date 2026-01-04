"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from "lucide-react"

export default function BlogCategoriesPage() {
    const categories = [
        { id: 1, name: "Fundraising", count: 12 },
        { id: 2, name: "Leadership", count: 8 },
        { id: 3, name: "Product Management", count: 15 },
        { id: 4, name: "Marketing", count: 6 },
    ]

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Blog Categories</h1>
                    <p className="text-muted-foreground mt-1">Organize your content topics.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="md:col-span-2 border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Existing Categories</CardTitle>
                            <CardDescription>Manage your blog categories.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent border-border/50">
                                        <TableHead>Name</TableHead>
                                        <TableHead className="text-right">Post Count</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {categories.map((cat) => (
                                        <TableRow key={cat.id} className="hover:bg-accent/50 border-border/50 transition-colors">
                                            <TableCell className="font-medium">{cat.name}</TableCell>
                                            <TableCell className="text-right">{cat.count}</TableCell>
                                            <TableCell className="text-right">
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:bg-destructive/10">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card className="border-border/50 shadow-sm bg-card/50 backdrop-blur-sm h-fit">
                        <CardHeader>
                            <CardTitle>Add Category</CardTitle>
                            <CardDescription>Create a new topic.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Input placeholder="Category Name" />
                            <Button className="w-full">
                                <Plus className="mr-2 h-4 w-4" /> Add
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
