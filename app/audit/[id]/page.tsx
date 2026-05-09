import { supabaseAdmin } from '@/lib/supabase';
import SummaryBlock from '@/components/SummaryBlock';
import AuditResult from '@/components/AuditResult';
import LeadCapture from '@/components/LeadCapture';
import ShareBar from '@/components/ShareBar';
import { Badge } from '@/components/ui/badge';
import { Zap, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import { AuditRecovery } from '@/components/AuditRecovery';

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

    const savings = audit?.result_json?.totalMonthlySavings || 0;

    return {
      title: `I could save $${savings}/month on AI tools — see my audit`,
      description: "Free AI spend audit by SpendShift. Check yours.",
    };
  } catch (e) {
    return {
      title: "AI Spend Audit Results | SpendShift",
    };
  }
}

export default async function AuditPage({ params }: Props) {
  const { id } = await params;
  const { data: audit, error } = await supabaseAdmin
    .from('audits')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !audit) {
    // If not found in DB, fallback to client-side recovery from localStorage
    return <AuditRecovery id={id} />;
  }

  const result = audit.result_json;
  const input = audit.input_json;

  return (
    <main className="min-h-screen bg-slate-50/50 pb-32">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Zap className="text-indigo-600 w-6 h-6 fill-indigo-600" />
            <span className="text-xl font-black tracking-tighter text-slate-900">SpendShift</span>
          </div>
          <Badge variant="outline" className="text-slate-500 font-medium">
            Audit ID: {id.slice(0, 8)}
          </Badge>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          {result.savingsTier === 'optimal' ? (
            <div className="space-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="text-green-600 w-8 h-8 fill-green-600" />
              </div>
              <h1 className="text-4xl font-black text-slate-900">Your stack is well-optimized ✓</h1>
              <p className="text-slate-500 text-lg">Great job! You're getting maximum value for your AI spend.</p>
            </div>
          ) : (
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
          )}
        </section>

        {/* AI Summary Block */}
        <SummaryBlock 
          auditResult={result} 
          teamSize={input.teamSize} 
          primaryUseCase={input.primaryUseCase} 
        />

        {/* Breakdown */}
        <AuditResult result={result} />

        {/* Credex CTA */}
        {result.showCredexCTA && (
          <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-2xl shadow-indigo-200 space-y-6">
            <div className="space-y-2">
              <Badge className="bg-white/20 hover:bg-white/30 border-none text-white text-[10px] font-bold uppercase tracking-widest">
                Credex Special Opportunity
              </Badge>
              <h2 className="text-3xl font-black">Ready to capture these savings?</h2>
              <p className="text-indigo-100 text-lg">
                Credex sources discounted AI credits from companies that over-forecasted. 
                We can likely reduce your spend by an additional 15-20% on top of these recommendations.
              </p>
            </div>
            <button className="w-full md:w-auto px-8 py-4 bg-white text-indigo-600 font-black rounded-xl text-lg hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
              Book a Free Procurement Call <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Lead Capture */}
        <LeadCapture 
          auditId={id} 
          savingsTier={result.savingsTier} 
          totalMonthlySavings={result.totalMonthlySavings} 
        />
      </div>

      {/* Share Bar */}
      <ShareBar auditId={id} />
    </main>
  );
}
