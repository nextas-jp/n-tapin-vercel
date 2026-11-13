'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from "@/utils/supabase/client";
import { useWorkspace } from './workspace-context';
import WorkspaceSwitcher from '@/components/WorkspaceSwitcher';
import { PrimaryButton } from "@/components/Buttons";

const supabase = createBrowserClient();

export default function Test() {
  const { current, role } = useWorkspace();
  const [user, setUser] = useState(null);
  const [rows, setRows] = useState([]);

  
  useEffect(() => {
    if (!current) return;

    getUser();

    supabase.from('attendances').select('id, tenant_id, clock_in_at')
      .eq('tenant_id', current.tenant_id).then(({ data }) => setRows(data ?? []))
    }, [current?.tenant_id]);

    async function getUser() {
        const { data } = await supabase.auth.getUser();
        //console.log(data);

        setUser(data.user);
    }

    async function testInsert() {
      // console.log(user);
      //MEMO: a workspace user does not belong to
      const r = await supabase.from('attendances')
        .insert({ user_id: user.id, tenant_id: '251da81a-bce6-4ae8-9bb3-35d07e1f63a2', clock_in_at: new Date() });
      console.log('test insert:', r.error, r.status);
    }

  return (
    <div>
      <WorkspaceSwitcher />
      <p>Workspace: {current?.tenants?.name} / Role: {role}</p>
      {role === 'manager' && <button>Manager only button</button>}
      <p>Rows: {rows.length}</p>
      <PrimaryButton
        onClick={testInsert}
      >test insert</PrimaryButton>
    </div>
  );
}