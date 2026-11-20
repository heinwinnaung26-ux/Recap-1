import type { SubtitleCue } from '../../types/subtitle.types';
import type { VideoSettings } from '../../types/video.types';
export interface RenderPlan { command: string; script: string; }
export function buildFfmpegCommand(input: string, output: string, s: VideoSettings, srtPath = 'recap.my.srt', bgmPath?: string): RenderPlan {
  const isVertical = s.ratio === '9:16'; const w = s.quality === '1080p' ? (isVertical ? 1080 : 1920) : (isVertical ? 720 : 1280); const h = s.quality === '1080p' ? (isVertical ? 1920 : 1080) : (isVertical ? 1280 : 720);
  const filters: string[] = [`scale=${w}:${h}:force_original_aspect_ratio=increase`, `crop=${w}:${h}`];
  if (s.blurEnabled) { const y = s.blurPosition === 'top' ? 0 : s.blurPosition === 'bottom' ? Math.round(h * (1 - s.blurHeightPct / 100)) : Math.round(h * 0.4); const bh = Math.round(h * s.blurHeightPct / 100); filters.push(`split[a][b];[a]crop=iw:${bh}:0:${y},boxblur=${s.blurStrength}[blurred];[b][blurred]overlay=0:${y}`); }
  filters.push(`subtitles=${srtPath}:force_style='FontName=Noto Sans Myanmar,FontSize=24,PrimaryColour=&HFFFFFF,OutlineColour=&H000000,BorderStyle=1'`);
  const vf = filters.join(',');
  const audio = s.muted ? 'volume=0' : 'volume=1';
  const bgm = bgmPath ? `;amovie=${bgmPath}:loop=0,volume=${s.bgmVolume}[bgm];[0:a][bgm]amix=inputs=2:duration=first[aout]` : '';
  const command = `ffmpeg -i "${input}" ${bgm ? '' : `-af "${audio}"`} -vf "${vf}" -af "atempo=${s.speed}" -c:v libx264 -preset medium -crf 20 -c:a aac "${output}"`;
  const script = `#!/bin/bash
# V-Recap render script — run on your computer (FFmpeg must be installed).
# Final video is NOT rendered inside the browser; this script does the real render.
set -e
${command}
echo "Done: ${output}"
`;
  return { command, script };
}
export function estimateCredits(durationSec: number) { return Math.ceil(durationSec / 60) * 80; }
