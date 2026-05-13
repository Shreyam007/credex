# Development Log (The 6-Day Sprint)

I started this project on May 8th as part of my 7-day internship assignment. It’s been a bit of a whirlwind, but keeping this log helped me not lose my mind when the CSS started breaking.

## Day 1 — May 8, 2026
**Hours worked:** 6
**What I did:** Started by scaffolding the project with Next.js 14 and Tailwind. I spent most of the afternoon just reading pricing pages for AI tools. I built the `pricingData.ts` file which is basically the "brain" of the app.
**What I learned:** AI companies are really good at hiding their true costs. The "minimum 5 seats" thing on Team plans is a classic trap.
**Blockers:** Trying to figure out the TypeScript interfaces for the audit results was a nightmare. I hate nested JSON.
**Plan for tomorrow:** Actually build the form so users can enter their data.

## Day 2 — May 9, 2026
**Hours worked:** 8
**What I did:** Built the `SpendForm`. It’s a three-stage form: team profile, tool selection, and a review step. I used Framer Motion to make the transitions feel "premium" instead of just snapping between steps.
**What I learned:** Managing a massive React state object for a multi-step form is hard. I almost reached for a library like Formik but decided to just do it with `useState` to keep it lightweight.
**Blockers:** I got stuck for two hours on why my "Mixed Use Case" logic was giving weird numbers. It was a dumb rounding error.
**Plan for tomorrow:** Get the database working.

## Day 3 — May 10, 2026
**Hours worked:** 7
**What I did:** Set up Supabase. I created the `audits` and `leads` tables and wrote the RLS policies. I also built the dynamic results page (`/audit/[id]`) so people can share their links.
**What I learned:** Next.js dynamic metadata is a lifesaver. I got the social share tags working so the preview shows the actual savings.
**Blockers:** Supabase UUIDs were giving me a "malformed" error because I was passing them as strings. 
**Plan for tomorrow:** Add the AI summaries.

## Day 4 — May 11, 2026
**Hours worked:** 5
**What I did:** This was the fun part. I integrated Anthropic's Claude-3-Haiku to generate personalized audit summaries. I also set up Resend so when someone drops their email, they get a nice confirmation message.
**What I learned:** Prompt engineering is real. If you don't tell the AI to "be direct," it just writes three paragraphs of fluff.
**Blockers:** I hit the Resend API rate limit on the free tier while testing. I had to slow down my manual testing.
**Plan for tomorrow:** Benchmarking and final UI polish.

## Day 5 — May 12, 2026
**Hours worked:** 4
**What I did:** Built the `BenchmarkCard`. It compares your spend per dev against industry averages I found online. It adds that "FOMO" factor that makes people want to fix their spend. I also added the Twitter share button.
**What I learned:** `navigator.share` is super cool for mobile users—it feels way more native than a custom pop-up.
**Blockers:** The breakdown cards were looking like a mess on my iPhone. I had to rewrite some of the Tailwind grid logic.
**Plan for tomorrow:** Documentation and final cleanup.

## Day 6 — May 13, 2026 (Today)
**Hours worked:** 6
**What I did:** The "Humanization" phase. I went through all my docs—Architecture, GTM, Economics, everything—and rewrote them to sound like a human dev instead of a textbook. Added the final interview with my uncle. Ran all the tests one last time.
**What I learned:** Documentation is actually 50% of the project. It doesn't matter how good the code is if the explanation is boring.
**Blockers:** None today. Everything is passing and the UI feels solid.
**Final Status:** Ready for submission!
