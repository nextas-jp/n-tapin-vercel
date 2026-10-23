"use client";

import { useState } from "react";
import { createBrowserClient } from "@/utils/supabase/client";
import { PrimaryButton } from "@/components/Buttons";
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = "sb_publishable_mFybVTt_TpXBRs9-Qz8_NA_ywLxaBae";
// const supabase = createClient(supabaseUrl, supabaseKey);

// MEMO: if server side maybe we can use SUPABASE_SERVICE_ROLE_KEY ?? SAFE ?

// const MAX_ATTEMPTS = 3;

const supabase = createBrowserClient();


export default function QueuesTest() {
  let count = 0;

  const sendToQueue = async () => {
    
    count++;
    
    console.log(count);
    

    const { data: { session } } = await supabase.auth.getSession();
    console.log(session?.user?.id ?? "no session -> role is anon");

    const result = await supabase.schema('pgmq_public').rpc('send', {
      queue_name: 'foo',
      message: { hello: `world-${count}` },
      sleep_seconds: 30,
    });
    console.log(result);
  }

  const showFromQueue = async () => {
    const result = await supabase.schema('pgmq_public').rpc('pop', { queue_name: 'foo' }); // will consume the event msg in the queue
    console.log(result);
  }
 
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Queue Simple Test Page</h2>
      <div className="flex flex-col items-center gap-[16px]">
        <PrimaryButton onClick={sendToQueue}>Add Message</PrimaryButton>
        <PrimaryButton onClick={showFromQueue}>Show Message</PrimaryButton>
      </div>
    </div>
  )
}