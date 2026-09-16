import { useMemo, useState } from 'react';
import HospitalCard from '../components/HospitalCard';
import { hospitals } from '../data/hospitals';

export default function HospitalsPage() {
  const [select, setSelect] = useState('Nearest');

  const filteredHospitals = useMemo(() => {
    if (select === 'Government') return hospitals.filter((hospital) => hospital.government);
    if (select === 'Emergency') return hospitals.filter((hospital) => hospital.emergency);
    if (select === 'Affordable') return hospitals.filter((hospital) => hospital.affordable);
    return hospitals;
  }, [select]);

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-4xl font-black text-slate-900">Find Healthcare Near You</h1>
        <p className="mt-2 text-slate-600">Hospital cards include emergency availability, fee information, contact details, and directions.</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {['Nearest', 'Government', 'Emergency', 'Affordable', 'Available Today'].map((item) => (
            <button key={item} onClick={() => setSelect(item)} className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${select === item ? 'border-sky-200 bg-sky-100 text-sky-800' : 'border-slate-200 bg-white text-slate-700'}`}>
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {filteredHospitals.map((hospital) => (
          <HospitalCard key={hospital.id} hospital={hospital} />
        ))}
      </section>
    </div>
  );
}
