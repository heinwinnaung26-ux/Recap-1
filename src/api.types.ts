export interface ApiResult<T> { ok: boolean; data?: T; error?: string; }
export interface TranscriptionWord { text: string; start: number; end: number; }
export interface TranscriptionResult { text: string; words: TranscriptionWord[]; }
export interface TranslationRequest { text: string; sourceLang: string; targetLang: string; model: string; }
export const OPENROUTER_FREE_MODELS = ['google/gemma-3-27b-it:free', 'openrouter/free'];
export const DEFAULT_OPENROUTER_MODEL = 'openai/gpt-4o-mini';
