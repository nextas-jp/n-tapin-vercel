'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { createBrowserClient } from '@/utils/supabase/client';

function StartInner() {
  const invite = useSearchParams().get('invite');

  useEffect(() => {
    const supabase = createBrowserClient();
    supabase.auth.signInWithOAuth({
      provider: 'custom:nextas-id-2',
      options: {
        redirectTo: `${location.origin}/auth/callback?invite=${encodeURIComponent(invite ?? '')}`,
      },
    });
  }, [invite]);

  return <p>Redirecting...</p>;
}

export default function Start() {
  return (
    <Suspense fallback={<p>Redirecting...</p>}>
      <StartInner />
    </Suspense>
  );
}