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

1.  **Framework:** Next.js App Router for server-side metadata and optimal performance.
2.  **Styling:** Tailwind CSS + shadcn/ui for rapid, professional component development.
3.  **Database:** Supabase for rapid iteration with built-in RLS and service role security.
4.  **AI Model:** Claude 3 Haiku for the perfect balance of cost-efficiency and summary quality.
5.  **State Management:** LocalStorage for draft persistence to prevent data loss on page refresh.

## Deployed URL
[FILL IN: Deployed Vercel URL]

## Screenshots / Demo
[FILL IN: Loom link or screenshots]
