import { createContext, useContext, useMemo, useState } from 'react';
import { initialAppointments } from '../data/appointments';
import type { Appointment, TimelineEvent } from '../types';

type ToastState = {
  visible: boolean;
  message: string;
};

type AppContextValue = {
  appointments: Appointment[];
  timelineEvents: TimelineEvent[];
  toast: ToastState;
  addAppointment: (appointment: Appointment) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  showToast: (message: string) => void;
  hideToast: () => void;
  addTimelineEvent: (event: TimelineEvent) => void;
};

const defaultTimeline: TimelineEvent[] = [
  { id: 'ev-1', month: 'September 2026', title: 'Blood Test Uploaded', detail: 'CBC blood report uploaded and reviewed.', category: 'Report' },
  { id: 'ev-2', month: 'August 2026', title: 'Doctor Consultation', detail: 'Follow-up with Dr. Rahul Mehra for cardiology review.', category: 'Consultation' },
  { id: 'ev-3', month: 'July 2026', title: 'MRI Report Uploaded', detail: 'MRI report added to medical vault.', category: 'Imaging' },
  { id: 'ev-4', month: 'June 2026', title: 'Hospital Visit', detail: 'Outpatient visit to Arogya Hospital.', category: 'Visit' },
];

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(defaultTimeline);
  const [toast, setToast] = useState<ToastState>({ visible: false, message: '' });

  const addAppointment = (appointment: Appointment) => {
    setAppointments((current) => [appointment, ...current]);
    setTimelineEvents((current) => [
      {
        id: `ev-${Date.now()}`,
        month: 'September 2026',
        title: `Appointment with ${appointment.doctorName}`,
        detail: `${appointment.mode} booked for ${appointment.date} at ${appointment.time}.`,
        category: 'Appointment',
      },
      ...current,
    ]);
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id ? { ...appointment, status } : appointment,
      ),
    );
  };

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    window.setTimeout(() => setToast({ visible: false, message: '' }), 2600);
  };

  const hideToast = () => setToast({ visible: false, message: '' });

  const addTimelineEvent = (event: TimelineEvent) => {
    setTimelineEvents((current) => [event, ...current]);
  };

  const value = useMemo(
    () => ({ appointments, timelineEvents, toast, addAppointment, updateAppointmentStatus, showToast, hideToast, addTimelineEvent }),
    [appointments, timelineEvents, toast],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used inside AppProvider');
  }
  return context;
}
