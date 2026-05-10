import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ExternalLink, Info, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const toolsPricing = [
  {
    name: "Cursor",
    id: "cursor",
    color: "border-blue-500",
    source: "cursor.sh/pricing",
    plans: [
      { name: "Hobby", price: "$0", min: "1" },
      { name: "Pro", price: "$20", min: "1" },
      { name: "Business", price: "$40", min: "1" },
      { name: "Enterprise", price: "Custom", min: "-" }
    ]
  },
  {
    name: "GitHub Copilot",
    id: "github_copilot",
    color: "border-slate-800",
    source: "github.com/features/copilot/plans",
    plans: [
      { name: "Individual", price: "$10", min: "1" },
      { name: "Business", price: "$19", min: "1" },
      { name: "Enterprise", price: "$39", min: "1" }
    ]
  },
  {
    name: "Claude (Anthropic)",
    id: "claude",
    color: "border-orange-500",
    source: "anthropic.com/pricing",
    plans: [
      { name: "Free", price: "$0", min: "1" },
      { name: "Pro", price: "$20", min: "1" },
      { name: "Team", price: "$30", min: "5" },
      { name: "Max", price: "$100", min: "1" }
    ]
  },
  {
    name: "ChatGPT (OpenAI)",
    id: "chatgpt",
    color: "border-green-600",
    source: "openai.com/chatgpt/pricing",
    plans: [
      { name: "Free", price: "$0", min: "1" },
      { name: "Plus", price: "$20", min: "1" },
      { name: "Team", price: "$30", min: "2" },
      { name: "Enterprise", price: "Custom", min: "-" }
    ]
  },
  {
    name: "Anthropic API Direct",
    id: "anthropic_api",
    color: "border-purple-500",
    source: "anthropic.com/pricing",
    isApi: true,
    models: [
      { name: "Claude 3.5 Sonnet", input: "$3.00", output: "$15.00" },
      { name: "Claude 3.5 Haiku", input: "$0.25", output: "$1.25" },
      { name: "Claude 3 Opus", input: "$15.00", output: "$75.00" }
    ]
  },
  {
    name: "OpenAI API Direct",
    id: "openai_api",
    color: "border-emerald-500",
    source: "openai.com/api/pricing",
    isApi: true,
    models: [
      { name: "GPT-4o", input: "$2.50", output: "$10.00" },
      { name: "GPT-4o-mini", input: "$0.15", output: "$0.60" },
      { name: "o1-preview", input: "$15.00", output: "$60.00" }
    ]
  },
  {
    name: "Gemini (Google)",
    id: "gemini",
    color: "border-sky-500",
    source: "google.com/gemini/pricing",
    plans: [
      { name: "Free", price: "$0", min: "1" },
      { name: "Advanced", price: "$19.99", min: "1" },
      { name: "Business", price: "$20", min: "1" },
      { name: "Enterprise", price: "$30", min: "1" }
    ]
  },
  {
    name: "Windsurf",
    id: "windsurf",
    color: "border-indigo-600",
    source: "codeium.com/windsurf/pricing",
    plans: [
      { name: "Free", price: "$0", min: "1" },
      { name: "Pro", price: "$15", min: "1" },
      { name: "Teams", price: "$35", min: "1" }
    ]
  }
];

export default function PricingData() {
  const lastVerified = "Oct 24, 2024";

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6 relative">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest border border-green-100">
            <CheckCircle2 className="w-3 h-3" />
            Last verified: {lastVerified}
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Every Number. Every Source.
          </h1>
          <p className="text-xl text-slate-500 font-normal leading-[1.7] max-w-2xl mx-auto">
            SpendShift uses only official vendor pricing pages. We update weekly. Every figure is verifiable.
          </p>
        </div>

        {/* Sticky Update Chip */}
        <div className="hidden lg:block fixed right-8 top-32 rotate-90 origin-right translate-x-1/2">
          <div className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-b-xl shadow-xl">
            Live Feed: {lastVerified}
          </div>
        </div>
      </section>

      {/* Tool Cards */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 gap-8">
          {toolsPricing.map((tool) => (
            <div 
              key={tool.id} 
              className={`bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden border-l-4 ${tool.color}`}
            >
              <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 font-bold`}>
                    {tool.name[0]}
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">{tool.name}</h2>
                </div>
                <Link 
                  href={`https://${tool.source}`} 
                  target="_blank" 
                  className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  {tool.source} <ExternalLink className="w-4 h-4" />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50">
                      {tool.isApi ? (
                        <>
                          <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Model</th>
                          <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Input (per 1M)</th>
                          <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Output (per 1M)</th>
                        </>
                      ) : (
                        <>
                          <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Plan</th>
                          <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Price/seat/mo</th>
                          <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Min Seats</th>
                        </>
                      )}
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tool.isApi ? (
                      tool.models?.map((model) => (
                        <tr key={model.name} className="border-t border-slate-50">
                          <td className="px-8 py-5 text-sm font-bold text-slate-900">{model.name}</td>
                          <td className="px-8 py-5 text-sm font-medium text-slate-600">{model.input}</td>
                          <td className="px-8 py-5 text-sm font-medium text-slate-600">{model.output}</td>
                          <td className="px-8 py-5 text-sm font-bold text-[#4F46E5] text-right">Official ↗</td>
                        </tr>
                      ))
                    ) : (
                      tool.plans?.map((plan) => (
                        <tr key={plan.name} className="border-t border-slate-50">
                          <td className="px-8 py-5 text-sm font-bold text-slate-900">{plan.name}</td>
                          <td className="px-8 py-5 text-sm font-medium text-slate-600">{plan.price}</td>
                          <td className="px-8 py-5 text-sm font-medium text-slate-600">{plan.min}</td>
                          <td className="px-8 py-5 text-sm font-bold text-[#4F46E5] text-right">Official ↗</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology Note */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto p-8 rounded-2xl bg-indigo-50 border border-indigo-100 flex gap-6">
          <Info className="w-6 h-6 text-[#4F46E5] flex-shrink-0" />
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">Methodology Note</h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              Prices shown are monthly list prices in USD. Annual billing discounts exist for some plans and are factored into our audit engine separately. Enterprise pricing is estimated based on publicly disclosed ranges.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
            SpendShift is not affiliated with any of these vendors. Pricing may change — we verify weekly but always confirm on the vendor's site before making purchasing decisions.
          </p>
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
