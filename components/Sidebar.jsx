"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import {
    Users, CreditCard, Ticket, Settings,
    Activity, FileText, Network, Receipt,
    UserRoundCheck, MessageSquare, Globe, ChevronDown,
    LogOut, LayoutDashboard, Clock, Smartphone, Bell, Code,
    Rocket, Building, Calendar, Zap, HelpCircle, Shield, FileCode, Tag, Mail
} from 'lucide-react'
import { Modal } from '@/components/Modal'
import { cn } from '@/lib/utils'
import Cookies from "js-cookie"

export function Sidebar({ isSidebarOpen, setIsSidebarOpen, isMobile, pathname }) {
    const [openMenus, setOpenMenus] = useState([])
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const searchParams = useSearchParams()
    const router = useRouter()

    // Helper to persist query params
    const createHref = (href) => {
        if (!searchParams) return href
        const params = new URLSearchParams(searchParams)
        const queryString = params.toString()
        return queryString ? `${href}?${queryString}` : href
    }

    const toggleMenu = (id) => {
        setOpenMenus(prev =>
            prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
        )
    }

    const navigation = [
        { id: 'dashboard', name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        {
            id: 'startups',
            name: 'Startups',
            icon: Rocket,
            children: [
                { name: 'All Startups', href: '/dashboard/startups' },
                { name: 'Accelerated', href: '/dashboard/startups/accelerated' },
                { name: 'Applications', href: '/dashboard/startups/applications' },
                { name: 'Analytics', href: '/dashboard/startups/analytics' },
            ]
        },
        {
            id: 'sponsors',
            name: 'Sponsors',
            icon: Building,
            children: [
                { name: 'All Sponsors', href: '/dashboard/sponsors' },
                { name: 'Partnerships', href: '/dashboard/sponsors/partnerships' },
                { name: 'Funding', href: '/dashboard/sponsors/funding' },
            ]
        },
        {
            id: 'events',
            name: 'Events',
            icon: Calendar,
            children: [
                { name: 'All Events', href: '/dashboard/events' },
                { name: 'Upcoming', href: '/dashboard/events/upcoming' },
                { name: 'Past Events', href: '/dashboard/events/past' },
            ]
        },
        {
            id: 'blogs',
            name: 'Blogs',
            icon: FileText,
            children: [
                { name: 'All Blogs', href: '/dashboard/blogs' },
                { name: 'Create Blog', href: '/dashboard/blogs/create' },
                { name: 'Categories', href: '/dashboard/blogs/categories' },
            ]
        },
        {
            id: 'system',
            name: 'System Updates',
            icon: Settings,
            children: [
                { name: 'Privacy Policy', href: '/dashboard/system/privacy-policy' },
                { name: 'Terms & Conditions', href: '/dashboard/system/terms' },
                { name: 'User Data Policy', href: '/dashboard/system/user-data-policy' },
                { name: 'Other Policies', href: '/dashboard/system/policies' },
            ]
        },
        {
            id: 'accelerator',
            name: 'Accelerator',
            icon: Zap,
            children: [
                { name: 'Programs', href: '/dashboard/accelerator/programs' },
                { name: 'Mentors', href: '/dashboard/accelerator/mentors' },
                { name: 'Resources', href: '/dashboard/accelerator/resources' },
            ]
        },
        {
            id: 'faqs',
            name: 'FAQs',
            icon: HelpCircle,
            children: [
                { name: 'Manage FAQs', href: '/dashboard/faqs' },
                { name: 'Add FAQ', href: '/dashboard/faqs/add' },
            ]
        },
        {
            id: 'applications',
            name: 'Applications',
            icon: FileText,
            children: [
                { name: 'All Applications', href: '/dashboard/applications' },
                { name: 'Pending Review', href: '/dashboard/applications/pending' },
                { name: 'Approved', href: '/dashboard/applications/approved' },
                { name: 'Rejected', href: '/dashboard/applications/rejected' },
            ]
        },
        {
            id: 'communications',
            name: 'Communications',
            icon: MessageSquare,
            children: [
                { name: 'Email', href: '/dashboard/communications/email' },
                { name: 'SMS', href: '/dashboard/communications/sms' },
                { name: 'Notifications', href: '/dashboard/communications/notifications' },
            ]
        },
    ]

    const sidebarClass = isMobile
        ? cn(
            "fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-100 transition-transform duration-300 w-64 shadow-xl",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )
        : cn(
            "fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-100 transition-all duration-300 shadow-sm hidden lg:flex flex-col",
            isSidebarOpen ? "w-60" : "w-16"
        );

    const showText = isMobile || isSidebarOpen;

    return (
        <>
            {/* Mobile Overlay */}
            {isMobile && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
            <aside className={sidebarClass}>
                {/* Logo Section */}
                <div className="h-16 flex items-center justify-center border-b border-gray-100">
                    <Link href={createHref("/dashboard")} className="flex items-center justify-center gap-2">
                        {showText ? (
                            <div className="flex items-center gap-2">
                                <Image
                                    src="/logo.png"
                                    alt="GrowthSpire"
                                    width={32}
                                    height={32}
                                    className="h-8 w-auto object-contain"
                                    priority
                                />
                                <span className="font-bold text-lg text-pace-purple tracking-tight">GrowthSpire</span>
                            </div>
                        ) : (
                            <Image
                                src="/logo.png"
                                alt="GrowthSpire"
                                width={32}
                                height={32}
                                className="h-8 w-auto object-contain"
                                priority
                            />
                        )}
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-8rem)] scrollbar-hide">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || item.children?.some(child => child.href === pathname);
                        const isExpanded = openMenus.includes(item.id);

                        return (
                            <div key={item.id} className="space-y-0.5">
                                {item.children ? (
                                    <div className="space-y-0.5">
                                        <button
                                            onClick={() => toggleMenu(item.id)}
                                            className={cn(
                                                "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all group relative text-[13px]",
                                                isActive && !isExpanded ? "bg-pace-purple/10 text-pace-purple font-medium" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                            )}
                                        >
                                            <item.icon size={18} className={cn("shrink-0", isActive ? "text-pace-purple" : "text-gray-400 group-hover:text-gray-600")} />
                                            {showText && (
                                                <div className="flex-1 flex items-center justify-between transition-opacity duration-200">
                                                    <span className="truncate">{item.name}</span>
                                                    <ChevronDown size={14} className={cn("transition-transform duration-200 text-gray-400", isExpanded ? "rotate-180" : "")} />
                                                </div>
                                            )}
                                        </button>
                                        {/* Submenu */}
                                        {showText && isExpanded && (
                                            <div className="ml-4 space-y-0.5 border-l border-gray-100 pl-2 my-1">
                                                {item.children.map((child) => {
                                                    const isChildActive = pathname === child.href;
                                                    return (
                                                        <Link
                                                            key={child.name}
                                                            href={createHref(child.href)}
                                                            className={cn(
                                                                "block px-3 py-2 rounded-md text-[12px] transition-all",
                                                                isChildActive
                                                                    ? "text-pace-purple font-medium bg-pace-purple/5"
                                                                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                                            )}
                                                        >
                                                            {child.name}
                                                        </Link>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        href={createHref(item.href)}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 rounded-md transition-all group relative text-[13px]",
                                            isActive
                                                ? "bg-pace-purple text-white shadow-sm font-medium"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        )}
                                    >
                                        <item.icon size={18} className={cn("shrink-0", isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600")} />
                                        {showText && (
                                            <div className="flex-1 flex items-center justify-between whitespace-nowrap overflow-hidden transition-opacity duration-200">
                                                <span>{item.name}</span>
                                                {item.badge && (
                                                    <span className={cn(
                                                        "text-[10px] px-1.5 py-0.5 rounded-full font-medium min-w-[20px] text-center",
                                                        isActive ? "bg-white/20 text-white" : "bg-pace-purple/10 text-pace-purple"
                                                    )}>
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </Link>
                                )}
                            </div>
                        )
                    })}
                </nav>

                <div className="absolute bottom-4 w-full px-3">
                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-gray-500 hover:text-red-600 transition-colors rounded-md hover:bg-red-50 text-[13px] font-medium"
                    >
                        <LogOut size={18} />
                        {showText && <span>Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* Standardized Logout Modal */}
            <Modal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                title="Confirm Logout"
                description="Are you sure you want to sign out?"
                type="danger"
                icon={LogOut}
                confirmText="Sign Out"
                onConfirm={() => {
                    Cookies.remove("user_data");
                    window.location.href = '/login';
                }}
            />
        </>
    )
}
