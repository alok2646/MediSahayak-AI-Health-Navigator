import { Download, FileText, Share2, ShieldCheck, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';

type ReportCardProps = { title: string; date: string; category: string };

export default function ReportCard({ title, date, category }: ReportCardProps) {
  const { showToast } = useApp();
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-sky-200 hover:shadow-soft">
      <div className="flex items-start justify-between gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700"><FileText size={20} /></div><span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">{category}</span></div>
      <h4 className="mt-5 font-black text-slate-900">{title}</h4>
      <div className="mt-2 text-xs text-slate-500">{date} · Demo record</div>
      <div className="mt-4 flex items-center gap-2 text-[11px] font-bold text-slate-500"><ShieldCheck size={13} className="text-emerald-600" /> Secure & consent-based</div>
      <div className="mt-5 grid grid-cols-3 gap-2"><button onClick={() => showToast(`Opening ${title}`)} className="inline-flex items-center justify-center gap-1 rounded-xl bg-slate-100 px-2 py-2 text-[11px] font-bold text-slate-700 hover:bg-slate-200"><Eye size={13} /> View</button><button onClick={() => showToast(`Share link prepared for ${title}`)} className="inline-flex items-center justify-center gap-1 rounded-xl bg-slate-100 px-2 py-2 text-[11px] font-bold text-slate-700 hover:bg-slate-200"><Share2 size={13} /> Share</button><button onClick={() => showToast(`Download started for ${title}`)} className="inline-flex items-center justify-center gap-1 rounded-xl bg-slate-100 px-2 py-2 text-[11px] font-bold text-slate-700 hover:bg-slate-200"><Download size={13} /> Save</button></div>
    </article>
  );
}
