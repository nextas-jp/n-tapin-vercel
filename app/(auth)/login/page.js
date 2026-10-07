"use client";

import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/components/Buttons";
import { PageHeader } from "@/components/PageHeader";

import { createBrowserClient } from "@/utils/supabase/client";

export default function Login() {
  const router = useRouter();

  async function handleSSOLogin() {
    try {
      // 既存のセッション設定を引き継いでクライアントを作成
      const supabase = createBrowserClient();

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'custom:nextas-id',
        options: {
          // window.location.originを使うことで、ローカル(3001)でも本番環境でも自動でURLが合います
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("OAuth SignIn Error:", error);
        alert('認証ハブへの接続に失敗しました。');
        return;
      }
      
      // ※signInWithOAuth成功時は自動的にハブ側へリダイレクトされるため、router.pushは不要です

    } catch (err) {
      console.error(err);
      alert('エラーが発生しました。しばらくしてからもう一度お試しください。');
    }
  }

  return (
    <>
      <PageHeader
        title="ログイン"
        description="統合アカウント（NEXTAS ID）を使用してログインしてください。"
      />
      
      <section className="relative">
        <div className="flex flex-col gap-[24px]">
          <div className="card-element flex flex-col gap-[8px]">
            {/* formタグを外し、ボタンクリックで直接OIDC関数を呼び出します */}
            <div onClick={handleSSOLogin}>
              <PrimaryButton>NEXTAS IDでログイン</PrimaryButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}