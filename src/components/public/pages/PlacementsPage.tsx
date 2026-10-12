import React from 'react';
import { 
  TrendingUp, Award, Building2, CheckCircle2, ArrowLeft, ArrowRight, 
  Users, ChevronRight, Briefcase, DollarSign
} from 'lucide-react';

export const PlacementsPage: React.FC<{
  onBackToHome: () => void;
  onNavigateToAdmissions: () => void;
}> = ({ onBackToHome, onNavigateToAdmissions }) => {
  const recruiters = [
    { name: 'Google', ctc: '48.5 LPA', role: 'Systems Software Engineer', sector: 'Operating Systems & Cloud' },
    { name: 'Microsoft', ctc: '45.0 LPA', role: 'Cloud & AI Engineer', sector: 'Distributed AI Infrastructure' },
    { name: 'NVIDIA', ctc: '42.0 LPA', role: 'GPU Architecture Architect', sector: 'Accelerated Computing' },
    { name: 'Amazon', ctc: '40.0 LPA', role: 'Software Development Engineer', sector: 'AWS Hyper-Scale' },
    { name: 'Texas Instruments', ctc: '34.0 LPA', role: 'Analog VLSI Designer', sector: 'Semiconductors' },
    { name: 'Goldman Sachs', ctc: '32.0 LPA', role: 'Quantitative Analyst', sector: 'FinTech & Trading' },
    { name: 'Qualcomm', ctc: '30.0 LPA', role: '5G Modem Software Engineer', sector: 'Telecommunications' },
    { name: 'Cisco Systems', ctc: '28.0 LPA', role: 'Network Security Architect', sector: 'Enterprise Cyber Security' },
    { name: 'Intel Corporation', ctc: '27.5 LPA', role: 'Silicon Validation Engineer', sector: 'Semiconductor Fabrication' },
    { name: 'Oracle', ctc: '26.0 LPA', role: 'Autonomous Database Specialist', sector: 'Enterprise Cloud' },
    { name: 'Adobe', ctc: '25.0 LPA', role: 'Computer Graphics Research Engineer', sector: 'Creative Intelligence' },
    { name: 'Morgan Stanley', ctc: '24.0 LPA', role: 'Algorithmic Systems Engineer', sector: 'Global Finance' }
  ];

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
            <span className="text-neutral-400 font-medium">Corporate Outreach</span>
            <span className="text-neutral-300">/</span>
            <span className="font-semibold text-slate-800">Career Placements &amp; Consortium</span>
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
              <TrendingUp className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Phase-1 verified placement report</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
              Direct Pathways into Global Tech Titans
            </h1>
            <p className="mt-4 text-base text-neutral-400 leading-relaxed">
              Connecting scholars with Fortune 500 conglomerates, research laboratories, and investment banking trading desks across India and global technology capitals.
            </p>
          </div>

          {/* 4 Metrics Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-200">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Premier Package</span>
              <p className="text-3xl font-extrabold text-slate-800 mt-1 tracking-tight font-mono">₹48.5 <span className="text-sm text-[#C5A059]">LPA</span></p>
              <p className="text-[11px] text-neutral-400 mt-0.5">Google Systems Software</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Median Batch CTC</span>
              <p className="text-3xl font-extrabold text-slate-800 mt-1 tracking-tight font-mono">₹14.2 <span className="text-sm text-[#C5A059]">LPA</span></p>
              <p className="text-[11px] text-neutral-400 mt-0.5">Overall Batch Average</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Recruiter Consortium</span>
              <p className="text-3xl font-extrabold text-slate-800 mt-1 tracking-tight font-mono">240<span className="text-neutral-400">+</span></p>
              <p className="text-[11px] text-neutral-400 mt-0.5">Global Tier-1 Corporations</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Placement Rate</span>
              <p className="text-3xl font-extrabold text-slate-800 mt-1 tracking-tight font-mono">96.8<span className="text-sm text-[#C5A059]">%</span></p>
              <p className="text-[11px] text-neutral-400 mt-0.5">Verified Placement Index</p>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Consortium Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-8">
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-400 block">Recruitment Partners</span>
            <h2 className="text-2xl font-serif font-bold text-white mt-1">Tier-1 Corporate Consortium</h2>
            <p className="text-xs text-neutral-400 mt-1">Consortium recruiters offering core systems and technology architecture opportunities.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recruiters.map((rec, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-base text-slate-800">{rec.name}</h3>
                  <span className="text-xs font-mono font-bold text-[#C5A059] bg-slate-50 px-2 py-0.5 rounded">{rec.ctc}</span>
                </div>
                <p className="text-xs text-neutral-400 font-medium mb-1">{rec.role}</p>
                <p className="text-[11px] text-neutral-400 font-mono">{rec.sector}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Banner */}
      <section className="py-12 bg-slate-50/60 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Are You an Enterprise Corporate Recruiter?</h3>
            <p className="text-xs text-neutral-400">Connect with the Dean of Corporate Relations &amp; Placement Secretariat.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onBackToHome} className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-neutral-300">
              ← Return Home
            </button>
            <button onClick={onNavigateToAdmissions} className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center gap-1.5">
              <span>View Admissions 2026</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
