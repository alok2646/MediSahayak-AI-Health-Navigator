import { useState, type FormEvent } from 'react';
import { CheckCircle2, Printer, Stethoscope } from 'lucide-react';
import { doctors } from '../data/doctors';
import { hospitals } from '../data/hospitals';
import { demoOPDDepartments, demoOPDSlots } from '../data/careCoordination';
import { demoHospitalService } from '../services/careServices';
import { useCareWorkflow } from '../context/CareWorkflowContext';
import { useApp } from '../context/AppContext';
import DemoBadge from '../components/DemoBadge';
import type { OPDRegistration } from '../types';

export default function DigitalOPDPage() {
  const { addOPDRegistration } = useCareWorkflow();
  const { addTimelineEvent } = useApp();
  const [registration, setRegistration] = useState<OPDRegistration | null>(null);
  const [patientType, setPatientType] = useState<'New' | 'Existing'>('New');
  const [hospitalId, setHospitalId] = useState(hospitals[0].id);
  const [department, setDepartment] = useState(demoOPDDepartments[0]);
  const [doctorName, setDoctorName] = useState('');
  const [date, setDate] = useState('2026-10-08');
  const [time, setTime] = useState(demoOPDSlots[0]);
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const hospital = hospitals.find((item) => item.id === hospitalId) ?? hospitals[0];

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (!patientName.trim() || !age || !contact.trim() || !reason.trim()) {
      setError('Complete each required patient and visit field to continue.');
      return;
    }
    setSubmitting(true);
    try {
      const created = await demoHospitalService.registerOPD({
        patient: {
          patientId: patientType === 'Existing' ? `PAT-DEMO-${contact.slice(-4)}` : `PAT-DEMO-${Date.now().toString().slice(-6)}`,
          name: patientName.trim(),
          age: Number(age),
          contact: contact.trim(),
        },
        hospitalId,
        hospitalName: hospital.name,
        department,
        doctorName: doctorName || 'First available (demo)',
        date,
        time,
        service: 'Outpatient consultation',
        reason: reason.trim(),
      });
      addOPDRegistration(created);
      setRegistration(created);
      addTimelineEvent({
        id: created.registrationId,
        month: new Date().toLocaleString('en', { month: 'long', year: 'numeric' }),
        title: 'Demo OPD registration prepared',
        detail: `${created.hospitalName} · ${created.department} · ${created.date} at ${created.time}.`,
        category: 'OPD (Demo)',
      });
    } catch {
      setError('We could not prepare the OPD demo record. Please check the information and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (registration) {
    return (
      <div className="space-y-5 pb-20">
        <section className="mx-auto max-w-3xl rounded-3xl border border-emerald-200 bg-white p-6 text-center shadow-soft sm:p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700"><CheckCircle2 size={27} /></div>
          <h1 className="mt-4 text-3xl font-black text-slate-900">OPD record prepared</h1>
          <p className="mt-2 text-sm text-slate-600">Demo / Prototype — not an official hospital registration.</p>
          <DemoBadge />
        </section>
        <section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm print:border-0 print:shadow-none">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4"><div><div className="flex items-center gap-2 text-sky-700"><Stethoscope size={19} /><span className="text-xs font-bold uppercase tracking-wider">MediSahayak · OPD slip (demo)</span></div><h2 className="mt-2 text-xl font-black text-slate-900">{registration.hospitalName}</h2></div><button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 print:hidden"><Printer size={15} /> Print / Save PDF</button></div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              ['Registration ID', registration.registrationId], ['Patient ID', registration.patient.patientId],
              ['Patient', registration.patient.name], ['Age / contact', `${registration.patient.age} years · ${registration.patient.contact}`],
              ['Department', registration.department], ['Doctor', registration.doctorName],
              ['Date / time', `${registration.date} · ${registration.time}`], ['Service', registration.service],
              ['Reason for visit', registration.reason], ['Status', registration.status],
            ].map(([label, value]) => <div key={label} className="rounded-xl bg-slate-50 p-3"><div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</div><div className="mt-1 text-sm font-semibold text-slate-800">{value}</div></div>)}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-700">Digital OPD · Parchi</p><h1 className="mt-2 text-3xl font-black text-slate-900">Outpatient registration</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Prepare a printable demo slip using fictional facility information. It does not register you with a hospital.</p></div><DemoBadge tone="blue">Prototype workflow</DemoBadge></div><div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-semibold text-amber-900">Demo / Prototype — not an official hospital registration.</div></section>
      <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">Hospital<select value={hospitalId} onChange={(event) => setHospitalId(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm">{hospitals.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
          <label className="text-sm font-semibold text-slate-700">Department<select value={department} onChange={(event) => setDepartment(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm">{demoOPDDepartments.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="text-sm font-semibold text-slate-700">Doctor (optional)<select value={doctorName} onChange={(event) => setDoctorName(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm"><option value="">First available</option>{doctors.map((item) => <option key={item.id} value={item.name}>{item.name} · Demo</option>)}</select></label>
          <label className="text-sm font-semibold text-slate-700">OPD / service<input readOnly value="Outpatient consultation" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" /></label>
          <label className="text-sm font-semibold text-slate-700">Date<input type="date" required value={date} onChange={(event) => setDate(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm" /></label>
          <label className="text-sm font-semibold text-slate-700">Demo appointment slot<select value={time} onChange={(event) => setTime(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm">{demoOPDSlots.map((slot) => <option key={slot}>{slot}</option>)}</select></label>
          <label className="text-sm font-semibold text-slate-700">Patient type<select value={patientType} onChange={(event) => setPatientType(event.target.value as 'New' | 'Existing')} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm"><option>New</option><option>Existing</option></select></label>
          <label className="text-sm font-semibold text-slate-700">Patient name<input required value={patientName} onChange={(event) => setPatientName(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm" /></label>
          <label className="text-sm font-semibold text-slate-700">Age<input required type="number" min="0" max="120" value={age} onChange={(event) => setAge(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm" /></label>
          <label className="text-sm font-semibold text-slate-700">Contact<input required type="tel" value={contact} onChange={(event) => setContact(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm" /></label>
          <label className="text-sm font-semibold text-slate-700 lg:col-span-2">Basic reason for visit<textarea required maxLength={500} value={reason} onChange={(event) => setReason(event.target.value)} rows={3} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm" /></label>
        </div>
        {error && <p role="alert" className="mt-4 text-sm font-semibold text-red-700">{error}</p>}
        <button disabled={submitting} className="mt-6 rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white hover:bg-sky-700 disabled:opacity-60">{submitting ? 'Preparing demo slip…' : 'Generate OPD demo slip'}</button>
      </form>
    </div>
  );
}
