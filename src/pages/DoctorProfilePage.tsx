import { CalendarClock, MapPin, ShieldCheck } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { doctors } from '../data/doctors';
import { useApp } from '../context/AppContext';

export default function DoctorProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useApp();
  const doctor = doctors.find((item) => item.id === id) ?? doctors[0];

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-sky-700">Doctor profile</p>
            <h1 className="mt-2 text-4xl font-black text-slate-900">{doctor.name}</h1>
            <p className="mt-2 text-lg text-slate-600">{doctor.specialty} • {doctor.experience}+ years experience</p>
          </div>
          <div className="rounded-[22px] bg-sky-50 px-4 py-3 text-right">
            <div className="text-xs uppercase tracking-[0.1em] text-sky-700">Fee</div>
            <div className="text-3xl font-black text-slate-900">₹{doctor.fee}</div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-slate-800"><ShieldCheck size={18} className="text-emerald-600" /> {doctor.hospital}</div>
              <div className="mb-2 flex items-center gap-2 text-slate-800"><MapPin size={18} className="text-sky-600" /> {doctor.location}</div>
              <div className="flex items-center gap-2 text-slate-800"><CalendarClock size={18} className="text-sky-600" /> {doctor.availability}</div>
            </div>
            <p className="text-base text-slate-600">{doctor.bio}</p>
            <div className="flex flex-wrap gap-2">
              {doctor.languages.map((language) => (
                <span key={language} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">{language}</span>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-soft">
            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex items-center justify-between"><span>Availability</span><strong>{doctor.availability}</strong></div>
              <div className="flex items-center justify-between"><span>Video consultation</span><strong>{doctor.teleconsultation ? 'Available' : 'Not available'}</strong></div>
              <div className="flex items-center justify-between"><span>Home visit</span><strong>{doctor.homeVisit ? 'Available' : 'Not available'}</strong></div>
            </div>
            <div className="mt-5 grid gap-3">
              <button onClick={() => { navigate('/appointments/book', { state: { doctorId: doctor.id } }); showToast('Preparing appointment booking'); }} className="rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white hover:bg-sky-700">Book Clinic Appointment</button>
              <button onClick={() => { navigate('/appointments/book', { state: { doctorId: doctor.id, mode: 'Video' } }); showToast('Video consultation selected'); }} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">Book Video Consultation</button>
              <button onClick={() => { navigate('/home-visit'); showToast('Home visit request created'); }} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">Request Home Visit</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
