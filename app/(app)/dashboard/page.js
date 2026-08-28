"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SecondaryButton } from "@/components/Buttons";
import { Logo } from "@/components/Logo";
import { useUser } from "../user-context";
import ProfileAvatar from "@/components/ProfileAvatar";
import DutyStatusBadge from "@/components/DutyStatusBadge";

/**
 * //TODO: create a ProfileCard and a PhotoGrid Component (it should speed up overall rendering)
 */

export default function Dashboard() {
  const router = useRouter();
  const { user } = useUser();
  const { posts } = user;

  // console.log(posts);
  

  function handleProfileChangeJump(event) {
    event.preventDefault();

    router.push('/profile/edit');
  }
  

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

        <Link
          href="/notifications"
          aria-label="通知"
          className="relative flex size-[46px] items-center justify-center rounded-[5px] bg-surface shadow-[2px_2px_4px_0_rgb(0_0_0/0.1)]"
        >
          <span className="relative size-[30px]">
            <i className={`absolute top-px right-px w-[9px] h-[9px] aspect-square ${!user.notificationsAllRead && "bg-red-500"} rounded-full`}></i>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="30" height="30" viewBox="0 0 30 30">
              <path fillRule="evenodd" clipRule="evenodd" d="M15 22.3096C22.049 22.3096 25.3101 21.4053 25.625 17.7756C25.625 14.1485 23.3514 14.3817 23.3514 9.93139C23.3514 6.45517 20.0565 2.5 15 2.5C9.94346 2.5 6.64856 6.45517 6.64856 9.93139C6.64856 14.3817 4.375 14.1485 4.375 17.7756C4.69119 21.419 7.95222 22.3096 15 22.3096Z" stroke="#323232" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17.9861 26.0715C16.2809 27.9649 13.6209 27.9874 11.8994 26.0715" stroke="#323232" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </Link>
      </header>

      <section className="relative">
        <div className="card-element">
          <div className="flex items-center gap-[16px] mb-[16px]">
            <div className="relative">
              {/* <Image
                src={user.avatarUrl}
                width={100}
                height={100}
                alt={`${user.name}のプロフィル画像`}
                className="shrink-0 rounded-full object-cover"
              /> */}
              <ProfileAvatar
                avatarUrl={user.avatarUrl}
                size={100}
              />
            </div>
            <div>
              <p className="text-[20px] leading-[27px] font-bold">{user.name}</p>
              <DutyStatusBadge status={user.status} />
            </div>
          </div>
          <SecondaryButton
            isThin={true}
            onClick={ e => handleProfileChangeJump(e) }
          >プロフィールを編集</SecondaryButton>
        </div>

        <div className="mt-[40px]">
          <ul className="grid grid-cols-3 gap-[8px]">
            { posts.map(post => {
              return(
                <li
                  key={post}
                  className="aspect-square overflow-hidden rounded-[10px] bg-field"
                >
                  <Image
                    src={post}
                    width={112}
                    height={112}
                    className="size-full object-cover"
                    alt="投稿のイメージ画像"
                    loading="lazy"
                  />
                </li>
              );
            }) }
            {/* <li className="aspect-square overflow-hidden rounded-[10px] bg-field"></li> */}
          </ul>
        </div>
      </section>
    </>
  );
}