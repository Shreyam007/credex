import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { resend } from '@/lib/resend';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { auditId, email, companyName, role, website } = body;

    // Honeypot check
    if (website) {
      return NextResponse.json({ success: true, message: 'Message received' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Fetch audit data to include in lead record
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
        company_name: companyName,
        role,
        team_size: input.teamSize,
        savings_tier: result.savingsTier,
        total_monthly_savings: result.totalMonthlySavings,
      }, { onConflict: 'email' });

    if (upsertError) {
      console.error('Lead upsert error:', upsertError);
    }

    // Send email via Resend
    try {
      await resend.emails.send({
        from: 'SpendShift <audits@yourdomain.com>',
        to: email,
        subject: `Your AI Spend Audit — SpendShift`,
        html: `
          <h1>Your AI Spend Audit is ready</h1>
          <p>Hi there,</p>
          <p>We've completed your audit. Here's a summary of what we found:</p>
          <ul>
            <li><strong>Total Potential Monthly Savings:</strong> $${result.totalMonthlySavings}</li>
            <li><strong>Total Potential Annual Savings:</strong> $${result.totalAnnualSavings}</li>
            <li><strong>Savings Tier:</strong> ${result.savingsTier}</li>
          </ul>
          <p>You can view your full report here: <a href="${process.env.NEXT_PUBLIC_APP_URL}/audit/${auditId}">${process.env.NEXT_PUBLIC_APP_URL}/audit/${auditId}</a></p>
          ${result.totalMonthlySavings > 500 ? '<p><strong>A Credex advisor will reach out within 24 hours to help you capture these savings.</strong></p>' : ''}
          <p>Best,<br>The SpendShift Team</p>
        `,
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the lead capture if email fails
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('API Lead error:', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
