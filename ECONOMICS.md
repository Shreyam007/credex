# Unit Economics & $1M ARR Model

### Lead Value Estimate for Credex
Credex operates as a procurement-as-a-service platform, primarily generating revenue through a "success fee" model based on realized savings. For SpendShift, a "Lead" is defined as a user who completes an audit and submits their contact information.

- **Avg. Identified Savings per Audit:** $4,800/year (based on typical 20% waste on a $2k/mo AI spend).
- **Credex Realizable Savings:** By layering infrastructure credits (AWS/GCP/OpenAI), Credex can typically double these savings to $9,600/year.
- **Credex Success Fee:** 25% of first-year savings = $2,400 per closed deal.
- **Funnel Conversion (Audit -> Lead):** 12% (Optimized via AI summary hook).
- **Funnel Conversion (Lead -> Consult):** 40% (Direct outreach from Credex).
- **Funnel Conversion (Consult -> Closed):** 15% (High intent due to data-backed audit).
- **Blended Closed Rate (Lead -> Closed):** 6%.
- **Lead Value (LV):** $2,400 (Fee) * 0.06 (Conv) = **$144 per lead.**

### CAC Targets and Funnel Efficiency
Given the high Lead Value ($144), we can afford a relatively high Customer Acquisition Cost (CAC) compared to standard B2C tools, while still maintaining a healthy LTV/CAC ratio.

- **Max CAC per Audit:** $5.00 (Assuming 12% lead rate, this results in a $41 CAC per lead).
- **LTV/CAC Ratio:** $144 / $41 = **3.5x**. This is highly sustainable for a lead-gen utility.

### $1M ARR Growth Model
To reach $1M in annual revenue, Credex needs to close approximately 417 deals per year ($1,000,000 / $2,400).

**The Math to $1M:**
1.  **Closed Deals:** 417/year (~35/month).
2.  **Qualified Leads Needed:** 6,950/year (~580/month).
3.  **Audits Completed Needed:** 58,000/year (~4,800/month or ~160/day).

**Sensitivity Analysis:**
If we increase the lead conversion rate from 12% to 18% through "Benchmark FOMO" (showing the user they are in the bottom 20% of spenders), the required daily audit volume drops to 105/day. This highlights the importance of the **Benchmark Card** as a conversion driver rather than just a feature.

### Scalability and Margin
Since SpendShift is an automated utility, the marginal cost of running an additional 100 audits is negligible (primarily token costs for Claude Haiku, estimated at <$0.01 per summary). The primary cost center is the human consultation step for Credex. By automating the "Pre-Consultation" data collection via the audit input, we significantly reduce the time-to-close, allowing a single Credex advisor to handle 5x more volume than traditional cold outreach.
