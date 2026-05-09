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
        const res = await fetch('/api/summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ auditResult, teamSize, primaryUseCase }),
        });
        const data = await res.json();
        setSummary(data.summary || data.message);
      } catch (e) {
        setSummary("Your audit is ready. Review the breakdown below for specific optimization opportunities.");
      } finally {
        setLoading(false);
      }
    }
    fetchSummary();
  }, [auditResult, teamSize, primaryUseCase]);

  return (
    <Card className="border-indigo-100 bg-indigo-50/30 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles className="w-12 h-12 text-indigo-600" />
      </div>
      <CardContent className="p-8 space-y-4">
        <div className="flex items-center space-x-2 text-indigo-600 font-bold text-sm uppercase tracking-widest">
          <Sparkles className="w-4 h-4" />
          <span>AI Audit Summary</span>
        </div>
        {loading ? (
          <div className="space-y-3">
            <div className="h-4 bg-indigo-100 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-indigo-100 rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-indigo-100 rounded animate-pulse w-4/6"></div>
          </div>
        ) : (
          <p className="text-slate-700 leading-relaxed text-lg italic font-medium">
            "{summary}"
          </p>
        )}
      </CardContent>
    </Card>
  );
}
