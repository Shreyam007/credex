# What I’m Actually Tracking (Metrics)

I’m trying to avoid "vanity metrics" here. It doesn't matter if 10,000 people visit the site if none of them actually finish an audit or give us their email. Since this is a lead-gen tool for Credex, the metrics need to reflect business value, not just traffic.

### The North Star: Total Identified Monthly Savings (TIMS)

I’m not tracking Daily Active Users (DAU). This isn't a social network; nobody is going to check their AI spend every morning. Instead, our North Star is **TIMS**. 

If we identify $10,000 in monthly savings across all users in a week, we know two things:
1.  Our marketing is reaching the right people (engineering managers with high spend).
2.  Our audit engine is actually working.

If this number stays flat while traffic goes up, it means we’re attracting "curiosity seekers" (like students with $0 spend) instead of the high-value leads Credex actually wants.

### The Three Drivers

To move the North Star, I’m watching these three inputs like a hawk:

1.  **Audit Completion Rate (ACR):** This is the percentage of people who start the form and actually hit "Analyze." If this is low, my form is too long or too confusing. I'm targeting 70%.
2.  **Lead Capture Rate (LCR):** This is the big one. How many people see their results and then decide to give us their email? If they don't give an email, we can't follow up, and the lead is lost. I want at least 15% here.
3.  **Viral Share Rate (VSR):** Since I have a $0 marketing budget, I need people to share their results. I’m tracking how many people click the "Copy Link" button on the results page.

### What I’m Instrumenting First

I don’t want to spend 2 days setting up a complex data warehouse. I’m starting simple:
- **PostHog:** I'll use this for custom events like `tool_added` and `audit_completed`. I want to know which tools people are most worried about. Is everyone auditing Claude? Or is it all about OpenAI API spend?
- **Vercel Web Analytics:** For the basics like where the traffic is coming from (Reddit vs. Twitter).
- **Sentry:** Because if the Anthropic API goes down and the summary doesn't load, the trust is gone instantly. I need to know the second that happens.

### When to Pivot?

I’ve set a "kill switch" number: **If the Lead Capture Rate (LCR) stays below 8% after 500 completed audits, we pivot.**

If we get 500 people to tell us their spend and they still don't want to give us their email after seeing the results, it means one of two things:
1.  The savings numbers aren't "surprising" enough.
2.  The results page doesn't look professional enough to trust with an email.

If we hit that 8% floor, I’m not going to keep tweaking the form. I’ll pivot the entire results page to be a "Download PDF Report" gate instead of just a web view. That’s a much stronger hook for a corporate user.
