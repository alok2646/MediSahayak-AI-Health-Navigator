import { ShieldCheck, Lock, RotateCcw, Database } from 'lucide-react';

const settings = [
  { title: 'Consent-based AI sharing', detail: 'Assistant message text is sent to Google Gemini only after explicit session consent. Reports and records are never attached automatically.', icon: Lock },
  { title: 'Demo health record vault', detail: 'Records are organized in this prototype; encrypted cloud storage and account access are not implemented.', icon: Database },
  { title: 'Local demo workflows', detail: 'Appointments and care coordination entries use browser memory and reset on refresh. No real provider is notified.', icon: RotateCcw },
];

export default function PrivacyPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700"><ShieldCheck size={22} /></div>
          <div>
            <h1 className="text-4xl font-black text-slate-900">Privacy & Safety</h1>
            <p className="mt-2 text-slate-600">Your data remains in control with consent-first health navigation.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {settings.map(({ title, detail, icon: Icon }) => (
          <div key={title} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-soft">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
              <Icon size={22} />
            </div>
            <h2 className="text-xl font-black text-slate-900">{title}</h2>
            <p className="mt-3 text-sm text-slate-600">{detail}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-2xl font-black text-slate-900">Privacy & safety notes</h2>
        <div className="mt-5 space-y-3 text-sm text-slate-700">
          <div className="rounded-[22px] bg-sky-50 p-4">The AI Assistant sends only a message you choose to submit, after consent, to Google Gemini for a response. Do not include names, contact details, patient IDs, or other identifying information.</div>
          <div className="rounded-[22px] bg-slate-50 p-4">This prototype has no authentication or persistent encrypted medical-record storage. Demo records and care workflows are held in browser memory and are not connected to a real provider.</div>
          <div className="rounded-[22px] bg-amber-50 p-4">AI-generated report summaries are educational support only and do not replace review by a qualified healthcare professional. Verify all demo provider credentials, fees, and availability.</div>
          <div className="rounded-[22px] bg-red-50 p-4">Emergency symptoms need prompt professional assessment. Contact local emergency services or visit the nearest emergency department.</div>
        </div>
      </section>
    </div>
  );
}
