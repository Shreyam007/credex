# Testing the Engine

I'm using Vitest to make sure the audit logic isn't just making up numbers. Since this tool gives financial advice (sort of), I wanted to be 100% sure that common overspend patterns were caught and that the recommendations actually saved money.

## Test Files

All the core logic tests are in:
- `tests/auditEngine.test.ts`

## What's being tested?

I wrote 8 specific test cases to cover the main scenarios I expected users to hit. Here’s the breakdown:

1. **Cursor Business Downgrade**: Checks if the engine catches a small team (2 people) paying for the Business plan when the Pro plan or API usage would be cheaper.
2. **The "Double Dipping" Bug**: If someone has both Cursor and GitHub Copilot for a 10-person team, the engine should flag that they're paying for the same thing twice and recommend picking one.
3. **Claude + ChatGPT Redundancy**: Similar to the coding tools, if a solo founder is paying for both top-tier chat subs, it recommends consolidating.
4. **Optimal Stack Baseline**: I needed to make sure the engine doesn't just recommend changes for the sake of it. If someone is on the right plan, it should say "Optimal" and show $0 savings.
5. **High Spend / Credex Lead Gen**: If the total spend or savings is high enough, the engine needs to trigger the Credex CTA (consultation call) instead of just giving a generic tip.
6. **Markup Detection**: If the user inputs a spend that's way higher than the official public price, the engine recommends negotiating or checking for hidden fees.
7. **Zero-Spend Validation**: A sanity check to make sure that if everything is free ($0 spend), we don't accidentally calculate negative savings.
8. **Correct Spend Path**: If a user is on a standard plan (like Windsurf Pro) and they're paying exactly what they should be, the engine should recommend they "Keep" their current setup.

## How to run them

If you have Vitest installed, you can just run:

```bash
npm run test
```

I've got it set to run in `run` mode (not watch) so it just gives a clean pass/fail output. All 8 tests are passing as of today.
