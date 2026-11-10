"use client";

import { useState } from "react";
import { createBrowserClient } from "@/utils/supabase/client";
import { PrimaryButton } from "@/components/Buttons";

export default function RlsTest() {
  const supabase = createBrowserClient();
  const [out, setOut] = useState("");

  async function show() {
    const { data: { session } } = await supabase.auth.getSession();
    const { data, error } = await supabase.from("rls_test").select("*");
    setOut(JSON.stringify({
      session_user_id: session?.user?.id ?? null,
      rows: data,
      error: error?.message ?? null,
    }, null, 2));
  }

  async function add() {
    const { error } = await supabase
      .from("rls_test")
      .insert({ note: "inserted from the app" });
    setOut(error ? error.message : "inserted");
  }

  return (
    <main style={{ padding: 24 }}>
      <PrimaryButton onClick={add}>row追加</PrimaryButton>{" "}
      <PrimaryButton onClick={show}>Showを表示</PrimaryButton>
      <pre>{out}</pre>
    </main>
  );
}