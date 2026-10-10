import React from 'react';
import { 
  LayoutDashboard, Users, GraduationCap, Calendar, Clock, 
  Award, CreditCard, UserPlus, Bot, AlertTriangle, FileText, 
  ShieldAlert, Activity, ChevronLeft, ChevronRight, School
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  group: 'Overview' | 'Academic Core' | 'Operations' | 'Intelligence' | 'Governance';
  roles: ('principal' | 'faculty' | 'student' | 'accountant')[];
}

interface SidebarProps {
  activeModule: string;
  onSelectModule: (moduleId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const NAV_ITEMS: NavItem[] = [
  // Overview
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, group: 'Overview', roles: ['principal', 'faculty', 'student', 'accountant'] },
  { id: 'notices', label: 'Circulars & Notices', icon: <FileText className="w-4 h-4" />, group: 'Overview', roles: ['principal', 'faculty', 'student', 'accountant'] },

  // Academic Core
  { id: 'students', label: 'Students Registry', icon: <GraduationCap className="w-4 h-4" />, group: 'Academic Core', roles: ['principal', 'faculty', 'student', 'accountant'] },
  { id: 'faculty', label: 'Faculty & Workload', icon: <Users className="w-4 h-4" />, group: 'Academic Core', roles: ['principal', 'faculty'] },
  { id: 'timetable', label: 'Timetable & Scheduling', icon: <Calendar className="w-4 h-4" />, group: 'Academic Core', roles: ['principal', 'faculty', 'student'] },

  // Operations
  { id: 'attendance', label: 'Attendance Manager', icon: <Clock className="w-4 h-4" />, group: 'Operations', roles: ['principal', 'faculty', 'student'] },
  { id: 'examinations', label: 'Exams & Gradebook', icon: <Award className="w-4 h-4" />, group: 'Operations', roles: ['principal', 'faculty', 'student'] },
  { id: 'finance', label: 'Treasury & Fee Ledger', icon: <CreditCard className="w-4 h-4" />, group: 'Operations', roles: ['principal', 'accountant', 'student'] },
  { id: 'admissions', label: 'Admissions Funnel', icon: <UserPlus className="w-4 h-4" />, group: 'Operations', roles: ['principal'] },

  // Intelligence
  { id: 'ai-assistant', label: 'Policy Assistant', icon: <Bot className="w-4 h-4" />, group: 'Intelligence', roles: ['principal', 'faculty', 'student', 'accountant'] },
  { id: 'risk-detector', label: 'Academic Risk Radar', icon: <AlertTriangle className="w-4 h-4" />, group: 'Intelligence', roles: ['principal', 'faculty'] },

  // Governance
  { id: 'audit-logs', label: 'Audit Trail & Security', icon: <ShieldAlert className="w-4 h-4" />, group: 'Governance', roles: ['principal', 'accountant'] },
  { id: 'system-health', label: 'System Health & DevOps', icon: <Activity className="w-4 h-4" />, group: 'Governance', roles: ['principal'] }
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  onSelectModule,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile
}) => {
  const { currentUser } = useAuth();

  const authorizedItems = NAV_ITEMS.filter(item => item.roles.includes(currentUser.role));
  const groups: NavItem['group'][] = ['Overview', 'Academic Core', 'Operations', 'Intelligence', 'Governance'];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity" 
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Floating Border Expand Toggle (Visible only in collapsed mode on desktop) */}
        {isCollapsed && (
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex absolute -right-3 top-5 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md items-center justify-center text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 z-50 transition-all hover:scale-105 active:scale-95"
            title="Expand navigation"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Brand Header */}
        <div className={`h-16 flex items-center border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 ${
          isCollapsed ? 'justify-center px-2' : 'justify-between px-4'
        }`}>
          {isCollapsed ? (
            <div className="w-9 h-9 rounded-lg bg-institutional-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
              <School className="w-5 h-5 text-white" />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-9 h-9 rounded-lg bg-institutional-600 flex items-center justify-center text-white font-bold text-base shadow-sm shrink-0">
                  <School className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white truncate">
                    CHANAKYA ERP
                  </h1>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wider truncate uppercase">
                    Enterprise SIS 2.0
                  </p>
                </div>
              </div>

              <button
                onClick={onToggleCollapse}
                className="hidden lg:flex p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
                title="Collapse navigation"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Grouped Nav List */}
        <div className={`flex-1 overflow-y-auto py-4 space-y-6 ${isCollapsed ? 'px-2' : 'px-3'}`}>
          {groups.map(groupName => {
            const groupItems = authorizedItems.filter(item => item.group === groupName);
            if (groupItems.length === 0) return null;

            return (
              <div key={groupName} className="space-y-1">
                {!isCollapsed && (
                  <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    {groupName}
                  </p>
                )}
                <div className="space-y-0.5">
                  {groupItems.map(item => {
                    const isActive = activeModule === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectModule(item.id);
                          onCloseMobile();
                        }}
                        title={isCollapsed ? item.label : undefined}
                        className={`w-full flex items-center transition-all duration-150 group relative outline-none focus:outline-none focus:ring-0 ${
                          isCollapsed
                            ? 'justify-center p-2.5 rounded-xl'
                            : 'gap-3 px-3 py-2.5 rounded-xl'
                        } ${
                          isActive
                            ? 'bg-institutional-50/90 dark:bg-institutional-950/70 text-institutional-700 dark:text-institutional-200 font-semibold'
                            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-medium hover:bg-slate-100/70 dark:hover:bg-slate-800/40'
                        }`}
                      >
                        {/* Active vertical accent pill on left edge */}
                        {isActive && (
                          <span 
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-institutional-600 dark:bg-institutional-400"
                            aria-hidden="true"
                          />
                        )}

                        <span className={`${
                          isActive 
                            ? 'text-institutional-600 dark:text-institutional-400' 
                            : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300'
                        } shrink-0 transition-colors flex items-center justify-center w-5 h-5`}>
                          {item.icon}
                        </span>

                        {!isCollapsed && (
                          <span className="truncate flex-1 text-left font-sans font-medium text-[13px] leading-snug">
                            {item.label}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* User Card at Bottom */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/90">
          <div className={`flex items-center gap-3 p-2 rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 ${isCollapsed ? 'justify-center p-1.5' : ''}`}>
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0"
            />
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{currentUser.name}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 capitalize truncate">{currentUser.role} Portal</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
