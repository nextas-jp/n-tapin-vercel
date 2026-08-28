"use client";

import { useEffect } from "react";  
import { PageHeader } from "@/components/PageHeader";
import { useUser } from "../user-context";

export default function Notifications() {
  const { setNotificationsAllRead } = useUser();

  useEffect(() => {
    setNotificationsAllRead(true);
  }, []);

  return (
    <>
      <PageHeader
        backLinkUrl="/dashboard"
        title="お知らせ"
      />

      <section className="relative">
        <ul className="flex flex-col gap-[24px]">
          <li>
            <div className="card-element flex gap-[16px]">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none" viewBox="0 0 60 60">
                  <circle cx="30" cy="30" r="30" fill="#d9d9d9" />
                  <path fill="#a1a1a1" d="M30 35.29c7.23 0 13.334 1.175 13.334 5.709S37.19 46.666 30 46.666c-7.23 0-13.333-1.174-13.333-5.707 0-4.536 6.142-5.668 13.333-5.669m0-21.956a8.79 8.79 0 0 1 8.823 8.818A8.79 8.79 0 0 1 30 30.972a8.79 8.79 0 0 1-8.823-8.82A8.79 8.79 0 0 1 30 13.334" />
                </svg>
              </div>
              <div className="self-center leading-[27px] font-semibold">
                <p>2026年8月25日</p>
                <p>打刻漏れがありました。</p>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </>
  );
}