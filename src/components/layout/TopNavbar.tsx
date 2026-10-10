import React, { useState } from 'react';
import { 
  Menu, Search, Bell, Sun, Moon, Check, 
  ExternalLink, LogOut, ChevronDown, Shield, GraduationCap, 
  User, CreditCard 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { UserRole } from '../../types';
import { useErpData } from '../../context/ErpDataContext';

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
    <header className="sticky top-0 z-30 h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors px-4 sm:px-6 flex items-center justify-between">
      {/* Left section: mobile hamburger & search shortcut */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Button */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/70 dark:hover:bg-slate-700/60 text-slate-500 dark:text-slate-400 text-xs transition-colors border border-slate-200 dark:border-slate-700 w-48 sm:w-64"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="truncate">Search records...</span>
          <kbd className="hidden sm:inline-block ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
            Ctrl+K
          </kbd>
        </button>

        {/* Academic Term Badge */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-institutional-600" />
          <span>AY 2026–27 • Fall Term</span>
        </div>
      </div>

      {/* Right section: Persona switcher, notifications, theme, public portal link */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Switch Persona Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsRoleMenuOpen(!isRoleMenuOpen);
              setIsNotifOpen(false);
              setIsProfileMenuOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors text-xs text-slate-800 dark:text-slate-200"
            title="Switch Persona to audit role-specific dashboards & permissions"
          >
            <span className="hidden sm:inline text-slate-500 dark:text-slate-400">Viewing as:</span>
            <span className="font-semibold capitalize">
              {role}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isRoleMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft-lg p-2 z-50">
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
                        ? 'bg-institutional-50 dark:bg-institutional-950/60 border border-institutional-200 dark:border-institutional-800 text-institutional-900 dark:text-institutional-100' 
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 mt-0.5">
                      {r.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold truncate">{r.label}</p>
                        {role === r.id && <Check className="w-3.5 h-3.5 text-institutional-600 shrink-0 ml-1" />}
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
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          <span>Public Portal</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsRoleMenuOpen(false);
              setIsProfileMenuOpen(false);
            }}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors"
            title="Institutional Notices"
          >
            <Bell className="w-4 h-4" />
            {notices.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-institutional-600 rounded-full" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft-lg p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-mono">Circulars & Notices</span>
                <span className="text-[10px] text-institutional-600 dark:text-institutional-400 font-medium">{notices.length} Active</span>
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
                      <span className="uppercase font-mono font-semibold text-institutional-600 dark:text-institutional-400">{notice.category}</span>
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
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-300 transition-colors text-xs font-medium"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Dark</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Light</span>
            </>
          )}
        </button>

        {/* Profile User Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsProfileMenuOpen(!isProfileMenuOpen);
              setIsRoleMenuOpen(false);
              setIsNotifOpen(false);
            }}
            className="flex items-center gap-2 p-1 pl-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-300 dark:ring-slate-700"
            />
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft-lg p-2 z-50">
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
