/* eslint-disable */
'use client';


import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export default function SummaryBlock({ auditResult, teamSize, primaryUseCase }: any) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const totalSpend = auditResult.perTool.reduce((acc: number, t: any) => acc + t.currentMonthlySpend, 0);
        
        const res = await fetch('/api/summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            auditResult, 
            teamSize, 
            primaryUseCase,
            totalMonthlySpend: totalSpend,
            totalMonthlySavings: auditResult.totalMonthlySavings,
            perTool: auditResult.perTool
          }),
        });
        const data = await res.json();
        
        if (data.summary) {
          setSummary(data.summary);
        } else {
          // Fallback template
          const toolCount = auditResult.perTool.length;
          const topRec = auditResult.perTool[0]?.recommendedAction || 'optimizing plans';
          const annualSavings = auditResult.totalAnnualSavings;
          
          let fallback = `Your team of ${teamSize} is spending $${totalSpend}/month across ${toolCount} AI tools. Our audit identified $${auditResult.totalMonthlySavings}/month in optimization opportunities, primarily through ${topRec}. `;
          
          if (auditResult.totalMonthlySavings > 0) {
            fallback += `Capturing these savings could return $${annualSavings} to your budget annually.`;
          } else {
            // Check benchmark in fallback logic
            const getBenchmark = (size: number) => {
              if (size <= 5) return 85;
              if (size <= 20) return 67;
              if (size <= 50) return 54;
              return 48;
            };
            const industryAvg = getBenchmark(teamSize);
            const spendPerDev = totalSpend / teamSize;
            
            if (spendPerDev > industryAvg * 1.1) {
              fallback += `While your current tool plans are correctly selected, your overall spend per developer is higher than the industry average of $${industryAvg}. Consider consolidating overlapping tools to improve efficiency.`;
            } else {
              fallback += `Your current stack reflects strong procurement discipline — continue monitoring as vendor pricing evolves.`;
            }
          }
          setSummary(fallback);
        }
      } catch (e) {
        setSummary("Your audit is ready. Review the breakdown below for specific optimization opportunities.");
      } finally {
        setLoading(false);
      }
    }
    fetchSummary();
  }, [auditResult, teamSize, primaryUseCase]);

  return (
    <Card className="border-indigo-100 bg-indigo-50/40 rounded-xl overflow-hidden border-l-4 border-[#4F46E5] shadow-sm">
      <CardContent className="p-6 space-y-3">
        <div className="flex items-center space-x-2 text-[#4F46E5] font-bold text-[10px] uppercase tracking-widest">
          <Sparkles className="w-3 h-3" />
          <span>AI ANALYSIS</span>
        </div>
        
        {loading ? (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-indigo-400 animate-pulse">Generating your personalized analysis...</p>
            <div className="h-3 bg-indigo-100 rounded animate-pulse w-full"></div>
            <div className="h-3 bg-indigo-100 rounded animate-pulse w-5/6"></div>
            <div className="h-3 bg-indigo-100 rounded animate-pulse w-4/6"></div>
          </div>
        ) : (
          <p className="text-base text-slate-700 leading-relaxed font-medium">
            {summary}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
