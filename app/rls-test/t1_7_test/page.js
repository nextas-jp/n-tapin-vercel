'use client';

import { createBrowserClient } from "@/utils/supabase/client";
import { PrimaryButton } from "@/components/Buttons";

export default function Test() {
  async function run() {
    const supabase = createBrowserClient()
    const b = '0d62e5f2-d91a-465a-bdb9-8b426da21c6b'; //MEMO: tenant B uuid

    //MEMO 1. Read all t1_7_items (expected: only my workspace's row)
    const r1 = await supabase.from('t1_7_items').select();
    console.log('1 read all:', r1.data, r1.error);

    //MEMO 2. read workspace B when A (expected: should be [])
    const r2 = await supabase.from('t1_7_items').select().eq('tenant_id', b);
    console.log('2 read B:', r2.data, r2.error, r2.status);

    //MEMO 3. write into workspace B (expected: should be refused)
    const r3 = await supabase.from('t1_7_items').insert({ tenant_id: b, title: 'hacking phase' });
    console.log('3 insert B:', r3.error, r3.status);

    //MEMO 4. read tenants (expected: only my tenant)
    const r4 = await supabase.from('tenants').select();
    console.log('4 tenants:', r4.data);

    //MEMO 5. Using Supabase SQL Editor (expected: nothhing 0r)
    // select * from t1_7_items where title = 'hack'
  }
  return <PrimaryButton onClick={run}>Run isolation test</PrimaryButton>;
}