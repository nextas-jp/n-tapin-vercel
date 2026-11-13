'use client';


import { useWorkspace } from '../app/(app)/workspace-test/workspace-context';

export default function WorkspaceSwitcher() {
  const { list, current, switchTo } = useWorkspace();

  if (list.length < 2) return null

  return (
    <>
      <p>Workspace Switcher</p>
      <select value={current.tenant_id ?? ''} onChange={e => switchTo(e.target.value)}>
        {list.map(r => <option key={r.tenant_id} value={r.tenant_id}>{r.tenants.name}</option>)}
      </select>
    </>
  );
}