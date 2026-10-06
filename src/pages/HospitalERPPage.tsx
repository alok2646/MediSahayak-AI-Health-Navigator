import { useState, type FormEvent } from 'react';
import { Activity, BedDouble, Bell, Building2, CreditCard, Droplets, FileText, Plus, Users, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DemoBadge from '../components/DemoBadge';
import { demoHospitalMetrics, demoHospitalPatients, demoOPDDepartments, bloodInventory } from '../data/careCoordination';
import { doctors } from '../data/doctors';
import { medicalDocuments } from '../data/reports';
import { useApp } from '../context/AppContext';
import { useCareWorkflow } from '../context/CareWorkflowContext';
import type { Invoice, ReferralStatus } from '../types';

const sections = ['Overview', 'Patients', 'OPD', 'Appointments', 'Emergency', 'Referrals', 'Beds / Capacity', 'Doctors & Departments', 'Medical Records', 'Billing & Payments', 'Blood Bank', 'Reports', 'Notifications'] as const;
type ERPSection = (typeof sections)[number];

export default function HospitalERPPage() {
  const navigate = useNavigate();
  const { appointments } = useApp();
  const { opdRegistrations, emergencyCases, invoices, referrals, addInvoice, updateEmergencyCaseStatus, updateReferralStatus } = useCareWorkflow();
  const [section, setSection] = useState<ERPSection>('Overview');
  const [invoicePatient, setInvoicePatient] = useState('');
  const [invoiceDescription, setInvoiceDescription] = useState('');
  const [invoiceAmount, setInvoiceAmount] = useState('');
  const [notice, setNotice] = useState('');

  const createInvoice = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const amount = Number(invoiceAmount);
    if (!invoiceDescription.trim() || !Number.isFinite(amount) || amount <= 0) {
      setNotice('Enter an invoice description and a positive amount.');
      return;
    }
    const invoice: Invoice = {
      id: `INV-DEMO-${Date.now().toString().slice(-6)}`,
      patientName: invoicePatient.trim() || 'Demo Patient',
      description: invoiceDescription.trim(),
      amount,
      status: 'Pending',
      createdAt: new Date().toISOString().slice(0, 10),
    };
    addInvoice(invoice);
    setInvoiceDescription('');
    setInvoiceAmount('');
    setNotice(`Demo invoice ${invoice.id} created.`);
  };

  return (
    <div className="space-y-6 pb-20">
      <section className="rounded-3xl border border-slate-200 bg-[#0f2a43] p-6 text-white shadow-soft sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4"><div className="flex items-start gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-sky-200"><Building2 size={23} /></div><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-200">Provider workspace · Demo role</p><h1 className="mt-2 text-3xl font-black">Hospital coordination dashboard</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">A provider-side prototype linked to patient navigation. No real hospital system, patient database, or integration is connected.</p></div></div><DemoBadge>Hospital Integration Required</DemoBadge></div>
        <div className="mt-5 flex flex-wrap gap-3"><button onClick={() => navigate('/opd')} className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#0f2a43] hover:bg-sky-50">Open Digital OPD</button><button onClick={() => navigate('/emergency')} className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-bold text-white hover:bg-white/15">Emergency workflow</button></div>
      </section>

      <div className="flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">{sections.map((item) => <button key={item} onClick={() => setSection(item)} className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold ${section === item ? 'bg-sky-100 text-sky-800' : 'text-slate-600 hover:bg-slate-50'}`}>{item}</button>)}</div>

      {section === 'Overview' && <>
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{demoHospitalMetrics.map((metric, index) => { const icons = [Users, Activity, Activity, BedDouble, FileText, Droplets, Wallet]; const Icon = icons[index]; return <article key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><span className="text-xs font-semibold text-slate-500">{metric.label}</span><Icon size={17} className="text-sky-700" /></div><div className="mt-3 text-2xl font-black text-slate-900">{metric.value}</div><div className="mt-1 text-[10px] text-slate-400">{metric.detail}</div></article>; })}</section>
        <section className="grid gap-4 lg:grid-cols-3">{[['OPD registrations', opdRegistrations.length, 'View OPD', 'OPD'], ['Emergency cases', emergencyCases.length, 'Review cases', 'Emergency'], ['Referrals', referrals.length, 'Manage referrals', 'Referrals']].map(([label, count, action, tab]) => <button key={label as string} onClick={() => setSection(tab as ERPSection)} className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm hover:border-sky-200"><div className="text-sm font-bold text-slate-500">{label as string}</div><div className="mt-2 text-3xl font-black text-slate-900">{count as number}</div><div className="mt-3 text-xs font-bold text-sky-700">{action as string} →</div></button>)}</section>
      </>}

      {section === 'Patients' && <DataSection title="Patients" subtitle="Fictional patient roster; contact details are hidden." rows={demoHospitalPatients.map((patient) => [patient.patientId, patient.name, `${patient.age} years`, patient.department, patient.lastVisit, patient.recordStatus])} headers={['Patient ID', 'Name', 'Age', 'Department', 'Last visit', 'Source']} />}
      {section === 'OPD' && <DataSection title="Digital OPD registrations" subtitle="Demo registrations created through the patient OPD workflow." rows={opdRegistrations.map((item) => [item.registrationId, item.patient.name, item.hospitalName, item.department, `${item.date} · ${item.time}`, item.status])} headers={['Registration ID', 'Patient', 'Hospital', 'Department', 'Slot', 'Status']} empty="No session OPD registrations yet." />}
      {section === 'Appointments' && <DataSection title="Appointments" subtitle="Existing appointments are fictional demo data." rows={appointments.map((item) => [item.id, item.doctorName, item.specialty, `${item.date} · ${item.time}`, item.mode, item.status])} headers={['Appointment', 'Doctor', 'Specialty', 'Slot', 'Mode', 'Status']} />}
      {section === 'Emergency' && <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-black text-slate-900">Emergency cases · Demo</h2><p className="mt-1 text-sm text-slate-500">Pre-arrival information is not sent to this or any real hospital.</p><div className="mt-4 space-y-3">{emergencyCases.length ? emergencyCases.map((item) => <article key={item.id} className="rounded-xl border border-slate-100 p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><strong>{item.id} · {item.patient.name}</strong><div className="mt-1 text-xs text-slate-500">{item.category} · {item.hospitalName} · Pre-arrival notification: Demo only</div></div><div className="flex gap-2"><button onClick={() => updateEmergencyCaseStatus(item.id, 'Arrived')} className="rounded-lg bg-sky-50 px-3 py-2 text-xs font-bold text-sky-800">Mark arrival</button><button onClick={() => updateEmergencyCaseStatus(item.id, 'Closed')} className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700">Close demo</button></div></div><div className="mt-2 text-xs font-bold text-slate-600">Workflow status: {item.status}</div></article>) : <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No emergency cases prepared in this session.</p>}</div></section>}
      {section === 'Referrals' && <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-black text-slate-900">Referral queue · Demo</h2><div className="mt-4 space-y-3">{referrals.map((item) => <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 p-4"><div><strong>{item.id} · {item.patientName}</strong><div className="mt-1 text-xs text-slate-500">{item.referringHospital} → {item.receivingHospital} · Consent {item.consentGiven ? 'recorded (demo)' : 'not recorded'}</div></div><select aria-label={`Update referral ${item.id}`} value={item.status} onChange={(event) => updateReferralStatus(item.id, event.target.value as ReferralStatus)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold">{['Draft', 'Sent', 'Accepted', 'Rejected', 'Scheduled', 'Completed'].map((status) => <option key={status}>{status}</option>)}</select></div>)}</div></section>}
      {section === 'Beds / Capacity' && <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-black text-slate-900">Capacity snapshot · Demo</h2><p className="mt-2 text-sm text-slate-500">Not connected to hospital bed-management systems.</p><div className="mt-5 grid gap-3 sm:grid-cols-3">{[['General beds', '14 / 30'], ['ICU beds', '4 / 10'], ['Observation', '6 / 12']].map(([label, value]) => <div key={label} className="rounded-xl bg-slate-50 p-4"><BedDouble size={18} className="text-sky-700" /><div className="mt-3 text-sm font-bold">{label}</div><div className="mt-1 text-xl font-black">{value}</div></div>)}</div></section>}
      {section === 'Doctors & Departments' && <div className="grid gap-4 xl:grid-cols-2"><DataSection title="Doctors · Demo" subtitle="Fictional provider list." rows={doctors.map((item) => [item.name, item.specialty, item.hospital, item.availability])} headers={['Doctor', 'Specialty', 'Facility', 'Availability']} /><DataSection title="Departments · Demo" subtitle="Sample department list." rows={demoOPDDepartments.map((department) => [department, 'Demo schedule'])} headers={['Department', 'Schedule']} /></div>}
      {section === 'Medical Records' && <DataSection title="Medical records" subtitle="Only sample document metadata is shown; no real record content is transferred." rows={medicalDocuments.map((item) => [item.title, item.category, item.date, 'Demo record'])} headers={['Document', 'Type', 'Date', 'Source']} />}
      {section === 'Billing & Payments' && <div className="space-y-5"><form onSubmit={createInvoice} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-black text-slate-900">Create invoice · Demo</h2><div className="mt-4 grid gap-3 sm:grid-cols-3"><input aria-label="Patient name" value={invoicePatient} onChange={(event) => setInvoicePatient(event.target.value)} placeholder="Demo patient name" className="rounded-xl border border-slate-200 px-3 py-3 text-sm" /><input required aria-label="Invoice description" value={invoiceDescription} onChange={(event) => setInvoiceDescription(event.target.value)} placeholder="Service / consultation" className="rounded-xl border border-slate-200 px-3 py-3 text-sm" /><input required type="number" min="1" aria-label="Invoice amount" value={invoiceAmount} onChange={(event) => setInvoiceAmount(event.target.value)} placeholder="Amount (₹)" className="rounded-xl border border-slate-200 px-3 py-3 text-sm" /></div>{notice && <p role="status" className="mt-3 text-sm font-semibold text-sky-800">{notice}</p>}<button className="mt-4 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-sm font-bold text-white hover:bg-sky-700"><Plus size={15} /> Create demo invoice</button></form><DataSection title="Invoices / payments" subtitle="Simulated statuses only. Real payment gateway required." rows={invoices.map((invoice) => [invoice.id, invoice.patientName, invoice.description, `₹${invoice.amount}`, invoice.status])} headers={['Invoice', 'Patient', 'Description', 'Amount', 'Status']} /></div>}
      {section === 'Blood Bank' && <div className="space-y-4"><div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900"><Droplets size={17} />Demo Blood Bank Data · No real-time availability</div><DataSection title="Inventory" subtitle="Demo stock counts." rows={bloodInventory.map((item) => [item.bloodGroup, `${item.availableUnits}`, `${item.reservedUnits}`, `${item.requestedUnits}`, item.stockStatus, item.expiresOn])} headers={['Group', 'Available', 'Reserved', 'Requested', 'Status', 'Expiry']} /><button onClick={() => navigate('/blood-bank')} className="rounded-xl bg-sky-600 px-4 py-3 text-sm font-bold text-white hover:bg-sky-700">Open patient blood request</button></div>}
      {section === 'Reports' && <DataSection title="Operations reports · Demo" subtitle="Illustrative dashboard measures, not real operational reporting." rows={demoHospitalMetrics.map((metric) => [metric.label, metric.value, metric.detail])} headers={['Metric', 'Value', 'Source']} />}
      {section === 'Notifications' && <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center gap-2"><Bell size={18} className="text-sky-700" /><h2 className="text-xl font-black text-slate-900">Notifications · Demo</h2></div><p className="mt-2 text-sm text-slate-600">There are no external notifications or hospital alerts in this prototype.</p><div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm">Use the Emergency Assistance and Referral workflows to prepare local demo records.</div></section>}
      {section === 'Billing & Payments' && <p className="flex items-center gap-2 text-xs text-slate-500"><CreditCard size={14} /> Patient payments can be simulated in the <button onClick={() => navigate('/payments')} className="font-bold text-sky-700">Payments module</button>.</p>}
    </div>
  );
}

function DataSection({ title, subtitle, headers, rows, empty = 'No records available.' }: { title: string; subtitle: string; headers: string[]; rows: string[][]; empty?: string }) {
  return <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><h2 className="text-xl font-black text-slate-900">{title}</h2><p className="mt-1 text-sm text-slate-500">{subtitle}</p>{rows.length ? <div className="mt-4 overflow-x-auto rounded-xl border border-slate-100"><table className="min-w-full text-left text-xs"><thead className="bg-slate-50 text-slate-500"><tr>{headers.map((header) => <th key={header} className="whitespace-nowrap px-3 py-3 font-bold">{header}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={`${row[0]}-${index}`} className="border-t border-slate-100">{row.map((cell, cellIndex) => <td key={`${cellIndex}`} className="whitespace-nowrap px-3 py-3 text-slate-700">{cell}</td>)}</tr>)}</tbody></table></div> : <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">{empty}</p>}</section>;
}
