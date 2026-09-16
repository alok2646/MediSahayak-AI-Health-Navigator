import { ArrowRight, HeartPulse, Hospital, LoaderCircle, Stethoscope, Video } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UploadBox from '../components/UploadBox';
import { analyzeMedicalReport } from '../services/aiService';
import type { ReportAnalysis } from '../types';

export default function ReportsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<ReportAnalysis>(() => analyzeMedicalReport());
  const [loading, setLoading] = useState(Boolean(location.state?.demo));
  const [analyzed, setAnalyzed] = useState(!location.state?.demo);

  const runDemo = () => {
    setLoading(true);
    setAnalyzed(false);
    window.setTimeout(() => { setAnalysis(analyzeMedicalReport()); setLoading(false); setAnalyzed(true); }, 900);
  };

  useEffect(() => {
    if (location.state?.demo) runDemo();
  }, [location.state]);

  const nextStepCards = [
    { title: 'Find a Doctor', detail: 'Compare nearby specialists', icon: Stethoscope, to: '/doctors' },
    { title: 'Find a Hospital', detail: 'Explore facilities and services', icon: Hospital, to: '/hospitals' },
    { title: 'Video Consultation', detail: 'Talk to a provider remotely', icon: Video, to: '/appointments/book' },
    { title: 'Doctor at Home', detail: 'Request eligible home care', icon: HeartPulse, to: '/home-visit' },
  ];

  return (
    <div className="space-y-6 pb-20">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mx-auto mb-7 max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Understand before you act</p><h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">Understand your medical report</h1><p className="mt-3 text-slate-600">Get a plain-language summary, important findings and useful questions for your next consultation.</p></div>
        <UploadBox onDemo={runDemo} loading={loading} />
      </section>

      {analyzed && <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-3 border-b border-slate-100 pb-6 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Report Summary</p><h2 className="mt-2 text-2xl font-black text-slate-900">Here’s what your report is saying</h2></div><span className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Demo analysis complete</span></div>
        <p className="mt-6 max-w-4xl text-base leading-7 text-slate-700">{analysis.summary}</p>
        <div className="mt-7"><h3 className="text-lg font-black text-slate-900">Important Findings</h3><div className="mt-3 grid gap-4 md:grid-cols-3">{analysis.parameters.map((param) => <div key={param.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-start justify-between gap-2"><h4 className="font-bold text-slate-900">{param.name}</h4><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${param.status === 'Within reference range' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>{param.status === 'Within reference range' ? 'In range' : 'Review'}</span></div><div className="mt-4 text-2xl font-black text-slate-900">{param.value}</div><div className="mt-1 text-xs text-slate-500">Reference: {param.reference}</div><p className="mt-3 text-sm leading-5 text-slate-600">{param.explanation}</p></div>)}</div></div>
        <div className="mt-7 grid gap-5 lg:grid-cols-2"><div className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="text-lg font-black text-slate-900">Simple Explanation</h3><ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">{analysis.explanations.map((item) => <li key={item} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />{item}</li>)}</ul></div><div className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="text-lg font-black text-slate-900">Questions to Ask Your Doctor</h3><ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">{analysis.questionsForDoctor.map((question) => <li key={question} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />{question}</li>)}</ul></div></div>
      </section>}

      {analyzed && <section className="rounded-3xl border border-sky-100 bg-[#eef8fd] p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-700">Report → care connection</p><h2 className="mt-2 text-2xl font-black text-slate-900">Your Next Care Options</h2><p className="mt-2 text-sm text-slate-600">Choose how you want to continue from here.</p></div><span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600">Guidance, not diagnosis</span></div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{nextStepCards.map(({ title, detail, icon: Icon, to }) => <button key={title} onClick={() => navigate(to)} className="rounded-2xl border border-white bg-white p-4 text-left shadow-sm hover:-translate-y-0.5 hover:shadow-md"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700"><Icon size={19} /></div><div className="mt-4 font-bold text-slate-900">{title}</div><div className="mt-1 text-xs text-slate-500">{detail}</div></button>)}</div>
        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-sky-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-700">Suggested care category</p><h3 className="mt-2 text-xl font-black text-slate-900">{analysis.careCategory}</h3><p className="mt-1 text-xs text-slate-500">This is a care-navigation suggestion, not a diagnosis.</p></div><button onClick={() => navigate('/doctors')} className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-sm font-bold text-white hover:bg-sky-700">Find Care Near Me <ArrowRight size={15} /></button></div>
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-slate-700"><LoaderCircle size={15} className="mt-0.5 shrink-0 text-amber-600" />{analysis.safetyMessage}</div>
      </section>}
    </div>
  );
}
