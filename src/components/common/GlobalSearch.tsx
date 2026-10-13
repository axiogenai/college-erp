import React, { useState, useEffect } from 'react';
import { Search, User, GraduationCap, FileText, Calendar, Shield, CreditCard, ChevronRight, X } from 'lucide-react';
import { useErpData } from '../../context/ErpDataContext';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (module: string, param?: string) => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const { students, faculty, feeInvoices, notices } = useErpData();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQ = query.trim().toLowerCase();

  const filteredStudents = cleanQ
    ? students.filter(s => s.fullName.toLowerCase().includes(cleanQ) || s.enrollmentId.toLowerCase().includes(cleanQ) || s.department.toLowerCase().includes(cleanQ)).slice(0, 4)
    : [];

  const filteredFaculty = cleanQ
    ? faculty.filter(f => f.fullName.toLowerCase().includes(cleanQ) || f.employeeId.toLowerCase().includes(cleanQ) || f.department.toLowerCase().includes(cleanQ)).slice(0, 3)
    : [];

  const filteredInvoices = cleanQ
    ? feeInvoices.filter(i => i.invoiceNumber.toLowerCase().includes(cleanQ) || i.studentName.toLowerCase().includes(cleanQ)).slice(0, 3)
    : [];

  const filteredNotices = cleanQ
    ? notices.filter(n => n.title.toLowerCase().includes(cleanQ) || n.referenceNumber.toLowerCase().includes(cleanQ)).slice(0, 3)
    : [];

  const defaultNavigationItems = [
    { label: 'Executive Principal Dashboard', module: 'dashboard', icon: <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" /> },
    { label: 'Students Academic Registry', module: 'students', icon: <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" /> },
    { label: 'Faculty Directory & Workload', module: 'faculty', icon: <User className="w-4 h-4 text-blue-600 dark:text-blue-400" /> },
    { label: 'Timetable & Room Scheduling', module: 'timetable', icon: <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" /> },
    { label: 'Fee Invoices & Student Ledger', module: 'finance', icon: <CreditCard className="w-4 h-4 text-blue-600 dark:text-blue-400" /> },
    { label: 'Official Circulars & Senate Notices', module: 'notices', icon: <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" /> },
  ];

  const handleSelect = (module: string, param?: string) => {
    onNavigate(module, param);
    onClose();
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity" onClick={onClose} />

      <div className="relative mx-auto max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-[#121215] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.08)] border border-neutral-200 dark:border-white/[0.08] transition-all">
        {/* Oxford Navy Dialog Chrome */}
        <div className="px-5 py-2.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-sky-300" />
            <span className="text-xs font-bold font-serif text-white tracking-wide uppercase">
              Axiogen Enterprise Global Search
            </span>
          </div>
          <span className="text-[10px] font-mono text-sky-200 bg-white/10 px-2 py-0.5 rounded border border-white/15">
            ESC to Exit
          </span>
        </div>

        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-neutral-200 dark:border-white/[0.06] bg-neutral-50 dark:bg-[#161619]">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            className="w-full bg-transparent text-sm placeholder:text-slate-400 text-slate-900 dark:text-slate-100 focus:outline-none"
            placeholder="Search students, faculty, invoices, circulars or jump to module... (Esc to close)"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-3 text-sm">
          {!cleanQ && (
            <div>
              <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Quick Navigation
              </p>
              <div className="space-y-1">
                {defaultNavigationItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(item.module)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="font-medium text-xs sm:text-sm">{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {cleanQ && (
            <div className="space-y-4">
              {/* Students */}
              {filteredStudents.length > 0 && (
                <div>
                  <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Students ({filteredStudents.length})
                  </p>
                  <div className="space-y-1 mt-1">
                    {filteredStudents.map(s => (
                      <button
                        key={s.id}
                        onClick={() => handleSelect('students', s.id)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <GraduationCap className="w-4 h-4 text-institutional-600" />
                          <div>
                            <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{s.fullName}</p>
                            <p className="text-[11px] text-slate-500">{s.enrollmentId} • {s.department}</p>
                          </div>
                        </div>
                        <span className="text-xs text-institutional-600 dark:text-institutional-400 font-medium">View Registry →</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Faculty */}
              {filteredFaculty.length > 0 && (
                <div>
                  <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Faculty ({filteredFaculty.length})
                  </p>
                  <div className="space-y-1 mt-1">
                    {filteredFaculty.map(f => (
                      <button
                        key={f.id}
                        onClick={() => handleSelect('faculty', f.id)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <User className="w-4 h-4 text-sky-600" />
                          <div>
                            <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{f.fullName}</p>
                            <p className="text-[11px] text-slate-500">{f.employeeId} • {f.designation}</p>
                          </div>
                        </div>
                        <span className="text-xs text-sky-600 dark:text-sky-400 font-medium">View Profile →</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Invoices */}
              {filteredInvoices.length > 0 && (
                <div>
                  <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Finance & Invoices ({filteredInvoices.length})
                  </p>
                  <div className="space-y-1 mt-1">
                    {filteredInvoices.map(inv => (
                      <button
                        key={inv.id}
                        onClick={() => handleSelect('finance')}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <CreditCard className="w-4 h-4 text-amber-600" />
                          <div>
                            <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{inv.invoiceNumber} - {inv.studentName}</p>
                            <p className="text-[11px] text-slate-500">Balance: INR {inv.balanceAmount.toLocaleString()} • Status: <span className="capitalize font-medium">{inv.status}</span></p>
                          </div>
                        </div>
                        <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">Open Ledger →</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Circulars */}
              {filteredNotices.length > 0 && (
                <div>
                  <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Circulars & Notices ({filteredNotices.length})
                  </p>
                  <div className="space-y-1 mt-1">
                    {filteredNotices.map(n => (
                      <button
                        key={n.id}
                        onClick={() => handleSelect('notices')}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <FileText className="w-4 h-4 text-rose-600" />
                          <div>
                            <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{n.title}</p>
                            <p className="text-[11px] text-slate-500">{n.referenceNumber} • {n.category}</p>
                          </div>
                        </div>
                        <span className="text-xs text-rose-600 dark:text-rose-400 font-medium">Read Notice →</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredStudents.length === 0 && filteredFaculty.length === 0 && filteredInvoices.length === 0 && filteredNotices.length === 0 && (
                <div className="text-center py-8 text-slate-400">
                  <p className="text-xs">No institutional records matching &ldquo;{query}&rdquo;</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="bg-slate-50 dark:bg-slate-800/60 px-4 py-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-[10px]">Esc</kbd> to exit</span>
          <span>Axiogen Institute Knowledge Index</span>
        </div>
      </div>
    </div>
  );
};
