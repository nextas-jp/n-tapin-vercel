"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";


const TABS = [
  {
    label: "ホーム",
    href: "/dashboard",
    icon: { svg: "/nav-home.svg", width: 24, height: 25 },
  },
  {
    label: "投稿",
    href: "/post",
    icon: { svg: "/nav-post.svg", width: 30, height: 30 },
    opensPhotoPicker: true,
  },
  {
    label: "出勤",
    href: "/attendance",
    icon: { svg: "/nav-attendance.svg", width: 27, height: 27 },
  },
  {
    label: "シフト",
    href: null,
    icon: { svg: "/nav-shift.svg", width: 23, height: 26 },
  },
  {
    label: "設定",
    href: null,
    icon: { svg: "/nav-settings.svg", width: 22, height: 23 },
  },
];


export default function() {
  const listRef = useRef(null);
  const [currentIndicator, setCurrentIndicator] = useState(null);
  const [canAnimate, setCanAnimate] = useState(false);

  const body = (
    <>
      <span className="flex w-[35px] h-[35px] items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25">
          <path fill="var(--foreground)" d="M8.293 23.467v-3.822c0-.976.797-1.767 1.78-1.767h3.593c.472 0 .924.186 1.258.517.334.332.521.781.521 1.25v3.822c-.003.405.158.795.445 1.083s.68.45 1.089.45h2.45a4.33 4.33 0 0 0 3.055-1.249 4.26 4.26 0 0 0 1.266-3.029V9.834a3.09 3.09 0 0 0-1.12-2.378L14.294.845a3.87 3.87 0 0 0-4.936.089L1.209 7.456A3.1 3.1 0 0 0 0 9.834V20.71C0 23.08 1.934 25 4.32 25h2.395a1.54 1.54 0 0 0 1.545-1.522z"/>
        </svg>
      </span>
      <span className="text-[10px] leading-[14px] text-black">ホーム</span>
    </>
  );

  return (
    <nav
      aria-label="メインナビゲーション"
      className="shadow-nav fixed bottom-0 left-0 z-10 w-full bg-surface"
    >
      <ul
        ref={listRef}
        className="relative mx-auto flex h-[84px] w-full max-w-[390px] items-center justify-between px-[35px]"
      >
          <li
            aria-hidden
            className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: currentIndicator,
              transition: canAnimate
                ? "left 0.3s cubic-bezier(0.34, 1.4, 0.64,  1)"
                : "none",
            }}
          >
            <span className="shadow-nav-raised block size-[70px] rounded-full bg-surface" />
          </li>

          <li>
            <Link
              href="/profile"
              onClick={undefined}
              // aria-current={active ? "page" : undefined}
              className="relative flex w-[40px] flex-col items-center gap-[4px] text-center transition-transform duration-300 ease-out"
            >
              {body}
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              onClick={undefined}
              // aria-current={active ? "page" : undefined}
              className="relative flex w-[40px] flex-col items-center gap-[4px] text-center transition-transform duration-300 ease-out"
            >
              {body}
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              onClick={undefined}
              // aria-current={active ? "page" : undefined}
              className="relative flex w-[40px] flex-col items-center gap-[4px] text-center transition-transform duration-300 ease-out"
            >
              {body}
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              onClick={undefined}
              // aria-current={active ? "page" : undefined}
              className="relative flex w-[40px] flex-col items-center gap-[4px] text-center transition-transform duration-300 ease-out"
            >
              {body}
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              onClick={undefined}
              // aria-current={active ? "page" : undefined}
              className="relative flex w-[40px] flex-col items-center gap-[4px] text-center transition-transform duration-300 ease-out"
            >
              {body}
            </Link>
          </li>
      </ul>
    </nav>
  );
}