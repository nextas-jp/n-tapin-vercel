"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useUser } from "../../user-context";
import { TextField } from "@/components/TextField";
import Image from "next/image";
import Link from "next/link";

export default function ProfileEdit() {
  const router = useRouter();
  const { user, setUsername, setAvatar } = useUser();

  function handleAvatarChange(event) {
    event.preventDefault();
    
    alert('DO SOMETHING');
  }

  return(
    <>
      <PageHeader
        backLinkUrl = "/dashboard"
        title="プロフィール編集"
      />


      <div className="card-element flex flex-col items-center">
        <figure>
          <Image
            src={user.avatarUrl}
            width={140}
            height={140}
            loading="eager"
            alt={`${user.name}のプロフィル画像`}
            className="shrink-0 rounded-full object-cover mb-[16px]"
          />
        </figure>
        <p className="text-[20px] leading-[27px] font-bold"><Link
            href=""
            onClick={ e => handleAvatarChange(e) }
          >写真を変更する</Link></p>
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
    </>
  );
}