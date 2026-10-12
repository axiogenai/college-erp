import React, { useState } from 'react';
import { 
  Award, Shield, BookOpen, ArrowLeft, ArrowRight, 
  ChevronRight, Quote, CheckCircle, GraduationCap,
  Building, UserCheck, Scale, FileText
} from 'lucide-react';

interface LeaderProfile {
  name: string;
  role: string;
  title: string;
  degrees: string;
  experience: string;
  bio: string;
  image: string;
  quote: string;
  initiatives?: string[];
}

const LEADERS: LeaderProfile[] = [
  {
    name: 'Dr. Devendra R. Singhal',
    role: 'Sanchalak & Founder-Chancellor',
    title: 'Governing Body Chairman',
    degrees: 'Ph.D. (IIT Delhi), D.Litt (Honoris Causa), Fellow IEI',
    experience: '38+ Years in Technical Higher Education Leadership',
    bio: 'Eminent educational visionary and Sanchalak whose stewardship guided Axiogen Institute from its founding charter in 2008 into an autonomous premier technical university. Renowned for pioneering merit-based student endowments, deep industry-linked laboratories, and fostering sovereign Indian engineering capabilities.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    quote: 'Rigorous engineering education transforms intellectual discipline into societal prosperity and technological sovereignty.',
    initiatives: [
      'Founded Axiogen Institute 45-acre integrated campus in 2008',
      'Established ₹15 Cr Merit & Need Endowment Fund for undergraduate scholars',
      'Secured UGC Autonomous Charter and NAAC A++ (3.82 CGPA) accreditation',
      'Spearheaded 320 TFLOPS Supercomputing and Deep Learning Pavilion'
    ]
  },
  {
    name: 'Prof. (Dr.) Meenakshi Sundaram',
    role: 'Vice-Chancellor & Chief Executive',
    title: 'Academic Senate Chairperson',
    degrees: 'Ph.D. (IISc Bengaluru), Fellow IEEE, FNAE',
    experience: 'Former Dean of Engineering, IIT Madras (28+ Years)',
    bio: 'Distinguished computational scientist and administrator. Presides over the 8 academic faculties, doctoral boards, and statutory senate curriculum formulations aligned with NBA Washington Accord guidelines and national education priorities.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    quote: 'Our senate ensures academic curricula evolve synchronously with frontier industrial architecture and artificial intelligence.',
    initiatives: [
      'Chairs Statutory Academic Senate with 48 Industry & Doctoral Members',
      'Implemented Modular Honours & Minor Degrees in Generative AI & FinTech',
      'Formulated Continuous Evaluation and UGC Condonation Framework'
    ]
  },
  {
    name: 'Dr. Rajeshwar Rao, CA',
    role: 'Registrar & Chief Governance Officer',
    title: 'Statutory Secretariat & Regulatory Head',
    degrees: 'Ph.D. in Operations Research, M.Tech (NITK)',
    experience: '24+ Years Institutional Governance & Compliance',
    bio: 'Oversees statutory institutional alignment with AICTE, UGC, and State Technical Board directives, safeguarding transparency, admissions integrity, audit compliance, and administrative protocol.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    quote: 'Institutional governance at Axiogen is anchored on absolute regulatory compliance and meritocratic transparency.',
    initiatives: [
      'Chief Custodian of Institutional Seal and University Statutes',
      'Automated E-Treasury Reconciled Billing & Real-time Fee Invoicing',
      'Directs AICTE Approval Renewals and NIRF Data Validations'
    ]
  },
  {
    name: 'Prof. (Dr.) Ananya Sengupta',
    role: 'Dean of Academic Affairs',
    title: 'Senate Curriculum Secretariat',
    degrees: 'Ph.D. (Carnegie Mellon), M.S. (Purdue)',
    experience: '18+ Years Curriculum Architecture & Pedagogy',
    bio: 'Architect of the interdisciplinary engineering curriculum. Directs modular minors in Artificial Intelligence, Quantitative Trading, and Microelectronics with continuous evaluation metrics.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    quote: 'Every semester is structured to turn mathematical rigor into scalable engineering craftsmanship.',
    initiatives: [
      'Continuous Evaluation Framework (40% CIE / 60% SEE split)',
      '162-Credit Washington Accord Compliant B.Tech Curriculum',
      'Full-Semester 8th Semester Industry Corporate Practicum'
    ]
  },
  {
    name: 'Prof. (Dr.) Vikramaditya Kulkarni',
    role: 'Dean of Research & Sponsored Projects',
    title: 'Director of Innovation & Patents',
    degrees: 'Ph.D. (Stanford), B.Tech (IIT Bombay)',
    experience: '22+ Years in Silicon Valley R&D & Advanced Materials',
    bio: 'Heads the Central Research Directorate, administering ₹24.8 Cr in active DST, SERB, and private corporate research grants. Oversees the university incubation center and patent disclosures.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    quote: 'True academic prestige is measured by how many ideas move from our test-benches into transformative global production.',
    initiatives: [
      'Oversees 38 Institutional Patents filed across India and USPTO',
      'Directs Central Instrumentation Facility and GPU Clusters',
      'Facilitates 92 Full-Time Doctoral Fellowships with Stated Stipends'
    ]
  },
  {
    name: 'Prof. (Dr.) Suniti Deshmukh',
    role: 'Dean of Student Affairs & Welfare',
    title: 'Ombudsperson & Campus Life Directorate',
    degrees: 'Ph.D. (TIFR Mumbai), M.Sc. (Delhi University)',
    experience: '16+ Years Student Mentorship & Higher Education Affairs',
    bio: 'Presides over the Student Council, 32 cultural and technical societies, sports leagues, and statutory grievance committees to maintain a zero-tolerance anti-ragging campus environment.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    quote: 'We nurture well-rounded engineers who combine technical mastery with empathy, integrity, and ethical responsibility.',
    initiatives: [
      '24/7 Student Grievance Redressal and Mental Wellness Cell',
      'Oversees 32 Active Student Technical & Cultural Chapters',
      'Zero-Tolerance Anti-Ragging Regulatory Compliance Monitor'
    ]
  }
];

const STATUTORY_COUNCILS = [
  {
    name: 'Governing Body',
    chair: 'Dr. Devendra R. Singhal (Sanchalak)',
    mandate: 'Supreme administrative and financial authority reviewing institutional endowments, major capital expenditures, and statutory expansion.',
    members: '12 Members (AICTE Nominee, State Govt Nominee, Industrialists)'
  },
  {
    name: 'Academic Senate',
    chair: 'Prof. (Dr.) Meenakshi Sundaram (VC)',
    mandate: 'Statutory body responsible for curriculum standards, syllabus revisions, examination bylaws, and award of autonomous degrees.',
    members: '48 Members (All Deans, HODs, External Subject Experts)'
  },
  {
    name: 'Finance & Audit Committee',
    chair: 'Dr. Rajeshwar Rao, CA (Registrar & Bursar)',
    mandate: 'Quarterly oversight of institutional budget allocations, scholarship disbursals, laboratory grants, and statutory audits.',
    members: '6 Members (Statutory Auditors, Finance Secretariat)'
  },
  {
    name: 'Internal Quality Assurance Cell (IQAC)',
    chair: 'Director of Quality & Accreditations',
    mandate: 'Continuous benchmarking of institutional teaching standards, NAAC A++ compliance, and NIRF ranking parameters.',
    members: '16 Members (Faculty, Alumni, Industry Dignitaries)'
  }
];

interface LeadershipPageProps {
  onBackToHome: () => void;
  onNavigateToJourney: () => void;
  onNavigateToDepartments: () => void;
}

export const LeadershipPage: React.FC<LeadershipPageProps> = ({
  onBackToHome,
  onNavigateToJourney,
  onNavigateToDepartments
}) => {
  const [selectedLeader, setSelectedLeader] = useState<LeaderProfile | null>(null);

  const sanchalak = LEADERS[0];
  const councilMembers = LEADERS.slice(1);

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
            <span className="text-neutral-400 font-medium">Governance &amp; Senate</span>
            <span className="text-neutral-300 dark:text-neutral-300">/</span>
            <span className="font-semibold text-neutral-900 ">Leadership Secretariat</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToJourney}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors px-2.5 py-1 rounded-md hover:bg-slate-50 dark:hover:bg-white/[0.04]"
            >
              <span>College Journey (2008–'26)</span>
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
              <Shield className="w-3.5 h-3.5" />
              <span>Statutory University Secretariat</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white dark:text-white leading-[1.15]">
              Leadership &amp; Sanchalak Council
            </h1>
            
            <p className="mt-4 text-base sm:text-lg text-neutral-400 dark:text-neutral-400 font-normal leading-relaxed">
              The guardians of institutional autonomy, academic integrity, and research vision. Governed by a distinguished council of IIT academicians, statutory trustees, and industry visionaries.
            </p>
          </div>
        </div>
      </section>

      {/* ── Sanchalak & Founder-Chancellor Feature Dossier ───────────── */}
      <section className="py-16 border-b border-slate-200 dark:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="rounded-3xl bg-white dark:bg-white border border-slate-200 dark:border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            {/* Chancellor Portrait Column */}
            <div className="lg:col-span-5 relative min-h-[380px] bg-neutral-900 overflow-hidden">
              <img
                src={sanchalak.image}
                alt={sanchalak.name}
                className="w-full h-full object-cover object-top filter brightness-[0.9] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#C5A059] text-black font-bold inline-block mb-1">
                  Sanchalak &amp; Chancellor
                </span>
                <h3 className="text-xl font-serif font-bold text-white drop-shadow-sm">{sanchalak.name}</h3>
                <p className="text-xs text-neutral-300 font-mono mt-0.5">{sanchalak.degrees}</p>
              </div>
            </div>

            {/* Narrative & Vision Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#C5A059] font-bold">
                    Founding Stewardship • 2008 – Present
                  </span>
                  <span className="text-xs font-mono text-neutral-400">{sanchalak.experience}</span>
                </div>

                <h2 className="text-2xl font-serif font-bold text-white dark:text-white">
                  Sanchalak&apos;s Institutional Address
                </h2>

                <div className="my-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-50 border-l-4 border-[#C5A059] italic text-sm text-neutral-300 dark:text-neutral-300 leading-relaxed flex items-start gap-3">
                  <Quote className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <p>&ldquo;{sanchalak.quote}&rdquo;</p>
                </div>

                <p className="text-sm text-neutral-400 dark:text-neutral-300 leading-relaxed mb-6">
                  {sanchalak.bio}
                </p>

                {/* Key Chancellor Initiatives */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400  mb-3">
                    Key Stewardship Mandates
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {sanchalak.initiatives?.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300 dark:text-neutral-300 bg-slate-50  p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-100">
                        <CheckCircle className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">Office of the Sanchalak Secretariat</span>
                <span className="text-xs font-mono text-neutral-400">Knowledge Corridor, Bengaluru</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── Governing Council & Academic Senate Directory ─────────────── */}
      <section className="py-16 border-b border-slate-200 dark:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-400  block">
              Academic Senate &amp; Statutory Deans
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white dark:text-white mt-1">
              Executive Senate Directorate
            </h2>
            <p className="text-xs text-neutral-400 mt-2">
              Overseeing educational policy, research grants, curriculum rigor, and student empowerment across all faculties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {councilMembers.map((member, idx) => (
              <div 
                key={idx}
                className="rounded-2xl bg-white dark:bg-white border border-slate-200 dark:border-slate-200 hover:border-slate-300 dark:hover:border-white/[0.18] transition-all duration-200 shadow-sm overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 relative overflow-hidden bg-neutral-900">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top filter brightness-[0.88]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 backdrop-blur-md text-white border border-white/20 font-semibold inline-block mb-0.5">
                        {member.role}
                      </span>
                      <h4 className="text-base font-serif font-bold text-white drop-shadow-sm">{member.name}</h4>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-[11px] font-mono text-[#C5A059] font-medium mb-1">{member.degrees}</p>
                    <p className="text-[10px] text-neutral-400 font-mono mb-3">{member.experience}</p>
                    <p className="text-xs text-neutral-400 dark:text-neutral-300 leading-relaxed mb-4">
                      {member.bio}
                    </p>

                    {member.initiatives && (
                      <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-100">
                        {member.initiatives.map((init, iIdx) => (
                          <div key={iIdx} className="flex items-start gap-1.5 text-[11px] text-neutral-400 dark:text-neutral-400">
                            <span className="text-[#C5A059] font-bold">•</span>
                            <span>{init}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-50 border-t border-slate-200/80 dark:border-slate-100 text-[11px] italic text-neutral-400">
                  &ldquo;{member.quote}&rdquo;
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Statutory Governance Councils & Charters ──────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-xl mb-10">
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-400  block">
              Institutional Framework
            </span>
            <h2 className="text-2xl font-serif font-bold text-white dark:text-white mt-1">
              Statutory Governance Bodies
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Constitutional committees operating under AICTE, UGC, and State Technological University regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STATUTORY_COUNCILS.map((council, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-white border border-slate-200 dark:border-slate-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-white">{council.name}</h3>
                  <span className="text-[10px] font-mono text-neutral-400">{council.members}</span>
                </div>
                <p className="text-[11px] font-mono text-[#C5A059] mb-2">Presiding Chair: {council.chair}</p>
                <p className="text-xs text-neutral-400 dark:text-neutral-400 leading-relaxed">
                  {council.mandate}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Page Navigation Banner ────────────────────────────────────── */}
      <section className="py-12 bg-slate-50/60 dark:bg-white border-t border-slate-200 dark:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Next: Academic Departments &amp; Staff</h3>
            <p className="text-xs text-neutral-400">Explore the 6 engineering faculties and 150+ doctoral researchers.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-200 bg-white dark:bg-slate-50 hover:bg-slate-50 dark:hover:bg-white/[0.05] text-xs font-semibold text-neutral-300 dark:text-neutral-300 transition-colors"
            >
              ← Return Home
            </button>
            <button
              onClick={onNavigateToDepartments}
              className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800  dark:hover:bg-[#d4b068] text-white dark:text-black text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span>Browse Academic Faculties</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
