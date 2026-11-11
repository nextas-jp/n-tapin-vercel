"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TextField } from "@/components/TextField";
import { PrimaryButton } from "@/components/Buttons";
import { PageHeader } from "@/components/PageHeader";
import { useSignup } from "./signup-context";
import { createBrowserClient } from "@/utils/supabase/client";

export default function Signup() {
  const router = useRouter();
  const { email, setEmail, password, setPassword } = useSignup();
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    // パスワードの一致チェック
    if (password !== passwordConfirm) {
      alert("パスワードが一致しません。");
      return;
    }

    setIsSubmitting(true);

    const supabase = createBrowserClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/signup/name`,
      }
    });

    setIsSubmitting(false);

    if (error) {
      console.error(error);
      alert("エラーが発生しました: " + error.message);
    } else {
      setIsEmailSent(true);
    }

    if (isEmailSent) {
      return (
        <>
          <PageHeader
            title="確認メールを送信しました"
            description="ご入力いただいたメールアドレスに認証リンクを送信しました。"
          />
          <section className="relative px-[20px] mt-[40px]">
            <div className="card-element text-center flex flex-col gap-[16px]">
              <p className="text-[14px] leading-relaxed">
                メール内のリンクをクリックすると、<br />
                引き続きプロフィールの設定（お名前・写真）へ進むことができます。
              </p>
              <p className="text-[12px] text-gray-500 mt-[20px]">
                ※この画面は閉じていただいて構いません。
              </p>
            </div>
          </section>
        </>
      );
    }
  }

  return (
    <>
      <PageHeader
        backLinkUrl="/login"
        title="新規登録"
        description="メールアドレスとパスワードを入力してください。"
      />

      <section className="relative">
        <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
          <div className="card-element">
            <TextField
              id="email"
              name="email"
              label="メールアドレス"
              type="email"
              autoComplete="username"
              placeholder="メールアドレスを入力してください"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="card-element flex flex-col gap-[16px]">
            <TextField
              id="password"
              name="password"
              label="パスワード"
              type="password"
              autoComplete="new-password"
              placeholder="パスワードを入力してください"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <TextField
              id="passwordConfirm"
              name="passwordConfirm"
              label="パスワード（確認用）"
              type="password"
              autoComplete="new-password"
              placeholder="パスワードを再入力してください"
              required
              value={passwordConfirm}
              onChange={(event) => setPasswordConfirm(event.target.value)}
            />
          </div>
          <div className="card-element flex flex-col gap-[8px]">
            <PrimaryButton disabled={isSubmitting}>{isSubmitting ? "送信中..." : "新規登録"}</PrimaryButton>
            <p className="text-center text-[16px] leading-[22px]">
              <Link href="/login">アカウントをお持ちの方は<span className="underline">こちら</span></Link>
            </p>
          </div>
        </form>
      </section>
    </>
  );
}