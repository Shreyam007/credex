'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mail, Check, Loader2 } from 'lucide-react';

export default function LeadCapture({ auditId, savingsTier, totalMonthlySavings }: any) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auditId, email }),
      });
      setSubmitted(true);
    } catch (e) {
      console.error('Lead capture failed', e);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Card className="border-green-100 bg-green-50/30">
        <CardContent className="p-8 text-center space-y-4">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white shadow-lg shadow-green-200">
            <Check className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Audit report sent!</h3>
          <p className="text-slate-600">Check your inbox for the full breakdown and future optimization alerts.</p>
        </CardContent>
      </Card>
    );
  }

  const title = totalMonthlySavings > 100 
    ? "Get this report in your inbox" 
    : "Your stack looks great!";
  const description = totalMonthlySavings > 100
    ? "We'll send you the full breakdown + flag new savings opportunities as they arise."
    : "We'll notify you when better options or discounts match your setup.";

  return (
    <Card className="border-indigo-600 border-2 shadow-xl shadow-indigo-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="text-slate-500">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                id="email"
                type="email"
                placeholder="founder@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>
          {/* Honeypot */}
          <div className="hidden">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <Button type="submit" disabled={loading} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-lg font-bold">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send My Audit →"}
          </Button>
          <p className="text-[10px] text-center text-slate-400">
            By clicking, you agree to receive AI spend optimization alerts. No spam, ever.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
