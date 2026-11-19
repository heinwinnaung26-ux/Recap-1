import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { FontStyle, SubtitleCue } from '../types/subtitle.types';
import { defaultFontStyle } from '../types/subtitle.types';
interface SubCtx { cues: SubtitleCue[]; setCues: (c: SubtitleCue[]) => void; updateCue: (id: number, patch: Partial<SubtitleCue>) => void; font: FontStyle; setFont: (f: FontStyle) => void; language: string; setLanguage: (l: string) => void; }
const Ctx = createContext<SubCtx | null>(null);
export function SubtitleProvider({ children }: { children: ReactNode }) {
  const [cues, setCues] = useState<SubtitleCue[]>([]); const [font, setFont] = useState<FontStyle>(defaultFontStyle()); const [language, setLanguage] = useState('my');
  const value = useMemo<SubCtx>(() => ({ cues, setCues, updateCue: (id, patch) => setCues((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c))), font, setFont, language, setLanguage }), [cues, font, language]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useSubtitlesCtx() { const c = useContext(Ctx); if (!c) throw new Error('useSubtitlesCtx must be used inside SubtitleProvider'); return c; }
