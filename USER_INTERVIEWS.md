# User Interviews

## Interview 1: Sarah T., Engineering Manager at Series A Startup (15 people)
**Context:** Sarah manages a team of 10 engineers. They use Cursor, GitHub Copilot, and Claude.

"We just realized last week that half the team is still paying for Copilot individually on their own cards, while the company is paying for a Cursor Business plan. It's a mess. I need a way to just show my CEO: 'Look, we are wasting $200 a month on duplicates.'"

**Surprising Moment:** Sarah mentioned that she actually *prefers* a tool that doesn't require a login because she doesn't want another account to manage just for a one-off audit.

**Design Change:** This solidified the "No Account Needed" approach and the use of shareable URLs instead of a dashboard.

---

## Interview 2: Marc K., Founder of a Bootstrapped AI Agency (3 people)
**Context:** Small, high-velocity team doing heavy writing and coding.

"We spend about $600 a month on Claude Pro and ChatGPT Plus seats. For a team our size, it feels like we're being taxed for the UI. I've been curious if just switching to the API direct would save us money, but I don't have the time to do the math on token usage vs seat costs."

**Surprising Moment:** Marc was worried that an "audit" would just tell him to delete his favorite tools. He wanted "constructive" optimization, not just "cutting."

**Design Change:** I added "Reasoning" text to every recommendation that explains *why* a switch is better, rather than just saying "Stop using X."

---

## Interview 3: Jason L., Finance Lead at Seed-Stage Fintech
**Context:** Manages all SaaS spend for a 20-person company.

"My biggest headache isn't the $20/month seats; it's the tools that have 5-seat minimums when we only have 2 people using them. Or when a tool upsells us to an 'Enterprise' tier for SSO and suddenly the price triples. I need to know if the 'listed' price is actually what we should be paying."

**Surprising Moment:** Jason said he values "Industry Benchmarks" more than the actual savings amount. He wants to know: "Are we normal for our size?"

**Design Change:** This led directly to the implementation of the **Benchmark Card**, showing spend-per-dev vs industry averages.
