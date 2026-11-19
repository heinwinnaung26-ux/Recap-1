import { useSubtitlesCtx } from '../contexts/SubtitleContext';
import { cuesToSrt, parseSrt } from '../types/subtitle.types';
export function useSubtitles() { const ctx = useSubtitlesCtx(); return { ...ctx, loadSrtText: (text: string) => ctx.setCues(parseSrt(text)), exportSrt: (useTranslation = false) => cuesToSrt(ctx.cues, useTranslation) }; }
