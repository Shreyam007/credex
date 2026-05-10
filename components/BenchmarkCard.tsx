import React from 'react';

export default function BenchmarkCard({ totalMonthlySpend, teamSize }: { totalMonthlySpend: number, teamSize: number }) {
  const spendPerDev = Math.round(totalMonthlySpend / teamSize);
  
  // Benchmark data
  const getBenchmark = (size: number) => {
    if (size <= 5) return 85;
    if (size <= 20) return 67;
    if (size <= 50) return 54;
    return 48;
  };

  const industryAvg = getBenchmark(teamSize);
  const isAboveAvg = spendPerDev > industryAvg;
  const diffPercent = Math.round(Math.abs((spendPerDev / industryAvg - 1) * 100));

  return (
    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 mb-12 shadow-sm">
      <div className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6">
        SPEND BENCHMARK
      </div>
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-4">
        <div className="space-y-1">
          <div className="text-sm font-semibold text-slate-500">Your spend/dev</div>
          <div className="text-4xl font-extrabold text-slate-900 tracking-tight">
            ${spendPerDev}<span className="text-lg text-slate-400">/mo</span>
          </div>
        </div>
        
        <div className="hidden md:block text-3xl text-slate-200 font-light italic">vs</div>
        
        <div className="space-y-1">
          <div className="text-sm font-semibold text-slate-500">Industry avg ({teamSize} people)</div>
          <div className={`text-4xl font-extrabold tracking-tight ${isAboveAvg ? 'text-red-500' : 'text-green-600'}`}>
            ${industryAvg}<span className="text-lg opacity-40">/mo</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-slate-200/60 text-sm font-medium text-slate-600 leading-relaxed">
        {isAboveAvg 
          ? `⚠️ Your team spends ${diffPercent}% more per developer than similar companies. This usually indicates redundant tool seats or under-utilization of enterprise discounts.`
          : `✅ Your team spends ${diffPercent}% less per developer than similar companies. Your current procurement discipline is exceptional.`
        }
      </div>
    </div>
  );
}
