import { NextResponse } from 'next/server';
import { createClient as createAdmin } from '@supabase/supabase-js';
import { createServerClient } from '@/utils/supabase/server';

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const invite = searchParams.get('invite');

  if (code) {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) console.error('exchange failed:', error.message);

    if (!error) {
      if (invite) {
        try {
          const { data: { user } } = await supabase.auth.getUser();

          //TODO: add in the header APP API KEY for security (once implmentation is done during MVP)
          const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_HUB_URL}/api/sales/invites/${invite}`);

          if (user && response.ok) {
            const inviteData = await response.json();
            if (inviteData.email.toLowerCase() === user.email.toLowerCase()) {
              const admin = createAdmin(
                process.env.NEXT_PUBLIC_SUPABASE_URL,
                process.env.SUPABASE_SERVICE_ROLE_KEY
              );

              const { error: memberError } = await admin.from('tenant_members').upsert(
                { tenant_id: inviteData.workspace_id, user_id: user.id, role: 'staff' },
                { onConflict: 'tenant_id,user_id', ignoreDuplicates: true }
              );

              if (memberError) {
                console.error('membership insert failed', mErr.message);
              }
            }
          }
        } catch (e) {
          console.error('invite step failed', e)
        }
      }
      return NextResponse.redirect(`${origin}/`)
    }
  }

  return NextResponse.redirect(`${origin}/?error=auth`)
}