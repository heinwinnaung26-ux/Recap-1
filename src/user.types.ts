export interface ApiKeys { assemblyai: string; openrouter: string; gemini: string; elevenlabs: string; groq: string; claude: string; }
export const emptyKeys = (): ApiKeys => ({ assemblyai: '', openrouter: '', gemini: '', elevenlabs: '', groq: '', claude: '' });
export const KEY_STORAGE = 'vrecap.apiKeys';
export const loadKeys = (): ApiKeys => { try { const raw = localStorage.getItem(KEY_STORAGE); return raw ? { ...emptyKeys(), ...JSON.parse(raw) } : emptyKeys(); } catch { return emptyKeys(); } };
export const saveKeys = (k: ApiKeys) => localStorage.setItem(KEY_STORAGE, JSON.stringify(k));
export interface UserProfile { name: string; language: 'my' | 'en' | 'th'; }
