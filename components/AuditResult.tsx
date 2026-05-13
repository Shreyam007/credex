/* eslint-disable */
'use client';

import React from 'react';
import { PRICING_DATA } from '@/lib/pricingData';

export default function AuditResult({ result }: { result: any }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Tool-by-Tool Breakdown
      </h2>
      <div className="space-y-4">
        {result.perTool.map((tool: any) => {
          const pricing = PRICING_DATA[tool.toolId];
          const action = tool.recommendedAction;
          
          const borderColor = 
            action === 'keep' ? 'border-l-green-400' :
            action === 'downgrade' ? 'border-l-yellow-400' :
            action === 'switch' ? 'border-l-orange-400' :
            'border-l-blue-400';

          const badgeStyle = 
            action === 'keep' ? 'bg-green-100 text-green-700 border-green-200' :
            action === 'downgrade' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
            action === 'switch' ? 'bg-orange-100 text-orange-700 border-orange-200' :
            'bg-blue-100 text-blue-700 border-blue-200';

          const badgeLabel = 
            action === 'keep' ? '✓ Keep' :
            action === 'downgrade' ? '↓ Downgrade' :
            action === 'switch' ? '→ Switch' :
            '⚑ Negotiate';

          return (
            <div key={tool.toolId} className={`bg-white border border-slate-100 rounded-2xl p-6 shadow-sm border-l-4 ${borderColor}`}>
              {/* TOP ROW */}
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-lg">{pricing.toolName}</h3>
                  <p className="text-sm text-slate-400 font-medium capitalize">{tool.currentPlan || 'Current Plan'}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${badgeStyle}`}>
                  {badgeLabel}
                </span>
              </div>

              {/* MIDDLE ROW */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 items-center">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Spend</p>
                  <p className="text-2xl font-bold text-slate-900">${tool.currentMonthlySpend.toLocaleString()}<span className="text-xs font-medium text-slate-400 ml-1">/mo</span></p>
                </div>

                <div className="hidden md:flex justify-center text-slate-300 text-2xl font-light">
                  →
                </div>

                <div>
                  {tool.monthlySavings > 0 ? (
                    <>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Recommended</p>
                      <div className="flex items-center gap-3">
                        <p className="text-2xl font-bold text-green-600">
                          ${(tool.currentMonthlySpend - tool.monthlySavings).toLocaleString()}<span className="text-xs font-medium text-green-600/60 ml-1">/mo</span>
                        </p>
                        <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                          Save ${tool.monthlySavings.toLocaleString()}/mo
                        </span>
                      </div>
                    </>
                  ) : action !== 'keep' ? (
                    <>
                      <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-1">Optimization Needed</p>
                      <p className="text-xl font-bold text-orange-600">Review Fit</p>
                    </>
                  ) : (
                    <>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Optimized ✓</p>
                      <p className="text-xl font-bold text-green-600">Perfect Fit</p>
                    </>
                  )}
                </div>
              </div>

              {/* BOTTOM ROW */}
              <div className="mt-6 pt-4 border-t border-slate-50 flex flex-col gap-3">
                <p className="text-sm text-slate-500 italic font-medium">
                  {tool.reasoning}
                </p>
                
                {tool.recommendedAlternative && (
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full">
                      Alternative: {PRICING_DATA[tool.recommendedAlternative]?.toolName || tool.recommendedAlternative}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
