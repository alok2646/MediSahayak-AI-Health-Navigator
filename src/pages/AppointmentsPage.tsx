import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentCard from '../components/AppointmentCard';
import { useApp } from '../context/AppContext';

const tabs = ['Upcoming', 'Completed', 'Cancelled'] as const;

export default function AppointmentsPage() {
  const navigate = useNavigate();
  const { appointments, updateAppointmentStatus, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Upcoming');

  const filtered = useMemo(
    () => appointments.filter((appointment) => appointment.status === activeTab),
    [activeTab, appointments],
  );

  const handleCancel = (id: string) => {
    updateAppointmentStatus(id, 'Cancelled');
    showToast('Appointment cancelled');
  };

  const handleReschedule = (id: string) => {
    const appointment = appointments.find((item) => item.id === id);
    if (!appointment) return;
    const nextDate = '2026-09-25';
    const nextTime = '7:00 PM';
    updateAppointmentStatus(id, 'Upcoming');
    showToast(`Appointment rescheduled to ${nextDate} at ${nextTime}`);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-4xl font-black text-slate-900">My Appointments</h1>
        <div className="mt-5 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${activeTab === tab ? 'border-sky-200 bg-sky-100 text-sky-800' : 'border-slate-200 bg-white text-slate-700'}`}>
              {tab}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {filtered.length > 0 ? filtered.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onView={() => navigate(`/doctors/${appointment.doctorId}`)}
            onReschedule={() => handleReschedule(appointment.id)}
            onCancel={() => handleCancel(appointment.id)}
          />
        )) : <div className="col-span-full rounded-[28px] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">No {activeTab.toLowerCase()} appointments.</div>}
      </section>
    </div>
  );
}
