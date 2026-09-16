import { FileImage, FileText, LoaderCircle, UploadCloud } from 'lucide-react';

type UploadBoxProps = { title?: string; subtitle?: string; onDemo?: () => void; loading?: boolean };

export default function UploadBox({ title = 'Upload Report', subtitle = 'PDF, JPG, PNG supported', onDemo, loading = false }: UploadBoxProps) {
  return (
    <div className="rounded-3xl border-2 border-dashed border-sky-200 bg-[#eef8fd] p-8 text-center sm:p-12">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-sky-700 shadow-sm">{loading ? <LoaderCircle size={29} className="animate-spin" /> : <UploadCloud size={29} />}</div>
      <h3 className="mt-5 text-2xl font-black text-slate-900">{loading ? 'Analyzing your report…' : title}</h3>
      <p className="mt-2 text-sm text-slate-600">{loading ? 'Preparing an easy-to-understand care summary.' : subtitle}</p>
      {!loading && <div className="mt-5 flex justify-center gap-2 text-[11px] font-bold text-slate-500"><span className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5"><FileText size={13} /> PDF</span><span className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5"><FileImage size={13} /> JPG</span><span className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5"><FileImage size={13} /> PNG</span></div>}
      {!loading && <div className="mt-7 flex flex-wrap justify-center gap-3"><button className="rounded-xl bg-[#0f2a43] px-5 py-3 text-sm font-bold text-white hover:bg-[#173b5c]">Choose File</button><button onClick={onDemo} type="button" className="rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-sky-700">Try Demo Report</button></div>}
    </div>
  );
}
