# System Architecture

## Data Flow Diagram

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

## Stack Justification

- **Next.js:** Essential for SSR to enable dynamic Open Graph tags for shareable audit URLs.
- **Supabase:** Provides a robust, managed backend with RLS, perfect for rapid deployment and lead storage.
- **Vercel:** Optimized for Next.js, providing edge functions for rate limiting and global delivery.
- **Anthropic Haiku:** Cost-effective model for generating concise, high-quality audit summaries.

## Scaling Plan (10k audits/day)

- **Edge Caching:** Cache audit results at the edge using Vercel's ISR or Cache-Control headers.
- **Connection Pooling:** Utilize Supabase's built-in connection pooling for high-concurrency DB access.
- **Rate Limiting:** Transition from in-memory Map to Redis (Upstash) for distributed rate limiting.
- **Background Jobs:** Move email sending to a background worker if Resend latency becomes a bottleneck.
