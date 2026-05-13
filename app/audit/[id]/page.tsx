/* eslint-disable */
import { supabaseAdmin } from '@/lib/supabase';
import SummaryBlock from '@/components/SummaryBlock';
import AuditResult from '@/components/AuditResult';
import LeadCapture from '@/components/LeadCapture';
import BenchmarkCard from '@/components/BenchmarkCard';
import ShareBar from '@/components/ShareBar';
import { Badge } from '@/components/ui/badge';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const { data: audit } = await supabaseAdmin
      .from('audits')
      .select('result_json')
      .eq('id', id)
      .single();

    if (!audit) return { title: 'Audit Not Found | SpendShift' };

    const savings = audit.result_json.totalMonthlySavings || 0;
    const toolCount = audit.result_json.perTool.length;

    return {
      title: `AI Spend Audit — $${savings}/mo savings found`,
      description: `SpendShift audited ${toolCount} AI tools and found $${savings}/month in potential savings. Run your free audit.`,
      openGraph: {
        title: `I could save $${savings}/month on AI tools`,
        description: `Free AI spend audit by SpendShift. See where your team overpays.`,
        url: `${process.env.NEXT_PUBLIC_APP_URL}/audit/${id}`,
        siteName: 'SpendShift',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `AI Spend Audit — $${savings}/mo savings`,
        description: 'Free AI tool spend audit. No login required.',
      },
    };
  } catch (e) {
    return { title: "AI Spend Audit Results | SpendShift" };
  }
}

export default async function AuditPage({ params }: Props) {
  const { id } = await params;
  
  const { data: audit, error } = await supabaseAdmin
    .from('audits')
    .select('id, result_json, created_at, input_json')
    .eq('id', id)
    .single();

  if (error || !audit) {
    notFound();
  }

  const result = audit.result_json;
  const input = audit.input_json;
  
  // Use the benchmark info directly from the engine
  const benchmarkDiff = result.benchmarkDiff || 0;
  const isOptimal = (result.savingsTier === 'optimal' || result.totalMonthlySavings < 100) && benchmarkDiff < 20;

  return (
    <main className="min-h-screen bg-white pb-32">
      <div className="no-print">
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        
        {/* SECTION A: HERO SAVINGS BLOCK */}
        {isOptimal ? (
          <div className="text-center py-16 bg-gradient-to-b from-green-50 to-white rounded-3xl mb-8">
            <div className="text-6xl text-green-600 mb-4 font-bold">✓</div>
            <h1 className="text-4xl font-extrabold text-slate-900">You're Spending Well</h1>
            <p className="text-lg text-slate-500 max-w-md mx-auto mt-3 font-medium">
              Your AI stack is well-optimized for your team size and use case. We'll alert you when better options appear for your specific setup.
            </p>
          </div>
        ) : result.totalMonthlySavings > 0 ? (
          <div className="text-center py-16 bg-gradient-to-b from-indigo-50 to-white rounded-3xl mb-8">
            <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">
              YOUR MONTHLY SAVINGS POTENTIAL
            </p>
            <h1 className="text-7xl font-extrabold text-[#4F46E5] tracking-tight mt-4">
              ${result.totalMonthlySavings.toLocaleString()} / month
            </h1>
            <p className="text-xl text-slate-500 font-medium mt-2">
              That's ${result.totalAnnualSavings.toLocaleString()} saved every year
            </p>
            
            <div className="flex justify-center mt-6">
              {result.totalMonthlySavings > 1000 ? (
                <span className="bg-red-500 text-white rounded-full px-4 py-1 text-sm font-semibold">
                  High Savings Opportunity
                </span>
              ) : result.totalMonthlySavings > 300 ? (
                <span className="bg-orange-500 text-white rounded-full px-4 py-1 text-sm font-semibold">
                  Significant Savings Found
                </span>
              ) : (
                <span className="bg-yellow-400 text-slate-900 rounded-full px-4 py-1 text-sm font-semibold">
                  Consolidation Opportunity
                </span>
              )}
            </div>
          </div>
        ) : (
          /* ABOVE BENCHMARK BUT NO SPECIFIC TOOL SAVINGS FOUND */
          <div className="text-center py-16 bg-gradient-to-b from-amber-50 to-white rounded-3xl mb-8">
            <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase">
              BENCHMARK ALERT
            </p>
            <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mt-4">
              High Per-Seat Spend
            </h1>
            <p className="text-xl text-slate-500 font-medium mt-2">
              Your tool-specific plans are fine, but your overall stack is ${benchmarkDiff}% over budget.
            </p>
            
            <div className="flex justify-center mt-6">
              <span className="bg-amber-500 text-white rounded-full px-4 py-1 text-sm font-semibold">
                Optimization Recommended
              </span>
            </div>
          </div>
        )}

        {/* BONUS: BENCHMARK MODE */}
        <BenchmarkCard 
          totalMonthlySpend={result.perTool.reduce((acc: number, t: any) => acc + t.currentMonthlySpend, 0)}
          teamSize={input.teamSize}
        />

        {/* SECTION B: AI SUMMARY BLOCK */}
        <SummaryBlock 
          auditResult={result} 
          teamSize={input.teamSize} 
          primaryUseCase={input.primaryUseCase} 
        />

        {/* SECTION C: PER-TOOL BREAKDOWN */}
        <AuditResult result={result} />

        {/* SECTION D: CREDEX CTA */}
        {!isOptimal && result.totalMonthlySavings > 500 && (
          <div className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-2xl p-8 text-white my-8 shadow-xl no-print">
            <p className="text-xs font-semibold tracking-widest text-indigo-200 uppercase">
              MAXIMIZE YOUR SAVINGS
            </p>
            <h2 className="text-3xl font-extrabold mt-2">
              Get an Additional 20–40% Off These Tools
            </h2>
            <p className="text-indigo-100 text-base mt-2 max-w-lg leading-relaxed font-medium">
              Credex sources discounted AI infrastructure credits from companies that over-forecasted. 
              We've identified ${result.totalMonthlySavings}/month in optimization savings — 
              Credex can layer an additional discount on top of that.
            </p>
            
            <div className="flex flex-wrap gap-8 mt-6">
              <div className="space-y-1">
                <p className="text-xs font-bold text-indigo-300 uppercase tracking-widest">Avg additional discount</p>
                <p className="text-xl font-bold">20-40%</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-indigo-300 uppercase tracking-widest">Time to activate</p>
                <p className="text-xl font-bold">&lt;24hrs</p>
              </div>
            </div>

            <button className="bg-white text-[#4F46E5] font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition mt-8 flex items-center gap-2 btn-hover">
              Book a Free 20-Min Audit Call <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* SECTION E: LEAD CAPTURE */}
        <div className="no-print">
          <LeadCapture 
            auditId={id} 
            savingsTier={result.savingsTier} 
            totalMonthlySavings={result.totalMonthlySavings} 
          />
        </div>
      </div>

      {/* SECTION F: SHARE BAR */}
      <div className="no-print">
        <ShareBar auditId={id} totalMonthlySavings={result.totalMonthlySavings} />
      </div>

      <div className="no-print">
        <Footer />
      </div>
    </main>
  );
}
