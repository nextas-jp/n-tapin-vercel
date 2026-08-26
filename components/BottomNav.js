"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * //MEMO: 動的バージョン用
 */
// const TABS = [
//   {
//     label: "ホーム",
//     href: "/dashboard",
//     icon: { svg: "", width: 24, height: 25 },
//   },
//   {
//     label: "投稿",
//     href: "/post",
//     icon: { svg: "", width: 30, height: 30 },
//     opensPhotoPicker: true,
//   },
//   {
//     label: "出勤",
//     href: "/attendance",
//     icon: { svg: "", width: 27, height: 27 },
//   },
//   {
//     label: "シフト",
//     href: null,
//     icon: { svg: "", width: 23, height: 26 },
//   },
//   {
//     label: "設定",
//     href: "/settings",
//     icon: { svg: "", width: 22, height: 23 },
//   },
// ];


export default function() {
  const listRef = useRef(null);

  /**
   * //MEMO: 動的バージョン用のbody
   */
  // const body = (
  //   <>
  //     <span className="flex w-[35px] h-[35px] items-center justify-center">
  //       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25">
  //         <path fill="var(--foreground)" d="M8.293 23.467v-3.822c0-.976.797-1.767 1.78-1.767h3.593c.472 0 .924.186 1.258.517.334.332.521.781.521 1.25v3.822c-.003.405.158.795.445 1.083s.68.45 1.089.45h2.45a4.33 4.33 0 0 0 3.055-1.249 4.26 4.26 0 0 0 1.266-3.029V9.834a3.09 3.09 0 0 0-1.12-2.378L14.294.845a3.87 3.87 0 0 0-4.936.089L1.209 7.456A3.1 3.1 0 0 0 0 9.834V20.71C0 23.08 1.934 25 4.32 25h2.395a1.54 1.54 0 0 0 1.545-1.522z"/>
  //       </svg>
  //     </span>
  //     <span className="text-[10px] leading-[14px] text-black">ホーム</span>
  //   </>
  // );

  return (
    <nav
      aria-label="メインナビゲーション"
      className="nav-shadow fixed bottom-0 left-0 z-10 w-full bg-surface"
    >
      <ul
        ref={listRef}
        className="relative mx-auto flex h-[84px] w-full max-w-[390px] items-center justify-center gap-[35px] px-[35px]"
      >
        <li>
          <Link
            href="/dashboard"
            onClick={undefined}
            className="relative flex w-[40px] flex-col items-center gap-[4px] text-center transition-transform duration-300 ease-out"
          >
            <span className="flex w-[35px] h-[35px] items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25">
                <path fill="var(--foreground)" d="M8.293 23.467v-3.822c0-.976.797-1.767 1.78-1.767h3.593c.472 0 .924.186 1.258.517.334.332.521.781.521 1.25v3.822c-.003.405.158.795.445 1.083s.68.45 1.089.45h2.45a4.33 4.33 0 0 0 3.055-1.249 4.26 4.26 0 0 0 1.266-3.029V9.834a3.09 3.09 0 0 0-1.12-2.378L14.294.845a3.87 3.87 0 0 0-4.936.089L1.209 7.456A3.1 3.1 0 0 0 0 9.834V20.71C0 23.08 1.934 25 4.32 25h2.395a1.54 1.54 0 0 0 1.545-1.522z"/>
              </svg>
            </span>
            <span className="text-[10px] leading-[14px] text-black">ホーム</span>
          </Link>
        </li>
        <li>
          <Link
            href="/post"
            onClick={undefined}
            className="relative flex w-[40px] flex-col items-center gap-[4px] text-center transition-transform duration-300 ease-out"
          >
            <span className="flex w-[35px] h-[35px] items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="29" height="29">
                <path stroke="var(--foreground)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.5 9.45v10.074M19.542 14.487H9.458"/>
                <path stroke="var(--foreground)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.943.75H8.057C3.565.75.75 3.93.75 8.43v12.14c0 4.5 2.802 7.68 7.307 7.68h12.886c4.505 0 7.307-3.18 7.307-7.68V8.43c0-4.5-2.802-7.68-7.307-7.68" clipRule="evenodd"/>
              </svg>
            </span>
            <span className="text-[10px] leading-[14px] text-black">投稿</span>
          </Link>
        </li>
        <li>
          <Link
            href="/attendance"
            onClick={undefined}
            className="relative flex w-[40px] flex-col items-center gap-[4px] text-center transition-transform duration-300 ease-out has-nav-raised-disc"
          >
            <span className="flex w-[35px] h-[35px] items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="27" height="27">
                <path fill="url(#a&gradientY8UiR)" fillRule="evenodd" clipRule="evenodd" d="M13.333 26.667C5.973 26.667 0 20.707 0 13.333 0 5.973 5.973 0 13.333 0c7.374 0 13.334 5.973 13.334 13.333 0 7.374-5.96 13.334-13.334 13.334m4.254-8.387a.99.99 0 0 0 1.373-.347c.28-.466.133-1.08-.347-1.373l-4.746-2.827v-6.16c0-.56-.454-1-1-1-.547 0-1 .44-1 1v6.734c0 .346.186.666.493.853z"/>
                <defs>
                  <linearGradient id="a&gradientY8UiR" x1="6.591" x2="20.454" y1="22.046" y2="6.742" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#44ea49"/>
                    <stop offset="1" stopColor="#71ff76"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="text-[10px] leading-[14px] text-black">出勤</span>
          </Link>
        </li>
        <li>
          <Link
            href="#"
            onClick={undefined}
            className="relative flex w-[40px] flex-col items-center gap-[4px] text-center transition-transform duration-300 ease-out"
          >
            <span className="flex w-[35px] h-[35px] items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="27">
                <path stroke="var(--foreground)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M.866 10.005h22.28M17.553 14.887h.011M12.006 14.887h.011M6.447 14.887h.012M17.553 19.745h.011M12.006 19.745h.011M6.447 19.745h.012M17.055.75v4.113M6.957.75v4.113"/>
                <path stroke="var(--foreground)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.298 2.724H6.714C3.043 2.724.75 4.769.75 8.528V19.84c0 3.818 2.293 5.91 5.964 5.91h10.572c3.683 0 5.964-2.057 5.964-5.816V8.528c.012-3.76-2.27-5.804-5.952-5.804" clipRule="evenodd"/>
              </svg>
            </span>
            <span className="text-[10px] leading-[14px] text-black">シフト</span>
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            onClick={undefined}
            className="relative flex w-[40px] flex-col items-center gap-[4px] text-center transition-transform duration-300 ease-out"
          >
            <span className="flex w-[35px] h-[35px] items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="25">
                <path stroke="var(--foreground)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m22.66 7.283-.777-1.32c-.659-1.117-2.117-1.502-3.261-.861v0a2.43 2.43 0 0 1-1.806.247 2.38 2.38 0 0 1-1.455-1.075 2.2 2.2 0 0 1-.32-1.119v0a2.3 2.3 0 0 0-.676-1.697A2.42 2.42 0 0 0 12.649.75h-1.567c-.634 0-1.24.247-1.687.686a2.3 2.3 0 0 0-.693 1.652v0C8.683 4.366 7.618 5.393 6.31 5.393a2.3 2.3 0 0 1-1.144-.313v0c-1.144-.641-2.602-.256-3.26.86L1.07 7.284a2.31 2.31 0 0 0 .87 3.189v0a2.33 2.33 0 0 1 1.195 2.025 2.33 2.33 0 0 1-1.195 2.025v0a2.3 2.3 0 0 0-.87 3.177v0l.79 1.331c.308.544.826.946 1.438 1.116a2.44 2.44 0 0 0 1.823-.21v0a2.42 2.42 0 0 1 1.805-.236c.61.16 1.13.55 1.444 1.087a2.2 2.2 0 0 1 .32 1.118v0c0 1.292 1.071 2.339 2.392 2.339h1.567c1.316 0 2.385-1.04 2.392-2.328v0a2.3 2.3 0 0 1 .697-1.656c.449-.44 1.059-.685 1.694-.682.402.01.795.119 1.144.314v0c1.14.642 2.599.262 3.26-.85v0l.825-1.343a2.28 2.28 0 0 0 .243-1.771 2.33 2.33 0 0 0-1.113-1.418v0a2.34 2.34 0 0 1-1.113-1.417 2.28 2.28 0 0 1 .244-1.77 2.3 2.3 0 0 1 .869-.851v0a2.31 2.31 0 0 0 .87-3.177v0z" clipRule="evenodd"/>
                <ellipse cx="11.871" cy="12.497" stroke="var(--foreground)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" rx="3.295" ry="3.222"/>
              </svg>
            </span>
            <span className="text-[10px] leading-[14px] text-black">設定</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}