# My 7-Day Reflection

### Q1: What was the hardest bug you faced? How did you solve it?

I spent nearly four hours on Tuesday night fighting with the dynamic pricing table in the audit results. It sounds stupid in hindsight, but the layout kept collapsing whenever I added a tool with a long name or an expensive plan. On a mobile screen, the text would just overflow and hide the "Save" button, which is basically the whole point of the tool. My first hypothesis was that Tailwind's `grid-cols-3` was just being buggy with the Select components I used. I tried wrapping everything in divs with `overflow-hidden`, but that just cut off the text instead of fixing the layout.

Then I thought maybe it was a hydration error because the pricing was being pulled from a JSON file and calculated on the fly. I added a bunch of `useEffect` hooks to wait for the data, but it didn't change anything. I was genuinely frustrated—staring at the DevTools console for an hour seeing zero errors while the UI looked like a complete mess.

The "aha" moment came when I realized I hadn't set `min-w-0` on the flex children inside the grid cells. In CSS, flex items won't shrink below their minimum content size by default. Because my tool names were long, they were forcing the columns wide and pushing everything else off the screen. I added `min-w-0` and used `truncate` for the labels, and suddenly everything snapped into place. It was a classic "one line of CSS fixed everything" moment, but getting there felt like a marathon. I learned more about the inner workings of the CSS Grid spec in those few hours than I have in the last year of classes.

### Q2: What was a decision you reversed mid-week? Why?

On Wednesday, I was halfway through building a complex Supabase schema to store "draft" audits. The idea was that if a user started an audit on their laptop but got distracted, they could pick it up later on their phone. I had the `draft_id` logic all figured out and was starting to write the API routes for auto-saving every time a field changed.

But then I took a step back and realized I was over-engineering a problem that shouldn't exist for an MVP. First off, this is a financial tool. People are inherently sketchy about putting their company spend into a database before they even see the results. If I'm saving their "draft" data to my database immediately, I'm taking on a lot of data privacy baggage that I don't really need yet. Plus, the latency of hitting the DB on every input change was making the form feel sluggish.

I decided to scrap the whole backend draft system and move everything to `localStorage`. Honestly, it was the best call I made all week. It simplified the code immensely—no more `POST /api/save-draft` calls every five seconds. Instead, I just sync the form state to a local key. It made the app feel instant because there's zero network lag when you're typing. It also means if someone accidentally refreshes the page, their data is still there, but it hasn't actually left their machine yet. In an internship project like this, shipping a fast, private experience is way more important than having a "perfect" cloud-synced architecture.

### Q3: If you had another week, what would you build next?

If I had another week, the very first thing I’d build is a PDF export feature. Right now, the results page is great for a quick look, but I realized while talking to my uncle (who runs a small agency) that CFOs don't want to click a link—they want a file they can attach to an email or upload to their internal "cost savings" folder. I’d probably use `react-pdf` or something similar to generate a clean, branded one-pager that summarizes the $2k or $5k in savings.

I’d also want to build a "Consolidated Billing" analyzer. A lot of teams have 5 different people all on individual Claude Pro plans because it’s easier than getting the company to pay for a Team plan. My tool catches individual overspend, but it doesn't yet say "Hey, if you move these 5 seats to an Enterprise plan, you’d save an extra 15%." That’s where the real money is for bigger companies.

Finally, I’d want to add a proper "History" tab for the lead capture. If someone enters their email, they should be able to see a history of all the audits they've run over time. This would turn SpendShift from a one-off tool into a recurring utility. I’d also love to integrate a "1-click upgrade" button that links directly to the vendor's pricing page for the recommended plan. It’s a small thing, but it closes the loop between "you're overspending" and "fixed it."

### Q4: How did you use AI tools during this project?

I used AI tools pretty heavily, mainly Antigravity and ChatGPT for the "tedious" stuff. For example, I used AI to generate the initial Tailwind components for the audit form and to help me write the regex for some of the input validation. It’s like having a senior dev sitting next to me who knows every CSS property by heart but sometimes forgets the project context.

However, I learned the hard way that you can't just blindly copy-paste. I asked an AI to help me with a custom animation for the "Analyzing..." state. It gave me a super complex Framer Motion config that looked amazing in the snippet. But once I put it in, it completely broke my layout because it was using a version of the library that had different prop names than what I had installed. I spent thirty minutes debugging why the whole page was blank before I realized the AI had hallucinated a prop called `animatePresenceInitial`.

I also had to be really careful with the financial logic. AI is great at writing code, but it’s surprisingly bad at nuanced pricing tiers. It kept trying to simplify the OpenAI API pricing in a way that was actually wrong (ignoring the batch discounts). I ended up writing all the core audit engine logic myself because I didn't want the "savings" numbers to be some AI-generated guess. I used AI for the skeleton, but the "brains" of the tool are 100% human-written and verified against the official docs.

### Q5: Self-Ratings (1-10)

- **Discipline — 9/10.** I actually stayed on track with my devlog and didn't have any 2 AM "oh no I'm behind" moments.
- **Code Quality — 7/10.** It's clean and typed, but the `AuditEngine.ts` file is getting a bit long and could probably be broken into smaller service files.
- **Design Sense — 6/10.** I think it looks professional, but I spent way too much time tweaking the shade of purple for the buttons instead of focusing on better mobile navigation.
- **Problem-Solving — 8/10.** I'm proud of how I handled the transition from DB drafts to localStorage—it was a pivot that actually made the product better.
- **Entrepreneurial Thinking — 9/10.** I didn't just build a tool; I built a lead-gen funnel for Credex. I kept asking myself "would a founder actually give their email for this?" and built around that answer.
