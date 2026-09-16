import type { MedicalDocument } from '../types';

export const medicalDocuments: MedicalDocument[] = [
  { id: 'doc-1', title: 'CBC Blood Test', date: '12 Sep 2026', category: 'Blood Report' },
  { id: 'doc-2', title: 'MRI Report', date: '20 Aug 2026', category: 'Radiology' },
  { id: 'doc-3', title: 'Prescription', date: '15 Aug 2026', category: 'Prescription' },
  { id: 'doc-4', title: 'X-Ray Report', date: '10 Jul 2026', category: 'Radiology' },
  { id: 'doc-5', title: 'Doctor Notes', date: '01 Jul 2026', category: 'Doctor Notes' },
  { id: 'doc-6', title: 'CT Scan Review', date: '22 Jun 2026', category: 'Radiology' },
  { id: 'doc-7', title: 'Discharge Summary', date: '05 Jun 2026', category: 'Discharge Summary' },
  { id: 'doc-8', title: 'Medication Record', date: '19 Apr 2026', category: 'Prescription' },
];

export const recentReports = [
  { title: 'CBC Blood Test', date: '12 Sep 2026', status: 'Reviewed' },
  { title: 'Vitamin D Panel', date: '05 Sep 2026', status: 'Action needed' },
  { title: 'Liver Function Test', date: '21 Aug 2026', status: 'Stable' },
];
