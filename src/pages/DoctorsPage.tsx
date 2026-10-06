import { useMemo, useState } from 'react';
import { ArrowUpDown, Filter, Search, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DoctorCard from '../components/DoctorCard';
import { doctors } from '../data/doctors';

export default function DoctorsPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [specialty, setSpecialty] = useState('All');
  const [distance, setDistance] = useState('All');
  const [fee, setFee] = useState('All');
  const [sort, setSort] = useState('Nearest');
  const [availableToday, setAvailableToday] = useState(false);
  const [video, setVideo] = useState(false);
  const [homeVisit, setHomeVisit] = useState(false);
  const [selectedDoctors, setSelectedDoctors] = useState<string[]>([]);

  const specialties = ['All', ...new Set(doctors.map((doctor) => doctor.specialty))];
  const filteredDoctors = useMemo(() => {
    const result = doctors.filter((doctor) => {
      const search = `${doctor.name} ${doctor.specialty} ${doctor.hospital}`.toLowerCase();
      const km = Number.parseFloat(doctor.distance);
      return search.includes(query.toLowerCase())
        && (specialty === 'All' || doctor.specialty === specialty)
        && (distance === 'All' || (distance === 'Under 3 km' && km < 3) || (distance === '3–5 km' && km >= 3 && km <= 5) || (distance === '5+ km' && km > 5))
        && (fee === 'All' || (fee === 'Under ₹500' && doctor.fee <= 500) || (fee === '₹500–₹700' && doctor.fee > 500 && doctor.fee <= 700) || (fee === 'Above ₹700' && doctor.fee > 700))
        && (!availableToday || doctor.availability.includes('Today') || doctor.availability.includes('Available'))
        && (!video || doctor.teleconsultation)
        && (!homeVisit || doctor.homeVisit);
    });
    return [...result].sort((a, b) => sort === 'Lowest Fee' ? a.fee - b.fee : sort === 'Earliest Availability' ? a.availability.localeCompare(b.availability) : Number.parseFloat(a.distance) - Number.parseFloat(b.distance));
  }, [availableToday, distance, fee, homeVisit, query, sort, specialty, video]);

  const toggleCompare = (doctorId: string) => setSelectedDoctors((current) => current.includes(doctorId) ? current.filter((item) => item !== doctorId) : current.length >= 3 ? [...current.slice(1), doctorId] : [...current, doctorId]);

  return (
    <div className="space-y-6 pb-20">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-700">Care finder</p><h1 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">Find the right doctor</h1><p className="mt-2 text-slate-600">Search, filter and compare care options around you.</p></div>
          {selectedDoctors.length > 0 && <button onClick={() => navigate('/compare', { state: { doctorIds: selectedDoctors } })} className="rounded-xl bg-[#0f2a43] px-4 py-3 text-sm font-bold text-white hover:bg-[#173b5c]">Compare selected ({selectedDoctors.length})</button>}
        </div>
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3"><Search size={18} className="text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by doctor, specialty or hospital" className="w-full bg-transparent text-sm text-slate-700 outline-none" /></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <select value={specialty} onChange={(event) => setSpecialty(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700"><option>All</option>{specialties.slice(1).map((item) => <option key={item}>{item}</option>)}</select>
          <select value={distance} onChange={(event) => setDistance(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700"><option>All</option><option>Under 3 km</option><option>3–5 km</option><option>5+ km</option></select>
          <select value={fee} onChange={(event) => setFee(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700"><option>All</option><option>Under ₹500</option><option>₹500–₹700</option><option>Above ₹700</option></select>
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700"><ArrowUpDown size={15} className="text-slate-400" /><span className="sr-only">Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value)} className="w-full bg-transparent outline-none"><option>Nearest</option><option>Lowest Fee</option><option>Earliest Availability</option></select></label>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {[[availableToday, setAvailableToday, 'Available Today'], [video, setVideo, 'Video Consultation'], [homeVisit, setHomeVisit, 'Home Visit']].map(([active, setActive, label]) => <button key={label as string} onClick={() => (setActive as (value: boolean) => void)(!(active as boolean))} className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${active ? 'border-sky-200 bg-sky-50 text-sky-800' : 'border-slate-200 bg-white text-slate-600'}`}><Filter size={13} /> {label as string}</button>)}
        </div>
      </section>
      <div className="flex items-center justify-between"><p className="text-sm text-slate-500"><SlidersHorizontal className="mr-1 inline" size={15} /> Showing {filteredDoctors.length} demo providers</p><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">Demo Data · verify before booking</span></div>
      <section className="grid gap-4 xl:grid-cols-2">{filteredDoctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} onViewProfile={() => navigate(`/doctors/${doctor.id}`)} onCompare={() => toggleCompare(doctor.id)} onBook={() => navigate('/appointments/book', { state: { doctorId: doctor.id } })} isSelected={selectedDoctors.includes(doctor.id)} />)}</section>
    </div>
  );
}
