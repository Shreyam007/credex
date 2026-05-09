import { NextRequest, NextResponse } from 'next/server';
import { runAudit, AuditInput } from '@/lib/auditEngine';
import { supabaseAdmin } from '@/lib/supabase';

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number, resetAt: number }>();
const RATE_LIMIT = 10;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'anonymous';
  
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const input: AuditInput = await req.json();

    // Validation
    if (!input.tools || input.tools.length === 0) {
      return NextResponse.json({ error: 'At least one tool is required' }, { status: 400 });
    }

    const result = runAudit(input);

    // Save to Supabase
    const { data, error } = await supabaseAdmin
      .from('audits')
      .insert({
        id: result.auditId,
        input_json: input,
        result_json: result,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      // Don't block the user if DB fails, just return the result
    }

    return NextResponse.json({ auditId: result.auditId, result });
  } catch (e) {
    console.error('API Audit error:', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
