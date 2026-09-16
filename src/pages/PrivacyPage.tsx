import { ShieldCheck, Lock, BellRing, Database } from 'lucide-react';

const settings = [
  { title: 'Consent-based sharing', detail: 'Your reports stay visible only when you choose to share them.', icon: Lock },
  { title: 'Secure vault', detail: 'Medical records are organized in a privacy-first dashboard.', icon: Database },
  { title: 'Smart reminders', detail: 'Appointment and follow-up reminders can be toggled on or off.', icon: BellRing },
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
        <h2 className="text-2xl font-black text-slate-900">Safety notes</h2>
        <div className="mt-5 space-y-3 text-sm text-slate-700">
          <div className="rounded-[22px] bg-amber-50 p-4">AI-generated health summary is for educational support only and does not replace clinician review.</div>
          <div className="rounded-[22px] bg-sky-50 p-4">Verify doctor credentials and care facilities before booking any consultation or treatment.</div>
          <div className="rounded-[22px] bg-emerald-50 p-4">Emergency symptoms should be assessed immediately by a qualified healthcare professional or local emergency service.</div>
        </div>
      </section>
    </div>
  );
}
