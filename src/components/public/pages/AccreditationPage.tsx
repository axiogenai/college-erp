import React from 'react';
import { 
  ShieldCheck, Award, CheckCircle2, Trophy, School, Globe, 
  ArrowLeft, ArrowRight, ChevronRight, FileCheck
} from 'lucide-react';
import { UniversityCrest } from '../PublicLanding';

export const AccreditationPage: React.FC<{
  onBackToHome: () => void;
  onNavigateToJourney: () => void;
}> = ({ onBackToHome, onNavigateToJourney }) => {
  const accreditations = [
    {
      title: 'NAAC A++ Accreditation',
      body: 'National Assessment and Accreditation Council',
      score: '3.82 Institutional CGPA / 4.0',
      validity: 'Valid through 2028',
      desc: 'Placing Axiogen Institute in the top 1.5% of technical higher education institutions across India, evaluating curricular aspects, teaching-learning quality, and research patents.'
    },
    {
      title: 'UGC Autonomous University Charter',
      body: 'University Grants Commission',
      score: 'Autonomous Status Conferment',
      validity: 'Statutory Act 2(f) & 12(B)',
      desc: 'Conferring full statutory academic independence to formulate advanced industry-aligned engineering curricula, conduct independent semester examinations, and award degrees.'
    },
    {
      title: 'NBA Tier-1 Washington Accord',
      body: 'National Board of Accreditation',
      score: 'Tier-1 International Equivalence',
      validity: 'Permanent Equivalence',
      desc: 'Statutory international equivalence for engineering degrees across 21 signatory nations worldwide, including the United States, United Kingdom, Australia, Canada, and Japan.'
    },
    {
      title: 'NIRF All-India Rank #12',
      body: 'Ministry of Education, Govt. of India',
      score: 'Top-15 Nationwide Standing',
      validity: 'National Ranking 2025',
      desc: 'Evaluated across Teaching, Learning & Resources (TLR), Research & Professional Practice (RPC), Graduation Outcomes (GO), Outreach & Inclusivity (OI), and Perception.'
    }
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
            <span className="text-neutral-400 font-medium">Statutory Compliance</span>
            <span className="text-neutral-300">/</span>
            <span className="font-semibold text-slate-800">Accreditations &amp; Institutional Seal</span>
          </div>
          <button onClick={onNavigateToJourney} className="text-xs text-neutral-400 hover:text-slate-800 font-medium inline-flex items-center gap-1">
            <span>Evolutionary Journey (2008–'26)</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="py-14 border-b border-slate-200 bg-gradient-to-b from-neutral-100/70 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200/60 border border-slate-300 text-xs font-mono uppercase tracking-[0.16em] text-neutral-300 mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Statutory Government Recognitions</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
                Accreditations, Ratings &amp; Heraldic Crest
              </h1>
              <p className="mt-4 text-base text-neutral-400 leading-relaxed">
                National and international benchmarks verifying academic rigor, faculty credentials, laboratory infrastructure, and research integrity.
              </p>
            </div>
            <div className="w-28 h-28 sm:w-36 sm:h-36 shrink-0 p-4 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
              <UniversityCrest className="w-24 h-24 sm:w-28 sm:h-28" />
            </div>
          </div>
        </div>
      </section>

      {/* Accreditations Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accreditations.map((acc, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono text-neutral-400">{acc.body}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-50 text-[#C5A059] font-bold border border-slate-200">
                      {acc.validity}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-slate-800 mb-1">{acc.title}</h3>
                  <p className="text-xs font-mono font-bold text-[#C5A059] mb-4">{acc.score}</p>
                  <p className="text-xs text-neutral-400 leading-relaxed">{acc.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-emerald-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                  <span>Statutory Regulatory Compliance Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Banner */}
      <section className="py-12 bg-slate-50/60 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Axiogen Institute Institutional Charter</h3>
            <p className="text-xs text-neutral-400">Autonomous Premier Technical University • Approved by AICTE &amp; UGC.</p>
          </div>
          <button onClick={onBackToHome} className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold">
            ← Return Home
          </button>
        </div>
      </section>
    </div>
  );
};
