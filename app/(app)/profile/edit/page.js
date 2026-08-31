"use client";

// import { useRouter } from "next/navigation";
// import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useUser } from "../../user-context";
import { TextField } from "@/components/TextField";
import ProfileAvatar from "@/components/ProfileAvatar";
import Link from "next/link";
import { createBrowserClient } from "@/utils/supabase/client";

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
    const supabase = createBrowserClient();
    let finalAvatarUrl = user.avatarUrl; // 現在のURLをデフォルトにする

    // 1. 新しい画像が選択されている場合、Storageにアップロードする
    if (avatarFile) {
      // ファイル名を一意にする (例: ユーザーID-現在時刻.jpg)
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatarFile, { upsert: true });

      if (error) {
        alert("画像のアップロードに失敗しました。");
        console.error(error);
        return; // 失敗したらここで処理を止める
      }

      // 2. アップロードした画像の公開URLを取得する
      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      finalAvatarUrl = publicUrlData.publicUrl;
      setAvatarFile(finalAvatarUrl); // Context(画面表示用)を更新
    }

    // 3. データベース(usersテーブル)に変更を保存する
    // 名前が変更されていれば保存
    if (user.name !== staticInitialUserCopy.current.name) {
      await saveUserDataToDB("username", user.name);
    }

    // 画像が変更されていれば保存
    if (finalAvatarUrl !== staticInitialUserCopy.current.avatarUrl) {
      await saveUserDataToDB("avatar_url", finalAvatarUrl);
    }
  }

  function revertUserState() {
    setUsername(staticInitialUserCopy.current.name);
    setAvatarPreviewUrl(staticInitialUserCopy.current.avatarUrl);
  }

  return (
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
            <button
              type="button"
              onClick={openFilePicker}
              className="underline"
            >写真を変更する</button>
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