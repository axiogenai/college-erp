import React, { useState } from 'react';
import { 
  Users, GraduationCap, Award, CreditCard, TrendingUp, 
  Activity, CheckCircle, Clock, ShieldCheck, ChevronRight, 
  Building, UserPlus, ArrowUpRight, BarChart3, PieChart 
} from 'lucide-react';
import { SoftCard } from '../common/SoftCard';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useErpData } from '../../context/ErpDataContext';

interface PrincipalDashboardProps {
  onNavigate: (module: string) => void;
}

export const PrincipalDashboard: React.FC<PrincipalDashboardProps> = ({ onNavigate }) => {
  const { 
    students, faculty, feeInvoices, examRecords, 
    refundRequests, enquiries, publishExamResults, processRefund 
  } = useErpData();

  // Real calculations from authorized database records
  const totalStudents = students.length;
  const totalFaculty = faculty.length;
  const avgAttendance = (students.reduce((acc, s) => acc + s.attendancePercentage, 0) / (students.length || 1)).toFixed(1);
  
  const totalInvoiced = feeInvoices.reduce((acc, i) => acc + i.totalAmount, 0);
  const totalCollected = feeInvoices.reduce((acc, i) => acc + i.paidAmount, 0);
  const totalOverdue = feeInvoices.filter(i => i.status === 'overdue').reduce((acc, i) => acc + i.balanceAmount, 0);
  const collectionRate = ((totalCollected / (totalInvoiced || 1)) * 100).toFixed(1);

  const pendingRefunds = refundRequests.filter(r => r.status === 'pending');
  const pendingExams = examRecords.filter(e => e.status === 'under_review');
  const criticalStudents = students.filter(s => s.riskLevel === 'critical');

  const [approvalFeedback, setApprovalFeedback] = useState<string | null>(null);

  const handleQuickPublishExam = (examId: string) => {
    const res = publishExamResults(examId);
    if (res.success) {
      setApprovalFeedback(res.message);
      setTimeout(() => setApprovalFeedback(null), 4000);
    }
  };

  const handleQuickRefund = (refundId: string, action: 'approve' | 'reject') => {
    processRefund(refundId, action, `Executive Director approved via Principal Dashboard`);
    setApprovalFeedback(`Refund request #${refundId} ${action}d.`);
    setTimeout(() => setApprovalFeedback(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Feedback Toast Banner */}
      {approvalFeedback && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">{approvalFeedback}</span>
          </div>
          <button onClick={() => setApprovalFeedback(null)} className="text-emerald-600 hover:text-emerald-800 font-bold">✕</button>
        </div>
      )}

      {/* Institutional KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Campus Enrollment"
          value={totalStudents.toString()}
          change="+8.4%"
          trend="up"
          trendLabel="vs last year"
          subtitle="3,420 Total Institute Roll"
          colorScheme="institutional"
          icon={<GraduationCap className="w-5 h-5" />}
        />
        <StatCard
          title="Overall Attendance"
          value={`${avgAttendance}%`}
          change={parseFloat(avgAttendance) >= 80 ? '+1.2%' : '-2.4%'}
          trend={parseFloat(avgAttendance) >= 80 ? 'up' : 'down'}
          trendLabel="campus avg"
          subtitle="Threshold minimum: 75.0%"
          colorScheme="emerald"
          icon={<Users className="w-5 h-5" />}
        />
        <StatCard
          title="Treasury Collections"
          value={`${collectionRate}%`}
          change={`INR ${(totalCollected / 100000).toFixed(1)}L`}
          trend="up"
          trendLabel="collected"
          subtitle={`Overdue: INR ${(totalOverdue / 1000).toFixed(0)}k`}
          colorScheme="institutional"
          icon={<CreditCard className="w-5 h-5" />}
        />
        <StatCard
          title="Faculty Roster"
          value={totalFaculty.toString()}
          change="1:18 Ratio"
          trend="neutral"
          trendLabel="approved load"
          subtitle="184 Campus Faculty"
          colorScheme="indigo"
          icon={<Award className="w-5 h-5" />}
        />
      </div>

      {/* Main Grid: Balanced 2-Column Institutional Oversight Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Row 1, Left: Directorate Approval Queue */}
        <SoftCard className="overflow-hidden flex flex-col justify-between border border-slate-200 dark:border-slate-800">
          <div>
            <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-300" />
                <h3 className="text-sm font-semibold tracking-tight text-white">
                  Directorate Approval Queue
                </h3>
              </div>
              <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md border ${
                pendingRefunds.length + pendingExams.length > 0 
                  ? 'bg-amber-500/20 text-amber-200 border-amber-400/30' 
                  : 'bg-white/10 text-white border-white/20'
              }`}>
                {pendingRefunds.length + pendingExams.length} Actions Pending
              </span>
            </div>

            <div className="p-5">
              {pendingExams.length > 0 || pendingRefunds.length > 0 ? (
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {/* Exam publication approvals */}
                  {pendingExams.map(exam => (
                    <div key={exam.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 dark:bg-slate-800 dark:text-indigo-300 border border-indigo-200/60 dark:border-slate-700 font-semibold">
                            Grade Publication
                          </span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{exam.examName}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Subject: {exam.subjectCode} ({exam.subjectName}) • {exam.marks.length} Evaluations submitted
                        </p>
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleQuickPublishExam(exam.id)}
                      >
                        Authorize Release
                      </Button>
                    </div>
                  ))}

                  {/* Refund authorizations */}
                  {pendingRefunds.map(refund => (
                    <div key={refund.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 dark:bg-slate-800 dark:text-amber-300 border border-amber-200/60 dark:border-slate-700 font-semibold">
                            Treasury Refund
                          </span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            INR {refund.amount.toLocaleString()} - {refund.studentName}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Reason: {refund.reason} ({refund.enrollmentId})
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickRefund(refund.id, 'reject')}
                        >
                          Reject
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleQuickRefund(refund.id, 'approve')}
                        >
                          Approve Refund
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3.5">
                  <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 dark:bg-emerald-950/30 dark:border-emerald-800/60 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                        Institutional Approval Clearance Complete
                      </p>
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-300/80 mt-0.5">
                        All exam publications and treasury refund disbursements are fully audited &amp; verified.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60">
                      <span className="text-[10px] uppercase font-semibold text-slate-500 block">Gradebook Releases</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 font-mono mt-0.5 block">100% Published</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60">
                      <span className="text-[10px] uppercase font-semibold text-slate-500 block">Treasury Reversals</span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 block">0 Pending NEFT</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 bg-slate-50/60 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-[11px] text-slate-500 font-mono">Real-time Directorate Sync: Active</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('finance')}
              className="text-[11px] h-7"
            >
              Inspect Treasury Ledger
            </Button>
          </div>
        </SoftCard>

        {/* Row 1, Right: Admissions Intake Funnel */}
        <SoftCard className="overflow-hidden flex flex-col justify-between border border-slate-200 dark:border-slate-800">
          <div>
            <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-sky-300" />
                <h3 className="text-sm font-semibold tracking-tight text-white">
                  Admissions Intake Funnel (2026–27)
                </h3>
              </div>
              <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-white/10 text-white border border-white/20">
                Phase II Active
              </span>
            </div>

            <div className="p-5 space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-1">
                  <span className="font-medium">1. Enquiries &amp; Applications Received</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 font-mono">1,240 Applicants</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-institutional-400 dark:bg-institutional-500 h-full rounded-full w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-1">
                  <span className="font-medium">2. Academic Credentials Verified</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 font-mono">860 Verified (69.3%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-institutional-500 dark:bg-institutional-600 h-full rounded-full w-[69%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-1">
                  <span className="font-medium">3. Merit List Selected</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 font-mono">420 Shortlisted (33.9%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-institutional-600 dark:bg-institutional-700 h-full rounded-full w-[34%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-1">
                  <span className="font-medium">4. Final Fee Paid &amp; Enrolled</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">310 Confirmed (25.0%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 dark:bg-emerald-500 h-full rounded-full w-[25%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50/60 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-[11px] text-slate-500 font-mono">Target: 350 Seats (88.6% Met)</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('admissions')}
              className="text-[11px] h-7"
            >
              Inspect Admissions Registry
            </Button>
          </div>
        </SoftCard>

        {/* Row 2, Left: Early Academic Risk & Counseling Radar */}
        <SoftCard className="overflow-hidden flex flex-col justify-between border border-slate-200/90 dark:border-slate-800 shadow-2xs">
          <div>
            {/* Slim Header: Deep Oxford Navy Surface */}
            <div className="px-4 py-2.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-white/10 border border-white/20 flex items-center justify-center text-sky-300 shrink-0">
                  <Activity className="w-3.5 h-3.5 text-sky-300" />
                </div>
                <h3 className="text-xs font-semibold tracking-tight text-white">
                  Early Academic Risk &amp; Counseling Radar
                </h3>
              </div>
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-rose-600 text-white shadow-xs">
                {criticalStudents.length} Critical
              </span>
            </div>

            {/* Slim Student List */}
            <div className="p-3.5 space-y-2.5">
              {students.filter(s => s.riskLevel === 'critical' || s.attendancePercentage < 75).slice(0, 2).map(stu => (
                <div 
                  key={stu.id} 
                  className="relative pl-3.5 pr-3 py-2.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 hover:bg-white dark:hover:bg-slate-800/70 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-150 overflow-hidden shadow-2xs"
                >
                  {/* Slim Vertical Left Indicator Bar */}
                  <span 
                    className={`absolute left-0 top-0 bottom-0 w-1 ${
                      stu.riskLevel === 'critical' ? 'bg-rose-500' : 'bg-amber-500'
                    }`} 
                    aria-hidden="true"
                  />

                  {/* Header Row: Identity & Quick Action */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs tracking-tight truncate">
                          {stu.fullName}
                        </h4>
                        <span className="font-mono text-slate-600 dark:text-slate-400 text-[10px] font-semibold bg-white dark:bg-slate-900 px-1.5 py-0.2 rounded border border-slate-200 dark:border-slate-700/80 shrink-0">
                          {stu.enrollmentId}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          Sem {stu.currentSemester} • {stu.department.split('&')[0].trim()}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5">
                      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                        stu.riskLevel === 'critical' 
                          ? 'bg-rose-100/80 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200/80 dark:border-rose-900/60' 
                          : 'bg-amber-100/80 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/80 dark:border-amber-900/60'
                      }`}>
                        <span className={`w-1 h-1 rounded-full ${stu.riskLevel === 'critical' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                        {stu.riskLevel === 'critical' ? 'Critical' : 'Warning'}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onNavigate('students')}
                        className="text-[10px] h-6 px-2 font-medium"
                      >
                        Counsel
                      </Button>
                    </div>
                  </div>

                  {/* Slim Inline Metrics Strip */}
                  <div className="flex items-center gap-3 mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/50 text-[10.5px]">
                    {/* Attendance with Micro Progress */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500">Attd:</span>
                      <span className={`font-mono font-bold ${stu.attendancePercentage < 75 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-200'}`}>
                        {stu.attendancePercentage}%
                      </span>
                      <div className="w-10 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shrink-0">
                        <div 
                          className={`h-full rounded-full ${stu.attendancePercentage < 75 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                          style={{ width: `${Math.min(100, stu.attendancePercentage)}%` }} 
                        />
                      </div>
                    </div>

                    {/* CGPA */}
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500">CGPA:</span>
                      <span className="font-mono font-bold text-slate-700 dark:text-slate-200">
                        {stu.cgpa.toFixed(2)}
                      </span>
                    </div>

                    {/* Academic Risk */}
                    <div className="flex items-center gap-1 ml-auto">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500">Risk:</span>
                      <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                        {stu.academicRiskScore}/100
                      </span>
                    </div>
                  </div>

                  {/* Slim Triggers Line */}
                  {stu.riskFactors && (
                    <div className="mt-1.5 text-[10px] text-slate-600 dark:text-slate-400 flex items-center gap-1 truncate">
                      <span className="font-semibold text-rose-600 dark:text-rose-400 shrink-0">Triggers:</span>
                      <span className="truncate">{stu.riskFactors.join(', ')}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 py-2 bg-slate-50/60 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-[10.5px] text-slate-500 font-mono">UGC Statutory Alert Engine: Active</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('risk-detector')}
              className="text-[10px] h-6 px-2"
            >
              View Full Risk Radar
            </Button>
          </div>
        </SoftCard>

        {/* Row 2, Right: Department Performance Summary */}
        <SoftCard className="overflow-hidden flex flex-col justify-between border border-slate-200/90 dark:border-slate-800 shadow-2xs">
          <div>
            {/* Slim Header: Deep Oxford Navy Surface */}
            <div className="px-4 py-2.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-white/10 border border-white/20 flex items-center justify-center text-sky-300 shrink-0">
                  <Building className="w-3.5 h-3.5 text-sky-300" />
                </div>
                <h3 className="text-xs font-semibold tracking-tight text-white">
                  Department Performance Summary
                </h3>
              </div>
              <span className="text-[10.5px] text-white/80 font-mono">AY 2026–27</span>
            </div>

            {/* Slim Department Rows */}
            <div className="p-3.5 space-y-2 text-xs">
              {[
                {
                  name: 'Computer Science & Engineering',
                  lead: 'Dean: Dr. Meera Nambiar',
                  pass: '91.2%',
                  attd: '89.4%',
                  barColor: 'bg-blue-600 dark:bg-blue-500',
                  textColor: 'text-blue-600 dark:text-blue-400'
                },
                {
                  name: 'AI & Data Science',
                  lead: 'HOD: Dr. Sanyukta Ghosh',
                  pass: '94.0%',
                  attd: '91.0%',
                  barColor: 'bg-emerald-600 dark:bg-emerald-500',
                  textColor: 'text-emerald-600 dark:text-emerald-400'
                },
                {
                  name: 'Electronics & Communication',
                  lead: 'HOD: Dr. K. R. Venkatraman',
                  pass: '86.5%',
                  attd: '82.3%',
                  barColor: 'bg-purple-600 dark:bg-purple-500',
                  textColor: 'text-purple-600 dark:text-purple-400'
                },
                {
                  name: 'Mechanical Engineering',
                  lead: 'HOD: Prof. Harpreet Singh Sodhi',
                  pass: '88.2%',
                  attd: '84.6%',
                  barColor: 'bg-amber-600 dark:bg-amber-500',
                  textColor: 'text-amber-600 dark:text-amber-400'
                }
              ].map(dept => (
                <div 
                  key={dept.name}
                  className="px-3 py-2 rounded-lg bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 hover:bg-white dark:hover:bg-slate-800/70 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-150 space-y-1.5 shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-slate-900 dark:text-slate-100 block text-xs truncate">
                        {dept.name}
                      </span>
                      <span className="text-[10.5px] text-slate-500 dark:text-slate-400 block truncate font-medium">
                        {dept.lead}
                      </span>
                    </div>
                    <div className="text-right shrink-0 flex items-center gap-2.5">
                      <div>
                        <span className={`font-bold font-mono text-xs block ${dept.textColor}`}>
                          {dept.pass}
                        </span>
                        <span className="text-[9.5px] uppercase text-slate-400 font-semibold block">Pass</span>
                      </div>
                      <div className="border-l border-slate-200 dark:border-slate-700 pl-2">
                        <span className="font-mono text-xs text-slate-700 dark:text-slate-300 font-semibold block">
                          {dept.attd}
                        </span>
                        <span className="text-[9.5px] uppercase text-slate-400 font-semibold block">Attd</span>
                      </div>
                    </div>
                  </div>

                  {/* Slim High-Tech Micro Progress Bar */}
                  <div className="w-full bg-slate-200/70 dark:bg-slate-700/70 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${dept.barColor}`} 
                      style={{ width: dept.pass }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 py-2 bg-slate-50/60 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-[10.5px] text-slate-500 font-mono">All 4 Accredited Depts Active</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('faculty')}
              className="text-[10px] h-6 px-2"
            >
              Inspect Faculty Dossiers
            </Button>
          </div>
        </SoftCard>
      </div>
    </div>
  );
};
