import React, { useState } from 'react';
import { 
  Users, Search, Filter, Plus, Mail, Phone, 
  BookOpen, Award, Clock, CheckCircle, GraduationCap, Eye, MapPin, Calendar, 
  Building2, Building, Code2, Brain, Cpu, Cog 
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

const getDepartmentIcon = (department: string, className = "w-3.5 h-3.5 text-white shrink-0") => {
  const d = department.toLowerCase();
  if (d.includes('computer') || d.includes('software')) {
    return <Code2 className={className} />;
  }
  if (d.includes('intelligence') || d.includes('data') || d.includes('ai')) {
    return <Brain className={className} />;
  }
  if (d.includes('electronic') || d.includes('communication')) {
    return <Cpu className={className} />;
  }
  if (d.includes('mechanical')) {
    return <Cog className={className} />;
  }
  return <Building className={className} />;
};

const FACULTY_CARD_PALETTES = [
  {
    gradient: 'from-[#831843] via-[#9D174D] to-[#500724]',
    border: 'border-pink-500/30',
    idText: 'text-pink-100',
    hoverBorder: 'hover:border-pink-600/50',
    statusDot: 'bg-pink-400',
    buttonBg: 'bg-[#831843] hover:bg-[#9D174D] text-white'
  },
  {
    gradient: 'from-[#1E3A8A] via-[#1D4ED8] to-[#0F172A]',
    border: 'border-blue-500/30',
    idText: 'text-blue-100',
    hoverBorder: 'hover:border-blue-600/50',
    statusDot: 'bg-blue-400',
    buttonBg: 'bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white'
  },
  {
    gradient: 'from-[#7F1D1D] via-[#991B1B] to-[#450A0A]',
    border: 'border-rose-500/30',
    idText: 'text-rose-100',
    hoverBorder: 'hover:border-rose-600/50',
    statusDot: 'bg-rose-400',
    buttonBg: 'bg-[#7F1D1D] hover:bg-[#991B1B] text-white'
  },
  {
    gradient: 'from-[#78350F] via-[#92400E] to-[#451A03]',
    border: 'border-amber-500/30',
    idText: 'text-amber-100',
    hoverBorder: 'hover:border-amber-600/50',
    statusDot: 'bg-amber-400',
    buttonBg: 'bg-[#78350F] hover:bg-[#92400E] text-white'
  },
  {
    gradient: 'from-[#3B0764] via-[#581C87] to-[#1E1B4B]',
    border: 'border-purple-500/30',
    idText: 'text-purple-100',
    hoverBorder: 'hover:border-purple-600/50',
    statusDot: 'bg-purple-400',
    buttonBg: 'bg-[#3B0764] hover:bg-[#581C87] text-white'
  },
  {
    gradient: 'from-[#451A03] via-[#5C2406] to-[#2B0E02]',
    border: 'border-orange-500/30',
    idText: 'text-orange-100',
    hoverBorder: 'hover:border-orange-600/50',
    statusDot: 'bg-orange-400',
    buttonBg: 'bg-[#451A03] hover:bg-[#5C2406] text-white'
  },
  {
    gradient: 'from-[#312E81] via-[#3730A3] to-[#1E1B4B]',
    border: 'border-indigo-500/30',
    idText: 'text-indigo-100',
    hoverBorder: 'hover:border-indigo-600/50',
    statusDot: 'bg-indigo-400',
    buttonBg: 'bg-[#312E81] hover:bg-[#3730A3] text-white'
  },
  {
    gradient: 'from-[#1E293B] via-[#334155] to-[#0F172A]',
    border: 'border-slate-500/30',
    idText: 'text-slate-100',
    hoverBorder: 'hover:border-slate-600/50',
    statusDot: 'bg-slate-400',
    buttonBg: 'bg-[#1E293B] hover:bg-[#334155] text-white'
  }
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
      <SoftCard className="border border-slate-200 dark:border-slate-800 shadow-soft">
        <div className="px-5 py-2.5 bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] text-white border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-between rounded-t-xl">
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-sky-300" />
            <h3 className="text-xs font-bold font-serif text-white tracking-wide uppercase">
              Faculty Directory Filters &amp; Specialization Query
            </h3>
          </div>
          <span className="text-[10px] font-mono text-sky-200 bg-white/10 px-2 py-0.5 rounded border border-white/15">
            Academic Roster
          </span>
        </div>
        <div className="p-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by faculty name, employee ID, or research specialization..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-400 dark:focus:ring-slate-500 text-slate-800 dark:text-slate-100"
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
        </div>
      </SoftCard>

      {/* Faculty Cards Grid - Executive Luxury Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFaculty.map((fac, idx) => {
          const palette = FACULTY_CARD_PALETTES[idx % FACULTY_CARD_PALETTES.length];
          return (
            <SoftCard 
              key={fac.id} 
              hoverEffect 
              onClick={() => setSelectedFacultyForView(fac)}
              className={`overflow-hidden border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-[#121215] rounded-xl transition-all duration-150 ${palette.hoverBorder} cursor-pointer flex flex-col justify-between group shadow-xs`}
            >
              <div>
                {/* Top Header Strip: Distinct color per card */}
                <div className={`h-11 bg-gradient-to-r ${palette.gradient} text-white px-4 py-2 flex items-center justify-between border-b ${palette.border} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:10px_10px] pointer-events-none" />
                  {/* Left: Employee ID Tag */}
                  <span className={`text-[10px] font-mono tracking-wider ${palette.idText} relative z-10`}>
                    {fac.employeeId}
                  </span>

                  {/* Right: Active Status Badge */}
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-white/95 relative z-10 select-none">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      fac.status === 'active' ? palette.statusDot : 'bg-neutral-300'
                    }`} />
                    <span>{fac.status === 'active' ? 'Active' : 'On Leave'}</span>
                  </span>
                </div>

              {/* Profile Avatar */}
              <div className="relative -mt-6 flex justify-center">
                <div className="relative">
                  <img
                    src={fac.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(fac.fullName)}&background=1E4E79&color=fff`}
                    alt={fac.fullName}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-[#121215] shadow-xs bg-white shrink-0 group-hover:scale-105 transition-transform"
                  />
                </div>
              </div>

              {/* Card Body */}
              <div className="px-5 pt-2 pb-3.5 space-y-3">
                {/* Faculty Name & Title */}
                <div className="text-center space-y-0.5">
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-[#EDEDEF] tracking-tight truncate" title={fac.fullName}>
                    {fac.fullName}
                  </h4>
                  <p className="text-[11px] text-neutral-500 dark:text-[#A1A1AA] truncate">
                    {fac.designation}
                  </p>
                </div>

                {/* Department Chip */}
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-neutral-100 dark:bg-[#18181C] border border-neutral-200 dark:border-white/[0.08] text-neutral-700 dark:text-[#EDEDEF] text-[10px] font-medium leading-snug">
                    {getDepartmentIcon(fac.department, "w-3 h-3 text-[#C5A059] shrink-0")}
                    <span>{fac.department}</span>
                  </div>
                </div>

                {/* Qualification & Domain Box */}
                <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-[#161619] border border-neutral-200 dark:border-white/[0.06] text-center space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-neutral-800 dark:text-[#EDEDEF] font-medium text-[11px]">
                    <GraduationCap className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                    <span className="truncate">{fac.qualification}</span>
                  </div>
                  <p className="text-[10px] text-neutral-400 dark:text-[#71717A] truncate">
                    Domain: {fac.specialization}
                  </p>
                </div>

                {/* Teaching Workload & Assigned Subjects */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 dark:text-[#71717A]">
                      Papers ({fac.assignedSubjects.length})
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[10px] text-neutral-500 dark:text-[#A1A1AA]">
                      <Clock className="w-3 h-3 text-neutral-400" />
                      {fac.weeklyHours} Hrs/Wk
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {fac.assignedSubjects.map(subCode => (
                      <span 
                        key={subCode} 
                        className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-neutral-100 dark:bg-[#18181C] text-neutral-700 dark:text-[#EDEDEF] border border-neutral-200 dark:border-white/[0.08]"
                      >
                        {subCode}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Contact Strip */}
            <div className="px-5 py-2.5 bg-neutral-50 dark:bg-[#141417] border-t border-neutral-200 dark:border-white/[0.06] flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5 text-neutral-500 dark:text-[#71717A] min-w-0">
                <Mail className="w-3.5 h-3.5 text-[#71717A] shrink-0" />
                <span className="truncate max-w-[130px]" title={fac.email}>{fac.email}</span>
              </div>
              <span className="text-[11px] font-medium text-[#C5A059] group-hover:translate-x-0.5 transition-transform shrink-0">
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
        const selectedPalette = FACULTY_CARD_PALETTES[(selectedIndex >= 0 ? selectedIndex : 0) % FACULTY_CARD_PALETTES.length];
        return (
          <Modal
            isOpen={!!selectedFacultyForView}
            onClose={() => setSelectedFacultyForView(null)}
            title={`Faculty Profile: ${selectedFacultyForView.fullName}`}
            subtitle={`Verified Academic Staff • Employee ID: ${selectedFacultyForView.employeeId}`}
            maxWidth="3xl"
            footer={
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  Axiogen ERP • Department of {selectedFacultyForView.department.split('&')[0].trim()}
                </span>
                <button
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors ${selectedPalette.buttonBg}`}
                  onClick={() => setSelectedFacultyForView(null)}
                >
                  Close Dossier
                </button>
              </div>
            }
          >
            <div className="space-y-4 text-xs">
              {/* Header Profile Card - Matches Selected Faculty Palette */}
              <div className={`rounded-xl border ${selectedPalette.border} overflow-hidden bg-white dark:bg-[#121215] shadow-xs`}>
                <div className={`h-12 bg-gradient-to-r ${selectedPalette.gradient} text-white px-6 py-2.5 flex items-center justify-between border-b ${selectedPalette.border} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:10px_10px] pointer-events-none" />
                  {/* Employee ID Tag */}
                  <span className={`text-[11px] font-mono tracking-wider ${selectedPalette.idText} relative z-10`}>
                    {selectedFacultyForView.employeeId}
                  </span>

                  {/* Active Status Tag */}
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/95 relative z-10 select-none">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      selectedFacultyForView.status === 'active' ? selectedPalette.statusDot : 'bg-neutral-300'
                    }`} />
                    <span>{selectedFacultyForView.status === 'active' ? 'Active Faculty' : 'On Leave'}</span>
                  </span>
                </div>

                {/* Profile Details Row */}
                <div className="px-6 pb-4 pt-0">
                  <div className="flex items-start sm:items-end gap-3.5 min-w-0">
                    {/* Avatar */}
                    <div className="-mt-6 shrink-0">
                      <img
                        src={selectedFacultyForView.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedFacultyForView.fullName)}&background=1E4E79&color=fff`}
                        alt={selectedFacultyForView.fullName}
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-white dark:ring-[#121215] shadow-xs bg-white shrink-0"
                      />
                    </div>
                    <div className="min-w-0 flex-1 pt-2 sm:pt-0">
                      <h3 className="text-sm font-semibold text-neutral-900 dark:text-[#EDEDEF] tracking-tight leading-snug">
                        {selectedFacultyForView.fullName}
                      </h3>
                      <p className="text-[11px] text-neutral-500 dark:text-[#A1A1AA] mt-0.5">
                        {selectedFacultyForView.designation}
                      </p>
                      
                      {/* Slim 3D Ribbon Style Labels (matching reference) */}
                      <div className="flex items-center gap-2 mt-2 max-w-full overflow-x-auto no-scrollbar whitespace-nowrap py-0.5">
                        {/* Department Ribbon Badge */}
                        <div className="inline-flex items-center h-5.5 shrink-0 max-w-[240px] sm:max-w-[300px] select-none shadow-2xs group" title={`Department: ${selectedFacultyForView.department}`}>
                          {/* Dark End Cap: Dynamic Matching Department Symbol */}
                          <div className="h-full w-6 flex items-center justify-center bg-slate-900 dark:bg-black text-white rounded-l-md border-y border-l border-slate-800/80 shrink-0">
                            {getDepartmentIcon(selectedFacultyForView.department, "w-3.5 h-3.5 text-white shrink-0")}
                          </div>

                          {/* Ribbon Body with Angled Tail */}
                          <div 
                            className="h-full flex items-center pl-2.5 pr-4 text-white text-[10px] sm:text-[10.5px] font-semibold bg-gradient-to-r from-[#B8236B] via-[#98197F] to-[#701A75] border-y border-white/15 relative overflow-hidden"
                            style={{
                              clipPath: 'polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)'
                            }}
                          >
                            <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-gradient-to-l from-purple-950/70 to-transparent pointer-events-none" />
                            <span className="truncate pr-1">
                              {selectedFacultyForView.department}
                            </span>
                          </div>
                        </div>

                        {/* Degree Ribbon Badge */}
                        <div className="inline-flex items-center h-5.5 shrink-0 max-w-[240px] sm:max-w-[320px] select-none shadow-2xs group" title={`Degree: ${selectedFacultyForView.qualification}`}>
                          {/* Dark End Cap: ONLY Matching Symbol */}
                          <div className="h-full w-6 flex items-center justify-center bg-slate-900 dark:bg-black text-white rounded-l-md border-y border-l border-slate-800/80 shrink-0">
                            <GraduationCap className="w-3.5 h-3.5 text-white shrink-0" />
                          </div>

                          {/* Ribbon Body with Angled Tail */}
                          <div 
                            className="h-full flex items-center pl-2.5 pr-4 text-white text-[10px] sm:text-[10.5px] font-semibold bg-gradient-to-r from-[#8E1B73] via-[#751877] to-[#551670] border-y border-white/15 relative overflow-hidden"
                            style={{
                              clipPath: 'polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)'
                            }}
                          >
                            <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-gradient-to-l from-indigo-950/70 to-transparent pointer-events-none" />
                            <span className="truncate pr-1">
                              {selectedFacultyForView.qualification}
                            </span>
                          </div>
                        </div>
                      </div>
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
                placeholder="faculty@axiogen.edu.in"
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
