/* eslint-disable */
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Lock, Trash2, CheckCircle2, XCircle, Server, Mail, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Your Data. Your Control.
          </h1>
          <p className="text-xl text-slate-500 font-normal leading-[1.7] max-w-2xl mx-auto">
            Here's exactly what we collect, what we don't, and how we protect it.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center gap-3">
              <Lock className="w-6 h-6 text-[#4F46E5]" />
              <span className="text-sm font-bold text-slate-700">Zero PII in public URLs</span>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center gap-3">
              <Mail className="w-6 h-6 text-[#4F46E5]" />
              <span className="text-sm font-bold text-slate-700">Email only after results</span>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center gap-3">
              <Trash2 className="w-6 h-6 text-[#4F46E5]" />
              <span className="text-sm font-bold text-slate-700">Delete data anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Data Collection Section */}
      <section className="py-24 px-6 bg-slate-50/50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              What We Store
            </h2>
            <ul className="space-y-4">
              {[
                "The AI tools you entered and which plans",
                "Your spend figures (used only for audit math)",
                "Email address (only if you choose to share it)",
                "Company name and role (optional, never required)",
                "Audit result (to power your shareable URL)"
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-600 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <XCircle className="w-6 h-6 text-red-600" />
              What We Never Collect
            </h2>
            <ul className="space-y-4">
              {[
                "No passwords or payment info",
                "No access to your actual billing accounts",
                "No tracking pixels or behavioral analytics",
                "No selling your data to any third party",
                "No account creation required"
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-600 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Shareable URLs Explanation */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
              How Shareable URLs Work
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              When you share your audit URL, the public version shows only your tool selections and savings numbers. Your email, company name, and any identifying details are completely stripped from the public view.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">What YOU see</span>
              <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                  <span className="font-bold text-slate-900">Audit #12345</span>
                  <span className="text-xs font-medium text-slate-500">shreyam@example.com</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-24 bg-slate-100 rounded" />
                  <div className="h-2 w-32 bg-indigo-100 rounded" />
                </div>
                <div className="pt-2">
                  <span className="text-xl font-black text-indigo-600">$1,240 / yr savings</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">What the public URL shows</span>
              <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-50/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
                  <div className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest shadow-sm">Identifiable Info Stripped</div>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-50 opacity-50">
                  <span className="font-bold text-slate-900">Audit #12345</span>
                  <div className="h-2 w-24 bg-slate-200 rounded" />
                </div>
                <div className="space-y-2 opacity-50">
                  <div className="h-2 w-24 bg-slate-100 rounded" />
                  <div className="h-2 w-32 bg-indigo-100 rounded" />
                </div>
                <div className="pt-2">
                  <span className="text-xl font-black text-indigo-600">$1,240 / yr savings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight mb-4 flex items-center gap-3">
              <Server className="w-8 h-8 text-[#4F46E5]" />
              Enterprise-Grade Infrastructure
            </h2>
            <p className="text-slate-400 font-medium leading-relaxed">
              SpendShift is built on top of industry-standard infrastructure with strict security protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Vercel", detail: "Hosting — SOC 2 compliant" },
              { name: "Supabase", detail: "Database — SOC 2 Type 2, Encrypted at rest" },
              { name: "Resend", detail: "Email — GDPR compliant delivery" },
              { name: "Anthropic", detail: "AI — Zero data retention for API" }
            ].map((item) => (
              <div key={item.name} className="space-y-2">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-sm text-slate-500 font-medium">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Abuse Protection & Contact */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-indigo-600" />
              Abuse Protection
            </h2>
            <p className="text-slate-600 font-medium leading-relaxed">
              We use honeypot fields and rate limiting to prevent spam submissions. We do not use aggressive CAPTCHAs that hurt the user experience.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-indigo-50 border border-indigo-100 space-y-4">
            <h2 className="text-2xl font-black text-slate-900">Contact Security</h2>
            <p className="text-slate-600 font-medium leading-relaxed">
              Security concern or data deletion request?
            </p>
            <div className="pt-2">
              <a href="mailto:security@spendshift.com" className="text-xl font-bold text-[#4F46E5] hover:underline">
                security@spendshift.com
              </a>
              <p className="text-xs text-slate-400 mt-2 font-bold uppercase tracking-widest">Responds within 24 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Ready to see your number?
          </h2>
          <Link href="/">
            <button className="px-10 py-5 bg-[#4F46E5] text-white font-bold rounded-2xl text-xl hover:bg-[#4338CA] transition-all duration-150 flex items-center justify-center gap-3 mx-auto shadow-xl shadow-indigo-100 active:scale-[0.98]">
              Run Free Audit 
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
