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
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'spendshift_audit_draft';

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
      tools: prev.tools.map(t => {
        if (t.toolId !== toolId) return t;
        const newTool = { ...t, [field]: value };
        
        // Auto-recalculate spend if seats or plan changes
        if (field === 'seats' || field === 'planId') {
          const pricing = PRICING_DATA[toolId];
          const plan = pricing.plans[newTool.planId];
          newTool.currentMonthlySpend = Number((plan.monthlyPricePerSeat * newTool.seats).toFixed(2));
        }
        
        return newTool;
      })
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
    <div className="w-full space-y-10">
      {/* Progress & Indicators */}
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-1.5">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={cn(
                "transition-all duration-300 rounded-full",
                step === s ? "w-6 h-2.5 bg-[#4F46E5]" : "w-2.5 h-2.5 bg-slate-200"
              )}
            />
          ))}
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
            <span>Progress</span>
            <span>{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="h-1 bg-slate-100 rounded-full w-full overflow-hidden">
            <div 
              className="h-1 bg-[#4F46E5] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {step === 1 && (
        <Card className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_32px_rgba(79,70,229,0.08)] p-8 sm:p-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Team Profile</h2>
            <p className="text-sm text-slate-400">We'll use this to benchmark your spend against similar companies.</p>
          </div>
          <div className="space-y-8">
            <div className="space-y-2">
              <label htmlFor="teamSize" className="block text-sm font-semibold text-slate-700">Team Size</label>
              <input
                id="teamSize"
                type="number"
                min={1}
                max={500}
                value={formData.teamSize}
                onChange={(e) => setFormData({ ...formData, teamSize: parseInt(e.target.value) || 1 })}
                className="w-full h-11 px-4 border border-slate-200 rounded-lg text-base text-slate-900 focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] outline-none transition-all"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-700">Primary AI Use Case</label>
              <div className="grid grid-cols-2 gap-3">
                {['coding', 'writing', 'data', 'research'].map((useCase) => (
                  <label 
                    key={useCase}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3.5 border border-slate-200 rounded-xl cursor-pointer transition-all duration-150 hover:border-[#4F46E5] hover:bg-indigo-50/50",
                      formData.primaryUseCase === useCase ? "border-[#4F46E5] bg-indigo-50 shadow-[0_0_0_1px_#4F46E5]" : ""
                    )}
                  >
                    <input 
                      type="radio" 
                      name="useCase"
                      className="w-4 h-4 accent-[#4F46E5] flex-shrink-0"
                      checked={formData.primaryUseCase === useCase}
                      onChange={() => setFormData(prev => ({ ...prev, primaryUseCase: useCase as any }))}
                    />
                    <span className="text-sm font-medium text-slate-700 leading-none capitalize">{useCase}</span>
                  </label>
                ))}
                <label 
                  className={cn(
                    "col-span-2 flex items-center gap-3 px-4 py-3.5 border border-slate-200 rounded-xl cursor-pointer transition-all duration-150 hover:border-[#4F46E5] hover:bg-indigo-50/50",
                    formData.primaryUseCase === 'mixed' ? "border-[#4F46E5] bg-indigo-50 shadow-[0_0_0_1px_#4F46E5]" : ""
                  )}
                >
                  <input 
                    type="radio" 
                    name="useCase"
                    className="w-4 h-4 accent-[#4F46E5] flex-shrink-0"
                    checked={formData.primaryUseCase === 'mixed'}
                    onChange={() => setFormData(prev => ({ ...prev, primaryUseCase: 'mixed' }))}
                  />
                  <span className="text-sm font-medium text-slate-700 leading-none capitalize">Mixed Use / General</span>
                </label>
              </div>
            </div>
            <button 
              onClick={nextStep} 
              className="w-full h-12 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold text-base rounded-xl btn-hover flex items-center justify-center gap-2 mt-6 shadow-[0_4px_12px_rgba(79,70,229,0.3)]"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.values(PRICING_DATA).map((tool) => (
              <div 
                key={tool.toolId}
                className={cn(
                  "p-4 rounded-xl border transition-all cursor-pointer flex items-center space-x-3",
                  formData.selectedTools.includes(tool.toolId) 
                    ? "border-[#4F46E5] bg-indigo-50 shadow-[0_0_0_1px_#4F46E5]" 
                    : "border-slate-200 bg-white hover:border-[#4F46E5]"
                )}
                onClick={() => handleToolToggle(tool.toolId)}
              >
                <Checkbox 
                  checked={formData.selectedTools.includes(tool.toolId)}
                  onCheckedChange={() => handleToolToggle(tool.toolId)}
                  className="accent-[#4F46E5]"
                />
                <span className="text-sm font-semibold text-slate-700">{tool.toolName}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {formData.tools.map((t) => {
              const pricing = PRICING_DATA[t.toolId];
              return (
                <div key={t.toolId} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-[#4F46E5]" />
                    <h3 className="font-bold text-slate-900 text-base">Configure {pricing.toolName}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2 min-w-0">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 h-4 flex items-center">Plan</Label>
                      <Select
                        value={t.planId}
                        onValueChange={(v) => updateToolData(t.toolId, 'planId', v)}
                      >
                        <SelectTrigger className="h-10 border-slate-200 focus:ring-2 focus:ring-[#4F46E5] w-full truncate">
                          <SelectValue className="truncate" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(pricing.plans).map(([id, p]) => (
                            <SelectItem key={id} value={id}>
                              {p.planName} (${p.monthlyPricePerSeat})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 min-w-0">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 h-4 flex items-center">Seats</Label>
                      <Input
                        type="number"
                        value={t.seats}
                        onChange={(e) => updateToolData(t.toolId, 'seats', parseInt(e.target.value) || 0)}
                        className="h-10 border-slate-200 focus:ring-2 focus:ring-[#4F46E5]"
                      />
                    </div>
                    <div className="space-y-2 min-w-0">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 h-4 flex items-center whitespace-nowrap">Monthly Spend ($)</Label>
                      <Input
                        type="number"
                        value={t.currentMonthlySpend}
                        onChange={(e) => updateToolData(t.toolId, 'currentMonthlySpend', parseInt(e.target.value) || 0)}
                        className="h-10 border-slate-200 focus:ring-2 focus:ring-[#4F46E5]"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-4 pt-4">
            <button onClick={prevStep} className="flex-1 h-12 border border-slate-200 rounded-xl font-semibold text-slate-600 btn-hover flex items-center justify-center gap-2">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button 
              onClick={nextStep} 
              disabled={formData.tools.length === 0}
              className="flex-[2] h-12 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold rounded-xl btn-hover flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(79,70,229,0.3)] disabled:opacity-50"
            >
              Review Audit <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <Card className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_32px_rgba(79,70,229,0.08)] p-8 sm:p-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Final Review</h2>
            <p className="text-sm text-slate-400">Verify everything is correct before we run the engine.</p>
          </div>
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Team Size</p>
                <p className="text-xl font-bold text-slate-900">{formData.teamSize}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Use Case</p>
                <p className="text-xl font-bold text-[#4F46E5] capitalize">{formData.primaryUseCase}</p>
              </div>
            </div>

            <div className="space-y-3">
              {formData.tools.map(t => (
                <div key={t.toolId} className="flex justify-between items-center p-4 rounded-xl border border-slate-100 bg-white">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{PRICING_DATA[t.toolId].toolName}</p>
                    <p className="text-xs font-medium text-slate-500">{t.seats} seats · {PRICING_DATA[t.toolId].plans[t.planId].planName}</p>
                  </div>
                  <p className="text-base font-bold text-slate-900">${t.currentMonthlySpend}</p>
                </div>
              ))}
              <div className="flex justify-between items-center p-6 rounded-2xl bg-slate-900 text-white shadow-xl mt-6">
                <span className="font-semibold text-slate-400 text-sm">Total Monthly Spend</span>
                <span className="text-2xl font-bold">${formData.tools.reduce((acc, t) => acc + t.currentMonthlySpend, 0)}</span>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button onClick={prevStep} className="flex-1 h-12 border border-slate-200 rounded-xl font-semibold text-slate-600 btn-hover flex items-center justify-center gap-2" disabled={isSubmitting}>
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="flex-[2] h-12 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold rounded-xl btn-hover flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(79,70,229,0.3)]"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>Run My Audit <ChevronRight className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
