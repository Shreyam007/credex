# SpendShift: The 2-Minute AI Spend Auditor

Most startups are overpaying for AI tools by at least 20%. They have duplicate Cursor seats, hidden GitHub Copilot minimums, and Claude Pro subscriptions they forgot to cancel. SpendShift fixes that.

I built this over 6 days as a lead-gen utility for Credex. It doesn't just "show" you your spend—it audits it using 8 specific rules to find waste and arbitrage opportunities.

## Live Demo
- **URL:** [https://spendshift-audit.vercel.app/](https://spendshift-audit.vercel.app/)
- **Guide:** [How it Works](https://spendshift-audit.vercel.app/how-it-works)

## Quick Start (For Devs)

1.  **Install dependencies:** `npm install`
2.  **Setup environment:** Copy `.env.example` to `.env.local` (you'll need keys for Anthropic, Resend, and Supabase).
3.  **Run migrations:** I've included a `schema.sql` file you can paste directly into the Supabase SQL Editor.
4.  **Launch:** `npm run dev`
5.  **Test:** `npm run test` (All 8 core engine tests should pass).

## Why I built it this way

- **Stateless Audit Logic:** I kept the audit rules in `auditEngine.ts` instead of a database. It makes the app feel instant and the testing way easier.
- **Claude 3 Haiku:** I chose Haiku because it’s fast and cheap. For a 100-word summary, you don't need a massive model.
- **SSR for Social Sharing:** I used Next.js Server-Side Rendering for the result pages. This means if you share your audit link, the preview actually shows your potential savings.
- **Optimistic Recalculations:** The form updates your "Estimated Spend" as you type. It feels more like a calculator than a boring form, which helps with conversion.

## Screenshots
![SpendShift Form](/public/screenshots/step1-form-final.png)
*The multi-step audit form with real-time recalculations.*

## Documentation
Check out the full documentation for the deep-dive:
- [Architecture & Scaling](ARCHITECTURE.md)
- [Reflection & Bugs](REFLECTION.md)
- [GTM Strategy](GTM.md)
- [User Interviews](USER_INTERVIEWS.md)
