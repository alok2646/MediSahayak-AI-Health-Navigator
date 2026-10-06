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

export type MedicalRecord = MedicalDocument;

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

export type Patient = {
  patientId: string;
  name: string;
  age: number;
  contact: string;
};

export type OPDRegistration = {
  registrationId: string;
  patient: Patient;
  hospitalId: string;
  hospitalName: string;
  department: string;
  doctorName: string;
  date: string;
  time: string;
  service: string;
  reason: string;
  status: 'Registered' | 'Cancelled';
  createdAt: string;
};

export type EmergencyCase = {
  id: string;
  patient: Patient;
  category: string;
  situation: string;
  allergies: string;
  medications: string;
  conditions: string;
  bloodGroup: string;
  emergencyContact: string;
  ambulanceStatus: string;
  hospitalId: string;
  hospitalName: string;
  status: 'Prepared' | 'Arrived' | 'Closed';
  createdAt: string;
};

export type InvoiceStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded';

export type Invoice = {
  id: string;
  patientName: string;
  description: string;
  amount: number;
  status: InvoiceStatus;
  createdAt: string;
};

export type Payment = {
  id: string;
  invoiceId: string;
  amount: number;
  status: InvoiceStatus;
  method: 'Demo Payment';
  transactionReference: string;
  createdAt: string;
};

export type BloodInventory = {
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  availableUnits: number;
  reservedUnits: number;
  requestedUnits: number;
  stockStatus: 'Adequate' | 'Low' | 'Critical';
  expiresOn: string;
};

export type BloodRequest = {
  id: string;
  patientName: string;
  bloodGroup: BloodInventory['bloodGroup'];
  units: number;
  location: string;
  hospitalName: string;
  status: 'Submitted' | 'Under review' | 'Fulfilled' | 'Unavailable';
  createdAt: string;
};

export type ReferralStatus = 'Draft' | 'Sent' | 'Accepted' | 'Rejected' | 'Scheduled' | 'Completed';

export type Referral = {
  id: string;
  patientName: string;
  referringHospital: string;
  referringDoctor: string;
  receivingHospital: string;
  department: string;
  reason: string;
  priority: 'Routine' | 'Urgent';
  requiredDocuments: string[];
  consentGiven: boolean;
  status: ReferralStatus;
  createdAt: string;
};

export type HospitalPatient = Patient & {
  lastVisit: string;
  department: string;
  recordStatus: 'Demo';
};
