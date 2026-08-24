"use client";

/* //MEMO:
  現状、Signupの確認画面までいったら、次へのボタンを押すと、ログイン中の状態ではないので、
  ログイン画面にリダイレクトされます。
  confirm画面内に、セーフなログイン処理を加えるか、signup画面の段階でSupabaseへのuser登録と一緒にいれるか？？
*/

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TextField } from "@/components/TextField";
import { PrimaryButton } from "@/components/Buttons";
import { PageHeader } from "@/components/PageHeader";
import { cardClassName } from "@/components/styles";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function handleSubmit(event) {
    //TODO: Add signup logic (supabase?)
    event.preventDefault();
    router.push("/signup/name");
  }

  return (
    <>
      <PageHeader
        backLinkUrl = "/login"
        title="新規登録"
        description="メールアドレスとパスワードを入力してください。"
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
        <div className={cardClassName}>
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
        <div className={`${cardClassName} flex flex-col gap-[16px]`}>
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
        <div className={`${cardClassName} flex flex-col gap-[8px]`}>
          <PrimaryButton>新規登録</PrimaryButton>
          <p className="text-center text-[16px] leading-[22px]">
            <Link href="/login">アカウントをお持ちの方は<span className="underline">こちら</span></Link>
          </p>
        </div>
      </form>
    </>
  );
}