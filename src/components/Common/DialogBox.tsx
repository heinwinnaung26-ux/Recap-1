import type { ReactNode } from 'react';
import Button from './Button';
export default function DialogBox({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) { return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true"><div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl"><h3 className="text-lg font-semibold">{title}</h3><div className="mt-3 text-sm text-slate-600">{children}</div><div className="mt-5 text-right"><Button onClick={onClose}>ပိတ်မယ်</Button></div></div></div>; }
