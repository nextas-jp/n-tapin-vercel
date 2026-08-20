"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
    <div className="flex items-center">
      <h1>DUMMY SPLASH SCREEN</h1>
      <p className="absolute bottom-[10.31%] font-brand text-[7.73px] leading-none text-caption">
        ATTENDANCE MANAGEMENT | POWERED BY NEXTAS
      </p>
    </div>
    
  );
}