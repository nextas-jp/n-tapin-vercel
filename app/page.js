"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/constants";
import { Logo } from "@/components/Logo";
import { ViewTransition } from 'react';

export default function RootScreen() {
  const router = useRouter();

  async function checkAuthSomehow() {
    return false; // e.g. read a cookie/token/supabase
  }

  useEffect(() => {
    const minDelay = new Promise((res) => setTimeout(res, 1500)); // 1.5s floor
    const authCheck = checkAuthSomehow(); // e.g. read a cookie/token/supabase

    Promise.resolve(authCheck).then(async (isLoggedIn) => {
      await minDelay; // wait for whichever finishes last
      router.replace(isLoggedIn ? "/dashboard" : "/login");
    });
  }, [router]);

  return (
    <ViewTransition>
      <main
        role="status"
        aria-label="読み込み中"
        className="relative flex flex-1 flex-col items-center justify-center bg-background"
      >
        <div className="flex items-center gap-[20px] animate-bounce">
          <div className="w-[70px] h-[70px]"><Logo /></div>
          <span className="font-brand text-[42.5px] font-bold leading-none text-foreground">{siteConfig.title}</span>
        </div>
        <p className="absolute bottom-[10%] font-brand text-[8px] leading-none text-caption">ATTENDANCE MANAGEMENT | POWERED BY NEXTAS</p>
      </main>
    </ViewTransition>
  );
}