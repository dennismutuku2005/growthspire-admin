"use client"

import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Modal({
    isOpen,
    onClose,
    title,
    description,
    type = 'info', // 'info' | 'success' | 'error' | 'warning' | 'danger'
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    isLoading = false,
    showCancel = true,
    icon: CustomIcon = null,
    children,
    footer = null,
    maxWidth = 'max-w-md'
}) {
    const [mounted, setMounted] = React.useState(false)

    useEffect(() => {
        setMounted(true)
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [isOpen, onClose])

    if (!isOpen || !mounted) return null

    const typeConfig = {
        info: {
            icon: Info,
            color: 'text-foreground',
            bg: 'bg-muted',
            btn: 'bg-foreground text-background hover:bg-foreground/90'
        },
        success: {
            icon: CheckCircle2,
            color: 'text-emerald-700',
            bg: 'bg-emerald-50',
            btn: 'bg-emerald-600 hover:bg-emerald-700 text-white'
        },
        error: {
            icon: AlertCircle,
            color: 'text-red-700',
            bg: 'bg-red-50',
            btn: 'bg-red-600 hover:bg-red-700 text-white'
        },
        warning: {
            icon: AlertTriangle,
            color: 'text-amber-700',
            bg: 'bg-amber-50',
            btn: 'bg-amber-600 hover:bg-amber-700 text-white'
        },
        danger: {
            icon: AlertCircle,
            color: 'text-red-700',
            bg: 'bg-red-50',
            btn: 'bg-red-600 hover:bg-red-700 text-white'
        }
    }

    const config = typeConfig[type] || typeConfig.info
    const Icon = CustomIcon || config.icon

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop - Flat Darker */}
            <div
                className="fixed inset-0 bg-black/40 animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content - 2D Elegant Style */}
            <div className={cn("relative bg-white border-2 border-foreground w-full overflow-hidden animate-in zoom-in-100 fade-in duration-150 shadow-none", maxWidth)}>
                <div className="p-6">
                    <div className="flex items-start justify-between mb-6">
                        <div className={cn("w-10 h-10 flex items-center justify-center shrink-0 border border-current", config.color, config.bg)}>
                            <Icon size={20} />
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-lg font-bold uppercase tracking-widest leading-none">{title}</h3>
                        {description && (
                            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground opacity-70 leading-relaxed pt-1">
                                {description}
                            </p>
                        )}
                    </div>

                    {/* Children Content */}
                    {children && (
                        <div className="mt-6">
                            {children}
                        </div>
                    )}

                    {/* Footer / Actions */}
                    <div className="mt-8 flex items-center gap-2">
                        {footer ? footer : (
                            <>
                                {showCancel && (
                                    <button
                                        onClick={onClose}
                                        disabled={isLoading}
                                        className="flex-1 px-4 py-2 border border-border text-foreground hover:bg-muted transition-all disabled:opacity-50 text-[11px] font-bold uppercase tracking-widest"
                                    >
                                        {cancelText}
                                    </button>
                                )}
                                <button
                                    onClick={onConfirm}
                                    disabled={isLoading}
                                    className={cn(
                                        "flex-1 px-4 py-2 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest",
                                        config.btn
                                    )}
                                >
                                    {isLoading ? (
                                        <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    ) : confirmText}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}
