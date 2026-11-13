'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createBrowserClient } from "@/utils/supabase/client";

const WorkspaceCtx = createContext(null);
const supabase = createBrowserClient();

export function WorkspaceProvider({ children }) {
  const [list, setList] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    supabase.from('tenant_members').select('tenant_id, role, tenants(name)')
      .then(({ data }) => {
        const rows = data ?? [];
        setList(rows);
        const saved = localStorage.getItem('currentTenantId');
        setCurrentId(rows.find(r => r.tenant_id === saved)?.tenant_id ?? rows[0]?.tenant_id ?? null);
      })
  }, []);

  function switchTo(id) {
    localStorage.setItem('currentTenantId', id);
    setCurrentId(id);
  }

  const current = list.find(r => r.tenant_id === currentId) ?? null
  return (
    <WorkspaceCtx.Provider value={{ list, current, role: current?.role, switchTo }}>
      {children}
    </WorkspaceCtx.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceCtx);

  if (!context) {
    throw new Error("useWorkspace must be used within a UserProvider");
  }

  return context;
}
