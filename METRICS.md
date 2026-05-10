# Project Metrics & Instrumentation

### The North Star Metric
**Total Identified Monthly Savings (TIMS)**
We don't just track "Daily Active Users" or "Audits Completed." Our North Star is the aggregate dollar amount of savings we've identified for our users. If TIMS is growing, it means our audit rules are effective and we are reaching teams with actual waste.

### Input Metrics (Drivers of North Star)
1.  **Audit Completion Rate (ACR):** % of users who start the form and reach the results page. This measures the "friction" of our spend input. (Target: >70%)
2.  **Lead Conversion Rate (LCR):** % of auditors who submit their email. This measures the "trust" and "value" created by the audit results. (Target: >15%)
3.  **Viral Share Rate (VSR):** % of results pages shared via the "Copy Link" or "Twitter" buttons. (Target: >5%)

### Instrumentation Plan
- **Vercel Web Analytics:** For high-level traffic and page view tracking.
- **Custom Event Tracking (PostHog/Mixpanel):**
    - `audit_started`: Triggered on Step 1 continue.
    - `tool_added`: To see which AI tools are most common.
    - `audit_completed`: When the result page loads.
    - `lead_submitted`: When the Resend email is triggered.
- **Sentry:** For error tracking, specifically in the Anthropic and Resend API routes.

### The "Pivot" Decision Number
If our **Lead Conversion Rate (LCR) falls below 5%** for two consecutive weeks, it indicates that the audit results aren't compelling enough to justify sharing an email.
- **Action:** Pivot the UI to be more "Benchmark-heavy" (FOMO) rather than just "Savings-heavy," or add a "Download PDF" hook as the primary lead magnet.
