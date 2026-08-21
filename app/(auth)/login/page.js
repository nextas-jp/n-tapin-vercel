"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TextField } from "@/components/TextField";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { PageHeader } from "@/components/PageHeader";
import { cardClassName } from "@/components/styles";

import { createBrowserClient } from "@/utils/supabase/client";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const supabase = createBrowserClient({ remember: autoLogin });

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) {
        console.log(signInError);
        
        alert('メールアドレスまたはパスワードが正しくありません。');
        return;
      }

      router.push("/dashboard");
    } catch {
      alert('ログインに失敗しました。しばらくしてからもう一度お試しください。');
    }
  }

  return (
    <>
      <PageHeader
        title="ログイン"
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
        <div className={`${cardClassName} flex flex-col gap-[8px]`}>
          <TextField
            id="password"
            name="password"
            label="パスワード"
            type="password"
            autoComplete="current-password"
            placeholder="パスワードを入力してください"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="flex items-center gap-[10px]">
            <input
              id="autoLogin"
              name="autoLogin"
              type="checkbox"
              checked={autoLogin}
              onChange={(event) => setAutoLogin(event.target.checked)}
              // className="size-[20px] appearance-none rounded-[3px] bg-field checked:bg-primary-gradient"
              className="size-[20px] rounded-[3px] bg-field"
            />
            <label
              htmlFor="autoLogin"
              className="text-[16px] leading-[22px] select-none"
            >次回から自動ログイン</label>
          </div>
        </div>
        <div className={`${cardClassName} flex flex-col gap-[8px]`}>
          <PrimaryButton>ログイン</PrimaryButton>
          <p className="text-center text-[16px] leading-[22px]">
            <Link href="/signup">アカウントをお持ちでない方は<span className="underline">こちら</span></Link>
          </p>
        </div>
      </form>
    </>
  );
}
