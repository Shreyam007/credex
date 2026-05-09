import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'sk-ant-placeholder',
});

export async function POST(req: NextRequest) {
  try {
    const { auditResult, teamSize, primaryUseCase } = await req.json();

    const totalSpend = auditResult.perTool.reduce((acc: number, t: any) => acc + t.currentMonthlySpend, 0);
    const totalMonthlySavings = auditResult.totalMonthlySavings;
    const perToolSummary = auditResult.perTool
      .map((t: any) => `${t.toolId}: ${t.recommendedAction} to save $${t.monthlySavings}/mo`)
      .join(', ');

    const systemPrompt = "You are a concise financial advisor specializing in SaaS and AI tool spend optimization. Write in second person, be specific, reference the actual tools and numbers provided. Keep it under 100 words.";
    const userPrompt = `Write a 90-100 word personalized audit summary for a team of ${teamSize} whose primary use case is ${primaryUseCase}. They are currently spending $${totalSpend}/month on AI tools. The audit found $${totalMonthlySavings}/month in potential savings. Key findings: ${perToolSummary}. Be direct, specific, and end with one actionable next step.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 200,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const summary = response.content[0].type === 'text' ? response.content[0].text : null;

    return NextResponse.json({ summary });
  } catch (e) {
    console.error('Anthropic API error:', e);
    // Silent fallback
    return NextResponse.json({ 
      summary: null, 
      fallback: true,
      message: "Your AI spend audit is ready. We've identified several opportunities to optimize your seat counts and eliminate redundant tool usage. Review the breakdown below for specific plan changes that could save you significantly each month." 
    });
  }
}
