import React, { useState } from 'react';
import { 
  Building2, Users, FlaskConical, Award, BookOpen, 
  ArrowLeft, ArrowRight, ChevronRight, CheckCircle2,
  Cpu, Database, Sparkles, Layers, Microscope, X
} from 'lucide-react';

interface DepartmentDetail {
  id: string;
  category: 'computing' | 'core' | 'infrastructure';
  name: string;
  hod: string;
  hodDegrees: string;
  hodBio?: string;
  facultyCount: number;
  scholarsCount: number;
  established: string;
  intake: string;
  specializations: string[];
  labs: string[];
  description: string;
}

const DEPARTMENTS: DepartmentDetail[] = [
  {
    id: 'dept-cse',
    category: 'computing',
    name: 'Department of Computer Science & Engineering',
    hod: 'Dr. Arvind Swaminathan',
    hodDegrees: 'Ph.D. (IIT Madras), Senior Member IEEE',
    hodBio: '24+ years in distributed systems, consensus algorithms, and cloud virtualization. Previously lead architect at Bell Labs.',
    facultyCount: 38,
    scholarsCount: 960,
    established: '2008',
    intake: '240 UG / 60 PG',
    specializations: ['Distributed Systems', 'Cloud & Edge Computing', 'Cybersecurity & Cryptography', 'High-Performance Computing'],
    labs: ['Nvidia GPU Tensor Acceleration Lab', 'Cloud & Distributed Systems Testbed', 'Cyber Defense & Forensics Arena', 'Advanced Algorithmics Studio'],
    description: 'Pioneering foundational software architecture, kernel systems, distributed ledgers, and secure computational platforms with extensive corporate consortium linkage.'
  },
  {
    id: 'dept-aids',
    category: 'computing',
    name: 'Department of Artificial Intelligence & Data Science',
    hod: 'Dr. Sunita Krishnamurthy',
    hodDegrees: 'Ph.D. (IISc Bengaluru), PostDoc (MIT CSAIL)',
    hodBio: 'Specialist in deep neural architectures, transformer models, and autonomous perception systems with 60+ Scopus citations.',
    facultyCount: 26,
    scholarsCount: 480,
    established: '2020',
    intake: '120 UG / 30 PG',
    specializations: ['Deep Neural Networks & LLMs', 'Computer Vision & Robotics', 'Speech Processing', 'Statistical Machine Learning'],
    labs: ['Foundation Models & Generative AI Lab', 'Autonomous Perception & Vision Studio', 'Cognitive Robotics Prototyping Bay', 'Neuromorphic Hardware Testing Suite'],
    description: 'Specializing in generative foundation models, reinforcement learning, edge cognitive computing, and computer vision with dedicated Nvidia A100 server clusters.'
  },
  {
    id: 'dept-ece',
    category: 'core',
    name: 'Department of Electronics & Communication Engineering',
    hod: 'Dr. Raghavan Iyer',
    hodDegrees: 'Ph.D. (IIT Bombay), Fellow IETE',
    hodBio: '28+ years in RF/Microwave engineering, antenna design for 5G/6G, and mixed-signal VLSI integrated circuits.',
    facultyCount: 32,
    scholarsCount: 720,
    established: '2008',
    intake: '180 UG / 40 PG',
    specializations: ['VLSI & Semiconductor Design', '5G/6G Wireless Networks', 'Embedded Systems & IoT', 'Signal & Image Processing'],
    labs: ['Cadence & Synopsys VLSI Design Center', '5G/6G Millimeter Wave Communications Arena', 'Advanced Embedded Robotics Rig', 'Digital Signal Processing Facility'],
    description: 'Advancing silicon microelectronics, VLSI physical verification, RF microwave networks, and next-generation wireless communications under the India Semiconductor Mission.'
  },
  {
    id: 'dept-ee',
    category: 'core',
    name: 'Department of Electrical & Electronics Engineering',
    hod: 'Dr. Sharmila Bose',
    hodDegrees: 'Ph.D. (IIT Kharagpur), Fellow IEI',
    hodBio: 'Specialist in smart microgrids, power electronic converters for electric vehicles, and renewable energy integration.',
    facultyCount: 24,
    scholarsCount: 480,
    established: '2010',
    intake: '120 UG / 30 PG',
    specializations: ['Smart Power Grids', 'Electric Mobility & Drives', 'Renewable Energy Systems', 'Industrial Power Electronics'],
    labs: ['Smart Grid Scada Simulation Suite', 'Electric Vehicle Powertrain Dynamometer', 'High Voltage Engineering Testing Cell', 'Renewable Microgrid Integration Bay'],
    description: 'Specializing in heavy power grid modernization, renewable energy topologies, electric vehicle powertrains, and high-efficiency solid-state power conversion.'
  },
  {
    id: 'dept-mech',
    category: 'core',
    name: 'Department of Mechanical & Automation Engineering',
    hod: 'Dr. Anand Vardhan',
    hodDegrees: 'Ph.D. (IIT Roorkee), Fellow ASME',
    hodBio: '22+ years in computational fluid dynamics, supersonic aerodynamics, and multi-axis CNC additive manufacturing.',
    facultyCount: 28,
    scholarsCount: 540,
    established: '2009',
    intake: '120 UG / 30 PG',
    specializations: ['Additive Manufacturing & 3D Printing', 'Computational Fluid Dynamics', 'Robotic Kinematics', 'Thermal Energy Conversion'],
    labs: ['Advanced 5-Axis CNC & Metal 3D Printing Facility', 'Supersonic Wind Tunnel Testing Chamber', 'Industrial Robotics & Mechatronics Bay', 'Automotive IC & Hybrid Engine Rig'],
    description: 'Forging expertise in precision mechatronics, additive manufacturing, aerospace aerothermodynamics, and industrial robotics for Industry 4.0 fabrication.'
  },
  {
    id: 'dept-civil',
    category: 'infrastructure',
    name: 'Department of Civil & Environmental Infrastructure',
    hod: 'Dr. Pradeep Menon',
    hodDegrees: 'Ph.D. (NIT Surathkal), Fellow ICE',
    hodBio: 'Expert in seismic engineering, resilient earthquake-proof structures, and satellite remote sensing for urban hydrological transit.',
    facultyCount: 18,
    scholarsCount: 360,
    established: '2011',
    intake: '60 UG / 20 PG',
    specializations: ['Seismic Resilient Structures', 'Smart Transportation Systems', 'Geotechnical Engineering', 'Hydrological Modeling & GIS'],
    labs: ['Shake Table Structural Dynamics Lab', 'Advanced Geotechnical Soil Mechanics', 'GIS & Satellite Remote Sensing Bay', 'Environmental Water Quality Testing Unit'],
    description: 'Advancing resilient mega-structures, smart transit modeling, earthquake engineering, and environmental stewardship for high-density smart cities.'
  }
];

interface DepartmentsPageProps {
  onBackToHome: () => void;
  onNavigateToJourney: () => void;
  onNavigateToLeadership: () => void;
}

export const DepartmentsPage: React.FC<DepartmentsPageProps> = ({
  onBackToHome,
  onNavigateToJourney,
  onNavigateToLeadership
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'computing' | 'core' | 'infrastructure'>('all');
  const [selectedDept, setSelectedDept] = useState<DepartmentDetail | null>(null);

  const filteredDepts = filterTab === 'all' 
    ? DEPARTMENTS 
    : DEPARTMENTS.filter(d => d.category === filterTab);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-50 text-neutral-900 dark:text-slate-800 selection:bg-[#C5A059] selection:text-black">
      
      {/* ── Page Masthead / Breadcrumb Bar ────────────────────────────── */}
      <div className="border-b border-slate-200 dark:border-slate-200 bg-white dark:bg-white/80 backdrop-blur-md sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <button 
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 font-medium text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Campus Home</span>
            </button>
            <span className="text-neutral-300 dark:text-neutral-300">/</span>
            <span className="text-neutral-400 font-medium">Academics</span>
            <span className="text-neutral-300 dark:text-neutral-300">/</span>
            <span className="font-semibold text-neutral-900 ">Departments &amp; Staff</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToLeadership}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors px-2.5 py-1 rounded-md hover:bg-slate-50 dark:hover:bg-white/[0.04]"
            >
              <span>Leadership Secretariat</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Page Hero ─────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-b border-slate-200 dark:border-slate-200 bg-gradient-to-b from-neutral-100/60 to-transparent dark:from-[#121215] dark:to-[#0A0A0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200/60 dark:bg-white/[0.06] border border-slate-300 dark:border-slate-200 text-xs font-mono uppercase tracking-[0.16em] text-neutral-300  mb-4">
              <Building2 className="w-3.5 h-3.5" />
              <span>Faculties of Engineering &amp; Applied Sciences</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white dark:text-white leading-[1.15]">
              Academic Departments &amp; Staff Directorate
            </h1>
            
            <p className="mt-4 text-base sm:text-lg text-neutral-400 dark:text-neutral-400 font-normal leading-relaxed">
              Six engineering faculties powered by 150+ doctoral academicians, 48 advanced laboratory suites, and rigorous industry-aligned curricula accredited under the Washington Accord.
            </p>

            {/* Micro Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-slate-200">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400  block">Faculties</span>
                <span className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-white">6 Specialized</span>
                <span className="text-[11px] text-neutral-400 block">Engineering Wings</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400  block">Doctoral Staff</span>
                <span className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-white">166 Academicians</span>
                <span className="text-[11px] text-neutral-400 block">IIT / IISc / Global Alumni</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400  block">Faculty Ratio</span>
                <span className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-[#C5A059]">1:12 Elite</span>
                <span className="text-[11px] text-neutral-400 block">Mentorship Standard</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400  block">Research Labs</span>
                <span className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-white">48 Facilities</span>
                <span className="text-[11px] text-neutral-400 block">DST &amp; Industry Funded</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Filter Tabs ───────────────────────────────────────── */}
      <section className="py-8 border-b border-slate-200 dark:border-slate-200 bg-white dark:bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06]">
            {[
              { id: 'all', label: 'All 6 Faculties' },
              { id: 'computing', label: 'Computing & AI' },
              { id: 'core', label: 'Circuit & Core' },
              { id: 'infrastructure', label: 'Infrastructure & Civil' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterTab(tab.id as any)}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filterTab === tab.id
                    ? 'bg-neutral-900  text-white dark:text-black shadow-sm'
                    : 'text-neutral-400 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-neutral-400">
            Showing <strong className="text-neutral-900 dark:text-white">{filteredDepts.length}</strong> Disciplines
          </span>
        </div>
      </section>

      {/* ── Department Profiles Grid ──────────────────────────────────── */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDepts.map((dept) => (
              <div 
                key={dept.id}
                className="rounded-2xl bg-white dark:bg-white border border-slate-200 dark:border-slate-200 hover:border-slate-300 dark:hover:border-white/[0.18] transition-all duration-200 shadow-sm p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Department Header Badge & Inception */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-50 dark:bg-white/[0.04] text-neutral-400 dark:text-neutral-400 border border-slate-200 dark:border-white/[0.06] font-semibold uppercase">
                      Est. {dept.established}
                    </span>
                    <span className="text-[10px] font-mono text-[#C5A059] font-bold">
                      Intake: {dept.intake}
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-white dark:text-white mb-2 leading-snug">
                    {dept.name}
                  </h3>

                  <p className="text-xs text-neutral-400 dark:text-neutral-400 leading-relaxed mb-4">
                    {dept.description}
                  </p>

                  {/* HOD & Faculty Details */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-50 border border-slate-200/80 dark:border-slate-100 mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-0.5">Head of Department</span>
                    <p className="text-xs font-bold text-neutral-900 dark:text-white">{dept.hod}</p>
                    <p className="text-[11px] font-mono text-[#C5A059] mt-0.5">{dept.hodDegrees}</p>
                  </div>

                  {/* Specializations Pills */}
                  <div className="mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5">Specializations</span>
                    <div className="flex flex-wrap gap-1.5">
                      {dept.specializations.map((spec, sIdx) => (
                        <span 
                          key={sIdx}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-50 dark:bg-white/[0.04] text-neutral-300 dark:text-neutral-300 border border-slate-200 dark:border-white/[0.06]"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Labs List */}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5">Accredited Laboratories</span>
                    <ul className="space-y-1 text-xs text-neutral-400 dark:text-neutral-400">
                      {dept.labs.slice(0, 3).map((lab, lIdx) => (
                        <li key={lIdx} className="flex items-center gap-1.5">
                          <FlaskConical className="w-3 h-3 text-[#C5A059] shrink-0" />
                          <span className="truncate">{lab}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Metric and Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                  <div className="text-[11px] font-mono text-neutral-400">
                    <strong>{dept.facultyCount}</strong> Faculty • <strong>{dept.scholarsCount}</strong> Scholars
                  </div>
                  <button
                    onClick={() => setSelectedDept(dept)}
                    className="text-xs font-semibold text-neutral-900  hover:underline inline-flex items-center gap-1"
                  >
                    <span>View Dossier</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Department Detailed Dossier Modal ──────────────────────────── */}
      {selectedDept && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-modal-in"
          onClick={() => setSelectedDept(null)}
        >
          <div 
            className="w-full max-w-2xl bg-white dark:bg-white rounded-3xl border border-slate-200 dark:border-slate-200 shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 font-bold">
                  Statutory Academic Dossier
                </span>
                <h3 className="text-xl font-serif font-bold text-white dark:text-white mt-1.5">
                  {selectedDept.name}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedDept(null)}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-neutral-400 dark:text-neutral-300 leading-relaxed mb-6">
              {selectedDept.description}
            </p>

            {/* HOD Bio */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-50 border border-slate-200 dark:border-white/[0.06] mb-6">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-0.5">Department Head &amp; Chair</span>
              <p className="text-sm font-bold text-white dark:text-white">{selectedDept.hod}</p>
              <p className="text-xs font-mono text-[#C5A059] mt-0.5">{selectedDept.hodDegrees}</p>
              {selectedDept.hodBio && (
                <p className="text-xs text-neutral-400 dark:text-neutral-400 mt-2 leading-relaxed">
                  {selectedDept.hodBio}
                </p>
              )}
            </div>

            {/* Labs Full List */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400  mb-2">
                All Accredited Research Laboratories
              </h4>
              <div className="space-y-2">
                {selectedDept.labs.map((lab, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs p-2.5 rounded-xl bg-slate-50/60 dark:bg-white/[0.03] border border-slate-200/80 dark:border-slate-100">
                    <FlaskConical className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span className="font-medium text-white dark:text-neutral-200">{lab}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-white/[0.06]">
              <button
                onClick={() => setSelectedDept(null)}
                className="px-4 py-2 rounded-xl bg-neutral-900  text-white dark:text-black font-semibold text-xs"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Page Navigation Banner ────────────────────────────────────── */}
      <section className="py-12 bg-slate-50/60 dark:bg-white border-t border-slate-200 dark:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Axiogen Institute Academic Directorate</h3>
            <p className="text-xs text-neutral-400">Inquire about curriculum syllabi, doctoral admissions, or institutional charters.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-200 bg-white dark:bg-slate-50 hover:bg-slate-50 dark:hover:bg-white/[0.05] text-xs font-semibold text-neutral-300 dark:text-neutral-300 transition-colors"
            >
              ← Return Home
            </button>
            <button
              onClick={onNavigateToJourney}
              className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800  dark:hover:bg-[#d4b068] text-white dark:text-black text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span>View College Journey</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
