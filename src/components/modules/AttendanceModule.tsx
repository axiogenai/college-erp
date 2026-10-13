import React, { useState } from 'react';
import { 
  Clock, CheckCircle, AlertTriangle, Users, 
  Calendar, Check, Filter, Search, CheckCircle2, 
  XCircle, X, ShieldCheck 
} from 'lucide-react';
import { SoftCard } from '../common/SoftCard';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { PageHeader } from '../common/PageHeader';
import { Select } from '../common/Select';
import { useErpData } from '../../context/ErpDataContext';
import { useAuth } from '../../context/AuthContext';
import { AttendanceStatus } from '../../types';

export const AttendanceModule: React.FC = () => {
  const { 
    students, subjects, timetable, attendanceSessions, 
    recordAttendanceSession 
  } = useErpData();
  const { currentUser, hasPermission } = useAuth();

  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>('CS501');
  const [selectedPeriod, setSelectedPeriod] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedBatch, setSelectedBatch] = useState<string>('B.Tech CSE - 2024 Sec A');

  // Attendance marking state (studentId -> status)
  const targetStudents = students.filter(s => {
    if (selectedBatch.includes('CSE')) return s.department === 'Computer Science & Engineering';
    if (selectedBatch.includes('AI')) return s.department.includes('Artificial Intelligence') || s.department.includes('AI');
    if (selectedBatch.includes('ECE')) return s.department.includes('Electronics');
    return true;
  });

  const [roster, setRoster] = useState<Record<string, AttendanceStatus>>(() => {
    const initial: Record<string, AttendanceStatus> = {};
    students.forEach(s => {
      initial[s.id] = 'present';
    });
    return initial;
  });

  React.useEffect(() => {
    setRoster(prev => {
      const updated = { ...prev };
      targetStudents.forEach(s => {
        if (!updated[s.id]) updated[s.id] = 'present';
      });
      return updated;
    });
  }, [selectedBatch]);

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const toggleStudentStatus = (studentId: string, status: AttendanceStatus) => {
    setRoster(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleMarkAll = (status: AttendanceStatus) => {
    const updated: Record<string, AttendanceStatus> = {};
    targetStudents.forEach(s => {
      updated[s.id] = status;
    });
    setRoster(updated);
  };

  const handleSaveAttendance = () => {
    const currentSubject = subjects.find(s => s.code === selectedSubjectCode);
    const entries = targetStudents.map(s => ({
      studentId: s.id,
      enrollmentId: s.enrollmentId,
      studentName: s.fullName,
      status: roster[s.id] || 'present'
    }));

    const sessionPayload = {
      date: selectedDate,
      period: selectedPeriod,
      subjectCode: selectedSubjectCode,
      subjectName: currentSubject ? currentSubject.name : 'Computer Science Lecture',
      semester: currentSubject ? currentSubject.semester : 5,
      batch: selectedBatch,
      facultyId: currentUser.id,
      facultyName: currentUser.name,
      entries
    };

    const result = recordAttendanceSession(sessionPayload);
    if (result.success) {
      setFeedback({ type: 'success', message: result.message });
    } else {
      setFeedback({ type: 'error', message: result.message });
    }

    setTimeout(() => setFeedback(null), 5000);
  };

  const canMark = hasPermission('mark_attendance');
  const presentCount = targetStudents.filter(s => (roster[s.id] || 'present') === 'present').length;
  const absentCount = targetStudents.filter(s => roster[s.id] === 'absent').length;
  const lateCount = targetStudents.filter(s => roster[s.id] === 'late').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title="Attendance Ledger & Statutory Thresholds"
        subtitle="Institutional session registry with real-time duplicate validation and mandatory compliance audit (75% threshold)"
        icon={<Clock className="w-5 h-5" />}
      />

      {feedback && (
        <div className={`p-4 rounded-xl border text-xs flex items-center justify-between transition-all ${
          feedback.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200 dark:border-emerald-800'
            : 'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/50 dark:text-rose-200 dark:border-rose-800'
        }`}>
          <div className="flex items-center gap-2.5">
            {feedback.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600" />
            )}
            <span className="font-semibold">{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-slate-700 text-sm font-semibold">✕</button>
        </div>
      )}

      {/* Session Parameters Selector */}
      <SoftCard className="border border-slate-200 dark:border-slate-800 shadow-soft">
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-t-xl">
          <div>
            <h3 className="text-sm font-bold text-white font-serif">
              Session Parameters
            </h3>
            <p className="text-xs text-sky-200/80 mt-0.5">
              Select course offering, lecture schedule, and target cohort
            </p>
          </div>
          <span className="text-xs font-mono text-sky-100 bg-white/10 px-2.5 py-1 rounded-md border border-white/15 w-fit">
            Instructor: {currentUser.name}
          </span>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Course / Subject</label>
              <Select
                className="w-full"
                value={selectedSubjectCode}
                onChange={val => setSelectedSubjectCode(val)}
                options={subjects.map(s => ({
                  value: s.code,
                  label: `${s.code}: ${s.name}`
                }))}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Session Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-institutional-500 text-xs"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Period Slot</label>
              <Select
                className="w-full"
                value={selectedPeriod.toString()}
                onChange={val => setSelectedPeriod(parseInt(val))}
                options={[
                  { value: '1', label: 'Period 1 (09:00 AM - 09:55 AM)' },
                  { value: '2', label: 'Period 2 (10:00 AM - 10:55 AM)' },
                  { value: '3', label: 'Period 3 (11:15 AM - 12:10 PM)' },
                  { value: '4', label: 'Period 4 (01:15 PM - 02:10 PM)' },
                  { value: '5', label: 'Period 5 (02:15 PM - 03:10 PM)' },
                ]}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Target Cohort / Batch</label>
              <Select
                className="w-full"
                value={selectedBatch}
                onChange={val => setSelectedBatch(val)}
                options={[
                  { value: 'B.Tech CSE - 2024 Sec A', label: 'B.Tech CSE - 2024 Sec A' },
                  { value: 'B.Tech AI - 2024 Sec A', label: 'B.Tech AI - 2024 Sec A' },
                ]}
              />
            </div>
          </div>
        </div>
      </SoftCard>

      {/* Attendance Marking Roster */}
      <SoftCard className="overflow-hidden border border-slate-200 dark:border-slate-800 shadow-soft">
        <div className="px-6 py-4 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-sm font-bold text-white font-serif">
                Attendance Registry ({targetStudents.length} Scholars)
              </h3>
              <span className="text-[10px] font-mono text-white/90 bg-white/10 px-2.5 py-0.5 rounded border border-white/15">
                <strong className="text-white font-bold">{presentCount}</strong> Present • <strong className="text-white/80 font-bold">{absentCount}</strong> Absent
              </span>
            </div>
            <p className="text-xs text-sky-200/80 mt-0.5">
              Mark session statuses. Dynamic statutory compliance updates automatically.
            </p>
          </div>

          {canMark && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleMarkAll('present')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-[#5B1389] via-[#450D6F] to-[#350757] hover:from-[#6A17A0] hover:via-[#501082] hover:to-[#3E0966] text-white border border-purple-400/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),0_2px_8px_rgba(69,13,111,0.35)] transition-all active:scale-[0.985]"
                title="Mark all scholars present for this session"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-200" />
                <span>Mark All Present</span>
              </button>
              <button
                type="button"
                onClick={() => handleMarkAll('absent')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/15 text-white/90 border border-white/20 transition-all active:scale-[0.985]"
                title="Mark all scholars absent for this session"
              >
                <XCircle className="w-3.5 h-3.5 text-slate-300" />
                <span>Mark All Absent</span>
              </button>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white uppercase text-[11px] font-semibold tracking-wider border-b border-blue-500/25">
              <tr>
                <th className="px-4 py-3">Roll Number</th>
                <th className="px-4 py-3">Scholar Details</th>
                <th className="px-4 py-3 text-center">Cumulative Attendance</th>
                <th className="px-4 py-3 text-center">Statutory Status</th>
                <th className="px-4 py-3 text-right">Session State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {targetStudents.map(stu => {
                const currentStatus = roster[stu.id] || 'present';
                const isShortage = stu.attendancePercentage < 75;

                return (
                  <tr key={stu.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3.5 font-mono text-slate-700 dark:text-slate-300 text-xs font-semibold">
                      {stu.enrollmentId}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-semibold text-slate-900 dark:text-slate-100 block text-xs">{stu.fullName}</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">{stu.program}</span>
                    </td>
                    <td className="px-4 py-3.5 text-center font-mono">
                      <span className={`text-xs font-bold ${isShortage ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-slate-100'}`}>
                        {stu.attendancePercentage}%
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${
                        isShortage
                          ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-400/25'
                          : 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-400/25'
                      }`}>
                        {isShortage ? 'Shortage' : 'Eligible'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      {canMark ? (
                        <div className="inline-flex rounded-lg border border-slate-200/90 dark:border-slate-700/80 p-0.5 bg-slate-100/90 dark:bg-slate-800/90 shadow-2xs gap-0.5">
                          <button
                            type="button"
                            onClick={() => toggleStudentStatus(stu.id, 'present')}
                            className={`px-2.5 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${
                              currentStatus === 'present'
                                ? 'bg-[#0F2942] dark:bg-[#1B3F66] text-white shadow-xs'
                                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                            }`}
                            title="Mark Present"
                          >
                            {currentStatus === 'present' && <Check className="w-3 h-3 stroke-[2.5]" />}
                            <span>Present</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleStudentStatus(stu.id, 'absent')}
                            className={`px-2.5 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${
                              currentStatus === 'absent'
                                ? 'bg-rose-700 text-white shadow-xs'
                                : 'text-slate-600 hover:text-rose-700 dark:text-slate-400 dark:hover:text-rose-300'
                            }`}
                            title="Mark Absent"
                          >
                            {currentStatus === 'absent' && <X className="w-3 h-3 stroke-[2.5]" />}
                            <span>Absent</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleStudentStatus(stu.id, 'late')}
                            className={`px-2.5 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${
                              currentStatus === 'late'
                                ? 'bg-amber-700 text-white shadow-xs'
                                : 'text-slate-600 hover:text-amber-700 dark:text-slate-400 dark:hover:text-amber-300'
                            }`}
                            title="Mark Late"
                          >
                            {currentStatus === 'late' && <Clock className="w-3 h-3" />}
                            <span>Late</span>
                          </button>
                        </div>
                      ) : (
                        <span className="font-mono text-xs uppercase text-slate-500">{currentStatus}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {canMark && (
          <div className="px-6 py-4 bg-slate-50/70 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-institutional-600 dark:text-institutional-400 shrink-0" />
              <span>Duplicate verification active: checked across cohort, date, and assigned slot.</span>
            </div>
            <Button
              variant="primary"
              size="md"
              icon={<Check className="w-4 h-4" />}
              onClick={handleSaveAttendance}
              className="shadow-sm w-full sm:w-auto"
            >
              Commit &amp; Submit Session Attendance
            </Button>
          </div>
        )}
      </SoftCard>

      {/* Recent Attendance Session Logs */}
      <SoftCard className="overflow-hidden border border-slate-200 dark:border-slate-800 shadow-soft">
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white font-serif">
              Recent Institutional Session Logs
            </h3>
            <p className="text-xs text-sky-200/80 mt-0.5">
              Archived verified attendance roll calls
            </p>
          </div>
          <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-white/10 text-white border border-white/20">
            Archived Roll Calls
          </span>
        </div>

        <div className="p-6">
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {attendanceSessions.slice(0, 5).map(sess => (
            <div key={sess.id} className="py-3.5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{sess.subjectCode} — {sess.subjectName}</span>
                  <Badge variant="neutral" size="xs">Period {sess.period}</Badge>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 font-mono">
                  {sess.date} • {sess.batch} • Marked by {sess.facultyName}
                </p>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs font-semibold">
                  <span className="text-emerald-600 dark:text-emerald-400">{sess.totalPresent} Present</span> / <span className="text-rose-600 dark:text-rose-400">{sess.totalAbsent} Absent</span>
                </span>
                <span className="block text-[11px] text-slate-400 mt-0.5">
                  Total: {sess.totalStudents} Scholars
                </span>
              </div>
            </div>
          ))}
          </div>
        </div>
      </SoftCard>
    </div>
  );
};
