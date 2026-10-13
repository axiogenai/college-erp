import React, { useState } from 'react';
import { 
  Calendar, Clock, BookOpen, CheckSquare, Award, 
  GraduationCap, Users, ArrowRight, CheckCircle2, ChevronRight, MapPin 
} from 'lucide-react';
import { SoftCard } from '../common/SoftCard';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useErpData } from '../../context/ErpDataContext';
import { useAuth } from '../../context/AuthContext';

interface FacultyDashboardProps {
  onNavigate: (module: string) => void;
}

export const FacultyDashboard: React.FC<FacultyDashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { timetable, subjects, examRecords, attendanceSessions } = useErpData();

  // Find classes today for faculty
  const todayDay = 'Monday'; // Default simulation for active day
  const facultyClassesToday = timetable.filter(
    slot => slot.facultyId === 'fac-01' || slot.facultyName.includes('Meera')
  );

  const facultySubjects = subjects.filter(
    s => s.assignedFacultyId === 'fac-01' || s.code.startsWith('CS5')
  );

  const pendingMarksExams = examRecords.filter(
    e => e.status === 'under_review' || e.status === 'draft'
  );

  return (
    <div className="space-y-6">
      {/* Welcome & Faculty Meta Banner */}
      <SoftCard className="overflow-hidden border border-slate-200 dark:border-slate-800 shadow-soft">
        <div className="px-5 py-3 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-between">
          <h3 className="text-xs font-bold font-serif text-white tracking-wide uppercase">
            Faculty Academic Dossier &amp; Department Leadership
          </h3>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-white/10 text-white/85 border border-white/15 px-2 py-0.5 rounded">
            Active Status: Verified
          </span>
        </div>

        <div className="p-5 sm:p-6 bg-white dark:bg-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#0F2942] dark:ring-sky-400 shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">{currentUser.name}</h2>
                  <Badge variant="primary" size="sm">Dean Academics</Badge>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  {currentUser.department} • Employee ID: {currentUser.employeeId || 'FAC-CSE-014'}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-1">
                  Weekly Teaching Load: 14 Hours/Week • 3 Active Subjects
                </p>
              </div>
            </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              icon={<Clock className="w-4 h-4" />}
              onClick={() => onNavigate('attendance')}
            >
              Take Attendance Now
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon={<Award className="w-4 h-4" />}
              onClick={() => onNavigate('examinations')}
            >
              Marks Gradebook
            </Button>
          </div>
        </div>
      </div>
    </SoftCard>

      {/* KPI Stats for Faculty */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Scheduled Lectures Today"
          value={facultyClassesToday.length.toString()}
          trend="neutral"
          subtitle="Next: CS501 (09:00 AM) LH-301"
          colorScheme="institutional"
          icon={<Clock className="w-5 h-5" />}
        />
        <StatCard
          title="Assigned Subjects"
          value={facultySubjects.length.toString()}
          trend="neutral"
          subtitle="CS501, CS503, CS505 Lab"
          colorScheme="indigo"
          icon={<BookOpen className="w-5 h-5" />}
        />
        <StatCard
          title="Syllabus Completion"
          value="75.3%"
          change="+12% this month"
          trend="up"
          subtitle="Target for Mid-Term: 70%"
          colorScheme="gold"
          icon={<CheckSquare className="w-5 h-5" />}
        />
        <StatCard
          title="Marks Evaluation Queue"
          value={pendingMarksExams.length.toString()}
          change="Pending Review"
          trend="down"
          subtitle="Mid-Term 2 Papers"
          colorScheme="institutional"
          icon={<Award className="w-5 h-5" />}
        />
      </div>

      {/* Two Column Layout: Today's Lectures & Syllabus Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Today's Lectures with One-Click Attendance */}
        <div className="lg:col-span-7 space-y-6">
          <SoftCard className="overflow-hidden">
            <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-300" />
                <h3 className="text-sm font-semibold tracking-tight text-white">
                  Today&rsquo;s Teaching Timetable (Monday)
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-white/10 text-white/85 border border-white/15 px-2 py-0.5 rounded">
                Fall Term
              </span>
            </div>

            <div className="p-5 space-y-2.5">
              {facultyClassesToday.map((slot, idx) => (
                <div 
                  key={slot.id} 
                  className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-institutional-50 dark:bg-institutional-950/60 border border-institutional-200/60 dark:border-institutional-800/60 flex flex-col items-center justify-center font-mono shrink-0">
                      <span className="text-[10px] text-institutional-600 dark:text-institutional-400 uppercase font-semibold leading-none">Slot</span>
                      <span className="text-xs font-bold text-institutional-900 dark:text-institutional-100 leading-tight">P{slot.period}</span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate">
                          {slot.subjectCode} — {slot.subjectName}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                          {slot.startTime} – {slot.endTime}
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span className="truncate">{slot.batch}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    <span className="whitespace-nowrap shrink-0 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50">
                      <MapPin className="w-3 h-3 mr-1 text-slate-400 shrink-0 inline" />
                      {slot.roomNumber}
                    </span>

                    <Button
                      variant={idx === 0 ? "primary" : "outline"}
                      size="sm"
                      className="shrink-0 min-w-[130px] justify-center"
                      onClick={() => onNavigate('attendance')}
                    >
                      {idx === 0 ? "Mark Attendance" : "Session Sheet"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </SoftCard>

          {/* Pending Marks Entry Queue */}
          <SoftCard className="overflow-hidden">
            <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-300" />
                <h3 className="text-sm font-semibold tracking-tight text-white">
                  Gradebook Evaluation Queue
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-200 border border-amber-400/30 px-2 py-0.5 rounded">
                {pendingMarksExams.length} Exams Pending
              </span>
            </div>

            <div className="p-5">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {pendingMarksExams.map(exam => (
                  <div key={exam.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{exam.examName}</p>
                      <p className="text-[11px] text-slate-500">
                        {exam.subjectCode} • Max Marks: {exam.maxMarks} • Evaluated: {exam.marks.length} candidates
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onNavigate('examinations')}
                    >
                      Open Gradebook
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </SoftCard>
        </div>

        {/* Right: Assigned Subjects & Syllabus Tracker */}
        <div className="lg:col-span-5 space-y-6">
          <SoftCard className="overflow-hidden">
            <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-tight text-white">
                Syllabus Completion Tracker
              </h3>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-white/10 text-white/85 border border-white/15 px-2 py-0.5 rounded">
                Mid-Term Phase
              </span>
            </div>

            <div className="p-5">
              <div className="space-y-4 text-xs">
              {facultySubjects.map(sub => (
                <div key={sub.id} className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{sub.code}: {sub.name}</span>
                      <span className="text-[10px] text-slate-400 block">{sub.type} • {sub.credits} Credits</span>
                    </div>
                    <span className="font-mono font-bold text-institutional-700 dark:text-institutional-300">
                      {sub.syllabusCompletion}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        sub.syllabusCompletion >= 75 ? 'bg-emerald-500' :
                        sub.syllabusCompletion >= 60 ? 'bg-institutional-600' :
                        'bg-amber-500'
                      }`}
                      style={{ width: `${sub.syllabusCompletion}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => onNavigate('timetable')}
              >
                View Full Department Timetable Grid
              </Button>
            </div>
          </div>
        </SoftCard>

        {/* Student Counseling Alert */}
        <SoftCard className="overflow-hidden border border-slate-200 dark:border-slate-800 shadow-soft">
          <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-amber-300" />
              <h4 className="text-xs font-bold font-serif text-white uppercase tracking-wider">
                Academic Counseling Alert
              </h4>
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-200 border border-amber-400/30 px-2 py-0.5 rounded">
              Action Needed
            </span>
          </div>
          <div className="p-5">
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Student <strong>Rohan Deshmukh (STU-2024-CS-088)</strong> has fallen below the 75% attendance threshold in CS501 (Current: 68.4%). An automated attendance shortage notice has been queued for parental notification.
            </p>
            <div className="mt-3">
              <Button
                variant="outline"
                size="sm"
                className="text-[11px]"
                onClick={() => onNavigate('risk-detector')}
              >
                Open Academic Risk Dossier
              </Button>
            </div>
          </div>
        </SoftCard>
      </div>
      </div>
    </div>
  );
};
