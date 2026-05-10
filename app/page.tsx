import SpendForm from '@/components/SpendForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Zap, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center px-3 py-1 bg-indigo-50 text-[#4F46E5] rounded-full text-xs font-semibold uppercase tracking-widest border border-indigo-100">
            Free AI Audit Tool
          </div>
          
          <h1 className="space-y-2">
            <div className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] leading-[1.05] text-[#0F172A]">
              Stop Guessing.
            </div>
            <div className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] leading-[1.05] text-[#4F46E5]">
              Start Saving.
            </div>
          </h1>

          <p className="text-lg text-slate-500 font-normal leading-[1.7] max-w-lg mx-auto">
            The average team overpays by 24% for AI seats. Get an instant, 
            finance-literate audit of your Cursor, Copilot, and API spend.
          </p>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-0 divide-x divide-slate-200 text-sm text-slate-500 font-medium pt-4">
            <div className="flex items-center gap-2 px-6 py-1">
              <ShieldCheck className="w-4 h-4 text-[#4F46E5]" />
              <span className="text-slate-600 font-medium">No credit card</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-1">
              <CheckCircle2 className="w-4 h-4 text-[#4F46E5]" />
              <span className="text-slate-600 font-medium">GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-1">
              <Zap className="w-4 h-4 text-[#4F46E5]" />
              <span className="text-slate-600 font-medium">Instant results</span>
            </div>
          </div>

          <div id="audit" className="w-full pt-16 max-w-xl mx-auto">
            <SpendForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
