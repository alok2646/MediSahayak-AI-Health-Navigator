import { CheckCircle2, ChevronRight, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doctors } from '../data/doctors';
import { useApp } from '../context/AppContext';

const stepLabels = ['Doctor', 'Date', 'Time', 'Mode', 'Confirmation'];

export default function AppointmentBookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addAppointment, showToast } = useApp();
  const initialDoctorId = (location.state as { doctorId?: string } | null)?.doctorId ?? doctors[0].id;
  const [step, setStep] = useState(0);
  const [selectedDoctorId, setSelectedDoctorId] = useState(initialDoctorId);
  const [date, setDate] = useState('2026-09-20');
  const [time, setTime] = useState('6:30 PM');
  const [mode, setMode] = useState<'Clinic' | 'Video' | 'Home Visit'>('Clinic');
  const [confirmed, setConfirmed] = useState(false);
  const [appointmentId, setAppointmentId] = useState('');

  const doctor = doctors.find((item) => item.id === selectedDoctorId) ?? doctors[0];

  const nextStep = () => setStep((current) => Math.min(current + 1, stepLabels.length - 1));
  const prevStep = () => setStep((current) => Math.max(current - 1, 0));

  const confirmBooking = () => {
    const appointmentId = `APT-${Date.now().toString().slice(-6)}`;
    addAppointment({
      id: appointmentId,
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      date,
      time,
      mode,
      fee: doctor.fee,
      status: 'Upcoming',
    });
    showToast('Appointment confirmed');
    setAppointmentId(appointmentId);
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-soft sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><CheckCircle2 size={44} /></div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Booking complete</p>
        <h1 className="mt-2 text-4xl font-black text-slate-900">Appointment Confirmed</h1>
        <p className="mt-3 text-slate-600">Your care plan has been updated. Keep this demo confirmation for your next step.</p>
        <div className="mx-auto mt-8 max-w-lg rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3"><span className="text-sm text-slate-500">Appointment ID</span><strong className="text-slate-900">{appointmentId}</strong></div>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2"><div><span className="block text-xs text-slate-400">Doctor</span><strong>{doctor.name}</strong></div><div><span className="block text-xs text-slate-400">Specialty</span><strong>{doctor.specialty}</strong></div><div><span className="block text-xs text-slate-400">Date & time</span><strong>{date} · {time}</strong></div><div><span className="block text-xs text-slate-400">Mode</span><strong>{mode}</strong></div></div>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3"><button onClick={() => navigate('/appointments')} className="rounded-xl bg-[#0f2a43] px-5 py-3 text-sm font-bold text-white hover:bg-[#173b5c]">View appointments</button><button onClick={() => navigate('/timeline')} className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">Open timeline</button></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {stepLabels.map((label, index) => (
            <div key={label} className="flex items-center gap-2"><div className={`rounded-full px-3 py-1.5 text-xs font-bold ${index === step ? 'bg-sky-100 text-sky-800' : index < step ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{index < step ? '✓ ' : ''}{label}</div>{index < stepLabels.length - 1 && <ChevronRight size={14} className="text-slate-300" />}</div>
          ))}
        </div>

        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-slate-900">Choose your doctor</h2>
            <select value={selectedDoctorId} onChange={(event) => setSelectedDoctorId(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 focus:outline-none">
              {doctors.map((item) => (
                <option key={item.id} value={item.id}>{item.name} • {item.specialty}</option>
              ))}
            </select>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-slate-900">Choose a date</h2>
            <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 focus:outline-none" />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-slate-900">Choose a time</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {['9:00 AM', '12:30 PM', '6:30 PM', '8:00 PM'].map((slot) => (
                <button key={slot} onClick={() => setTime(slot)} className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${time === slot ? 'border-sky-200 bg-sky-100 text-sky-800' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-slate-900">Choose consultation mode</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {(['Clinic', 'Video', 'Home Visit'] as const).map((option) => (
                <button key={option} onClick={() => setMode(option)} className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${mode === option ? 'border-sky-200 bg-sky-100 text-sky-800' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-slate-900">Review and confirm</h2>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
              <div className="flex items-center justify-between"><span>Doctor</span><strong>{doctor.name}</strong></div>
              <div className="mt-2 flex items-center justify-between"><span>Date</span><strong>{date}</strong></div>
              <div className="mt-2 flex items-center justify-between"><span>Time</span><strong>{time}</strong></div>
              <div className="mt-2 flex items-center justify-between"><span>Mode</span><strong>{mode}</strong></div>
              <div className="mt-2 flex items-center justify-between"><span>Fee</span><strong>₹{doctor.fee}</strong></div>
              <div className="mt-4 flex items-center gap-2 border-t border-slate-200 pt-4 text-xs text-amber-700"><ShieldCheck size={14} /> Demo provider and fee — verify before payment.</div>
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <button onClick={prevStep} disabled={step === 0} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 disabled:opacity-50">Back</button>
          {step < stepLabels.length - 1 ? (
            <button onClick={nextStep} className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-sky-700">Continue <ChevronRight className="ml-1 inline" size={15} /></button>
          ) : (
            <button onClick={confirmBooking} className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-700">Confirm Appointment</button>
          )}
        </div>
      </section>
    </div>
  );
}
