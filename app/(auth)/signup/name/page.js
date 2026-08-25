"use client";

import { useRouter } from "next/navigation";
import { TextField } from "@/components/TextField";
import { PrimaryButton } from "@/components/Buttons";
import { PageHeader } from "@/components/PageHeader";
import { useSignup } from "../signup-context";

export default function SignUpName() {
  const router = useRouter();
  const { username, setUsername } = useSignup();

  function handleSubmit(event) {
    //TODO: Add signup logic (supabase?)
    event.preventDefault();
    router.push("/signup/avatar");
  }

  return (
    <>
      <PageHeader
        backLinkUrl = "/login"
        title="名前を入力してください。"
      />

      <section className="relative">
        <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
          <div className="card-element">
            <TextField
              id="username"
              name="username"
              label="ユーザーネーム"
              type="text"
              autoComplete="username"
              placeholder="ユーザーネームを入力してください"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              maxLength="20"
            />
          </div>
          <div className="card-element flex flex-col gap-[8px]">
            <PrimaryButton>次へ</PrimaryButton>
          </div>
        </form>
      </section>
    </>
  );
}