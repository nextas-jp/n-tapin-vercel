"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TextField } from "@/components/TextField";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
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
      {/* //TODO: change to PageHEader component */}
      <header className="flex flex-col">
        <h1 className="text-[28px] font-bold leading-[38px]">新規登録</h1>
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
      </form>
    </>
  );
}