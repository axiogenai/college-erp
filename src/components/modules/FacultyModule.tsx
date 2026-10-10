import React, { useState } from 'react';
import { 
  Users, Search, Filter, Plus, Mail, Phone, 
  BookOpen, Award, Clock, CheckCircle, GraduationCap, Eye, MapPin, Calendar, Building2 
} from 'lucide-react';
import { SoftCard } from '../common/SoftCard';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { PageHeader } from '../common/PageHeader';
import { Select } from '../common/Select';
import { useErpData } from '../../context/ErpDataContext';
import { useAuth } from '../../context/AuthContext';
import { Faculty } from '../../types';

const FACULTY_CARD_THEMES = [
  {
    banner: 'from-blue-600 via-indigo-600 to-blue-700',
    accentText: 'text-blue-600 dark:text-blue-400',
    dotColor: 'bg-blue-500',
  },
  {
    banner: 'from-emerald-600 via-teal-600 to-emerald-700',
    accentText: 'text-emerald-600 dark:text-emerald-400',
    dotColor: 'bg-emerald-500',
  },
  {
    banner: 'from-purple-600 via-violet-600 to-indigo-700',
    accentText: 'text-purple-600 dark:text-purple-400',
    dotColor: 'bg-purple-500',
  },
  {
    banner: 'from-amber-600 via-orange-600 to-amber-700',
    accentText: 'text-amber-600 dark:text-amber-400',
    dotColor: 'bg-amber-500',
  },
  {
    banner: 'from-rose-600 via-pink-600 to-rose-700',
    accentText: 'text-rose-600 dark:text-rose-400',
    dotColor: 'bg-rose-500',
  },
  {
    banner: 'from-cyan-600 via-sky-600 to-blue-600',
    accentText: 'text-cyan-600 dark:text-cyan-400',
    dotColor: 'bg-cyan-500',
  },
];

export const FacultyModule: React.FC = () => {
  const { faculty, addFaculty, subjects, timetable } = useErpData();
  const { hasPermission } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedFacultyForView, setSelectedFacultyForView] = useState<Faculty | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const [newFaculty, setNewFaculty] = useState({
    employeeId: '',
    fullName: '',
    email: '',
    phone: '',
    department: 'Computer Science & Engineering',
    designation: 'Assistant Professor',
    qualification: 'Ph.D. (IIT)',
    specialization: 'Artificial Intelligence & Robotics',
    assignedSubjects: ['CS501'],
    weeklyHours: 14,
    status: 'active' as const
  });

  const filteredFaculty = faculty.filter(f => {
    const matchesSearch = 
      f.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'all' || f.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleCreateFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    addFaculty(newFaculty);
    setIsAddModalOpen(false);
    setFeedback(`Faculty member ${newFaculty.fullName} registered successfully.`);
    setTimeout(() => setFeedback(null), 4000);
  };

  const canEdit = hasPermission('edit_faculty');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Faculty Academic Registry &amp; Workload Matrix"
        subtitle="Distinguished professorial roster, departmental allocations, research specializations, and teaching hours"
        icon={<Users className="w-5 h-5" />}
        actions={
          canEdit && (
            <Button
              variant="primary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsAddModalOpen(true)}
            >
              Register Faculty Member
            </Button>
          )
        }
      />

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">{feedback}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="font-bold">✕</button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <SoftCard className="p-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by faculty name, employee ID, or research specialization..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-institutional-500 text-slate-800 dark:text-slate-100"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

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
            ]}
          />
        </div>
      </SoftCard>

      {/* Faculty Cards Grid - Each employee card has its own unique distinct collegiate color banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFaculty.map((fac, index) => {
          const theme = FACULTY_CARD_THEMES[index % FACULTY_CARD_THEMES.length];
          return (
            <SoftCard 
              key={fac.id} 
              hoverEffect 
              onClick={() => setSelectedFacultyForView(fac)}
              className="overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl shadow-soft hover:shadow-soft-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Top Header Banner - Unique color banner for each faculty member */}
                <div className={`h-14 bg-gradient-to-r ${theme.banner} px-4 py-2.5 flex items-center justify-between relative`}>
                  {/* Left: Employee ID Tag */}
                  <span className="inline-flex items-center justify-center h-6 px-2.5 rounded text-[10px] font-mono font-medium text-slate-800 dark:text-slate-100 bg-white/95 dark:bg-slate-900/90 border border-white/30 dark:border-white/10 shadow-xs leading-none">
                    {fac.employeeId}
                  </span>

                  {/* Right: Active Status Badge */}
                  <span className="inline-flex items-center justify-center gap-1.5 h-6 px-2.5 rounded text-[10px] font-medium text-slate-800 dark:text-slate-100 bg-white/95 dark:bg-slate-900/90 border border-white/30 dark:border-white/10 shadow-xs leading-none select-none">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-emerald-500" />
                    <span>{fac.status === 'active' ? 'Active' : 'On Leave'}</span>
                  </span>
                </div>

                {/* Centered Overlapping Profile Avatar */}
                <div className="relative -mt-7 flex justify-center">
                  <div className="relative">
                    <img
                      src={fac.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(fac.fullName)}&background=1E4E79&color=fff`}
                      alt={fac.fullName}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-white dark:ring-slate-900 shadow-sm bg-white shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <span 
                      className={`absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-white dark:ring-slate-900 ${
                        fac.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'
                      }`}
                    />
                  </div>
                </div>

                {/* Card Body - Slim, Compact, Perfectly Structured with generous px-5 padding */}
                <div className="px-5 pt-2 pb-3.5 space-y-3">
                  {/* Faculty Name & Academic Title */}
                  <div className="text-center space-y-0.5">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white font-sans tracking-tight truncate" title={fac.fullName}>
                      {fac.fullName}
                    </h4>
                    <p className={`text-xs font-semibold ${theme.accentText} truncate`}>
                      {fac.designation}
                    </p>
                  </div>

                  {/* Full Department Name Badge */}
                  <div className="flex justify-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold text-center leading-snug shadow-sm">
                      <Building2 className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
                      <span>{fac.department}</span>
                    </div>
                  </div>

                  {/* Qualification & Domain Box */}
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 text-center space-y-1">
                    <div className="flex items-center justify-center gap-1.5 text-slate-800 dark:text-slate-200 font-semibold text-xs">
                      <GraduationCap className="w-3.5 h-3.5 text-institutional-600 dark:text-institutional-400 shrink-0" />
                      <span className="truncate">{fac.qualification}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Domain:</span> {fac.specialization}
                    </p>
                  </div>

                  {/* Teaching Workload & Assigned Subjects */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Assigned Papers ({fac.assignedSubjects.length})
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[11px] text-slate-600 dark:text-slate-400 font-semibold">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {fac.weeklyHours} Hrs/Wk
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {fac.assignedSubjects.map(subCode => (
                        <span 
                          key={subCode} 
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${theme.dotColor}`} />
                          <span>{subCode}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Contact Strip */}
              <div className="px-5 py-2.5 bg-slate-50/70 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 min-w-0">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate max-w-[130px]" title={fac.email}>{fac.email}</span>
                </div>
                <span className={`text-[10px] font-semibold ${theme.accentText} group-hover:translate-x-0.5 transition-transform shrink-0`}>
                  View Dossier →
                </span>
              </div>
            </SoftCard>
          );
        })}
      </div>

      {/* View Faculty Profile Modal */}
      {selectedFacultyForView && (() => {
        const selectedIndex = faculty.findIndex(f => f.id === selectedFacultyForView.id);
        const modalTheme = FACULTY_CARD_THEMES[selectedIndex >= 0 ? selectedIndex % FACULTY_CARD_THEMES.length : 0];
        return (
          <Modal
            isOpen={!!selectedFacultyForView}
            onClose={() => setSelectedFacultyForView(null)}
            title={`Faculty Profile: ${selectedFacultyForView.fullName}`}
            subtitle={`Verified Academic Staff • Employee ID: ${selectedFacultyForView.employeeId}`}
            maxWidth="2xl"
            footer={
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  Chanakya ERP • Department of {selectedFacultyForView.department.split('&')[0].trim()}
                </span>
                <Button variant="primary" size="sm" onClick={() => setSelectedFacultyForView(null)}>
                  Close Dossier
                </Button>
              </div>
            }
          >
            <div className="space-y-4 text-xs">
              {/* Header Profile Card with matching unique collegiate banner & properly positioned avatar */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-700/80 overflow-hidden bg-white dark:bg-slate-800/60 shadow-sm">
                <div className={`h-24 bg-gradient-to-r ${modalTheme.banner} px-6 py-4 flex items-center justify-end gap-2.5`}>
                  {/* Employee ID Tag */}
                  <span className="inline-flex items-center justify-center h-7 px-3 rounded text-xs font-mono font-bold text-slate-800 dark:text-slate-100 bg-white/95 dark:bg-slate-900/90 border border-white/30 dark:border-white/10 shadow-xs leading-none">
                    {selectedFacultyForView.employeeId}
                  </span>

                  {/* Department Tag */}
                  <span className="inline-flex items-center justify-center h-7 px-3 rounded text-xs font-bold text-slate-800 dark:text-slate-100 bg-white/95 dark:bg-slate-900/90 border border-white/30 dark:border-white/10 shadow-xs leading-none">
                    {selectedFacultyForView.department}
                  </span>

                  {/* Active Status Tag */}
                  <span className="inline-flex items-center justify-center gap-1.5 h-7 px-3 rounded text-xs font-bold text-slate-800 dark:text-slate-100 bg-white/95 dark:bg-slate-900/90 border border-white/30 dark:border-white/10 shadow-xs leading-none select-none">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-emerald-500" />
                    <span>{selectedFacultyForView.status === 'active' ? 'Active Faculty' : 'On Leave'}</span>
                  </span>
                </div>

                {/* Profile Details Row */}
                <div className="px-6 pb-5 pt-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar shifted up to overlap banner */}
                      <div className="-mt-12 shrink-0">
                        <img
                          src={selectedFacultyForView.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedFacultyForView.fullName)}&background=1E4E79&color=fff`}
                          alt={selectedFacultyForView.fullName}
                          className="w-24 h-24 rounded-full object-cover ring-4 ring-white dark:ring-slate-900 shadow-lg bg-white"
                        />
                      </div>
                      <div className="pt-2 sm:pt-3">
                        <h3 className="text-xl sm:text-2xl font-bold font-sans text-slate-900 dark:text-white tracking-tight">
                          {selectedFacultyForView.fullName}
                        </h3>
                        <p className={`text-xs sm:text-sm font-semibold ${modalTheme.accentText} mt-0.5`}>
                          {selectedFacultyForView.designation}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 px-3.5 py-2 rounded-lg border border-slate-200/80 dark:border-slate-700/80 self-start sm:self-center flex items-center gap-2 shadow-xs">
                      <GraduationCap className="w-4 h-4 text-institutional-600 dark:text-institutional-400" />
                      <span>{selectedFacultyForView.qualification}</span>
                    </div>
                  </div>
                </div>
              </div>

            {/* Contact & Committed Hours Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 text-xs">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{selectedFacultyForView.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-mono">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{selectedFacultyForView.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-medium">{selectedFacultyForView.weeklyHours} Hrs/Week Committed</span>
              </div>
            </div>

            {/* Research & Specialization Dossier */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/40 space-y-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Research Domain &amp; Scholarly Specialization
              </span>
              <p className="text-xs font-semibold text-slate-900 dark:text-white">
                {selectedFacultyForView.specialization}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Supervises doctoral research candidates and leads departmental curriculum committees.
              </p>
            </div>

            {/* Assigned Subjects & Syllabus Tracker */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-900 dark:text-white block font-sans tracking-tight">
                Assigned Subjects &amp; Syllabus Progress
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedFacultyForView.assignedSubjects.map(subCode => {
                  const subjectDetail = subjects.find(s => s.code === subCode);
                  const completion = subjectDetail ? subjectDetail.syllabusCompletion : 70;
                  return (
                    <div 
                      key={subCode}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/60 dark:bg-slate-800/30 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">
                          {subCode}
                        </span>
                        <Badge variant="primary" size="xs">
                          {subjectDetail?.type || 'Theory'} • {subjectDetail?.credits || 4} Cr
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium truncate">
                        {subjectDetail ? subjectDetail.name : 'Core Curriculum Course'}
                      </p>
                      <div className="space-y-1 pt-1">
                        <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400">
                          <span>Syllabus Covered</span>
                          <span className="font-mono font-bold text-institutional-700 dark:text-institutional-400">{completion}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-institutional-600 dark:bg-institutional-500 h-full rounded-full transition-all"
                            style={{ width: `${completion}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Modal>
      );
    })()}

      {/* Register Faculty Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Register Faculty Member"
        subtitle="Add a faculty credential, assign teaching load and departmental affiliation"
        maxWidth="md"
      >
        <form onSubmit={handleCreateFaculty} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Employee ID *</label>
              <input
                type="text"
                required
                placeholder="e.g. FAC-CSE-045"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-mono"
                value={newFaculty.employeeId}
                onChange={e => setNewFaculty({ ...newFaculty, employeeId: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Prof. / Dr."
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                value={newFaculty.fullName}
                onChange={e => setNewFaculty({ ...newFaculty, fullName: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Official Email</label>
              <input
                type="email"
                required
                placeholder="faculty@chanakya.edu.in"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                value={newFaculty.email}
                onChange={e => setNewFaculty({ ...newFaculty, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Designation</label>
              <Select
                className="w-full"
                value={newFaculty.designation}
                onChange={val => setNewFaculty({ ...newFaculty, designation: val })}
                options={[
                  { value: 'Senior Professor', label: 'Senior Professor' },
                  { value: 'Professor & Dean', label: 'Professor & Dean' },
                  { value: 'Associate Professor', label: 'Associate Professor' },
                  { value: 'Assistant Professor', label: 'Assistant Professor' },
                ]}
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Department</label>
            <Select
              className="w-full"
              value={newFaculty.department}
              onChange={val => setNewFaculty({ ...newFaculty, department: val })}
              options={[
                { value: 'Computer Science & Engineering', label: 'Computer Science & Engineering' },
                { value: 'Artificial Intelligence & Data Science', label: 'AI & Data Science' },
                { value: 'Electronics & Communication', label: 'Electronics & Communication' },
                { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
              ]}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Research Specialization</label>
            <input
              type="text"
              placeholder="e.g. Distributed Consensus, Natural Language Processing"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              value={newFaculty.specialization}
              onChange={e => setNewFaculty({ ...newFaculty, specialization: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Register Credentials
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
