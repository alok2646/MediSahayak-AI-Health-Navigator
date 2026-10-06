import { useState, type FormEvent } from 'react';
import { ArrowRight, GitBranch } from 'lucide-react';
import DemoBadge from '../components/DemoBadge';
import { doctors } from '../data/doctors';
import { hospitals } from '../data/hospitals';
import { demoReferralService } from '../services/careServices';
import { useCareWorkflow } from '../context/CareWorkflowContext';
import { useApp } from '../context/AppContext';
import type { ReferralStatus } from '../types';

const referralStatuses: ReferralStatus[] = ['Draft', 'Sent', 'Accepted', 'Rejected', 'Scheduled', 'Completed'];
const demoDocuments = ['Recent report summary', 'Medical records', 'Prescription'];

export default function ReferralsPage() {
  const { referrals, addReferral, updateReferralStatus } = useCareWorkflow();
  const { addTimelineEvent } = useApp();
  const [patientName, setPatientName] = useState('');
  const [referringHospital, setReferringHospital] = useState(hospitals[0].name);
  const [referringDoctor, setReferringDoctor] = useState(doctors[0].name);
  const [receivingHospital, setReceivingHospital] = useState(hospitals[1].name);
  const [department, setDepartment] = useState('General Medicine');
  const [reason, setReason] = useState('');
  const [priority, setPriority] = useState<'Routine' | 'Urgent'>('Routine');
  const [documents, setDocuments] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (!consent) {
      setError('Patient consent is required before submitting or sharing any referral information.');
      return;
    }
    setSubmitting(true);
    try {
      const referral = await demoReferralService.submitReferral({
        patientName: patientName.trim(),
        referringHospital,
        referringDoctor,
        receivingHospital,
        department,
        reason: reason.trim(),
        priority,
        requiredDocuments: documents,
        consentGiven: consent,
      });
      addReferral(referral);
      addTimelineEvent({
        id: referral.id,
        month: new Date().toLocaleString('en', { month: 'long', year: 'numeric' }),
        title: 'Demo referral prepared',
        detail: `${referral.referringHospital} → ${referral.receivingHospital}. Patient consent recorded in this local demo.`,
        category: 'Referral (Demo)',
      });
      setPatientName('');
      setReason('');
      setConsent(false);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Referral could not be prepared. No real hospital was contacted.');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleDocument = (document: string) => setDocuments((current) => current.includes(document) ? current.filter((item) => item !== document) : [...current, document]);

  return (
    <div className="space-y-6 pb-20">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-700">Care coordination</p><h1 className="mt-2 text-3xl font-black text-slate-900">Hospital referral workflow</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Prepare a patient-consented referral record between demo facilities. No records are transferred and no hospital is contacted.</p></div><DemoBadge>Hospital integration required</DemoBadge></div>
        <div className="mt-6 grid gap-3 sm:grid-cols-5">{['Hospital A', 'Referring clinician', 'MediSahayak network', 'Hospital B', 'Follow-up'].map((label, index) => <div key={label} className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-xs font-bold text-slate-700"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100 text-sky-800">{index + 1}</span><span>{label}</span>{index < 4 && <ArrowRight size={14} className="ml-auto text-slate-400" />}</div>)}</div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center gap-2"><GitBranch size={19} className="text-sky-700" /><h2 className="text-xl font-black text-slate-900">Prepare referral</h2></div><div className="mt-5 space-y-4">
          <label className="block text-sm font-semibold text-slate-700">Patient<input required value={patientName} onChange={(event) => setPatientName(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
          <label className="block text-sm font-semibold text-slate-700">Referring hospital<select value={referringHospital} onChange={(event) => setReferringHospital(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3">{hospitals.map((hospital) => <option key={hospital.id}>{hospital.name}</option>)}</select></label>
          <label className="block text-sm font-semibold text-slate-700">Referring doctor<select value={referringDoctor} onChange={(event) => setReferringDoctor(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3">{doctors.map((doctor) => <option key={doctor.id} value={doctor.name}>{doctor.name} · Demo</option>)}</select></label>
          <label className="block text-sm font-semibold text-slate-700">Receiving hospital<select value={receivingHospital} onChange={(event) => setReceivingHospital(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3">{hospitals.map((hospital) => <option key={hospital.id}>{hospital.name}</option>)}</select></label>
          <label className="block text-sm font-semibold text-slate-700">Department<input required value={department} onChange={(event) => setDepartment(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
          <label className="block text-sm font-semibold text-slate-700">Reason for referral<textarea required maxLength={500} value={reason} onChange={(event) => setReason(event.target.value)} rows={3} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
          <label className="block text-sm font-semibold text-slate-700">Priority<select value={priority} onChange={(event) => setPriority(event.target.value as 'Routine' | 'Urgent')} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3"><option>Routine</option><option>Urgent</option></select></label>
          <fieldset><legend className="text-sm font-semibold text-slate-700">Documents to include (selection only; no transfer occurs)</legend><div className="mt-2 space-y-2">{demoDocuments.map((document) => <label key={document} className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" checked={documents.includes(document)} onChange={() => toggleDocument(document)} className="accent-sky-700" />{document}</label>)}</div></fieldset>
          <label className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-slate-700"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 accent-sky-700" /><span><strong>Patient consent required.</strong> I confirm the patient authorizes this demo referral record. Real patient information is not sent to either facility.</span></label>
        </div>{error && <p role="alert" className="mt-4 text-sm font-semibold text-red-700">{error}</p>}<button disabled={submitting} className="mt-5 rounded-xl bg-sky-600 px-4 py-3 text-sm font-bold text-white hover:bg-sky-700 disabled:opacity-60">{submitting ? 'Preparing…' : 'Submit demo referral'}</button></form>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-black text-slate-900">Referral network activity</h2><p className="mt-1 text-sm text-slate-500">All rows are fictional demo records.</p><div className="mt-4 space-y-3">{referrals.map((referral) => <article key={referral.id} className="rounded-2xl border border-slate-100 p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="font-bold text-slate-900">{referral.id} · {referral.patientName}</div><div className="mt-1 text-xs text-slate-500">{referral.referringHospital} → {referral.receivingHospital}</div></div><select aria-label={`Status for ${referral.id}`} value={referral.status} onChange={(event) => updateReferralStatus(referral.id, event.target.value as ReferralStatus)} className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-bold">{referralStatuses.map((status) => <option key={status}>{status}</option>)}</select></div><div className="mt-3 grid gap-2 text-xs text-slate-600 sm:grid-cols-2"><div>Doctor: {referral.referringDoctor}</div><div>Department: {referral.department}</div><div>Priority: {referral.priority}</div><div>Consent: {referral.consentGiven ? 'Granted (demo)' : 'Not granted'}</div><div className="sm:col-span-2">Documents selected: {referral.requiredDocuments.join(', ') || 'None'}</div><div className="sm:col-span-2">Reason: {referral.reason}</div></div></article>)}</div></section>
      </div>
    </div>
  );
}
