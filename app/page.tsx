import SpendForm from '@/components/SpendForm';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <Zap className="text-white w-6 h-6 fill-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900">SpendShift</span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-semibold text-slate-600">
          <a href="#" className="hover:text-indigo-600 transition-colors">How it works</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Pricing Data</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Security</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 text-center space-y-8">
        <div className="space-y-4">
          <Badge className="bg-indigo-50 text-indigo-700 hover:bg-indigo-50 border-indigo-100 px-4 py-1 text-xs font-bold uppercase tracking-widest">
            Free AI Audit Tool
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.1]">
            Stop Guessing. <span className="text-indigo-600">Start Saving.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            See exactly where your team overpays for AI tools. Get a personalized, 
            finance-literate audit in less than 3 minutes.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-500">
          <div className="flex items-center">
            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" /> No credit card required
          </div>
          <div className="flex items-center">
            <ShieldCheck className="w-5 h-5 text-indigo-500 mr-2" /> GDPR & SOC2 Compliant
          </div>
          <div className="flex items-center">
            <Zap className="w-5 h-5 text-amber-500 mr-2" /> Instant results
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-600/5 blur-3xl rounded-full -z-10 transform -translate-y-12 scale-110"></div>
          <SpendForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white/50 backdrop-blur-md py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-400 text-sm">
            © 2026 SpendShift. Built for the future of AI procurement.
          </p>
          <div className="flex space-x-6 text-slate-400 text-sm">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
