import { Activity, Banknote, CalendarDays, ClipboardList, FileText, HeartPulse, Home, Hospital, MapPinned, ShieldAlert, ShieldCheck, Stethoscope, Wallet, Workflow, Bot, Droplets, Building2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/reports', label: 'Medical Reports', icon: FileText },
  { to: '/medical-records', label: 'My Medical Records', icon: ClipboardList },
  { to: '/doctors', label: 'Find Doctor', icon: Stethoscope },
  { to: '/hospitals', label: 'Find Hospital', icon: Hospital },
  { to: '/home-visit', label: 'Home Visit', icon: MapPinned },
  { to: '/affordable-care', label: 'Affordable Care', icon: Wallet },
  { to: '/appointments', label: 'Appointments', icon: CalendarDays },
  { to: '/timeline', label: 'Health Timeline', icon: Activity },
  { to: '/assistant', label: 'AI Assistant', icon: Bot },
  { to: '/opd', label: 'Digital OPD', icon: ClipboardList },
  { to: '/emergency', label: 'Emergency Assistance', icon: ShieldAlert },
  { to: '/payments', label: 'Payments', icon: Banknote },
  { to: '/blood-bank', label: 'Blood Bank', icon: Droplets },
  { to: '/referrals', label: 'Referrals', icon: Workflow },
  { to: '/hospital-erp', label: 'Hospital ERP Demo', icon: Building2 },
  { to: '/privacy', label: 'Settings', icon: ShieldCheck },
];

export default function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-slate-200/80 bg-white p-6 xl:flex xl:flex-col">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0f2a43] text-lg font-bold text-white shadow-lg shadow-slate-900/10">
          M
        </div>
        <div>
          <div className="text-xl font-extrabold tracking-tight text-slate-900">MediSahayak</div>
          <div className="text-xs text-slate-500">AI Health Navigator</div>
        </div>
      </div>

      <nav aria-label="Main navigation" className="max-h-[calc(100vh-280px)] space-y-1.5 overflow-y-auto pr-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-[#e7f4fb] text-[#075985] shadow-sm ring-1 ring-sky-100'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-3xl bg-[#0f2a43] p-5 text-white shadow-soft">
        <div className="mb-3 flex items-center gap-2 text-teal-300">
          <HeartPulse size={18} />
          <span className="text-sm font-semibold">Care summary</span>
        </div>
        <p className="text-sm text-slate-200">Your AI report summary suggests a follow-up with a primary care physician.</p>
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/10 px-3 py-2 text-xs">
          <span className="text-slate-200">Suggested specialty</span>
          <strong className="text-teal-300">Internal Medicine</strong>
        </div>
      </div>
    </aside>
  );
}
