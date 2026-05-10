import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ClipboardList, Calculator, BarChart3, Share2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const steps = [
  {
    number: "01",
    title: "You Tell Us Your Stack",
    description: "Input which AI tools your team pays for, which plan, how many seats, and your primary use case. Takes under 3 minutes. No account needed.",
    icon: ClipboardList,
    src: "/screenshots/step1-form-final.png",
    alt: "SpendShift — Enter your AI tool spend",
    aspect: "aspect-[4/3]"
  },
  {
    number: "02",
    title: "Our Audit Engine Runs",
    description: "We apply 8 financial logic rules — checking plan-size fit, duplicate tools, API vs subscription arbitrage, and overpay detection. Every recommendation cites specific numbers.",
    icon: Calculator,
    src: "/screenshots/step2-engine-final.png",
    alt: "SpendShift — 8 Rules Engine",
    aspect: "aspect-[4/3]"
  },
  {
    number: "03",
    title: "You Get an Instant Report",
    description: "See a per-tool breakdown: current spend → recommended action → monthly + annual savings. With a one-sentence reason for every flag. A finance person would agree with every line.",
    icon: BarChart3,
    src: "/screenshots/step3-result-final.png",
    alt: "SpendShift — Savings result",
    aspect: "aspect-[16/9]"
  },
  {
    number: "04",
    title: "Share or Save Your Audit",
    description: "Your audit gets a unique public URL. Share it with your team or investors. Email yourself a copy. Identifying info is never shown publicly.",
    icon: Share2,
    src: "/screenshots/step4-share-final.png",
    alt: "SpendShift — Share your audit results",
    aspect: "aspect-[16/4]"
  }
];

const rules = [
  {
    title: "Rule 1 — Plan-Size Mismatch",
    description: "Team plan for 2 people? You're paying minimums for seats you don't have."
  },
  {
    title: "Rule 2 — Seat Minimum Waste",
    description: "Tools with minimum seat requirements charge you whether you use them or not."
  },
  {
    title: "Rule 3 — Duplicate Capability",
    description: "Cursor + GitHub Copilot for one coding team is rarely justified. We flag the overlap."
  },
  {
    title: "Rule 4 — API vs Subscription Arbitrage",
    description: "Small teams often pay less via API direct than a subscription plan."
  },
  {
    title: "Rule 5 — Overpay Detection",
    description: "Paying more than listed price? Could be upselling or markup. We flag it."
  },
  {
    title: "Rule 6 — Use Case Fit",
    description: "Claude Pro for a pure coding team is inefficient. We match tools to your actual use."
  },
  {
    title: "Rule 7 — Credex Opportunity",
    description: "For audits over $500/month savings, we surface discounted credit options."
  },
  {
    title: "Rule 8 — Honest Zero",
    description: "If your stack is already optimal, we say so. We never manufacture savings."
  }
];

export default function HowItWorks() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Transparent. Defensible. <span className="text-[#4F46E5]">Free.</span>
          </h1>
          <p className="text-xl text-slate-500 font-normal leading-[1.7] max-w-2xl mx-auto">
            Here's exactly how SpendShift audits your AI tool spend — no black box, no upsell tricks.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-32">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 relative`}
            >
              {/* Background Number */}
              <div className="absolute -top-16 -left-8 md:-top-24 md:-left-12 text-[12rem] md:text-[16rem] font-black text-slate-50 select-none -z-10 leading-none">
                {step.number}
              </div>

              <div className="flex-1 space-y-6 text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 text-[#4F46E5] mb-4">
                  <step.icon className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Step {step.number} — {step.title}
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>

              <div className="flex-1 w-full flex justify-center">
                {step.number === "04" ? (
                  /* SPECIAL HANDLING — STEP 4 (Share Bar) */
                  <div className="w-full relative rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(79,70,229,0.10)] border border-slate-200 bg-slate-50 p-6">
                    {/* Mock page content above share bar */}
                    <div className="space-y-2 mb-6 opacity-30">
                      <div className="h-3 bg-slate-300 rounded w-3/4"/>
                      <div className="h-3 bg-slate-300 rounded w-1/2"/>
                      <div className="h-3 bg-slate-300 rounded w-2/3"/>
                    </div>

                    {/* Share bar image */}
                    <div className={`relative w-full ${step.aspect} rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)]`}>
                      <Image
                        src={step.src}
                        alt={step.alt}
                        fill
                        className="object-contain object-center"
                        priority
                      />
                    </div>
                  </div>
                ) : (
                  /* BROWSER CHROME FRAME WRAPPER (Steps 1, 2, 3) */
                  <div className="w-full relative rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(79,70,229,0.10)] border border-slate-200">
                    {/* Fake browser top bar */}
                    <div className="bg-slate-100 px-4 py-3 flex items-center gap-2 border-b border-slate-200">
                      <div className="w-3 h-3 rounded-full bg-red-400"/>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"/>
                      <div className="w-3 h-3 rounded-full bg-green-400"/>
                      <div className="flex-1 bg-white rounded-md mx-3 py-1 px-3 text-xs text-slate-400 border border-slate-200 font-mono">
                        spendshift.com
                      </div>
                    </div>

                    {/* IMAGE FILLS THIS BOX COMPLETELY */}
                    <div className={`relative w-full ${step.aspect}`}>
                      <Image
                        src={step.src}
                        alt={step.alt}
                        fill
                        className="object-cover object-top"
                        priority
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Audit Rules Section */}
      <section className="py-32 px-6 bg-slate-50/50">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              The 8 Rules Behind Every Audit
            </h2>
            <p className="text-slate-500 font-medium">Our logic is based on current market pricing and real-world efficiency data.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rules.map((rule) => (
              <div key={rule.title} className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] mr-3" />
                  {rule.title}
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {rule.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Ready to see your number?
          </h2>
          <Link href="/">
            <button className="px-10 py-5 bg-[#4F46E5] text-white font-bold rounded-2xl text-xl hover:bg-[#4338CA] transition-all duration-150 flex items-center justify-center gap-3 mx-auto shadow-xl shadow-indigo-100 active:scale-[0.98]">
              Run Free Audit <ArrowRight className="w-6 h-6" />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
