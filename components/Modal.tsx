"use client"

import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    type?: 'info' | 'success' | 'error' | 'warning' | 'danger';
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void | Promise<void>;
    isLoading?: boolean;
    showCancel?: boolean;
    icon?: React.ElementType;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    maxWidth?: string;
}

export function Modal({
    isOpen,
    onClose,
    title,
    description = '',
    type = 'info',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    isLoading = false,
    showCancel = true,
    icon: CustomIcon,
    children = null,
    footer = null,
    maxWidth = 'max-w-md'
}: ModalProps) {
    const [mounted, setMounted] = React.useState(false)

    useEffect(() => {
        setMounted(true)
        const handleEsc = (e: KeyboardEvent) => {
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
            btn: 'bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg shadow-sm'
        },
        success: {
            icon: CheckCircle2,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
            btn: 'bg-emerald-600 hover:bg-emerald-700 text-white'
        },
        error: {
            icon: AlertCircle,
            color: 'text-destructive',
            bg: 'bg-destructive/10',
            btn: 'bg-destructive hover:bg-destructive/90 text-white'
        },
        warning: {
            icon: AlertTriangle,
            color: 'text-amber-500',
            bg: 'bg-amber-500/10',
            btn: 'bg-amber-600 hover:bg-amber-700 text-white'
        },
        danger: {
            icon: AlertCircle,
            color: 'text-destructive',
            bg: 'bg-destructive/10',
            btn: 'bg-destructive hover:bg-destructive/90 text-white'
        }
    }

    const config = typeConfig[type] || typeConfig.info
    const Icon = CustomIcon || config.icon

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop - Flat Darker */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content - Elegant Style */}
            <div className={cn("relative bg-card border border-border rounded-xl w-full flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 fade-in duration-150 shadow-2xl", maxWidth)}>
                <div className="p-6 overflow-y-auto">
                    <div className="flex items-start justify-between mb-6 shrink-0">
                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-border", config.color, config.bg)}>
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
                        <h3 className="text-xl font-semibold leading-none">{title}</h3>
                        {description && (
                            <p className="text-sm text-muted-foreground pt-1">
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
                    <div className="mt-8 flex items-center gap-2 shrink-0">
                        {footer ? footer : (
                            <>
                                {showCancel && (
                                    <button
                                        onClick={onClose}
                                        disabled={isLoading}
                                        className="flex-1 px-4 py-2 border border-border text-foreground hover:bg-muted transition-all disabled:opacity-50 text-sm font-medium rounded-lg"
                                    >
                                        {cancelText}
                                    </button>
                                )}
                                <button
                                    onClick={onConfirm}
                                    disabled={isLoading}
                                    className={cn(
                                        "flex-1 px-4 py-2 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-medium rounded-lg shadow-sm border border-transparent",
                                        type === 'danger' && "bg-destructive text-white hover:bg-destructive/90",
                                        type !== 'danger' && config.btn
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
