import React, { useState } from 'react';
import { 
  GraduationCap, Search, Filter, Plus, Download, 
  Trash2, Edit, Eye, AlertTriangle, CheckCircle, 
  ChevronRight, Phone, Mail, User 
} from 'lucide-react';
import { SoftCard } from '../common/SoftCard';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { PageHeader } from '../common/PageHeader';
import { Select } from '../common/Select';
import { useErpData } from '../../context/ErpDataContext';
import { useAuth } from '../../context/AuthContext';
import { Student } from '../../types';

export const StudentsModule: React.FC = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useErpData();
  const { hasPermission } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStudentForView, setSelectedStudentForView] = useState<Student | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // New Student Form State
  const [newStudent, setNewStudent] = useState({
    enrollmentId: '',
    fullName: '',
    email: '',
    phone: '',
    department: 'Computer Science & Engineering',
    program: 'B.Tech Computer Science',
    batch: '2024–2028',
    currentSemester: 5,
    cgpa: 8.0,
    sgpa: 8.0,
    attendancePercentage: 85,
    feeStatus: 'paid' as const,
    feeBalance: 0,
    status: 'active' as const,
    guardianName: '',
    guardianPhone: '',
    admissionDate: new Date().toISOString().split('T')[0]
  });

  // Filtered Students
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.enrollmentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDept = selectedDept === 'all' || student.department === selectedDept;
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.enrollmentId || !newStudent.fullName || !newStudent.email) {
      setFormError('Please fill in all mandatory fields.');
      return;
    }

    const res = addStudent(newStudent);
    if (!res.success) {
      setFormError(res.message);
      return;
    }

    setIsAddModalOpen(false);
    setFormError(null);
    setNewStudent({
      enrollmentId: '',
      fullName: '',
      email: '',
      phone: '',
      department: 'Computer Science & Engineering',
      program: 'B.Tech Computer Science',
      batch: '2024–2028',
      currentSemester: 5,
      cgpa: 8.0,
      sgpa: 8.0,
      attendancePercentage: 85,
      feeStatus: 'paid',
      feeBalance: 0,
      status: 'active',
      guardianName: '',
      guardianPhone: '',
      admissionDate: new Date().toISOString().split('T')[0]
    });
  };

  const handleExportCSV = () => {
    const headers = ['Enrollment ID', 'Full Name', 'Department', 'Program', 'Semester', 'CGPA', 'Attendance %', 'Fee Status', 'Status'];
    const rows = filteredStudents.map(s => [
      s.enrollmentId,
      s.fullName,
      s.department,
      s.program,
      s.currentSemester,
      s.cgpa,
      s.attendancePercentage,
      s.feeStatus,
      s.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `axiogen_students_registry_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const canEdit = hasPermission('edit_students');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Registry & Academic Dossier"
        subtitle="Comprehensive centralized student records, attendance tracking, and academic standings"
        icon={<GraduationCap className="w-5 h-5" />}
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              onClick={handleExportCSV}
            >
              Export CSV
            </Button>
            {canEdit && (
              <Button
                variant="primary"
                size="sm"
                icon={<Plus className="w-4 h-4" />}
                onClick={() => {
                  setFormError(null);
                  setIsAddModalOpen(true);
                }}
              >
                Enroll New Student
              </Button>
            )}
          </>
        }
      />

      {/* Filter and Search Bar */}
      <SoftCard className="p-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name, roll number (e.g. STU-2024-CS-042) or email..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-institutional-500 text-slate-800 dark:text-slate-100"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <Select
              className="w-full sm:w-56"
              value={selectedDept}
              onChange={val => setSelectedDept(val)}
              options={[
                { value: 'all', label: 'All Departments' },
                { value: 'Computer Science & Engineering', label: 'Computer Science & Engineering' },
                { value: 'Artificial Intelligence & Data Science', label: 'AI & Data Science' },
                { value: 'Electronics & Communication', label: 'Electronics & Communication' },
                { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
                { value: 'School of Management', label: 'School of Management' },
              ]}
            />

            <Select
              className="w-full sm:w-44"
              value={selectedStatus}
              onChange={val => setSelectedStatus(val)}
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'active', label: 'Active', dotColor: 'bg-emerald-500' },
                { value: 'probation', label: 'Probation / Warning', dotColor: 'bg-rose-500' },
                { value: 'graduated', label: 'Graduated', dotColor: 'bg-slate-400' },
              ]}
            />
          </div>
        </div>
      </SoftCard>

      {/* Students Data Table */}
      <SoftCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-institutional-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-[11px] uppercase tracking-wider border-b border-institutional-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">Student Name &amp; ID</th>
                <th className="px-4 py-3 text-left">Department &amp; Program</th>
                <th className="px-3 py-3 text-center">Semester</th>
                <th className="px-3 py-3 text-center">CGPA</th>
                <th className="px-3 py-3 text-center">Attendance</th>
                <th className="px-3 py-3 text-center">Fee Status</th>
                <th className="px-3 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={student.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.fullName)}&background=0D2235&color=fff`}
                        alt={student.fullName}
                        className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="font-semibold text-xs text-slate-900 dark:text-slate-100 block truncate">{student.fullName}</span>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">{student.enrollmentId}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-xs text-slate-800 dark:text-slate-200 block truncate">{student.department}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">{student.program} • {student.batch}</span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px] font-medium">
                      Sem {student.currentSemester}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center font-mono font-bold text-xs text-slate-900 dark:text-slate-100">
                    {student.cgpa.toFixed(2)}
                  </td>
                  <td className="px-3 py-3 text-center">
                    <Badge
                      variant={student.attendancePercentage >= 80 ? 'success' : student.attendancePercentage >= 75 ? 'warning' : 'danger'}
                      size="sm"
                      dot
                    >
                      {student.attendancePercentage}%
                    </Badge>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <Badge variant={student.feeStatus === 'paid' ? 'success' : student.feeStatus === 'partial' ? 'warning' : 'danger'} size="sm">
                      {student.feeStatus === 'paid' ? 'Paid' : student.feeStatus === 'partial' ? 'Partial' : 'Overdue'}
                    </Badge>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <Badge variant={student.status === 'active' ? 'primary' : student.status === 'probation' ? 'danger' : 'neutral'} size="sm">
                      {student.status === 'active' ? 'Active' : student.status === 'probation' ? 'Probation' : 'Graduated'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedStudentForView(student)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-institutional-700 dark:text-slate-400 dark:hover:text-institutional-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="View Detailed Dossier"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {canEdit && (
                        <button
                          onClick={() => deleteStudent(student.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title="Archive Student"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-400">
                    No students found matching current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </SoftCard>

      {/* View Student Profile Modal */}
      {selectedStudentForView && (
        <Modal
          isOpen={!!selectedStudentForView}
          onClose={() => setSelectedStudentForView(null)}
          title="Student Academic Dossier"
          subtitle={`Verified Institutional Record • Ref #${selectedStudentForView.enrollmentId}`}
          maxWidth="2xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                Axiogen ERP • Academic Registry Engine
              </span>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => window.print()}
                  icon={<Download className="w-3.5 h-3.5" />}
                >
                  Print Dossier
                </Button>
                <Button variant="primary" size="sm" onClick={() => setSelectedStudentForView(null)}>
                  Close Dossier
                </Button>
              </div>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            {/* Executive Profile Card Header */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={selectedStudentForView.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedStudentForView.fullName)}&background=0D2235&color=fff`}
                    alt={selectedStudentForView.fullName}
                    className="w-16 h-16 rounded-xl object-cover ring-2 ring-slate-200 dark:ring-slate-700 shadow-sm shrink-0"
                  />
                  <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full ring-2 ring-white dark:ring-slate-900 ${
                    selectedStudentForView.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold font-sans tracking-tight text-slate-900 dark:text-slate-100">
                      {selectedStudentForView.fullName}
                    </h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-medium mt-0.5">
                    {selectedStudentForView.program}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 mt-1.5">
                    <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
                      {selectedStudentForView.enrollmentId}
                    </span>
                    <span>•</span>
                    <span>Batch {selectedStudentForView.batch}</span>
                    <span>•</span>
                    <span>Sem {selectedStudentForView.currentSemester}</span>
                  </div>
                </div>
              </div>

              <div className="sm:self-start">
                <Badge 
                  variant={selectedStudentForView.status === 'active' ? 'success' : 'danger'} 
                  size="md"
                  dot
                >
                  {selectedStudentForView.status === 'active' ? 'Good Standing' : 'Academic Probation'}
                </Badge>
              </div>
            </div>

            {/* Quick Contact Ribbon */}
            <div className="flex flex-wrap items-center gap-4 px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-medium">{selectedStudentForView.email}</span>
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-mono">{selectedStudentForView.phone}</span>
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-slate-500">
                Admitted: <span className="font-mono text-slate-700 dark:text-slate-300 font-medium">{selectedStudentForView.admissionDate}</span>
              </span>
            </div>

            {/* Unified 4-Metric Dossier Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-slate-800 shadow-soft">
              <div className="p-3 text-center">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Cumulative CGPA
                </span>
                <span className="text-base font-bold font-mono text-slate-900 dark:text-slate-100 block">
                  {selectedStudentForView.cgpa.toFixed(2)}
                </span>
                <span className="text-[10px] text-slate-400">Scale of 10.0</span>
              </div>

              <div className="p-3 text-center">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Semester SGPA
                </span>
                <span className="text-base font-bold font-mono text-slate-900 dark:text-slate-100 block">
                  {selectedStudentForView.sgpa.toFixed(2)}
                </span>
                <span className="text-[10px] text-slate-400">Current Term</span>
              </div>

              <div className="p-3 text-center">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Attendance
                </span>
                <span className="text-base font-bold font-mono text-slate-900 dark:text-slate-100 block">
                  {selectedStudentForView.attendancePercentage}%
                </span>
                <Badge
                  variant={selectedStudentForView.attendancePercentage >= 80 ? 'success' : selectedStudentForView.attendancePercentage >= 75 ? 'warning' : 'danger'}
                  size="xs"
                >
                  {selectedStudentForView.attendancePercentage >= 75 ? 'Compliant' : 'Shortage'}
                </Badge>
              </div>

              <div className="p-3 text-center">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Fee Balance
                </span>
                <span className="text-base font-bold font-mono text-slate-900 dark:text-slate-100 block">
                  INR {selectedStudentForView.feeBalance.toLocaleString()}
                </span>
                <Badge
                  variant={selectedStudentForView.feeBalance === 0 ? 'success' : 'danger'}
                  size="xs"
                >
                  {selectedStudentForView.feeBalance === 0 ? 'Zero Balance' : 'Due'}
                </Badge>
              </div>
            </div>

            {/* 2-Column Academic & Guardian Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Left Column: Academic Affiliation */}
              <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-institutional-600 dark:text-institutional-400" />
                  Academic Affiliation
                </span>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
                    <span className="text-slate-500">Department</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedStudentForView.department}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
                    <span className="text-slate-500">Degree Program</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{selectedStudentForView.program}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Current Semester</span>
                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">Semester {selectedStudentForView.currentSemester}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Guardian & Emergency Contact */}
              <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-institutional-600 dark:text-institutional-400" />
                  Guardian &amp; Emergency Contact
                </span>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
                    <span className="text-slate-500">Primary Guardian</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedStudentForView.guardianName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
                    <span className="text-slate-500">Emergency Phone</span>
                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{selectedStudentForView.guardianPhone}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Residence Status</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">Campus Resident (Hostel Block A)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Diagnostic Flags */}
            {selectedStudentForView.riskFactors && selectedStudentForView.riskFactors.length > 0 && (
              <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold text-xs block mb-1">Academic Diagnostic Advisory:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] text-amber-800 dark:text-amber-300">
                    {selectedStudentForView.riskFactors.map((rf, i) => (
                      <li key={i}>{rf}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Add New Student Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Enroll New Scholar"
        subtitle="Create an authorized student profile and generate unique institutional credentials"
        maxWidth="lg"
      >
        <form onSubmit={handleCreateStudent} className="space-y-4 text-xs">
          {formError && (
            <div className="p-3 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Enrollment ID *</label>
              <input
                type="text"
                required
                placeholder="e.g. STU-2024-CS-109"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-mono"
                value={newStudent.enrollmentId}
                onChange={e => setNewStudent({ ...newStudent, enrollmentId: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Candidate Full Name"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                value={newStudent.fullName}
                onChange={e => setNewStudent({ ...newStudent, fullName: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">University Email *</label>
              <input
                type="email"
                required
                placeholder="student@axiogen.edu.in"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                value={newStudent.email}
                onChange={e => setNewStudent({ ...newStudent, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Contact Phone</label>
              <input
                type="text"
                placeholder="+91 98..."
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                value={newStudent.phone}
                onChange={e => setNewStudent({ ...newStudent, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Department</label>
              <Select
                className="w-full"
                value={newStudent.department}
                onChange={val => setNewStudent({ ...newStudent, department: val })}
                options={[
                  { value: 'Computer Science & Engineering', label: 'Computer Science & Engineering' },
                  { value: 'Artificial Intelligence & Data Science', label: 'AI & Data Science' },
                  { value: 'Electronics & Communication', label: 'Electronics & Communication' },
                  { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
                ]}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Academic Program</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                value={newStudent.program}
                onChange={e => setNewStudent({ ...newStudent, program: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Guardian Name</label>
              <input
                type="text"
                placeholder="Parent / Guardian"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                value={newStudent.guardianName}
                onChange={e => setNewStudent({ ...newStudent, guardianName: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Guardian Phone</label>
              <input
                type="text"
                placeholder="+91..."
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                value={newStudent.guardianPhone}
                onChange={e => setNewStudent({ ...newStudent, guardianPhone: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Complete Enrollment
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
