# SpendShift: AI Spend Audit Tool

SpendShift is a high-conversion, production-ready web application designed to help startups and engineering teams optimize their AI tool spend. It provides instant, finance-literate audits of tools like Cursor, GitHub Copilot, Claude, and more.

## Quick Start

1.  **Clone the repo**
2.  **Install dependencies:** `npm install`
3.  **Setup environment:** Copy `.env.example` to `.env.local` and fill in the keys.
4.  **Run migrations:** Execute `schema.sql` in your Supabase SQL Editor.
5.  **Start development:** `npm run dev`
6.  **Run tests:** `npm run test`

## Key Features

- **Multi-step Audit Engine:** 8 proprietary rules to identify waste, redundancy, and arbitrage opportunities.
- **AI Summary Generation:** Personalized summaries using Anthropic's Claude 3 Haiku.
- **Lead Capture:** Seamlessly collect leads with transactional email confirmations via Resend.
- **Shareable Reports:** Publicly accessible, SEO-optimized audit results.

## Trade-off Decisions

1.  **Stateless Audit Logic:** Chose to keep audit rules purely functional in `auditEngine.ts` rather than DB-driven. This enables rapid unit testing and zero-latency results, accepting that rule updates require a redeploy.
2.  **In-Memory Rate Limiting:** Implemented a Map-based limiter for the lead capture API to maintain zero external dependencies (like Redis) during the MVP phase, prioritizing simplicity and deployment speed.
3.  **Model Selection (Haiku):** Opted for Claude 3 Haiku for summary generation. The ultra-low latency was prioritized over the higher reasoning of Sonnet/Opus, as the input data is already structured and highly predictable.
4.  **Optimistic Client Recalculations:** The SpendForm recalculates estimated spend in real-time as users type. This creates a highly responsive "calculator" experience that increases conversion compared to a static form.
5.  **Fixed-Bucket Benchmarking:** Used hardcoded industry spend averages based on team size cohorts rather than live global averages. This provides instant psychological "anchoring" for the user without the overhead of a large data science pipeline.

## Deployed URL
Live Demo: [https://spendshift.vercel.app](https://spendshift.vercel.app)

## Screenshots / Demo
![SpendShift Hero](/public/screenshots/step1-form-final.png)
*Figure 1: High-fidelity audit input form with real-time recalculations.*

[View the full "How It Works" guide](https://spendshift.vercel.app/how-it-works)

