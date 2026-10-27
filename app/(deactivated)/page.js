'use client';

import { useEffect } from 'react';
import { createServerClient } from '@/utils/supabase/server';

export default function DeactivatedPage() {
  useEffect(() => {
    const performForceCleanup = async () => {
      // 1. クライアント側のストレージを強制破壊
      if (typeof window !== 'undefined') {
        Object.keys(window.localStorage).forEach((key) => {
          if (key.startsWith('sb-')) window.localStorage.removeItem(key);
        });
        window.sessionStorage.clear();
      }

      // 2. TapInのAuthからサインアウト
      const supabase = createServerClient();
      await supabase.auth.signOut().catch(() => {});

      // 3. 3秒後にHubのログアウト画面へ強制送還（Hub側のセッションも切る）
      setTimeout(() => {
        const returnUrl = encodeURIComponent(window.location.origin + '/');
        const hubBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_HUB_URL || 'http://localhost:3001';
        window.location.href = `${hubBaseUrl}/logout?return_to=${returnUrl}`;
      }, 3000);
    };

    performForceCleanup();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-sm text-center max-w-md w-full border-t-4 border-red-500">
        <h1 className="text-xl font-bold text-gray-800 mb-4">このアカウントは退会済みです</h1>
        <p className="text-sm text-gray-600 mb-6">
          アカウントのデータは既に削除されています。<br />
          安全のため、自動的にログアウト処理を行っています...
        </p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        </div>
      </div>
    </div>
  );
}