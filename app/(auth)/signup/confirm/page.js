"use client";

import { useRouter } from "next/navigation";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { PageHeader } from "@/components/PageHeader";
import { useSignup } from "../signup-context";
import ProfileAvatar from "@/components/ProfileAvatar";
import { createBrowserClient } from "@/utils/supabase/client"; // Supabaseをインポート

export default function SignUpConfirm() {
  const router = useRouter();
  // Contextからすべての入力データを取得
  const { email, password, username, avatarUrl } = useSignup();
  const supabase = createBrowserClient();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // 1. Supabase Authにユーザー登録（自動的にログインセッションが作成されます）
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      // 2. 作成されたユーザーIDを使って、usersテーブルの username を更新
      // （※事前に設定したDBトリガーにより、authData.user.id の行は既に存在しています）
      if (authData.user) {
        const { error: dbError } = await supabase
          .from("users")
          .update({ username: username })
          .eq("id", authData.user.id);

        if (dbError) throw dbError;
      }

      // TODO: アバター画像が設定されている場合(avatarUrlがある場合)、
      // Supabase Storageへのアップロード処理をここに追加します。

      // 3. 全て成功したらダッシュボードへ遷移
      router.push("/dashboard");

    } catch (error) {
      console.error(error);
      alert("登録中にエラーが発生しました: " + error.message);
    }
  }

  function handleBack(event) {
    event.preventDefault();
    router.push("/signup/name");
  }

  return (
    <>
      <PageHeader title="さぁ、始めましょう！" />
      <section className="relative">
        <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
          <div className="card-element flex flex-col items-center gap-[16px]">
            <ProfileAvatar avatarUrl={avatarUrl} />
            <p className="text-[20px] leading-[27px] font-semibold">{username}</p>
          </div>
          <div className="card-element flex flex-col gap-[8px]">
            <PrimaryButton>完了</PrimaryButton>
            <SecondaryButton onClick={handleBack}>登録情報を修正する</SecondaryButton>
          </div>
        </form>
      </section>
    </>
  );
}