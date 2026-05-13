# User Interviews (Field Notes)

I wanted to see if SpendShift actually solved a problem people cared about, or if I was just over-engineering a spreadsheet. I did three interviews with people at different stages—from a broke student to my uncle who runs a real company.

---

## Interview 1: Manik S., 3rd Year CS Student / Freelancer

**Date:** May 11, 2026
**Setting:** College cafeteria, 14 minutes.

Manik is a typical CS student. He’s doing some freelance web dev on the side and pays for all his AI tools out of his own pocket. I asked him what he uses. He said "ChatGPT." Then he paused and admitted, "Actually, two ChatGPTs."

It turns out he has two separate Plus accounts—one on his personal email and one on his college email. Whenever he hits the message limit on GPT-4 mid-session, he just switches tabs to the other account. He also pays for Claude Pro because he trusts it more for complex code explanations. That’s $60 a month on a student budget. When I showed him the audit results, he just leaned back and stared at the screen.

**Direct Quotes:**
- "Both accounts do the same thing. One runs out, I switch. It felt like the easiest fix at the time."
- "Claude is just more honest. ChatGPT acts confident even when it’s completely wrong, and that’s dangerous for my freelance work."
- "If someone had shown me this comparison three months ago, I would’ve just moved to a Team plan or something. I’m literally throwing away $40 a month."

**Most Surprising Thing He Said:**
He had no idea there was a "Team" plan for ChatGPT that offered higher limits. He just assumed "Plus" was for individuals and "Enterprise" was for big companies like Google. He literally pulled out his phone and started looking for the cancel button for his second account while we were talking.

**What it changed in my design:**
I added clear "price hints" next to every plan in the input form. If you select "Pro" for two different tools, I want the UI to feel like it’s nudgeing you. I also made the "Duplicate Tool" flag much bigger on the results page.

---

## Interview 2: R.K. & A.V., Seniors (Final Year Project Team)

**Date:** May 12, 2026
**Setting:** Computer Lab, 12 minutes.

Two of my seniors were working on their final year project (a blockchain thing) when I asked them to try the tool. They were skeptical. R.K. entered their team’s data: they have 4 people using Cursor Pro and ChatGPT Plus. 

Within seconds, the audit flagged that they were paying for Cursor Business when they only had 4 seats (there's often a minimum or a higher price for Business that isn't worth it for small teams). It also pointed out that they could save about $20/month by just using the Cursor API directly for their heavier sessions instead of the full Business seat.

**Direct Quotes:**
- "I didn't expect it to actually explain the reasoning. I thought it would just throw a 'Save $50' number at me and call it a day."
- "The breakdown cards are what make it feel real. Anyone can guess a savings number, but showing the logic makes me trust it."
- "We’re definitely going to use this before we decide on our stack for next semester's project."

**Most Surprising Thing They Said:**
They completely ignored the big "Total Savings" number at the top and went straight for the individual tool cards. I thought the hero number was the "wow" factor, but for them, the "Why" was way more interesting than the "How Much."

**What it changed in my design:**
I redesigned the result cards to make the "Reasoning" text larger and more prominent. I realized the savings number is just the hook, but the explanation is what actually builds the trust needed to get them to the lead-capture form at the bottom.

---

## Interview 3: My Uncle (CEO of a Small Agency)

**Date:** May 13, 2026 (Today)
**Setting:** Phone call, 15 minutes.

I called my uncle because he runs a 12-person digital marketing agency. He’s not a "tech" guy, but he pays the bills. I walked him through the tool over the phone while he used it on his laptop. He was grumpy at first (typical), but then he got quiet when he saw the results.

He realized he was paying for 10 seats of a tool that only 3 people were actually using because of a "Team minimum" he’d signed up for last year. He also found out that two of his designers had their own separate Claude subs that the company was reimbursing, on top of the company-wide ChatGPT Team plan.

**Direct Quotes:**
- "I don't mind paying for tools that make us faster, but I hate feeling like a sucker. This makes me feel like a sucker."
- "The 'Negotiate' recommendation is smart. I didn't even know you could talk these guys down on price once you hit 10 seats."
- "Can I send this link to my accountant? This would save him three hours of 'what is this charge' questions every month."

**Most Surprising Thing He Said:**
He asked if the tool could "automatically cancel" the subscriptions for him. He was so frustrated by the waste that he wanted an "Execute" button, not just a recommendation. It made me realize that for non-technical founders, the friction isn't just finding the waste—it's the annoyance of having to log into 5 different dashboards to fix it.

**What it changed in my design:**
I added a "Copy Negotiation Script" button to the recommendations. Since he said he didn't know how to talk them down, I figured giving people a literal template to copy-paste into a support chat would be a huge value add.
