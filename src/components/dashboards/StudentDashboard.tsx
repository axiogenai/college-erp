import React, { useState } from 'react';
import { 
  GraduationCap, Clock, Award, CreditCard, Calendar, 
  FileText, CheckCircle2, AlertTriangle, Download, 
  Printer, ArrowRight, BookOpen 
} from 'lucide-react';
import { SoftCard } from '../common/SoftCard';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ReceiptModal } from '../common/ReceiptModal';
import { useErpData } from '../../context/ErpDataContext';
import { useAuth } from '../../context/AuthContext';

interface StudentDashboardProps {
  onNavigate: (module: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { students, feeInvoices, feePayments, examRecords, timetable, notices } = useErpData();

  // Find currently logged-in student (default Aditya Verma)
  const currentStudent = students.find(s => s.id === 'stu-01') || students[0];
  const studentInvoice = feeInvoices.find(i => i.studentId === currentStudent.id);
  const studentPayments = feePayments.filter(p => p.studentId === currentStudent.id);

  // Filter exam results for this student
  const studentExams = examRecords
    .filter(e => e.status === 'published')
    .map(e => ({
      ...e,
      myMarks: e.marks.find(m => m.studentId === currentStudent.id)
    }))
    .filter(e => e.myMarks !== undefined);

  // Timetable for batch
  const myTimetableToday = timetable.filter(
    t => t.day === 'Monday' && t.batch.includes('CSE')
  );

  const [selectedPaymentForReceipt, setSelectedPaymentForReceipt] = useState<any>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const handleOpenReceipt = (payment: any) => {
    setSelectedPaymentForReceipt(payment);
    setIsReceiptOpen(true);
  };

  const isAttendanceSafe = currentStudent.attendancePercentage >= 75;

  return (
    <div className="space-y-6">
      {/* Student Profile Overview Banner */}
      <SoftCard className="p-5 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={currentStudent.avatar || currentUser.avatar}
              alt={currentStudent.fullName}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-institutional-500 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">{currentStudent.fullName}</h2>
                <Badge variant="primary" size="sm">Semester {currentStudent.currentSemester}</Badge>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                {currentStudent.program} • Roll No: {currentStudent.enrollmentId}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-1">
                Batch: {currentStudent.batch} • Academic Mentor: Dr. Meera Nambiar
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {studentPayments.length > 0 && (
              <Button
                variant="primary"
                size="sm"
                icon={<Printer className="w-4 h-4" />}
                onClick={() => handleOpenReceipt(studentPayments[0])}
              >
                Official Fee Receipt
              </Button>
            )}
            <Button
              variant="secondary"
              size="sm"
              icon={<Award className="w-4 h-4" />}
              onClick={() => onNavigate('examinations')}
            >
              Grade Sheet
            </Button>
          </div>
        </div>
      </SoftCard>

      {/* KPI Cards: Attendance, CGPA, SGPA, Fee Balance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Attendance Percentage"
          value={`${currentStudent.attendancePercentage}%`}
          change={isAttendanceSafe ? 'Safe Standing' : 'Shortage Warning'}
          trend={isAttendanceSafe ? 'up' : 'down'}
          trendLabel="threshold 75%"
          subtitle="Mandatory for End-Sem Exam Hall Ticket"
          colorScheme={isAttendanceSafe ? 'emerald' : 'rose'}
          icon={<Clock className="w-5 h-5" />}
        />
        <StatCard
          title="Cumulative Grade (CGPA)"
          value={currentStudent.cgpa.toFixed(2)}
          change="Top 5% of Cohort"
          trend="up"
          trendLabel="distinction"
          subtitle="Scale: 10.00"
          colorScheme="institutional"
          icon={<GraduationCap className="w-5 h-5" />}
        />
        <StatCard
          title="Recent Term SGPA"
          value={currentStudent.sgpa.toFixed(2)}
          change="+0.26 improvement"
          trend="up"
          trendLabel="vs Sem 4"
          subtitle="Semester 5 Mid-Assessments"
          colorScheme="indigo"
          icon={<Award className="w-5 h-5" />}
        />
        <StatCard
          title="Fee Account Balance"
          value={`INR ${currentStudent.feeBalance.toLocaleString()}`}
          change={currentStudent.feeBalance === 0 ? 'Clear / No Dues' : 'Due Pending'}
          trend={currentStudent.feeBalance === 0 ? 'up' : 'down'}
          subtitle={studentInvoice ? `Due by ${studentInvoice.dueDate}` : 'Term Invoiced'}
          colorScheme={currentStudent.feeBalance === 0 ? 'emerald' : 'rose'}
          icon={<CreditCard className="w-5 h-5" />}
        />
      </div>

      {/* Main Grid: Today's Schedule & Academic Gradebook */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Classes Today & Upcoming Exams */}
        <div className="lg:col-span-7 space-y-6">
          <SoftCard className="overflow-hidden">
            <div className="px-5 py-3.5 bg-institutional-50/80 dark:bg-slate-800/90 border-b border-institutional-200/70 dark:border-slate-700/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-institutional-600 dark:text-institutional-400" />
                <h3 className="text-sm font-bold font-serif text-slate-900 dark:text-slate-100">
                  Classes Today (Monday - Fall Term)
                </h3>
              </div>
              <Badge variant="primary" size="sm">{myTimetableToday.length} Periods</Badge>
            </div>

            <div className="p-5">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {myTimetableToday.map(slot => (
                  <div key={slot.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-mono text-xs font-bold text-institutional-800 dark:text-institutional-200">
                        P{slot.period}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {slot.subjectCode} - {slot.subjectName}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {slot.startTime} – {slot.endTime} • {slot.facultyName} • <span className="font-semibold text-slate-700 dark:text-slate-300">{slot.roomNumber}</span>
                        </p>
                      </div>
                    </div>
                    <Badge variant="neutral" size="sm">Scheduled</Badge>
                  </div>
                ))}
              </div>
            </div>
          </SoftCard>

          {/* Academic Results Published */}
          <SoftCard className="overflow-hidden">
            <div className="px-5 py-3.5 bg-institutional-50/80 dark:bg-slate-800/90 border-b border-institutional-200/70 dark:border-slate-700/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm font-bold font-serif text-slate-900 dark:text-slate-100">
                  Published Examination Results
                </h3>
              </div>
              <Badge variant="success" size="sm">Verified by COE</Badge>
            </div>

            <div className="p-5">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {studentExams.map(e => (
                  <div key={e.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{e.examName}</p>
                      <p className="text-[11px] text-slate-500">
                        {e.subjectCode} ({e.subjectName}) • Exam Date: {e.examDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 font-bold font-mono text-xs">
                        Grade {e.myMarks?.grade} ({e.myMarks?.totalMarks}/100)
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">Status: PASS</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SoftCard>
        </div>

        {/* Right: Fee Ledger, Receipts & University Circulars */}
        <div className="lg:col-span-5 space-y-6">
          {/* Fee Balance & Printable Receipt */}
          <SoftCard className="overflow-hidden">
            <div className="px-5 py-3.5 bg-institutional-50/80 dark:bg-slate-800/90 border-b border-institutional-200/70 dark:border-slate-700/80 flex items-center justify-between">
              <h3 className="text-sm font-bold font-serif text-slate-900 dark:text-slate-100">
                Treasury &amp; Fee Status
              </h3>
              <Badge variant={currentStudent.feeBalance === 0 ? 'success' : 'warning'} size="sm">
                {currentStudent.feeBalance === 0 ? 'Cleared' : 'Pending'}
              </Badge>
            </div>

            <div className="p-5 space-y-2.5 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-500">Invoice Ref:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{studentInvoice?.invoiceNumber || 'INV/2026/F-042'}</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-500">Total Billed:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">INR {studentInvoice?.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Paid Amount:</span>
                  <span className="font-bold text-emerald-600">INR {studentInvoice?.paidAmount.toLocaleString()}</span>
                </div>
              </div>

              {studentPayments.map(p => (
                <div key={p.id} className="flex items-center justify-between p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="font-mono font-bold text-[11px] block">{p.receiptNumber}</span>
                    <span className="text-[10px] text-slate-400">INR {p.amount.toLocaleString()} via {p.paymentMode}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Printer className="w-3.5 h-3.5" />}
                    onClick={() => handleOpenReceipt(p)}
                    className="text-[11px] h-7"
                  >
                    View Receipt
                  </Button>
                </div>
              ))}
            </div>
          </SoftCard>

          {/* Institutional Circulars for Students */}
          <SoftCard className="overflow-hidden">
            <div className="px-5 py-3.5 bg-institutional-50/80 dark:bg-slate-800/90 border-b border-institutional-200/70 dark:border-slate-700/80 flex items-center justify-between">
              <h3 className="text-sm font-bold font-serif text-slate-900 dark:text-slate-100">
                Campus Notices for Scholars
              </h3>
              <Badge variant="primary" size="xs">Bulletins</Badge>
            </div>
            <div className="p-5">
              <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {notices.slice(0, 3).map(n => (
                  <div key={n.id} className="py-2.5">
                    <span className="text-[10px] font-mono text-institutional-600 dark:text-institutional-400 block">{n.referenceNumber}</span>
                    <p className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{n.title}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{n.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </SoftCard>
        </div>
      </div>

      {/* Official Printable Receipt Modal */}
      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        payment={selectedPaymentForReceipt}
        invoice={studentInvoice}
      />
    </div>
  );
};
