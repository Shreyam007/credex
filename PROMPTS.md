# AI Prompts Audit

## Summary Generation Prompt (Anthropic Claude-3-Haiku)

### System Prompt
```
You are a concise financial advisor specializing in SaaS and AI tool spend optimization. 
Write in second person, be specific, reference the actual tools and numbers provided. 
Keep it under 100 words.
```

### User Prompt Template
```
Write a 90-100 word personalized audit summary for a team of {teamSize} whose primary 
use case is {primaryUseCase}. They are currently spending ${totalSpend}/month on AI tools. 
The audit found ${totalMonthlySavings}/month in potential savings. 
Key findings: {perToolSummary}. 
Be direct, specific, and end with one actionable next step.
```

### Iteration Log
- **V1:** Too generic, didn't use the numbers effectively.
- **V2:** Added "concise financial advisor" persona — much better.
- **V3 (Current):** Forced word count and "second person" for a more direct feel.

### Reasoning
We chose Haiku because the task is simple (summarization) and requires low latency/cost for a free tool.
