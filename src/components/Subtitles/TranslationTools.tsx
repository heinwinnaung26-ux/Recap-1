import { useState } from 'react';
import { useSubtitles } from '../../hooks/useSubtitles';
import { loadKeys } from '../../types/user.types';
import { translateCuesWithOpenRouter } from '../../utils/helpers';
import { DEFAULT_OPENROUTER_MODEL, OPENROUTER_FREE_MODELS } from '../../types/api.types';
import LoadingAnimation from '../Common/LoadingAnimation';
export default function TranslationTools() { const { cues, setCues } = useSubtitles(); const [model, setModel] = useState(DEFAULT_OPENROUTER_MODEL); const [busy, setBusy] = useState(false); const [msg, setMsg] = useState('');
  const run = async () => { const keys = loadKeys(); if (!keys.openrouter) { setMsg('OpenRouter API key မထည့်ရသေးပါ။ Settings မှာ ထည့်ပေးပါ။'); return; } if (!cues.length) { setMsg('ဘာသာပြန်စရာ subtitle မရှိသေးပါ။'); return; } setBusy(true); setMsg(''); try { const out = await translateCuesWithOpenRouter(keys.openrouter, cues, model); setCues(out); setMsg('ဘာသာပြန်ပြီးပါပြီ — line number နဲ့ အချိန်တွေ မပြောင်းလဲပါ။'); } catch (e) { setMsg(String(e)); } finally { setBusy(false); } };
  return <div className="rounded-xl bg-white p-4 shadow-sm"><h3 className="font-semibold">Translation Tools — OpenRouter</h3><p className="mt-1 text-sm text-slate-600">မူရင်း စာသားကို recap ပုံစံ မြန်မာလို ပြန်ရေးပေးပါတယ်။ Timeline / line number မပျက်ပါ။</p><label className="mt-3 block text-sm">Model <select value={model} onChange={(e) => setModel(e.target.value)} className="ml-2 rounded border px-2 py-1"><option value={DEFAULT_OPENROUTER_MODEL}>{DEFAULT_OPENROUTER_MODEL} (paid ဖြစ်နိုင်တယ်)</option>{OPENROUTER_FREE_MODELS.map((m) => <option key={m} value={m}>{m} (:free)</option>)}</select></label><button onClick={() => void run()} disabled={busy} className="mt-3 rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white disabled:opacity-50">ဘာသာပြန်မယ်</button>{busy && <div className="mt-3"><LoadingAnimation label="Translating…" /></div>}{msg && <p className="mt-3 text-xs text-slate-700">{msg}</p>}</div>;
}
