import React, { useState } from 'react';
import { 
  BookOpen, Award, GraduationCap, ArrowLeft, ArrowRight, 
  ChevronRight, CheckCircle2, Clock, Users, Download, X, Layers
} from 'lucide-react';

export const ProgramsPage: React.FC<{
  onBackToHome: () => void;
  onEnterPortal: (role?: any) => void;
  onNavigateToAdmissions: () => void;
}> = ({ onBackToHome, onEnterPortal, onNavigateToAdmissions }) => {
  const [category, setCategory] = useState<'all' | 'ug' | 'pg' | 'phd'>('all');
  const [selectedProgram, setSelectedProgram] = useState<any | null>(null);

  const programs = [
    {
      id: 'btech-cse',
      category: 'ug',
      title: 'B.Tech in Computer Science & Engineering',
      degree: 'Bachelor of Technology (Honours)',
      duration: '4 Years (8 Semesters)',
      seats: 180,
      rating: 'NBA Tier-1 Accredited',
      creditsTotal: 164,
      eligibility: 'Minimum 75% aggregate in 10+2 (PCM) with qualifying score in JEE Main / State CET.',
      careerPaths: ['Distributed Systems Architect', 'Full-Stack Cloud Engineer', 'Cyber Defense Specialist', 'AI Algorithm Researcher'],
      description: 'Flagship undergraduate curriculum focusing on distributed cloud architectures, advanced algorithms, kernel programming, and cyber defense systems.',
      highlights: ['Nvidia CUDA Supercomputing Cluster', 'Cloud Native Systems Specialization', '100% Verified Campus Placement'],
      tag: 'Highest Demand',
      labs: ['Nvidia CUDA GPU Supercomputing Lab', 'Distributed Cloud Systems Hub', 'High-Performance Systems Sandbox']
    },
    {
      id: 'btech-ai',
      category: 'ug',
      title: 'B.Tech in Artificial Intelligence & Data Science',
      degree: 'Bachelor of Technology (Honours)',
      duration: '4 Years (8 Semesters)',
      seats: 120,
      rating: 'AICTE & Industry Co-Curated',
      creditsTotal: 162,
      eligibility: 'Minimum 75% aggregate in 10+2 (PCM) with strong mathematics aptitude + National/State Entrance.',
      careerPaths: ['Deep Learning Engineer', 'Generative AI Systems Architect', 'Computer Vision Scientist', 'Autonomous Robotics Specialist'],
      description: 'Jointly curated with frontier research laboratories for deep specialization in Foundation Models, Deep Neural Networks, Edge AI, and Cognitive Systems.',
      highlights: ['Cognitive Robotics Hub', 'Medical Imaging Research Unit', 'Direct Industry Mentorship'],
      tag: 'Emerging Frontier',
      labs: ['Cognitive Robotics Lab', 'Neuromorphic Computing Suite', 'Foundation Models Cluster']
    },
    {
      id: 'btech-ece',
      category: 'ug',
      title: 'B.Tech in Electronics & Communication',
      degree: 'Bachelor of Technology (Honours)',
      duration: '4 Years (8 Semesters)',
      seats: 120,
      rating: 'NBA Accredited • India Semi Mission',
      creditsTotal: 160,
      eligibility: 'Minimum 70% in 10+2 PCM + Entrance Examination Rank.',
      careerPaths: ['VLSI Physical Design Engineer', 'Embedded Firmware Architect', '5G/6G RF Systems Specialist', 'Semiconductor Process Technologist'],
      description: 'Mastery over silicon microarchitecture, mixed-signal VLSI, RF microwave wireless networks, and embedded Linux system drivers.',
      highlights: ['Cadence & Synopsys EDA Suite', '5G Testbed Spectrum Facility', 'Semiconductor Cleanroom Access'],
      tag: 'Core Engineering',
      labs: ['Cadence VLSI Design Lab', '5G/6G RF Communications Hub', 'Embedded IoT Test Arena']
    },
    {
      id: 'mtech-cse',
      category: 'pg',
      title: 'M.Tech in Advanced Distributed Systems & Cloud',
      degree: 'Master of Technology (Research)',
      duration: '2 Years (4 Semesters)',
      seats: 40,
      rating: 'GATE Qualified Fellowship',
      creditsTotal: 84,
      eligibility: 'B.Tech/B.E in CS/IT/ECE with minimum 60% aggregate and valid GATE score.',
      careerPaths: ['Principal Cloud Infrastructure Architect', 'Distributed Database Engineer', 'Site Reliability Lead'],
      description: 'Rigorous research-driven postgraduate curriculum in hyper-scale distributed algorithms, fault-tolerant consensus, and microservice virtualization.',
      highlights: ['₹12,400 Monthly UGC Fellowship', 'Sponsored Thesis with Tier-1 Tech Titans', '100% Placements in R&D Labs'],
      tag: 'Postgraduate Research',
      labs: ['Cloud Infrastructure Testbed', 'Distributed Computing Cluster']
    },
    {
      id: 'phd-eng',
      category: 'phd',
      title: 'Doctor of Philosophy (Ph.D.) in Engineering Sciences',
      degree: 'Doctor of Philosophy',
      duration: '3 to 5 Years',
      seats: 25,
      rating: 'Senate Doctoral Board',
      creditsTotal: 36,
      eligibility: 'Master’s degree in relevant discipline with minimum 65% aggregate + Written Research Aptitude Test & Senate Interview.',
      careerPaths: ['University Professor & Scientist', 'Corporate Chief Scientist', 'National Laboratory Researcher'],
      description: 'Prestigious doctoral fellowships working alongside senior Senate faculty on high-impact funded research projects, patents, and top-tier Scopus/IEEE journal publications.',
      highlights: ['₹38,000 Monthly Research Stipend', 'Interdisciplinary Senate Advisory Committee', '100% Funded Global Conference Travel'],
      tag: 'Doctoral Track',
      labs: ['Central High-Performance Supercomputing Facility', 'Interdisciplinary Nanotechnology Cleanroom']
    }
  ];

  const filtered = category === 'all' ? programs : programs.filter(p => p.category === category);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-[#C5A059] selection:text-black">
      {/* Breadcrumb Bar */}
      <div className="border-b border-slate-200 bg-white sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <button onClick={onBackToHome} className="inline-flex items-center gap-1.5 font-medium text-neutral-400 hover:text-slate-800 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Campus Home</span>
            </button>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-400 font-medium">Academics</span>
            <span className="text-neutral-300">/</span>
            <span className="font-semibold text-slate-800">Degree Programs Catalog</span>
          </div>

          <button onClick={onNavigateToAdmissions} className="text-xs text-neutral-400 hover:text-slate-800 font-medium inline-flex items-center gap-1">
            <span>Admissions 2026 Portal</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="py-14 border-b border-slate-200 bg-gradient-to-b from-neutral-100/70 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200/60 border border-slate-300 text-xs font-mono uppercase tracking-[0.16em] text-neutral-300 mb-4">
              <BookOpen className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Official Academic Catalog 2026</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
              Academic Degrees &amp; Disciplines of Excellence
            </h1>
            <p className="mt-4 text-base text-neutral-400 leading-relaxed">
              Curricula designed in synchrony with frontier industries, international universities, and statutory accreditation frameworks under the Washington Accord.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-50 border border-slate-200">
            {[
              { id: 'all', label: 'All Programs' },
              { id: 'ug', label: 'Undergraduate (B.Tech)' },
              { id: 'pg', label: 'Postgraduate (M.Tech)' },
              { id: 'phd', label: 'Doctoral (Ph.D.)' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCategory(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  category === tab.id
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <span className="text-xs font-mono text-neutral-400">
            Showing <strong className="text-slate-800">{filtered.length}</strong> Accredited Degrees
          </span>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => (
              <div 
                key={p.id}
                className="rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-50 text-neutral-400 border border-slate-200 font-semibold uppercase">
                      {p.tag}
                    </span>
                    <span className="text-[10px] font-mono text-[#C5A059] font-bold">
                      {p.duration}
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-white mb-1 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-[11px] font-mono text-[#C5A059] mb-3">{p.degree}</p>

                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    {p.description}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-0.5">Eligibility</span>
                    <p className="text-xs text-neutral-300">{p.eligibility}</p>
                  </div>

                  <div className="space-y-1 text-xs text-neutral-400 mb-4">
                    {p.highlights.map((h: string, i: number) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400">Seats: <strong>{p.seats}</strong> • {p.creditsTotal} Credits</span>
                  <button 
                    onClick={() => setSelectedProgram(p)}
                    className="text-xs font-semibold text-slate-800 hover:underline inline-flex items-center gap-1"
                  >
                    <span>View Curriculum</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Modal */}
      {selectedProgram && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedProgram(null)}
        >
          <div 
            className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-50 text-neutral-300 font-bold">
                  {selectedProgram.tag}
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-1">
                  {selectedProgram.title}
                </h3>
                <p className="text-xs font-mono text-[#C5A059]">{selectedProgram.degree} • {selectedProgram.creditsTotal} Credits</p>
              </div>
              <button onClick={() => setSelectedProgram(null)} className="p-1 rounded-full text-neutral-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed mb-6">{selectedProgram.description}</p>

            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">Accredited Laboratory Facilities</h4>
              <div className="space-y-1.5">
                {selectedProgram.labs.map((lab: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-xs p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span className="font-medium text-white">{lab}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button 
                onClick={() => {
                  setSelectedProgram(null);
                  onNavigateToAdmissions();
                }}
                className="px-4 py-2 rounded-xl bg-neutral-900 text-white font-semibold text-xs"
              >
                Apply for Admission 2026
              </button>
              <button onClick={() => setSelectedProgram(null)} className="text-xs text-neutral-400 hover:text-slate-800">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Banner */}
      <section className="py-12 bg-slate-50/60 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Admissions for 2026–2027 Academic Year</h3>
            <p className="text-xs text-neutral-400">Merit counseling round active for undergraduate and postgraduate seats.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onBackToHome} className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-neutral-300">
              ← Return Home
            </button>
            <button onClick={onNavigateToAdmissions} className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center gap-1.5">
              <span>Go to Admissions Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
