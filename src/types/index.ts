export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  location: string;
  distance: string;
  fee: number;
  availability: string;
  teleconsultation: boolean;
  homeVisit: boolean;
  verified: boolean;
  experience: number;
  languages: string[];
  bio: string;
};

export type Hospital = {
  id: string;
  name: string;
  distance: string;
  services: string[];
  emergency: boolean;
  fee: string;
  location: string;
  contact: string;
  government: boolean;
  affordable: boolean;
  specialty: string;
  availableToday: boolean;
};

export type MedicalDocument = {
  id: string;
  title: string;
  date: string;
  category: 'Blood Report' | 'Radiology' | 'Prescription' | 'Doctor Notes' | 'Discharge Summary';
  status?: string;
};

export type AppointmentMode = 'Clinic' | 'Video' | 'Home Visit';
export type AppointmentStatus = 'Upcoming' | 'Completed' | 'Cancelled';

export type Appointment = {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  mode: AppointmentMode;
  fee: number;
  status: AppointmentStatus;
};

export type TimelineEvent = {
  id: string;
  month: string;
  title: string;
  detail: string;
  category: string;
};

export type ReportParameter = {
  name: string;
  value: string;
  reference: string;
  status: 'Below reference range' | 'Within reference range' | 'Above reference range';
  explanation: string;
};

export type ReportAnalysis = {
  summary: string;
  parameters: ReportParameter[];
  explanations: string[];
  questionsForDoctor: string[];
  careCategory: string;
  safetyMessage: string;
};
