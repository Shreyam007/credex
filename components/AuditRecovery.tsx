/* eslint-disable */
'use client';

import React, { useEffect, useState } from 'react';
import SummaryBlock from '@/components/SummaryBlock';
import AuditResult from '@/components/AuditResult';
import LeadCapture from '@/components/LeadCapture';
import ShareBar from '@/components/ShareBar';
import { Badge } from '@/components/ui/badge';
import { Zap, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import Footer from '@/components/Footer';

export function AuditRecovery({ id }: { id: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(`audit_result_${id}`);
    if (saved) {
      setData(JSON.parse(saved));
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center space-y-6">
        <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center text-slate-400">
          <AlertCircle className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900">Audit Not Found</h1>
          <p className="text-slate-500 max-w-md">
            We couldn't find this audit in our database. It may have expired or you might be using a different device.
          </p>
        </div>
        <a href="/" className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors">
          Run a New Audit
        </a>
      </div>
    );
  }

  const { result, input } = data;

  return (
    <main className="min-h-screen bg-slate-50/50 pb-32">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-6 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <Zap className="text-[#4F46E5] w-6 h-6 fill-[#4F46E5] transition-transform duration-300 group-hover:scale-110" />
            <span className="text-xl font-bold tracking-tighter text-slate-900">SpendShift</span>
          </Link>
          <Badge variant="outline" className="text-slate-500 font-medium">
            Audit ID: {id.slice(0, 8)}
          </Badge>
        </div>
      </div>

      {/* Demo Mode Alert */}
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <Alert className="bg-amber-50 border-amber-200 text-amber-800">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertTitle>Local Preview Mode</AlertTitle>
          <AlertDescription>
            Database connection not found. Displaying results from your local browser session. 
            <strong> Setup Supabase to enable public sharing.</strong>
          </AlertDescription>
        </Alert>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        <section className="text-center space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Potential Savings Found</p>
            <h1 className="text-7xl font-black text-slate-900 tracking-tighter">
              <span className="text-green-600">${result.totalMonthlySavings}</span>
              <span className="text-slate-300 text-3xl font-bold ml-4">/mo</span>
            </h1>
            <p className="text-slate-500 text-xl font-medium">
              That's ${result.totalAnnualSavings.toLocaleString()} in annual savings.
            </p>
          </div>
        </section>

        <SummaryBlock 
          auditResult={result} 
          teamSize={input.teamSize} 
          primaryUseCase={input.primaryUseCase} 
        />

        <AuditResult result={result} />

        {result.showCredexCTA && (
          <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-2xl shadow-indigo-200 space-y-6">
            <h2 className="text-3xl font-black">Ready to capture these savings?</h2>
            <p className="text-indigo-100 text-lg">
              Credex sources discounted AI credits. We can likely reduce your spend by an additional 15-20%.
            </p>
            <button className="px-8 py-4 bg-white text-indigo-600 font-black rounded-xl text-lg hover:bg-indigo-50">
              Book a Free Call <ArrowRight className="inline ml-2" />
            </button>
          </div>
        )}

        <LeadCapture 
          auditId={id} 
          savingsTier={result.savingsTier} 
          totalMonthlySavings={result.totalMonthlySavings} 
        />
      </div>
      <ShareBar auditId={id} totalMonthlySavings={result.totalMonthlySavings} />
      <Footer />
    </main>
  );
}
