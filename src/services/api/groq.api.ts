import type { ApiResult } from '../../types/api.types';
export async function groqChat(apiKey: string, prompt: string, model = 'llama-3.1-8b-instant'): Promise<ApiResult<string>> {
  if (!apiKey) return { ok: false, error: 'Groq API key မထည့်ရသေးပါ။' };
  try { const res = await fetch('https://api.groq.com/openai/v1/chat/completions', { method: 'POST', headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' }, body: JSON.stringify({ model, messages: [{ role: 'user', content: prompt }] }) }); if (!res.ok) return { ok: false, error: `Groq failed (${res.status})` }; const d = await res.json(); return { ok: true, data: d.choices?.[0]?.message?.content || '' }; } catch (e) { return { ok: false, error: String(e) }; }
}
