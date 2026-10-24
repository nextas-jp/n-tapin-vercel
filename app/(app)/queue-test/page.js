"use client";

import { useRef } from "react";
import { createBrowserClient } from "@/utils/supabase/client";
import { PrimaryButton } from "@/components/Buttons";

export default function QueuesTest() {
  // Reactの再描画で値がリセットされないよう useRef に変更
  const countRef = useRef(0);
  const supabase = createBrowserClient();

  // 1件送信テスト
  const sendToQueue = async () => {
    countRef.current++;
    console.log(`送信回数: ${countRef.current}`);

    const { data: { session } } = await supabase.auth.getSession();
    console.log("Session User ID:", session?.user?.id ?? "no session -> role is anon");

    const result = await supabase.schema('pgmq_public').rpc('send', {
      queue_name: 'foo',
      message: { hello: `world-${countRef.current}` },
      sleep_seconds: 0, // ※即座にPopテストができるように 0 に変更
    });
    console.log("Send Result:", result);
  }

  // 1件取得テスト
  const showFromQueue = async () => {
    const result = await supabase.schema('pgmq_public').rpc('pop', { queue_name: 'foo' });
    console.log("Pop Result:", result);
  }

  // ▼▼▼ 追加：順序性と遅延・排他制御の一括テスト関数 ▼▼▼
  const runOrderAndLatencyTest = async () => {
    console.log("🚀 【テスト開始】5件のメッセージを連続で送信します...");
    const sendStartTime = performance.now();
    
    // 順序性のテスト：連続で5件送信する
    for (let i = 1; i <= 5; i++) {
      await supabase.schema('pgmq_public').rpc('send', {
        queue_name: 'foo',
        message: { expected_order: i, text: `退会イベント ${i}` },
        sleep_seconds: 0, 
      });
    }
    const sendEndTime = performance.now();
    console.log(`✅ 送信完了（5件の書き込みにかかった合計時間: ${Math.round(sendEndTime - sendStartTime)}ms）`);

    console.log("📥 【テスト開始】キューから順番に取り出します...");
    
    // 順序性と遅延の確認：連続で5回 Pop して取り出す
    for (let i = 1; i <= 5; i++) {
      const popStartTime = performance.now();
      const result = await supabase.schema('pgmq_public').rpc('pop', { queue_name: 'foo' });
      const popEndTime = performance.now();

      const data = result.data ? result.data[0] : null;
      const latency = Math.round(popEndTime - popStartTime);

      if (data) {
        console.log(
          `順番: ${data.message.expected_order} ` +
          `| システム発行ID: ${data.msg_id} ` +
          `| 通信遅延(Pop): ${latency}ms`
        );
      } else {
        console.log("キューが空です（データ紛失の可能性あり）");
      }
    }
  }
  // ▲▲▲ 追加ここまで ▲▲▲

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Queue Simple Test Page</h2>
      <div className="flex flex-col items-center gap-[16px] w-full max-w-sm mx-auto">
        <PrimaryButton onClick={sendToQueue}>Add Message (1件追加)</PrimaryButton>
        <PrimaryButton onClick={showFromQueue}>Show Message (1件取得)</PrimaryButton>
        
        <hr className="w-full my-4 border-gray-300" />
        
        <p className="text-sm font-bold text-gray-700">遅延と順序性のテスト</p>
        <PrimaryButton onClick={runOrderAndLatencyTest}>Run Order & Latency Test</PrimaryButton>
      </div>
    </div>
  )
}
