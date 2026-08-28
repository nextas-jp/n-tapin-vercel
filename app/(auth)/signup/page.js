"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TextField } from "@/components/TextField";
import { PrimaryButton } from "@/components/Buttons";
import { PageHeader } from "@/components/PageHeader";
import { useSignup } from "./signup-context"; // Contextをインポート

export default function Signup() {
  const router = useRouter();
  // Contextから取得するように変更
  const { email, setEmail, password, setPassword } = useSignup();
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    
    // パスワードの一致チェック
    if (password !== passwordConfirm) {
      alert("パスワードが一致しません。");
      return;
    }
    
    // ここではまだ登録せず、次の画面へ進むだけ
    router.push("/signup/name");
  }

  return (
    <>
      <PageHeader
        backLinkUrl = "/login"
        title="新規登録"
        description="メールアドレスとパスワードを入力してください。"
      />

      <section className="relative">
        <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
          {/* TextField等は元のままでOKです（valueとonChangeがContextに繋がります） */}
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
            <PrimaryButton>新規登録</PrimaryButton>
            <p className="text-center text-[16px] leading-[22px]">
              <Link href="/login">アカウントをお持ちの方は<span className="underline">こちら</span></Link>
            </p>
          </div>
        </form>
      </section>
    </>
  );
}