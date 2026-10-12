import { 
  UserPersona, Student, Faculty, Subject, TimetableSlot, 
  AttendanceSession, ExamRecord, FeeInvoice, FeePayment, 
  RefundRequest, AdmissionEnquiry, InstitutionalNotice, 
  AuditLogEntry, SystemHealth, AcademicIntervention 
} from '../types';

export const defaultPersonas: Record<string, UserPersona> = {
  principal: {
    id: 'user-principal-01',
    name: 'Dr. V. S. Ramachandran',
    role: 'principal',
    designation: 'Director & Executive Principal',
    department: 'Institutional Administration',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    email: 'principal@axiogen.edu.in',
    phone: '+91 98450 11200',
    employeeId: 'ADM-DIR-001'
  },
  faculty: {
    id: 'user-faculty-02',
    name: 'Dr. Meera Nambiar',
    role: 'faculty',
    designation: 'Professor & Dean of Academic Affairs',
    department: 'Computer Science & Engineering',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    email: 'meera.nambiar@axiogen.edu.in',
    phone: '+91 94480 33411',
    employeeId: 'FAC-CSE-014'
  },
  student: {
    id: 'user-student-aditya',
    name: 'Aditya Verma',
    role: 'student',
    designation: 'Undergraduate Scholar (Year 3)',
    department: 'Computer Science & Engineering',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
    email: 'aditya.verma24@axiogen.edu.in',
    phone: '+91 99801 77234',
    studentId: 'STU-2024-CS-042'
  },
  accountant: {
    id: 'user-accountant-04',
    name: 'Mr. Rajeshwar Rao, CA',
    role: 'accountant',
    designation: 'Chief Bursar & Comptroller of Finance',
    department: 'Treasury & Accounts',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    email: 'bursar.accounts@axiogen.edu.in',
    phone: '+91 98802 66500',
    employeeId: 'FIN-BUR-003'
  }
};

export const initialStudents: Student[] = [
  {
    id: 'stu-01',
    enrollmentId: 'STU-2024-CS-042',
    fullName: 'Aditya Verma',
    email: 'aditya.verma24@axiogen.edu.in',
    phone: '+91 99801 77234',
    department: 'Computer Science & Engineering',
    program: 'B.Tech Computer Science',
    batch: '2024–2028',
    currentSemester: 5,
    cgpa: 8.84,
    sgpa: 9.10,
    attendancePercentage: 88.5,
    academicRiskScore: 12,
    riskLevel: 'safe',
    riskFactors: ['Consistent attendance', 'Top quartile test marks'],
    feeStatus: 'paid',
    feeBalance: 0,
    status: 'active',
    guardianName: 'Ramesh Verma',
    guardianPhone: '+91 98450 44321',
    admissionDate: '2024-08-01',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'stu-02',
    enrollmentId: 'STU-2024-CS-019',
    fullName: 'Priya Sundaram',
    email: 'priya.s@axiogen.edu.in',
    phone: '+91 98452 11982',
    department: 'Computer Science & Engineering',
    program: 'B.Tech Computer Science',
    batch: '2024–2028',
    currentSemester: 5,
    cgpa: 9.42,
    sgpa: 9.60,
    attendancePercentage: 94.2,
    academicRiskScore: 4,
    riskLevel: 'safe',
    riskFactors: ['Dean Honor List Candidate', 'Zero disciplinary records'],
    feeStatus: 'paid',
    feeBalance: 0,
    status: 'active',
    guardianName: 'K. Sundaram',
    guardianPhone: '+91 94481 99201',
    admissionDate: '2024-08-01',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'stu-03',
    enrollmentId: 'STU-2024-CS-088',
    fullName: 'Rohan Deshmukh',
    email: 'rohan.d@axiogen.edu.in',
    phone: '+91 97312 44510',
    department: 'Computer Science & Engineering',
    program: 'B.Tech Computer Science',
    batch: '2024–2028',
    currentSemester: 5,
    cgpa: 6.21,
    sgpa: 5.90,
    attendancePercentage: 68.4,
    academicRiskScore: 78,
    riskLevel: 'critical',
    riskFactors: ['Attendance below 75% threshold', 'Declined in Mid-Term 1 (Operating Systems)', '3 consecutive lab absences'],
    feeStatus: 'overdue',
    feeBalance: 42500,
    status: 'probation',
    guardianName: 'Sunil Deshmukh',
    guardianPhone: '+91 98801 22345',
    admissionDate: '2024-08-01',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'stu-04',
    enrollmentId: 'STU-2024-AI-011',
    fullName: 'Ananya Roy',
    email: 'ananya.roy@axiogen.edu.in',
    phone: '+91 98701 55678',
    department: 'Artificial Intelligence & Data Science',
    program: 'B.Tech AI & Data Science',
    batch: '2024–2028',
    currentSemester: 5,
    cgpa: 8.15,
    sgpa: 8.35,
    attendancePercentage: 81.0,
    academicRiskScore: 24,
    riskLevel: 'safe',
    riskFactors: ['Regular submissions', 'Good theoretical performance'],
    feeStatus: 'partial',
    feeBalance: 18000,
    status: 'active',
    guardianName: 'Amitava Roy',
    guardianPhone: '+91 94330 88712',
    admissionDate: '2024-08-02',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'stu-05',
    enrollmentId: 'STU-2024-ECE-034',
    fullName: 'Farhan Akhtar Malik',
    email: 'farhan.malik@axiogen.edu.in',
    phone: '+91 99112 33456',
    department: 'Electronics & Communication',
    program: 'B.Tech Electronics & Comm',
    batch: '2024–2028',
    currentSemester: 5,
    cgpa: 7.45,
    sgpa: 7.10,
    attendancePercentage: 72.8,
    academicRiskScore: 58,
    riskLevel: 'moderate',
    riskFactors: ['Attendance borderline (<75% overall)', 'Medical leave documented for 4 days'],
    feeStatus: 'paid',
    feeBalance: 0,
    status: 'active',
    guardianName: 'Tariq Malik',
    guardianPhone: '+91 98200 44567',
    admissionDate: '2024-08-03',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'stu-06',
    enrollmentId: 'STU-2024-ME-008',
    fullName: 'Kavya Nambeesan',
    email: 'kavya.n@axiogen.edu.in',
    phone: '+91 94471 22340',
    department: 'Mechanical Engineering',
    program: 'B.Tech Mechanical',
    batch: '2024–2028',
    currentSemester: 5,
    cgpa: 8.65,
    sgpa: 8.90,
    attendancePercentage: 91.2,
    academicRiskScore: 10,
    riskLevel: 'safe',
    riskFactors: ['Strong laboratory record', 'SAE collegiate club lead'],
    feeStatus: 'paid',
    feeBalance: 0,
    status: 'active',
    guardianName: 'P. Nambeesan',
    guardianPhone: '+91 94470 11980',
    admissionDate: '2024-08-01',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'stu-07',
    enrollmentId: 'STU-2023-MBA-022',
    fullName: 'Vikramaditya Rathore',
    email: 'vikram.r@axiogen.edu.in',
    phone: '+91 98290 66781',
    department: 'School of Management',
    program: 'MBA Executive',
    batch: '2023–2025',
    currentSemester: 3,
    cgpa: 8.92,
    sgpa: 9.05,
    attendancePercentage: 86.0,
    academicRiskScore: 15,
    riskLevel: 'safe',
    riskFactors: ['Corporate consultancy internship ongoing'],
    feeStatus: 'paid',
    feeBalance: 0,
    status: 'active',
    guardianName: 'Digvijay Rathore',
    guardianPhone: '+91 98290 11234',
    admissionDate: '2023-07-15',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'stu-08',
    enrollmentId: 'STU-2024-CS-102',
    fullName: 'Sneha Kulkarni',
    email: 'sneha.k@axiogen.edu.in',
    phone: '+91 97654 32109',
    department: 'Computer Science & Engineering',
    program: 'B.Tech Computer Science',
    batch: '2024–2028',
    currentSemester: 5,
    cgpa: 7.88,
    sgpa: 8.10,
    attendancePercentage: 84.5,
    academicRiskScore: 20,
    riskLevel: 'safe',
    riskFactors: ['Active in IEEE student chapter'],
    feeStatus: 'paid',
    feeBalance: 0,
    status: 'active',
    guardianName: 'V. Kulkarni',
    guardianPhone: '+91 98220 54321',
    admissionDate: '2024-08-01',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
  }
];

export const initialFaculty: Faculty[] = [
  {
    id: 'fac-01',
    employeeId: 'FAC-CSE-014',
    fullName: 'Dr. Meera Nambiar',
    email: 'meera.nambiar@axiogen.edu.in',
    phone: '+91 94480 33411',
    department: 'Computer Science & Engineering',
    designation: 'Professor & Dean of Academic Affairs',
    qualification: 'Ph.D. (IIT Madras), M.Tech (IISc Bangalore)',
    specialization: 'Distributed Systems & Cloud Architecture',
    assignedSubjects: ['CS501', 'CS505'],
    weeklyHours: 14,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'fac-02',
    employeeId: 'FAC-CSE-028',
    fullName: 'Prof. Arvind Swaminathan',
    email: 'arvind.s@axiogen.edu.in',
    phone: '+91 98450 77123',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor',
    qualification: 'Ph.D. (BITS Pilani)',
    specialization: 'Algorithms & Computational Complexity',
    assignedSubjects: ['CS502'],
    weeklyHours: 16,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'fac-03',
    employeeId: 'FAC-AI-009',
    fullName: 'Dr. Sanyukta Ghosh',
    email: 'sanyukta.ghosh@axiogen.edu.in',
    phone: '+91 98310 99420',
    department: 'Artificial Intelligence & Data Science',
    designation: 'HOD & Associate Professor',
    qualification: 'Ph.D. (Carnegie Mellon Postdoc, IIT Kharagpur)',
    specialization: 'Deep Learning & Natural Language Processing',
    assignedSubjects: ['AI501', 'CS504'],
    weeklyHours: 15,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'fac-04',
    employeeId: 'FAC-ECE-012',
    fullName: 'Dr. K. R. Venkatraman',
    email: 'kr.venkat@axiogen.edu.in',
    phone: '+91 94441 55620',
    department: 'Electronics & Communication',
    designation: 'Senior Professor',
    qualification: 'Ph.D. (IIT Delhi)',
    specialization: 'VLSI Design & Embedded Systems',
    assignedSubjects: ['EC501'],
    weeklyHours: 12,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'fac-05',
    employeeId: 'FAC-ME-007',
    fullName: 'Prof. Harpreet Singh Sodhi',
    email: 'harpreet.sodhi@axiogen.edu.in',
    phone: '+91 98140 22319',
    department: 'Mechanical Engineering',
    designation: 'Associate Professor',
    qualification: 'M.Tech (IIT Roorkee)',
    specialization: 'Thermodynamics & Computational Fluid Dynamics',
    assignedSubjects: ['ME501'],
    weeklyHours: 16,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200'
  }
];

export const initialSubjects: Subject[] = [
  {
    id: 'sub-01',
    code: 'CS501',
    name: 'Operating Systems & Kernels',
    department: 'Computer Science & Engineering',
    semester: 5,
    credits: 4,
    type: 'Theory',
    assignedFacultyId: 'fac-01',
    syllabusCompletion: 74
  },
  {
    id: 'sub-02',
    code: 'CS502',
    name: 'Design & Analysis of Algorithms',
    department: 'Computer Science & Engineering',
    semester: 5,
    credits: 4,
    type: 'Theory',
    assignedFacultyId: 'fac-02',
    syllabusCompletion: 80
  },
  {
    id: 'sub-03',
    code: 'CS503',
    name: 'Database Management Systems',
    department: 'Computer Science & Engineering',
    semester: 5,
    credits: 4,
    type: 'Theory',
    assignedFacultyId: 'fac-01',
    syllabusCompletion: 70
  },
  {
    id: 'sub-04',
    code: 'CS504',
    name: 'Machine Learning Foundations',
    department: 'Artificial Intelligence & Data Science',
    semester: 5,
    credits: 3,
    type: 'Theory',
    assignedFacultyId: 'fac-03',
    syllabusCompletion: 65
  },
  {
    id: 'sub-05',
    code: 'CS505',
    name: 'Operating Systems & Systems Lab',
    department: 'Computer Science & Engineering',
    semester: 5,
    credits: 2,
    type: 'Practical',
    assignedFacultyId: 'fac-01',
    syllabusCompletion: 82
  }
];

export const initialTimetable: TimetableSlot[] = [
  // Monday
  {
    id: 'slot-mon-1',
    day: 'Monday',
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
  },
  {
    id: 'slot-mon-2',
    day: 'Monday',
    period: 2,
    startTime: '10:00 AM',
    endTime: '10:55 AM',
    batch: 'B.Tech CSE - 2024 Sec A',
    semester: 5,
    subjectCode: 'CS502',
    subjectName: 'Design & Analysis of Algorithms',
    facultyId: 'fac-02',
    facultyName: 'Prof. Arvind Swaminathan',
    roomNumber: 'LH-301 (Aryabhata Hall)'
  },
  {
    id: 'slot-mon-3',
    day: 'Monday',
    period: 3,
    startTime: '11:15 AM',
    endTime: '12:10 PM',
    batch: 'B.Tech CSE - 2024 Sec A',
    semester: 5,
    subjectCode: 'CS504',
    subjectName: 'Machine Learning Foundations',
    facultyId: 'fac-03',
    facultyName: 'Dr. Sanyukta Ghosh',
    roomNumber: 'LH-301 (Aryabhata Hall)'
  },
  {
    id: 'slot-mon-4',
    day: 'Monday',
    period: 4,
    startTime: '01:15 PM',
    endTime: '03:00 PM',
    batch: 'B.Tech CSE - 2024 Sec A',
    semester: 5,
    subjectCode: 'CS505',
    subjectName: 'Operating Systems & Systems Lab',
    facultyId: 'fac-01',
    facultyName: 'Dr. Meera Nambiar',
    roomNumber: 'CS Advanced Lab 2'
  },
  // Tuesday
  {
    id: 'slot-tue-1',
    day: 'Tuesday',
    period: 1,
    startTime: '09:00 AM',
    endTime: '09:55 AM',
    batch: 'B.Tech CSE - 2024 Sec A',
    semester: 5,
    subjectCode: 'CS502',
    subjectName: 'Design & Analysis of Algorithms',
    facultyId: 'fac-02',
    facultyName: 'Prof. Arvind Swaminathan',
    roomNumber: 'LH-301 (Aryabhata Hall)'
  },
  {
    id: 'slot-tue-2',
    day: 'Tuesday',
    period: 2,
    startTime: '10:00 AM',
    endTime: '10:55 AM',
    batch: 'B.Tech CSE - 2024 Sec A',
    semester: 5,
    subjectCode: 'CS501',
    subjectName: 'Operating Systems & Kernels',
    facultyId: 'fac-01',
    facultyName: 'Dr. Meera Nambiar',
    roomNumber: 'LH-301 (Aryabhata Hall)'
  },
  // Wednesday
  {
    id: 'slot-wed-1',
    day: 'Wednesday',
    period: 1,
    startTime: '09:00 AM',
    endTime: '09:55 AM',
    batch: 'B.Tech CSE - 2024 Sec A',
    semester: 5,
    subjectCode: 'CS504',
    subjectName: 'Machine Learning Foundations',
    facultyId: 'fac-03',
    facultyName: 'Dr. Sanyukta Ghosh',
    roomNumber: 'LH-301 (Aryabhata Hall)'
  },
  {
    id: 'slot-wed-2',
    day: 'Wednesday',
    period: 2,
    startTime: '10:00 AM',
    endTime: '10:55 AM',
    batch: 'B.Tech CSE - 2024 Sec A',
    semester: 5,
    subjectCode: 'CS503',
    subjectName: 'Database Management Systems',
    facultyId: 'fac-01',
    facultyName: 'Dr. Meera Nambiar',
    roomNumber: 'LH-301 (Aryabhata Hall)'
  }
];

export const initialAttendanceSessions: AttendanceSession[] = [
  {
    id: 'att-sess-01',
    date: '2026-10-08',
    period: 1,
    subjectCode: 'CS501',
    subjectName: 'Operating Systems & Kernels',
    batch: 'B.Tech CSE - 2024 Sec A',
    semester: 5,
    facultyId: 'fac-01',
    facultyName: 'Dr. Meera Nambiar',
    markedAt: '2026-10-08T09:55:00Z',
    entries: [
      { studentId: 'stu-01', enrollmentId: 'STU-2024-CS-042', studentName: 'Aditya Verma', status: 'present' },
      { studentId: 'stu-02', enrollmentId: 'STU-2024-CS-019', studentName: 'Priya Sundaram', status: 'present' },
      { studentId: 'stu-03', enrollmentId: 'STU-2024-CS-088', studentName: 'Rohan Deshmukh', status: 'absent', remarks: 'Unexcused Absence' },
      { studentId: 'stu-08', enrollmentId: 'STU-2024-CS-102', studentName: 'Sneha Kulkarni', status: 'present' }
    ],
    totalPresent: 3,
    totalAbsent: 1,
    totalStudents: 4
  },
  {
    id: 'att-sess-02',
    date: '2026-10-07',
    period: 2,
    subjectCode: 'CS502',
    subjectName: 'Design & Analysis of Algorithms',
    batch: 'B.Tech CSE - 2024 Sec A',
    semester: 5,
    facultyId: 'fac-02',
    facultyName: 'Prof. Arvind Swaminathan',
    markedAt: '2026-10-07T10:55:00Z',
    entries: [
      { studentId: 'stu-01', enrollmentId: 'STU-2024-CS-042', studentName: 'Aditya Verma', status: 'present' },
      { studentId: 'stu-02', enrollmentId: 'STU-2024-CS-019', studentName: 'Priya Sundaram', status: 'present' },
      { studentId: 'stu-03', enrollmentId: 'STU-2024-CS-088', studentName: 'Rohan Deshmukh', status: 'absent', remarks: 'Unexcused Absence' },
      { studentId: 'stu-08', enrollmentId: 'STU-2024-CS-102', studentName: 'Sneha Kulkarni', status: 'present' }
    ],
    totalPresent: 3,
    totalAbsent: 1,
    totalStudents: 4
  }
];

export const initialExamRecords: ExamRecord[] = [
  {
    id: 'exam-01',
    examName: 'Mid-Semester Assessment I (Fall 2026)',
    examType: 'Mid-Term 1',
    academicYear: '2026–2027',
    semester: 5,
    subjectCode: 'CS501',
    subjectName: 'Operating Systems & Kernels',
    maxMarks: 40,
    examDate: '2026-09-22',
    status: 'published',
    publishedBy: 'Dr. V. S. Ramachandran (Principal)',
    publishedAt: '2026-09-28T16:00:00Z',
    marks: [
      { studentId: 'stu-01', enrollmentId: 'STU-2024-CS-042', studentName: 'Aditya Verma', internalMarks: 36, externalMarks: 52, totalMarks: 88, grade: 'A+', gradePoints: 9, status: 'pass' },
      { studentId: 'stu-02', enrollmentId: 'STU-2024-CS-019', studentName: 'Priya Sundaram', internalMarks: 39, externalMarks: 58, totalMarks: 97, grade: 'O', gradePoints: 10, status: 'pass' },
      { studentId: 'stu-03', enrollmentId: 'STU-2024-CS-088', studentName: 'Rohan Deshmukh', internalMarks: 18, externalMarks: 28, totalMarks: 46, grade: 'C', gradePoints: 5, status: 'pass' },
      { studentId: 'stu-08', enrollmentId: 'STU-2024-CS-102', studentName: 'Sneha Kulkarni', internalMarks: 32, externalMarks: 48, totalMarks: 80, grade: 'A', gradePoints: 8, status: 'pass' }
    ]
  },
  {
    id: 'exam-02',
    examName: 'Mid-Semester Assessment II (Fall 2026)',
    examType: 'Mid-Term 2',
    academicYear: '2026–2027',
    semester: 5,
    subjectCode: 'CS502',
    subjectName: 'Design & Analysis of Algorithms',
    maxMarks: 40,
    examDate: '2026-10-04',
    status: 'under_review',
    marks: [
      { studentId: 'stu-01', enrollmentId: 'STU-2024-CS-042', studentName: 'Aditya Verma', internalMarks: 37, externalMarks: 54, totalMarks: 91, grade: 'O', gradePoints: 10, status: 'pass' },
      { studentId: 'stu-02', enrollmentId: 'STU-2024-CS-019', studentName: 'Priya Sundaram', internalMarks: 38, externalMarks: 56, totalMarks: 94, grade: 'O', gradePoints: 10, status: 'pass' },
      { studentId: 'stu-03', enrollmentId: 'STU-2024-CS-088', studentName: 'Rohan Deshmukh', internalMarks: 16, externalMarks: 22, totalMarks: 38, grade: 'F', gradePoints: 0, status: 'fail' },
      { studentId: 'stu-08', enrollmentId: 'STU-2024-CS-102', studentName: 'Sneha Kulkarni', internalMarks: 30, externalMarks: 46, totalMarks: 76, grade: 'A', gradePoints: 8, status: 'pass' }
    ]
  }
];

export const initialFeeInvoices: FeeInvoice[] = [
  {
    id: 'inv-2026-001',
    invoiceNumber: 'INV/2026/F-042',
    studentId: 'stu-01',
    enrollmentId: 'STU-2024-CS-042',
    studentName: 'Aditya Verma',
    department: 'Computer Science & Engineering',
    semester: 5,
    academicYear: '2026–2027',
    components: {
      tuitionFee: 65000,
      labFee: 12000,
      libraryFee: 4500,
      developmentFee: 8500,
      examinationFee: 3000
    },
    totalAmount: 93000,
    paidAmount: 93000,
    balanceAmount: 0,
    dueDate: '2026-08-25',
    status: 'paid',
    lastPaymentDate: '2026-08-14'
  },
  {
    id: 'inv-2026-002',
    invoiceNumber: 'INV/2026/F-019',
    studentId: 'stu-02',
    enrollmentId: 'STU-2024-CS-019',
    studentName: 'Priya Sundaram',
    department: 'Computer Science & Engineering',
    semester: 5,
    academicYear: '2026–2027',
    components: {
      tuitionFee: 65000,
      labFee: 12000,
      libraryFee: 4500,
      developmentFee: 8500,
      examinationFee: 3000
    },
    totalAmount: 93000,
    paidAmount: 93000,
    balanceAmount: 0,
    dueDate: '2026-08-25',
    status: 'paid',
    lastPaymentDate: '2026-08-10'
  },
  {
    id: 'inv-2026-003',
    invoiceNumber: 'INV/2026/F-088',
    studentId: 'stu-03',
    enrollmentId: 'STU-2024-CS-088',
    studentName: 'Rohan Deshmukh',
    department: 'Computer Science & Engineering',
    semester: 5,
    academicYear: '2026–2027',
    components: {
      tuitionFee: 65000,
      labFee: 12000,
      libraryFee: 4500,
      developmentFee: 8500,
      examinationFee: 3000
    },
    totalAmount: 93000,
    paidAmount: 50500,
    balanceAmount: 42500,
    dueDate: '2026-08-25',
    status: 'overdue',
    lastPaymentDate: '2026-08-22'
  },
  {
    id: 'inv-2026-004',
    invoiceNumber: 'INV/2026/F-011',
    studentId: 'stu-04',
    enrollmentId: 'STU-2024-AI-011',
    studentName: 'Ananya Roy',
    department: 'Artificial Intelligence & Data Science',
    semester: 5,
    academicYear: '2026–2027',
    components: {
      tuitionFee: 70000,
      labFee: 15000,
      libraryFee: 4500,
      developmentFee: 8500,
      examinationFee: 3000
    },
    totalAmount: 101000,
    paidAmount: 83000,
    balanceAmount: 18000,
    dueDate: '2026-09-30',
    status: 'partial',
    lastPaymentDate: '2026-09-12'
  }
];

export const initialFeePayments: FeePayment[] = [
  {
    id: 'pay-001',
    receiptNumber: 'RCPT-2026-0941',
    invoiceId: 'inv-2026-001',
    studentId: 'stu-01',
    studentName: 'Aditya Verma',
    enrollmentId: 'STU-2024-CS-042',
    amount: 93000,
    paymentMode: 'Net Banking',
    transactionReference: 'HDFC94218084128',
    timestamp: '2026-08-14T11:42:10Z',
    collectedBy: 'Razorpay PG Settlement Node 1',
    status: 'reconciled'
  },
  {
    id: 'pay-002',
    receiptNumber: 'RCPT-2026-0899',
    invoiceId: 'inv-2026-002',
    studentId: 'stu-02',
    studentName: 'Priya Sundaram',
    enrollmentId: 'STU-2024-CS-019',
    amount: 93000,
    paymentMode: 'UPI Gateway',
    transactionReference: 'UPI-SBI-88291040',
    timestamp: '2026-08-10T14:15:32Z',
    collectedBy: 'Razorpay PG Settlement Node 1',
    status: 'reconciled'
  },
  {
    id: 'pay-003',
    receiptNumber: 'RCPT-2026-1120',
    invoiceId: 'inv-2026-003',
    studentId: 'stu-03',
    studentName: 'Rohan Deshmukh',
    enrollmentId: 'STU-2024-CS-088',
    amount: 50500,
    paymentMode: 'Demand Draft',
    transactionReference: 'DD-PNB-094182',
    timestamp: '2026-08-22T10:05:00Z',
    collectedBy: 'Mr. Rajeshwar Rao (Counter 2)',
    status: 'reconciled'
  }
];

export const initialRefundRequests: RefundRequest[] = [
  {
    id: 'ref-001',
    requestNumber: 'REF-2026-018',
    studentId: 'stu-05',
    studentName: 'Farhan Akhtar Malik',
    enrollmentId: 'STU-2024-ECE-034',
    amount: 8500,
    reason: 'Duplicate payment processed on portal during high traffic gateway retry',
    requestedDate: '2026-09-05',
    status: 'pending'
  },
  {
    id: 'ref-002',
    requestNumber: 'REF-2026-012',
    studentId: 'stu-06',
    studentName: 'Kavya Nambeesan',
    enrollmentId: 'STU-2024-ME-008',
    amount: 5000,
    reason: 'Hostel caution deposit refund post room reallocation',
    requestedDate: '2026-08-18',
    status: 'approved',
    reviewedBy: 'Mr. Rajeshwar Rao, CA',
    reviewedDate: '2026-08-20',
    reviewRemarks: 'Verified against treasury records and cleared for NEFT reversal.'
  }
];

export const initialEnquiries: AdmissionEnquiry[] = [
  {
    id: 'adm-01',
    applicationNumber: 'APP-2026-0819',
    candidateName: 'Tanvi Shrivastava',
    email: 'tanvi.shri@gmail.com',
    phone: '+91 98260 11984',
    programInterested: 'B.Tech AI & Data Science',
    category: 'General',
    qualifyingExamScore: 94.8,
    applicationStatus: 'documents_verified',
    documents: [
      { name: '10th Marksheet', status: 'verified' },
      { name: '12th Marksheet', status: 'verified' },
      { name: 'JEE Score Card', status: 'verified' },
      { name: 'Aadhar Card', status: 'verified' }
    ],
    appliedDate: '2026-09-10',
    assignedCounselor: 'Dr. Sanyukta Ghosh',
    notes: 'High merit profile, eligible for Axiogen Merit Scholarship (25%).'
  },
  {
    id: 'adm-02',
    applicationNumber: 'APP-2026-0940',
    candidateName: 'Amanpreet Singh',
    email: 'aman.singh@gmail.com',
    phone: '+91 98720 44512',
    programInterested: 'B.Tech Computer Science',
    category: 'General',
    qualifyingExamScore: 88.2,
    applicationStatus: 'under_review',
    documents: [
      { name: '10th Marksheet', status: 'verified' },
      { name: '12th Marksheet', status: 'verified' },
      { name: 'JEE Score Card', status: 'pending' },
      { name: 'Aadhar Card', status: 'verified' }
    ],
    appliedDate: '2026-09-15',
    assignedCounselor: 'Prof. Arvind Swaminathan',
    notes: 'Awaiting submission of updated normalized percentile.'
  },
  {
    id: 'adm-03',
    applicationNumber: 'APP-2026-0701',
    candidateName: 'Divya Iyer',
    email: 'divya.iyer@gmail.com',
    phone: '+91 94440 88910',
    programInterested: 'MBA Executive',
    category: 'General',
    qualifyingExamScore: 96.4,
    applicationStatus: 'enrolled',
    documents: [
      { name: 'Degree Certificate', status: 'verified' },
      { name: 'CAT Scorecard', status: 'verified' },
      { name: 'Experience Letter', status: 'verified' }
    ],
    appliedDate: '2026-08-01',
    assignedCounselor: 'Prof. Vikramaditya Rathore',
    notes: 'Provisional enrollment confirmed. First installment paid.'
  }
];

export const initialNotices: InstitutionalNotice[] = [
  {
    id: 'not-01',
    referenceNumber: 'CITS/ACAD/2026/041',
    title: 'Schedule for End-Semester Examinations (Fall 2026)',
    category: 'Examination',
    priority: 'urgent',
    publishDate: '2026-10-05',
    validUntil: '2026-12-15',
    content: 'All undergraduate and postgraduate students are hereby notified that the End-Semester Theory Examinations for Fall 2026 will commence on December 1, 2026. Hall tickets will be downloadable via the ERP portal for students having above 75% attendance.',
    author: 'Office of the Controller of Examinations',
    targetAudience: 'All',
    isPublished: true,
    isAiAssisted: false
  },
  {
    id: 'not-02',
    referenceNumber: 'CITS/BURSAR/2026/019',
    title: 'Final Reminder: Spring 2027 Advance Term Fee Dues',
    category: 'Fee/Finance',
    priority: 'high',
    publishDate: '2026-10-01',
    validUntil: '2026-10-31',
    content: 'Students with overdue balances are required to clear pending fee invoices on or before October 31, 2026 to ensure uninterrupted access to the course management and LMS portals.',
    author: 'Treasury & Bursar Office',
    targetAudience: 'Students',
    isPublished: true,
    isAiAssisted: false
  },
  {
    id: 'not-03',
    referenceNumber: 'CITS/TPO/2026/088',
    title: 'Campus Recruitment Drive: Microsoft & Oracle (Batch 2027 & 2026)',
    category: 'Placement',
    priority: 'medium',
    publishDate: '2026-09-28',
    validUntil: '2026-10-20',
    content: 'The Training & Placement Cell announces the scheduled campus visit of Microsoft India and Oracle Corp for Software Development Engineer (SDE) roles. Eligible students with CGPA >= 8.0 and zero standing backlogs may register via the placement link.',
    author: 'Dean, Corporate Relations & Placements',
    targetAudience: 'Students',
    isPublished: true,
    isAiAssisted: true
  }
];

export const initialAuditLogs: AuditLogEntry[] = [
  {
    id: 'aud-01',
    timestamp: '2026-10-09T18:45:10Z',
    userRole: 'principal',
    userName: 'Dr. V. S. Ramachandran',
    userId: 'user-principal-01',
    action: 'PUBLISHED_EXAMINATION_RESULTS',
    module: 'Examinations',
    details: 'Authorized and published results for Mid-Term 1 (CS501 - Operating Systems)',
    ipAddress: '192.168.1.10 (Campus LAN)',
    status: 'success'
  },
  {
    id: 'aud-02',
    timestamp: '2026-10-09T17:30:22Z',
    userRole: 'faculty',
    userName: 'Dr. Meera Nambiar',
    userId: 'user-faculty-02',
    action: 'MARKED_SESSION_ATTENDANCE',
    module: 'Attendance',
    details: 'Recorded attendance for Period 1 (CS501, B.Tech CSE Sec A) - 3 Present, 1 Absent',
    ipAddress: '192.168.1.44 (Faculty WiFi)',
    status: 'success'
  },
  {
    id: 'aud-03',
    timestamp: '2026-10-09T16:12:05Z',
    userRole: 'accountant',
    userName: 'Mr. Rajeshwar Rao, CA',
    userId: 'user-accountant-04',
    action: 'RECONCILED_PAYMENT_GATEWAY',
    module: 'Finance',
    details: 'Settled daily batch HDFC PG transactions totaling INR 3,42,000 without discrepancies',
    ipAddress: '192.168.1.15 (Finance Office)',
    status: 'success'
  },
  {
    id: 'aud-04',
    timestamp: '2026-10-09T15:02:18Z',
    userRole: 'student',
    userName: 'Aditya Verma',
    userId: 'user-student-aditya',
    action: 'DOWNLOADED_FEE_RECEIPT',
    module: 'Finance',
    details: 'Generated official stamp-signed receipt for RCPT-2026-0941 (Tuition INR 93,000)',
    ipAddress: '10.20.4.118 (Hostel Block C)',
    status: 'success'
  }
];

export const initialSystemHealth: SystemHealth = {
  database: 'healthy',
  redisCache: 'healthy',
  backgroundWorkers: 'running',
  storageUsageGB: 412.4,
  storageMaxGB: 1000.0,
  activeSessions: 184,
  lastBackupTime: '2026-10-09 04:00 AM IST (Automated Daily Snapshot)',
  maintenanceMode: false
};

export const initialInterventions: AcademicIntervention[] = [
  {
    id: 'intv-01',
    studentId: 'stu-03',
    studentName: 'Rohan Deshmukh',
    enrollmentId: 'STU-2024-CS-088',
    type: 'counseling',
    counselor: 'Dr. Meera Nambiar',
    date: '2026-10-08',
    status: 'in_progress',
    notes: 'Reviewed attendance deficit (68.4%) and Operating Systems mid-term performance. Scholar reported health recovery and committed to compensatory lab sessions.',
    actionItems: 'Attend Saturday recovery lab batch; submit medical certificate for missing 4 days to Academic Registry.'
  },
  {
    id: 'intv-02',
    studentId: 'stu-05',
    studentName: 'Farhan Akhtar Malik',
    enrollmentId: 'STU-2024-ECE-034',
    type: 'warning_letter',
    counselor: 'Academic Registry Office',
    date: '2026-10-07',
    status: 'completed',
    notes: 'Official UGC Attendance Advisory issued regarding borderline attendance (72.8%). Formal notice dispatched to guardian via SMS/email.',
    actionItems: 'Maintain 100% attendance over next 3 weeks to cross statutory 75.0% threshold.'
  }
];

