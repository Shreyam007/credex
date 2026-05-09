'use client';

import React from 'react';
import { PRICING_DATA } from '@/lib/pricingData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingDown, CheckCircle2, AlertTriangle, ArrowRightLeft } from 'lucide-react';

export default function AuditResult({ result }: { result: any }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-800 flex items-center">
        Per-Tool Breakdown
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {result.perTool.map((tool: any) => {
          const pricing = PRICING_DATA[tool.toolId];
          const colorClass = 
            tool.recommendedAction === 'keep' ? 'border-l-green-500' :
            tool.recommendedAction === 'downgrade' ? 'border-l-amber-500' :
            tool.recommendedAction === 'switch' ? 'border-l-orange-500' :
            'border-l-indigo-500';

          const BadgeIcon = 
            tool.recommendedAction === 'keep' ? CheckCircle2 :
            tool.recommendedAction === 'downgrade' ? TrendingDown :
            tool.recommendedAction === 'switch' ? ArrowRightLeft :
            AlertTriangle;

          return (
            <Card key={tool.toolId} className={`border-l-4 ${colorClass} shadow-sm hover:shadow-md transition-shadow`}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-slate-900">{pricing.toolName}</span>
                      <Badge variant="outline" className="capitalize flex items-center gap-1 border-slate-200">
                        <BadgeIcon className="w-3 h-3" />
                        {tool.recommendedAction}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-500">{tool.reasoning}</p>
                  </div>
                  
                  <div className="flex items-center space-x-8">
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Spend</p>
                      <p className="text-lg font-mono font-bold text-slate-900">${tool.currentMonthlySpend}/mo</p>
                    </div>
                    {tool.monthlySavings > 0 && (
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Potential Savings</p>
                        <p className="text-lg font-mono font-bold text-green-600">-${tool.monthlySavings}/mo</p>
                      </div>
                    )}
                  </div>
                </div>

                {tool.recommendedAlternative && (
                  <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center text-sm">
                    <ArrowRightLeft className="w-4 h-4 text-indigo-500 mr-2" />
                    <span className="text-slate-600 font-medium">Recommended Alternative: </span>
                    <span className="ml-2 font-bold text-indigo-600">{PRICING_DATA[tool.recommendedAlternative].toolName}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
