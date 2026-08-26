"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useUser } from "../user-context";
import { PageHeader } from "@/components/PageHeader";

export default function Post() {
  const fileInputRef = useRef(null);
  const [postFile, setPostFileLocal] = useState(null);
  const [previewPostUrl, setPreviewPostUrl] = useState("https://dummyimage.com/315x315/cccccc/fff");
  const { addPost } = useUser();

  useEffect(() => {
    openFilePicker();
  }, []);

  function handleMediaChange(event) {
    const file = event.target.files?.[0];

    if (file) {
      console.log(file);
      
      setPostFileLocal(file);
      addPost(URL.createObjectURL(file));
      setPreviewPostUrl(URL.createObjectURL(file));
    }
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function savePost() {
    //TODO: save to supabase
    // addPost(postFile);
  }

  return (
    <>
      <PageHeader
        backLinkUrl="/dashboard"
        title="プロフィール編集"
      >
        <Link href="/dashboard" onClick={savePost} className="text-[20px] leading-[27px] font-bold">完了</Link>
      </PageHeader>
      <section className="relative">
        <div className="card-element flex flex-col items-center gap-[16px]">
          <div className="w-[315px] h-[315px]">
            <Image
              src={previewPostUrl}
              width={315}
              height={315}
              alt="イメージ画像"
              className="object-cover w-[100%] h-[100%]"
            />
          </div>
          <p className="text-[20px] leading-[27px] font-bold">
            <Link
              href=""
              onClick={openFilePicker}
            >写真を変更する</Link>
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