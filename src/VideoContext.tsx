import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { defaultSettings, type VideoProject, type VideoSettings } from '../types/video.types';
import { uid } from '../utils/helpers';
interface VideoCtx { project: VideoProject; setProject: (p: VideoProject) => void; settings: VideoSettings; updateSettings: (p: Partial<VideoSettings>) => void; videoUrl: string | null; setVideo: (name: string, url: string, durationSec: number) => void; }
const Ctx = createContext<VideoCtx | null>(null);
export function VideoProvider({ children }: { children: ReactNode }) {
  const [project, setProject] = useState<VideoProject>({ id: uid(), title: 'Untitled Recap', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), videoName: null, videoUrl: null, durationSec: 0, settings: defaultSettings() });
  const value = useMemo<VideoCtx>(() => ({ project, setProject, settings: project.settings, updateSettings: (p) => setProject((prev) => ({ ...prev, settings: { ...prev.settings, ...p }, updatedAt: new Date().toISOString() })), videoUrl: project.videoUrl, setVideo: (name, url, durationSec) => setProject((prev) => ({ ...prev, videoName: name, videoUrl: url, durationSec })) }), [project]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useVideo() { const c = useContext(Ctx); if (!c) throw new Error('useVideo must be used inside VideoProvider'); return c; }
