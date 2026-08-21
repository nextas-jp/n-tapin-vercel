"use client";

import Link from "next/link";
import { useObjectUrl } from "@/hooks/use-object-url";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TextField } from "@/components/TextField";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { PageHeader } from "@/components/PageHeader";
import { cardClassName } from "@/components/styles";

export default function SignUpAvatar() {
  const router = useRouter();
  const [avatar, setAvatar] = useState("");

  function handleSubmit(event) {
    //TODO: Add supabase ressource saving
    event.preventDefault();
    router.push("/signup/confirm");
  }

  function handleSkip(event) {
    event.preventDefault();
    router.push("/signup/confirm");
  }

  return (
    <>
      <PageHeader
        backLinkUrl = "/signup/name"
        title="プロフィール写真を追加"
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
        <div className={cardClassName}>
          {/* TODO: Add profile avatar image field */}
          <p>工事中</p>
        </div>
        <div className={`${cardClassName} flex flex-col gap-[8px]`}>
          <PrimaryButton>写真を追加</PrimaryButton>
          <SecondaryButton onClick={ () => handleSkip() }>スキップ</SecondaryButton>
        </div>
      </form>
    </>
  );
}