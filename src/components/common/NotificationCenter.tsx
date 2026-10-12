import React, { useState } from 'react';
import { 
  Bell, CheckCheck, Trash2, Volume2, VolumeX, 
  Send, ExternalLink, X, ShieldAlert,
  GraduationCap, CreditCard, Clock
} from 'lucide-react';
import { useNotifications, AppNotification } from '../../context/NotificationContext';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (module: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const {
    notifications,
    unreadCount,
    isSoundEnabled,
    isBrowserPushEnabled,
    toggleSound,
    toggleBrowserPush,
    markAsRead,
    markAllAsRead,
    dismissNotification,
    clearAll,
    pushNotification
  } = useNotifications();

  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'priority' | 'finance' | 'academic'>('all');

  if (!isOpen) return null;

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'unread') return !n.read;
    if (activeTab === 'priority') return n.priority === 'high';
    if (activeTab === 'finance') return n.category === 'finance';
    if (activeTab === 'academic') return n.category === 'academic';
    return true;
  });

  const handleItemClick = (notif: AppNotification) => {
    markAsRead(notif.id);
    if (notif.linkModule) {
      onNavigate(notif.linkModule);
      onClose();
    }
  };

  const handleTriggerTest = () => {
    const samples = [
      {
        title: 'Fee Installment Cleared',
        message: 'Tuition installment INR 55,000 reconciled for 3rd semester CSE.',
        category: 'finance' as const,
        priority: 'normal' as const,
        linkModule: 'finance'
      },
      {
        title: 'Academic Risk Alert',
        message: 'CS-302 Discrete Mathematics attendance dropped below 75% limit.',
        category: 'attendance' as const,
        priority: 'high' as const,
        linkModule: 'risk-detector'
      },
      {
        title: 'Dean Senate Circular',
        message: 'Annual Convocation gown registration open until Friday 5:00 PM.',
        category: 'academic' as const,
        priority: 'normal' as const,
        linkModule: 'notices'
      }
    ];
    const picked = samples[Math.floor(Math.random() * samples.length)];
    pushNotification(picked);
  };

  return (
    <div 
      className="absolute right-0 mt-2 w-96 max-w-[calc(100vw-2rem)] rounded-2xl bg-white dark:bg-[#121215] border border-neutral-200 dark:border-white/[0.08] shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] z-50 text-neutral-900 dark:text-[#EDEDEF] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top Header Strip */}
      <div className="px-4 py-3 bg-neutral-50 dark:bg-[#161619] border-b border-neutral-200 dark:border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-neutral-200/60 dark:bg-white/[0.05] text-[#C5A059]">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-semibold tracking-tight">Institutional Dispatches</h3>
            <p className="text-[10px] font-mono text-neutral-500 dark:text-[#71717A] uppercase tracking-wider">
              {unreadCount} Unread Alerts
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Sound Alert Toggle */}
          <button
            onClick={() => toggleSound()}
            className={`p-1.5 rounded-lg border transition-all text-xs ${
              isSoundEnabled 
                ? 'bg-[#C5A059]/10 text-[#C5A059] border-[#C5A059]/25 hover:bg-[#C5A059]/20' 
                : 'text-neutral-400 hover:text-neutral-200 border-transparent hover:bg-neutral-100 dark:hover:bg-white/[0.05]'
            }`}
            title={isSoundEnabled ? 'Turn Off Audio Chime' : 'Turn On Audio Chime'}
          >
            {isSoundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Push Notifications Toggle */}
          <button
            onClick={toggleBrowserPush}
            className={`px-2 py-1 rounded-lg border text-[10px] font-mono uppercase tracking-wider transition-all ${
              isBrowserPushEnabled
                ? 'bg-[#C5A059]/10 text-[#C5A059] border-[#C5A059]/25'
                : 'text-neutral-400 hover:text-neutral-200 border-neutral-200 dark:border-white/[0.08] hover:bg-neutral-100 dark:hover:bg-white/[0.05]'
            }`}
            title="Enable Desktop Push Alerts"
          >
            {isBrowserPushEnabled ? 'Push: On' : 'Push: Off'}
          </button>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/[0.05] transition-colors ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-3 pt-2 pb-1 border-b border-neutral-200 dark:border-white/[0.06] flex items-center gap-1 overflow-x-auto text-[11px]">
        {(['all', 'unread', 'priority', 'finance', 'academic'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2.5 py-1 rounded-md capitalize font-medium transition-colors shrink-0 ${
              activeTab === tab
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-[#0A0A0C]'
                : 'text-neutral-500 hover:text-neutral-900 dark:text-[#A1A1AA] dark:hover:text-[#EDEDEF]'
            }`}
          >
            {tab === 'unread' ? `Unread (${unreadCount})` : tab}
          </button>
        ))}
      </div>

      {/* Action Quick Bar */}
      <div className="px-4 py-2 bg-neutral-50/50 dark:bg-[#141417]/50 border-b border-neutral-200 dark:border-white/[0.04] flex items-center justify-between text-[10px] font-mono">
        <button
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="flex items-center gap-1 text-neutral-500 hover:text-[#C5A059] disabled:opacity-40 disabled:hover:text-neutral-500 transition-colors uppercase tracking-wider"
        >
          <CheckCheck className="w-3.5 h-3.5" />
          <span>Mark All Read</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleTriggerTest}
            className="flex items-center gap-1 text-[#C5A059] hover:underline uppercase tracking-wider"
            title="Send demo test dispatch"
          >
            <Send className="w-3 h-3" />
            <span>Test Dispatch</span>
          </button>

          <button
            onClick={clearAll}
            disabled={notifications.length === 0}
            className="flex items-center gap-1 text-neutral-400 hover:text-rose-500 disabled:opacity-40 disabled:hover:text-neutral-400 transition-colors uppercase tracking-wider"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Notifications Scroll Area */}
      <div className="max-h-80 overflow-y-auto divide-y divide-neutral-100 dark:divide-white/[0.04]">
        {filteredNotifications.map(item => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`p-3.5 transition-colors cursor-pointer flex items-start gap-3 group relative ${
              !item.read 
                ? 'bg-[#C5A059]/[0.03] dark:bg-[#C5A059]/[0.04] hover:bg-[#C5A059]/[0.07]' 
                : 'hover:bg-neutral-50 dark:hover:bg-white/[0.02]'
            }`}
          >
            {/* Category Icon */}
            <div className={`p-2 rounded-lg shrink-0 mt-0.5 border ${
              item.priority === 'high'
                ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                : item.category === 'finance'
                ? 'bg-neutral-100 dark:bg-[#18181C] text-[#C5A059] border-neutral-200 dark:border-white/[0.08]'
                : 'bg-neutral-100 dark:bg-[#18181C] text-neutral-600 dark:text-[#A1A1AA] border-neutral-200 dark:border-white/[0.08]'
            }`}>
              {item.priority === 'high' ? (
                <ShieldAlert className="w-3.5 h-3.5" />
              ) : item.category === 'finance' ? (
                <CreditCard className="w-3.5 h-3.5" />
              ) : item.category === 'academic' ? (
                <GraduationCap className="w-3.5 h-3.5" />
              ) : (
                <Bell className="w-3.5 h-3.5" />
              )}
            </div>

            {/* Content Body */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A059] font-medium">
                  {item.category}
                </span>
                <span className="text-[10px] text-neutral-400 dark:text-[#71717A] font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.timestamp}
                </span>
              </div>

              <h4 className={`text-xs mt-0.5 leading-snug line-clamp-1 ${
                !item.read 
                  ? 'font-semibold text-neutral-900 dark:text-[#EDEDEF]' 
                  : 'font-normal text-neutral-700 dark:text-[#A1A1AA]'
              }`}>
                {item.title}
              </h4>

              <p className="text-[11px] text-neutral-500 dark:text-[#71717A] line-clamp-2 mt-0.5 leading-relaxed">
                {item.message}
              </p>

              {item.linkModule && (
                <div className="mt-2 flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-[#C5A059] opacity-80 group-hover:opacity-100">
                  <span>Open {item.linkModule}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </div>
              )}
            </div>

            {/* Right Status Dot & Dismiss Button */}
            <div className="flex flex-col items-end justify-between self-stretch shrink-0">
              {!item.read && (
                <span className="w-2 h-2 rounded-full bg-[#C5A059] shadow-[0_0_8px_rgba(197,160,89,0.5)]" />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dismissNotification(item.id);
                }}
                className="opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-neutral-200 p-1 transition-opacity"
                title="Dismiss"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="py-12 px-4 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200 dark:border-white/[0.06] flex items-center justify-center mx-auto text-neutral-400">
              <CheckCheck className="w-5 h-5 text-[#C5A059]" />
            </div>
            <p className="text-xs font-semibold text-neutral-700 dark:text-[#EDEDEF]">No Active Dispatches</p>
            <p className="text-[11px] text-neutral-400 dark:text-[#71717A] max-w-xs mx-auto">
              All institutional alerts, fee schedules, and academic risk notifications are acknowledged.
            </p>
          </div>
        )}
      </div>

      {/* Footer Strip */}
      <div className="p-3 bg-neutral-50 dark:bg-[#161619] border-t border-neutral-200 dark:border-white/[0.06] flex items-center justify-between text-xs">
        <span className="text-[10px] font-mono text-neutral-400 dark:text-[#71717A]">
          Campus Relay Node • Online
        </span>
        <button
          onClick={() => {
            onNavigate('notices');
            onClose();
          }}
          className="text-[11px] font-medium text-[#C5A059] hover:underline"
        >
          View Full Circular Registry →
        </button>
      </div>
    </div>
  );
};
