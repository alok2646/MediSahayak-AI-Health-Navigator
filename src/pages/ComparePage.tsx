import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ComparisonTable from '../components/ComparisonTable';
import { doctors } from '../data/doctors';

export default function ComparePage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>(['dr-ananya-sharma', 'dr-kavya-nair', 'dr-rahul-mehra']);

  const comparisonDoctors = useMemo(
    () => doctors.filter((doctor) => selected.includes(doctor.id)),
    [selected],
  );

  const handleSelect = (doctorId: string) => {
    setSelected((current) => {
      if (current.includes(doctorId)) return current.filter((item) => item !== doctorId);
      if (current.length >= 3) return [...current.slice(1), doctorId];
      return [...current, doctorId];
    });
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-slate-900">Doctor Comparison</h1>
            <p className="mt-2 text-slate-600">Compare up to three matched providers quickly.</p>
          </div>
          <button onClick={() => navigate('/appointments/book', { state: { doctorId: selected[0] } })} className="rounded-2xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-700">Book Appointment</button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {doctors.map((doctor) => (
            <button key={doctor.id} onClick={() => handleSelect(doctor.id)} className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${selected.includes(doctor.id) ? 'border-sky-200 bg-sky-100 text-sky-800' : 'border-slate-200 bg-white text-slate-700'}`}>
              {doctor.name}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-soft">
        <ComparisonTable doctors={comparisonDoctors} />
      </section>
    </div>
  );
}
