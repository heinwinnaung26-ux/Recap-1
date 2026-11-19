export const formatBytes = (n: number) => { if (n < 1024) return `${n} B`; if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`; return `${(n / (1024 * 1024)).toFixed(1)} MB`; };
export const formatTime = (s: number) => { const h = Math.floor(s / 3600); const m = Math.floor((s % 3600) / 60); const sec = Math.floor(s % 60); return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}` : `${m}:${String(sec).padStart(2, '0')}`; };
export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'recap';
