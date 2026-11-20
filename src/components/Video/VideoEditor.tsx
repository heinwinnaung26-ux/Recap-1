import VideoUploader from './VideoUploader';
import VideoPlayer from './VideoPlayer';
import EditingTools from './EditingTools';
import { useVideoEditing } from '../../hooks/useVideoEditing';
import type { AspectRatio } from '../../types/video.types';
export default function VideoEditor() { const { settings, updateSettings, project } = useVideoEditing(); return <div className="grid gap-4 lg:grid-cols-2"><div className="space-y-4"><VideoUploader /><div className="rounded-xl bg-white p-4 shadow-sm"><label className="text-sm font-medium">Aspect ratio </label><div className="mt-2 flex gap-2">{(['9:16', '16:9', '3:4', '1:1'] as AspectRatio[]).map((r) => <button key={r} onClick={() => updateSettings({ ratio: r })} className={`rounded-lg border px-3 py-1.5 text-sm ${settings.ratio === r ? 'border-indigo-600 bg-indigo-50 font-semibold' : ''}`}>{r}</button>)}</div><p className="mt-2 text-xs text-slate-500">{project.videoName || 'No video yet'} · 9:16 = TikTok/Shorts, 16:9 = YouTube</p></div></div><div className="space-y-4"><VideoPlayer /><EditingTools /></div></div>; }
