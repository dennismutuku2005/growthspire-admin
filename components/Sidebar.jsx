"use client"

import React, { useState, useEffect } from 'react'
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
    const [stats, setStats] = useState(null)
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch("http://localhost/growthspire/backend/dashboard_stats.php");
                const result = await response.json();
                if (result.success) {
                    setStats(result.stats);
                }
            } catch (error) {
                console.error("Sidebar stats error:", error);
            }
        };
        fetchStats();
    }, []);

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
        { id: 'applications', name: 'Applications', href: '/dashboard/applications', icon: FileText, badge: stats?.applications },
        { id: 'startups', name: 'Startups', href: '/dashboard/startups', icon: Rocket, badge: stats?.startups },
        { id: 'events', name: 'Events', href: '/dashboard/events', icon: Calendar, children: [
            { name: 'All Events', href: '/dashboard/events' },
            { name: 'Upcoming', href: '/dashboard/events/upcoming' },
            { name: 'Past', href: '/dashboard/events/past' },
        ]},
        { id: 'sponsors', name: 'Sponsors', href: '/dashboard/sponsors', icon: Building, badge: stats?.sponsors },
        { id: 'blogs', name: 'Blogs', href: '/dashboard/blogs', icon: MessageSquare },
        { id: 'settings', name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ]

    const sidebarClass = isMobile
        ? cn(
            "fixed inset-y-0 left-0 z-50 bg-card border-r border-border transition-transform duration-300 w-64",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full shadow-none"
        )
        : cn(
            "fixed inset-y-0 left-0 z-50 bg-card border-r border-border transition-all duration-300 hidden lg:flex flex-col",
            isSidebarOpen ? "w-60" : "w-16"
        );

    const showText = isMobile || isSidebarOpen;

    return (
        <>
            {/* Mobile Overlay */}
            {isMobile && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 lg:hidden animate-in fade-in duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
            <aside className={sidebarClass}>
                {/* Logo Section */}
                <div className="h-16 flex items-center justify-center border-b border-border">
                    <Link href={createHref("/dashboard")} className="flex items-center justify-center gap-2">
                        {showText ? (
                            <div className="flex items-center gap-2">
                                <Image
                                    src="/logo.png"
                                    alt="GrowthSpire"
                                    width={28}
                                    height={28}
                                    className="h-7 w-auto object-contain grayscale"
                                    priority
                                />
                                <span className="font-semibold text-lg tracking-tight text-foreground">GrowthSpire</span>
                            </div>
                        ) : (
                            <Image
                                src="/logo.png"
                                alt="GrowthSpire"
                                width={28}
                                height={28}
                                className="h-7 w-auto object-contain grayscale"
                                priority
                            />
                        )}
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="p-2 space-y-0.5 overflow-y-auto max-h-[calc(100vh-8rem)] scrollbar-hide">
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
                                                "w-full flex items-center gap-3 px-3 py-2.5 transition-all group relative text-sm font-medium",
                                                isActive ? "text-foreground bg-muted/50 rounded-lg" : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                                            )}
                                        >
                                            <item.icon size={16} className={cn("shrink-0 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                                            {showText && (
                                                <div className="flex-1 flex items-center justify-between">
                                                    <span className="truncate">{item.name}</span>
                                                    <ChevronDown size={12} className={cn("transition-transform duration-200 opacity-40", isExpanded ? "rotate-180" : "")} />
                                                </div>
                                            )}
                                        </button>
                                        {/* Submenu */}
                                        {showText && isExpanded && (
                                            <div className="ml-7 space-y-0 border-l border-border pl-3 my-1">
                                                {item.children.map((child) => {
                                                    const isChildActive = pathname === child.href;
                                                    return (
                                                        <Link
                                                            key={child.name}
                                                            href={createHref(child.href)}
                                                            className={cn(
                                                                "block px-2 py-2 text-xs font-medium transition-all relative",
                                                                isChildActive
                                                                    ? "text-primary border-r-2 border-primary"
                                                                    : "text-muted-foreground hover:text-foreground"
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
                                            "flex items-center gap-3 px-3 py-2.5 transition-all group relative text-sm font-medium",
                                            isActive
                                                ? "bg-primary text-primary-foreground rounded-lg shadow-sm"
                                                : "text-muted-foreground hover:bg-muted/30 hover:text-foreground rounded-lg"
                                        )}
                                    >
                                        <item.icon size={16} className={cn("shrink-0", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                                        {showText && (
                                            <div className="flex-1 flex items-center justify-between whitespace-nowrap overflow-hidden">
                                                <span>{item.name}</span>
                                                {item.badge > 0 && (
                                                    <span className={cn(
                                                        "text-[10px] h-5 min-w-[20px] px-1.5 flex items-center justify-center rounded-full font-bold",
                                                        isActive ? "bg-white text-primary" : "bg-primary/10 text-primary border border-primary/20"
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

                <div className="absolute bottom-4 w-full px-2">
                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all text-sm font-medium rounded-lg"
                    >
                        <LogOut size={16} />
                        {showText && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Logout Modal */}
            <Modal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                title="Logout Confirmation"
                description="Are you sure you want to log out of the GrowthSpire Admin?"
                type="danger"
                confirmText="Logout"
                onConfirm={() => {
                    Cookies.remove("user_data");
                    window.location.href = '/login';
                }}
            />
        </>
    )
}
