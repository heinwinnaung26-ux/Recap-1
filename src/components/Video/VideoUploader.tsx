import { useRef, useState } from 'react';
import { validateVideoFile } from '../../utils/validators';
import { formatBytes } from '../../utils/formatters';
import { probeVideo } from '../../services/ffmpeg/videoProcessor';
import { useVideoEditing } from '../../hooks/useVideoEditing';
export default function VideoUploader() { const inputRef = useRef<HTMLInputElement>(null); const { setVideo } = useVideoEditing(); const [error, setError] = useState(''); const [info, setInfo] = useState('');
  const onFile = async (f: File) => { const err = validateVideoFile(f); if (err) { setError(err); return; } setError(''); try { const meta = await probeVideo(f); setVideo(f.name, meta.url, meta.durationSec); setInfo(`${f.name} · ${formatBytes(f.size)} · ${meta.width}×${meta.height} · ${Math.round(meta.durationSec)}s`); } catch (e) { setError(String(e)); } };
  return <div className="rounded-xl border-2 border-dashed border-slate-300 bg-white p-5 text-center"><input ref={inputRef} type="file" accept="video/mp4,video/quicktime,video/webm" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) void onFile(f); }} /><p className="font-medium">Video တင်ပါ (.mp4 / .mov / .webm)</p><p className="mt-1 text-xs text-slate-500">120 MB အထိ — 100 MB အောက် အကောင်းဆုံး</p><button className="mt-3 rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white" onClick={() => inputRef.current?.click()}>ဖိုင်ရွေးပါ</button>{info && <p className="mt-3 text-xs text-green-700">{info}</p>}{error && <p className="mt-3 text-xs text-red-600">{error}</p>}</div>;
}
