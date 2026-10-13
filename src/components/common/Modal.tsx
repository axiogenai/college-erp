import React, { useEffect } from 'react';
import { X, GraduationCap } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  children,
  footer,
  maxWidth = 'lg'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl'
  }[maxWidth];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div 
          className={`relative transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 text-left shadow-soft-lg transition-all duration-200 sm:my-8 w-full ${maxWidthClasses} border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 flex flex-col`}
          onClick={e => e.stopPropagation()}
        >
          {/* Header: Dark Royal Oxford Navy Top Banner */}
          <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white shrink-0 border-b border-blue-500/25 shadow-xs">
            <div className="flex items-center gap-3.5 min-w-0 flex-1 pr-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center text-sky-300 shrink-0 border border-white/15 shadow-2xs">
                {icon || <GraduationCap className="w-5 h-5 text-sky-300" />}
              </div>
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <h3 className="text-base font-bold text-white font-sans tracking-tight truncate leading-tight">
                  {title}
                </h3>
                {subtitle && (
                  <p className="mt-1 text-xs text-sky-100/90 font-medium truncate leading-normal">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-all shrink-0 -mr-1"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5 max-h-[65vh] overflow-y-auto">
            {children}
          </div>

          {/* Fixed Footer */}
          {footer && (
            <div className="border-t border-slate-200 dark:border-slate-700/80 px-6 py-3.5 bg-slate-100/70 dark:bg-slate-800/60 shrink-0">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
