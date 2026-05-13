/* eslint-disable */
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check, Share2 } from 'lucide-react';

export default function ShareBar({ auditId, totalMonthlySavings }: { auditId: string, totalMonthlySavings: number }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/audit/${auditId}` : '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnX = () => {
    const text = `I just audited my team's AI tool spend with @SpendShift and found $${totalMonthlySavings}/month in savings. Check yours (free):`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] px-6 py-4 flex items-center justify-between z-50">
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-600">Share your audit results</span>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => window.print()}
            className="hidden md:flex items-center gap-2 border border-slate-200 rounded-lg px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all btn-hover"
          >
            Download PDF
          </button>

          <button 
            onClick={copyToClipboard}
            className="flex items-center gap-2 border border-slate-200 rounded-lg px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all btn-hover active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied! ✓" : "Copy Link"}
          </button>

          <button 
            onClick={shareOnX}
            className="flex items-center gap-2 bg-black text-white rounded-lg px-4 py-2 text-sm font-bold hover:bg-slate-900 transition-all btn-hover active:scale-95 shadow-lg"
          >
            <Share2 className="w-4 h-4 fill-white" />
            Share results
          </button>
        </div>
      </div>
    </div>
  );
}
