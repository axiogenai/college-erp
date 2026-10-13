import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: 'academic' | 'finance' | 'attendance' | 'security' | 'system';
  priority: 'high' | 'normal';
  read: boolean;
  linkModule?: string;
}

export interface ToastItem {
  id: string;
  title: string;
  message: string;
  category?: AppNotification['category'];
  linkModule?: string;
}

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  toasts: ToastItem[];
  isSoundEnabled: boolean;
  isBrowserPushEnabled: boolean;
  toggleSound: (enabled?: boolean) => void;
  toggleBrowserPush: () => Promise<boolean>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  dismissNotification: (id: string) => void;
  clearAll: () => void;
  pushNotification: (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
  dismissToast: (id: string) => void;
  playChime: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Initial realistic institutional alerts
const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Refund Claim Awaiting Bursar Review',
    message: 'Caution deposit refund #REF-8849 for Aditya Verma submitted for clearance.',
    timestamp: '5 min ago',
    category: 'finance',
    priority: 'high',
    read: false,
    linkModule: 'finance'
  },
  {
    id: 'notif-2',
    title: 'Mid-Term 2 Examination Timetable Released',
    message: 'Official paper schedule for CS501 and CS503 published by Controller of Exams.',
    timestamp: '25 min ago',
    category: 'academic',
    priority: 'normal',
    read: false,
    linkModule: 'examinations'
  },
  {
    id: 'notif-3',
    title: 'Low Attendance Threshold Warning',
    message: 'Class CS-3A aggregate attendance fell to 71.8%. Academic risk detector flagged 3 students.',
    timestamp: '1 hour ago',
    category: 'attendance',
    priority: 'high',
    read: false,
    linkModule: 'risk-detector'
  },
  {
    id: 'notif-4',
    title: 'HDFC Treasury Node Reconciliation Complete',
    message: 'Daily digital collections settled: INR 345,000 recorded with zero gateway anomalies.',
    timestamp: '3 hours ago',
    category: 'finance',
    priority: 'normal',
    read: true,
    linkModule: 'finance'
  },
  {
    id: 'notif-5',
    title: 'NAAC Accreditation Peer Review Visit',
    message: 'Administrative briefing session scheduled in Senate Hall at 10:30 AM tomorrow.',
    timestamp: 'Yesterday',
    category: 'system',
    priority: 'normal',
    read: true,
    linkModule: 'notices'
  }
];

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('erp_notifications_list');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          // fallback to defaults
        }
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('erp_notif_sound_enabled');
      return stored !== null ? stored === 'true' : true;
    }
    return true;
  });

  const [isBrowserPushEnabled, setIsBrowserPushEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission === 'granted';
    }
    return false;
  });

  // Persist notifications list
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('erp_notifications_list', JSON.stringify(notifications));
    }
  }, [notifications]);

  // Audio synthesis: High-horology dual-frequency metallic chime
  const playChime = useCallback(() => {
    if (!isSoundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const now = ctx.currentTime;
      // Primary chime tone
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1046.5, now); // C6
      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);

      // Harmonious overtone
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1567.98, now + 0.05); // G6
      gain2.gain.setValueAtTime(0.05, now + 0.05);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.36);
      osc2.start(now + 0.05);
      osc2.stop(now + 0.46);
    } catch {
      // Audio autoplay policy fallback
    }
  }, [isSoundEnabled]);

  const toggleSound = useCallback((enabled?: boolean) => {
    setIsSoundEnabled(prev => {
      const next = enabled !== undefined ? enabled : !prev;
      localStorage.setItem('erp_notif_sound_enabled', String(next));
      if (next) {
        // play a test chime to confirm
        setTimeout(playChime, 50);
      }
      return next;
    });
  }, [playChime]);

  const toggleBrowserPush = useCallback(async (): Promise<boolean> => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      alert('Browser notifications are not supported by this environment.');
      return false;
    }

    if (Notification.permission === 'granted') {
      setIsBrowserPushEnabled(true);
      return true;
    }

    try {
      const permission = await Notification.requestPermission();
      const granted = permission === 'granted';
      setIsBrowserPushEnabled(granted);
      if (granted) {
        new Notification('Campus Notifications Activated', {
          body: 'Institutional alerts and dispatches are now active.',
          icon: '/favicon.ico'
        });
      }
      return granted;
    } catch {
      return false;
    }
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const pushNotification = useCallback((item: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    const id = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newNotif: AppNotification = {
      ...item,
      id,
      timestamp: 'Just now',
      read: false
    };

    setNotifications(prev => [newNotif, ...prev]);

    // Show temporary toast
    const toastId = `toast-${id}`;
    setToasts(prev => [...prev.slice(-2), {
      id: toastId,
      title: item.title,
      message: item.message,
      category: item.category,
      linkModule: item.linkModule
    }]);

    // Auto dismiss toast after 4.5s
    setTimeout(() => {
      dismissToast(toastId);
    }, 4500);

    // Audio chime
    playChime();

    // Desktop notification if enabled
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(item.title, {
          body: item.message,
          icon: '/favicon.ico'
        });
      } catch {
        // Ignored
      }
    }
  }, [playChime, dismissToast]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        toasts,
        isSoundEnabled,
        isBrowserPushEnabled,
        toggleSound,
        toggleBrowserPush,
        markAsRead,
        markAllAsRead,
        dismissNotification,
        clearAll,
        pushNotification,
        dismissToast,
        playChime
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
