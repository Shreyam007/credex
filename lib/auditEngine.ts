/* eslint-disable */
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
  benchmarkDiff: number; // Percentage above/below industry average
}

// Groupings for redundancy checks
const CATEGORIES: Record<string, string[]> = {
  'coding_assistant': ['cursor', 'github_copilot', 'windsurf'],
  'general_chat': ['claude', 'chatgpt', 'gemini']
};

export function runAudit(input: AuditInput): AuditResult {
  const { teamSize, primaryUseCase, tools } = input;
  const results: AuditResult['perTool'] = [];
  let totalMonthlySavings = 0;

  const toolIds = new Set(tools.map(t => t.toolId));
  const isCodingTeam = primaryUseCase === 'coding' || primaryUseCase === 'mixed';

  // Sort tools by spend to identify "primary" vs "redundant" ones in a group
  const sortedTools = [...tools].sort((a, b) => b.currentMonthlySpend - a.currentMonthlySpend);
  const processedRedundancy = new Set<string>();

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

    // 1. OVER-SEATING CHECK (Critical Edge Case)
    if (userTool.seats > teamSize * 1.1) { // Allow 10% buffer for freelancers/contractors
      const excessSeats = userTool.seats - teamSize;
      const potentialSavings = excessSeats * currentPlan.monthlyPricePerSeat;
      if (potentialSavings > 0) {
        monthlySavings = potentialSavings;
        recommendedAction = 'downgrade';
        reasoning = `You have ${userTool.seats} seats for a team of ${teamSize}. Cutting ${excessSeats} unused seats would save $${potentialSavings}/mo.`;
      }
    }

    // 2. MIN SEATS WASTAGE
    if (userTool.seats < currentPlan.minSeats && recommendedAction === 'keep') {
      const waste = (currentPlan.minSeats - userTool.seats) * currentPlan.monthlyPricePerSeat;
      monthlySavings = waste;
      recommendedAction = 'negotiate';
      reasoning = `You are paying for the ${currentPlan.minSeats}-seat minimum but only using ${userTool.seats} seats. Negotiate or switch to Individual plans.`;
    }

    // 3. CROSS-TOOL REDUNDANCY (The "Consolidation" Logic)
    for (const [category, toolList] of Object.entries(CATEGORIES)) {
      if (toolList.includes(userTool.toolId)) {
        // Find other tools in the same category
        const others = tools.filter(t => t.toolId !== userTool.toolId && toolList.includes(t.toolId));
        
        if (others.length > 0) {
          // Identify the most expensive tool in this category as the "Primary"
          const primaryInGroup = sortedTools.find(t => toolList.includes(t.toolId));
          
          if (userTool.toolId !== primaryInGroup?.toolId) {
            const potentialSavings = userTool.currentMonthlySpend;
            if (potentialSavings > monthlySavings) {
              monthlySavings = potentialSavings;
              recommendedAction = 'switch';
              recommendedAlternative = primaryInGroup?.toolId;
              reasoning = `Your stack has redundant capability in the '${category}' category. We recommend consolidating ${pricing.toolName} into ${PRICING_DATA[primaryInGroup!.toolId].toolName}.`;
            }
          }
        }
      }
    }

    // 4. API vs SUBSCRIPTION ARBITRAGE (For very small teams)
    if (teamSize <= 3 && isCodingTeam && !userTool.toolId.includes('api') && recommendedAction === 'keep') {
      const apiCostEstimate = 8; // Avg monthly API cost for light team use
      const currentCostPerSeat = userTool.currentMonthlySpend / userTool.seats;
      if (currentCostPerSeat > 25) { // If paying >$25/seat, API is much cheaper
        const potentialSavings = (currentCostPerSeat - apiCostEstimate) * userTool.seats;
        if (potentialSavings > monthlySavings) {
          monthlySavings = potentialSavings;
          recommendedAction = 'switch';
          recommendedAlternative = userTool.toolId === 'cursor' ? 'anthropic_api' : 'openai_api';
          reasoning = `Small teams (3 or less) often save 60%+ by using direct APIs via tools like Continue.dev or Aider instead of seat-based subscriptions.`;
        }
      }
    }

    // 5. USE CASE FIT
    if (primaryUseCase === 'coding' && userTool.toolId === 'claude' && !toolIds.has('cursor') && recommendedAction === 'keep') {
      reasoning = 'Excellent tool, but for coding-specific teams, Cursor or Copilot often provide higher direct ROI for the same price.';
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

  // BENCHMARK CALCULATION
  const totalSpend = tools.reduce((acc, t) => acc + t.currentMonthlySpend, 0);
  const spendPerDev = totalSpend / teamSize;
  const getBenchmark = (size: number) => {
    if (size <= 5) return 85;
    if (size <= 20) return 67;
    if (size <= 50) return 54;
    return 48;
  };
  const industryAvg = getBenchmark(teamSize);
  const benchmarkDiff = Math.round(((spendPerDev / industryAvg) - 1) * 100);

  // Savings Tier
  let savingsTier: AuditResult['savingsTier'] = 'optimal';
  if (totalMonthlySavings > 2000 || benchmarkDiff > 100) savingsTier = 'high';
  else if (totalMonthlySavings > 500 || benchmarkDiff > 40) savingsTier = 'medium';
  else if (totalMonthlySavings > 100 || benchmarkDiff > 10) savingsTier = 'low';

  return {
    perTool: results,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    savingsTier,
    auditId: uuidv4(),
    showCredexCTA: totalMonthlySavings > 300 || benchmarkDiff > 30,
    benchmarkDiff
  };
}
