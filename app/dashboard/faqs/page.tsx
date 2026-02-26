"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash, HelpCircle, Search, Filter, Edit2, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Modal } from "@/components/Modal"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQsPage() {
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedFaq, setSelectedFaq] = useState(null)

    const faqs = [
        {
            id: 1,
            question: "How do I apply for the accelerator?",
            answer: "Applications are open quarterly. You can apply through the dashboard by clicking 'New Application' under the Startups tab."
        },
        {
            id: 2,
            question: "What criteria do you look for?",
            answer: "We look for scalable business models, strong founding teams, and initial market validation."
        },
        {
            id: 3,
            question: "Is funding guaranteed?",
            answer: "Funding is not guaranteed but is available for top-performing startups at the end of the program during Demo Day."
        }
    ]

    const handleEdit = (faq) => {
        setSelectedFaq(faq)
        setIsEditOpen(true)
    }

    const handleDelete = (faq) => {
        setSelectedFaq(faq)
        setIsDeleteOpen(true)
    }

    return (
        <DashboardLayout>
            <div className="space-y-4 animate-in fade-in duration-500">
                {/* 2D Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-gray-900 uppercase flex items-center gap-2">
                            <HelpCircle size={18} className="text-black" />
                            Help Center Repository
                        </h1>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                            MANAGE FREQUENTLY ASKED QUESTIONS AND KNOWLEDGE BASE ENTRIES
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsAddOpen(true)}
                        size="sm"
                        className="bg-black text-white hover:bg-black/90 rounded-none h-8 text-[11px] font-bold uppercase tracking-wide"
                    >
                        <Plus className="mr-1.5 h-3.5 w-3.5" /> Add New FAQ
                    </Button>
                </div>

                {/* 2D Filter Bar */}
                <div className="flex flex-col md:flex-row gap-2 bg-gray-50 border border-t-2 border-t-black p-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Filter help content by keyword..."
                            className="pl-8 h-8 rounded-none border-gray-200 bg-white text-[12px] focus-visible:ring-0 focus-visible:border-gray-400"
                        />
                    </div>
                    <Button variant="outline" className="h-8 rounded-none border-gray-200 bg-white text-[11px] font-bold uppercase tracking-wider px-4">
                        <Filter className="mr-1.5 h-3.5 w-3.5 text-gray-400" /> Filter
                    </Button>
                </div>

                {/* 2D Accordion Section */}
                <div className="bg-white border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live Content Entries</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{faqs.length} Items</span>
                    </div>
                    <div className="p-2">
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq) => (
                                <AccordionItem key={faq.id} value={`item-${faq.id}`} className="border-b border-gray-100 last:border-0">
                                    <AccordionTrigger className="hover:no-underline py-3 px-2">
                                        <span className="text-[13px] font-bold text-gray-900 uppercase text-left hover:text-black transition-colors">{faq.question}</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-2 pb-4">
                                        <p className="text-[12px] text-gray-600 font-bold uppercase leading-relaxed bg-gray-50 p-3 border border-gray-100 rounded-none">
                                            {faq.answer}
                                        </p>
                                        <div className="flex justify-start gap-2 mt-3">
                                            <Button
                                                onClick={() => handleEdit(faq)}
                                                variant="outline" className="h-7 rounded-none border-gray-200 text-[10px] font-bold uppercase tracking-wider px-3 hover:bg-gray-100"
                                            >
                                                <Edit2 className="h-3 w-3 mr-1.5 text-black" /> Edit Entry
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(faq)}
                                                variant="ghost" className="h-7 rounded-none text-red-600 hover:bg-red-50 text-[10px] font-bold uppercase tracking-wider px-3"
                                            >
                                                <Trash2 className="h-3 w-3 mr-1.5" /> Remove
                                            </Button>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>

                {/* Add FAQ Modal */}
                <Modal
                    isOpen={isAddOpen}
                    onClose={() => setIsAddOpen(false)}
                    title="Add New FAQ"
                    description="Create a new question and answer pair."
                    type="info"
                    confirmText="Save Entry"
                    onConfirm={() => setIsAddOpen(false)}
                >
                    <div className="space-y-4 pt-2">
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold uppercase text-gray-400">Question</Label>
                            <Input className="rounded-none border-gray-200 h-9 text-[12px] font-bold uppercase" placeholder="E.G. HOW DO I RESET MY PASSWORD?" />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold uppercase text-gray-400">Answer</Label>
                            <Textarea className="rounded-none border-gray-200 min-h-[100px] text-[12px] font-bold uppercase bg-gray-50/20" placeholder="TYPE THE ANSWER HERE..." />
                        </div>
                    </div>
                </Modal>

                {/* Edit FAQ Modal */}
                <Modal
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    title="Edit FAQ Entry"
                    description="Update the content for this help item."
                    type="info"
                    confirmText="Update Entry"
                    onConfirm={() => setIsEditOpen(false)}
                >
                    <div className="space-y-4 pt-2">
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold uppercase text-gray-400">Question</Label>
                            <Input
                                defaultValue={selectedFaq?.question}
                                className="rounded-none border-gray-200 h-9 text-[12px] font-bold uppercase"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold uppercase text-gray-400">Answer</Label>
                            <Textarea
                                defaultValue={selectedFaq?.answer}
                                className="rounded-none border-gray-200 min-h-[100px] text-[12px] font-bold uppercase bg-gray-50/20"
                            />
                        </div>
                    </div>
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    title="Remove Entry"
                    description="Are you sure you want to remove this FAQ? This will be immediately reflected in the help center."
                    type="danger"
                    confirmText="Delete FAQ"
                    onConfirm={() => setIsDeleteOpen(false)}
                />

                {/* 2D Footer Notification */}
                <div className="p-3 bg-gray-900 text-white flex items-center justify-between border-t-2 border-t-black">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Knowledge Center v.1.0 (Live)</p>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                        <span className="text-[10px] font-bold uppercase">Sync Stable</span>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
