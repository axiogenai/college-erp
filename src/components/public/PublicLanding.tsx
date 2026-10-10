import React, { useState, useEffect, useRef } from 'react';
import { 
  School, Award, BookOpen, Users, Calendar, ArrowRight, 
  ShieldCheck, CheckCircle2, ChevronRight, FileText, Phone, 
  Mail, MapPin, ExternalLink, LogIn, Building2, 
  GraduationCap, Clock, HelpCircle, Layers, Compass,
  Sparkles, TrendingUp, Star, Globe, Zap, BarChart3,
  ChevronDown, Menu, X, Play, Pause, Search,
  Download, ArrowUpRight, Cpu, Microscope, Library,
  Trophy, Check
} from 'lucide-react';
import { UserRole } from '../../types';
import { useErpData } from '../../context/ErpDataContext';

interface PublicLandingProps {
  onEnterPortal: (role?: UserRole) => void;
}

// ── Intersection Observer Hook for Smooth Scroll Animations ─────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── Live Counter Animation Hook ─────────────────────────────────────────────
function useCounter(target: number, duration = 1600, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
}

// ── Degree Programs Catalog ──────────────────────────────────────────────────
const PROGRAMS = [
  {
    id: 'btech-cse',
    category: 'ug',
    title: 'B.Tech in Computer Science & Engineering',
    degree: 'Bachelor of Technology',
    duration: '4 Years (8 Semesters)',
    seats: 180,
    rating: 'NBA Tier-1',
    description: 'Flagship undergraduate program focusing on distributed cloud architectures, advanced algorithms, and cyber defense systems.',
    highlights: ['Nvidia CUDA GPU Lab', 'Cloud Systems Specialization', '100% Campus Placement'],
    tag: 'Highest Demand'
  },
  {
    id: 'btech-ai',
    category: 'ug',
    title: 'B.Tech in Artificial Intelligence & Data Science',
    degree: 'Bachelor of Technology',
    duration: '4 Years (8 Semesters)',
    seats: 120,
    rating: 'AICTE Approved',
    description: 'Jointly curated with leading industry labs for frontier research in Foundation Models, Deep Neural Networks, and Edge Computing.',
    highlights: ['Cognitive Robotics Hub', 'Medical Imaging Lab', 'Industry Mentorship'],
    tag: 'Emerging Tech'
  },
  {
    id: 'btech-ece',
    category: 'ug',
    title: 'B.Tech in Electronics & Communication',
    degree: 'Bachelor of Technology',
    duration: '4 Years (8 Semesters)',
    seats: 120,
    rating: 'IEEE Accredited',
    description: 'World-class silicon VLSI simulation suites, microwave RF antenna laboratories, and next-generation IoT sensor architectures.',
    highlights: ['Cadence VLSI Suite', '5G RF Testing Center', 'Fab Lab Collaboration'],
    tag: 'Hardware & Silicon'
  },
  {
    id: 'btech-me',
    category: 'ug',
    title: 'B.Tech in Mechanical & Automation Engineering',
    degree: 'Bachelor of Technology',
    duration: '4 Years (8 Semesters)',
    seats: 60,
    rating: 'Autonomous',
    description: 'Fusion of classical thermodynamics and fluid dynamics with modern industrial robotics, additive CNC manufacturing, and mechatronics.',
    highlights: ['Wind Tunnel Testing', 'Robotic Arms Studio', 'Electric Vehicle Prototyping'],
    tag: 'Industry 4.0'
  },
  {
    id: 'mtech-cs',
    category: 'pg',
    title: 'M.Tech in Advanced Computing & Cyber Defense',
    degree: 'Master of Technology',
    duration: '2 Years (4 Semesters)',
    seats: 40,
    rating: 'Postgraduate',
    description: 'Advanced research degree for computer scientists, focusing on fault-tolerant systems, zero-trust infrastructure, and cryptography.',
    highlights: ['Funded Research Stipend', 'IEEE Publication Mandate', 'International Exchange'],
    tag: 'Research Focus'
  },
  {
    id: 'phd-eng',
    category: 'phd',
    title: 'Doctor of Philosophy (Ph.D.) in Engineering Sciences',
    degree: 'Doctoral Fellowship',
    duration: '3–5 Years',
    seats: 25,
    rating: 'UGC Fellowship',
    description: 'Full-time doctoral research fellowships with state-of-the-art laboratory access, international travel grants, and university stipend.',
    highlights: ['₹38,000 Monthly Stipend', 'Interdisciplinary Tracks', 'Dedicated Research Advisor'],
    tag: 'Doctoral Track'
  }
];

// ── Research Centers & Infrastructure Showcase ──────────────────────────────
const FACILITIES = [
  {
    title: 'Supercomputing & AI Research Center',
    category: 'Computing Infrastructure',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80',
    description: 'Equipped with 64 Nvidia A100 Tensor Core GPUs providing 320 Teraflops of computing power for neural foundation model training.',
    badge: '320 TFLOPS Cluster'
  },
  {
    title: 'Neoclassical Central Digital Library',
    category: 'Academic Knowledge',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    description: 'Over 85,000 catalogued scientific volumes, 24/7 climate-controlled study carrels, and instantaneous access to IEEE, ACM, and Springer journals.',
    badge: '85,000+ Volumes'
  },
  {
    title: 'Advanced Robotics & Automation Pavilion',
    category: 'Engineering & Fabrication',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    description: 'Industrial 6-axis robotic arms, multi-material 3D laser sinterers, and dedicated test arenas for autonomous ground and aerial vehicles.',
    badge: 'Industry 4.0 Lab'
  },
  {
    title: 'Academic Commons & Innovation Amphitheater',
    category: 'Student Life & Collaboration',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    description: 'High-speed fiber-backed open commons fostering interdisciplinary student hacking, venture incubation, and collegiate colloquia.',
    badge: 'Venture Sandbox'
  }
];

// ── Corporate Hiring Partners ────────────────────────────────────────────────
const RECRUITERS = [
  { name: 'Google', ctc: '48.5 LPA', role: 'Systems Software Engineer' },
  { name: 'Microsoft', ctc: '45.0 LPA', role: 'Cloud & AI Engineer' },
  { name: 'NVIDIA', ctc: '42.0 LPA', role: 'GPU Architecture Architect' },
  { name: 'Amazon', ctc: '40.0 LPA', role: 'Software Development Engineer' },
  { name: 'Texas Instruments', ctc: '34.0 LPA', role: 'Analog VLSI Designer' },
  { name: 'Goldman Sachs', ctc: '32.0 LPA', role: 'Quantitative Analyst' },
  { name: 'Qualcomm', ctc: '30.0 LPA', role: '5G Modem Software Engineer' },
  { name: 'Cisco Systems', ctc: '28.0 LPA', role: 'Network Security Architect' },
];

export const PublicLanding: React.FC<PublicLandingProps> = ({ onEnterPortal }) => {
  const { notices } = useErpData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programTab, setProgramTab] = useState<'all' | 'ug' | 'pg' | 'phd'>('all');
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);

  // Scroll detection for glassy navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reveal triggers
  const heroReveal = useReveal(0.05);
  const statsReveal = useReveal(0.15);
  const programsReveal = useReveal(0.1);
  const facilitiesReveal = useReveal(0.1);
  const placementReveal = useReveal(0.1);
  const admissionsReveal = useReveal(0.1);
  const noticesReveal = useReveal(0.1);

  // Live animated counters
  const cScholars = useCounter(3420, 1600, statsReveal.visible);
  const cPlacement = useCounter(97, 1400, statsReveal.visible);
  const cFaculty = useCounter(184, 1400, statsReveal.visible);
  const cRank = useCounter(12, 1200, statsReveal.visible);

  const filteredPrograms = programTab === 'all' 
    ? PROGRAMS 
    : PROGRAMS.filter(p => p.category === programTab);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-institutional-700 selection:text-white transition-colors">

      {/* ── 1. Top University Alert Bar ──────────────────────────────────── */}
      <div className="bg-institutional-950 text-slate-200 text-xs py-2 px-4 border-b border-institutional-900/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-semibold text-white">ADMISSIONS 2026–2027:</span>
            <span className="text-slate-300">Merit Counseling Round II commences October 25. Seat reservation portal active.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-amber-400" /> +91 80 2841 9000</span>
            <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-amber-400" /> admissions@chanakya.edu.in</span>
            <span className="font-semibold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60">
              NIRF Rank #12
            </span>
          </div>
        </div>
      </div>

      {/* ── 2. Glassmorphic Navigation Bar ──────────────────────────────── */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-md border-b border-slate-200 dark:border-slate-800'
          : 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* University Crest & Identity */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-institutional-700 to-institutional-950 border border-institutional-600 flex items-center justify-center text-white shadow-md shrink-0">
              <School className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold tracking-tight text-institutional-950 dark:text-white uppercase leading-none">
                  Chanakya Institute
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                  <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> NAAC A++ (Score 3.82)
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium tracking-wider uppercase mt-0.5">
                of Technology & Sciences • Established 1958
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 text-[13px] font-medium text-slate-700 dark:text-slate-300">
            <a href="#hero" className="px-3 py-2 rounded-lg hover:text-institutional-700 dark:hover:text-institutional-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors">Overview</a>
            <a href="#programs" className="px-3 py-2 rounded-lg hover:text-institutional-700 dark:hover:text-institutional-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors">Programs</a>
            <a href="#infrastructure" className="px-3 py-2 rounded-lg hover:text-institutional-700 dark:hover:text-institutional-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors">Research & Labs</a>
            <a href="#placements" className="px-3 py-2 rounded-lg hover:text-institutional-700 dark:hover:text-institutional-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors">Placements</a>
            <a href="#admissions" className="px-3 py-2 rounded-lg hover:text-institutional-700 dark:hover:text-institutional-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors">Admissions 2026</a>
            <a href="#notices" className="px-3 py-2 rounded-lg hover:text-institutional-700 dark:hover:text-institutional-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors">Gazette</a>
          </nav>

          {/* ERP Access Button & Role Switcher */}
          <div className="relative flex items-center gap-2">
            <button
              onClick={() => onEnterPortal('principal')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-institutional-600 hover:bg-institutional-700 active:bg-institutional-800 text-white text-xs sm:text-[13px] font-semibold transition-all duration-150 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <LogIn className="w-4 h-4" />
              <span>Access ERP Suite</span>
            </button>

            {/* Quick Persona Selector Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                title="Select Specific Portal Persona"
              >
                <ChevronDown className="w-4 h-4" />
              </button>

              {portalDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50">
                  <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Direct Persona Portals
                  </p>
                  {[
                    { role: 'principal' as UserRole, label: 'Director / Principal', desc: 'Executive Administration' },
                    { role: 'faculty' as UserRole, label: 'Faculty & Workload', desc: 'Academic Dean' },
                    { role: 'student' as UserRole, label: 'Student Scholar Portal', desc: 'Student Registry' },
                    { role: 'accountant' as UserRole, label: 'Treasury & CA', desc: 'Financial Bursar' },
                  ].map(item => (
                    <button
                      key={item.role}
                      onClick={() => {
                        setPortalDropdownOpen(false);
                        onEnterPortal(item.role);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex flex-col transition-colors"
                    >
                      <span className="text-xs font-semibold text-slate-800 dark:text-white">{item.label}</span>
                      <span className="text-[10px] text-slate-500">{item.desc}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-1"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-2">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">Overview</a>
            <a href="#programs" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">Programs</a>
            <a href="#infrastructure" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">Research & Labs</a>
            <a href="#placements" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">Placements</a>
            <a href="#admissions" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">Admissions 2026</a>
            <a href="#notices" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">Gazette</a>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => onEnterPortal('principal')}
                className="w-full py-2.5 rounded-xl bg-institutional-600 text-white font-semibold text-sm flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" /> Open ERP System
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ── 3. Ultra-Premium Hero Section with Collegiate Photography ─────── */}
      <section 
        id="hero"
        ref={heroReveal.ref}
        className="relative overflow-hidden pt-12 pb-24 lg:pt-16 lg:pb-32 bg-white dark:bg-slate-950"
      >
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] rounded-full bg-institutional-100/60 dark:bg-institutional-950/40 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[500px] h-[500px] rounded-full bg-amber-100/50 dark:bg-amber-950/30 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Content (7 columns) */}
            <div className="lg:col-span-7 space-y-6 opacity-100">
              
              {/* Accreditations Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-institutional-50 dark:bg-institutional-950/70 border border-institutional-200/80 dark:border-institutional-800/80 text-institutional-700 dark:text-institutional-300 text-xs font-semibold shadow-xs">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Autonomous University • Approved by AICTE • NIRF Top Ranked</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Pioneering <span className="text-institutional-600 dark:text-institutional-400">Knowledge</span>, Shaping Global Leaders.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl">
                For over six decades, Chanakya Institute has prepared innovators in technology, scientific discovery, and societal governance. Powered by unified digital enterprise governance and world-class laboratory centers.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onEnterPortal('principal')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-institutional-600 hover:bg-institutional-700 active:bg-institutional-800 text-white text-sm font-semibold transition-all duration-150 shadow-md hover:shadow-xl hover:-translate-y-0.5"
                >
                  <span>Launch ERP System</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#admissions"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100/70 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-all duration-150 shadow-xs"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Admissions 2026</span>
                </a>

                <a
                  href="#programs"
                  className="inline-flex items-center gap-1.5 px-4 py-3.5 text-slate-500 hover:text-institutional-600 dark:text-slate-400 dark:hover:text-institutional-300 text-sm font-medium transition-colors"
                >
                  <span>Explore Programs</span>
                  <ChevronDown className="w-4 h-4" />
                </a>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">3,420+</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Enrolled Scholars</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">96.8%</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Placement Record</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">₹48.5 L</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Highest CTC</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">1:18</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Faculty Ratio</p>
                </div>
              </div>
            </div>

            {/* Right Visual Showcase (5 columns) */}
            <div className="lg:col-span-5 relative opacity-100">
              
              {/* Outer Decorative Gradient Frame */}
              <div className="relative rounded-3xl p-2 bg-gradient-to-tr from-institutional-500/20 via-amber-500/10 to-institutional-500/20 border border-slate-200 dark:border-slate-800 shadow-2xl">
                
                {/* Real High-Resolution University Campus Photograph */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
                  <img
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
                    alt="Chanakya Institute Collegiate Campus and Quadrangle"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle Cinematic Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-institutional-950/80 via-transparent to-black/20" />

                  {/* Campus Tag on Image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md text-[11px] font-semibold tracking-wider uppercase mb-1">
                      Academic Quadrangle & Clock Tower
                    </span>
                    <p className="text-sm font-semibold drop-shadow-md">
                      65-Acre Smart Technological Campus, Bengaluru
                    </p>
                  </div>
                </div>

                {/* Floating Glassmorphism Badge 1: Admissions Live Status */}
                <div className="absolute -top-4 -left-4 sm:-left-6 p-3 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Admissions Open</p>
                    </div>
                    <p className="text-[10px] text-slate-500">AY 2026–27 Counseling Active</p>
                  </div>
                </div>

                {/* Floating Glassmorphism Badge 2: NIRF & NAAC Rating */}
                <div className="absolute -bottom-5 -right-3 sm:-right-5 p-3 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/80 text-amber-600 flex items-center justify-center shrink-0">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">NAAC Grade A++</p>
                    <p className="text-[10px] text-slate-500">NIRF National Rank #12</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. Government Accreditations & Recognitions Bar ────────────────── */}
      <section className="py-6 bg-slate-100/80 dark:bg-slate-900/70 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-4">
            Institutional Accreditations, Statutory Approvals & Consortium Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-80 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-institutional-600" /> AICTE Approved</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-amber-500" /> NAAC A++ (Score 3.82)</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> NBA Tier-1 Washington Accord</span>
            <span className="flex items-center gap-1.5"><Trophy className="w-4 h-4 text-sky-500" /> NIRF All-India Rank #12</span>
            <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-indigo-500" /> IEEE Academic Branch</span>
            <span className="flex items-center gap-1.5"><School className="w-4 h-4 text-slate-600" /> UGC Autonomous Status</span>
          </div>
        </div>
      </section>

      {/* ── 5. Live Metric Statistics Counters ─────────────────────────────── */}
      <section 
        ref={statsReveal.ref}
        className="py-14 bg-institutional-950 text-white border-y border-institutional-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            
            <div className={`transition-all duration-500 ${statsReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="text-3xl sm:text-5xl font-bold font-sans tracking-tight text-white">
                {cScholars.toLocaleString()}
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">Active Enrolled Scholars</p>
              <p className="text-[11px] text-emerald-400 mt-0.5">8 Engineering Departments</p>
            </div>

            <div className={`transition-all duration-500 delay-75 ${statsReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="text-3xl sm:text-5xl font-bold font-sans tracking-tight text-white">
                {cPlacement}%
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">Placement Success Rate</p>
              <p className="text-[11px] text-amber-400 mt-0.5">₹14.2 LPA Median CTC</p>
            </div>

            <div className={`transition-all duration-500 delay-150 ${statsReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="text-3xl sm:text-5xl font-bold font-sans tracking-tight text-white">
                {cFaculty}+
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">Full-Time Faculty Deans</p>
              <p className="text-[11px] text-sky-400 mt-0.5">84% Hold Ph.D. Credentials</p>
            </div>

            <div className={`transition-all duration-500 delay-200 ${statsReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="text-3xl sm:text-5xl font-bold font-sans tracking-tight text-white">
                #{cRank}
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">NIRF National Rank</p>
              <p className="text-[11px] text-amber-300 mt-0.5">Ministry of Education, Govt. of India</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── 6. Academic Degree Programs & Curriculum ───────────────────────── */}
      <section 
        id="programs"
        ref={programsReveal.ref}
        className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-institutional-600 dark:text-institutional-400">
              <BookOpen className="w-4 h-4" /> Academic Catalog
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-1">
              Degrees & Disciplines of Excellence
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              Curricula designed in synchrony with frontier industries, international universities, and statutory accreditation frameworks.
            </p>
          </div>

          {/* Program Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/70 dark:bg-slate-800/80 shrink-0">
            {[
              { id: 'all', label: 'All Programs' },
              { id: 'ug', label: 'Undergraduate' },
              { id: 'pg', label: 'Postgraduate' },
              { id: 'phd', label: 'Doctoral' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setProgramTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  programTab === tab.id
                    ? 'bg-white dark:bg-slate-900 text-institutional-700 dark:text-institutional-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map(p => (
            <div 
              key={p.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-institutional-50 dark:bg-institutional-950 text-institutional-700 dark:text-institutional-300 border border-institutional-200/70 dark:border-institutional-800">
                    {p.tag}
                  </span>
                  <span className="text-xs font-medium text-slate-400">{p.rating}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-3 leading-relaxed">
                  {p.description}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                  {p.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium text-slate-700 dark:text-slate-300">{p.seats} Annual Intake</span>
                <a
                  href="#admissions"
                  className="inline-flex items-center gap-1 text-institutional-600 dark:text-institutional-400 font-semibold hover:underline"
                >
                  <span>Curriculum Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. Research Centers & World-Class Facilities ───────────────────── */}
      <section 
        id="infrastructure"
        ref={facilitiesReveal.ref}
        className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-institutional-600 dark:text-institutional-400">
              Campus Infrastructure & Research Centers
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-1">
              Built for Groundbreaking Discovery
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Advanced laboratories, high-performance computing clusters, and modern libraries supporting doctoral research and engineering invention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FACILITIES.map((f, i) => (
              <div 
                key={i}
                className="group rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={f.image}
                    alt={f.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider uppercase">
                    {f.badge}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-institutional-600 dark:text-institutional-400 uppercase tracking-wider block mb-1">
                      {f.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                      {f.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Placement Excellence & Corporate Consortium ─────────────────── */}
      <section 
        id="placements"
        ref={placementReveal.ref}
        className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-institutional-600 dark:text-institutional-400">
              Career Consortium & Placements
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
              Direct Pathways into Global Tech Titans.
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Our placement center connects scholars with tier-1 technology conglomerates, research laboratories, and investment banks.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">₹48.5 LPA</p>
                <p className="text-xs text-slate-500 mt-0.5">Highest Package Offered</p>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">₹14.2 LPA</p>
                <p className="text-xs text-slate-500 mt-0.5">Median Package Overall</p>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">240+</p>
                <p className="text-xs text-slate-500 mt-0.5">Recruiting Companies</p>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">96.8%</p>
                <p className="text-xs text-slate-500 mt-0.5">Scholars Placed in 2026</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Top Corporate Recruiting Partners</h3>
                  <p className="text-xs text-slate-400">Class of 2026 Campus Placement Highlights</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200">
                  100% Verified Offers
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {RECRUITERS.map((r, i) => (
                  <div 
                    key={i}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{r.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">{r.role}</p>
                    </div>
                    <span className="text-xs font-semibold text-institutional-700 dark:text-institutional-300 font-mono">
                      {r.ctc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 9. Admissions 2026 Process & Application Roadmap ──────────────── */}
      <section 
        id="admissions"
        ref={admissionsReveal.ref}
        className="py-20 bg-slate-900 text-white border-y border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Admissions AY 2026–2027
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mt-1">
              Admission Process &amp; Merit Counseling
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Transparent, merit-driven enrollment across undergraduate engineering, postgraduate sciences, and doctoral fellowships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Online Application',
                timeline: 'August – October',
                desc: 'Submit Class 12 PCM scores, entrance exam rank (JEE Main / State CET), and program preferences online.'
              },
              {
                step: '02',
                title: 'Merit List Publication',
                timeline: 'October 15 – 22',
                desc: 'Category-wise cutoffs and merit ranks released transparently on the institute gazette portal.'
              },
              {
                step: '03',
                title: 'Seat Counseling',
                timeline: 'October 25 – 30',
                desc: 'Interactive seat allocation rounds with academic deans for branch allotment and scholarship evaluation.'
              },
              {
                step: '04',
                title: 'Enrollment & Welcome',
                timeline: 'November 2026',
                desc: 'Certificate verification at the academic registrar desk, fee confirmation, and scholar kit handover.'
              }
            ].map(item => (
              <div 
                key={item.step}
                className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/70 hover:border-amber-500/50 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold font-mono text-amber-400">{item.step}</span>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 bg-slate-700/60 px-2 py-0.5 rounded">
                      {item.timeline}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Help Banner */}
          <div className="mt-12 p-6 rounded-2xl bg-slate-800/40 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Admissions Helpline &amp; Counseling Desk</p>
                <p className="text-xs text-slate-400">+91 80 2841 9000 • admissions@chanakya.edu.in • Mon–Sat 9:00 AM – 5:30 PM</p>
              </div>
            </div>
            <a
              href="#notices"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5"
            >
              <span>Download Counseling Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── 10. Official University Gazette & Circulars ────────────────────── */}
      <section 
        id="notices"
        ref={noticesReveal.ref}
        className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-institutional-600 dark:text-institutional-400">
              University Gazette
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Official Circulars &amp; Senate Resolutions
            </h2>
          </div>
          <span className="text-xs font-semibold text-institutional-600 dark:text-institutional-400">
            Public Notifications Bulletin
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {notices.map(notice => (
            <div 
              key={notice.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-institutional-700 dark:text-institutional-400 font-semibold">
                    {notice.referenceNumber}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                    notice.priority === 'urgent'
                      ? 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {notice.category}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                  {notice.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {notice.content}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>By {notice.author}</span>
                <span className="font-mono">{notice.publishDate}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 11. Comprehensive Executive Institutional Footer ───────────────── */}
      <footer className="bg-institutional-950 text-slate-400 text-xs py-14 border-t border-institutional-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10 pb-10 border-b border-institutional-900">
            
            {/* Identity */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <School className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-white text-sm uppercase">Chanakya Institute</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Autonomous Premier Technical University • Approved by AICTE, Affiliated to State Technological Board.
              </p>
              <p className="text-[11px] text-slate-500 flex items-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>Knowledge Corridor, Tech City, Bengaluru – 560100, India</span>
              </p>
            </div>

            {/* Academic Disciplines */}
            <div>
              <p className="font-bold text-white mb-3 text-xs uppercase tracking-wider">Academic Faculties</p>
              <ul className="space-y-2 text-[11px]">
                <li><a href="#programs" className="hover:text-white transition-colors">Computer Science & Engineering</a></li>
                <li><a href="#programs" className="hover:text-white transition-colors">Artificial Intelligence & Data Science</a></li>
                <li><a href="#programs" className="hover:text-white transition-colors">Electronics & Communication</a></li>
                <li><a href="#programs" className="hover:text-white transition-colors">Mechanical & Automation Engineering</a></li>
                <li><a href="#programs" className="hover:text-white transition-colors">Doctoral Research Fellowships</a></li>
              </ul>
            </div>

            {/* ERP Portals */}
            <div>
              <p className="font-bold text-white mb-3 text-xs uppercase tracking-wider">ERP Portals</p>
              <ul className="space-y-2 text-[11px]">
                <li><button onClick={() => onEnterPortal('student')} className="hover:text-white transition-colors">Student Self-Service Portal</button></li>
                <li><button onClick={() => onEnterPortal('faculty')} className="hover:text-white transition-colors">Faculty Academic Registry</button></li>
                <li><button onClick={() => onEnterPortal('accountant')} className="hover:text-white transition-colors">Bursar & Treasury Gateway</button></li>
                <li><button onClick={() => onEnterPortal('principal')} className="hover:text-white transition-colors">Directorate & Senate Console</button></li>
                <li><button onClick={() => onEnterPortal('principal')} className="hover:text-white transition-colors">Security & System Health DevOps</button></li>
              </ul>
            </div>

            {/* Governance & Anti-Ragging */}
            <div>
              <p className="font-bold text-white mb-3 text-xs uppercase tracking-wider">Statutory Governance</p>
              <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                Internal Quality Assurance Cell (IQAC), Anti-Ragging Committee, Equal Opportunity Cell &amp; Student Grievance Redressal Board.
              </p>
              <button
                onClick={() => onEnterPortal('principal')}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Enter Campus ERP</span>
              </button>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} Chanakya Institute of Technology & Sciences. All statutory rights reserved.</p>
            <p className="font-mono">Enterprise ERP SIS Platform 2.4.0-Production</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
