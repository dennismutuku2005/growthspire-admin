"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, HelpCircle, ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function AddFAQPage() {
    return (
        <DashboardLayout>
            <div className="space-y-4 animate-in fade-in duration-500">
                {/* 2D Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/faqs">
                            <div className="p-1 hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-200">
                                <ChevronLeft size={16} className="text-gray-400" />
                            </div>
                        </Link>
                        <div>
                            <h1 className="text-lg font-semibold tracking-tight text-gray-900 uppercase flex items-center gap-2">
                                <HelpCircle size={18} className="text-pace-purple" />
                                Create Q&A Entry
                            </h1>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                                ADD A NEW FREQUENTLY ASKED QUESTION TO THE PUBLIC HELP CENTER
                            </p>
                        </div>
                    </div>
                    <Button size="sm" className="bg-pace-purple text-white hover:bg-pace-purple/90 rounded-none h-8 text-[11px] font-bold uppercase tracking-wide px-6">
                        <Save className="mr-2 h-3.5 w-3.5" /> Save Entry
                    </Button>
                </div>

                {/* 2D Form Section */}
                <div className="bg-white border border-gray-200 p-8 space-y-6 border-t-2 border-t-gray-900">
                    <div className="space-y-2">
                        <Label htmlFor="question" className="text-[11px] font-bold uppercase text-gray-400 tracking-widest">Public Question</Label>
                        <Input id="question" placeholder="E.G. WHAT IS THE DURATION OF THE PROGRAM?" className="h-10 rounded-none border-gray-200 text-[13px] font-bold focus-visible:ring-0 focus-visible:border-gray-400 uppercase placeholder:italic" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="answer" className="text-[11px] font-bold uppercase text-gray-400 tracking-widest">Detailed Answer</Label>
                        <Textarea id="answer" placeholder="PROVIDE A CLEAR, CONCISE RESPONSE FOR USERS..." className="rounded-none border-gray-200 text-[13px] min-h-[200px] focus-visible:ring-0 font-medium leading-relaxed bg-gray-50/50" />
                    </div>

                    <div className="pt-4 border-t border-gray-50 flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-pace-purple" />
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Draft will be reviewed by ecosystem lead before publishing.</p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
