import type { ApiResult } from '../../types/api.types';
export async function claudeChat(apiKey: string, prompt: string, model = 'claude-3-5-sonnet-latest'): Promise<ApiResult<string>> {
  if (!apiKey) return { ok: false, error: 'Claude API key မထည့်ရသေးပါ။' };
  try { const res = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'content-type': 'application/json', 'anthropic-dangerous-direct-browser-access': 'true' }, body: JSON.stringify({ model, max_tokens: 2048, messages: [{ role: 'user', content: prompt }] }) }); if (!res.ok) return { ok: false, error: `Claude failed (${res.status})` }; const d = await res.json(); return { ok: true, data: d.content?.[0]?.text || '' }; } catch (e) { return { ok: false, error: String(e) }; }
}
