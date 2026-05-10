# Project Reflection

### Q1: What was the hardest bug you faced? How did you solve it?
The hardest bug was a persistent layout collapse in the audit configuration grid. When users selected multiple tools, the dynamic labels for plan names and pricing would cause columns to shrink or overlap, especially on mid-sized screens. I initially tried using fixed widths, but that broke responsiveness. I eventually solved it by implementing a balanced `grid-cols-3` layout combined with `min-w-0` on children and `truncate` on the Select components. I also had to standardize the vertical alignment of form rows using `flex items-center` and forced height constraints to prevent the UI from "jumping" when data was entered. This required a deep dive into how Tailwind handles flex-shrink within grid containers.

### Q2: What was a decision you reversed mid-week? Why?
Mid-week, I initially planned to store "draft" audits in a temporary Supabase table so users could resume from any device. However, after considering the 7-day timeline and the privacy-first nature of a spend audit (users are often sensitive about financial data before they trust the tool), I reversed this and moved to a `localStorage` implementation (`spendshift_audit_draft`). This significantly reduced backend complexity, improved performance for the user (zero latency on draft saves), and ensured that no financial data left the user's browser until they were ready to submit the final audit.

### Q3: If you had another week, what would you build next?
I would prioritize a "PDF Report Generation" feature. Currently, the audit results are highly shareable via URL, but many CFOs and procurement managers still require a formal PDF attachment for internal documentation or for sharing with stakeholders who might not have access to the link. I would also expand the Audit Engine to include "Consolidated Billing" rules, identifying if moving multiple separate tool accounts under a single Enterprise umbrella would yield a volume discount. Finally, I'd add a "Referral Program" where users can earn Credex credits for inviting other companies to run an audit.

### Q4: How did you use AI tools during this project?
I used AI tools extensively for UI polish and logic validation. Specifically, I used Antigravity to generate the initial component structures and to debug complex CSS interactions in the multi-step form. I trusted AI for boilerplate and CSS, but I did NOT trust it for the core financial logic or the audit rules; those I wrote and verified manually against official pricing pages to ensure 100% accuracy. One time AI was wrong: it suggested a specific Tailwind configuration for a custom animation that was incompatible with the version I was using, leading to a silent failure where the animation just didn't play. I had to manually rewrite the transition logic using standard CSS variables.

### Q5: Self-Ratings (1-10)
- **Discipline (9/10):** Maintained a strict daily devlog and committed progress across all 7 days without fail.
- **Code Quality (8/10):** Highly modular component structure and zero TypeScript 'any' types, though some UI components could be further abstracted.
- **Design Sense (9/10):** Created a premium, finance-focused aesthetic using custom gradients, glassmorphism, and consistent spacing.
- **Problem-Solving (8/10):** Successfully navigated complex logic for API-vs-subscription arbitrage and handled multiple edge cases in the audit engine.
- **Entrepreneurial Thinking (10/10):** Deeply considered the GTM strategy and lead-gen funnel for Credex, ensuring the tool is a high-value entry point for their business.
