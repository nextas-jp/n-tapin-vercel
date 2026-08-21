"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/constants";
import { Logo } from "@/components/Logo";

const MIN_SPLASH_MS = 1500; // arbitrary //TODO: ask designer for best timing

export function SplashRedirect({ isLoggedIn }) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(isLoggedIn ? "/dashboard" : "/login");
    }, MIN_SPLASH_MS);

    return () => clearTimeout(timer);
  }, [isLoggedIn, router]);

  return (
    <main role="status" aria-label="読み込み中" className="relative flex flex-1 flex-col items-center justify-center bg-background">
      <div className="flex items-center gap-[20px] animate-bounce">
        <div className="w-[70px] h-[70px]"><Logo /></div>
        <span className="font-brand text-[42.5px] font-bold leading-none text-foreground">{siteConfig.title}</span>
      </div>
      <p className="absolute bottom-[10%] font-brand text-[8px] leading-none text-caption">ATTENDANCE MANAGEMENT | POWERED BY N</p>
    </main>
  );
}