import { redirect } from 'next/navigation';
import { createServerClient } from '@/utils/supabase/server'; 
// ▼ 追加: システム権限用のクライアントを作成するためにインポート
import { createClient as createAdminClient } from '@supabase/supabase-js';

import { ViewTransition } from 'react';
import { UserProvider } from "./user-context";
import BottomNav from "@/components/BottomNav";

export default async function AppLayout({ children }) {
  const supabase = createServerClient(); 
  
  // 1. ログイン状態の確認
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/login');
  }

  // ▼▼▼ 修正: RLSをバイパスして確実に状態をチェックするため、システム権限を使用 ▼▼▼
  const supabaseAdmin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data: userData } = await supabaseAdmin
    .from('users')
    .select('is_deleted')
    .eq('id', user.id)
    .single();

  // 退会済みなら退出ページへ強制リダイレクト
  if (userData?.is_deleted) {
    redirect('/deactivated');
  }
  // ▲▲▲ 修正ここまで ▲▲▲

  // 3. 正常なユーザーのみ既存のUIを描画
  return (
    <div className="flex flex-1 flex-col items-center justify-start pt-[60px] pb-[90px] bg-background px-[20px]">
      <main className="flex w-full max-w-[430px] flex-col gap-[40px]">
          <ViewTransition>
            <UserProvider>
              {children}
              <BottomNav />
            </UserProvider>
          </ViewTransition>
      </main>
    </div>
  );
}