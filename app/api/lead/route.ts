/* eslint-disable */
import { NextRequest, NextResponse } from 'next/server';

import { supabaseAdmin } from '@/lib/supabase';
import { resend } from '@/lib/resend';

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 5;
  
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter(t => now - t < windowMs);
  
  if (recent.length >= maxRequests) return true;
  
  rateLimitMap.set(ip, [...recent, now]);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // Get IP
    const ip = req.headers.get('x-forwarded-for') 
      || req.headers.get('x-real-ip') 
      || 'unknown';
    
    // Rate limit check
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again in an hour.' }, { status: 429 });
    }

    const body = await req.json();
    const { auditId, email, companyName, role, website, totalMonthlySavings, referralCode } = body;

    // HONEYPOT CHECK — silent reject
    if (website && website.length > 0) {
      return NextResponse.json({ success: true });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Fetch audit data
    const { data: audit } = await supabaseAdmin
      .from('audits')
      .select('result_json, input_json')
      .eq('id', auditId)
      .single();

    if (!audit) {
      return NextResponse.json({ error: 'Audit not found' }, { status: 404 });
    }

    const result = audit.result_json;
    const input = audit.input_json;

    // Upsert lead
    const { error: upsertError } = await supabaseAdmin
      .from('leads')
      .upsert({
        audit_id: auditId,
        email,
        company_name: companyName || null,
        role: role || null,
        team_size: input.teamSize,
        savings_tier: result.savingsTier,
        total_monthly_savings: result.totalMonthlySavings,
        referral_code: referralCode || null,
      }, { onConflict: 'email,audit_id' });

    if (upsertError) {
      console.error('Lead upsert error:', upsertError);
    }

    // Send transactional email via Resend
    const isHighSavings = result.totalMonthlySavings > 500;
    
    const { error: emailError } = await resend.emails.send({
      from: 'SpendShift <onboarding@resend.dev>',
      to: email,
      subject: `Your AI Spend Audit — $${result.totalMonthlySavings}/mo in savings found`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #0F172A;">
          
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="font-size: 24px; font-weight: 800; color: #4F46E5;">⚡ SpendShift</div>
          </div>
          
          <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 8px;">
            Your Audit Is Ready
          </h1>
          
          <p style="color: #64748B; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
            We found <strong style="color: #4F46E5;">$${result.totalMonthlySavings}/month</strong> in potential savings across your AI tool stack.
          </p>
          
          <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 12px; padding: 24px; margin-bottom: 32px; text-align: center;">
            <div style="font-size: 48px; font-weight: 800; color: #16A34A;">
              $${result.totalMonthlySavings}/mo
            </div>
            <div style="color: #166534; font-size: 14px; margin-top: 4px;">
              That's $${result.totalAnnualSavings}/year in potential savings
            </div>
          </div>
          
          ${isHighSavings ? `
          <div style="background: linear-gradient(135deg, #4F46E5, #7C3AED); border-radius: 12px; padding: 24px; margin-bottom: 32px; color: white;">
            <div style="font-size: 16px; font-weight: 700; margin-bottom: 8px;">
              🎯 A Credex advisor will reach out within 24 hours
            </div>
            <div style="font-size: 14px; opacity: 0.9;">
              Your savings potential qualifies you for a free consultation on discounted AI infrastructure credits.
            </div>
          </div>
          ` : ''}
          
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/audit/${auditId}"
            style="display: block; background: #4F46E5; color: white; text-decoration: none; text-align: center; padding: 16px; border-radius: 12px; font-weight: 700; font-size: 16px; margin-bottom: 32px;">
            View Full Audit Report →
          </a>
          
          <p style="color: #94A3B8; font-size: 12px; text-align: center;">
            SpendShift · Free AI tool spend analysis<br>
            You received this because you ran an audit at spendshift.com
          </p>
          
        </body>
        </html>
      `
    });

    if (emailError) {
      console.error('Email error:', emailError);
      return NextResponse.json({ error: 'Email service failure' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('API Lead error:', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
