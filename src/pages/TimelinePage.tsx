import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import MedicalTimeline from '../components/MedicalTimeline';

export default function TimelinePage() {
  const { timelineEvents } = useApp();
  const [selectedEventId, setSelectedEventId] = useState<string>(timelineEvents[0]?.id ?? '');

  const selectedEvent = useMemo(
    () => timelineEvents.find((event) => event.id === selectedEventId) ?? timelineEvents[0],
    [selectedEventId, timelineEvents],
  );

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-4xl font-black text-slate-900">Health Timeline</h1>
        <p className="mt-2 text-slate-600">Track your recent reports, appointments, and care milestones at a glance.</p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-soft">
          <MedicalTimeline
            events={timelineEvents}
            selected={selectedEventId}
            onSelect={(event) => setSelectedEventId(event.id)}
          />
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-soft">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Selected event</p>
          {selectedEvent ? (
            <>
              <h2 className="mt-3 text-2xl font-black text-slate-900">{selectedEvent.title}</h2>
              <div className="mt-3 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-700">
                {selectedEvent.category}
              </div>
              <p className="mt-4 text-base text-slate-600">{selectedEvent.detail}</p>
              <div className="mt-6 rounded-[22px] bg-sky-50 p-4 text-sm text-slate-700">
                <div className="font-semibold text-slate-900">Month</div>
                <div className="mt-1">{selectedEvent.month}</div>
              </div>
            </>
          ) : (
            <p className="mt-4 text-slate-500">No events yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
