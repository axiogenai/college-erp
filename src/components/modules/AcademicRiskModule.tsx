import React, { useState, useMemo } from 'react';
import { 
  Activity, ShieldAlert, UserCheck, Calendar, Filter, 
  Search, CheckCircle, Clock, BookOpen, ArrowRight, 
  Phone, Mail, FileText, User, HelpCircle, X, ChevronRight,
  TrendingDown, TrendingUp, CheckCircle2, HeartHandshake, Calculator
} from 'lucide-react';
import { SoftCard } from '../common/SoftCard';
import { StatCard } from '../common/StatCard';
import { Button } from '../common/Button';
import { PageHeader } from '../common/PageHeader';
import { Select } from '../common/Select';
import { useErpData } from '../../context/ErpDataContext';
import { useAuth } from '../../context/AuthContext';
import { Student, AcademicIntervention } from '../../types';

export const AcademicRiskModule: React.FC = () => {
  const { 
    students, 
    faculty, 
    interventions, 
    addIntervention, 
    updateInterventionStatus,
    logAudit 
  } = useErpData();
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState<'radar' | 'interventions' | 'simulator'>('radar');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'risk' | 'attendance' | 'cgpa'>('risk');

  // Modals state
  const [isCounselingModalOpen, setIsCounselingModalOpen] = useState(false);
  const [selectedStudentForAction, setSelectedStudentForAction] = useState<Student | null>(null);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [isCalcModalOpen, setIsCalcModalOpen] = useState(false);

  // Counseling Form
  const [counselorName, setCounselorName] = useState(faculty[0]?.fullName || 'Dr. Meera Nambiar');
  const [interventionType, setInterventionType] = useState<AcademicIntervention['type']>('counseling');
  const [interventionDate, setInterventionDate] = useState(new Date().toISOString().split('T')[0]);
  const [interventionNotes, setInterventionNotes] = useState('');
  const [actionItems, setActionItems] = useState('');

  // Simulator Calculator State
  const [calcConducted, setCalcConducted] = useState(50);
  const [calcAttended, setCalcAttended] = useState(34);
  const [calcRemaining, setCalcRemaining] = useState(20);

  // Success message feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Derive dynamic metrics
  const criticalStudents = useMemo(() => {
    return students.filter(s => s.attendancePercentage < 75 || s.riskLevel === 'critical' || (s.academicRiskScore || 0) >= 70);
  }, [students]);

  const moderateStudents = useMemo(() => {
    return students.filter(s => 
      (s.attendancePercentage >= 75 && s.attendancePercentage < 80) || 
      s.riskLevel === 'moderate' || 
      ((s.academicRiskScore || 0) >= 35 && (s.academicRiskScore || 0) < 70)
    );
  }, [students]);

  const safeStudents = useMemo(() => {
    return students.filter(s => !criticalStudents.includes(s) && !moderateStudents.includes(s));
  }, [students, criticalStudents, moderateStudents]);

  // Filtered & sorted student list
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchesSearch = 
        s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.enrollmentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.department.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDept = selectedDept === 'all' || s.department.toLowerCase().includes(selectedDept.toLowerCase());

      const isCrit = criticalStudents.some(c => c.id === s.id);
      const isMod = moderateStudents.some(m => m.id === s.id);

      let matchesSeverity = true;
      if (selectedSeverity === 'critical') matchesSeverity = isCrit;
      else if (selectedSeverity === 'moderate') matchesSeverity = isMod;
      else if (selectedSeverity === 'safe') matchesSeverity = !isCrit && !isMod;

      return matchesSearch && matchesDept && matchesSeverity;
    }).sort((a, b) => {
      if (sortBy === 'risk') {
        const scoreA = a.academicRiskScore ?? (a.attendancePercentage < 75 ? 80 : 20);
        const scoreB = b.academicRiskScore ?? (b.attendancePercentage < 75 ? 80 : 20);
        return scoreB - scoreA;
      }
      if (sortBy === 'attendance') {
        return a.attendancePercentage - b.attendancePercentage;
      }
      if (sortBy === 'cgpa') {
        return a.cgpa - b.cgpa;
      }
      return 0;
    });
  }, [students, searchQuery, selectedDept, selectedSeverity, sortBy, criticalStudents, moderateStudents]);

  // Schedule Counseling Handler
  const handleOpenCounselingModal = (student: Student) => {
    setSelectedStudentForAction(student);
    setInterventionNotes(`Urgent review of academic performance. Attendance currently at ${student.attendancePercentage}% (below 75% UGC benchmark), CGPA: ${student.cgpa}.`);
    setActionItems(`1. Submit medical documentation if applicable.\n2. Compulsory attendance in tutorial recovery hours.\n3. Bi-weekly progress check with course mentor.`);
    setIsCounselingModalOpen(true);
  };

  const handleSaveCounseling = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentForAction) return;

    const res = addIntervention({
      studentId: selectedStudentForAction.id,
      studentName: selectedStudentForAction.fullName,
      enrollmentId: selectedStudentForAction.enrollmentId,
      type: interventionType,
      counselor: counselorName,
      date: interventionDate,
      status: 'scheduled',
      notes: interventionNotes,
      actionItems: actionItems
    });

    if (res.success) {
      showToast(`Counseling session successfully scheduled with ${counselorName} for ${selectedStudentForAction.fullName}`);
      setIsCounselingModalOpen(false);
      setSelectedStudentForAction(null);
    }
  };

  // Issue Statutory Notice Handler
  const handleOpenNoticeModal = (student: Student) => {
    setSelectedStudentForAction(student);
    setIsNoticeModalOpen(true);
  };

  const handleDispatchNotice = () => {
    if (!selectedStudentForAction) return;
    logAudit(
      'DISPATCHED_ACADEMIC_WARNING_NOTICE',
      'AI',
      `Official UGC Attendance Shortage Notice dispatched to ${selectedStudentForAction.fullName} (${selectedStudentForAction.enrollmentId}) and guardian ${selectedStudentForAction.guardianName}`
    );
    showToast(`Official UGC Statutory Shortage Notice dispatched to ${selectedStudentForAction.fullName} and guardian (${selectedStudentForAction.guardianPhone})`);
    setIsNoticeModalOpen(false);
    setSelectedStudentForAction(null);
  };

  // Open Calculator
  const handleOpenCalculator = (student?: Student) => {
    if (student) {
      setSelectedStudentForAction(student);
      const attended = Math.round((student.attendancePercentage / 100) * 50);
      setCalcConducted(50);
      setCalcAttended(attended);
      setCalcRemaining(20);
    }
    setIsCalcModalOpen(true);
  };

  // Calculator logic
  const currentCalcPct = calcConducted > 0 ? ((calcAttended / calcConducted) * 100).toFixed(1) : '0';
  const totalProjectedClasses = calcConducted + calcRemaining;
  const maxPossibleAttended = calcAttended + calcRemaining;
  const maxPossiblePct = totalProjectedClasses > 0 ? ((maxPossibleAttended / totalProjectedClasses) * 100).toFixed(1) : '0';
  const neededFor75 = Math.max(0, Math.ceil(0.75 * totalProjectedClasses - calcAttended));
  const is75Achievable = neededFor75 <= calcRemaining;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Academic Risk Radar & Early Warning Detection"
        subtitle="Autonomous multi-factor student telemetry, UGC 75% attendance triggers, grade decay indicators & non-punitive intervention workflows"
        icon={<Activity className="w-5 h-5 text-[#C5A059]" />}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={<Calculator className="w-4 h-4" />}
              onClick={() => handleOpenCalculator()}
            >
              Condonation Calculator
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<Calendar className="w-4 h-4" />}
              onClick={() => {
                if (criticalStudents.length > 0) {
                  handleOpenCounselingModal(criticalStudents[0]);
                } else if (students.length > 0) {
                  handleOpenCounselingModal(students[0]);
                }
              }}
            >
              Schedule Intervention
            </Button>
          </div>
        }
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-white dark:bg-[#141417] border border-neutral-200 dark:border-white/[0.08] text-neutral-800 dark:text-[#EDEDEF] flex items-center justify-between text-xs shadow-sm">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="font-bold ml-4 text-neutral-400 hover:text-neutral-200">✕</button>
        </div>
      )}

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Critical Attention Cohort"
          value={criticalStudents.length}
          trend="down"
          trendLabel="attendance < 75%"
          subtitle="Mandatory Dean / Academic Council Review"
          colorScheme="rose"
          icon={<Activity className="w-5 h-5" />}
        />
        <StatCard
          title="Moderate Watchlist"
          value={moderateStudents.length}
          trend="neutral"
          trendLabel="75% – 80% attendance"
          subtitle="Borderline UGC Threshold Scholars"
          colorScheme="gold"
          icon={<Clock className="w-5 h-5" />}
        />
        <StatCard
          title="Scholars in Good Standing"
          value={safeStudents.length}
          trend="up"
          trendLabel="regular attendance"
          subtitle="Eligible for Hall Ticket Issuance"
          colorScheme="emerald"
          icon={<CheckCircle2 className="w-5 h-5" />}
        />
        <StatCard
          title="Active Interventions"
          value={interventions.length}
          trend="up"
          trendLabel="proactive care"
          subtitle="Documented Mentorship Cases"
          colorScheme="institutional"
          icon={<HeartHandshake className="w-5 h-5" />}
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('radar')}
          className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'radar'
              ? 'border-[#0F2942] text-[#0F2942] dark:text-sky-400 dark:border-sky-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Scholars Risk Radar ({students.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('interventions')}
          className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'interventions'
              ? 'border-[#0F2942] text-[#0F2942] dark:text-sky-400 dark:border-sky-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Intervention &amp; Counseling Ledger ({interventions.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'simulator'
              ? 'border-[#0F2942] text-[#0F2942] dark:text-sky-400 dark:border-sky-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>UGC Condonation &amp; Recovery Engine</span>
        </button>
      </div>

      {/* Tab 1: Scholars Risk Radar */}
      {activeTab === 'radar' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <SoftCard className="border border-slate-200 dark:border-slate-800 shadow-soft">
            <div className="px-5 py-2.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-between rounded-t-xl">
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-sky-300" />
                <h3 className="text-xs font-bold font-serif text-white tracking-wide uppercase">
                  Academic Risk Radar &amp; Severity Cohort Filters
                </h3>
              </div>
              <span className="text-[10px] font-mono text-sky-200 bg-white/10 px-2 py-0.5 rounded border border-white/15">
                Statutory Scoring Engine
              </span>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search scholar name, roll no, or department..."
                    className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-institutional-500 text-slate-800 dark:text-slate-100"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>

                <Select
                  value={selectedSeverity}
                  onChange={val => setSelectedSeverity(val)}
                  options={[
                    { value: 'all', label: 'All Severity Cohorts' },
                    { value: 'critical', label: 'Critical Risk Only (<75% Att.)' },
                    { value: 'moderate', label: 'Moderate Watchlist (75-80%)' },
                    { value: 'safe', label: 'Good Standing (>80%)' }
                  ]}
                />

                <Select
                  value={selectedDept}
                  onChange={val => setSelectedDept(val)}
                  options={[
                    { value: 'all', label: 'All Departments' },
                    { value: 'Computer Science', label: 'Computer Science & Eng.' },
                    { value: 'Artificial Intelligence', label: 'AI & Data Science' },
                    { value: 'Electronics', label: 'Electronics & Comm.' },
                    { value: 'Mechanical', label: 'Mechanical Engineering' },
                    { value: 'Management', label: 'School of Management' }
                  ]}
                />

                <Select
                  value={sortBy}
                  onChange={val => setSortBy(val as any)}
                  options={[
                    { value: 'risk', label: 'Sort: Highest Risk Score' },
                    { value: 'attendance', label: 'Sort: Lowest Attendance First' },
                    { value: 'cgpa', label: 'Sort: Lowest CGPA First' }
                  ]}
                />
              </div>
            </div>
          </SoftCard>

          {/* Scholars Roster Grid / Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStudents.map(student => {
              const isCritical = student.attendancePercentage < 75 || student.riskLevel === 'critical' || (student.academicRiskScore || 0) >= 70;
              const isModerate = !isCritical && (student.attendancePercentage < 80 || student.riskLevel === 'moderate' || (student.academicRiskScore || 0) >= 35);
              const riskScore = student.academicRiskScore ?? (isCritical ? 78 : isModerate ? 52 : 14);

              return (
                <SoftCard 
                  key={student.id} 
                  className="relative overflow-hidden rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-150"
                >
                  {/* Dark Royal Oxford Navy Top Banner */}
                  <div className="px-4 py-2.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-white tracking-wide">
                        {student.enrollmentId}
                      </span>
                      <span className="text-[10px] text-sky-200 font-mono">
                        Sem {student.currentSemester}
                      </span>
                    </div>
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                      isCritical
                        ? 'bg-rose-500/30 text-rose-200 border border-rose-400/30'
                        : isModerate
                        ? 'bg-amber-500/30 text-amber-200 border border-amber-400/30'
                        : 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/30'
                    }`}>
                      {isCritical ? 'Critical' : isModerate ? 'Watchlist' : 'Good Standing'}
                    </span>
                  </div>

                  <div className="p-4 space-y-3 relative">
                    {/* Subtle Left Severity Accent Bar */}
                    <span 
                      className={`absolute left-0 top-0 bottom-0 w-1 ${
                        isCritical 
                          ? 'bg-rose-500' 
                          : isModerate 
                          ? 'bg-amber-500' 
                          : 'bg-emerald-500'
                      }`}
                      aria-hidden="true"
                    />

                  {/* Card Header: Identity & Status Badge */}
                  <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img 
                        src={student.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"} 
                        alt={student.fullName}
                        className="w-10 h-10 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0" 
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                            {student.fullName}
                          </h4>
                          <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 rounded font-semibold border border-slate-200/60 dark:border-slate-700">
                            {student.enrollmentId}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {student.department} • Semester {student.currentSemester}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider ${
                        isCritical
                          ? 'bg-rose-100/90 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200/80 dark:border-rose-900/60'
                          : isModerate
                          ? 'bg-amber-100/90 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/80 dark:border-amber-900/60'
                          : 'bg-emerald-100/90 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-900/60'
                      }`}>
                        {isCritical ? 'Critical' : isModerate ? 'Watchlist' : 'Good Standing'}
                      </span>
                      <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">
                        Risk: <span className="font-bold text-slate-700 dark:text-slate-300">{riskScore}/100</span>
                      </div>
                    </div>
                  </div>

                  {/* Clean Telemetry Metrics Strip */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs">
                    <div>
                      <span className="text-[9.5px] text-slate-400 dark:text-slate-500 block uppercase tracking-wider font-mono font-semibold">Attendance</span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className={`font-bold font-mono text-xs ${
                          student.attendancePercentage < 75 
                            ? 'text-rose-600 dark:text-rose-400' 
                            : student.attendancePercentage < 80 
                            ? 'text-amber-600 dark:text-amber-400' 
                            : 'text-emerald-600 dark:text-emerald-400'
                        }`}>
                          {student.attendancePercentage}%
                        </span>
                        {student.attendancePercentage < 75 && (
                          <span className="text-[9px] font-mono text-rose-500">
                            (-{(75 - student.attendancePercentage).toFixed(1)}%)
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="border-l border-slate-200/70 dark:border-slate-700/60 pl-2">
                      <span className="text-[9.5px] text-slate-400 dark:text-slate-500 block uppercase tracking-wider font-mono font-semibold">CGPA / SGPA</span>
                      <div className="flex items-baseline gap-1 mt-0.5 font-mono">
                        <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                          {student.cgpa}
                        </span>
                        <span className="text-[9.5px] text-slate-400 font-normal">({student.sgpa})</span>
                      </div>
                    </div>

                    <div className="border-l border-slate-200/70 dark:border-slate-700/60 pl-2">
                      <span className="text-[9.5px] text-slate-400 dark:text-slate-500 block uppercase tracking-wider font-mono font-semibold">Fee Balance</span>
                      <div className="mt-0.5">
                        <span className={`font-bold font-mono text-xs ${student.feeBalance > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                          {student.feeBalance > 0 ? `INR ${student.feeBalance.toLocaleString()}` : 'Cleared'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Statutory 75% Cutoff Progress Line */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-slate-500">UGC 75% Statutory Cutoff</span>
                      <span className={`font-semibold ${student.attendancePercentage < 75 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                        {student.attendancePercentage >= 75 ? 'Hall Ticket Eligible' : 'Detention Risk'}
                      </span>
                    </div>
                    <div className="relative w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          student.attendancePercentage < 75 
                            ? 'bg-rose-500' 
                            : student.attendancePercentage < 80 
                            ? 'bg-amber-500' 
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min(100, student.attendancePercentage)}%` }}
                      />
                      {/* 75% Marker Line */}
                      <div 
                        className="absolute top-0 bottom-0 w-0.5 bg-slate-900 dark:bg-white z-10"
                        style={{ left: '75%' }}
                        title="Statutory 75% Requirement"
                      />
                    </div>
                  </div>

                  {/* Trigger Factors Tags */}
                  {student.riskFactors && student.riskFactors.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {student.riskFactors.map((factor, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-0.5 text-[10px] rounded font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
                        >
                          {factor}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer & Actions */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
                    <div className="text-[10px] text-slate-500 font-mono truncate">
                      Guardian: <span className="text-slate-700 dark:text-slate-300 font-sans font-medium">{student.guardianName}</span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 text-[10px] px-2 font-medium"
                        onClick={() => handleOpenCalculator(student)}
                      >
                        Calculator
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 text-[10px] px-2 font-medium"
                        onClick={() => handleOpenNoticeModal(student)}
                      >
                        Advisory
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        className="h-6 text-[10px] px-2.5 font-semibold"
                        onClick={() => handleOpenCounselingModal(student)}
                      >
                        Counsel
                      </Button>
                    </div>
                  </div>
                </div>
              </SoftCard>
              );
            })}
          </div>

          {filteredStudents.length === 0 && (
            <SoftCard className="p-12 text-center text-slate-500">
              <UserCheck className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
              <p className="text-sm font-semibold">No students match the current filters</p>
              <p className="text-xs text-slate-400 mt-1">Try resetting the department or severity selection.</p>
            </SoftCard>
          )}
        </div>
      )}

      {/* Tab 2: Intervention & Counseling Ledger */}
      {activeTab === 'interventions' && (
        <div className="space-y-4">
          <SoftCard className="overflow-hidden border border-slate-200 dark:border-slate-800 shadow-soft">
            <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold font-serif text-white">
                  Official Counseling &amp; Academic Intervention Log
                </h3>
                <p className="text-xs text-sky-200/80 mt-0.5">
                  Non-punitive institutional mentoring sessions, parental conferences, and follow-up commitments
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                icon={<Calendar className="w-4 h-4" />}
                onClick={() => {
                  if (criticalStudents.length > 0) handleOpenCounselingModal(criticalStudents[0]);
                  else if (students.length > 0) handleOpenCounselingModal(students[0]);
                }}
              >
                Log New Counseling Case
              </Button>
            </div>
          </SoftCard>

          <div className="space-y-3">
            {interventions.map(intv => (
              <SoftCard key={intv.id} className="overflow-hidden border border-slate-200 dark:border-slate-800 shadow-soft">
                {/* Oxford Navy Strip */}
                <div className="px-4 py-2.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-white">
                      {intv.enrollmentId} — {intv.studentName}
                    </span>
                    <span className="text-[10px] text-sky-200 font-mono">
                      Session Date: {intv.date}
                    </span>
                  </div>
                  <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                    intv.status === 'completed'
                      ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30'
                      : intv.status === 'in_progress'
                      ? 'bg-amber-500/20 text-amber-200 border border-amber-400/30'
                      : 'bg-sky-500/20 text-sky-200 border border-sky-400/30'
                  }`}>
                    {intv.status === 'completed' ? '✓ Completed' : intv.status === 'in_progress' ? '⏳ In Progress' : 'Scheduled'}
                  </span>
                </div>

                <div className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-500/25 flex items-center justify-center font-bold text-xs shrink-0">
                      <HeartHandshake className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900 dark:text-slate-100">{intv.studentName}</span>
                        <span className="font-mono text-[10px] text-slate-400">{intv.enrollmentId}</span>
                        <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                          intv.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
                            : intv.status === 'in_progress'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                            : 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300'
                        }`}>
                          {intv.status === 'completed'
                            ? '✓ Completed'
                            : intv.status === 'in_progress'
                            ? '⏳ In Progress'
                            : 'Scheduled'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Assigned Mentor / Counselor: <strong className="text-slate-700 dark:text-slate-300">{intv.counselor}</strong> • Date: {intv.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {intv.status !== 'completed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-[11px]"
                        onClick={() => {
                          updateInterventionStatus(intv.id, 'completed');
                          showToast(`Intervention marked as completed for ${intv.studentName}`);
                        }}
                      >
                        Mark Completed
                      </Button>
                    )}
                    {intv.status === 'scheduled' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-[11px]"
                        onClick={() => {
                          updateInterventionStatus(intv.id, 'in_progress');
                          showToast(`Intervention set to In-Progress for ${intv.studentName}`);
                        }}
                      >
                        Start Session
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 text-xs">
                  <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                    <span className="font-semibold text-[11px] text-slate-700 dark:text-slate-300 block mb-1">
                      Session Notes &amp; Root Cause Analysis:
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line text-[11px]">
                      {intv.notes}
                    </p>
                  </div>

                  <div className="bg-blue-50/40 dark:bg-slate-800/50 p-3 rounded-lg border border-blue-200/50 dark:border-blue-900/40">
                    <span className="font-semibold text-[11px] text-[#0F2942] dark:text-sky-300 block mb-1">
                      Agreed Action Items &amp; Recovery Plan:
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line text-[11px]">
                      {intv.actionItems}
                    </p>
                  </div>
                </div>
              </div>
            </SoftCard>
            ))}

            {interventions.length === 0 && (
              <SoftCard className="p-8 text-center text-slate-500">
                <p className="text-xs">No counseling sessions recorded yet.</p>
              </SoftCard>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: UGC Condonation Simulator */}
      {activeTab === 'simulator' && (
        <div className="space-y-4">
          <SoftCard className="overflow-hidden border border-slate-200 dark:border-slate-800 shadow-soft">
            <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold font-serif text-white">
                  Interactive UGC Attendance Recovery &amp; Condonation Calculator
                </h3>
                <p className="text-xs text-sky-200/80 mt-0.5">
                  Ordinance 14.2 statutory compliance, recovery trajectory modeling, and hall ticket eligibility
                </p>
              </div>
              <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-white/10 text-white border border-white/20 w-fit">
                Statutory Engine
              </span>
            </div>

            <div className="p-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Classes Conducted So Far
                </label>
                <input
                  type="number"
                  min="1"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                  value={calcConducted}
                  onChange={e => setCalcConducted(Math.max(1, parseInt(e.target.value) || 1))}
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Classes Attended By Scholar
                </label>
                <input
                  type="number"
                  min="0"
                  max={calcConducted}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                  value={calcAttended}
                  onChange={e => setCalcAttended(Math.min(calcConducted, Math.max(0, parseInt(e.target.value) || 0)))}
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Remaining Classes in Semester
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                  value={calcRemaining}
                  onChange={e => setCalcRemaining(Math.max(0, parseInt(e.target.value) || 0))}
                />
              </div>
            </div>

            {/* Computation Results */}
            <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Current Percentage</span>
                  <span className={`text-xl font-bold font-mono ${parseFloat(currentCalcPct) < 75 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {currentCalcPct}%
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{calcAttended}/{calcConducted} classes</span>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Max Achievable Pct</span>
                  <span className={`text-xl font-bold font-mono ${parseFloat(maxPossiblePct) < 75 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {maxPossiblePct}%
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">With 100% attendance remaining</span>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Required to Clear 75%</span>
                  <span className="text-xl font-bold font-mono text-institutional-600 dark:text-institutional-400">
                    {neededFor75} classes
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">out of {calcRemaining} remaining</span>
                </div>
              </div>

              {/* Statutory Verdict Callout */}
              <div className={`p-3.5 rounded-lg border text-xs flex items-start gap-3 ${
                is75Achievable 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-800' 
                  : parseFloat(maxPossiblePct) >= 65 
                  ? 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-800' 
                  : 'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200 dark:border-rose-800'
              }`}>
                {is75Achievable ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-bold">
                    {is75Achievable 
                      ? 'Recovery Achievable Under Normal Attendance' 
                      : parseFloat(maxPossiblePct) >= 65 
                      ? 'Requires Formal Medical / Council Condonation (65% – 75% Range)' 
                      : 'Severe Shortfall: Ineligible for Condonation (<65% Cap)'}
                  </h4>
                  <p className="mt-1 leading-relaxed text-[11px]">
                    {is75Achievable 
                      ? `Scholar needs to attend at least ${neededFor75} out of the next ${calcRemaining} classes to clear the 75.0% requirement automatically without needing Dean condonation.`
                      : parseFloat(maxPossiblePct) >= 65 
                      ? `Even with 100% attendance, scholar will only reach ${maxPossiblePct}%. However, since this exceeds 65.0%, they qualify for Ordinance 14.2 Medical Condonation upon submitting medical records verified by the Dean.`
                      : `The maximum possible attendance is ${maxPossiblePct}%, which falls below the absolute 65.0% condonation floor. Scholar faces mandatory course detention and must re-register next academic term.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SoftCard>
        </div>
      )}

      {/* Modal 1: Schedule Counseling Session */}
      {isCounselingModalOpen && selectedStudentForAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-institutional-600" />
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Schedule Counseling &amp; Recovery Plan
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Scholar: {selectedStudentForAction.fullName} ({selectedStudentForAction.enrollmentId})
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsCounselingModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCounseling} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Assigned Counselor / Faculty Mentor
                </label>
                <Select
                  value={counselorName}
                  onChange={val => setCounselorName(val)}
                  options={faculty.map(f => ({ value: f.fullName, label: `${f.fullName} (${f.department})` }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Intervention Type
                  </label>
                  <Select
                    value={interventionType}
                    onChange={val => setInterventionType(val as any)}
                    options={[
                      { value: 'counseling', label: '1-on-1 Academic Counseling' },
                      { value: 'parent_conference', label: 'Parent-Teacher Conference' },
                      { value: 'remedial_class', label: 'Remedial Tutorial Assignment' },
                      { value: 'warning_letter', label: 'Dean Hearing & Advisory' }
                    ]}
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Scheduled Date
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100"
                    value={interventionDate}
                    onChange={e => setInterventionDate(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Diagnostic Case Notes &amp; Observations
                </label>
                <textarea
                  rows={3}
                  required
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-institutional-500"
                  value={interventionNotes}
                  onChange={e => setInterventionNotes(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Agreed Action Items &amp; Follow-Up Commitments
                </label>
                <textarea
                  rows={2}
                  required
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-institutional-500"
                  value={actionItems}
                  onChange={e => setActionItems(e.target.value)}
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <Button variant="outline" size="sm" type="button" onClick={() => setIsCounselingModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Record &amp; Schedule Intervention
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Issue Statutory Notice */}
      {isNoticeModalOpen && selectedStudentForAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  UGC Attendance Shortage Advisory
                </h3>
              </div>
              <button 
                onClick={() => setIsNoticeModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-900 dark:text-rose-200 space-y-2">
              <p className="font-semibold">
                Official Advisory Reference: UGC/ATTN-WARN/2026/{selectedStudentForAction.enrollmentId}
              </p>
              <p className="text-[11px] leading-relaxed">
                Scholar <strong>{selectedStudentForAction.fullName}</strong> currently has an aggregate attendance of <strong>{selectedStudentForAction.attendancePercentage}%</strong>, falling below the statutory 75.0% threshold mandated by UGC regulations and University Ordinance 14.2.
              </p>
              <div className="text-[10px] pt-1 border-t border-rose-200/60 dark:border-rose-900/40">
                Guardian on Record: {selectedStudentForAction.guardianName} ({selectedStudentForAction.guardianPhone})
              </div>
            </div>

            <div className="text-xs text-slate-500 leading-relaxed">
              Dispatching this advisory will send an automated SMS &amp; Portal Notification to both the scholar and guardian, and document this compliance warning in the university audit trail.
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsNoticeModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={handleDispatchNotice}>
                Dispatch Formal Advisory
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Standalone Condonation Calculator */}
      {isCalcModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-institutional-600" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  Quick Attendance Calculator
                </h3>
              </div>
              <button 
                onClick={() => setIsCalcModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Classes Conducted So Far
                </label>
                <input
                  type="number"
                  min="1"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                  value={calcConducted}
                  onChange={e => setCalcConducted(Math.max(1, parseInt(e.target.value) || 1))}
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Classes Attended
                </label>
                <input
                  type="number"
                  min="0"
                  max={calcConducted}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                  value={calcAttended}
                  onChange={e => setCalcAttended(Math.min(calcConducted, Math.max(0, parseInt(e.target.value) || 0)))}
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Remaining Classes Scheduled
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                  value={calcRemaining}
                  onChange={e => setCalcRemaining(Math.max(0, parseInt(e.target.value) || 0))}
                />
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Current Attendance:</span>
                  <strong className={parseFloat(currentCalcPct) < 75 ? 'text-rose-600' : 'text-emerald-600'}>
                    {currentCalcPct}%
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Max Possible:</span>
                  <strong>{maxPossiblePct}%</strong>
                </div>
                <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 font-semibold">
                  <span className="text-institutional-700 dark:text-institutional-300">Need to attend for 75%:</span>
                  <span className="text-institutional-700 dark:text-institutional-300">{neededFor75} classes</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <Button variant="primary" size="sm" onClick={() => setIsCalcModalOpen(false)}>
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
