# User Interviews

## Interview 1 — Manik G., CS Final Year Student, Freelancer

**Date:** [11-05-2026]
**Duration:** ~14 minutes
**Setting:** College campus, between classes

---

Manik is a final year CS student who picks up freelance 
web projects on the side. He is not running a startup — 
he is just a guy trying to get work done, paying for 
AI tools out of his own pocket.

I caught him between classes and asked what tools he 
uses. He said "ChatGPT" without hesitating. Then after 
a second he added "...actually, two ChatGPTs." 

That stopped me. I asked him to explain.

Turns out he had two separate ChatGPT Plus accounts — 
one on his personal email, one on his college email. 
Every time he hit the message limit mid-session, he 
would just close one tab and open the other. He also 
paid for Claude Pro on top of that because he found 
Claude cleaner for writing and explaining code.

Three subscriptions. Sixty dollars a month. College 
student money.

When I did the math out loud, he leaned back and 
said "I never looked at it like that."

**Direct Quotes:**

- "Both accounts do the exact same thing. One runs 
  out, I switch to the other. It just felt like 
  the easiest fix at the time."

- "Claude is more honest. ChatGPT sometimes acts 
  confident even when it is completely wrong. 
  Claude just says it does not know."

- "If someone had shown me this earlier I would 
  have actually gone and found a better plan."

**Most Surprising Thing He Said:**

He had never heard of the ChatGPT Team plan. When I 
told him it offered higher limits at $30 per user — 
meaning he could drop one of his Plus accounts 
completely — he pulled out his phone on the spot to 
check. He genuinely believed Plus was the only paid 
option before Enterprise. That moment stuck with me. 
The problem is not that people refuse to spend less. 
It is that they have no idea a better option exists.

**What It Changed In My Design:**

I added plan price hints next to every dropdown in 
the SpendShift form so users can instantly see if 
what they are paying matches the listed price. I also 
made the duplicate tool flag more prominent on the 
results page — because Manik's situation is probably 
happening to a lot more people than I assumed.

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
