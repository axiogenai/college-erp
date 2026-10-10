import React, { useState, useEffect, useRef } from 'react';
import { 
  School, Award, BookOpen, Users, Calendar, ArrowRight, 
  ShieldCheck, CheckCircle2, ChevronRight, ChevronLeft, FileText, Phone, 
  Mail, MapPin, ExternalLink, LogIn, Building2, 
  GraduationCap, Clock, HelpCircle, Layers, Compass,
  TrendingUp, Globe, Zap, BarChart3,
  Menu, X, Play, Pause, Search,
  Download, ArrowUpRight, Cpu, Microscope, Library,
  Trophy, Check, Star
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
// ── Degree Programs Catalog (With Full Academic Curriculum) ──────────────────
const PROGRAMS = [
  {
    id: 'btech-cse',
    category: 'ug' as const,
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
    labs: ['Nvidia CUDA GPU Supercomputing Lab', 'Distributed Cloud Systems Hub', 'High-Performance Systems Sandbox'],
    semesters: [
      {
        sem: 'Semester 1 & 2 (Foundation)',
        courses: [
          { code: 'CS101', title: 'Calculus & Linear Algebra for Computing', credits: 4, type: 'Core' },
          { code: 'CS102', title: 'Data Structures & Algorithmic Analysis', credits: 4, type: 'Core' },
          { code: 'CS103', title: 'Digital Logic & Computer Architecture', credits: 4, type: 'Core' },
          { code: 'CS104L', title: 'Object-Oriented Systems & C++ Practicum', credits: 2, type: 'Lab' },
        ]
      },
      {
        sem: 'Semester 3 & 4 (Systems Core)',
        courses: [
          { code: 'CS201', title: 'Operating Systems & Kernel Architecture', credits: 4, type: 'Core' },
          { code: 'CS202', title: 'Database Management Systems & NoSQL', credits: 4, type: 'Core' },
          { code: 'CS203', title: 'Theory of Computation & Automata', credits: 3, type: 'Core' },
          { code: 'CS204L', title: 'UNIX Kernel & Network Programming Lab', credits: 2, type: 'Lab' },
        ]
      },
      {
        sem: 'Semester 5 & 6 (Specialization)',
        courses: [
          { code: 'CS301', title: 'Distributed Systems & Microservices', credits: 4, type: 'Specialization' },
          { code: 'CS302', title: 'Computer Networks & Zero-Trust Security', credits: 4, type: 'Core' },
          { code: 'CS303', title: 'Machine Learning & Neural Architectures', credits: 3, type: 'Specialization' },
          { code: 'CS304L', title: 'Cloud Infrastructure & Kubernetes Lab', credits: 2, type: 'Lab' },
        ]
      },
      {
        sem: 'Semester 7 & 8 (Capstone & Internship)',
        courses: [
          { code: 'CS401', title: 'High-Performance Parallel Computing', credits: 3, type: 'Core' },
          { code: 'CS402', title: 'Quantum Computation Foundations', credits: 3, type: 'Elective' },
          { code: 'CS499', title: 'Senate Undergraduate Capstone Thesis', credits: 6, type: 'Project' },
          { code: 'CS498', title: 'Full-Semester Corporate Industry Practicum', credits: 6, type: 'Internship' },
        ]
      }
    ]
  },
  {
    id: 'btech-ai',
    category: 'ug' as const,
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
    labs: ['Cognitive Robotics Lab', 'Neuromorphic Computing Suite', 'Foundation Models Cluster'],
    semesters: [
      {
        sem: 'Semester 1 & 2 (Mathematical Rigor)',
        courses: [
          { code: 'AI101', title: 'Multivariable Calculus & Optimization', credits: 4, type: 'Core' },
          { code: 'AI102', title: 'Probability & Stochastic Methods in AI', credits: 4, type: 'Core' },
          { code: 'AI103', title: 'Python for Scientific Computing & Data Structures', credits: 4, type: 'Core' },
          { code: 'AI104L', title: 'Data Wrangling & Statistical Simulation Lab', credits: 2, type: 'Lab' },
        ]
      },
      {
        sem: 'Semester 3 & 4 (Machine Intelligence)',
        courses: [
          { code: 'AI201', title: 'Pattern Recognition & Classical Machine Learning', credits: 4, type: 'Core' },
          { code: 'AI202', title: 'Deep Learning & Neural Network Architectures', credits: 4, type: 'Core' },
          { code: 'AI203', title: 'Computer Vision & Convolutional Models', credits: 3, type: 'Specialization' },
          { code: 'AI204L', title: 'PyTorch & GPU Acceleration Practicum', credits: 2, type: 'Lab' },
        ]
      },
      {
        sem: 'Semester 5 & 6 (Frontier AI)',
        courses: [
          { code: 'AI301', title: 'Natural Language Processing & Transformers', credits: 4, type: 'Specialization' },
          { code: 'AI302', title: 'Reinforcement Learning & Decision Systems', credits: 3, type: 'Specialization' },
          { code: 'AI303', title: 'Edge Computing & Embedded Model Quantization', credits: 3, type: 'Core' },
          { code: 'AI304L', title: 'LLM Fine-Tuning & MLOps Infrastructure Lab', credits: 2, type: 'Lab' },
        ]
      },
      {
        sem: 'Semester 7 & 8 (Enterprise Application)',
        courses: [
          { code: 'AI401', title: 'AI Ethics, Safety & Alignment Governance', credits: 3, type: 'Core' },
          { code: 'AI402', title: 'Autonomous Driving Perception Systems', credits: 3, type: 'Elective' },
          { code: 'AI499', title: 'Autonomous AI Capstone Project', credits: 6, type: 'Project' },
          { code: 'AI498', title: 'Enterprise Corporate AI Fellowship', credits: 6, type: 'Internship' },
        ]
      }
    ]
  },
  {
    id: 'btech-ece',
    category: 'ug' as const,
    title: 'B.Tech in Electronics & Communication',
    degree: 'Bachelor of Technology (Honours)',
    duration: '4 Years (8 Semesters)',
    seats: 120,
    rating: 'IEEE & AICTE Approved',
    creditsTotal: 160,
    eligibility: 'Minimum 70% in 10+2 with Physics, Mathematics, and Chemistry + JEE/CET ranking.',
    careerPaths: ['Silicon VLSI Design Engineer', '5G/6G RF Systems Architect', 'Embedded Firmware Engineer', 'Hardware Security Specialist'],
    description: 'World-class silicon VLSI simulation suites, microwave RF antenna laboratories, and next-generation IoT sensor architectures.',
    highlights: ['Cadence & Synopsys EDA Suite', '5G RF Microwave Testing Center', 'Silicon Fab Lab Collaboration'],
    tag: 'Hardware & Silicon',
    labs: ['Cadence EDA Design Lab', 'Anechoic Microwave Antenna Chamber', 'FPGA Prototyping Cleanroom'],
    semesters: [
      {
        sem: 'Semester 1 & 2 (Circuits & Fields)',
        courses: [
          { code: 'EC101', title: 'Circuit Analysis & Network Synthesis', credits: 4, type: 'Core' },
          { code: 'EC102', title: 'Semiconductor Physics & Solid State Devices', credits: 4, type: 'Core' },
          { code: 'EC103', title: 'Engineering Electromagnetics', credits: 3, type: 'Core' },
          { code: 'EC104L', title: 'Analog Circuits & Oscilloscope Lab', credits: 2, type: 'Lab' },
        ]
      },
      {
        sem: 'Semester 3 & 4 (Signal & Silicon)',
        courses: [
          { code: 'EC201', title: 'Digital Signal Processing (DSP)', credits: 4, type: 'Core' },
          { code: 'EC202', title: 'Microcontroller Architectures & Embedded C', credits: 4, type: 'Core' },
          { code: 'EC203', title: 'CMOS Analog Integrated Circuit Design', credits: 4, type: 'Specialization' },
          { code: 'EC204L', title: 'Verilog HDL & FPGA Synthesis Lab', credits: 2, type: 'Lab' },
        ]
      },
      {
        sem: 'Semester 5 & 6 (Communications & VLSI)',
        courses: [
          { code: 'EC301', title: 'VLSI System Design (Cadence EDA)', credits: 4, type: 'Specialization' },
          { code: 'EC302', title: '5G Mobile Wireless Communications & MIMO', credits: 4, type: 'Specialization' },
          { code: 'EC303', title: 'Microwave & Radar Engineering', credits: 3, type: 'Core' },
          { code: 'EC304L', title: 'Silicon Layout & DRC/LVS Verification Lab', credits: 2, type: 'Lab' },
        ]
      },
      {
        sem: 'Semester 7 & 8 (Silicon Tapeout)',
        courses: [
          { code: 'EC401', title: 'Hardware Security & Cryptographic Accelerators', credits: 3, type: 'Core' },
          { code: 'EC402', title: 'Optical & Satellite Communication Networks', credits: 3, type: 'Elective' },
          { code: 'EC499', title: 'Mixed-Signal Silicon Capstone Design', credits: 6, type: 'Project' },
          { code: 'EC498', title: 'Semiconductor Foundry / Corporate Internship', credits: 6, type: 'Internship' },
        ]
      }
    ]
  },
  {
    id: 'btech-me',
    category: 'ug' as const,
    title: 'B.Tech in Mechanical & Automation Engineering',
    degree: 'Bachelor of Technology (Honours)',
    duration: '4 Years (8 Semesters)',
    seats: 60,
    rating: 'Autonomous Industry 4.0 Track',
    creditsTotal: 160,
    eligibility: 'Minimum 70% in 10+2 (PCM) + Valid State or National Engineering Entrance Exam.',
    careerPaths: ['Robotics & Automation Specialist', 'EV Powertrain Engineer', 'Aerospace Aerodynamicist', 'Smart Factory Operations Lead'],
    description: 'Fusion of classical thermodynamics and fluid dynamics with modern industrial robotics, additive CNC manufacturing, and mechatronics.',
    highlights: ['Subsonic Aerodynamic Wind Tunnel', 'Kuka Industrial Robotics Studio', 'Electric Vehicle Prototyping Bay'],
    tag: 'Industry 4.0',
    labs: ['Industrial Robotics & Kinematics Studio', 'Aerodynamics Wind Tunnel Testing Bay', 'EV Battery & Powertrain Lab'],
    semesters: [
      {
        sem: 'Semester 1 & 2 (Mechanics Foundations)',
        courses: [
          { code: 'ME101', title: 'Engineering Mechanics & Statics', credits: 4, type: 'Core' },
          { code: 'ME102', title: 'Materials Science & Metallurgy', credits: 3, type: 'Core' },
          { code: 'ME103', title: 'Computer Aided Engineering Graphics (CAD)', credits: 3, type: 'Core' },
          { code: 'ME104L', title: 'Precision Machining & Fabrication Lab', credits: 2, type: 'Lab' },
        ]
      },
      {
        sem: 'Semester 3 & 4 (Thermo-Fluids & Dynamics)',
        courses: [
          { code: 'ME201', title: 'Thermodynamics & Heat Transfer', credits: 4, type: 'Core' },
          { code: 'ME202', title: 'Fluid Mechanics & Computational CFD', credits: 4, type: 'Core' },
          { code: 'ME203', title: 'Kinematics & Dynamics of Machinery', credits: 4, type: 'Core' },
          { code: 'ME204L', title: 'Robotics Actuators & Mechatronics Lab', credits: 2, type: 'Lab' },
        ]
      },
      {
        sem: 'Semester 5 & 6 (Automation & Mechatronics)',
        courses: [
          { code: 'ME301', title: 'Industrial Robotics & PLC Automation', credits: 4, type: 'Specialization' },
          { code: 'ME302', title: 'Additive Manufacturing & Rapid Prototyping', credits: 3, type: 'Specialization' },
          { code: 'ME303', title: 'Electric Vehicle Powertrain Dynamics', credits: 4, type: 'Specialization' },
          { code: 'ME304L', title: 'Wind Tunnel Testing & Aerodynamics Lab', credits: 2, type: 'Lab' },
        ]
      },
      {
        sem: 'Semester 7 & 8 (Smart Systems Capstone)',
        courses: [
          { code: 'ME401', title: 'Smart Factory & Cyber-Physical Production', credits: 3, type: 'Core' },
          { code: 'ME402', title: 'Renewable Thermal Energy Systems', credits: 3, type: 'Elective' },
          { code: 'ME499', title: 'Autonomous Robotics / EV Capstone Project', credits: 6, type: 'Project' },
          { code: 'ME498', title: 'Automotive / Aerospace Corporate Internship', credits: 6, type: 'Internship' },
        ]
      }
    ]
  },
  {
    id: 'mtech-cs',
    category: 'pg' as const,
    title: 'M.Tech in Advanced Computing & Cyber Defense',
    degree: 'Master of Technology',
    duration: '2 Years (4 Semesters)',
    seats: 40,
    rating: 'Postgraduate Research Degree',
    creditsTotal: 72,
    eligibility: 'B.Tech/B.E. in CSE, IT or ECE with minimum 60% aggregate + Valid GATE score in CS/IT.',
    careerPaths: ['Principal Security Architect', 'Distributed Systems Researcher', 'Enterprise Cryptographer', 'Doctoral Research Fellow'],
    description: 'Advanced postgraduate research degree focusing on zero-trust architectures, fault-tolerant distributed consensus, and post-quantum cryptography.',
    highlights: ['Funded University Research Stipend', 'Mandatory IEEE/ACM Conference Publication', 'Foreign University Exchange Option'],
    tag: 'Research Focus',
    labs: ['Cyber Defense Red/Blue Team Sandbox', 'Cryptographic Protocol Verification Lab'],
    semesters: [
      {
        sem: 'Semester 1 (Advanced Systems)',
        courses: [
          { code: 'CS501', title: 'Advanced Algorithms & Complexity Analysis', credits: 4, type: 'Core' },
          { code: 'CS502', title: 'Zero-Trust Enterprise Architectures', credits: 4, type: 'Core' },
          { code: 'CS503', title: 'Post-Quantum Cryptographic Protocols', credits: 4, type: 'Core' },
          { code: 'CS504L', title: 'Offensive Security & Red Teaming Lab', credits: 2, type: 'Lab' },
        ]
      },
      {
        sem: 'Semester 2 (Applied Security Research)',
        courses: [
          { code: 'CS601', title: 'Distributed Consensus & Blockchain Security', credits: 4, type: 'Core' },
          { code: 'CS602', title: 'Cloud-Native Threat Intelligence & DevSecOps', credits: 4, type: 'Core' },
          { code: 'CS603', title: 'Scientific Research Methodology & Writing', credits: 2, type: 'Core' },
          { code: 'CS604L', title: 'Advanced Malware Reverse Engineering Lab', credits: 2, type: 'Lab' },
        ]
      },
      {
        sem: 'Semester 3 & 4 (Dissertation & Thesis)',
        courses: [
          { code: 'CS698', title: 'Master\'s Research Dissertation Phase I', credits: 12, type: 'Thesis' },
          { code: 'CS699', title: 'Master\'s Dissertation Phase II & Defense', credits: 16, type: 'Thesis' },
        ]
      }
    ]
  },
  {
    id: 'phd-eng',
    category: 'phd' as const,
    title: 'Doctor of Philosophy (Ph.D.) in Engineering Sciences',
    degree: 'Doctoral Research Fellowship',
    duration: '3–5 Years (Full-time)',
    seats: 25,
    rating: 'UGC-Recognized Doctoral Fellowship',
    creditsTotal: 36,
    eligibility: 'Master\'s degree in Engineering/Technology with min. 65% + UGC-NET / GATE / Institute Research Entrance.',
    careerPaths: ['University Professor & Chair', 'Corporate Chief Research Scientist', 'National Laboratory Fellow', 'R&D Directorate Executive'],
    description: 'Premier doctoral fellowship providing full tuition remission, ₹38,000 monthly living stipend, international conference travel grants, and dedicated research chairs.',
    highlights: ['₹38,000 Monthly Research Stipend', 'Interdisciplinary Senate Advisory Committee', '100% Funded Global Conference Travel'],
    tag: 'Doctoral Track',
    labs: ['Central High-Performance Supercomputing Facility', 'Interdisciplinary Nanotechnology Cleanroom'],
    semesters: [
      {
        sem: 'Year 1 (Doctoral Coursework & Qualifying Exam)',
        courses: [
          { code: 'PHD101', title: 'Advanced Research Methodologies & Quantitative Modeling', credits: 4, type: 'Core' },
          { code: 'PHD102', title: 'Research & Publication Ethics (RPE - UGC Mandatory)', credits: 2, type: 'Core' },
          { code: 'PHD103', title: 'Domain Depth Advanced Specialization Seminar', credits: 4, type: 'Core' },
          { code: 'PHD104', title: 'Doctoral Comprehensive Qualifying Examination (Oral & Written)', credits: 4, type: 'Exam' },
        ]
      },
      {
        sem: 'Year 2 & 3 (Empirical Investigation & Literature Review)',
        courses: [
          { code: 'PHD201', title: 'State-of-the-Art Literature Review & Proposal Defense', credits: 6, type: 'Milestone' },
          { code: 'PHD202', title: 'Empirical Laboratory Experiments & Theoretical Analysis', credits: 8, type: 'Research' },
          { code: 'PHD203', title: 'SCI / Scopus Indexed High-Impact Journal Papers (Min 2 Required)', credits: 8, type: 'Publication' },
        ]
      },
      {
        sem: 'Year 4+ (Dissertation Defense & Public Viva)',
        courses: [
          { code: 'PHD301', title: 'Pre-Synoptic Colloquium Presentation to Doctoral Senate', credits: 4, type: 'Milestone' },
          { code: 'PHD399', title: 'Final Doctoral Dissertation & Open Public Viva-Voce Examination', credits: 16, type: 'Defense' },
        ]
      }
    ]
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

// ── Official University Gazette Bulletins (Classic Rounding Ticker) ──────────
const UNIVERSITY_BULLETINS = [
  { tag: 'Admissions 2026', text: 'Merit Counseling Round II commences October 25. Online seat reservation active.', link: '#admissions' },
  { tag: 'National Standing', text: 'Ranked #12 Nationwide by NIRF 2025 • Re-accredited NAAC A++ with 3.82 CGPA.', link: '#programs' },
  { tag: 'Campus Recruitment', text: 'Phase 1 Placements achieve 96.8% placement with ₹48.5 LPA apex package.', link: '#placements' },
  { tag: 'Autonomous Research', text: 'R&D Labs secure ₹24.8 Cr funding for High-Performance Computing & AI.', link: '#infrastructure' },
];

// ── University Rotating Values for Animated Hero ───────────────────────────
const HERO_ROTATING_WORDS = [
  'Autonomous Excellence',
  'Scientific Discovery',
  'Global Innovation',
  'Engineering Leadership'
];

// ── Official University Heraldic Seal & Crest ─────────────────────────────
export function UniversityCrest({ className = "w-11 h-11" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      aria-label="Chanakya Institute University Crest"
    >
      {/* Outer Solid Double Rings */}
      <circle cx="32" cy="32" r="30.5" stroke="#C5A059" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="28" fill="#0A1128" stroke="#C5A059" strokeWidth="0.75" />

      {/* Decorative Fine Inner Ring */}
      <circle cx="32" cy="32" r="26" stroke="#926B27" strokeWidth="0.5" strokeDasharray="1.5 1.5" />

      {/* Central Heraldic Shield */}
      <path 
        d="M20 18 H44 V34 C44 42.5 32 49 32 49 C32 49 20 42.5 20 34 Z" 
        fill="#070D1E" 
        stroke="#C5A059" 
        strokeWidth="1.2" 
      />

      {/* Chief Division Bar */}
      <line x1="20" y1="27" x2="44" y2="27" stroke="#C5A059" strokeWidth="0.8" />

      {/* Neoclassical Pediment (Academic Architecture) */}
      <polygon points="32,20.5 24,23.5 40,23.5" fill="#C5A059" />
      <rect x="24.5" y="23.7" width="15" height="0.6" fill="#C5A059" />
      <rect x="25.5" y="24.5" width="1" height="2.2" rx="0.2" fill="#E6C875" />
      <rect x="29.5" y="24.5" width="1" height="2.2" rx="0.2" fill="#E6C875" />
      <rect x="33.5" y="24.5" width="1" height="2.2" rx="0.2" fill="#E6C875" />
      <rect x="37.5" y="24.5" width="1" height="2.2" rx="0.2" fill="#E6C875" />

      {/* Open Codex Book (Lower Field) */}
      <path 
        d="M31.2 30 C27.5 29 24.5 30 23.5 31.2 V38 C24.5 36.8 27.5 36 31.2 37 Z" 
        fill="#E6C875" 
      />
      <path 
        d="M32.8 30 C36.5 29 39.5 30 40.5 31.2 V38 C39.5 36.8 36.5 36 32.8 37 Z" 
        fill="#E6C875" 
      />
      <line x1="32" y1="29.5" x2="32" y2="39" stroke="#070D1E" strokeWidth="0.8" />
      <line x1="25.5" y1="32.5" x2="29.5" y2="32" stroke="#070D1E" strokeWidth="0.5" opacity="0.6" />
      <line x1="25.5" y1="34.5" x2="29.5" y2="34" stroke="#070D1E" strokeWidth="0.5" opacity="0.6" />
      <line x1="34.5" y1="32" x2="38.5" y2="32.5" stroke="#070D1E" strokeWidth="0.5" opacity="0.6" />
      <line x1="34.5" y1="34" x2="38.5" y2="34.5" stroke="#070D1E" strokeWidth="0.5" opacity="0.6" />

      {/* Classical Academic Torch */}
      <path 
        d="M32 9 C33.2 11 33.6 12.2 33 13.2 C32.5 14 31.5 14.5 32 15.5 C32 15.5 32.5 14 31 13 C30.2 12.2 30.5 11 32 9 Z" 
        fill="#F59E0B" 
      />
      <rect x="31.2" y="14.5" width="1.6" height="3" rx="0.4" fill="#C5A059" />

      {/* Symmetrical Laurel Branches */}
      <path d="M16 35 C15.5 28 17.5 22 20 18" fill="none" stroke="#C5A059" strokeWidth="0.8" strokeLinecap="round" />
      <ellipse cx="16" cy="30" rx="1.4" ry="0.8" transform="rotate(-35 16 30)" fill="#C5A059" />
      <ellipse cx="17.2" cy="25" rx="1.4" ry="0.8" transform="rotate(-45 17.2 25)" fill="#C5A059" />
      <ellipse cx="19" cy="20.5" rx="1.4" ry="0.8" transform="rotate(-55 19 20.5)" fill="#C5A059" />

      <path d="M48 35 C48.5 28 46.5 22 44 18" fill="none" stroke="#C5A059" strokeWidth="0.8" strokeLinecap="round" />
      <ellipse cx="48" cy="30" rx="1.4" ry="0.8" transform="rotate(35 48 30)" fill="#C5A059" />
      <ellipse cx="46.8" cy="25" rx="1.4" ry="0.8" transform="rotate(45 46.8 25)" fill="#C5A059" />
      <ellipse cx="45" cy="20.5" rx="1.4" ry="0.8" transform="rotate(55 45 20.5)" fill="#C5A059" />

      {/* Foundation Ribbon */}
      <path 
        d="M21 50 C27 48.5 37 48.5 43 50 C41.5 53 37 54 32 54 C27 54 22.5 53 21 50 Z" 
        fill="#070D1E" 
        stroke="#C5A059" 
        strokeWidth="0.8" 
      />
      <text 
        x="32" 
        y="52.6" 
        textAnchor="middle" 
        fill="#E6C875" 
        fontSize="3.2" 
        fontWeight="bold" 
        fontFamily="serif" 
        letterSpacing="0.8"
      >
        EST. 1958
      </text>
    </svg>
  );
}

export const PublicLanding: React.FC<PublicLandingProps> = ({ onEnterPortal }) => {
  const { notices } = useErpData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programTab, setProgramTab] = useState<'all' | 'ug' | 'pg' | 'phd'>('all');
  const [bulletinIndex, setBulletinIndex] = useState(0);
  const [bulletinVisible, setBulletinVisible] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState<typeof PROGRAMS[0] | null>(null);
  const [curriculumTab, setCurriculumTab] = useState<'syllabus' | 'eligibility' | 'labs'>('syllabus');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Smooth Rotating Hero Word State
  const [heroWordIndex, setHeroWordIndex] = useState(0);
  const [heroWordVisible, setHeroWordVisible] = useState(true);

  // Hero word rotation interval
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroWordVisible(false);
      setTimeout(() => {
        setHeroWordIndex((prev) => (prev + 1) % HERO_ROTATING_WORDS.length);
        setHeroWordVisible(true);
      }, 350);
    }, 3600);
    return () => clearInterval(timer);
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProgram(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Classic Rounding Bulletin Ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setBulletinVisible(false);
      setTimeout(() => {
        setBulletinIndex((prev) => (prev + 1) % UNIVERSITY_BULLETINS.length);
        setBulletinVisible(true);
      }, 300);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Scroll detection for glassy navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reveal triggers
  const heroReveal = useReveal(0.05);
  const programsReveal = useReveal(0.1);
  const facilitiesReveal = useReveal(0.1);
  const placementReveal = useReveal(0.1);
  const admissionsReveal = useReveal(0.1);
  const noticesReveal = useReveal(0.1);

  const filteredPrograms = programTab === 'all' 
    ? PROGRAMS 
    : PROGRAMS.filter(p => p.category === programTab);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-institutional-700 selection:text-white transition-colors">

      {/* ── 1. Classic Institutional Bulletin Ticker Bar ──────────────────── */}
      <div className="bg-slate-950 text-slate-200 text-xs py-2 px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
          
          {/* Official University Gazette Bulletin */}
          <div className="flex items-center gap-3 overflow-hidden w-full md:w-auto">
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-bold tracking-wider uppercase text-amber-400">
                Official Gazette
              </span>
              <span className="text-white/30">•</span>
            </div>

            {/* Smooth Rolling / Rotating Bulletin Content */}
            <div className="relative h-5 overflow-hidden flex-1 sm:min-w-[420px]">
              <div 
                className={`flex items-center gap-2 transition-all duration-300 ease-out transform ${
                  bulletinVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}
              >
                <span className="font-semibold text-white uppercase text-[11px] tracking-wide shrink-0">
                  {UNIVERSITY_BULLETINS[bulletinIndex].tag}:
                </span>
                <span className="text-slate-300 text-xs truncate">
                  {UNIVERSITY_BULLETINS[bulletinIndex].text}
                </span>
              </div>
            </div>

            {/* Subtle Rounding Carousel Controls & Progress Dots */}
            <div className="hidden sm:flex items-center gap-1.5 shrink-0 pl-1">
              <button 
                onClick={() => {
                  setBulletinVisible(false);
                  setTimeout(() => {
                    setBulletinIndex((prev) => (prev - 1 + UNIVERSITY_BULLETINS.length) % UNIVERSITY_BULLETINS.length);
                    setBulletinVisible(true);
                  }, 150);
                }}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Previous Bulletin"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>

              <div className="flex items-center gap-1">
                {UNIVERSITY_BULLETINS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setBulletinVisible(false);
                      setTimeout(() => {
                        setBulletinIndex(idx);
                        setBulletinVisible(true);
                      }, 150);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === bulletinIndex ? 'bg-amber-400 w-3' : 'bg-slate-700 hover:bg-slate-500 w-1.5'
                    }`}
                    aria-label={`Go to bulletin ${idx + 1}`}
                  />
                ))}
              </div>

              <button 
                onClick={() => {
                  setBulletinVisible(false);
                  setTimeout(() => {
                    setBulletinIndex((prev) => (prev + 1) % UNIVERSITY_BULLETINS.length);
                    setBulletinVisible(true);
                  }, 150);
                }}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Next Bulletin"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right Side: Dignified Institutional Contact & Accreditation */}
          <div className="flex items-center gap-4 text-[11px] text-slate-400 shrink-0">
            <a href="tel:+918028419000" className="hidden lg:flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3 h-3 text-amber-400" />
              <span>+91 80 2841 9000</span>
            </a>
            <a href="mailto:admissions@chanakya.edu.in" className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3 h-3 text-amber-400" />
              <span>admissions@chanakya.edu.in</span>
            </a>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/90 text-[11px] font-medium shadow-sm">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>NIRF #12 • NAAC A++</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── 2. Glassmorphic Navigation Bar ──────────────────────────────── */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-md border-b border-slate-200 dark:border-slate-800'
          : 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* University Crest & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 drop-shadow-sm">
              <UniversityCrest className="w-9 h-9 sm:w-10 sm:h-10" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold tracking-tight text-institutional-950 dark:text-white uppercase leading-none">
                  Chanakya Institute
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-[#18181C] text-neutral-800 dark:text-[#EDEDEF] border border-neutral-200 dark:border-white/[0.08]">
                  <Award className="w-3 h-3 text-[#C5A059]" /> NAAC A++ (Score 3.82)
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase mt-0.5">
                of Technology & Sciences • Established 1958
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 text-[13px] font-medium text-slate-700 dark:text-slate-300">
            <a href="#hero" className="px-3 py-1.5 rounded-lg hover:text-institutional-700 dark:hover:text-institutional-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors">Overview</a>
            <a href="#programs" className="px-3 py-1.5 rounded-lg hover:text-institutional-700 dark:hover:text-institutional-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors">Programs</a>
            <a href="#infrastructure" className="px-3 py-1.5 rounded-lg hover:text-institutional-700 dark:hover:text-institutional-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors">Research & Labs</a>
            <a href="#placements" className="px-3 py-1.5 rounded-lg hover:text-institutional-700 dark:hover:text-institutional-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors">Placements</a>
            <a href="#admissions" className="px-3 py-1.5 rounded-lg hover:text-institutional-700 dark:hover:text-institutional-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors">Admissions 2026</a>
            <a href="#notices" className="px-3 py-1.5 rounded-lg hover:text-institutional-700 dark:hover:text-institutional-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors">Gazette</a>
          </nav>

          {/* Mobile menu toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
          </div>
        )}
      </header>

      {/* ── 3. Ultra-Premium Collegiate Background Hero Section ─────── */}
      <section 
        id="hero"
        className="relative min-h-[380px] sm:min-h-[440px] md:min-h-[480px] h-[calc(100vh-6rem)] max-h-[660px] flex items-center justify-center overflow-hidden bg-slate-950 text-white px-4 py-4 sm:py-6"
      >
        {/* Full-Bleed Background Image (Clear, Vivid, High-Resolution Campus Photography) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000&q=90"
            alt="Chanakya Institute Collegiate Campus Quadrangle"
            className="w-full h-full object-cover object-center filter brightness-[0.70] contrast-[1.08]"
          />
          {/* Balanced Contrast Scrim for Flawless Readability Across Entire Viewport */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/35" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/20 to-slate-950/60 pointer-events-none" />
        </div>

        {/* Hero Content (Dead-Center Alignment Across All Screen Viewports) */}
        <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
          <div className="space-y-3.5 sm:space-y-4">
            
            {/* Dignified Classical Collegiate Overline */}
            <div className="animate-hero-1 flex items-center justify-center gap-2 sm:gap-3 text-slate-300">
              <span className="w-6 sm:w-12 h-px bg-white/30" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-slate-200 font-sans">
                Autonomous Technical University • Established 1958
              </span>
              <span className="w-6 sm:w-12 h-px bg-white/30" />
            </div>

            {/* Main Headline (Pure White, Perfectly Balanced & Sized) */}
            <h1 className="animate-hero-2 text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-tight max-w-3xl mx-auto">
              Where Intellectual Rigor Meets{' '}
              <span
                className={`inline-block text-white transition-opacity duration-300 ease-in-out ${
                  heroWordVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {HERO_ROTATING_WORDS[heroWordIndex]}.
              </span>
            </h1>

            {/* Subtitle (Crisp, High-Legibility & Compact) */}
            <p className="animate-hero-3 text-xs sm:text-sm md:text-base text-slate-200/90 leading-relaxed font-normal max-w-2xl mx-auto">
              Preparing innovators in technology, scientific discovery, and societal governance across 8 specialized academic faculties and enterprise research centers.
            </p>

            {/* Action Buttons (Flat Dashboard Style, Zero Glow) */}
            <div className="animate-hero-4 flex flex-wrap items-center justify-center gap-3 pt-1">
              <a
                href="#admissions"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-lg bg-institutional-600 hover:bg-institutional-700 active:bg-institutional-800 text-white text-xs sm:text-sm font-semibold transition-colors shadow-none"
              >
                <GraduationCap className="w-4 h-4 text-white" />
                <span>Admissions 2026 Portal</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </a>

              <a
                href="#programs"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold border border-slate-700 transition-colors shadow-none"
              >
                <BookOpen className="w-4 h-4 text-white" />
                <span>Explore Academic Programs</span>
              </a>
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
                    ? 'bg-white dark:bg-slate-900 text-institutional-700 dark:text-institutional-300 border border-slate-200/80 dark:border-slate-700/80'
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
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-institutional-50 dark:bg-institutional-950 text-institutional-700 dark:text-institutional-300 border border-institutional-200/80 dark:border-institutional-800">
                    {p.tag}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {p.rating}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 leading-snug group-hover:text-institutional-600 dark:group-hover:text-institutional-400 transition-colors">
                  {p.title}
                </h3>
                <p className="text-[11px] font-medium text-institutional-600 dark:text-institutional-400 mb-2.5">
                  {p.degree} • {p.duration}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 leading-relaxed">
                  {p.description}
                </p>

                <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800 mb-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Key Specializations</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.highlights.map((h, i) => (
                      <span key={i} className="inline-flex items-center text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="text-[11px]">
                  <span className="font-bold text-slate-900 dark:text-white">{p.seats} Seats</span>
                  <span className="text-slate-400 ml-1">• {p.creditsTotal} Cr</span>
                </div>
                <button
                  onClick={() => setSelectedProgram(p)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-xs font-semibold transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Curriculum Details</span>
                </button>
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
        className="py-20 bg-[#EEF2F6] dark:bg-[#0B132B] border-y border-slate-300/70 dark:border-slate-800 transition-colors"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-institutional-600 dark:text-institutional-400">
              Career Consortium & Placements
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-1">
              Direct Pathways into Global Tech Titans
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Connecting scholars with Fortune 500 conglomerates, research laboratories, and investment banking trading desks across India and global technology capitals.
            </p>
          </div>

        {/* Executive 4-Metric Placement Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Apex Package Offered</span>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">₹48.5 <span className="text-sm font-semibold text-institutional-600 dark:text-institutional-400">LPA</span></p>
            <p className="text-[11px] text-slate-500 mt-0.5">Google Systems Software</p>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Median Annual CTC</span>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">₹14.2 <span className="text-sm font-semibold text-institutional-600 dark:text-institutional-400">LPA</span></p>
            <p className="text-[11px] text-slate-500 mt-0.5">Overall Batch Average</p>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Recruiter Consortium</span>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">240<span className="text-slate-400 font-light">+</span></p>
            <p className="text-[11px] text-slate-500 mt-0.5">Global Tier-1 Corporations</p>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Placement Success Rate</span>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">96.8<span className="text-emerald-500 font-light">%</span></p>
            <p className="text-[11px] text-slate-500 mt-0.5">Class of 2026 Verified</p>
          </div>
        </div>

        {/* Corporate Recruiting Partners Grid */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6 gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Premier Corporate Recruitment Partners</h3>
              <p className="text-xs text-slate-500">Tier-1 Technology, Semiconductor & Financial Architecture Placement Highlights</p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[11px] font-semibold self-start sm:self-auto">
              <ShieldCheck className="w-3.5 h-3.5 text-institutional-600" />
              <span>100% Autonomous Placement Verification</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RECRUITERS.map((r, i) => (
              <div 
                key={i}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{r.name}</p>
                    <span className="text-xs font-bold text-institutional-700 dark:text-institutional-300 font-mono">
                      {r.ctc}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{r.role}</p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Campus Direct</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Active Recruiter</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

      {/* ── 9. Admissions 2026 Process & Application Roadmap ──────────────── */}
      <section 
        id="admissions"
        ref={admissionsReveal.ref}
        className="py-20 bg-slate-100/60 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-institutional-600 dark:text-institutional-400">
              Admissions AY 2026–2027
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-1">
              Admission Process &amp; Merit Counseling
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Transparent, merit-driven enrollment across undergraduate engineering, postgraduate sciences, and doctoral fellowships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: 'Stage 01',
                title: 'Online Application & Registration',
                timeline: 'August – October 2026',
                desc: 'Submit Class 12 PCM scores, entrance exam rank (JEE Main / State CET), and program preferences through the institutional admissions portal.'
              },
              {
                step: 'Stage 02',
                title: 'Senate Merit List & Cutoffs',
                timeline: 'October 15 – 22, 2026',
                desc: 'Category-wise cutoffs and normalized merit ranks released transparently on the institute official gazette.'
              },
              {
                step: 'Stage 03',
                title: 'Autonomous Seat Allocation',
                timeline: 'October 25 – 30, 2026',
                desc: 'Interactive seat counseling sessions with academic deans for discipline allotment and scholarship merit evaluations.'
              },
              {
                step: 'Stage 04',
                title: 'Matriculation & Scholar Kit',
                timeline: 'November 2026',
                desc: 'Original credential verification at the academic registrar desk, fee confirmation, and scholar kit orientation.'
              }
            ].map(item => (
              <div 
                key={item.step}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-institutional-600 dark:text-institutional-400">
                      {item.step}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                      {item.timeline}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Institutional Admissions Counseling Desk */}
          <div className="mt-10 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0">
                <Phone className="w-4 h-4 text-institutional-600 dark:text-institutional-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Dean of Admissions &amp; Counseling Secretariat</p>
                <p className="text-xs text-slate-500">+91 80 2841 9000 • admissions@chanakya.edu.in • Office Hours: Mon–Sat 9:00 AM – 5:30 PM</p>
              </div>
            </div>
            <a
              href="#notices"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-semibold text-xs transition-colors shrink-0 flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Counseling Roadmap</span>
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
              <div className="flex items-center gap-2.5">
                <UniversityCrest className="w-7 h-7 shrink-0" />
                <span className="font-bold text-white text-sm uppercase tracking-wide">Chanakya Institute</span>
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

      {/* ── Curriculum & Syllabus Specification Modal ────────────────────── */}
      {selectedProgram && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm"
          onClick={() => setSelectedProgram(null)}
        >
          <div 
            className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between bg-slate-50/50 dark:bg-slate-900/50">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-institutional-100 dark:bg-institutional-950 text-institutional-700 dark:text-institutional-300">
                    {selectedProgram.tag}
                  </span>
                  <span className="text-xs text-slate-400">• {selectedProgram.rating}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedProgram.title}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedProgram.degree} • {selectedProgram.duration} • {selectedProgram.creditsTotal} Total Credits • {selectedProgram.seats} Annual Intake
                </p>
              </div>

              <button
                onClick={() => setSelectedProgram(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="px-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-4 text-xs font-semibold">
              <button
                onClick={() => setCurriculumTab('syllabus')}
                className={`py-3 border-b-2 transition-colors ${
                  curriculumTab === 'syllabus'
                    ? 'border-institutional-600 text-institutional-600 dark:text-institutional-400 dark:border-institutional-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Course Syllabus Structure
              </button>
              <button
                onClick={() => setCurriculumTab('eligibility')}
                className={`py-3 border-b-2 transition-colors ${
                  curriculumTab === 'eligibility'
                    ? 'border-institutional-600 text-institutional-600 dark:text-institutional-400 dark:border-institutional-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Eligibility & Career Pathways
              </button>
              <button
                onClick={() => setCurriculumTab('labs')}
                className={`py-3 border-b-2 transition-colors ${
                  curriculumTab === 'labs'
                    ? 'border-institutional-600 text-institutional-600 dark:text-institutional-400 dark:border-institutional-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Specialized Labs & Facilities
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {curriculumTab === 'syllabus' && (
                <div className="space-y-6">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    The {selectedProgram.title} academic curriculum is governed by the Academic Senate and complies with the AICTE Model Curriculum and NBA Outcome-Based Education (OBE) guidelines.
                  </p>

                  <div className="space-y-4">
                    {selectedProgram.semesters.map((s, idx) => (
                      <div key={idx} className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 font-bold text-slate-900 dark:text-white flex items-center justify-between">
                          <span>{s.sem}</span>
                          <span className="text-[10px] font-normal text-slate-400">Core Curriculum Phase</span>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                          {s.courses.map((c, cIdx) => (
                            <div key={cIdx} className="px-4 py-2.5 flex items-center justify-between text-slate-700 dark:text-slate-300">
                              <div className="flex items-center gap-3">
                                <span className="font-mono text-[11px] font-bold text-institutional-600 dark:text-institutional-400 w-16">
                                  {c.code}
                                </span>
                                <span className="font-medium text-slate-900 dark:text-white">{c.title}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                                  {c.type}
                                </span>
                                <span className="font-bold text-slate-900 dark:text-white">{c.credits} Cr</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {curriculumTab === 'eligibility' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                    <p className="font-bold text-slate-900 dark:text-white mb-1">Statutory Admission Eligibility</p>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{selectedProgram.eligibility}</p>
                  </div>

                  <div>
                    <p className="font-bold text-slate-900 dark:text-white mb-2">Graduating Career Outcomes & Industry Roles</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedProgram.careerPaths.map((path, idx) => (
                        <div key={idx} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{path}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    <p className="font-bold text-slate-900 dark:text-white mb-1">Scholarship & Merit Endowments</p>
                    <p className="text-slate-500 leading-relaxed">
                      Up to 100% tuition remission awarded to candidates ranking within the top 500 in national entrance examinations. Additional corporate endowments funded by technology partners.
                    </p>
                  </div>
                </div>
              )}

              {curriculumTab === 'labs' && (
                <div className="space-y-4">
                  <p className="text-slate-600 dark:text-slate-400">
                    Dedicated research laboratories and simulation infrastructure supporting this degree program:
                  </p>
                  <div className="space-y-2.5">
                    {selectedProgram.labs.map((lab, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center gap-3">
                        <Cpu className="w-4 h-4 text-institutional-600 dark:text-institutional-400 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{lab}</p>
                          <p className="text-[11px] text-slate-500">Equipped with enterprise software licenses, hardware kits, and high-speed fiber clusters.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer (Slim, Refined, Professional Actions) */}
            <div className="p-3.5 px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => {
                  setDownloadSuccess(true);
                  setTimeout(() => setDownloadSuccess(false), 3000);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{downloadSuccess ? 'Syllabus PDF Downloaded!' : 'Download Syllabus Specification (PDF)'}</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition-colors"
                >
                  Close
                </button>
                <a
                  href="#admissions"
                  onClick={() => setSelectedProgram(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg bg-institutional-600 hover:bg-institutional-700 active:bg-institutional-800 text-white text-xs font-medium shadow-none transition-colors"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Apply for Admissions 2026</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
