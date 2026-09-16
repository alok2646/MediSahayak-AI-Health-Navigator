import type { TimelineEvent } from '../types';

type MedicalTimelineProps = {
  events: TimelineEvent[];
  selected?: string;
  onSelect?: (event: TimelineEvent) => void;
};

export default function MedicalTimeline({ events, selected, onSelect }: MedicalTimelineProps) {
  return (
    <div className="space-y-6">
      {events.map((event) => (
        <button
          key={event.id}
          type="button"
          onClick={() => onSelect?.(event)}
          className={`flex w-full items-start gap-4 rounded-[22px] border p-4 text-left transition ${
            selected === event.id ? 'border-sky-200 bg-sky-50 shadow-soft' : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex flex-col items-center">
            <div className="h-4 w-4 rounded-full bg-gradient-to-br from-sky-500 to-teal-500" />
            <div className="mt-2 h-16 w-px bg-slate-200" />
          </div>
          <div className="flex-1">
            <div className="text-xs uppercase tracking-[0.14em] text-slate-400">{event.month}</div>
            <h3 className="mt-2 text-lg font-bold text-slate-900">{event.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{event.detail}</p>
            <span className="mt-2 inline-flex rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-700">{event.category}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
