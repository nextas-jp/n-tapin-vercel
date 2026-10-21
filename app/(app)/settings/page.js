"use client";

import { useState, useEffect } from "react"; // 👈 useEffect を追加
import { PageHeader } from "@/components/PageHeader";

import { createBrowserClient } from "@/utils/supabase/client";

export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState("checked");
  const [isModalOpen, setModalIsOpen] = useState(false);

  // ▼▼▼ ここから追加：Hubからの「道連れログアウト指示」を裏で受信する透明な処理 ▼▼▼
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const action = params.get("action");
    const returnTo = params.get("return_to");

    // URLに ?action=logout が付いていたら、画面を描画する裏側で即座にお掃除を実行する
    if (action === "logout" && returnTo) {
      const performSilentLogout = async () => {
        try {
          // 1. TapInの鍵（ローカルストレージ）を強制破壊
          Object.keys(window.localStorage).forEach((key) => {
            if (key.startsWith('sb-')) window.localStorage.removeItem(key);
          });
          window.sessionStorage.clear();
        } catch (e) {
          console.error("Storage clear error", e);
        }

        // 2. 念のためTapInのサーバーへもログアウト通知
        const supabase = createBrowserClient();
        await supabase.auth.signOut().catch(() => {});

        // 3. 破壊が終わったら即座にHubのログイン画面（return_to）へ送り返す
        window.location.href = returnTo;
      };

      performSilentLogout();
    }
  }, []);
  // ▲▲▲ 追加ここまで ▲▲▲

  async function logout() {
    const supabase = createBrowserClient();
    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      console.log(signOutError);
      alert('ログアウトが失敗しました。もう一度試してください。');
    } else {
      // ▼▼▼ ここからSLO対応のために変更 ▼▼▼

      // 1. Hubでのログアウト完了後に戻ってきてほしいTapInのURLを設定
      const returnUrl = encodeURIComponent(window.location.origin + '/');
      
      // 2. 環境変数からHubのベースURLを取得（設定されていない場合はlocalhostをフォールバックとして使用）
      const hubBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_HUB_URL || 'http://localhost:3001';
      
      // 3. Hubのログアウト中継ページURLを指定
      const hubLogoutUrl = `${hubBaseUrl}/logout?return_to=${returnUrl}`;
      
      // 4. Hubへリダイレクト
      window.location.href = hubLogoutUrl;

      // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
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
                  className="peer appearance-none w-9 h-6 bg-[#d9d9d9] rounded-full checked:bg-green-500 cursor-pointer transition-colors duration-300" />
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
          <div className="card-element-slim w-full max-w-[430px] mx-[20px] pt-[22px] !pb-[0] bg-white">
            <h2 className="pb-[22px] text-center font-bold text-[20px] leading-[27px]">ログアウトしますか？</h2>
            <div className="grid grid-cols-2 border-t border-[#eeeeee] divide-x">
              <div className="flex flex-col py-[16px] justify-center border-[#eeeeee]">
                <button
                  className="font-semibold text-[#a1a1a1]"
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