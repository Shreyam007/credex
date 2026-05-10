-- Supabase Initial Schema for SpendShift

-- Enable pgcrypto for UUID generation if needed (usually enabled by default)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Audits Table
CREATE TABLE IF NOT EXISTS audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  input_json JSONB NOT NULL,
  result_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads Table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id UUID REFERENCES audits(id),
  email TEXT NOT NULL UNIQUE,
  company_name TEXT,
  role TEXT,
  team_size INTEGER,
  savings_tier TEXT,
  total_monthly_savings NUMERIC,
  referral_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_audit_id ON leads(audit_id);

-- Row Level Security (RLS)
-- Enable RLS on both tables
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Audits: Publicly readable for shareable URLs, but only service role can insert/delete
CREATE POLICY "Public read access for audits" ON audits
  FOR SELECT USING (true);

-- Leads: No public access, only service role (authenticated admin)
CREATE POLICY "Leads access restricted" ON leads
  FOR ALL USING (false);
-- Note: Supabase service role key bypasses RLS by default.
