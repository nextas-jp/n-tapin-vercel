"use client";

import Image from "next/image";
import { SecondaryButton } from "@/components/Buttons";
import { Logo } from "@/components/Logo";
import { useUser } from "../user-context";



export default function Dashboard() {
  const { user } = useUser();

  return (
    <>
      <header className="flex justify-between gap-[10px]">
        <div className="flex items-center gap-[10px]">
          <div className="w-[46px] h-[46px]">
            <Logo />
          </div>
          <div className="flex flex-col gap-[3px]">
            <span className="font-brand text-[25px] leading-none font-bold text-foreground">
              TapIn
            </span>
            <span className="font-brand text-[5px] leading-none text-caption">
              ATTENDANCE MANAGEMENT | POWERED BY NEXTAS
            </span>
          </div>
        </div>

        <button
          type="button"
          aria-label="通知"
          className="flex size-[46px] items-center justify-center rounded-[5px] bg-surface shadow-[2px_2px_4px_0_rgb(0_0_0/0.1)]"
        >
          <span className="relative size-[30px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
              <path fillRule="evenodd" clipRule="evenodd" d="M15 22.3096C22.049 22.3096 25.3101 21.4053 25.625 17.7756C25.625 14.1485 23.3514 14.3817 23.3514 9.93139C23.3514 6.45517 20.0565 2.5 15 2.5C9.94346 2.5 6.64856 6.45517 6.64856 9.93139C6.64856 14.3817 4.375 14.1485 4.375 17.7756C4.69119 21.419 7.95222 22.3096 15 22.3096Z" stroke="#323232" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17.9861 26.0715C16.2809 27.9649 13.6209 27.9874 11.8994 26.0715" stroke="#323232" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
      </header>

      <div>
        <div className="card-element">
          <p>{user.name}</p>
          <p>未出勤</p>
          <SecondaryButton
            isthin={true}
          >プロフィールを編集</SecondaryButton>
        </div>

        <div className="mt-[40px]">
          <ul className="grid grid-cols-3 gap-[8px]">
            <li className="aspect-square overflow-hidden rounded-[10px] bg-field">
              {/* <Image
                width={112}
                height={112}
                className="size-full object-cover"
              /> */}
            </li>
            {/* <li className="aspect-square overflow-hidden rounded-[10px] bg-field"></li>
            <li className="aspect-square overflow-hidden rounded-[10px] bg-field"></li>
            <li className="aspect-square overflow-hidden rounded-[10px] bg-field"></li>
            <li className="aspect-square overflow-hidden rounded-[10px] bg-field"></li>
            <li className="aspect-square overflow-hidden rounded-[10px] bg-field"></li>
            <li className="aspect-square overflow-hidden rounded-[10px] bg-field"></li> */}
          </ul>
        </div>
      </div>
    </>
  );
}