"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash } from "lucide-react"
import Link from "next/link"

export default function FAQsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-primary">Frequently Asked Questions</h1>
                        <p className="text-muted-foreground mt-1">Manage the help center content.</p>
                    </div>
                    <Link href="/dashboard/faqs/add">
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                            <Plus className="mr-2 h-4 w-4" /> Add New FAQ
                        </Button>
                    </Link>
                </div>

                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Current FAQs</CardTitle>
                        <CardDescription>Questions currently visible to users.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>How do I apply for the accelerator?</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    Applications are open quarterly. You can apply through the dashboard by clicking "New Application" under the Startups tab.
                                    <div className="flex justify-end gap-2 mt-4">
                                        <Button size="sm" variant="outline"><Edit className="h-3 w-3 mr-1" /> Edit</Button>
                                        <Button size="sm" variant="ghost" className="text-destructive"><Trash className="h-3 w-3" /></Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>What criteria do you look for?</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    We look for scalable business models, strong founding teams, and initial market validation.
                                    <div className="flex justify-end gap-2 mt-4">
                                        <Button size="sm" variant="outline"><Edit className="h-3 w-3 mr-1" /> Edit</Button>
                                        <Button size="sm" variant="ghost" className="text-destructive"><Trash className="h-3 w-3" /></Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Is funding guaranteed?</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    Funding is not guaranteed but is available for top-performing startups at the end of the program during Demo Day.
                                    <div className="flex justify-end gap-2 mt-4">
                                        <Button size="sm" variant="outline"><Edit className="h-3 w-3 mr-1" /> Edit</Button>
                                        <Button size="sm" variant="ghost" className="text-destructive"><Trash className="h-3 w-3" /></Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
