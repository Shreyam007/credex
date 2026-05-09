# Key Performance Indicators (KPIs)

## North Star Metric
- **Qualified leads generated per week:** This measures the direct value delivered to the business (Credex).

## Input Metrics
- **Audits Completed:** Total volume of users reaching the end of the funnel.
- **Email Capture Rate:** % of users who submit the lead form after seeing results.
- **High-Savings Tier %:** % of audits finding >$500 in savings (Ideal Credex targets).
- **Share Rate:** % of users who click a share button or copy the link.

## Instrumentation Plan
- **Vercel Analytics:** For traffic and conversion tracking.
- **Supabase Events:** Custom table for logging audit completion steps.
- **PostHog (Optional):** For session recording and heatmap analysis.

## Pivot Triggers
- **Capture Rate < 2%:** Re-evaluate the value proposition or move the capture earlier.
- **Avg Savings < $100:** Re-evaluate the audit rules or the target audience.
