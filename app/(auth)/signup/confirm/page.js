"use client";

import { useRouter } from "next/navigation";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { PageHeader } from "@/components/PageHeader";
import { cardClassName } from "@/components/styles";
import { useSignup } from "../signup-context";

import ProfileAvatar from "@/components/ProfileAvatar";

export default function SignUpConfirm() {
  const router = useRouter();
  const { username, avatarUrl } = useSignup();

  function handleSubmit(event) {
    event.preventDefault();
    router.push("/dashboard");
  }

  function handleBack(event) {
    event.preventDefault();
    router.push("/signup/name");
  }

  return (
    <>
      <PageHeader
        title="さぁ、始めましょう！"
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
        <div className={`${cardClassName} flex flex-col items-center gap-[16px]`}>
          <ProfileAvatar
            avatarUrl={avatarUrl}
          />
          <p className="text-[20px] leading-[27px] font-semibold">{username}</p>
        </div>
        <div className={`${cardClassName} flex flex-col gap-[8px]`}>
          <PrimaryButton>完了</PrimaryButton>
          <SecondaryButton onClick={ e => handleBack(e) }>登録情報を修正する</SecondaryButton>
        </div>
      </form>
    </>
  );
}