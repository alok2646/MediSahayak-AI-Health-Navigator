import { ArrowRight, ArrowUpRight, BadgeCheck, HeartPulse, ShieldCheck, Stethoscope, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const featureCards = [
  { icon: Upload, title: 'AI Report Explanation' },
  { icon: ShieldCheck, title: 'Medical Records' },
  { icon: Stethoscope, title: 'Doctor Finder' },
  { icon: HeartPulse, title: 'Home Visit' },
  { icon: BadgeCheck, title: 'Appointment Booking' },
];

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-slate-200 bg-white/80 p-6 shadow-soft backdrop-blur md:p-10">
        <header className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 text-xl font-black text-white shadow-lg shadow-teal-500/30">M</div>
            <div>
              <div className="text-2xl font-extrabold tracking-tight">MediSahayak</div>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-600 md:flex">
            <ShieldCheck size={16} className="text-teal-600" /> Secure care navigation
          </div>
        </header>

        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">Healthcare clarity</p>
            <h1 className="max-w-xl text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Understand Your Health.
              <span className="block text-sky-700">Find the Right Care.</span>
              <span className="block text-slate-900">Take the Next Step.</span>
            </h1>
            <div className="mt-6 flex flex-wrap gap-4">
              <button onClick={() => navigate('/dashboard')} className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 hover:bg-sky-700">Get Started <ArrowRight size={16} /></button>
              <button onClick={() => navigate('/reports', { state: { demo: true } })} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">Try Demo <ArrowUpRight size={16} /></button>
            </div>
          </div>

          <div className="rounded-[32px] bg-gradient-to-br from-slate-900 to-sky-900 p-6 text-white shadow-soft">
            <div className="mb-6 flex items-center justify-between text-sm text-slate-200"><span>AI Health Snapshot</span><span className="rounded-full bg-emerald-500/20 px-2 py-1 text-emerald-300">Updated today</span></div>
            <div className="space-y-4">
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-sm text-slate-300">Suggested care category</div>
                <div className="mt-2 text-2xl font-extrabold text-white">Internal Medicine</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-sm text-slate-300">Nearby options</div>
                <div className="mt-2 flex items-center justify-between text-white"><span>Doctors</span><span className="font-bold">12</span></div>
                <div className="mt-1 flex items-center justify-between text-white"><span>Hospitals</span><span className="font-bold">8</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {featureCards.map(({ icon: Icon, title }) => (
            <div key={title} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-soft">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                <Icon size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
