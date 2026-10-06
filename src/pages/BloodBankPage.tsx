import { useState, type FormEvent } from 'react';
import { Droplets, HeartHandshake } from 'lucide-react';
import DemoBadge from '../components/DemoBadge';
import { bloodInventory, demoIncomingDonations } from '../data/careCoordination';
import { demoBloodBankService } from '../services/careServices';
import { useCareWorkflow } from '../context/CareWorkflowContext';
import type { BloodInventory } from '../types';

const stockTone: Record<BloodInventory['stockStatus'], string> = {
  Adequate: 'bg-emerald-50 text-emerald-700',
  Low: 'bg-amber-50 text-amber-800',
  Critical: 'bg-red-50 text-red-700',
};

export default function BloodBankPage() {
  const { bloodRequests, addBloodRequest } = useCareWorkflow();
  const [patientName, setPatientName] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodInventory['bloodGroup']>('O+');
  const [units, setUnits] = useState(1);
  const [location, setLocation] = useState('Delhi');
  const [hospitalName, setHospitalName] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const request = await demoBloodBankService.submitRequest({ patientName: patientName.trim(), bloodGroup, units, location: location.trim(), hospitalName: hospitalName.trim() || 'Receiving hospital not selected' });
      addBloodRequest(request);
      setPatientName('');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Blood request failed. Please retry or contact a real blood bank directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="flex flex-wrap items-start justify-between gap-4"><div className="flex items-start gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-700"><Droplets size={22} /></div><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-700">Blood bank coordination</p><h1 className="mt-2 text-3xl font-black text-slate-900">Blood availability & requests</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">This demo presents sample inventory and does not reflect live blood supply. Contact an actual licensed blood bank for urgent needs.</p></div></div><DemoBadge>Demo Blood Bank Data</DemoBadge></div><div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">Availability is fictional and not real-time. Requests here are not sent to a blood bank.</div></section>
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{bloodInventory.map((item) => <article key={item.bloodGroup} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><div className="text-2xl font-black text-slate-900">{item.bloodGroup}</div><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${stockTone[item.stockStatus]}`}>{item.stockStatus}</span></div><div className="mt-4 grid grid-cols-3 gap-2 text-center"><div><strong className="block text-lg">{item.availableUnits}</strong><span className="text-[10px] text-slate-500">Available</span></div><div><strong className="block text-lg">{item.reservedUnits}</strong><span className="text-[10px] text-slate-500">Reserved</span></div><div><strong className="block text-lg">{item.requestedUnits}</strong><span className="text-[10px] text-slate-500">Requested</span></div></div><div className="mt-3 text-xs text-slate-500">Demo stock expiry: {item.expiresOn}</div></article>)}</section>
      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center gap-2"><HeartHandshake size={19} className="text-sky-700" /><h2 className="text-xl font-black text-slate-900">Prepare a demo blood request</h2></div><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-slate-700">Patient name<input required value={patientName} onChange={(event) => setPatientName(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3" /></label><label className="text-sm font-semibold text-slate-700">Blood group<select value={bloodGroup} onChange={(event) => setBloodGroup(event.target.value as BloodInventory['bloodGroup'])} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3">{bloodInventory.map((item) => <option key={item.bloodGroup}>{item.bloodGroup}</option>)}</select></label><label className="text-sm font-semibold text-slate-700">Units<input type="number" required min="1" max="10" value={units} onChange={(event) => setUnits(Number(event.target.value))} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3" /></label><label className="text-sm font-semibold text-slate-700">Location<input required value={location} onChange={(event) => setLocation(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3" /></label><label className="text-sm font-semibold text-slate-700 sm:col-span-2">Receiving hospital (optional)<input value={hospitalName} onChange={(event) => setHospitalName(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3" /></label></div>{error && <p role="alert" className="mt-4 text-sm font-semibold text-red-700">{error}</p>}<button disabled={submitting} className="mt-5 rounded-xl bg-sky-600 px-4 py-3 text-sm font-bold text-white hover:bg-sky-700 disabled:opacity-60">{submitting ? 'Preparing request…' : 'Submit demo request'}</button></form>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-black text-slate-900">Incoming donations · Demo</h2><div className="mt-4 space-y-3">{demoIncomingDonations.map((donation) => <div key={donation.id} className="rounded-xl bg-slate-50 p-3 text-sm"><div className="flex justify-between font-bold"><span>{donation.group} · {donation.units} unit(s)</span><span className="text-sky-700">{donation.status}</span></div><div className="mt-1 text-xs text-slate-500">{donation.date} · {donation.id}</div></div>)}</div><h3 className="mt-6 font-bold text-slate-900">Requests in this session</h3>{bloodRequests.length ? <div className="mt-3 space-y-2">{bloodRequests.map((request) => <div key={request.id} className="rounded-xl border border-slate-100 p-3 text-sm"><strong>{request.id}</strong><div className="mt-1 text-xs text-slate-500">{request.bloodGroup} · {request.units} unit(s) · {request.location} · {request.status}</div></div>)}</div> : <p className="mt-2 text-sm text-slate-500">No requests prepared yet.</p>}</section>
      </div>
    </div>
  );
}
