import { usePermissionsCtx } from '../contexts/PermissionContext';
import { requestMedia } from '../services/permissions/permissionService';
export function usePermissions() { const { permissions, request } = usePermissionsCtx(); return { permissions, request, requestMedia: async (kind: 'camera' | 'microphone') => { const ok = await requestMedia(kind); if (ok) request(kind); return ok; } }; }
