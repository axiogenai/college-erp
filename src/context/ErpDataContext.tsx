import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Student, Faculty, Subject, TimetableSlot, AttendanceSession, 
  ExamRecord, FeeInvoice, FeePayment, RefundRequest, 
  AdmissionEnquiry, InstitutionalNotice, AuditLogEntry, SystemHealth,
  AcademicIntervention 
} from '../types';
import { 
  initialStudents, initialFaculty, initialSubjects, 
  initialTimetable, initialAttendanceSessions, initialExamRecords, 
  initialFeeInvoices, initialFeePayments, initialRefundRequests, 
  initialEnquiries, initialNotices, initialAuditLogs, initialSystemHealth,
  initialInterventions 
} from '../data/mockData';
import { useAuth } from './AuthContext';

interface TimetableConflictResult {
  hasConflict: boolean;
  reason?: string;
  conflictingSlot?: TimetableSlot;
}

interface ErpDataContextType {
  // Data lists
  students: Student[];
  faculty: Faculty[];
  subjects: Subject[];
  timetable: TimetableSlot[];
  attendanceSessions: AttendanceSession[];
  examRecords: ExamRecord[];
  feeInvoices: FeeInvoice[];
  feePayments: FeePayment[];
  refundRequests: RefundRequest[];
  enquiries: AdmissionEnquiry[];
  notices: InstitutionalNotice[];
  auditLogs: AuditLogEntry[];
  systemHealth: SystemHealth;
  interventions: AcademicIntervention[];

  // Actions
  addStudent: (student: Omit<Student, 'id'>) => { success: boolean; message: string; student?: Student };
  updateStudent: (id: string, updates: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  
  addFaculty: (faculty: Omit<Faculty, 'id'>) => void;
  updateFaculty: (id: string, updates: Partial<Faculty>) => void;

  checkTimetableConflict: (slot: Omit<TimetableSlot, 'id'>, excludeSlotId?: string) => TimetableConflictResult;
  addTimetableSlot: (slot: Omit<TimetableSlot, 'id'>) => { success: boolean; message: string };
  deleteTimetableSlot: (id: string) => void;

  recordAttendanceSession: (session: Omit<AttendanceSession, 'id' | 'markedAt' | 'totalPresent' | 'totalAbsent' | 'totalStudents'>) => { success: boolean; message: string };

  updateMarksEntry: (examId: string, studentId: string, internalMarks: number, externalMarks: number) => void;
  publishExamResults: (examId: string) => { success: boolean; message: string };

  recordPayment: (invoiceId: string, amount: number, paymentMode: FeePayment['paymentMode'], transactionRef: string) => { success: boolean; receiptNumber?: string; message: string };
  processRefund: (refundId: string, action: 'approve' | 'reject', remarks: string) => void;
  addFeeInvoice: (invoiceData: Omit<FeeInvoice, 'id' | 'invoiceNumber'>) => { success: boolean; message: string; invoice: FeeInvoice };

  updateEnquiryStatus: (enquiryId: string, newStatus: AdmissionEnquiry['applicationStatus']) => void;
  addEnquiry: (enquiry: Omit<AdmissionEnquiry, 'id' | 'applicationNumber'>) => { success: boolean; message: string; enquiry: AdmissionEnquiry };
  addNotice: (notice: Omit<InstitutionalNotice, 'id' | 'referenceNumber'>) => void;
  
  // Academic Risk Interventions
  addIntervention: (data: Omit<AcademicIntervention, 'id'>) => { success: boolean; message: string; intervention: AcademicIntervention };
  updateInterventionStatus: (id: string, status: AcademicIntervention['status']) => void;

  // DevOps & Infrastructure Controls
  triggerManualBackup: () => { success: boolean; timestamp: string };
  flushRedisCache: () => { success: boolean; message: string };
  optimizeDatabasePool: () => { success: boolean; message: string };
  restartWorkerProcess: (workerId: string) => { success: boolean; message: string };
  toggleMaintenanceMode: () => boolean;

  logAudit: (action: string, module: AuditLogEntry['module'], details: string, status?: AuditLogEntry['status']) => void;
}

const ErpDataContext = createContext<ErpDataContextType | undefined>(undefined);

export const ErpDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('cits_erp_students');
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [faculty, setFaculty] = useState<Faculty[]>(() => {
    const saved = localStorage.getItem('cits_erp_faculty');
    return saved ? JSON.parse(saved) : initialFaculty;
  });

  const [subjects] = useState<Subject[]>(initialSubjects);

  const [timetable, setTimetable] = useState<TimetableSlot[]>(() => {
    const saved = localStorage.getItem('cits_erp_timetable');
    return saved ? JSON.parse(saved) : initialTimetable;
  });

  const [attendanceSessions, setAttendanceSessions] = useState<AttendanceSession[]>(() => {
    const saved = localStorage.getItem('cits_erp_attendance');
    return saved ? JSON.parse(saved) : initialAttendanceSessions;
  });

  const [examRecords, setExamRecords] = useState<ExamRecord[]>(() => {
    const saved = localStorage.getItem('cits_erp_exams');
    return saved ? JSON.parse(saved) : initialExamRecords;
  });

  const [feeInvoices, setFeeInvoices] = useState<FeeInvoice[]>(() => {
    const saved = localStorage.getItem('cits_erp_invoices');
    return saved ? JSON.parse(saved) : initialFeeInvoices;
  });

  const [feePayments, setFeePayments] = useState<FeePayment[]>(() => {
    const saved = localStorage.getItem('cits_erp_payments');
    return saved ? JSON.parse(saved) : initialFeePayments;
  });

  const [refundRequests, setRefundRequests] = useState<RefundRequest[]>(() => {
    const saved = localStorage.getItem('cits_erp_refunds');
    return saved ? JSON.parse(saved) : initialRefundRequests;
  });

  const [enquiries, setEnquiries] = useState<AdmissionEnquiry[]>(() => {
    const saved = localStorage.getItem('cits_erp_enquiries');
    return saved ? JSON.parse(saved) : initialEnquiries;
  });

  const [notices, setNotices] = useState<InstitutionalNotice[]>(() => {
    const saved = localStorage.getItem('cits_erp_notices');
    return saved ? JSON.parse(saved) : initialNotices;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    const saved = localStorage.getItem('cits_erp_audit_logs');
    return saved ? JSON.parse(saved) : initialAuditLogs;
  });

  const [interventions, setInterventions] = useState<AcademicIntervention[]>(() => {
    const saved = localStorage.getItem('cits_erp_interventions');
    return saved ? JSON.parse(saved) : initialInterventions;
  });

  const [systemHealth, setSystemHealth] = useState<SystemHealth>(() => {
    const saved = localStorage.getItem('cits_erp_system_health');
    return saved ? JSON.parse(saved) : initialSystemHealth;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('cits_erp_interventions', JSON.stringify(interventions));
  }, [interventions]);

  useEffect(() => {
    localStorage.setItem('cits_erp_system_health', JSON.stringify(systemHealth));
  }, [systemHealth]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('cits_erp_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('cits_erp_timetable', JSON.stringify(timetable));
  }, [timetable]);

  useEffect(() => {
    localStorage.setItem('cits_erp_attendance', JSON.stringify(attendanceSessions));
  }, [attendanceSessions]);

  useEffect(() => {
    localStorage.setItem('cits_erp_exams', JSON.stringify(examRecords));
  }, [examRecords]);

  useEffect(() => {
    localStorage.setItem('cits_erp_invoices', JSON.stringify(feeInvoices));
  }, [feeInvoices]);

  useEffect(() => {
    localStorage.setItem('cits_erp_payments', JSON.stringify(feePayments));
  }, [feePayments]);

  useEffect(() => {
    localStorage.setItem('cits_erp_refunds', JSON.stringify(refundRequests));
  }, [refundRequests]);

  useEffect(() => {
    localStorage.setItem('cits_erp_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  const logAudit = (action: string, module: AuditLogEntry['module'], details: string, status: AuditLogEntry['status'] = 'success') => {
    const newEntry: AuditLogEntry = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userRole: currentUser.role,
      userName: currentUser.name,
      userId: currentUser.id,
      action,
      module,
      details,
      ipAddress: '192.168.1.100 (Enterprise Network)',
      status
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  // Student operations
  const addStudent = (studentData: Omit<Student, 'id'>) => {
    // Enforce unique enrollment ID
    const exists = students.some(s => s.enrollmentId.toLowerCase() === studentData.enrollmentId.toLowerCase());
    if (exists) {
      logAudit('STUDENT_CREATION_FAILED', 'Students', `Attempted duplicate enrollment ID: ${studentData.enrollmentId}`, 'critical');
      return { success: false, message: `Enrollment ID "${studentData.enrollmentId}" already exists.` };
    }

    const newStudent: Student = {
      ...studentData,
      id: `stu-${Date.now()}`,
      riskLevel: studentData.attendancePercentage < 75 ? 'critical' : studentData.attendancePercentage < 80 ? 'moderate' : 'safe'
    };

    setStudents(prev => [newStudent, ...prev]);
    logAudit('CREATE_STUDENT_RECORD', 'Students', `Created student profile for ${newStudent.fullName} (${newStudent.enrollmentId})`);
    return { success: true, message: 'Student successfully enrolled.', student: newStudent };
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        const updated = { ...s, ...updates };
        if (updates.attendancePercentage !== undefined) {
          updated.riskLevel = updated.attendancePercentage < 75 ? 'critical' : updated.attendancePercentage < 80 ? 'moderate' : 'safe';
        }
        return updated;
      }
      return s;
    }));
    logAudit('UPDATE_STUDENT_RECORD', 'Students', `Updated student details for ID: ${id}`);
  };

  const deleteStudent = (id: string) => {
    const stu = students.find(s => s.id === id);
    setStudents(prev => prev.filter(s => s.id !== id));
    logAudit('ARCHIVED_STUDENT_RECORD', 'Students', `Archived student ${stu?.fullName || id} (${stu?.enrollmentId})`, 'warning');
  };

  // Faculty operations
  const addFaculty = (facData: Omit<Faculty, 'id'>) => {
    const newFac: Faculty = {
      ...facData,
      id: `fac-${Date.now()}`
    };
    setFaculty(prev => [...prev, newFac]);
    logAudit('REGISTER_FACULTY', 'Faculty', `Registered faculty ${newFac.fullName} (${newFac.employeeId})`);
  };

  const updateFaculty = (id: string, updates: Partial<Faculty>) => {
    setFaculty(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
    logAudit('UPDATE_FACULTY', 'Faculty', `Updated faculty credentials for ID: ${id}`);
  };

  // Timetable & Conflict checking
  const checkTimetableConflict = (slot: Omit<TimetableSlot, 'id'>, excludeSlotId?: string): TimetableConflictResult => {
    for (const existing of timetable) {
      if (excludeSlotId && existing.id === excludeSlotId) continue;

      if (existing.day === slot.day && existing.period === slot.period) {
        // Conflict 1: Same classroom
        if (existing.roomNumber.toLowerCase() === slot.roomNumber.toLowerCase()) {
          return {
            hasConflict: true,
            reason: `Classroom "${slot.roomNumber}" is already booked on ${slot.day} Period ${slot.period} by ${existing.subjectCode} (${existing.facultyName}).`,
            conflictingSlot: existing
          };
        }
        // Conflict 2: Same faculty
        if (existing.facultyId === slot.facultyId) {
          return {
            hasConflict: true,
            reason: `Faculty "${existing.facultyName}" is already scheduled to teach ${existing.subjectCode} (${existing.batch}) during Period ${slot.period}.`,
            conflictingSlot: existing
          };
        }
        // Conflict 3: Same batch
        if (existing.batch.toLowerCase() === slot.batch.toLowerCase()) {
          return {
            hasConflict: true,
            reason: `Batch "${slot.batch}" already has ${existing.subjectName} scheduled during Period ${slot.period}.`,
            conflictingSlot: existing
          };
        }
      }
    }
    return { hasConflict: false };
  };

  const addTimetableSlot = (slotData: Omit<TimetableSlot, 'id'>) => {
    const conflict = checkTimetableConflict(slotData);
    if (conflict.hasConflict) {
      logAudit('TIMETABLE_CONFLICT_PREVENTED', 'Timetable', `Blocked conflict: ${conflict.reason}`, 'warning');
      return { success: false, message: conflict.reason || 'Conflict detected in schedule.' };
    }

    const newSlot: TimetableSlot = {
      ...slotData,
      id: `slot-${Date.now()}`
    };
    setTimetable(prev => [...prev, newSlot]);
    logAudit('CREATE_TIMETABLE_SLOT', 'Timetable', `Scheduled ${newSlot.subjectCode} on ${newSlot.day} P${newSlot.period} in ${newSlot.roomNumber}`);
    return { success: true, message: 'Class slot scheduled successfully.' };
  };

  const deleteTimetableSlot = (id: string) => {
    setTimetable(prev => prev.filter(s => s.id !== id));
    logAudit('REMOVED_TIMETABLE_SLOT', 'Timetable', `Removed schedule slot ID: ${id}`);
  };

  // Attendance recording with duplicate check & instant student % update
  const recordAttendanceSession = (sessionData: Omit<AttendanceSession, 'id' | 'markedAt' | 'totalPresent' | 'totalAbsent' | 'totalStudents'>) => {
    // Prevent duplicate attendance for same batch, date, and period
    const duplicate = attendanceSessions.some(
      s => s.date === sessionData.date && s.period === sessionData.period && s.batch === sessionData.batch && s.subjectCode === sessionData.subjectCode
    );

    if (duplicate) {
      logAudit('DUPLICATE_ATTENDANCE_BLOCKED', 'Attendance', `Attempted duplicate session for ${sessionData.batch} on ${sessionData.date} P${sessionData.period}`, 'warning');
      return { success: false, message: `Attendance for ${sessionData.batch} on ${sessionData.date} Period ${sessionData.period} has already been recorded.` };
    }

    const totalStudents = sessionData.entries.length;
    const totalPresent = sessionData.entries.filter(e => e.status === 'present' || e.status === 'late').length;
    const totalAbsent = totalStudents - totalPresent;

    const newSession: AttendanceSession = {
      ...sessionData,
      id: `att-sess-${Date.now()}`,
      markedAt: new Date().toISOString(),
      totalStudents,
      totalPresent,
      totalAbsent
    };

    setAttendanceSessions(prev => [newSession, ...prev]);

    // Recalculate attendance percentages for students who were marked in this session
    setStudents(prev => prev.map(student => {
      const entry = sessionData.entries.find(e => e.studentId === student.id);
      if (!entry) return student;

      // Realistic formula adjustment
      const isPresent = entry.status === 'present' || entry.status === 'late';
      const prevPct = student.attendancePercentage;
      const totalEstimatedClasses = 45; // baseline classes in current semester
      const prevAttended = Math.round((prevPct / 100) * totalEstimatedClasses);
      const newAttended = prevAttended + (isPresent ? 1 : 0);
      const newTotal = totalEstimatedClasses + 1;
      const newPct = parseFloat(((newAttended / newTotal) * 100).toFixed(1));

      return {
        ...student,
        attendancePercentage: newPct,
        riskLevel: newPct < 75 ? 'critical' : newPct < 80 ? 'moderate' : 'safe'
      };
    }));

    logAudit('MARKED_ATTENDANCE', 'Attendance', `Recorded attendance for ${sessionData.subjectCode} (${newSession.totalPresent}/${newSession.totalStudents} present)`);
    return { success: true, message: `Attendance logged successfully for ${newSession.totalStudents} students.` };
  };

  // Examination marks & grade calculation
  const calculateGrade = (total: number): { grade: string; gradePoints: number; status: 'pass' | 'fail' } => {
    if (total >= 90) return { grade: 'O', gradePoints: 10, status: 'pass' };
    if (total >= 80) return { grade: 'A+', gradePoints: 9, status: 'pass' };
    if (total >= 70) return { grade: 'A', gradePoints: 8, status: 'pass' };
    if (total >= 60) return { grade: 'B+', gradePoints: 7, status: 'pass' };
    if (total >= 50) return { grade: 'B', gradePoints: 6, status: 'pass' };
    if (total >= 40) return { grade: 'C', gradePoints: 5, status: 'pass' };
    return { grade: 'F', gradePoints: 0, status: 'fail' };
  };

  const updateMarksEntry = (examId: string, studentId: string, internalMarks: number, externalMarks: number) => {
    const total = internalMarks + externalMarks;
    const { grade, gradePoints, status } = calculateGrade(total);

    setExamRecords(prev => prev.map(exam => {
      if (exam.id !== examId) return exam;
      const updatedMarks = exam.marks.map(m => {
        if (m.studentId !== studentId) return m;
        return {
          ...m,
          internalMarks,
          externalMarks,
          totalMarks: total,
          grade,
          gradePoints,
          status
        };
      });
      return { ...exam, marks: updatedMarks };
    }));

    logAudit('UPDATED_EXAM_MARKS', 'Examinations', `Updated marks for student ID ${studentId} in exam ${examId}`);
  };

  const publishExamResults = (examId: string) => {
    const exam = examRecords.find(e => e.id === examId);
    if (!exam) return { success: false, message: 'Exam record not found.' };

    setExamRecords(prev => prev.map(e => e.id === examId ? {
      ...e,
      status: 'published',
      publishedBy: `${currentUser.name} (${currentUser.designation})`,
      publishedAt: new Date().toISOString()
    } : e));

    logAudit('PUBLISHED_EXAMINATION_RESULTS', 'Examinations', `Officially released results for ${exam.examName} (${exam.subjectCode})`);
    return { success: true, message: `Results for "${exam.examName}" are now officially published.` };
  };

  // Fee management & safe transactions
  const recordPayment = (invoiceId: string, amount: number, paymentMode: FeePayment['paymentMode'], transactionRef: string) => {
    const invoice = feeInvoices.find(i => i.id === invoiceId);
    if (!invoice) return { success: false, message: 'Invoice not found.' };

    const receiptNumber = `RCPT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPayment: FeePayment = {
      id: `pay-${Date.now()}`,
      receiptNumber,
      invoiceId,
      studentId: invoice.studentId,
      studentName: invoice.studentName,
      enrollmentId: invoice.enrollmentId,
      amount,
      paymentMode,
      transactionReference: transactionRef,
      timestamp: new Date().toISOString(),
      collectedBy: currentUser.name,
      status: 'reconciled'
    };

    setFeePayments(prev => [newPayment, ...prev]);

    // Update invoice balance
    const newPaidAmount = invoice.paidAmount + amount;
    const newBalance = Math.max(0, invoice.totalAmount - newPaidAmount);
    const newStatus: FeeInvoice['status'] = newBalance === 0 ? 'paid' : newPaidAmount > 0 ? 'partial' : 'unpaid';

    setFeeInvoices(prev => prev.map(inv => inv.id === invoiceId ? {
      ...inv,
      paidAmount: newPaidAmount,
      balanceAmount: newBalance,
      status: newStatus,
      lastPaymentDate: new Date().toISOString().split('T')[0]
    } : inv));

    // Update student fee status
    setStudents(prev => prev.map(stu => stu.id === invoice.studentId ? {
      ...stu,
      feeBalance: newBalance,
      feeStatus: newStatus === 'paid' ? 'paid' : newStatus === 'partial' ? 'partial' : 'overdue'
    } : stu));

    logAudit('RECORDED_FEE_PAYMENT', 'Finance', `Processed INR ${amount.toLocaleString()} for ${invoice.studentName} (${receiptNumber}) via ${paymentMode}`);
    return { success: true, receiptNumber, message: `Payment of INR ${amount.toLocaleString()} verified. Receipt ${receiptNumber} generated.` };
  };

  const processRefund = (refundId: string, action: 'approve' | 'reject', remarks: string) => {
    setRefundRequests(prev => prev.map(req => req.id === refundId ? {
      ...req,
      status: action === 'approve' ? 'approved' : 'rejected',
      reviewedBy: currentUser.name,
      reviewedDate: new Date().toISOString().split('T')[0],
      reviewRemarks: remarks
    } : req));

    logAudit('PROCESSED_REFUND_REQUEST', 'Finance', `${action.toUpperCase()} refund request ID ${refundId}. Remarks: ${remarks}`);
  };

  const addFeeInvoice = (invData: Omit<FeeInvoice, 'id' | 'invoiceNumber'>) => {
    const invNum = `INV/2026/F-${Math.floor(100 + Math.random() * 900)}`;
    const newInv: FeeInvoice = {
      ...invData,
      id: `inv-${Date.now()}`,
      invoiceNumber: invNum
    };
    setFeeInvoices(prev => [newInv, ...prev]);
    logAudit('GENERATED_FEE_INVOICE', 'Finance', `Issued fee invoice ${invNum} of INR ${newInv.totalAmount.toLocaleString()} for ${newInv.studentName}`);
    return { success: true, message: `Invoice ${invNum} generated for ${newInv.studentName}`, invoice: newInv };
  };

  // Admissions
  const updateEnquiryStatus = (enquiryId: string, newStatus: AdmissionEnquiry['applicationStatus']) => {
    setEnquiries(prev => prev.map(enq => enq.id === enquiryId ? {
      ...enq,
      applicationStatus: newStatus
    } : enq));

    logAudit('UPDATED_ADMISSION_STATUS', 'Admissions', `Progressed application ${enquiryId} to stage: ${newStatus}`);
  };

  const addEnquiry = (enquiryData: Omit<AdmissionEnquiry, 'id' | 'applicationNumber'>) => {
    const appNum = `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEnq: AdmissionEnquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      applicationNumber: appNum
    };
    setEnquiries(prev => [newEnq, ...prev]);
    logAudit('REGISTERED_APPLICANT', 'Admissions', `Registered candidate ${newEnq.candidateName} for ${newEnq.programInterested} (${appNum})`);
    return { success: true, message: `Application ${appNum} created for ${newEnq.candidateName}`, enquiry: newEnq };
  };

  // Notices
  const addNotice = (noticeData: Omit<InstitutionalNotice, 'id' | 'referenceNumber'>) => {
    const refNum = `CITS/GEN/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`;
    const newNotice: InstitutionalNotice = {
      ...noticeData,
      id: `not-${Date.now()}`,
      referenceNumber: refNum
    };

    setNotices(prev => [newNotice, ...prev]);
    logAudit('PUBLISHED_CIRCULAR', 'Auth', `Issued circular "${newNotice.title}" [Ref: ${refNum}]`);
  };

  // Academic Risk Interventions
  const addIntervention = (data: Omit<AcademicIntervention, 'id'>) => {
    const newIntv: AcademicIntervention = {
      ...data,
      id: `intv-${Date.now()}`
    };
    setInterventions(prev => [newIntv, ...prev]);
    logAudit('ACADEMIC_INTERVENTION_RECORDED', 'AI', `Logged ${data.type} for scholar ${data.studentName} (${data.enrollmentId}) with counselor ${data.counselor}`);
    return { success: true, message: `Intervention logged successfully for ${data.studentName}`, intervention: newIntv };
  };

  const updateInterventionStatus = (id: string, status: AcademicIntervention['status']) => {
    setInterventions(prev => prev.map(inv => inv.id === id ? { ...inv, status } : inv));
    logAudit('INTERVENTION_STATUS_UPDATED', 'AI', `Updated intervention ${id} status to ${status}`);
  };

  // DevOps & Infrastructure Controls
  const triggerManualBackup = () => {
    const newTimestamp = new Date().toLocaleString() + ' (Manual Operator Snapshot)';
    setSystemHealth(prev => ({
      ...prev,
      lastBackupTime: newTimestamp
    }));
    logAudit('DEVOPS_MANUAL_BACKUP', 'DevOps', 'Initiated and verified full cryptographic database & object storage snapshot', 'success');
    return { success: true, timestamp: newTimestamp };
  };

  const flushRedisCache = () => {
    setSystemHealth(prev => ({
      ...prev,
      redisCache: 'healthy'
    }));
    logAudit('DEVOPS_CACHE_FLUSH', 'DevOps', 'Flushed Redis transient session & query cache. 1,420 keys evicted.', 'success');
    return { success: true, message: 'Redis cache successfully flushed and re-warmed.' };
  };

  const optimizeDatabasePool = () => {
    setSystemHealth(prev => ({
      ...prev,
      database: 'healthy'
    }));
    logAudit('DEVOPS_DB_VACUUM', 'DevOps', 'Executed VACUUM ANALYZE and recycled idle connections in primary pool.', 'success');
    return { success: true, message: 'PostgreSQL connection pool optimized and dead tuples purged.' };
  };

  const restartWorkerProcess = (workerId: string) => {
    setSystemHealth(prev => ({
      ...prev,
      backgroundWorkers: 'running'
    }));
    logAudit('DEVOPS_WORKER_RESTART', 'DevOps', `Gracefully restarted daemon worker ${workerId}`, 'success');
    return { success: true, message: `Daemon worker ${workerId} restarted with PID ${Math.floor(1000 + Math.random() * 9000)}.` };
  };

  const toggleMaintenanceMode = () => {
    const nextState = !systemHealth.maintenanceMode;
    setSystemHealth(prev => ({
      ...prev,
      maintenanceMode: nextState
    }));
    logAudit('DEVOPS_MAINTENANCE_TOGGLE', 'DevOps', `System maintenance mode set to ${nextState ? 'ACTIVE' : 'DISABLED'}`, nextState ? 'warning' : 'success');
    return nextState;
  };

  return (
    <ErpDataContext.Provider
      value={{
        students,
        faculty,
        subjects,
        timetable,
        attendanceSessions,
        examRecords,
        feeInvoices,
        feePayments,
        refundRequests,
        enquiries,
        notices,
        auditLogs,
        systemHealth,
        interventions,
        addStudent,
        updateStudent,
        deleteStudent,
        addFaculty,
        updateFaculty,
        checkTimetableConflict,
        addTimetableSlot,
        deleteTimetableSlot,
        recordAttendanceSession,
        updateMarksEntry,
        publishExamResults,
        recordPayment,
        processRefund,
        addFeeInvoice,
        updateEnquiryStatus,
        addEnquiry,
        addNotice,
        addIntervention,
        updateInterventionStatus,
        triggerManualBackup,
        flushRedisCache,
        optimizeDatabasePool,
        restartWorkerProcess,
        toggleMaintenanceMode,
        logAudit
      }}
    >
      {children}
    </ErpDataContext.Provider>
  );
};

export const useErpData = () => {
  const context = useContext(ErpDataContext);
  if (!context) throw new Error('useErpData must be used within ErpDataProvider');
  return context;
};
