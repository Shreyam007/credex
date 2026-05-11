# User Interviews

## Interview 1 — Manik S., CS Final Year Student, Freelancer

**Date:** [11-05-2026]
**Duration:** ~14 minutes
**Setting:** College campus, between classes

---

Manik is a final year CS student doing freelance web 
work on the side. No startup, no funding — just 
someone trying to get things done and paying for AI 
tools from his own pocket.

I asked what tools he uses. He said "ChatGPT." Then 
paused. "Actually, two ChatGPTs."

He had two separate Plus accounts — personal and 
college email. Whenever he hit the message limit 
mid-session, he would just switch tabs. He also paid 
for Claude Pro separately because he trusted it more 
for writing and code explanations.

Three subscriptions. Sixty dollars a month. College 
student money. When I pointed that out, he just 
leaned back and said "I never actually thought about 
it that way."

**Direct Quotes:**

- "Both accounts do the same thing. One runs out, 
  I switch. It felt like the easiest fix."

- "Claude is more honest — ChatGPT acts confident 
  even when it is completely wrong."

- "If someone had shown me this earlier I would 
  have looked for a better plan."

**Most Surprising Thing He Said:**

He had never heard of the ChatGPT Team plan. When I 
explained it offered higher limits at $30 per user, 
he pulled out his phone immediately to check. He 
assumed Plus was the only option before Enterprise. 
People do not refuse cheaper options — they just 
do not know those options exist.

**What It Changed In My Design:**

I added price hints next to every plan in the form 
so users immediately see if they are overpaying. I 
also made the duplicate tool flag more visible on 
the results page — because Manik's situation is 
more common than I had assumed.

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
