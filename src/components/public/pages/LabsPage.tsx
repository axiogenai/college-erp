import React from 'react';
import { 
  Cpu, Microscope, Library, Building2, FlaskConical, ArrowLeft, 
  ArrowRight, CheckCircle2, ShieldCheck, ChevronRight
} from 'lucide-react';

export const LabsPage: React.FC<{
  onBackToHome: () => void;
  onNavigateToPrograms: () => void;
}> = ({ onBackToHome, onNavigateToPrograms }) => {
  const facilities = [
    {
      title: 'Supercomputing & AI Research Center',
      category: 'Computing Infrastructure',
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80',
      description: 'Equipped with 64 Nvidia A100 Tensor Core GPUs providing 320 Teraflops of computing power for neural foundation model training, genomic data sequencing, and autonomous robotics simulations.',
      badge: '320 TFLOPS Cluster',
      specs: ['64x Nvidia A100 Tensor GPUs', '1.2 PB High-Speed NVMe Storage', '400 Gbps Infiniband Network']
    },
    {
      title: 'Neoclassical Central Digital Library',
      category: 'Academic Knowledge Repository',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
      description: 'Over 85,000 catalogued scientific volumes, 24/7 climate-controlled study carrels, and instantaneous access to IEEE, ACM, ScienceDirect, and Springer electronic journals.',
      badge: '85,000+ Volumes',
      specs: ['24/7 Climate-Controlled Carrels', 'Direct IEEE & ACM Digital Access', 'Automated RFID Self-Checkout']
    },
    {
      title: 'Advanced Robotics & Automation Pavilion',
      category: 'Engineering & Mechatronics',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      description: 'Industrial 6-axis robotic arms, multi-material 3D laser sinterers, and dedicated test arenas for autonomous ground and aerial vehicles.',
      badge: 'Industry 4.0 Pavilion',
      specs: ['6-Axis KUKA & ABB Robotic Arms', 'Multi-Material Direct Metal 3D Printers', 'Autonomous Drone Test Arena']
    },
    {
      title: 'Academic Commons & Innovation Amphitheater',
      category: 'Student Life & Venture Sandbox',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      description: 'High-speed fiber-backed open commons fostering interdisciplinary student hacking, venture incubation, and collegiate colloquia with seating for 800 scholars.',
      badge: 'Venture Sandbox',
      specs: ['Incubation Seed Funding Fund', '10 Gbps Symmetrical Wi-Fi 6E', 'Tier-3 Data Center Backing']
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
            <span className="text-neutral-400 font-medium">Academics</span>
            <span className="text-neutral-300">/</span>
            <span className="font-semibold text-slate-800">Research Labs &amp; Centers</span>
          </div>
          <button onClick={onNavigateToPrograms} className="text-xs text-neutral-400 hover:text-slate-800 font-medium inline-flex items-center gap-1">
            <span>Degree Programs</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="py-14 border-b border-slate-200 bg-gradient-to-b from-neutral-100/70 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200/60 border border-slate-300 text-xs font-mono uppercase tracking-[0.16em] text-neutral-300 mb-4">
              <Cpu className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>48 Advanced Research Laboratories</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
              Campus Research Laboratories &amp; Supercomputing
            </h1>
            <p className="mt-4 text-base text-neutral-400 leading-relaxed">
              State-of-the-art computational infrastructure, robotics testbeds, and digital repositories certified under the Washington Accord and DST research frameworks.
            </p>
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facilities.map((fac, idx) => (
              <div key={idx} className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <div className="h-64 relative overflow-hidden bg-neutral-900">
                    <img src={fac.image} alt={fac.title} className="w-full h-full object-cover filter brightness-[0.88]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-6 right-6">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#C5A059] text-black font-bold inline-block mb-1">
                        {fac.badge}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-white drop-shadow-sm">{fac.title}</h3>
                      <p className="text-xs text-neutral-300 font-mono">{fac.category}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-xs text-neutral-400 leading-relaxed mb-4">{fac.description}</p>
                    <div className="space-y-2 pt-3 border-t border-slate-100">
                      {fac.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 text-xs text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-neutral-400">
                  <span>Open for Undergraduate &amp; Doctoral Scholars</span>
                  <span className="font-mono text-neutral-300 font-semibold">24/7 Access</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Banner */}
      <section className="py-12 bg-slate-50/60 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Interested in Conducting Frontier Research?</h3>
            <p className="text-xs text-neutral-400">Explore doctoral research fellowships and funded laboratory grants.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onBackToHome} className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-neutral-300">
              ← Return Home
            </button>
            <button onClick={onNavigateToPrograms} className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center gap-1.5">
              <span>View Degree Curricula</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
