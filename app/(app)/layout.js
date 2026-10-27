import { redirect } from 'next/navigation';
import { createBrowserClient } from '@/utils/supabase/client'; 

import { ViewTransition } from 'react';
import { UserProvider } from "./user-context";
import BottomNav from "@/components/BottomNav";

// ▼ async を追加してサーバーでのデータ取得を可能にする
export default async function AppLayout({ children }) {
  const supabase = await createBrowserClient();
  
  // 1. ログイン状態の確認
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/login');
  }

  // 2. 退会済み（is_deleted）のチェック
  const { data: userData } = await supabase
    .from('users')
    .select('is_deleted')
    .eq('id', user.id)
    .single();

  if (userData?.is_deleted) {
    redirect('/deactivated'); // 退会済みなら退出ページへ強制リダイレクト
  }

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