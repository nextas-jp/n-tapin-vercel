'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { createBrowserClient } from '@/utils/supabase/client';

export default function Start() {
  const invite = useSearchParams().get('invite');

  const supabase = createBrowserClient();

  useEffect(() => {
    supabase.auth.signInWithOAuth({
      provider: 'custom:nextas-id-2',
      options: { redirectTo: `${location.origin}/auth/callback?invite=${invite}` },
    })
  }, []);

  return <p>Redirecting...</p>
}