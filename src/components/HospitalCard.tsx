import { Clock3, MapPin, Phone, Stethoscope } from 'lucide-react';
import type { Hospital } from '../types';

type HospitalCardProps = {
  hospital: Hospital;
};

export default function HospitalCard({ hospital }: HospitalCardProps) {
  return (
    <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Hospital</p>
          <h3 className="mt-1 text-xl font-bold text-slate-900">{hospital.name}</h3>
        </div>
        <span className="rounded-full bg-sky-50 px-2 py-1 text-xs font-semibold text-sky-700">{hospital.distance}</span>
      </div>

      <div className="mb-4 space-y-2 text-sm text-slate-600">
        <div className="flex items-center gap-2"><MapPin size={15} className="text-sky-700" /> {hospital.location}</div>
        <div className="flex items-center gap-2"><Stethoscope size={15} className="text-sky-700" /> {hospital.services.join(' • ')}</div>
        <div className="flex items-center gap-2"><Clock3 size={15} className="text-sky-700" /> {hospital.availableToday ? 'Available today' : 'Limited hours'}</div>
        <div className="flex items-center gap-2"><Phone size={15} className="text-sky-700" /> {hospital.contact}</div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 text-xs">
        {hospital.emergency && <span className="rounded-full bg-red-50 px-2 py-1 font-medium text-red-700">Emergency</span>}
        {hospital.government && <span className="rounded-full bg-emerald-50 px-2 py-1 font-medium text-emerald-700">Government</span>}
        {hospital.affordable && <span className="rounded-full bg-amber-50 px-2 py-1 font-medium text-amber-700">Affordable</span>}
        <span className="rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-700">{hospital.fee}</span>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 rounded-2xl bg-slate-100 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200">Directions</button>
        <button className="flex-1 rounded-2xl bg-sky-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-sky-700">Book</button>
      </div>
    </div>
  );
}
