import { Check, Crown, X } from 'lucide-react';
import type { Doctor } from '../types';

type ComparisonTableProps = { doctors: Doctor[] };

export default function ComparisonTable({ doctors }: ComparisonTableProps) {
  const best = doctors.length ? doctors.reduce((current, doctor) => doctor.fee < current.fee ? doctor : current, doctors[0]) : undefined;
  const rows: [string, (doctor: Doctor) => string][] = [
    ['Specialty', (doctor) => doctor.specialty],
    ['Experience', (doctor) => `${doctor.experience}+ years`],
    ['Distance', (doctor) => doctor.distance],
    ['Consultation fee', (doctor) => `₹${doctor.fee}`],
    ['Availability', (doctor) => doctor.availability],
    ['Video consultation', (doctor) => doctor.teleconsultation ? 'Available' : 'Not available'],
    ['Home visit', (doctor) => doctor.homeVisit ? 'Available' : 'Not available'],
    ['Hospital', (doctor) => doctor.hospital],
  ];

  if (!doctors.length) return <div className="rounded-2xl bg-slate-50 p-10 text-center text-sm text-slate-500">Select up to three doctors to compare.</div>;

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="min-w-[760px] w-full text-sm text-slate-700">
        <thead className="bg-[#0f2a43] text-white"><tr><th className="w-44 px-4 py-4 text-left font-semibold">Compare</th>{doctors.map((doctor) => <th key={doctor.id} className={`px-4 py-4 text-left ${best?.id === doctor.id ? 'bg-sky-800' : ''}`}><div className="flex items-center gap-2">{best?.id === doctor.id && <Crown size={15} className="text-amber-300" />}<span className="font-black">{doctor.name}</span></div><div className="mt-1 text-[10px] font-normal text-slate-300">Demo data · verify details</div></th>)}</tr></thead>
        <tbody>{rows.map(([label, getValue], rowIndex) => <tr key={label} className={rowIndex % 2 ? 'bg-slate-50/70' : 'bg-white'}><th className="px-4 py-4 text-left font-bold text-slate-600">{label}</th>{doctors.map((doctor) => { const value = getValue(doctor); const yes = value === 'Available'; return <td key={doctor.id} className={`px-4 py-4 ${best?.id === doctor.id ? 'bg-sky-50/50 font-semibold text-slate-900' : ''}`}>{yes ? <span className="inline-flex items-center gap-1 text-emerald-700"><Check size={15} /> Available</span> : value === 'Not available' ? <span className="inline-flex items-center gap-1 text-slate-400"><X size={15} /> Not available</span> : value}</td>; })}</tr>)}</tbody>
      </table>
    </div>
  );
}
