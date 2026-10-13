import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, Search, Bell, Sun, Moon, Check, 
  ExternalLink, LogOut, ChevronDown, Shield, GraduationCap, 
  User, CreditCard 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { UserRole } from '../../types';
import { useErpData } from '../../context/ErpDataContext';
import { Avatar } from '../common/Avatar';

interface TopNavbarProps {
  onOpenMobileSidebar: () => void;
  onOpenSearch: () => void;
  onNavigateLanding: () => void;
  onSelectModule: (module: string) => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onOpenMobileSidebar,
  onOpenSearch,
  onNavigateLanding,
  onSelectModule
}) => {
  const { currentUser, role, switchPersona, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notices } = useErpData();

  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const roleMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (roleMenuRef.current && !roleMenuRef.current.contains(target)) {
        setIsRoleMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(target)) {
        setIsNotifOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const rolesList: { id: UserRole; label: string; desc: string; icon: React.ReactNode }[] = [
    { id: 'principal', label: 'Dr. Ramachandran (Principal)', desc: 'Executive Director & Oversight', icon: <Shield className="w-4 h-4 text-institutional-600" /> },
    { id: 'faculty', label: 'Dr. Meera Nambiar (Faculty)', desc: 'Dean of Academic Affairs & Prof.', icon: <User className="w-4 h-4 text-slate-500" /> },
    { id: 'student', label: 'Aditya Verma (Student)', desc: 'B.Tech Computer Science (ID: 042)', icon: <GraduationCap className="w-4 h-4 text-slate-500" /> },
    { id: 'accountant', label: 'Mr. Rajeshwar Rao, CA (Bursar)', desc: 'Chief Comptroller & Treasury', icon: <CreditCard className="w-4 h-4 text-institutional-600" /> }
  ];

  const handleRoleChange = (newRole: UserRole) => {
    switchPersona(newRole);
    setIsRoleMenuOpen(false);
    onSelectModule('dashboard');
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-gradient-to-r from-[#064E3B] via-[#075949] to-[#022C22] text-white rounded-l-2xl border-l border-white/15 dark:border-white/15 border-b border-emerald-500/20 shadow-[inset_1px_0_0_0_rgba(255,255,255,0.12),inset_0_1px_0_0_rgba(255,255,255,0.18),0_4px_12px_-2px_rgba(0,0,0,0.15)] px-4 sm:px-6 flex items-center justify-between transition-colors relative overflow-visible">
      {/* Soft Luxury Micro-Pattern Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0f_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none rounded-l-2xl overflow-hidden" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-black/[0.10] pointer-events-none rounded-l-2xl overflow-hidden" />

      {/* Left section: mobile hamburger & search shortcut */}
      <div className="flex items-center gap-3 relative z-10">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Open mobile navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Button */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-black/20 hover:bg-black/30 text-white text-xs transition-all border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] w-48 sm:w-64"
        >
          <Search className="w-3.5 h-3.5 text-emerald-300/80" />
          <span className="truncate text-white/90">Search records...</span>
          <kbd className="hidden sm:inline-block ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 border border-white/15 text-emerald-200/90">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Right section: Persona switcher, notifications, theme, public portal link */}
      <div className="flex items-center gap-2 sm:gap-3 relative z-10">
        {/* Switch Persona Dropdown */}
        <div className="relative" ref={roleMenuRef}>
          <button
            onClick={() => {
              setIsRoleMenuOpen(!isRoleMenuOpen);
              setIsNotifOpen(false);
              setIsProfileMenuOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/15 bg-white/10 hover:bg-white/15 transition-colors text-xs text-white"
            title="Switch Persona to audit role-specific dashboards & permissions"
          >
            <span className="hidden sm:inline text-emerald-200/80">Viewing as:</span>
            <span className="font-semibold capitalize text-white">
              {role}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-white/70" />
          </button>

          {isRoleMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft-lg p-2 z-50 text-slate-900 dark:text-slate-100">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 text-[10px] font-semibold uppercase tracking-wider text-slate-400 font-mono">
                Switch Role Persona
              </div>
              <div className="py-1 space-y-1">
                {rolesList.map(r => (
                  <button
                    key={r.id}
                    onClick={() => handleRoleChange(r.id)}
                    className={`w-full text-left p-2.5 rounded-lg flex items-start gap-2.5 transition-colors ${
                      role === r.id 
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100' 
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 mt-0.5">
                      {r.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold truncate">{r.label}</p>
                        {role === r.id && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 ml-1" />}
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{r.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Public Portal shortcut */}
        <button
          onClick={onNavigateLanding}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/90 hover:text-white rounded-lg border border-white/15 bg-white/10 hover:bg-white/15 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-emerald-300/80" />
          <span>Public Portal</span>
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsRoleMenuOpen(false);
              setIsProfileMenuOpen(false);
            }}
            className="p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 relative transition-colors"
            title="Institutional Notices"
          >
            <Bell className="w-4 h-4" />
            {notices.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-[#075949]" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft-lg p-3 z-50 text-slate-900 dark:text-slate-100">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-mono">Circulars &amp; Notices</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-medium">{notices.length} Active</span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notices.slice(0, 4).map(notice => (
                  <button 
                    key={notice.id} 
                    onClick={() => {
                      onSelectModule('notices');
                      setIsNotifOpen(false);
                    }}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left border border-slate-100 dark:border-slate-800 transition-colors block"
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                      <span className="uppercase font-mono font-semibold text-[#0F2942] dark:text-sky-300">{notice.category}</span>
                      <span>{notice.publishDate}</span>
                    </div>
                    <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">{notice.title}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/15 bg-white/10 hover:bg-white/15 text-white transition-colors text-xs font-medium"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Dark</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-emerald-100" />
              <span className="hidden sm:inline">Light</span>
            </>
          )}
        </button>

        {/* Profile User Dropdown */}
        <div className="relative" ref={profileMenuRef}>
          <button
            onClick={() => {
              setIsProfileMenuOpen(!isProfileMenuOpen);
              setIsRoleMenuOpen(false);
              setIsNotifOpen(false);
            }}
            className="flex items-center gap-2 p-1.5 pl-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 transition-colors"
          >
            <Avatar name={currentUser.name} size="sm" variant="navbar" />
            <ChevronDown className="w-3.5 h-3.5 text-white/80" />
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft-lg p-2 z-50 text-slate-900 dark:text-slate-100">
              <div className="p-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">{currentUser.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
              </div>
              <button
                onClick={() => onSelectModule('audit-logs')}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                <span>Institutional Activity Log</span>
              </button>
              <button
                onClick={logout}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors flex items-center gap-2 mt-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out Portal</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
