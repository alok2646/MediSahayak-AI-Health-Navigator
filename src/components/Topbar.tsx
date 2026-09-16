import { Bell, MapPin, Search, UserCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Topbar() {
  const navigate = useNavigate();

  return (
    <header className="mb-5 flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
        <Search size={18} className="text-slate-400" />
        <input
          className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
          placeholder="Search doctor, specialty, or report"
        />
      </div>

      <div className="flex items-center justify-between gap-3 lg:justify-end">
        <button onClick={() => navigate('/dashboard')} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:border-sky-200 hover:text-sky-700">
          <MapPin size={16} className="text-teal-600" />
          Delhi, India
        </button>
        <button aria-label="Notifications" className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm hover:border-sky-200 hover:text-sky-700">
          <Bell size={18} />
        </button>
        <button onClick={() => navigate('/privacy')} className="inline-flex items-center gap-2 rounded-xl border border-slate-900 bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#173b5c]">
          <UserCircle2 size={18} />
          Alok
        </button>
      </div>
    </header>
  );
}
