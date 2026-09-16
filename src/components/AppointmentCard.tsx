import type { Appointment } from '../types';

type AppointmentCardProps = {
  appointment: Appointment;
  onView: () => void;
  onReschedule: () => void;
  onCancel: () => void;
};

export default function AppointmentCard({ appointment, onView, onReschedule, onCancel }: AppointmentCardProps) {
  const badgeStyles = {
    Upcoming: 'bg-emerald-50 text-emerald-700',
    Completed: 'bg-sky-50 text-sky-700',
    Cancelled: 'bg-red-50 text-red-700',
  } as const;

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-soft">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{appointment.doctorName}</h3>
          <p className="text-sm text-slate-600">{appointment.specialty}</p>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badgeStyles[appointment.status]}`}>{appointment.status}</span>
      </div>

      <div className="mb-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
        <span><strong>Date:</strong> {appointment.date}</span>
        <span><strong>Time:</strong> {appointment.time}</span>
        <span><strong>Mode:</strong> {appointment.mode}</span>
        <span><strong>Fee:</strong> ₹{appointment.fee}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={onView} className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">View</button>
        <button onClick={onReschedule} className="rounded-xl bg-sky-100 px-3 py-2 text-xs font-semibold text-sky-700">Reschedule</button>
        <button onClick={onCancel} className="rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">Cancel</button>
      </div>
    </div>
  );
}
