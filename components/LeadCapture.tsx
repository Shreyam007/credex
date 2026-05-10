'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mail, Check, Loader2, Copy } from 'lucide-react';

export default function LeadCapture({ auditId, savingsTier, totalMonthlySavings }: any) {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const referralLink = typeof window !== 'undefined' ? `${window.location.origin}?ref=${auditId.slice(0, 6)}` : '';

  const copyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          auditId, 
          email, 
          companyName, 
          role,
          totalMonthlySavings,
          referralCode
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email');
      }
      
      setSubmitted(true);
    } catch (err: any) {
      console.error('Lead capture failed', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-12 text-center bg-white border border-slate-100 rounded-3xl space-y-6 shadow-sm">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 mb-2">
            <Check className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Check your inbox!</h3>
          <p className="text-green-600 font-semibold text-lg italic">Your audit summary is on its way.</p>
        </div>

        <div className="pt-8 border-t border-slate-100 space-y-4">
          <p className="text-sm font-medium text-slate-500">
            Share your unique link and both of you get early access to new features:
          </p>
          <div className="flex items-center gap-2 max-w-sm mx-auto">
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex-1 text-sm font-mono text-slate-600 truncate">
              {referralLink}
            </div>
            <button 
              onClick={copyReferral}
              className="bg-slate-900 text-white p-3 rounded-xl hover:bg-slate-800 transition-colors"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isOptimal = totalMonthlySavings <= 100;
  const title = !isOptimal ? "Get This Report in Your Inbox" : "Stay Ahead of AI Pricing Changes";
  const description = !isOptimal 
    ? "We'll also flag new savings opportunities the moment they appear for your stack."
    : "Your stack is optimized today. We'll notify you the moment a better option appears for your tools.";
  
  const buttonLabel = !isOptimal ? "Email Me This Report →" : "Notify Me of Better Deals →";

  return (
    <Card className="border-indigo-600 border-2 shadow-2xl shadow-indigo-100/50 rounded-3xl overflow-hidden">
      <CardHeader className="bg-slate-50/50 p-8 border-b border-slate-100">
        <CardTitle className="text-3xl font-extrabold text-slate-900 tracking-tight">{title}</CardTitle>
        <CardDescription className="text-slate-500 text-lg font-medium mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address*</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <Input
                  id="email"
                  type="email"
                  placeholder="founder@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-14 text-lg font-medium border-slate-200 focus:border-indigo-500 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-xs font-bold uppercase tracking-widest text-slate-400">Company Name</Label>
              <Input
                id="company"
                placeholder="Acme Inc."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="h-14 text-lg font-medium border-slate-200 focus:border-indigo-500 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-xs font-bold uppercase tracking-widest text-slate-400">Your Role</Label>
              <Input
                id="role"
                placeholder="CTO / Founder"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="h-14 text-lg font-medium border-slate-200 focus:border-indigo-500 rounded-xl"
              />
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label htmlFor="referral" className="text-xs font-bold uppercase tracking-widest text-slate-400">Referral Code (Optional)</Label>
              <Input
                id="referral"
                placeholder="REF-12345"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className="h-14 text-lg font-medium border-slate-200 focus:border-indigo-500 rounded-xl"
              />
            </div>
          </div>

          {/* Honeypot */}
          <div className="hidden">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-bold">
              {error}
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full h-14 bg-[#4F46E5] hover:bg-[#4338CA] text-xl font-bold rounded-xl shadow-lg shadow-indigo-200 btn-hover">
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : buttonLabel}
          </Button>
          
          <p className="text-[11px] text-center text-slate-400 font-medium leading-relaxed">
            By clicking, you agree to receive AI spend optimization alerts. <br/>
            Your data is never sold to third parties. Secure and private.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
