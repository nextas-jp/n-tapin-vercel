"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TextField } from "@/components/TextField";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { cardClassName } from "@/components/styles";
// import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);

  function handleSubmit(event) {
    //TODO: Add signin logic (supabase?)
    event.preventDefault();
    router.push("/dashboard");
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background px-[20px]">
      <main className="flex w-full max-w-[430px] flex-col gap-[40px] ">
        <header className="flex flex-col">
          <h1 className="text-[28px] font-bold leading-[38px]">ログイン</h1>
          <p className="text-[16px] leading-[22px]">メールアドレスとパスワードを入力してください。</p>
        </header>
        
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
      </main>
    </div>
  );
}
