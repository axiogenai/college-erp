import React from 'react';
import { 
  FileText, Calendar, Bell, ArrowLeft, ArrowRight, 
  ChevronRight, Download, Search, ShieldCheck
} from 'lucide-react';

export const GazettePage: React.FC<{
  onBackToHome: () => void;
  notices: any[];
}> = ({ onBackToHome, notices }) => {
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
            <span className="text-neutral-400 font-medium">Statutory Communications</span>
            <span className="text-neutral-300">/</span>
            <span className="font-semibold text-slate-800">Official University Gazette</span>
          </div>
          <button onClick={onBackToHome} className="text-xs text-neutral-400 hover:text-slate-800 font-medium inline-flex items-center gap-1">
            <span>← Campus Home</span>
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="py-14 border-b border-slate-200 bg-gradient-to-b from-neutral-100/70 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200/60 border border-slate-300 text-xs font-mono uppercase tracking-[0.16em] text-neutral-300 mb-4">
              <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Statutory Gazette &amp; Circulars</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
              Official University Gazette &amp; Notifications
            </h1>
            <p className="mt-4 text-base text-neutral-400 leading-relaxed">
              Official senate circulars, academic calendar revisions, bursar fee schedules, and statutory executive orders published by the Registrar Secretariat.
            </p>
          </div>
        </div>
      </section>

      {/* Notices Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notices.map((notice) => (
              <div key={notice.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-50 text-neutral-400 border border-slate-200 uppercase font-semibold">
                      {notice.category}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {notice.targetAudience}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 line-clamp-2 mb-2 font-serif">
                    {notice.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed mb-4">
                    {notice.content}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                  <span>By {notice.author}</span>
                  <span>{notice.publishDate}</span>
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
            <h3 className="text-sm font-bold text-slate-800">Axiogen Institute Registrar Secretariat</h3>
            <p className="text-xs text-neutral-400">Official statutory archive authenticated with cryptographic timestamps.</p>
          </div>
          <button onClick={onBackToHome} className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold">
            ← Return Home
          </button>
        </div>
      </section>
    </div>
  );
};
