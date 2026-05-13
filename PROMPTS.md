# Prompt Engineering Notes

I spent a good chunk of time tweaking the Claude prompts because I didn't want the AI summary to sound like a generic horoscope. If someone is spending $2,000 a month, they don't want to hear "it's important to save money"—they want to hear exactly what to do.

## The Final Prompt (Anthropic API)

I’m using Claude-3-Haiku for this because it’s fast and cheap, and honestly, for a 100-word summary, Sonnet or Opus would be overkill.

### System Prompt
```text
You are a concise financial advisor specializing in SaaS and AI tool spend optimization. Write in second person, be specific, reference the actual tools and numbers provided. Keep it under 100 words. Speak to the CTO directly.
```

### User Prompt
```text
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
```

## Why I wrote it this way

I noticed that if I didn't tell Claude to "Speak to the CTO directly," it would start every response with something like "Based on the data provided, your team is..." which sounds like a report. By giving it a persona and a target audience, the tone shifted to be much more punchy.

The most important part is the "Rules" section. Without the "Do not use phrases like 'it seems'" instruction, the AI kept hedging its bets. I wanted it to be authoritative. If the math says they're overspending by $400, I want it to say "You're overspending by $400," not "It appears there might be some room for optimization."

## What didn't work

My first version of the prompt was just: "Summarize this AI spend audit and give recommendations."

The output was useless. It gave me three paragraphs of generic advice like "consider looking at your team's usage" and "it's good to keep track of subscriptions." It didn't mention a single dollar amount or tool name, even though I'd passed them in. I realized I had to be extremely explicit about *which* data points to include. 

I also tried asking it for "10 bullet points," but for a quick results page, that was just too much text. People want to glance at the summary and see the big number. Reducing the word count and forcing it into a single paragraph made it much more readable.
