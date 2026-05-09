import { PRICING_DATA } from './pricingData';
import { v4 as uuidv4 } from 'uuid';

export interface AuditInput {
  teamSize: number;
  primaryUseCase: 'coding' | 'writing' | 'data' | 'research' | 'mixed';
  tools: Array<{
    toolId: string;
    planId: string;
    seats: number;
    currentMonthlySpend: number;
  }>;
}

export interface AuditResult {
  perTool: Array<{
    toolId: string;
    currentMonthlySpend: number;
    recommendedAction: 'keep' | 'downgrade' | 'switch' | 'negotiate';
    recommendedPlan?: string;
    recommendedAlternative?: string;
    monthlySavings: number;
    annualSavings: number;
    reasoning: string;
  }>;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  savingsTier: 'optimal' | 'low' | 'medium' | 'high';
  auditId: string;
  showCredexCTA: boolean;
}

export function runAudit(input: AuditInput): AuditResult {
  const { teamSize, primaryUseCase, tools } = input;
  const results: AuditResult['perTool'] = [];
  let totalMonthlySavings = 0;

  // Track tools for Rule 3 (Duplicate capability)
  const toolIds = new Set(tools.map(t => t.toolId));
  const isCodingTeam = primaryUseCase === 'coding' || primaryUseCase === 'mixed';

  for (const userTool of tools) {
    const pricing = PRICING_DATA[userTool.toolId];
    if (!pricing) continue;

    const currentPlan = pricing.plans[userTool.planId];
    if (!currentPlan) continue;

    let monthlySavings = 0;
    let recommendedAction: 'keep' | 'downgrade' | 'switch' | 'negotiate' = 'keep';
    let recommendedPlan = userTool.planId;
    let recommendedAlternative: string | undefined;
    let reasoning = 'Your plan is well-optimized for your usage.';

    // RULE 1 & 2 — PLAN-SIZE MISMATCH & MIN SEATS
    if (userTool.seats < currentPlan.minSeats) {
      const waste = (currentPlan.minSeats - userTool.seats) * currentPlan.monthlyPricePerSeat;
      monthlySavings = waste;
      recommendedAction = 'negotiate';
      reasoning = `You are paying for the ${currentPlan.minSeats}-seat minimum but only using ${userTool.seats} seats. Waste: $${waste}/mo.`;
    } else if (userTool.seats <= 2 && (userTool.planId === 'team' || userTool.planId === 'business')) {
      // Find a pro/individual plan
      const proPlan = Object.entries(pricing.plans).find(([id, p]) => id === 'pro' || id === 'individual');
      if (proPlan) {
        const potentialSavings = (currentPlan.monthlyPricePerSeat - proPlan[1].monthlyPricePerSeat) * userTool.seats;
        if (potentialSavings > 0) {
          monthlySavings = potentialSavings;
          recommendedAction = 'downgrade';
          recommendedPlan = proPlan[0];
          reasoning = `${currentPlan.planName} plan requires more seats than you have — ${proPlan[1].planName} costs $${proPlan[1].monthlyPricePerSeat} less per seat.`;
        }
      }
    }

    // RULE 3 — DUPLICATE CAPABILITY
    if (userTool.toolId === 'github_copilot' && toolIds.has('cursor') && isCodingTeam) {
      monthlySavings = userTool.currentMonthlySpend;
      recommendedAction = 'switch';
      recommendedAlternative = 'cursor';
      reasoning = `You are using both Cursor and GitHub Copilot. Keeping both doubles cost with minimal marginal benefit for a team of ${teamSize}.`;
    }

    if (userTool.toolId === 'chatgpt' && toolIds.has('claude') && primaryUseCase !== 'mixed') {
      const claudeTool = tools.find(t => t.toolId === 'claude');
      const claudeSpend = claudeTool?.currentMonthlySpend || 0;
      // Trigger if ChatGPT spend is >= Claude spend (arbitrary tie-break)
      if (userTool.currentMonthlySpend >= claudeSpend) {
        const potentialSavings = userTool.currentMonthlySpend;
        if (potentialSavings > monthlySavings) {
          monthlySavings = potentialSavings;
          recommendedAction = 'switch';
          recommendedAlternative = 'claude';
          reasoning = 'Both ChatGPT and Claude serve similar purposes for your use case. Consolidating could save significant overhead.';
        }
      }
    }

    // RULE 4 — API vs SUBSCRIPTION ARBITRAGE
    if (teamSize <= 3 && (primaryUseCase === 'coding' || primaryUseCase === 'data') && !userTool.toolId.includes('api')) {
      const estimatedApiUsage = 1000000; // 1M tokens
      const apiCostEstimate = 10; // Rough average for 1M tokens of mid-tier model
      const currentCostPerSeat = userTool.currentMonthlySpend / userTool.seats;
      // Only recommend if savings are > $10 per seat
      if (currentCostPerSeat - apiCostEstimate > 10) {
        const potentialSavings = (currentCostPerSeat - apiCostEstimate) * userTool.seats;
        if (potentialSavings > monthlySavings) {
          monthlySavings = potentialSavings;
          recommendedAction = 'switch';
          recommendedAlternative = userTool.toolId === 'cursor' ? 'anthropic_api' : 'openai_api';
          reasoning = `For small teams, direct API usage often costs <$10/user for heavy usage compared to $${currentCostPerSeat}/seat subscriptions.`;
        }
      }
    }

    // RULE 5 — OVERPAYING FOR UNUSED TIERS
    const expectedSpend = currentPlan.monthlyPricePerSeat * userTool.seats;
    if (userTool.currentMonthlySpend > expectedSpend * 1.15) {
      const waste = userTool.currentMonthlySpend - expectedSpend;
      if (waste > monthlySavings) {
        monthlySavings = waste;
        recommendedAction = 'negotiate';
        reasoning = `Your spend is ${Math.round((userTool.currentMonthlySpend / expectedSpend - 1) * 100)}% higher than the listed price. You may be on an upsold tier.`;
      }
    }

    // RULE 6 — USE CASE FIT
    if (primaryUseCase === 'coding' && userTool.toolId === 'claude' && !toolIds.has('cursor')) {
      reasoning = 'Claude Pro is great, but for a coding-first team, an AI-native IDE like Cursor might provide better ROI.';
    }
    if (primaryUseCase === 'writing' && userTool.toolId === 'cursor') {
      reasoning = 'Cursor is specialized for coding; writing-focused teams may find better value in Claude or ChatGPT.';
    }

    results.push({
      toolId: userTool.toolId,
      currentMonthlySpend: userTool.currentMonthlySpend,
      recommendedAction,
      recommendedPlan,
      recommendedAlternative,
      monthlySavings,
      annualSavings: monthlySavings * 12,
      reasoning
    });

    totalMonthlySavings += monthlySavings;
  }

  // Savings Tier
  let savingsTier: AuditResult['savingsTier'] = 'optimal';
  if (totalMonthlySavings > 2000) savingsTier = 'high';
  else if (totalMonthlySavings > 500) savingsTier = 'medium';
  else if (totalMonthlySavings > 100) savingsTier = 'low';

  return {
    perTool: results,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    savingsTier,
    auditId: uuidv4(),
    showCredexCTA: totalMonthlySavings > 500
  };
}
