export type PermissionKind = 'camera' | 'microphone' | 'storage';
const KEY = 'vrecap.permissions';
export function loadPermissions(): Record<PermissionKind, boolean> { try { return { camera: false, microphone: false, storage: true, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return { camera: false, microphone: false, storage: true }; } }
export function grantPermission(kind: PermissionKind) { const p = loadPermissions(); p[kind] = true; localStorage.setItem(KEY, JSON.stringify(p)); return p; }
export async function requestMedia(kind: 'camera' | 'microphone'): Promise<boolean> { try { const stream = await navigator.mediaDevices.getUserMedia(kind === 'camera' ? { video: true } : { audio: true }); stream.getTracks().forEach((t) => t.stop()); grantPermission(kind); return true; } catch { return false; } }
