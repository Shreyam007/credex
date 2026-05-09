# Audit Engine Tests

The core audit logic is tested using Vitest to ensure accuracy and defensive reasoning.

## Test Suite Results

- **TEST 1:** Team of 2 on Cursor Business → Downgrade to Pro (PASS)
- **TEST 2:** Cursor + GitHub Copilot Duplication → Switch Flag (PASS)
- **TEST 3:** Claude Pro + ChatGPT Plus Redundancy → Switch Flag (PASS)
- **TEST 4:** Optimal Stack Check → No Savings Flagged (PASS)
- **TEST 5:** High Spend Detection → Credex CTA Flagged (PASS)
- **TEST 6:** Markup Detection → Negotiation Recommended (PASS)
- **TEST 7:** Zero-Cost Validation → No Negative Savings (PASS)
- **TEST 8:** Correct Spend Benchmark → Keep Action (PASS)

## Running Tests

```bash
npm run test
```
