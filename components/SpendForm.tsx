'use client';

import React, { useState, useEffect } from 'react';
import { PRICING_DATA } from '@/lib/pricingData';
import { AuditInput } from '@/lib/auditEngine';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ChevronLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const STORAGE_KEY = 'credex_audit_draft';

export default function SpendForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<AuditInput & { selectedTools: string[] }>({
    teamSize: 10,
    primaryUseCase: 'coding',
    selectedTools: [],
    tools: []
  });

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load draft', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleToolToggle = (toolId: string) => {
    setFormData(prev => {
      const isSelected = prev.selectedTools.includes(toolId);
      let newSelected = isSelected 
        ? prev.selectedTools.filter(id => id !== toolId)
        : [...prev.selectedTools, toolId];
      
      let newTools = prev.tools;
      if (!isSelected) {
        // Add default tool config
        const pricing = PRICING_DATA[toolId];
        const defaultPlan = Object.keys(pricing.plans)[0];
        newTools = [...prev.tools, {
          toolId,
          planId: defaultPlan,
          seats: prev.teamSize,
          currentMonthlySpend: pricing.plans[defaultPlan].monthlyPricePerSeat * prev.teamSize
        }];
      } else {
        newTools = prev.tools.filter(t => t.toolId !== toolId);
      }

      return { ...prev, selectedTools: newSelected, tools: newTools };
    });
  };

  const updateToolData = (toolId: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      tools: prev.tools.map(t => t.toolId === toolId ? { ...t, [field]: value } : t)
    }));
  };

  const handleSubmit = async () => {
    if (formData.tools.length === 0) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.auditId) {
        // Fallback for demo: Save to localStorage in case Supabase is not configured
        localStorage.setItem(`audit_result_${data.auditId}`, JSON.stringify({
          result: data.result,
          input: formData,
          timestamp: Date.now()
        }));
        localStorage.removeItem(STORAGE_KEY);
        router.push(`/audit/${data.auditId}`);
      }
    } catch (e) {
      console.error('Audit failed', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium text-slate-500">
          <span>Step {step} of 3</span>
          <span>{Math.round((step / 3) * 100)}% Complete</span>
        </div>
        <Progress value={(step / 3) * 100} className="h-2" />
      </div>

      {step === 1 && (
        <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Tell us about your team</CardTitle>
            <CardDescription>We'll use this to benchmark your spend against similar companies.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="teamSize" className="text-base font-semibold">How many people are in your team?</Label>
              <Input
                id="teamSize"
                type="number"
                min={1}
                max={500}
                value={formData.teamSize}
                onChange={(e) => setFormData({ ...formData, teamSize: parseInt(e.target.value) || 1 })}
                className="text-lg h-12"
              />
            </div>
            <div className="space-y-4">
              <Label className="text-base font-semibold">What is your primary AI use case?</Label>
              <RadioGroup
                value={formData.primaryUseCase}
                onValueChange={(v: any) => setFormData({ ...formData, primaryUseCase: v })}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {['coding', 'writing', 'data', 'research', 'mixed'].map((useCase) => (
                  <Label
                    key={useCase}
                    className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-slate-50 ${
                      formData.primaryUseCase === useCase ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200'
                    }`}
                  >
                    <RadioGroupItem value={useCase} id={useCase} />
                    <span className="capitalize text-sm font-medium">{useCase}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>
            <Button onClick={nextStep} className="w-full h-12 text-lg bg-indigo-600 hover:bg-indigo-700">
              Continue <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.values(PRICING_DATA).map((tool) => (
              <Card 
                key={tool.toolId}
                className={`cursor-pointer transition-all border-2 ${
                  formData.selectedTools.includes(tool.toolId) ? 'border-indigo-600 ring-2 ring-indigo-100' : 'border-slate-200'
                }`}
                onClick={() => handleToolToggle(tool.toolId)}
              >
                <CardHeader className="p-4 flex flex-row items-center space-x-3 space-y-0">
                  <Checkbox 
                    checked={formData.selectedTools.includes(tool.toolId)}
                    onCheckedChange={() => handleToolToggle(tool.toolId)}
                  />
                  <CardTitle className="text-lg">{tool.toolName}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>

          {formData.tools.map((t) => {
            const pricing = PRICING_DATA[t.toolId];
            return (
              <Card key={t.toolId} className="border-slate-200">
                <CardHeader className="bg-slate-50/50">
                  <CardTitle className="text-lg flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-indigo-600" />
                    Configure {pricing.toolName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Plan</Label>
                    <Select
                      value={t.planId}
                      onValueChange={(v) => {
                        const newPlan = pricing.plans[v];
                        updateToolData(t.toolId, 'planId', v);
                        updateToolData(t.toolId, 'currentMonthlySpend', newPlan.monthlyPricePerSeat * t.seats);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(pricing.plans).map(([id, p]) => (
                          <SelectItem key={id} value={id}>
                            {p.planName} (${p.monthlyPricePerSeat}/mo)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Seats</Label>
                    <Input
                      type="number"
                      value={t.seats}
                      onChange={(e) => updateToolData(t.toolId, 'seats', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Current Monthly Spend ($)</Label>
                    <Input
                      type="number"
                      value={t.currentMonthlySpend}
                      onChange={(e) => updateToolData(t.toolId, 'currentMonthlySpend', parseInt(e.target.value) || 0)}
                    />
                    <p className="text-[10px] text-slate-400">List price: ${pricing.plans[t.planId].monthlyPricePerSeat}/seat</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          <div className="flex space-x-4">
            <Button variant="outline" onClick={prevStep} className="flex-1 h-12">
              <ChevronLeft className="mr-2 h-5 w-5" /> Back
            </Button>
            <Button 
              onClick={nextStep} 
              disabled={formData.tools.length === 0}
              className="flex-[2] h-12 bg-indigo-600 hover:bg-indigo-700"
            >
              Review Audit <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Review your inputs</CardTitle>
            <CardDescription>Verify everything is correct before we run the engine.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Team Size</p>
                <p className="text-lg font-semibold">{formData.teamSize}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Use Case</p>
                <p className="text-lg font-semibold capitalize">{formData.primaryUseCase}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Tool Summary</p>
              {formData.tools.map(t => (
                <div key={t.toolId} className="flex justify-between items-center p-3 rounded-lg border border-slate-100 bg-white">
                  <div>
                    <p className="font-semibold">{PRICING_DATA[t.toolId].toolName}</p>
                    <p className="text-xs text-slate-500">{t.seats} seats on {PRICING_DATA[t.toolId].plans[t.planId].planName}</p>
                  </div>
                  <p className="font-mono font-bold">${t.currentMonthlySpend}/mo</p>
                </div>
              ))}
              <div className="flex justify-between items-center p-4 rounded-xl bg-indigo-600 text-white shadow-lg">
                <span className="font-bold">Total Monthly Spend</span>
                <span className="text-2xl font-black">${formData.tools.reduce((acc, t) => acc + t.currentMonthlySpend, 0)}</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={prevStep} className="flex-1 h-12" disabled={isSubmitting}>
                <ChevronLeft className="mr-2 h-5 w-5" /> Back
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="flex-[2] h-12 bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 shadow-lg"
              >
                {isSubmitting ? (
                  <>Running Audit <Loader2 className="ml-2 h-5 w-5 animate-spin" /></>
                ) : (
                  <>Run My Audit <ChevronRight className="ml-2 h-5 w-5" /></>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
