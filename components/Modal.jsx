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
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            btn: 'bg-blue-600 hover:bg-blue-700'
        },
        success: {
            icon: CheckCircle2,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            btn: 'bg-emerald-600 hover:bg-emerald-700'
        },
        error: {
            icon: AlertCircle,
            color: 'text-red-600',
            bg: 'bg-red-50',
            btn: 'bg-red-600 hover:bg-red-700'
        },
        warning: {
            icon: AlertTriangle,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            btn: 'bg-amber-600 hover:bg-amber-700'
        },
        danger: {
            icon: AlertCircle,
            color: 'text-red-600',
            bg: 'bg-red-50',
            btn: 'bg-red-500 hover:bg-red-600'
        }
    }

    const config = typeConfig[type] || typeConfig.info
    const Icon = CustomIcon || config.icon

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop - Soft Blur */}
            <div
                className="fixed inset-0 bg-black/20 backdrop-blur-[2px] animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content - Clean Modern Styling */}
            <div className={cn("relative bg-white rounded-xl shadow-lg w-full overflow-hidden animate-in zoom-in-95 fade-in duration-200 ring-1 ring-gray-200", maxWidth)}>
                <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                        <div className={cn("w-9 h-9 rounded-full flex items-center justify-center shrink-0", config.bg, config.color)}>
                            <Icon size={18} />
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <div className="space-y-1.5">
                        <h3 className="text-base font-semibold text-gray-900 leading-none">{title}</h3>
                        {description && (
                            <p className="text-xs text-gray-500 leading-relaxed">
                                {description}
                            </p>
                        )}
                    </div>

                    {/* Children Content */}
                    {children && (
                        <div className="mt-4">
                            {children}
                        </div>
                    )}

                    {/* Footer / Actions */}
                    <div className="mt-6 flex items-center gap-2">
                        {footer ? footer : (
                            <>
                                {showCancel && (
                                    <button
                                        onClick={onClose}
                                        disabled={isLoading}
                                        className="flex-1 px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-md text-xs font-medium hover:bg-gray-50 hover:text-gray-900 transition-all disabled:opacity-50"
                                    >
                                        {cancelText}
                                    </button>
                                )}
                                <button
                                    onClick={onConfirm}
                                    disabled={isLoading}
                                    className={cn(
                                        "flex-1 px-3 py-2 text-white rounded-md text-xs font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm",
                                        config.btn
                                    )}
                                >
                                    {isLoading ? (
                                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
