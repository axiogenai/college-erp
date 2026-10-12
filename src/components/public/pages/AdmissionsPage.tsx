import React from 'react';
import { 
  GraduationCap, Phone, Mail, FileText, CheckCircle2, 
  ArrowLeft, ArrowRight, Download, ChevronRight, Calendar
} from 'lucide-react';

export const AdmissionsPage: React.FC<{
  onBackToHome: () => void;
  onNavigateToPrograms: () => void;
}> = ({ onBackToHome, onNavigateToPrograms }) => {
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
            <span className="text-neutral-400 font-medium">Admissions Directorate</span>
            <span className="text-neutral-300">/</span>
            <span className="font-semibold text-slate-800">Merit Counseling 2026</span>
          </div>
          <button onClick={onNavigateToPrograms} className="text-xs text-neutral-400 hover:text-slate-800 font-medium inline-flex items-center gap-1">
            <span>Academic Degrees Catalog</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="py-14 border-b border-slate-200 bg-gradient-to-b from-neutral-100/70 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200/60 border border-slate-300 text-xs font-mono uppercase tracking-[0.16em] text-neutral-300 mb-4">
              <GraduationCap className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Academic Year 2026–2027 Intake</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
              Undergraduate &amp; Doctoral Admissions Portal
            </h1>
            <p className="mt-4 text-base text-neutral-400 leading-relaxed">
              Transparent meritocratic counseling, national entrance score validations, and statutory seat allocations administered by the Dean of Admissions Secretariat.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Steps */}
      <section className="py-12 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-8">
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-400 block">Admissions Roadmap</span>
            <h2 className="text-2xl font-serif font-bold text-white mt-1">3-Stage Enrollment Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="w-8 h-8 rounded-full bg-neutral-900 text-white font-mono font-bold text-xs flex items-center justify-center mb-4">01</span>
              <h3 className="font-serif font-bold text-base text-slate-800 mb-2">Merit Registration</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                Submit online application with JEE Main, State CET, or GATE examination roll numbers and 10+2 marksheet credentials.
              </p>
              <span className="text-[11px] font-mono text-[#C5A059] font-semibold">Active: Oct 15 – Nov 20</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="w-8 h-8 rounded-full bg-neutral-900 text-white font-mono font-bold text-xs flex items-center justify-center mb-4">02</span>
              <h3 className="font-serif font-bold text-base text-slate-800 mb-2">Dossier Verification</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                Digital verification of academic certificates, category credentials, and choice preference selection across our 6 engineering faculties.
              </p>
              <span className="text-[11px] font-mono text-[#C5A059] font-semibold">Verification Desk: Online</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="w-8 h-8 rounded-full bg-neutral-900 text-white font-mono font-bold text-xs flex items-center justify-center mb-4">03</span>
              <h3 className="font-serif font-bold text-base text-slate-800 mb-2">Senate Seat Allotment</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                Provisional allotment order generated via Automated ERP Treasury with real-time fee reconciliation and student enrollment ID creation.
              </p>
              <span className="text-[11px] font-mono text-[#C5A059] font-semibold">Instant ERP Onboarding</span>
            </div>
          </div>
        </div>
      </section>

      {/* Counseling Helpdesk */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A059] font-bold block mb-1">
                Admissions Secretariat Desk
              </span>
              <h3 className="text-xl font-serif font-bold text-white mb-2">Need Guidance from Senior Academic Counselors?</h3>
              <p className="text-xs text-neutral-300 max-w-xl">
                Call +91 80 0000 5500 or email admissions@axiogen.edu.in. Operating Monday through Saturday from 9:00 AM to 5:30 PM.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a href="tel:+918000005500" className="px-5 py-2.5 rounded-xl bg-white text-slate-800 font-semibold text-xs transition-colors hover:bg-slate-50 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" />
                <span>Call Helpdesk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Banner */}
      <section className="py-12 bg-slate-50/60 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Explore Accredited Academic Degrees</h3>
            <p className="text-xs text-neutral-400">Inspect full 4-year undergraduate and postgraduate curricula.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onBackToHome} className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-neutral-300">
              ← Return Home
            </button>
            <button onClick={onNavigateToPrograms} className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center gap-1.5">
              <span>View Degrees Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
