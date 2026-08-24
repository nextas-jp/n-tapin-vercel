"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { PageHeader } from "@/components/PageHeader";
import { cardClassName } from "@/components/styles";
import { useSignup } from "../signup-context";

import ProfileAvatar from "@/components/ProfileAvatar";

export default function SignUpAvatar() {
  const router = useRouter();
  const { avatarUrl, setAvatar } = useSignup(); // MEMO: object here if typescript is used later
  // const [ avatarUrl, setAvatar ] = useState();
  const fileInputRef = useRef(null);

  function handleSubmit(event) {
    //TODO: Add supabase ressource saving
    event.preventDefault();
    router.push("/signup/confirm");
  }

  function handleSkip(event) {
    event.preventDefault();
    router.push("/signup/confirm");
  }

  function handleMediaChange(event) {
    const file = event.target.files?.[0];

    if (file) {
      setAvatar(file);
    }
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  return (
    <>
      <PageHeader
        backLinkUrl = "/signup/name"
        title="プロフィール写真を追加"
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
        <div className={`${cardClassName} flex justify-center`}>
          <ProfileAvatar
            avatarUrl={avatarUrl}
          />
        </div>
        <div className={`${cardClassName} flex flex-col gap-[8px]`}>
          {avatarUrl ? (
            <>
              <PrimaryButton>次へ</PrimaryButton>
              <SecondaryButton type="button" onClick={ openFilePicker }>写真を変更</SecondaryButton>      
            </>
          ) : (
            <>
              <PrimaryButton type="button" onClick={ openFilePicker }>写真を追加</PrimaryButton>
              <SecondaryButton onClick={ e => handleSkip(e) }>スキップ</SecondaryButton>
            </>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleMediaChange}
        />
      </form>
    </>
  );
}