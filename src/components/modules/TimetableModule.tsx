import React, { useState } from 'react';
import { 
  Calendar, Clock, Plus, Trash2, AlertTriangle, 
  CheckCircle, Filter, Building, User, BookOpen, MapPin, ShieldCheck 
} from 'lucide-react';
import { SoftCard } from '../common/SoftCard';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { PageHeader } from '../common/PageHeader';
import { Select } from '../common/Select';
import { useErpData } from '../../context/ErpDataContext';
import { useAuth } from '../../context/AuthContext';
import { TimetableSlot } from '../../types';

const SUBJECT_THEMES: Record<string, {
  border: string;
  badgeBg: string;
  badgeText: string;
  cardBg: string;
  dotBg: string;
  name: string;
}> = {
  CS501: {
    border: 'border-l-indigo-500 dark:border-l-indigo-400',
    badgeBg: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-200 border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-800 dark:text-indigo-200',
    cardBg: 'bg-indigo-50/50 dark:bg-indigo-950/20 hover:bg-indigo-50/80 dark:hover:bg-indigo-950/30',
    dotBg: 'bg-indigo-500',
    name: 'Operating Systems & Kernels',
  },
  CS502: {
    border: 'border-l-purple-500 dark:border-l-purple-400',
    badgeBg: 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-200 border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-800 dark:text-purple-200',
    cardBg: 'bg-purple-50/50 dark:bg-purple-950/20 hover:bg-purple-50/80 dark:hover:bg-purple-950/30',
    dotBg: 'bg-purple-500',
    name: 'Design & Analysis of Algorithms',
  },
  CS503: {
    border: 'border-l-sky-500 dark:border-l-sky-400',
    badgeBg: 'bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-200 border-sky-200 dark:border-sky-800',
    badgeText: 'text-sky-800 dark:text-sky-200',
    cardBg: 'bg-sky-50/50 dark:bg-sky-950/20 hover:bg-sky-50/80 dark:hover:bg-sky-950/30',
    dotBg: 'bg-sky-500',
    name: 'Database Management Systems',
  },
  CS504: {
    border: 'border-l-teal-500 dark:border-l-teal-400',
    badgeBg: 'bg-teal-100 text-teal-800 dark:bg-teal-950/80 dark:text-teal-200 border-teal-200 dark:border-teal-800',
    badgeText: 'text-teal-800 dark:text-teal-200',
    cardBg: 'bg-teal-50/50 dark:bg-teal-950/20 hover:bg-teal-50/80 dark:hover:bg-teal-950/30',
    dotBg: 'bg-teal-500',
    name: 'Machine Learning Foundations',
  },
  CS505: {
    border: 'border-l-amber-500 dark:border-l-amber-400',
    badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-200 border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-800 dark:text-amber-200',
    cardBg: 'bg-amber-50/50 dark:bg-amber-950/20 hover:bg-amber-50/80 dark:hover:bg-amber-950/30',
    dotBg: 'bg-amber-500',
    name: 'Operating Systems & Systems Lab',
  },
};

const DEFAULT_THEME = {
  border: 'border-l-institutional-500 dark:border-l-institutional-400',
  badgeBg: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700',
  badgeText: 'text-slate-800 dark:text-slate-200',
  cardBg: 'bg-slate-50/60 dark:bg-slate-900/30 hover:bg-slate-100/60 dark:hover:bg-slate-900/50',
  dotBg: 'bg-institutional-500',
  name: '',
};

export const TimetableModule: React.FC = () => {
  const { timetable, faculty, subjects, addTimetableSlot, deleteTimetableSlot, checkTimetableConflict } = useErpData();
  const { hasPermission } = useAuth();

  const [selectedBatch, setSelectedBatch] = useState<string>('B.Tech CSE - 2024 Sec A');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [conflictError, setConflictError] = useState<string | null>(null);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  // New slot form state
  const [newSlot, setNewSlot] = useState({
    day: 'Monday' as TimetableSlot['day'],
    period: 1,
    startTime: '09:00 AM',
    endTime: '09:55 AM',
    batch: 'B.Tech CSE - 2024 Sec A',
    semester: 5,
    subjectCode: 'CS501',
    subjectName: 'Operating Systems & Kernels',
    facultyId: 'fac-01',
    facultyName: 'Dr. Meera Nambiar',
    roomNumber: 'LH-301 (Aryabhata Hall)'
  });

  const days: TimetableSlot['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const periods = [1, 2, 3, 4, 5, 6];

  const periodTimes: Record<number, { start: string; end: string }> = {
    1: { start: '09:00 AM', end: '09:55 AM' },
    2: { start: '10:00 AM', end: '10:55 AM' },
    3: { start: '11:15 AM', end: '12:10 PM' },
    4: { start: '01:15 PM', end: '02:10 PM' },
    5: { start: '02:15 PM', end: '03:10 PM' },
    6: { start: '03:15 PM', end: '04:10 PM' },
  };

  const handleSubjectChange = (subjectCode: string) => {
    const sub = subjects.find(s => s.code === subjectCode);
    if (!sub) return;
    const fac = faculty.find(f => f.id === sub.assignedFacultyId) || faculty[0];
    setNewSlot({
      ...newSlot,
      subjectCode: sub.code,
      subjectName: sub.name,
      facultyId: fac.id,
      facultyName: fac.fullName
    });
  };

  const handlePeriodChange = (periodNum: number) => {
    setNewSlot({
      ...newSlot,
      period: periodNum,
      startTime: periodTimes[periodNum].start,
      endTime: periodTimes[periodNum].end
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConflictError(null);

    const res = addTimetableSlot(newSlot);
    if (!res.success) {
      setConflictError(res.message);
      return;
    }

    setSuccessBanner('Lecture slot scheduled without room or faculty conflicts.');
    setIsAddModalOpen(false);
    setTimeout(() => setSuccessBanner(null), 4000);
  };

  const canManage = hasPermission('manage_timetable');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Timetable & Conflict-Free Scheduling Matrix"
        subtitle="Automated clash prevention for faculty allocation, hall capacity, and batch sequencing"
        icon={<Calendar className="w-5 h-5" />}
        actions={
          canManage && (
            <Button
              variant="primary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => {
                setConflictError(null);
                setIsAddModalOpen(true);
              }}
            >
              Schedule Class Slot
            </Button>
          )
        }
      />

      {successBanner && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">{successBanner}</span>
          </div>
          <button onClick={() => setSuccessBanner(null)} className="text-emerald-600 font-bold">✕</button>
        </div>
      )}

      {/* Batch selector & subject legend card */}
      <SoftCard className="overflow-hidden border border-slate-200 dark:border-slate-800 shadow-soft">
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold font-serif text-white">
              Academic Timetable Parameters &amp; Course Legend
            </h3>
            <p className="text-xs text-sky-200/80 mt-0.5">
              Select department cohort, view faculty allocations, and verify conflict-free scheduling
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/10 border border-white/20 select-none w-fit">
            <span className="text-[11px] font-mono text-sky-100 font-semibold">Clash Detection Guard:</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE
            </span>
          </div>
        </div>

        <div className="p-5 space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Active Academic Cohort:</span>
              <Select
                className="w-64"
                value={selectedBatch}
                onChange={val => setSelectedBatch(val)}
                options={[
                  { value: 'B.Tech CSE - 2024 Sec A', label: 'B.Tech CSE - 2024 Sec A (Semester 5)' },
                  { value: 'B.Tech AI - 2024 Sec A', label: 'B.Tech AI - 2024 Sec A (Semester 5)' },
                  { value: 'B.Tech ECE - 2024 Sec A', label: 'B.Tech ECE - 2024 Sec A (Semester 5)' },
                ]}
              />
            </div>
          </div>

          {/* Quick Subject Color Legend */}
          <div className="flex flex-wrap items-center gap-2 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[11px]">
            <span className="text-slate-400 dark:text-slate-500 font-semibold text-[10px] uppercase tracking-wider">
              Subject Legend:
            </span>
            {Object.entries(SUBJECT_THEMES).map(([code, t]) => (
              <span 
                key={code} 
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md font-mono text-[10px] font-bold ${t.badgeBg} border shadow-2xs`}
                title={t.name}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${t.dotBg}`} />
                {code}: {t.name.split(' ')[0]}
              </span>
            ))}
          </div>
        </div>
      </SoftCard>

      {/* Timetable Weekly Matrix Table */}
      <SoftCard className="overflow-hidden border border-slate-200 dark:border-slate-800 shadow-soft">
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold font-serif text-white">
              Weekly Lecture Schedule Matrix ({selectedBatch})
            </h3>
            <p className="text-xs text-sky-200/80 mt-0.5">
              Monday through Friday • 6 Periods Daily • Conflict-Free Allocations
            </p>
          </div>
          <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-white/10 text-white border border-white/20">
            Fall Term 2026
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-left text-xs border-collapse min-w-[760px] lg:min-w-0">
            <thead>
              <tr className="bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white font-semibold border-b border-blue-500/25">
                <th className="p-2 w-[10%] min-w-[65px] text-center font-mono uppercase text-[10px] text-white">Day</th>
                {periods.map(p => (
                  <th key={p} className="p-2 text-center border-l border-blue-400/20 w-[15%] min-w-[110px]">
                    <span className="inline-block px-1.5 py-0.5 rounded bg-white/15 text-white text-xs font-bold font-sans shadow-2xs border border-white/15">
                      Period {p}
                    </span>
                    <span className="block font-normal text-[10px] text-sky-200/80 font-mono mt-0.5 whitespace-nowrap">
                      {periodTimes[p].start.replace(':00', '')} – {periodTimes[p].end.replace(':00', '')}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {days.map(day => (
                <tr key={day} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="p-2 text-center bg-slate-50/70 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800">
                    <div className="space-y-0.5">
                      <span className="inline-block px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-700/60 font-mono font-bold text-[10px] uppercase text-slate-700 dark:text-slate-200">
                        {day.slice(0, 3)}
                      </span>
                      <span className="block text-[11px] font-bold font-sans text-slate-800 dark:text-slate-200">
                        {day}
                      </span>
                    </div>
                  </td>
                  {periods.map(period => {
                    const slot = timetable.find(s => s.day === day && s.period === period && s.batch === selectedBatch);
                    const theme = slot ? (SUBJECT_THEMES[slot.subjectCode] || DEFAULT_THEME) : DEFAULT_THEME;
                    return (
                      <td key={period} className="p-1 border-l border-slate-200 dark:border-slate-800 align-top">
                        {slot ? (
                          <div className={`p-1.5 rounded-lg border border-slate-200/80 dark:border-slate-700/80 ${theme.cardBg} ${theme.border} border-l-[3px] shadow-2xs hover:shadow-soft transition-all min-h-[70px] flex flex-col justify-between group relative`}>
                            {/* Top row: Subject Code Tag + Session Type (Theory/Lab) + Delete Action */}
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-0.5">
                                <span className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded font-mono text-[9px] font-bold ${theme.badgeBg} border leading-tight shadow-2xs`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${theme.dotBg}`} />
                                  {slot.subjectCode}
                                </span>
                                <div className="flex items-center gap-1">
                                  <span className="text-[8.5px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                    {slot.roomNumber.toLowerCase().includes('lab') ? 'Lab' : 'Lec'}
                                  </span>
                                  {canManage && (
                                    <button
                                      onClick={() => deleteTimetableSlot(slot.id)}
                                      className="p-0.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-all opacity-0 group-hover:opacity-100"
                                      title="Remove slot"
                                    >
                                      <Trash2 className="w-2.5 h-2.5" />
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* Subject Title */}
                              <h4 className="text-[10px] font-bold text-slate-900 dark:text-white leading-tight truncate" title={slot.subjectName}>
                                {slot.subjectName}
                              </h4>
                            </div>

                            {/* Bottom row: Professor & Room Details */}
                            <div className="pt-0.5 mt-0.5 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between gap-1 text-[9px]">
                              <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 min-w-0">
                                <User className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                                <span className="truncate font-medium text-[9px]" title={slot.facultyName}>
                                  {slot.facultyName.replace('Dr. ', '').replace('Prof. ', '')}
                                </span>
                              </div>
                              <span className="font-mono text-[8.5px] text-slate-400 dark:text-slate-500 shrink-0" title={slot.roomNumber}>
                                {slot.roomNumber.split('(')[0].replace('Hall', '').trim()}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="min-h-[70px] h-full rounded-lg border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/25 dark:bg-slate-900/15 flex flex-col items-center justify-center gap-0.5 text-slate-400 dark:text-slate-600 group hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                            <Clock className="w-3 h-3 text-slate-300 dark:text-slate-700 group-hover:text-slate-400 transition-colors" />
                            <span className="text-[9px] font-medium">Free</span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SoftCard>

      {/* Add Slot Modal with Live Conflict Warning */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Schedule Class Slot & Validate Conflicts"
        subtitle="Automatic real-time conflict verification against classroom and professor availability"
        maxWidth="lg"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
          {conflictError && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Scheduling Conflict Detected</span>
                <p className="text-[11px] mt-0.5">{conflictError}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Day of Week</label>
              <Select
                className="w-full"
                value={newSlot.day}
                onChange={val => setNewSlot({ ...newSlot, day: val as any })}
                options={days.map(d => ({ value: d, label: d }))}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Period Slot</label>
              <Select
                className="w-full"
                value={newSlot.period.toString()}
                onChange={val => handlePeriodChange(parseInt(val))}
                options={periods.map(p => ({
                  value: p.toString(),
                  label: `Period ${p} (${periodTimes[p].start} - ${periodTimes[p].end})`
                }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Subject</label>
              <Select
                className="w-full"
                value={newSlot.subjectCode}
                onChange={val => handleSubjectChange(val)}
                options={subjects.map(s => ({
                  value: s.code,
                  label: `${s.code}: ${s.name}`
                }))}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Classroom / Laboratory</label>
              <Select
                className="w-full"
                value={newSlot.roomNumber}
                onChange={val => setNewSlot({ ...newSlot, roomNumber: val })}
                options={[
                  { value: 'LH-301 (Aryabhata Hall)', label: 'LH-301 (Aryabhata Hall)' },
                  { value: 'LH-302 (Ramanujan Hall)', label: 'LH-302 (Ramanujan Hall)' },
                  { value: 'CS Advanced Lab 2', label: 'CS Advanced Lab 2' },
                  { value: 'AI Neural Computing Lab', label: 'AI Neural Computing Lab' },
                  { value: 'Seminar Hall 1', label: 'Seminar Hall 1' },
                ]}
              />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-[11px] space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-500">Assigned Faculty:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{newSlot.facultyName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Target Cohort:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{newSlot.batch}</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Validate &amp; Confirm Slot
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
