import { useState } from 'react';
import { Clock3, Home, MapPin, ShieldCheck } from 'lucide-react';
import Modal from '../components/Modal';
import { doctors } from '../data/doctors';
import { useApp } from '../context/AppContext';

export default function HomeVisitPage() {
  const { showToast } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const careProviders = doctors.filter((doctor) => doctor.homeVisit);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-[#0f2a43] p-6 text-white shadow-soft sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-sky-100"><Home size={14} /> At-home care</div><h1 className="text-4xl font-black">Healthcare at Your Home</h1><p className="mt-2 max-w-xl text-slate-300">Find eligible healthcare providers offering home visits.</p></div><span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-xs font-bold text-amber-100">Demo availability</span></div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {careProviders.map((doctor) => (
          <div key={doctor.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-sky-200 hover:shadow-soft">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{doctor.name}</h3>
                <p className="text-sm text-slate-600">{doctor.specialty}</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">Home Visit</span>
            </div>
            <div className="mb-4 grid gap-2 text-sm text-slate-600">
              <div className="flex items-center gap-2"><MapPin size={15} className="text-sky-700" /> {doctor.location}</div>
            <div className="flex items-center gap-2"><Clock3 size={15} className="text-sky-700" /> {doctor.availability}</div>
            <div className="flex items-center gap-2"><ShieldCheck size={15} className="text-emerald-600" /> Demo / verification required</div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.12em] text-slate-400">Visit Fee</div>
                <div className="text-2xl font-black text-slate-900">₹{doctor.fee + 300}</div>
              </div>
              <button onClick={() => setIsModalOpen(true)} className="rounded-2xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-700">Request Home Visit</button>
            </div>
          </div>
        ))}
      </section>

      <Modal open={isModalOpen} title="Confirm home visit request" onClose={() => setIsModalOpen(false)} onConfirm={() => { setIsModalOpen(false); showToast('Home visit request submitted'); }} confirmLabel="Confirm Request">
        <div className="space-y-2">
          <p>Location: Delhi, India</p>
          <p>Provider: Dr. Ananya Sharma</p>
          <p>Slot: Today, 6:30 PM</p>
          <p>Fee: ₹800</p>
        </div>
      </Modal>
    </div>
  );
}
