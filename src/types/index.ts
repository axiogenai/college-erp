export type UserRole = 'principal' | 'faculty' | 'student' | 'accountant';

export interface UserPersona {
  id: string;
  name: string;
  role: UserRole;
  designation: string;
  department?: string;
  avatar: string;
  email: string;
  phone?: string;
  studentId?: string;
  employeeId?: string;
}

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface Student {
  id: string;
  enrollmentId: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  program: string;
  batch: string;
  currentSemester: number;
  cgpa: number;
  sgpa: number;
  attendancePercentage: number;
  academicRiskScore?: number; // 0 to 100
  riskLevel?: 'safe' | 'moderate' | 'critical';
  riskFactors?: string[];
  feeStatus: 'paid' | 'partial' | 'overdue';
  feeBalance: number;
  status: 'active' | 'graduated' | 'suspended' | 'probation';
  guardianName: string;
  guardianPhone: string;
  admissionDate: string;
  avatar?: string;
}

export interface Faculty {
  id: string;
  employeeId: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  qualification: string;
  specialization: string;
  assignedSubjects: string[];
  weeklyHours: number;
  status: 'active' | 'on_leave';
  avatar?: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  department: string;
  semester: number;
  credits: number;
  type: 'Theory' | 'Practical' | 'Elective';
  assignedFacultyId: string;
  syllabusCompletion: number; // percentage
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  period: number; // 1 to 6
  startTime: string;
  endTime: string;
  batch: string;
  semester: number;
  subjectCode: string;
  subjectName: string;
  facultyId: string;
  facultyName: string;
  roomNumber: string;
}

export interface AttendanceEntry {
  studentId: string;
  enrollmentId: string;
  studentName: string;
  status: AttendanceStatus;
  remarks?: string;
}

export interface AttendanceSession {
  id: string;
  date: string;
  period: number;
  subjectCode: string;
  subjectName: string;
  batch: string;
  semester: number;
  facultyId: string;
  facultyName: string;
  markedAt: string;
  entries: AttendanceEntry[];
  totalPresent: number;
  totalAbsent: number;
  totalStudents: number;
}

export interface MarksEntry {
  studentId: string;
  enrollmentId: string;
  studentName: string;
  internalMarks: number; // Max 40
  externalMarks: number; // Max 60
  totalMarks: number;    // Max 100
  grade: string;         // 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'F'
  gradePoints: number;   // 10, 9, 8, 7, 6, 5, 0
  status: 'pass' | 'fail' | 'absent';
}

export interface ExamRecord {
  id: string;
  examName: string;
  examType: 'Mid-Term 1' | 'Mid-Term 2' | 'End-Semester' | 'Practical Lab';
  academicYear: string;
  semester: number;
  subjectCode: string;
  subjectName: string;
  maxMarks: number;
  examDate: string;
  status: 'draft' | 'under_review' | 'published';
  publishedBy?: string;
  publishedAt?: string;
  marks: MarksEntry[];
}

export interface FeeInvoice {
  id: string;
  invoiceNumber: string;
  studentId: string;
  enrollmentId: string;
  studentName: string;
  department: string;
  semester: number;
  academicYear: string;
  components: {
    tuitionFee: number;
    labFee: number;
    libraryFee: number;
    developmentFee: number;
    examinationFee: number;
  };
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  dueDate: string;
  status: 'paid' | 'partial' | 'overdue' | 'unpaid';
  lastPaymentDate?: string;
}

export interface FeePayment {
  id: string;
  receiptNumber: string;
  invoiceId: string;
  studentId: string;
  studentName: string;
  enrollmentId: string;
  amount: number;
  paymentMode: 'Net Banking' | 'UPI Gateway' | 'Credit/Debit Card' | 'NEFT/RTGS' | 'Demand Draft';
  transactionReference: string;
  timestamp: string;
  collectedBy: string;
  status: 'completed' | 'reconciled' | 'flagged';
}

export interface RefundRequest {
  id: string;
  requestNumber: string;
  studentId: string;
  studentName: string;
  enrollmentId: string;
  amount: number;
  reason: string;
  requestedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedDate?: string;
  reviewRemarks?: string;
}

export interface AdmissionEnquiry {
  id: string;
  applicationNumber: string;
  candidateName: string;
  email: string;
  phone: string;
  programInterested: string;
  category: 'General' | 'OBC' | 'SC/ST' | 'Management';
  qualifyingExamScore: number; // e.g. 92.5%
  applicationStatus: 'enquiry' | 'under_review' | 'documents_verified' | 'merit_listed' | 'enrolled' | 'rejected';
  documents: {
    name: string;
    status: 'verified' | 'pending' | 'rejected';
  }[];
  appliedDate: string;
  assignedCounselor: string;
  notes?: string;
}

export interface InstitutionalNotice {
  id: string;
  referenceNumber: string;
  title: string;
  category: 'Academic' | 'Examination' | 'Fee/Finance' | 'Administrative' | 'Placement';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  publishDate: string;
  validUntil: string;
  content: string;
  author: string;
  targetAudience: 'All' | 'Students' | 'Faculty' | 'Staff';
  isPublished: boolean;
  isAiAssisted?: boolean;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userRole: UserRole;
  userName: string;
  userId: string;
  action: string;
  module: 'Students' | 'Faculty' | 'Attendance' | 'Examinations' | 'Finance' | 'Timetable' | 'Admissions' | 'Auth' | 'AI' | 'DevOps' | 'System';
  details: string;
  ipAddress: string;
  status: 'success' | 'warning' | 'critical';
}

export interface SystemHealth {
  database: 'healthy' | 'degraded' | 'offline';
  redisCache: 'healthy' | 'degraded' | 'offline';
  backgroundWorkers: 'running' | 'idle' | 'stopped';
  storageUsageGB: number;
  storageMaxGB: number;
  activeSessions: number;
  lastBackupTime: string;
  maintenanceMode?: boolean;
}

export interface AcademicIntervention {
  id: string;
  studentId: string;
  studentName: string;
  enrollmentId: string;
  type: 'counseling' | 'parent_conference' | 'remedial_class' | 'warning_letter';
  counselor: string;
  date: string;
  status: 'scheduled' | 'in_progress' | 'completed';
  notes: string;
  actionItems: string;
}

