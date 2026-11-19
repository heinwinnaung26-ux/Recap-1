import { useMemo, useState } from 'react';
import { useVideo } from '../contexts/VideoContext';
import { planRender } from '../services/ffmpeg/videoProcessor';
export function useFFmpeg() { const { project, settings } = useVideo(); const [busy, setBusy] = useState(false); const plan = useMemo(() => planRender(project.videoName || 'input.mp4', settings), [project.videoName, settings]); const renderScript = async () => { setBusy(true); await new Promise((r) => setTimeout(r, 400)); setBusy(false); return plan; }; return { plan, busy, renderScript, note: 'Final render is done by the generated FFmpeg script on your computer — not inside the browser.' }; }
