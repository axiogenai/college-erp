import React, { useState } from 'react';
import { 
  School, Award, BookOpen, Users, Calendar, ArrowRight, 
  ShieldCheck, CheckCircle2, ChevronRight, FileText, Phone, 
  Mail, MapPin, ExternalLink, LogIn, Building2, 
  GraduationCap, Clock, HelpCircle, Layers, Compass
} from 'lucide-react';
import { SoftCard } from '../common/SoftCard';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { UserRole } from '../../types';
import { useErpData } from '../../context/ErpDataContext';

interface PublicLandingProps {
  onEnterPortal: (role?: UserRole) => void;
}

export const PublicLanding: React.FC<PublicLandingProps> = ({ onEnterPortal }) => {
  const { notices } = useErpData();
  const [selectedDept, setSelectedDept] = useState<'cse' | 'ai' | 'ece' | 'me'>('cse');

  const departments = {
    cse: {
      name: 'Computer Science & Engineering',
      desc: 'Established 1984. Ranked #1 among autonomous colleges. Center of excellence in Cloud Systems, Cyber Defense, and Distributed Computing.',
      labs: 'High-Performance Supercomputing Cluster, Systems Software Lab, Nvidia CUDA GPU Lab',
      intake: '180 Seats • 4 Years B.Tech'
    },
    ai: {
      name: 'Artificial Intelligence & Data Science',
      desc: 'Formed in collaboration with industry consortiums. Dedicated research tracks in Large Foundation Models, Medical Imaging, and Robotics.',
      labs: 'Advanced Neural Networks Lab, Cognitive Robotics Center, Edge AI Sandbox',
      intake: '120 Seats • 4 Years B.Tech'
    },
    ece: {
      name: 'Electronics & Communication',
      desc: 'State-of-the-art silicon fabrication and VLSI simulation suites. Accredited by IEEE student chapters and international fabrication partners.',
      labs: 'Cadence VLSI Design Suite, RF & Microwave Antenna Lab, IoT Sensor Hub',
      intake: '120 Seats • 4 Years B.Tech'
    },
    me: {
      name: 'Mechanical & Automation Engineering',
      desc: 'Legacy department combining classical thermodynamics with modern additive manufacturing and mechatronics integration.',
      labs: 'Advanced CNC Center, Wind Tunnel Aerodynamics, Robotics & Mechatronics Lab',
      intake: '60 Seats • 4 Years B.Tech'
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-institutional-700 selection:text-white transition-colors">
      {/* Top University Announcement Bar */}
      <div className="bg-institutional-900 text-slate-200 text-xs py-2 px-4 border-b border-institutional-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">ADMISSIONS 2026–2027:</span>
            <span className="text-slate-300">Merit Counseling Round II commences October 25.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +91 80 2841 9000</span>
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> admissions@chanakya.edu.in</span>
            <span className="hidden md:inline font-mono text-amber-300">NIRF All-India Rank #12</span>
          </div>
        </div>
      </div>

      {/* Main Institution Header */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Crest & Identity */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-institutional-900 border border-institutional-700 flex items-center justify-center text-white shadow-soft shrink-0">
              <School className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold font-serif tracking-tight text-institutional-950 dark:text-white uppercase leading-none">
                  Chanakya Institute
                </h1>
                <Badge variant="gold" size="sm" className="hidden sm:inline-flex">NAAC A++</Badge>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-serif tracking-wider uppercase mt-0.5">
                of Technology & Sciences • Established 1958
              </p>
            </div>
          </div>

          {/* Navigation Links & ERP Portal Access */}
          <div className="flex items-center gap-3">
            <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mr-2">
              <a href="#about" className="hover:text-institutional-700 dark:hover:text-institutional-300 transition-colors">Academics</a>
              <a href="#departments" className="hover:text-institutional-700 dark:hover:text-institutional-300 transition-colors">Departments</a>
              <a href="#governance" className="hover:text-institutional-700 dark:hover:text-institutional-300 transition-colors">Governance</a>
              <a href="#notices" className="hover:text-institutional-700 dark:hover:text-institutional-300 transition-colors">Notices</a>
            </nav>

            <Button
              variant="primary"
              size="md"
              icon={<LogIn className="w-4 h-4" />}
              onClick={() => onEnterPortal('principal')}
              className="shadow-soft font-semibold"
            >
              Access ERP Suite
            </Button>
          </div>
        </div>
      </header>

      {/* NEW STYLE HERO SECTION: Classic, Dignified, Soft-Card Structured */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-institutional-50/70 via-slate-50 to-white dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800">
        {/* Subtle geometric watermark badge */}
        <div className="absolute top-12 right-12 opacity-[0.03] dark:opacity-[0.04] pointer-events-none">
          <School className="w-96 h-96 text-institutional-900 dark:text-white" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Headline & Overview */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-institutional-100/80 dark:bg-institutional-950 text-institutional-800 dark:text-institutional-200 text-xs font-semibold border border-institutional-200 dark:border-institutional-800">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>Autonomous University • AICTE Approved • NIRF Top Ranked</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Intellectual Rigor, Scholarly Discipline &amp; Autonomous Excellence
              </h2>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-2xl">
                For over six decades, Chanakya Institute has prepared leaders in technology, scientific discovery, and societal transformation. Our enterprise digital campus orchestrates student lifecycle, faculty research, and institutional governance with uncompromising data integrity.
              </p>

              {/* Quick Persona Launch Buttons */}
              <div className="pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono">
                  Select Portal Persona to Launch ERP:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    onClick={() => onEnterPortal('principal')}
                    className="p-3 text-left rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-institutional-500 shadow-soft transition-all group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-institutional-50 dark:bg-institutional-950/80 text-institutional-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Director</p>
                    <p className="text-[10px] text-slate-500">Executive Admin</p>
                  </button>

                  <button
                    onClick={() => onEnterPortal('faculty')}
                    className="p-3 text-left rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500 shadow-soft transition-all group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-950/80 text-sky-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                      <Users className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Faculty</p>
                    <p className="text-[10px] text-slate-500">Academic Dean</p>
                  </button>

                  <button
                    onClick={() => onEnterPortal('student')}
                    className="p-3 text-left rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 shadow-soft transition-all group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Student</p>
                    <p className="text-[10px] text-slate-500">Scholar Portal</p>
                  </button>

                  <button
                    onClick={() => onEnterPortal('accountant')}
                    className="p-3 text-left rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 shadow-soft transition-all group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/80 text-amber-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Finance</p>
                    <p className="text-[10px] text-slate-500">Treasury & CA</p>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Card: Institutional Summary Soft-Card */}
            <div className="lg:col-span-5">
              <SoftCard className="p-6 border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 shadow-soft-lg relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Campus Overview</span>
                    <h3 className="text-base font-bold font-serif text-slate-900 dark:text-slate-100">
                      Fall Semester Status (AY 2026–27)
                    </h3>
                  </div>
                  <Badge variant="success" size="sm" dot>Live Operations</Badge>
                </div>

                {/* Metrics Matrix */}
                <div className="grid grid-cols-2 gap-3 my-4">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <p className="text-[11px] text-slate-500">Active Students</p>
                    <p className="text-xl font-bold font-serif text-institutional-900 dark:text-institutional-100">3,420</p>
                    <p className="text-[10px] text-emerald-600 font-medium">Across 8 Departments</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <p className="text-[11px] text-slate-500">Average Attendance</p>
                    <p className="text-xl font-bold font-serif text-institutional-900 dark:text-institutional-100">87.4%</p>
                    <p className="text-[10px] text-emerald-600 font-medium">+2.1% from last semester</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <p className="text-[11px] text-slate-500">Faculty Ratio</p>
                    <p className="text-xl font-bold font-serif text-institutional-900 dark:text-institutional-100">1:18</p>
                    <p className="text-[10px] text-slate-400">184 Full-Time Faculty</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <p className="text-[11px] text-slate-500">Placement Record</p>
                    <p className="text-xl font-bold font-serif text-institutional-900 dark:text-institutional-100">96.8%</p>
                    <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">Median CTC: 14.2 LPA</p>
                  </div>
                </div>

                {/* Live Circular highlight inside card */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex items-center justify-between text-slate-400 mb-1 text-[11px]">
                    <span className="font-semibold uppercase tracking-wider">Latest Official Circular</span>
                    <span>Oct 2026</span>
                  </div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                    {notices[0]?.title || 'End-Semester Exam Schedule Published'}
                  </p>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {notices[0]?.content}
                  </p>
                </div>

                <div className="mt-4 pt-3">
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full"
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                    onClick={() => onEnterPortal('principal')}
                  >
                    Open Administrative ERP Console
                  </Button>
                </div>
              </SoftCard>
            </div>
          </div>
        </div>
      </section>

      {/* Key Institutional Pillars */}
      <section id="about" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="primary" size="md">Enterprise Academic Infrastructure</Badge>
          <h3 className="mt-3 text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            Built for Academic Integrity, Security &amp; Scale
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            A unified single-source-of-truth system serving students, professors, departmental deans, and financial trustees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SoftCard hoverEffect className="p-6">
            <div className="w-10 h-10 rounded-xl bg-institutional-50 dark:bg-institutional-950 text-institutional-700 flex items-center justify-center mb-4 border border-institutional-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold font-serif text-slate-900 dark:text-white mb-2">
              Role-Based Access &amp; Compliance
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Strict multi-tier RBAC separates student transcripts, faculty evaluations, and bursar ledger workflows. Every sensitive update produces an immutable audit log.
            </p>
          </SoftCard>

          <SoftCard hoverEffect className="p-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 flex items-center justify-center mb-4 border border-emerald-200">
              <Calendar className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold font-serif text-slate-900 dark:text-white mb-2">
              Smart Timetable &amp; Conflicts
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Automated conflict verification prevents double-booking faculty, seminar halls, or batch slots. Instant attendance marking with percentage recalculation.
            </p>
          </SoftCard>

          <SoftCard hoverEffect className="p-6">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-700 flex items-center justify-center mb-4 border border-amber-200">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold font-serif text-slate-900 dark:text-white mb-2">
              Autonomous Grading &amp; Radar
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Configurable grading rubric (O to F) with automated SGPA/CGPA computation, exam review workflow, and transparent early academic-risk detection for counseling.
            </p>
          </SoftCard>
        </div>
      </section>

      {/* Departments Explorer */}
      <section id="departments" className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-institutional-600 font-bold">Collegiate Faculties</span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                Academic Departments &amp; Laboratories
              </h3>
            </div>
            {/* Tab switchers */}
            <div className="flex items-center gap-2 mt-4 md:mt-0 overflow-x-auto pb-2 md:pb-0">
              {(['cse', 'ai', 'ece', 'me'] as const).map(deptKey => (
                <button
                  key={deptKey}
                  onClick={() => setSelectedDept(deptKey)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedDept === deptKey
                      ? 'bg-institutional-800 text-white shadow-soft'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {deptKey.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <SoftCard className="p-6 sm:p-8 border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <h4 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                    {departments[selectedDept].name}
                  </h4>
                  <Badge variant="primary" size="sm">{departments[selectedDept].intake}</Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {departments[selectedDept].desc}
                </p>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                    Specialized Research &amp; Computing Facilities:
                  </span>
                  <p className="text-xs font-mono text-institutional-800 dark:text-institutional-200">
                    {departments[selectedDept].labs}
                  </p>
                </div>
              </div>

              <div className="md:col-span-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-3">
                <span className="text-xs font-bold font-serif text-slate-800 dark:text-slate-200 block">Department Quick Access</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-between"
                  onClick={() => onEnterPortal('student')}
                >
                  <span>View Student Syllabus</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-between"
                  onClick={() => onEnterPortal('faculty')}
                >
                  <span>Faculty Workload &amp; Load</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full justify-between"
                  onClick={() => onEnterPortal('principal')}
                >
                  <span>Department Performance</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </SoftCard>
        </div>
      </section>

      {/* Official Notices Section */}
      <section id="notices" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-institutional-600 font-bold">University Gazette</span>
            <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mt-1">
              Official Circulars &amp; Senate Resolutions
            </h3>
          </div>
          <Button variant="outline" size="sm" onClick={() => onEnterPortal('student')}>
            View All in ERP
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {notices.map(notice => (
            <SoftCard key={notice.id} hoverEffect className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-institutional-700 dark:text-institutional-400 font-semibold">
                    {notice.referenceNumber}
                  </span>
                  <Badge variant={notice.priority === 'urgent' ? 'danger' : notice.priority === 'high' ? 'warning' : 'neutral'} size="sm">
                    {notice.category}
                  </Badge>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-serif line-clamp-2">
                  {notice.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {notice.content}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>By {notice.author}</span>
                <span className="font-mono">{notice.publishDate}</span>
              </div>
            </SoftCard>
          ))}
        </div>
      </section>

      {/* Institutional Footer */}
      <footer className="bg-institutional-950 text-slate-400 text-xs py-12 border-t border-institutional-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-institutional-900">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <School className="w-5 h-5 text-amber-400" />
                <span className="font-serif font-bold text-white text-sm uppercase">Chanakya Institute</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Autonomous Premier Technical University • Approved by AICTE, Affiliated to State Technological Board.
              </p>
              <p className="text-[11px] text-slate-500">
                Knowledge Corridor, Tech City, Bengaluru – 560100
              </p>
            </div>

            <div>
              <p className="font-serif font-bold text-white mb-3 text-xs uppercase tracking-wider">Academics</p>
              <ul className="space-y-1.5 text-[11px]">
                <li><a href="#" className="hover:text-white transition-colors">Undergraduate B.Tech Programs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Postgraduate M.Tech &amp; MBA</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Doctoral Research Fellowships</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Academic Bylaws &amp; Regulations</a></li>
              </ul>
            </div>

            <div>
              <p className="font-serif font-bold text-white mb-3 text-xs uppercase tracking-wider">ERP Portals</p>
              <ul className="space-y-1.5 text-[11px]">
                <li><button onClick={() => onEnterPortal('student')} className="hover:text-white transition-colors">Student Self-Service Portal</button></li>
                <li><button onClick={() => onEnterPortal('faculty')} className="hover:text-white transition-colors">Faculty Academic Registry</button></li>
                <li><button onClick={() => onEnterPortal('accountant')} className="hover:text-white transition-colors">Bursar &amp; Treasury Gateway</button></li>
                <li><button onClick={() => onEnterPortal('principal')} className="hover:text-white transition-colors">Directorate &amp; Senate Console</button></li>
              </ul>
            </div>

            <div>
              <p className="font-serif font-bold text-white mb-3 text-xs uppercase tracking-wider">Governance</p>
              <p className="text-[11px] text-slate-400 mb-2">
                Internal Quality Assurance Cell (IQAC), Anti-Ragging Committee, Grievance Redressal Portal.
              </p>
              <div className="mt-3">
                <Button
                  variant="gold"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => onEnterPortal('principal')}
                >
                  Enter Campus ERP
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
            <p>&copy; {new Date().getFullYear()} Chanakya Institute of Technology &amp; Sciences. All rights reserved.</p>
            <p className="font-mono mt-2 sm:mt-0">Enterprise ERP System Version 2.4.0-Production</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
