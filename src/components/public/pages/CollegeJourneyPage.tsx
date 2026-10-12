import React, { useState } from 'react';
import { 
  Calendar, Award, CheckCircle2, ArrowLeft, ArrowRight, 
  ChevronRight, Sparkles, Building2, BookOpen, ShieldCheck,
  TrendingUp, Users, Compass, Milestone
} from 'lucide-react';
import { UniversityCrest } from '../PublicLanding';

interface MilestoneMetric {
  label: string;
  val: string;
}

interface CollegeMilestone {
  year: string;
  title: string;
  tag: string;
  badge: string;
  description: string;
  image: string;
  metrics: MilestoneMetric[];
  resolution?: string;
}

const COLLEGE_MILESTONES: CollegeMilestone[] = [
  {
    year: '2008',
    title: 'Genesis & Statutory Founding Charter',
    tag: 'Statutory Inception',
    badge: 'Founding Year',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    description: 'Founded under the visionary leadership of Sanchalak Dr. Devendra R. Singhal across a lush 45-acre integrated knowledge corridor in Bengaluru. Approved by AICTE with an initial cohort of 240 engineering scholars across foundational computer and electrical disciplines.',
    resolution: 'Resolution 01/2008: Formal dedication of Axiogen Institute of Technology to scientific scholarship and societal empowerment.',
    metrics: [
      { label: 'Initial Cohort', val: '240 Scholars' },
      { label: 'Campus Footprint', val: '45 Acres' },
      { label: 'Founding Faculty', val: '28 Doctoral' }
    ]
  },
  {
    year: '2012',
    title: 'Inaugural Convocation & PG Research Expansion',
    tag: 'Postgraduate Milestone',
    badge: 'First Graduating Cohort',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    description: 'Inaugural graduating batch achieved a stellar 94.2% campus placement index. Launched postgraduate Master of Technology (M.Tech) research fellowships in Advanced Distributed Systems and VLSI Microelectronics with dedicated state-funded laboratories.',
    resolution: 'Resolution 14/2012: Senate establishment of postgraduate fellowships and institutional research grants.',
    metrics: [
      { label: 'Cohort Placement', val: '94.2%' },
      { label: 'M.Tech Wings', val: '4 Degrees' },
      { label: 'Specialized Labs', val: '12 Facilities' }
    ]
  },
  {
    year: '2015',
    title: 'NBA Tier-1 Washington Accord International Accreditation',
    tag: 'Global Equivalence',
    badge: 'Washington Accord',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    description: 'Conferred Tier-1 Accreditation under the Washington Accord by the National Board of Accreditation (NBA), certifying institutional engineering degrees for statutory equivalence across 21 signatory nations worldwide including the US, UK, and Australia.',
    resolution: 'Resolution 07/2015: Statutory alignment with international Washington Accord graduate outcomes.',
    metrics: [
      { label: 'NBA Tier', val: 'Tier-1 Elite' },
      { label: 'Global Signatories', val: '21 Nations' },
      { label: 'Accredited Programs', val: '6 Degrees' }
    ]
  },
  {
    year: '2018',
    title: 'Conferment of Statutory UGC Autonomous University Status',
    tag: 'Autonomous Charter',
    badge: 'UGC Autonomous Charter',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    description: 'University Grants Commission (UGC) and the State Technological Board formally conferred Autonomous Status. Granted academic autonomy to design cutting-edge curricula, introduce industry-linked minors, and conduct independent senate examinations.',
    resolution: 'UGC Gazette Notification No. F.22-1/2017: Grant of autonomous status with independent Senate curriculum authority.',
    metrics: [
      { label: 'Governance Status', val: 'Autonomous' },
      { label: 'Academic Senate', val: 'Self-Governed' },
      { label: 'Patents Registered', val: '38 Filings' }
    ]
  },
  {
    year: '2021',
    title: 'NAAC A++ Accreditation (CGPA 3.82 / 4.0)',
    tag: 'Premier Quality Benchmark',
    badge: 'Top 1.5% Nationwide',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80',
    description: 'Honored with NAAC A++ Grade with an extraordinary 3.82 institutional CGPA, placing Axiogen Institute within the elite upper 1.5% of technical institutions in India. Commissioned high-performance GPU tensor computing clusters.',
    resolution: 'NAAC Peer Committee Citation: Exemplary institutional governance, research productivity, and digital campus infrastructure.',
    metrics: [
      { label: 'NAAC Score', val: '3.82 / 4.0' },
      { label: 'NAAC Grade', val: 'A++ Grade' },
      { label: 'R&D Endowments', val: '₹14.2 Cr' }
    ]
  },
  {
    year: '2024',
    title: 'NIRF National Rank #12 & Supercomputing Pavilion',
    tag: 'National Eminence',
    badge: 'NIRF Rank #12',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    description: 'Attained All-India Rank #12 in the National Institutional Ranking Framework (NIRF). Inaugurated the 320 TFLOPS Nvidia Tensor Core Supercomputing Pavilion and autonomous robotics test arenas.',
    resolution: 'Ministry of Education Citation: High-impact technical institution with top-tier research citations and patent output.',
    metrics: [
      { label: 'NIRF Ranking', val: 'All-India #12' },
      { label: 'Compute Power', val: '320 TFLOPS' },
      { label: 'Doctoral Scholars', val: '92 Fellowships' }
    ]
  },
  {
    year: '2026',
    title: 'Premier Autonomous Technical University Today',
    tag: 'Present Day Benchmark',
    badge: 'Autonomous Benchmark',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80',
    description: 'Today operating 8 specialized academic faculties, 240+ global Fortune 500 recruitment partners, 96.8% verified placement success index, and a premier package of ₹48.5 LPA across over 4,200 enrolled undergraduate and doctoral scholars.',
    resolution: 'Current Senate Mandate: Global frontier research in Artificial Intelligence, Quantum Computing, and Sustainable Engineering.',
    metrics: [
      { label: 'Enrolled Scholars', val: '4,200+' },
      { label: 'Consortium Recruiters', val: '240+' },
      { label: 'Premier Package', val: '₹48.5 LPA' }
    ]
  }
];

interface CollegeJourneyPageProps {
  onBackToHome: () => void;
  onNavigateToLeadership: () => void;
  onNavigateToDepartments: () => void;
  onEnterPortal: (role: 'student' | 'faculty' | 'accountant' | 'principal') => void;
}

export const CollegeJourneyPage: React.FC<CollegeJourneyPageProps> = ({
  onBackToHome,
  onNavigateToLeadership,
  onNavigateToDepartments,
  onEnterPortal
}) => {
  const [selectedYear, setSelectedYear] = useState<string>('2026');
  const activeMilestone = COLLEGE_MILESTONES.find(m => m.year === selectedYear) || COLLEGE_MILESTONES[COLLEGE_MILESTONES.length - 1];

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
            <span className="text-neutral-400 font-medium">Institutional Archive</span>
            <span className="text-neutral-300 dark:text-neutral-300">/</span>
            <span className="font-semibold text-neutral-900 ">Evolutionary Journey (2008 – 2026)</span>
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
      <section className="relative py-14 sm:py-20 border-b border-slate-200 dark:border-slate-200 overflow-hidden bg-gradient-to-b from-neutral-100/60 to-transparent dark:from-[#121215] dark:to-[#0A0A0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200/60 dark:bg-white/[0.06] border border-slate-300 dark:border-slate-200 text-xs font-mono uppercase tracking-[0.16em] text-neutral-300  mb-4">
              <Milestone className="w-3.5 h-3.5" />
              <span>Eighteen-Year Institutional Chronicle</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white dark:text-white leading-[1.15]">
              The Evolutionary Journey
            </h1>
            
            <p className="mt-4 text-base sm:text-lg text-neutral-400 dark:text-neutral-400 font-normal leading-relaxed">
              From our foundational 45-acre statutory charter in 2008 to India&apos;s All-India NIRF #12 Autonomous Technical University in 2026. A record of sovereign academic rigor, pioneering research patents, and distinguished alumni leadership.
            </p>

            {/* Micro Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-slate-200">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400  block">Founded</span>
                <span className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-white">2008</span>
                <span className="text-[11px] text-neutral-400 block">AICTE Statutory Charter</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400  block">UGC Status</span>
                <span className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-white">Autonomous</span>
                <span className="text-[11px] text-neutral-400 block">Self-Governed Senate</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400  block">NAAC Grade</span>
                <span className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-[#C5A059]">A++ 3.82</span>
                <span className="text-[11px] text-neutral-400 block">Top 1.5% Nationwide</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400  block">NIRF Rank</span>
                <span className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-white">#12 All-India</span>
                <span className="text-[11px] text-neutral-400 block">Ministry of Education</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive Year Navigator & Spotlight Section ───────────── */}
      <section className="py-12 border-b border-slate-200 dark:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-400  block">
                Interactive Era Scrubber
              </span>
              <h2 className="text-lg font-bold font-serif text-white dark:text-white">
                Select an Epoch to Inspect Charter Milestones
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-400">
              Active: <strong className="text-neutral-900 ">{selectedYear}</strong>
            </span>
          </div>

          {/* Interactive Year Scrubber Pills */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 scrollbar-none">
            {COLLEGE_MILESTONES.map((m) => {
              const isSelected = m.year === selectedYear;
              return (
                <button
                  key={m.year}
                  onClick={() => setSelectedYear(m.year)}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-neutral-900  text-white dark:text-black border-neutral-900  shadow-lg shadow-[#C5A059]/10'
                      : 'bg-white dark:bg-white text-neutral-400 dark:text-neutral-400 border-slate-200 dark:border-slate-200 hover:border-slate-300 dark:hover:border-white/[0.2]'
                  }`}
                >
                  <span>{m.year}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    isSelected 
                      ? 'bg-white/20 dark:bg-black/20 text-white dark:text-black' 
                      : 'bg-slate-50 dark:bg-white/[0.04] text-neutral-400'
                  }`}>
                    {m.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Milestone Deep-Dive Spotlight Card */}
          <div className="mt-8 rounded-3xl bg-white dark:bg-white border border-slate-200 dark:border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all duration-300">
            {/* Image Column */}
            <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[340px] overflow-hidden bg-neutral-900">
              <img
                src={activeMilestone.image}
                alt={activeMilestone.title}
                className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md text-white border border-white/20 font-semibold inline-block mb-1">
                  Epoch of {activeMilestone.year}
                </span>
                <p className="text-sm font-bold text-white drop-shadow-sm">{activeMilestone.tag}</p>
              </div>
            </div>

            {/* Narrative & Metrics Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-xs font-mono font-bold text-[#C5A059] uppercase tracking-wider">
                    Official Institutional Archive Entry
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-50 dark:bg-white/[0.06] border border-slate-200 dark:border-slate-200 text-neutral-400 dark:text-neutral-400">
                    Verified Record
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white dark:text-white leading-tight">
                  {activeMilestone.year} • {activeMilestone.title}
                </h3>

                <p className="mt-4 text-sm text-neutral-400 dark:text-neutral-300 leading-relaxed">
                  {activeMilestone.description}
                </p>

                {activeMilestone.resolution && (
                  <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-50 border border-slate-200 dark:border-white/[0.06] text-xs font-mono text-neutral-300 dark:text-neutral-300">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">Statutory Gazette Citation</span>
                    {activeMilestone.resolution}
                  </div>
                )}
              </div>

              {/* Verified Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-white/[0.06]">
                {activeMilestone.metrics.map((metric, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50  border border-slate-200/80 dark:border-slate-100">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400  block">
                      {metric.label}
                    </span>
                    <span className="text-base sm:text-lg font-bold font-mono tabular-nums text-neutral-900 dark:text-white mt-0.5 block">
                      {metric.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Complete Chronological Timeline Record ───────────────────── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-400  block">
              Complete Historical Register
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white dark:text-white mt-1">
              Eighteen Years of Groundbreaking Impact
            </h2>
            <p className="text-xs text-neutral-400 mt-2">
              Chronological log of academic accreditations, infrastructure milestones, and state senate charters.
            </p>
          </div>

          <div className="relative pl-6 sm:pl-10 border-l-2 border-slate-200 dark:border-slate-200 space-y-10 sm:space-y-12">
            {COLLEGE_MILESTONES.map((milestone, idx) => {
              const isSelected = milestone.year === selectedYear;
              return (
                <div 
                  key={milestone.year} 
                  className={`relative group transition-all duration-300 ${
                    isSelected ? 'scale-[1.01]' : ''
                  }`}
                >
                  {/* Timeline Node */}
                  <div className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-[#C5A059] border-white  ring-4 ring-[#C5A059]/20'
                      : 'bg-white dark:bg-white border-slate-300 dark:border-neutral-700'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-black' : 'bg-neutral-400'}`} />
                  </div>

                  {/* Timeline Card */}
                  <div 
                    onClick={() => setSelectedYear(milestone.year)}
                    className={`cursor-pointer p-6 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-white dark:bg-slate-50 border-[#C5A059]/50 shadow-md ring-1 ring-[#C5A059]/30'
                        : 'bg-white/60 dark:bg-white/60 hover:bg-white dark:hover:bg-white border-slate-200 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-bold text-base text-white dark:text-white">
                          {milestone.year}
                        </span>
                        <span className="text-neutral-300 dark:text-neutral-300">•</span>
                        <span className="font-serif font-bold text-sm text-neutral-900 dark:text-neutral-100">
                          {milestone.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-50 dark:bg-white/[0.04] text-neutral-400 dark:text-neutral-400 border border-slate-200 dark:border-white/[0.06]">
                        {milestone.badge}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-400 dark:text-neutral-300 leading-relaxed mb-4">
                      {milestone.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-100 dark:border-slate-100 text-[11px] font-mono text-neutral-400">
                      {milestone.metrics.map((m, mIdx) => (
                        <span key={mIdx}>
                          <span className="text-neutral-400">{m.label}:</span>{' '}
                          <strong className="text-white dark:text-neutral-200">{m.val}</strong>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── Page Navigation Banner ────────────────────────────────────── */}
      <section className="py-12 bg-slate-50/60 dark:bg-white border-t border-slate-200 dark:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Continue Exploring Axiogen</h3>
            <p className="text-xs text-neutral-400">Discover our governance leadership or inspect faculty departments.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-200 bg-white dark:bg-slate-50 hover:bg-slate-50 dark:hover:bg-white/[0.05] text-xs font-semibold text-neutral-300 dark:text-neutral-300 transition-colors"
            >
              ← Return Home
            </button>
            <button
              onClick={onNavigateToLeadership}
              className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800  dark:hover:bg-[#d4b068] text-white dark:text-black text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span>Meet Leadership Council</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
