# Architecture

## The Big Picture

```mermaid
graph TD
    User([User]) -->|Input Spend Data| Form[SpendForm Component]
    Form -->|POST /api/audit| API_Audit[Audit API Route]
    API_Audit -->|Run Rules| Engine[Audit Engine]
    Engine -->|Result| API_Audit
    API_Audit -->|Insert| Supabase[(Supabase DB)]
    API_Audit -->|Return ID| Form
    Form -->|Redirect| ResultPage[Audit Result Page]
    ResultPage -->|POST /api/summary| API_Summary[Summary API Route]
    API_Summary -->|Call| Anthropic[Anthropic API]
    Anthropic -->|SummaryText| API_Summary
    API_Summary -->|Display| ResultPage
    ResultPage -->|POST /api/lead| API_Lead[Lead API Route]
    API_Lead -->|Upsert| Supabase
    API_Lead -->|Send| Resend[Resend Email]
```

## How the data actually moves

It's pretty straightforward. The user hits the form, and as soon as they click "Analyze," I send that JSON blob to a Next.js API route. I didn't want to do the audit logic on the client because it felt messy and I wanted to keep the rules centralized.

The Audit Engine (which is just a bunch of TypeScript logic) crunches the numbers, checks for plan mismatches, and saves the whole result to Supabase. I return a unique ID to the frontend, which then redirects to a dynamic results page.

On that results page, I trigger two things: a quick AI summary via Anthropic's API so the user gets a "tl;dr" on their savings, and a lead capture form. If they drop their email, I update the record in Supabase and fire off a notification email using Resend.

## Why I picked this stack

- **Next.js**: I needed SSR for the audit result pages. If someone shares their audit link on LinkedIn or Twitter, I want the Open Graph tags to show their actual savings number in the preview. You can't really do that with a basic static site.
- **Supabase**: Honestly, I just didn't want to manage a database. It gives me Postgres, Auth (if I need it later), and a nice UI to peek at the leads. The Row Level Security (RLS) is also a nice peace-of-mind thing.
- **Vercel**: It's the default for Next.js and the deployment pipeline is basically zero-config.
- **Resend**: Their React Email library is a lifesaver. Building HTML emails by hand is a nightmare I wanted to avoid.
- **TypeScript**: After the third time I tried to pass a string instead of a number to the audit logic, I realized I couldn't build this without types. It caught so many dumb mistakes.

## Scaling to 10k audits/day

If this thing actually blew up and hit 10k audits a day, a few things would probably break:

1. **Database Connections**: I'd need to make sure I'm using a connection pooler (like Supavisor) because 10k hits would probably exhaust the default Postgres connection limit pretty fast.
2. **Rate Limiting**: Right now I'm just trusting users not to spam. I'd add Upstash Redis to the API routes to track hits by IP and keep the costs under control.
3. **The AI Bill**: Anthropic Haiku is cheap, but at scale, I might want to cache the AI summaries in Supabase. If two people somehow generate the exact same audit, there's no reason to pay for the same summary twice.
4. **Resend Latency**: Sending emails synchronously can slow down the API response. I'd probably move that to a background job or a queue if the UI started feeling sluggish.
