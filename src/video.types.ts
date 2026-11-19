export type AspectRatio = '9:16' | '16:9' | '3:4' | '1:1';
export type RecapMode = 'ai-recap' | 'pro-recap' | 'subtitle' | 'manual';
export interface VideoSettings { ratio: AspectRatio; muted: boolean; speed: number; blurEnabled: boolean; blurPosition: 'bottom' | 'top' | 'custom'; blurHeightPct: number; blurStrength: number; bgmUrl: string | null; bgmVolume: number; voiceoverUrl: string | null; quality: '720p' | '1080p'; }
export interface VideoProject { id: string; title: string; createdAt: string; updatedAt: string; videoName: string | null; videoUrl: string | null; durationSec: number; settings: VideoSettings; }
export const defaultSettings = (): VideoSettings => ({ ratio: '9:16', muted: false, speed: 1, blurEnabled: true, blurPosition: 'bottom', blurHeightPct: 18, blurStrength: 18, bgmUrl: null, bgmVolume: 0.4, voiceoverUrl: null, quality: '1080p' });
export const formatDuration = (s: number) => { const m = Math.floor(s / 60); const sec = Math.round(s % 60); return `${m}:${sec.toString().padStart(2, '0')}`; };
