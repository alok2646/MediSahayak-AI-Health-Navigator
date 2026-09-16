import { Clock3, Home, MapPin, MonitorPlay, Stethoscope } from 'lucide-react';
import type { Doctor } from '../types';

type DoctorCardProps = { doctor: Doctor; onViewProfile: () => void; onCompare?: () => void; onBook: () => void; isSelected?: boolean };

export default function DoctorCard({ doctor, onViewProfile, onCompare, onBook, isSelected = false }: DoctorCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-sky-200 hover:shadow-soft">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#e7f4fb] text-lg font-black text-sky-800">{doctor.name.replace('Dr. ', '').split(' ').map((part) => part[0]).join('').slice(0, 2)}</div>
        <div className="min-w-0 flex-1"><div className="flex flex-wrap gap-2"><span className="rounded-full bg-sky-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-sky-700">{doctor.specialty}</span><span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-700">Demo Data</span></div><h3 className="mt-2 text-lg font-black text-slate-900">{doctor.name}</h3><p className="mt-1 text-sm text-slate-500">{doctor.experience}+ years experience</p></div>
        <div className="text-right"><div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Fee</div><div className="text-xl font-black text-sky-700">₹{doctor.fee}</div></div>
      </div>
      <div className="mt-5 grid gap-2 text-sm text-slate-600 sm:grid-cols-2"><div className="flex items-center gap-2"><Stethoscope size={15} className="text-sky-600" />{doctor.hospital}</div><div className="flex items-center gap-2"><MapPin size={15} className="text-sky-600" />{doctor.distance} away</div><div className="flex items-center gap-2"><Clock3 size={15} className="text-sky-600" />{doctor.availability}</div></div>
      <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-bold"><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">Available Today</span>{doctor.teleconsultation && <span className="flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 text-sky-700"><MonitorPlay size={12} /> Video Consultation</span>}{doctor.homeVisit && <span className="flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-orange-700"><Home size={12} /> Home Visit</span>}</div>
      <div className="mt-5 grid grid-cols-3 gap-2"><button onClick={onViewProfile} className="rounded-xl border border-slate-200 px-2 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50">View Profile</button><button onClick={onCompare} className={`rounded-xl px-2 py-2.5 text-xs font-bold ${isSelected ? 'bg-[#0f2a43] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>{isSelected ? 'Selected' : 'Compare'}</button><button onClick={onBook} className="rounded-xl bg-sky-600 px-2 py-2.5 text-xs font-bold text-white hover:bg-sky-700">Book</button></div>
    </article>
  );
}
