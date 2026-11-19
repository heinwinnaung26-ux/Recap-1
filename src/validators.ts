export const isMp4 = (f: File) => /\.(mp4|mov|webm)$/i.test(f.name) || f.type.startsWith('video/');
export const isSrt = (f: File) => /\.srt$/i.test(f.name) || f.type === 'application/x-subrip';
export const isAudio = (f: File) => f.type.startsWith('audio/') || /\.(mp3|wav|m4a|ogg)$/i.test(f.name);
export const MAX_VIDEO_BYTES = 120 * 1024 * 1024;
export const validateVideoFile = (f: File): string | null => { if (!isMp4(f)) return 'MP4 / MOV / WebM ဖိုင်ပဲ လက်ခံပါတယ်။'; if (f.size > MAX_VIDEO_BYTES) return 'ဖိုင်က 120 MB ထက် ကြီးနေပါတယ်။ 100 MB အောက် ထားပေးပါ။'; return null; };
export const hasKey = (k?: string) => Boolean(k && k.trim().length > 8);
