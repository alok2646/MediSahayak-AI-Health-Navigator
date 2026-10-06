import type { BloodInventory, HospitalPatient, Invoice, Referral } from '../types';

export const bloodInventory: BloodInventory[] = [
  { bloodGroup: 'A+', availableUnits: 12, reservedUnits: 3, requestedUnits: 2, stockStatus: 'Adequate', expiresOn: '2026-11-12' },
  { bloodGroup: 'A-', availableUnits: 4, reservedUnits: 1, requestedUnits: 2, stockStatus: 'Low', expiresOn: '2026-10-21' },
  { bloodGroup: 'B+', availableUnits: 9, reservedUnits: 2, requestedUnits: 1, stockStatus: 'Adequate', expiresOn: '2026-11-03' },
  { bloodGroup: 'B-', availableUnits: 2, reservedUnits: 1, requestedUnits: 1, stockStatus: 'Critical', expiresOn: '2026-10-18' },
  { bloodGroup: 'AB+', availableUnits: 5, reservedUnits: 1, requestedUnits: 0, stockStatus: 'Adequate', expiresOn: '2026-11-08' },
  { bloodGroup: 'AB-', availableUnits: 1, reservedUnits: 0, requestedUnits: 1, stockStatus: 'Critical', expiresOn: '2026-10-15' },
  { bloodGroup: 'O+', availableUnits: 16, reservedUnits: 4, requestedUnits: 3, stockStatus: 'Adequate', expiresOn: '2026-11-16' },
  { bloodGroup: 'O-', availableUnits: 3, reservedUnits: 2, requestedUnits: 2, stockStatus: 'Low', expiresOn: '2026-10-25' },
];

export const demoInvoices: Invoice[] = [
  { id: 'INV-DEMO-1001', patientName: 'Demo Patient A', description: 'OPD consultation — Internal Medicine', amount: 500, status: 'Pending', createdAt: '2026-09-15' },
  { id: 'INV-DEMO-1002', patientName: 'Demo Patient B', description: 'Diagnostic service — CBC panel', amount: 350, status: 'Paid', createdAt: '2026-09-12' },
  { id: 'INV-DEMO-1003', patientName: 'Demo Patient C', description: 'OPD registration', amount: 150, status: 'Failed', createdAt: '2026-09-10' },
];

export const demoReferrals: Referral[] = [
  {
    id: 'REF-DEMO-2001',
    patientName: 'Demo Patient A',
    referringHospital: 'CityCare Multi-Speciality Hospital',
    referringDoctor: 'Dr. Demo Clinician',
    receivingHospital: 'Rajiv Gandhi Government Hospital',
    department: 'General Medicine',
    reason: 'Further specialist review requested by referring clinician.',
    priority: 'Routine',
    requiredDocuments: ['Recent report summary'],
    consentGiven: true,
    status: 'Sent',
    createdAt: '2026-09-14',
  },
];

export const demoOPDDepartments = [
  'General Medicine',
  'Cardiology',
  'Dermatology',
  'Orthopedics',
  'Pediatrics',
  'Diagnostics',
];

export const demoOPDSlots = ['9:00 AM', '10:30 AM', '12:00 PM', '2:30 PM'];

export const demoIncomingDonations = [
  { id: 'DON-DEMO-01', group: 'O+', units: 2, date: '2026-09-18', status: 'Scheduled' },
  { id: 'DON-DEMO-02', group: 'A-', units: 1, date: '2026-09-19', status: 'Pending screening' },
];

export const demoHospitalMetrics = [
  { label: "Today's OPD", value: '42', detail: 'Demo registrations' },
  { label: 'Appointments', value: '18', detail: 'Demo schedule' },
  { label: 'Emergency cases', value: '3', detail: 'Demo cases' },
  { label: 'Available beds', value: '24', detail: 'Demo capacity' },
  { label: 'Pending referrals', value: '6', detail: 'Demo referrals' },
  { label: 'Blood units available', value: '52', detail: 'Demo blood bank data' },
  { label: 'Pending payments', value: '₹12,450', detail: 'Demo billing' },
];

export const demoHospitalPatients: HospitalPatient[] = [
  { patientId: 'PAT-DEMO-3101', name: 'Demo Patient A', age: 42, contact: 'Hidden for privacy', lastVisit: '2026-09-15', department: 'General Medicine', recordStatus: 'Demo' },
  { patientId: 'PAT-DEMO-3102', name: 'Demo Patient B', age: 31, contact: 'Hidden for privacy', lastVisit: '2026-09-14', department: 'Cardiology', recordStatus: 'Demo' },
  { patientId: 'PAT-DEMO-3103', name: 'Demo Patient C', age: 56, contact: 'Hidden for privacy', lastVisit: '2026-09-12', department: 'Diagnostics', recordStatus: 'Demo' },
];
