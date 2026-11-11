"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { PageHeader } from "@/components/PageHeader";
import { useSignup } from "../signup-context";
import ProfileAvatar from "@/components/ProfileAvatar";
import { createBrowserClient } from "@/utils/supabase/client"; // Supabaseをインポート

export default function SignUpConfirm() {
  const router = useRouter();
  // Contextからすべての入力データを取得
  const { username, avatarFile, avatarPreviewUrl } = useSignup();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createBrowserClient();

  async function handleSubmit(event) {
    event.preventDefault();

    if (!username) {
      alert("エラー: ユーザーネームが入力されていません。");
      router.push("/signup/name");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. 既にログイン済みのユーザー情報を取得
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error("セッションが見つかりません。お手数ですが再度ログインしてください。");
      }

      const userId = user.id;

      let finalAvatarUrl = null;

      // 2. Storage へアップロード
      if (avatarFile) {
        // 画像の拡張子を取得（例: "png", "jpg"）
        const fileExt = avatarFile.name.split('.').pop();
        // パスを "ユーザーID/ランダム文字列.拡張子" にしてキャッシュ事故を防ぐ
        const filePath = `${userId}/${Math.random()}.${fileExt}`;

        // "avatars" バケットにアップロード
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, avatarFile);

        if (uploadError) {
          console.error("画像のアップロードに失敗しました:", uploadError);
          throw new Error("画像のアップロードに失敗しました。");
        }

        // アップロードした画像のパブリックURL（公開用URL）を取得
        const { data: publicUrlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);

        finalAvatarUrl = publicUrlData.publicUrl;
      }

      // 3. 取得した画像URLとユーザーネームを users テーブルに保存
      // 更新用データの組み立て（画像があれば一緒に更新）
      const upsertData = {
        id: userId,
        username: username
      };

      if (finalAvatarUrl) {
        upsertData.avatar_url = finalAvatarUrl;
      }

      const { error: dbError } = await supabase
        .from("users")
        .upsert(upsertData);


      if (dbError) throw dbError;
      // 4. 全て成功したらダッシュボードへ遷移
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
            <ProfileAvatar avatarUrl={avatarPreviewUrl} />
            <p className="text-[20px] leading-[27px] font-semibold">{username}</p>
          </div>
          <div className="card-element flex flex-col gap-[8px]">
            <PrimaryButton disabled={isSubmitting}>{isSubmitting ? "処理中..." : "完了"}</PrimaryButton>
            <SecondaryButton onClick={handleBack}>登録情報を修正する</SecondaryButton>
          </div>
        </form>
      </section>
    </>
  );
}