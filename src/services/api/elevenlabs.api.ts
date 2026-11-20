import type { ApiResult } from '../../types/api.types';
export async function elevenLabsTts(apiKey: string, text: string, voiceId = '21m00Tcm4TlvDq8ikWAM', model = 'eleven_multilingual_v2'): Promise<ApiResult<Blob>> {
  if (!apiKey) return { ok: false, error: 'ElevenLabs API key မထည့်ရသေးပါ။' };
  try { const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, { method: 'POST', headers: { 'xi-api-key': apiKey, 'content-type': 'application/json' }, body: JSON.stringify({ text, model_id: model }) }); if (!res.ok) return { ok: false, error: `ElevenLabs failed (${res.status})` }; return { ok: true, data: await res.blob() }; } catch (e) { return { ok: false, error: String(e) }; }
}
export const MYANMAR_VOICES = [{ id: '21m00Tcm4TlvDq8ikWAM', label: 'Rachel — မ', gender: 'female' }, { id: 'ErXwobaYiN019PkySvjV', label: 'Antoni — ကျား', gender: 'male' }];
