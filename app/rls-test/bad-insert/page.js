'use client';

import { createBrowserClient } from "@/utils/supabase/client";
import { PrimaryButton } from "@/components/Buttons";

export default function BadInsertTest() {
  async function run() {
    const supabase = createBrowserClient();
    const { data: { user } } = await supabase.auth.getUser();
    console.log('me:', user?.id);

    const { data, error } = await supabase
      .from('tenant_members')
      .insert({
        tenant_id: '028d41ee-b961-4e95-bded-273729714fc1',   // another tenant
        user_id: user.id,
        role: 'manager',
      })
      .select();

    console.log('data:', data);
    console.log('error:', error);
  }
  return <PrimaryButton onClick={run}>Run insert test</PrimaryButton>;
}