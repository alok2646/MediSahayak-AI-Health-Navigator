import { Activity, ArrowRight, Building2, CalendarDays, CheckCircle2, FileText, HeartPulse, MapPin, Stethoscope, UploadCloud } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { recentReports } from '../data/reports';
import { useApp } from '../context/AppContext';

const chartData = [
  { month: 'Apr', score: 60 }, { month: 'May', score: 70 }, { month: 'Jun', score: 68 },
  { month: 'Jul', score: 80 }, { month: 'Aug', score: 76 }, { month: 'Sep', score: 86 },
];

const actions = [
  { title: 'Explain My Report', description: 'Turn clinical language into clear next steps', icon: FileText, to: '/reports' },
  { title: 'Find Doctor', description: 'Match with a provider by need and location', icon: Stethoscope, to: '/doctors' },
  { title: 'Find Hospital', description: 'Explore nearby hospitals and care options', icon: Building2, to: '/hospitals' },
  { title: 'Doctor at Home', description: 'Request eligible care at your doorstep', icon: HeartPulse, to: '/home-visit' },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { appointments } = useApp();
  const upcoming = appointments.filter((item) => item.status === 'Upcoming').slice(0, 2);

  return (
    <div className="space-y-6 pb-20">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-[#0f2a43] p-6 text-white shadow-soft sm:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-sky-100">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> Personal care workspace
            </div>
            <p className="text-sm font-medium text-sky-100">Good morning, Alok 👋</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">Your health information, care options and appointments — all in one place.</h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">Move from understanding a report to finding the right care with a guided, privacy-first experience.</p>
            <button onClick={() => navigate('/reports', { state: { demo: true } })} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#0f2a43] shadow-sm hover:bg-sky-50">
              <UploadCloud size={17} /> Try Full Demo <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid min-w-[230px] grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4"><div className="text-2xl font-black">12</div><div className="mt-1 text-xs text-slate-300">Nearby doctors</div></div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4"><div className="text-2xl font-black">8</div><div className="mt-1 text-xs text-slate-300">Care facilities</div></div>
            <div className="col-span-2 flex items-center gap-2 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4 text-xs text-emerald-100"><CheckCircle2 size={16} /> Demo mode is ready to explore</div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map(({ title, description, icon: Icon, to }) => (
          <button key={title} onClick={() => navigate(to)} className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-soft">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700 group-hover:bg-sky-100"><Icon size={21} /></div>
            <div className="font-bold text-slate-900">{title}</div>
            <div className="mt-2 text-sm leading-5 text-slate-500">{description}</div>
            <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-sky-700">Explore <ArrowRight size={13} /></div>
          </button>
        ))}
      </section>

      <section className="rounded-3xl border border-sky-100 bg-[#eef8fd] p-6 shadow-sm sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-sky-800"><MapPin size={17} /> New to this place?</div>
            <h2 className="mt-2 text-2xl font-black text-slate-900">Find healthcare around you.</h2>
            <p className="mt-2 text-sm text-slate-600">Find trusted healthcare options around your current location.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => navigate('/doctors')} className="rounded-xl bg-[#0f2a43] px-4 py-3 text-sm font-bold text-white hover:bg-[#173b5c]">Find Nearby Doctor</button>
            <button onClick={() => navigate('/hospitals')} className="rounded-xl border border-sky-200 bg-white px-4 py-3 text-sm font-bold text-sky-800 hover:bg-sky-50">Find Nearby Hospital</button>
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {['Delhi, India', '8 hospitals nearby', '12 doctors nearby', 'Home visits available'].map((item, index) => (
            <div key={item} className="flex items-center gap-2 rounded-xl border border-white bg-white/80 px-3 py-3 text-xs font-semibold text-slate-700">
              {index === 0 ? <MapPin size={15} className="text-sky-600" /> : index === 1 ? <Building2 size={15} className="text-emerald-600" /> : index === 2 ? <Stethoscope size={15} className="text-sky-600" /> : <HeartPulse size={15} className="text-orange-500" />} {item}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Your progress</p><h2 className="mt-1 text-2xl font-black text-slate-900">Healthcare Journey</h2></div><button onClick={() => navigate('/timeline')} className="text-sm font-bold text-sky-700">View timeline</button></div>
          <div className="mb-5 flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-500">
            {['UPLOAD', 'UNDERSTAND', 'FIND', 'COMPARE', 'BOOK', 'STORE'].map((step, index) => <span key={step} className="flex items-center gap-2"><span className={`rounded-full px-2.5 py-1 ${index < 3 ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{step}</span>{index < 5 && <ArrowRight size={12} />}</span>)}
          </div>
          <div className="h-56"><ResponsiveContainer width="100%" height="100%"><BarChart data={chartData}><CartesianGrid vertical={false} stroke="#e2e8f0" /><XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} /><YAxis stroke="#94a3b8" tickLine={false} axisLine={false} /><Tooltip /><Bar dataKey="score" fill="#0ea5e9" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Next on your plan</p><h2 className="mt-1 text-2xl font-black text-slate-900">Upcoming Appointment</h2></div><CalendarDays className="text-sky-600" size={22} /></div>
          <div className="mt-5 space-y-3">{upcoming.length > 0 ? upcoming.map((appointment) => <div key={appointment.id} className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4"><div className="flex items-start justify-between gap-3"><div><div className="font-bold text-slate-900">{appointment.doctorName}</div><div className="mt-1 text-sm text-slate-600">{appointment.specialty}</div></div><span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700">Upcoming</span></div><div className="mt-4 flex items-center justify-between text-sm text-slate-700"><span>{appointment.date} · {appointment.time}</span><span className="font-semibold">{appointment.mode}</span></div></div>) : <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">No upcoming appointments.</div>}</div>
          <button onClick={() => navigate('/appointments')} className="mt-4 text-sm font-bold text-sky-700">Manage appointments <ArrowRight className="ml-1 inline" size={14} /></button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Secure vault</p><h2 className="mt-1 text-2xl font-black text-slate-900">Recent Medical Records</h2></div><button onClick={() => navigate('/medical-records')} className="text-sm font-bold text-sky-700">View all</button></div>
          <div className="space-y-2">{recentReports.map((report) => <div key={report.title} className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-3"><div className="flex items-center gap-3"><div className="rounded-lg bg-slate-100 p-2 text-slate-600"><FileText size={16} /></div><div><div className="text-sm font-bold text-slate-900">{report.title}</div><div className="text-xs text-slate-500">{report.date} · Demo record</div></div></div><span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">{report.status}</span></div>)}</div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="flex items-center gap-2 text-sm font-bold text-slate-700"><Activity size={17} className="text-teal-600" /> Care snapshot</div><h2 className="mt-2 text-2xl font-black text-slate-900">Stay one step ahead.</h2><p className="mt-2 text-sm leading-6 text-slate-600">Use your report summary to prepare better questions and choose your next care option with confidence.</p><button onClick={() => navigate('/reports', { state: { demo: true } })} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-sm font-bold text-white hover:bg-sky-700">Open report explainer <ArrowRight size={15} /></button></div>
      </section>
    </div>
  );
}
