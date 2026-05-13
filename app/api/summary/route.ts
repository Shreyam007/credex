/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';

import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'sk-ant-placeholder',
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { auditResult, teamSize, primaryUseCase, totalMonthlySpend, totalMonthlySavings, perTool } = body;

    const topSavings = perTool
      .filter((t: any) => t.monthlySavings > 0)
      .sort((a: any, b: any) => b.monthlySavings - a.monthlySavings)
      .slice(0, 3)
      .map((t: any) => `${t.toolId}: ${t.reasoning}`)
      .join('; ');

    const systemPrompt = "You are a concise financial advisor specializing in SaaS and AI tool spend optimization. Write in second person, be specific, reference the actual tools and numbers provided. Keep it under 100 words. Speak to the CTO directly.";
    
    const userPrompt = `
    Write a 90-100 word personalized audit summary for:
    - Team size: ${teamSize} people
    - Primary use case: ${primaryUseCase}
    - Current monthly AI spend: $${totalMonthlySpend}
    - Potential monthly savings found: $${totalMonthlySavings}
    - Top findings: ${topSavings || 'Stack is well optimized'}
    
    Rules:
    - Reference actual dollar amounts and tool names
    - Be direct, not fluffy
    - If savings > 0: end with one specific next step
    - If savings = 0: acknowledge good procurement discipline
    - Do not use phrases like "it seems" or "I noticed"
    - Write as if speaking to the CTO directly
    `;

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 300,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const summary = response.content[0].type === 'text' ? response.content[0].text : null;

    return NextResponse.json({ summary, fallback: false });
  } catch (e) {
    console.error('Anthropic API error:', e);
    // SILENT fallback
    return NextResponse.json({ 
      summary: null, 
      fallback: true 
    });
  }
}
