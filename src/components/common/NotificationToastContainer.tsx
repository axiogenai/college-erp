import React from 'react';
import { useNotifications, ToastItem } from '../../context/NotificationContext';
import { Bell, X, ArrowUpRight } from 'lucide-react';

interface NotificationToastContainerProps {
  onNavigate?: (module: string) => void;
}

export const NotificationToastContainer: React.FC<NotificationToastContainerProps> = ({ onNavigate }) => {
  const { toasts, dismissToast } = useNotifications();

  if (toasts.length === 0) return null;

  return (
    <div 
      className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none select-none"
      aria-live="polite"
    >
      {toasts.map(toast => (
        <ToastCard 
          key={toast.id} 
          toast={toast} 
          onDismiss={() => dismissToast(toast.id)}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
};

const ToastCard: React.FC<{
  toast: ToastItem;
  onDismiss: () => void;
  onNavigate?: (module: string) => void;
}> = ({ toast, onDismiss, onNavigate }) => {
  const handleClick = () => {
    if (toast.linkModule && onNavigate) {
      onNavigate(toast.linkModule);
      onDismiss();
    }
  };

  return (
    <div 
      className="pointer-events-auto w-full p-3.5 rounded-xl bg-white dark:bg-[#121215] border border-neutral-200 dark:border-white/[0.08] shadow-2xl dark:shadow-[0_12px_32px_rgba(0,0,0,0.6)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] flex items-start gap-3 transform transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#C5A059]/40 active:scale-[0.99] group cursor-pointer"
      onClick={handleClick}
    >
      {/* Accent Indicator Dot */}
      <div className="p-2 rounded-lg bg-neutral-100 dark:bg-[#18181C] border border-neutral-200 dark:border-white/[0.08] text-[#C5A059] shrink-0 mt-0.5">
        <Bell className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold text-neutral-900 dark:text-[#EDEDEF] truncate">
            {toast.title}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            className="text-neutral-400 hover:text-neutral-200 p-0.5 rounded transition-colors"
            title="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-[11px] text-neutral-500 dark:text-[#A1A1AA] line-clamp-2 mt-0.5 leading-relaxed">
          {toast.message}
        </p>

        {toast.linkModule && (
          <div className="mt-2 flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-[#C5A059] group-hover:underline">
            <span>Inspect Module</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        )}
      </div>
    </div>
  );
};
