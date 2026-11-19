import type { SubtitleCue } from '../types/subtitle.types';
export const downloadText = (filename: string, text: string, mime = 'text/plain') => { const blob = new Blob([text], { type: mime }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); };
export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
/** AssemblyAI: upload audio bytes, request transcription, poll until done. Caller supplies the user's own key. */
export async function transcribeWithAssemblyAI(apiKey: string, audio: Blob, language = 'en'): Promise<SubtitleCue[]> {
  const up = await fetch('https://api.assemblyai.com/v2/upload', { method: 'POST', headers: { authorization: apiKey }, body: audio });
  if (!up.ok) throw new Error(`AssemblyAI upload failed (${up.status}) — key ကို စစ်ပေးပါ။`);
  const { upload_url } = await up.json();
  const tr = await fetch('https://api.assemblyai.com/v2/transcript', { method: 'POST', headers: { authorization: apiKey, 'content-type': 'application/json' }, body: JSON.stringify({ audio_url: upload_url, language_code: language, word_boost: [] }) });
  if (!tr.ok) throw new Error(`AssemblyAI transcription failed (${tr.status}).`);
  const { id } = await tr.json();
  for (let i = 0; i < 60; i++) { await new Promise((r) => setTimeout(r, 3000)); const res = await fetch(`https://api.assemblyai.com/v2/transcript/${id}`, { headers: { authorization: apiKey } }); const data = await res.json(); if (data.status === 'completed') return (data.words || []).length ? groupWords(data.words) : [{ id: 1, start: 0, end: 5, text: data.text || '' }]; if (data.status === 'error') throw new Error(data.error || 'Transcription failed.'); }
  throw new Error('Transcription timed out.');
}
function groupWords(words: { text: string; start: number; end: number }[]): SubtitleCue[] { const cues: SubtitleCue[] = []; let cur: string[] = []; let start = 0; let end = 0; for (const w of words) { if (!cur.length) start = w.start / 1000; cur.push(w.text); end = w.end / 1000; if (cur.join(' ').length > 60 || end - start > 5) { cues.push({ id: cues.length + 1, start, end, text: cur.join(' ') }); cur = []; } } if (cur.length) cues.push({ id: cues.length + 1, start, end, text: cur.join(' ') }); return cues; }
/** OpenRouter: translate/rewrite cues as a Myanmar recap, preserving ids and timings. Caller supplies the user's own key. */
export async function translateCuesWithOpenRouter(apiKey: string, cues: SubtitleCue[], model: string): Promise<SubtitleCue[]> {
  const system = 'You are a Myanmar movie-recap translator. Rewrite each numbered line as an engaging Myanmar recap narration. Keep the exact line numbers and do not change timings. Return ONLY the numbered lines, one per line, in the form "1. <Myanmar text>".';
  const userText = cues.map((c) => `${c.id}. ${c.text}`).join('\n');
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', { method: 'POST', headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json', 'HTTP-Referer': window.location.origin, 'X-Title': 'V-Recap' }, body: JSON.stringify({ model, messages: [{ role: 'system', content: system }, { role: 'user', content: userText }] }) });
  if (!res.ok) throw new Error(`OpenRouter failed (${res.status}) — key / model ကို စစ်ပေးပါ။`);
  const data = await res.json(); const content: string = data.choices?.[0]?.message?.content || '';
  const map = new Map<number, string>(); for (const line of content.split('\n')) { const m = line.match(/^(\d+)\.\s*(.+)$/); if (m) map.set(Number(m[1]), m[2]); }
  return cues.map((c) => ({ ...c, translated: map.get(c.id) || c.text }));
}
