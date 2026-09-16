import { useMemo, useState } from 'react';
import { FileLock2, Search, ShieldCheck, Upload } from 'lucide-react';
import ReportCard from '../components/ReportCard';
import { medicalDocuments } from '../data/reports';

const categories = ['All', 'Blood Report', 'Radiology', 'Prescription', 'Doctor Notes', 'Discharge Summary'];

export default function MedicalRecordsPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredDocs = useMemo(() => {
    return medicalDocuments.filter((doc) => {
      const matchesQuery = doc.title.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory === 'All' || doc.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [activeCategory, query]);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-slate-900">My Medical Records</h1>
            <p className="mt-2 text-slate-600">A private, organized home for your health documents.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-sky-700"><Upload size={16} /> Upload Document</button>
            <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-bold text-emerald-700"><ShieldCheck size={16} /> Secure & Consent-Based</div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 md:flex-row">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5">
            <Search size={18} className="text-slate-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search records" className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none" />
          </div>
          <select value={activeCategory} onChange={(event) => setActiveCategory(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:outline-none">
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </section>

      <div className="flex items-center gap-3 rounded-2xl border border-sky-100 bg-[#eef8fd] p-4 text-sm text-slate-700"><FileLock2 size={20} className="text-sky-700" /><span><strong className="text-slate-900">Your records stay in your control.</strong> Sharing is consent-based in this demo workspace.</span></div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filteredDocs.length > 0 ? filteredDocs.map((doc) => (
          <ReportCard key={doc.id} title={doc.title} date={doc.date} category={doc.category} />
        )) : <div className="col-span-full rounded-[28px] border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">No records match your filters.</div>}
      </section>
    </div>
  );
}
