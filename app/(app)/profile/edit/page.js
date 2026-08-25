"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useUser } from "../../user-context";
import { TextField } from "@/components/TextField";
import Image from "next/image";
import ProfileAvatar from "@/components/ProfileAvatar";
import Link from "next/link";

export default function ProfileEdit() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const { user, setUsername, setAvatarFile } = useUser();

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function handleMediaChange(event) {
    const file = event.target.files?.[0];

    if (file) {
      setAvatarFile(file);
    }
  }

  function updateProfile() {
    // update superbase
  }

  return(
    <>
      <PageHeader
        backLinkUrl="/dashboard"
        title="プロフィール編集"
      >
        <Link href="/dashboard" onClick={updateProfile} className="text-[20px] leading-[27px] font-bold">完了</Link>
      </PageHeader>

      <section className="relative">
        <div className="card-element flex flex-col items-center gap-[16px]">
            {/* <figure>
              <Image
                src={user.avatarUrl}
                width={140}
                height={140}
                loading="eager"
                alt={`${user.name}のプロフィル画像`}
                className="shrink-0 rounded-full object-cover mb-[16px]"
              />
            </figure> */}
            <ProfileAvatar
              avatarUrl={user.avatarUrl}
            />
            <p className="text-[20px] leading-[27px] font-bold">
              <Link
                href=""
                onClick={ openFilePicker }
              >写真を変更する</Link>
            </p>
        </div>

        <div className="card-element">
          <TextField
            id="username"
            name="username"
            label="ユーザーネーム"
            type="text"
            autoComplete="username"
            placeholder="ユーザーネームを入力してください"
            required
            value={user.name}
            onChange={(event) => setUsername(event.target.value)}
            maxLength="20"
          />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleMediaChange}
        />
      </section>
    </>
  );
}