import { useState, type FormEvent } from 'react';
import { AlertTriangle, CheckCircle2, Siren } from 'lucide-react';
import { hospitals } from '../data/hospitals';
import { demoEmergencyService } from '../services/careServices';
import { useCareWorkflow } from '../context/CareWorkflowContext';
import { useApp } from '../context/AppContext';
import DemoBadge from '../components/DemoBadge';

export default function EmergencyAssistancePage() {
  const { addEmergencyCase } = useCareWorkflow();
  const { addTimelineEvent } = useApp();
  const [prepared, setPrepared] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [category, setCategory] = useState('Other urgent concern');
  const [situation, setSituation] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medications, setMedications] = useState('');
  const [conditions, setConditions] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [ambulanceStatus, setAmbulanceStatus] = useState('Not arranged / unknown');
  const [hospitalId, setHospitalId] = useState(hospitals[0].id);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    const hospital = hospitals.find((item) => item.id === hospitalId) ?? hospitals[0];
    try {
      const created = await demoEmergencyService.prepareEmergencyInformation({
        patient: { patientId: 'PAT-EMERGENCY-DEMO', name: patientName.trim(), age: Number(age), contact: emergencyContact.trim() },
        category,
        situation: situation.trim(),
        allergies: allergies.trim(),
        medications: medications.trim(),
        conditions: conditions.trim(),
        bloodGroup,
        emergencyContact: emergencyContact.trim(),
        ambulanceStatus,
        hospitalId,
        hospitalName: hospital.name,
      });
      addEmergencyCase(created);
      setPrepared(created.id);
      addTimelineEvent({
        id: created.id,
        month: new Date().toLocaleString('en', { month: 'long', year: 'numeric' }),
        title: 'Emergency information prepared (demo)',
        detail: `Information selected for ${created.hospitalName}. No notification was sent.`,
        category: 'Emergency (Demo)',
      });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Emergency information could not be prepared. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <section className="rounded-3xl border border-red-200 bg-red-50 p-6 shadow-sm sm:p-8">
        <div className="flex items-start gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700"><Siren size={24} /></div><div><div className="flex flex-wrap items-center gap-3"><h1 className="text-3xl font-black text-slate-900">Emergency Assistance</h1><DemoBadge tone="red">Prototype workflow</DemoBadge></div><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">If someone may be in immediate danger, contact local emergency services or go to the nearest emergency department now. This form only prepares information; it does not contact an ambulance or hospital.</p></div></div>
        <div className="mt-5 rounded-xl border border-red-200 bg-white p-4 text-sm font-bold text-red-800"><AlertTriangle className="mr-2 inline" size={17} />Emergency notification is a prototype workflow. Real hospital and emergency-service integration required.</div>
      </section>

      {prepared && <section role="status" className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"><CheckCircle2 size={20} className="shrink-0" /><div><strong>Emergency information prepared.</strong><div className="mt-1">Hospital pre-arrival notification — Demo. Reference: {prepared}. The hospital has not been notified.</div></div></section>}

      <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-3"><div><h2 className="text-xl font-black text-slate-900">Information for a healthcare professional</h2><p className="mt-1 text-sm text-slate-500">Share only what you know; unknown values can be left blank.</p></div><DemoBadge /></div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">Patient name<input required value={patientName} onChange={(event) => setPatientName(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
          <label className="text-sm font-semibold text-slate-700">Age<input required type="number" min="0" max="120" value={age} onChange={(event) => setAge(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
          <label className="text-sm font-semibold text-slate-700">Emergency type/category<select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3"><option>Other urgent concern</option><option>Breathing concern</option><option>Chest discomfort</option><option>Injury</option><option>Severe bleeding</option><option>Allergic reaction</option><option>Other</option></select></label>
          <label className="text-sm font-semibold text-slate-700">Blood group (if known)<select value={bloodGroup} onChange={(event) => setBloodGroup(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3"><option value="">Unknown</option>{['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => <option key={group}>{group}</option>)}</select></label>
          <label className="text-sm font-semibold text-slate-700 sm:col-span-2">Basic situation / symptoms<textarea required maxLength={800} value={situation} onChange={(event) => setSituation(event.target.value)} rows={3} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
          <label className="text-sm font-semibold text-slate-700">Known allergies<textarea maxLength={300} value={allergies} onChange={(event) => setAllergies(event.target.value)} rows={2} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
          <label className="text-sm font-semibold text-slate-700">Current medications, if known<textarea maxLength={300} value={medications} onChange={(event) => setMedications(event.target.value)} rows={2} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
          <label className="text-sm font-semibold text-slate-700">Existing conditions, if known<textarea maxLength={300} value={conditions} onChange={(event) => setConditions(event.target.value)} rows={2} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
          <label className="text-sm font-semibold text-slate-700">Emergency contact<input type="tel" value={emergencyContact} onChange={(event) => setEmergencyContact(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
          <label className="text-sm font-semibold text-slate-700">Ambulance status<select value={ambulanceStatus} onChange={(event) => setAmbulanceStatus(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3"><option>Not arranged / unknown</option><option>Attendant arranging separately</option><option>Already arranged outside this demo</option></select></label>
          <label className="text-sm font-semibold text-slate-700">Selected receiving hospital<select value={hospitalId} onChange={(event) => setHospitalId(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3">{hospitals.map((hospital) => <option key={hospital.id} value={hospital.id}>{hospital.name} · Demo</option>)}</select></label>
        </div>
        {error && <p role="alert" className="mt-4 text-sm font-semibold text-red-700">{error}</p>}
        <button disabled={submitting} className="mt-6 rounded-xl bg-red-700 px-5 py-3 text-sm font-bold text-white hover:bg-red-800 disabled:opacity-60">{submitting ? 'Preparing…' : 'Prepare emergency information (demo)'}</button>
      </form>
    </div>
  );
}
