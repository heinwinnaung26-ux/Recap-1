import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
export interface Permissions { camera: boolean; microphone: boolean; storage: boolean; }
interface PermCtx { permissions: Permissions; request: (k: keyof Permissions) => void; }
const Ctx = createContext<PermCtx | null>(null);
export function PermissionProvider({ children }: { children: ReactNode }) {
  const [permissions, setPermissions] = useState<Permissions>({ camera: false, microphone: false, storage: true });
  const value = useMemo<PermCtx>(() => ({ permissions, request: (k) => setPermissions((p) => ({ ...p, [k]: true })) }), [permissions]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function usePermissionsCtx() { const c = useContext(Ctx); if (!c) throw new Error('usePermissionsCtx must be used inside PermissionProvider'); return c; }
