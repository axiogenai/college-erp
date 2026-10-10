import React, { useState } from 'react';
import { 
  Users, GraduationCap, Award, CreditCard, TrendingUp, 
  AlertTriangle, CheckCircle, Clock, ShieldCheck, ChevronRight, 
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
            <div className="px-5 py-3.5 bg-institutional-100 dark:bg-slate-800 border-b border-institutional-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-institutional-600 dark:text-institutional-400" />
                <h3 className="text-sm font-bold font-sans tracking-tight text-slate-900 dark:text-slate-100">
                  Directorate Approval Queue
                </h3>
              </div>
              <Badge variant={pendingRefunds.length + pendingExams.length > 0 ? 'warning' : 'success'} size="sm">
                {pendingRefunds.length + pendingExams.length} Actions Pending
              </Badge>
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
            <div className="px-5 py-3.5 bg-institutional-100 dark:bg-slate-800 border-b border-institutional-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-institutional-600 dark:text-institutional-400" />
                <h3 className="text-sm font-bold font-sans tracking-tight text-slate-900 dark:text-slate-100">
                  Admissions Intake Funnel (2026–27)
                </h3>
              </div>
              <Badge variant="primary" size="sm">Phase II Active</Badge>
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
        <SoftCard className="overflow-hidden flex flex-col justify-between border border-slate-200 dark:border-slate-800">
          <div>
            <div className="px-5 py-3.5 bg-institutional-100 dark:bg-slate-800 border-b border-institutional-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <h3 className="text-sm font-bold font-sans tracking-tight text-slate-900 dark:text-slate-100">
                  Early Academic Risk &amp; Counseling Radar
                </h3>
              </div>
              <Badge variant="danger" size="sm">
                {criticalStudents.length} Scholars Critical
              </Badge>
            </div>

            <div className="p-5 space-y-3">
              {students.filter(s => s.riskLevel === 'critical' || s.attendancePercentage < 75).slice(0, 2).map(stu => (
                <div 
                  key={stu.id} 
                  className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 border-l-4 border-l-rose-500 space-y-2.5 text-xs shadow-2xs hover:shadow-soft transition-all"
                >
                  {/* Header: Name & ID on left, Badges & Action on right - ZERO text collision! */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm tracking-tight truncate">
                          {stu.fullName}
                        </h4>
                        <span className="font-mono text-slate-600 dark:text-slate-400 text-[10px] font-semibold bg-white dark:bg-slate-900 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 shrink-0">
                          {stu.enrollmentId}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate font-medium">
                        Semester {stu.currentSemester} • {stu.department.split('&')[0].trim()}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <Badge variant={stu.riskLevel === 'critical' ? 'danger' : 'warning'} size="xs" dot>
                        {stu.riskLevel === 'critical' ? 'Critical Action' : 'Warning'}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onNavigate('students')}
                        className="text-[11px] h-7 px-2.5 font-medium shadow-2xs"
                      >
                        Counsel
                      </Button>
                    </div>
                  </div>

                  {/* Classic 3-Metric Micro Grid */}
                  <div className="grid grid-cols-3 gap-2 p-2 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/70 text-center">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-medium">Attendance</span>
                      <span className={`text-xs font-bold font-mono ${stu.attendancePercentage < 75 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {stu.attendancePercentage}%
                      </span>
                    </div>
                    <div className="border-x border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase font-medium">CGPA</span>
                      <span className="text-xs font-bold font-mono text-slate-800 dark:text-slate-200">
                        {stu.cgpa.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-medium">Risk Score</span>
                      <span className="text-xs font-bold font-mono text-rose-600 dark:text-rose-400">
                        {stu.academicRiskScore}/100
                      </span>
                    </div>
                  </div>

                  {/* Triggers Alert Strip */}
                  {stu.riskFactors && (
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 bg-rose-50/60 dark:bg-rose-950/20 px-2.5 py-1.5 rounded-lg border border-rose-200/60 dark:border-rose-900/40 flex items-start gap-1.5">
                      <span className="font-semibold text-rose-700 dark:text-rose-400 shrink-0">Triggers:</span>
                      <span className="truncate">{stu.riskFactors.join(', ')}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-50/60 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-[11px] text-slate-500 font-mono">UGC Statutory Attendance Alert Engine: Active</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('risk-detector')}
              className="text-[11px] h-7"
            >
              View Full Risk Radar
            </Button>
          </div>
        </SoftCard>

        {/* Row 2, Right: Department Performance Summary */}
        <SoftCard className="overflow-hidden flex flex-col justify-between border border-slate-200 dark:border-slate-800">
          <div>
            <div className="px-5 py-3.5 bg-institutional-100 dark:bg-slate-800 border-b border-institutional-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-institutional-600 dark:text-institutional-400" />
                <h3 className="text-sm font-bold font-sans tracking-tight text-slate-900 dark:text-slate-100">
                  Department Performance Summary
                </h3>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">Academic Year 2026–27</span>
            </div>

            <div className="p-4 sm:p-5 space-y-2.5 text-xs">
              {[
                {
                  name: 'Computer Science & Engineering',
                  lead: 'Dean: Dr. Meera Nambiar',
                  pass: '91.2%',
                  attd: '89.4%',
                  status: 'emerald'
                },
                {
                  name: 'AI & Data Science',
                  lead: 'HOD: Dr. Sanyukta Ghosh',
                  pass: '94.0%',
                  attd: '91.0%',
                  status: 'emerald'
                },
                {
                  name: 'Electronics & Communication',
                  lead: 'HOD: Dr. K. R. Venkatraman',
                  pass: '86.5%',
                  attd: '82.3%',
                  status: 'amber'
                },
                {
                  name: 'Mechanical Engineering',
                  lead: 'HOD: Prof. Harpreet Singh Sodhi',
                  pass: '88.2%',
                  attd: '84.6%',
                  status: 'emerald'
                }
              ].map(dept => (
                <div 
                  key={dept.name}
                  className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 space-y-1.5 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-slate-900 dark:text-slate-100 block text-xs truncate">
                        {dept.name}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate font-medium">
                        {dept.lead}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`font-bold font-mono text-xs block ${dept.status === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                        {dept.pass} Pass
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                        {dept.attd} Avg Attd
                      </span>
                    </div>
                  </div>
                  {/* Performance Indicator Bar */}
                  <div className="w-full bg-slate-200/70 dark:bg-slate-700/70 h-1 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${dept.status === 'emerald' ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                      style={{ width: dept.pass }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-50/60 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-[11px] text-slate-500 font-mono">All 4 Accredited Departments Reporting</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('faculty')}
              className="text-[11px] h-7"
            >
              Inspect Faculty Dossiers
            </Button>
          </div>
        </SoftCard>
      </div>
    </div>
  );
};
