"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";

import { createBrowserClient } from "@/utils/supabase/client";

export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState("checked");
  const [isModalOpen, setModalIsOpen] = useState(false);

  async function logout() {
    const supabase = createBrowserClient();
    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      console.log(signOutError);
        
      alert('ログアウトが失敗しました。もう一度試してください。');
    } else {
      window.location = '/'; // Full redirect/reload to safely logout
    }
  }

  return (
    <>
      <PageHeader
        backLinkUrl="/dashboard"
        title="設定"
      />

      <section className="relative">
        <div className="card-element-slim flex flex-col gap-[32px]">
          <ul className="settings-list">
            <li className="settings-item">
              <span>通知設定</span>
              <div className="relative inline-block w-9 h-6">
                <input
                  id="switch-component-blue"
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  className="peer appearance-none w-9 h-6 bg-slate-100 rounded-full checked:bg-green-500 cursor-pointer transition-colors duration-300" />
                <label htmlFor="switch-component-blue" className="absolute top-0 left-0 w-6 h-6 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-4 peer-checked:border-green-500 cursor-pointer">
                </label>
              </div>
            </li>
            <li className="settings-item">
              <button
                className="relative w-full text-left"
                onClick={() => setModalIsOpen(true)}
              >
                <span className="relative block w-full">ログアウト<i className="chevron-icon !right-[5px]"></i></span>
              </button>
            </li>
          </ul>
        </div>
      </section>

      {isModalOpen && (
        <div
          className={`
            fixed inset-0 z-50 flex items-center justify-center
            bg-black/50
            transition-opacity duration-200
            ${isModalOpen ? "opacity-100" : "pointer-events-none opacity-0"}
          `}
        >
          <div className="card-element-slim w-full mx-[20px] pt-[22px] !pb-[0] bg-white">
            <h2 className="pb-[22px] text-center font-bold text-[20px] leading-[27px]">ログアウトしますか？</h2>
            <div className="grid grid-cols-2 border-t border-[#eeeeee] divide-x">
              <div className="flex flex-col py-[16px] justify-center border-[#eeeeee]">
                <button
                  onClick={() => setModalIsOpen(false)}
                >キャンセル</button>
              </div>
              <div className="flex flex-col py-[16px] justify-center">
                <button
                  className="font-semibold text-red-500"
                  onClick={() => logout()}
                >ログアウト</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}