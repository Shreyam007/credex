'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, X, Check } from 'lucide-react';

export default function ShareBar({ auditId }: { auditId: string }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/audit/${auditId}` : '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    const text = "I just audited my AI spend with SpendShift and found potential savings! Check yours here:";
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-slate-900 text-white rounded-full px-6 py-3 shadow-2xl flex items-center space-x-4 border border-slate-700 backdrop-blur-md bg-opacity-90">
        <span className="text-sm font-bold tracking-tight">Share your audit</span>
        <div className="h-4 w-px bg-slate-700"></div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={copyToClipboard}
            className="hover:bg-slate-800 text-white gap-2 h-8"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied" : "Copy Link"}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={shareOnTwitter}
            className="hover:bg-slate-800 text-white gap-2 h-8"
          >
            <X className="w-4 h-4 fill-sky-400 text-sky-400" />
            Tweet
          </Button>
        </div>
      </div>
    </div>
  );
}
