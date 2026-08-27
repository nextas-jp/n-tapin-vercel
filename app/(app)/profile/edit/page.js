"use client";

// import { useRouter } from "next/navigation";
// import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useUser } from "../../user-context";
import { TextField } from "@/components/TextField";
import ProfileAvatar from "@/components/ProfileAvatar";
import Link from "next/link";

export default function ProfileEdit() {
  const fileInputRef = useRef(null);
  const { user, setUsername, setAvatarFile, saveUserDataToDB } = useUser();
  const [avatarFile, setAvatarFileLocal] = useState(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(user.avatarUrl);

  // MEMO: cache current user name to revert back to it if the back button is it (useRef creates a mutable object)
  const staticInitialUserCopy = useRef(null);
  useEffect(() => {
    staticInitialUserCopy.current = { ...user };
  }, []);

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function handleMediaChange(event) {
      const file = event.target.files?.[0];
  
      if (file) {
        setAvatarFileLocal(file);
        setAvatarPreviewUrl(URL.createObjectURL(file));
      }
  }

  async function updateProfile() {
    if (avatarFile) setAvatarFile(avatarFile); // push to context only now
    // update supabase
    saveUserDataToDB("username", user.name); // add a conditional statement to check if username has changed before saving (to save network resources...)
  }

  function revertUserState() {
    setUsername(staticInitialUserCopy.current.name);
    setAvatarPreviewUrl(staticInitialUserCopy.current.avatarUrl);
  }

  return(
    <>
      <PageHeader
        backLinkUrl="/dashboard"
        onBackNavigate={revertUserState}
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
              avatarUrl={avatarPreviewUrl}
            />
            <p className="text-[20px] leading-[27px] font-bold">
              <Link
                href=""
                onClick={openFilePicker}
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