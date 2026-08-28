"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../user-context";
import { PageHeader } from "@/components/PageHeader";
import { createBrowserClient } from "@/utils/supabase/client";

export default function Post() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [postFile, setPostFileLocal] = useState(null);
  const [previewPostUrl, setPreviewPostUrl] = useState("https://dummyimage.com/315x315/cccccc/fff");
  
  // 処理中（アップロード中）のボタン連打を防ぐためのステート
  const [isUploading, setIsUploading] = useState(false);
  const { addPost } = useUser();
  const supabase = createBrowserClient();

  useEffect(() => {
    openFilePicker();
  }, []);

  function handleMediaChange(event) {
    const file = event.target.files?.[0];

    if (file) {
      setPostFileLocal(file);
      setPreviewPostUrl(URL.createObjectURL(file));
    }
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  async function savePost(event) {
    event.preventDefault(); // デフォルトのボタン動作をキャンセル

    if (!postFile) {
      alert("写真を選択してください");
      return;
    }

    setIsUploading(true);

    try {
      // 現在のログインユーザーを取得
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("ユーザー認証エラー");

      // 1. Storageに画像をアップロードする
      const fileExt = postFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`; // 一意のファイル名を生成

      const { error: uploadError } = await supabase.storage
        .from("posts")
        .upload(fileName, postFile);

      if (uploadError) throw uploadError;

      // 2. アップロードした画像の公開URLを取得する
      const { data: publicUrlData } = supabase.storage
        .from("posts")
        .getPublicUrl(fileName);

      const publicUrl = publicUrlData.publicUrl;

      // 3. データベース(postsテーブル)に情報を保存する
      const { error: dbError } = await supabase
        .from("posts")
        .insert({
          user_id: user.id,
          image_url: publicUrl,
        });

      if (dbError) throw dbError;

      // 4. アプリ全体のステート(Context)に新しい投稿を追加して、ダッシュボードへ遷移
      addPost(publicUrl);
      router.push("/dashboard");

    } catch (error) {
      console.error(error);
      alert("投稿に失敗しました。");
      setIsUploading(false); // 失敗時はボタンを押せるように戻す
    }
  }

  return (
    <>
      <PageHeader
        backLinkUrl="/dashboard"
        title="新規投稿"
      >
        {/* Linkをbuttonに変更し、アップロード中は押せないようにする */}
        <button 
          onClick={savePost} 
          disabled={isUploading}
          className={`text-[20px] leading-[27px] font-bold ${isUploading ? "opacity-50" : ""}`}
        >
          {isUploading ? "送信中..." : "完了"}
        </button>
      </PageHeader>
      
      <section className="relative">
        <div className="card-element flex flex-col items-center gap-[16px]">
          <div className="w-[315px] h-[315px]">
            <img
              src={previewPostUrl}
              width={315}
              height={315}
              alt="イメージ画像"
              className="object-cover w-[100%] h-[100%]"
            />
          </div>
          <p className="text-[20px] leading-[27px] font-bold">
            <button
              type="button"
              onClick={openFilePicker}
              className="text-blue-500 underline"
            >
              写真を投稿する
            </button>
          </p>
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