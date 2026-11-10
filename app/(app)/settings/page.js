"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { createBrowserClient } from "@/utils/supabase/client";

// ▼ 追加: 先ほど作成した退会処理のServer Actionsをインポート
import { deleteUserFromTapIn } from "@/actions/user";

export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true); // "checked"からbooleanに変更推奨
  const [isModalOpen, setModalIsOpen] = useState(false);
  
  // ▼ 追加: 退会モーダル用のステート
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  // Hubからの「道連れログアウト指示」を裏で受信する透明な処理
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const action = params.get("action");
    const returnTo = params.get("return_to");

    if (action === "logout" && returnTo) {
      const performSilentLogout = async () => {
        try {
          Object.keys(window.localStorage).forEach((key) => {
            if (key.startsWith('sb-')) window.localStorage.removeItem(key);
          });
          window.sessionStorage.clear();
        } catch (e) {
          console.error("Storage clear error", e);
        }

        const supabase = createBrowserClient();
        await supabase.auth.signOut().catch(() => {});

        window.location.href = returnTo;
      };

      performSilentLogout();
    }
  }, []);

  // ログアウト処理
  async function logout() {
    const supabase = createBrowserClient();
    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      console.log(signOutError);
      alert('ログアウトが失敗しました。もう一度試してください。');
    } else {
      const returnUrl = encodeURIComponent(window.location.origin + '/');
      const hubBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_HUB_URL || 'http://localhost:3001';
      const hubLogoutUrl = `${hubBaseUrl}/logout?return_to=${returnUrl}`;
      window.location.href = hubLogoutUrl;
    }
  }

  // ▼ 追加: 退会処理
  async function handleWithdraw() {
    setIsWithdrawing(true);
    try {
      const supabase = createBrowserClient();
      
      // 1. 現在ログインしているユーザーのIDを取得
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        alert("ユーザー情報の取得に失敗しました。");
        return;
      }

      // 2. Server Actionsを呼び出してDB上の退会処理（論理削除＋監査ログ）を実行
      const result = await deleteUserFromTapIn(user.id);

      if (result.success) {
        // 3. 成功したらローカルのクッキー/ストレージを掃除してログイン画面へ
        await supabase.auth.signOut().catch(() => {});
        Object.keys(window.localStorage).forEach((key) => {
          if (key.startsWith('sb-')) window.localStorage.removeItem(key);
        });
        window.sessionStorage.clear();
        
        alert("退会処理が完了しました。ご利用ありがとうございました。");
        
        // Hubのログイン画面、またはTapInのルートへリダイレクト
        const hubBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_HUB_URL || 'http://localhost:3001';
        window.location.href = `${hubBaseUrl}/login`;
      } else {
        alert(`退会処理に失敗しました: ${result.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("予期せぬエラーが発生しました。");
    } finally {
      setIsWithdrawing(false);
      setWithdrawModalOpen(false);
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
            
            <li className="settings-item border-t border-gray-100 pt-4">
              <button
                className="relative w-full text-left"
                onClick={() => setWithdrawModalOpen(true)}
              >
                <span className="relative block w-full text-red-500 font-bold">退会する<i className="chevron-icon !right-[5px]"></i></span>
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

      {isWithdrawModalOpen && (
        <div
          className={`
            fixed inset-0 z-50 flex items-center justify-center
            bg-black/50
            transition-opacity duration-200
            ${isWithdrawModalOpen ? "opacity-100" : "pointer-events-none opacity-0"}
          `}
        >
          <div className="card-element-slim w-full max-w-[430px] mx-[20px] pt-[22px] !pb-[0] bg-white">
            <h2 className="pb-[10px] text-center font-bold text-[20px] leading-[27px] text-red-600">本当に退会しますか？</h2>
            <p className="px-[20px] pb-[22px] text-center text-[14px] text-gray-600">
              この操作は取り消せません。すべてのデータが削除されます。
            </p>
            <div className="grid grid-cols-2 border-t border-[#eeeeee] divide-x">
              <div className="flex flex-col py-[16px] justify-center border-[#eeeeee]">
                <button
                  className="font-semibold text-[#a1a1a1]"
                  onClick={() => setWithdrawModalOpen(false)}
                  disabled={isWithdrawing}
                >キャンセル</button>
              </div>
              <div className="flex flex-col py-[16px] justify-center">
                <button
                  className="font-semibold text-red-500"
                  onClick={() => handleWithdraw()}
                  disabled={isWithdrawing}
                >
                  {isWithdrawing ? '処理中...' : '退会する'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}