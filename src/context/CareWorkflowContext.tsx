import { createContext, useContext, useMemo, useState } from 'react';
import { demoInvoices, demoReferrals } from '../data/careCoordination';
import type {
  BloodRequest,
  EmergencyCase,
  Invoice,
  OPDRegistration,
  Payment,
  Referral,
  ReferralStatus,
} from '../types';

type CareWorkflowValue = {
  opdRegistrations: OPDRegistration[];
  emergencyCases: EmergencyCase[];
  invoices: Invoice[];
  payments: Payment[];
  bloodRequests: BloodRequest[];
  referrals: Referral[];
  addOPDRegistration: (registration: OPDRegistration) => void;
  addEmergencyCase: (emergencyCase: EmergencyCase) => void;
  updateEmergencyCaseStatus: (id: string, status: EmergencyCase['status']) => void;
  addInvoice: (invoice: Invoice) => void;
  recordPayment: (payment: Payment) => void;
  addBloodRequest: (request: BloodRequest) => void;
  addReferral: (referral: Referral) => void;
  updateReferralStatus: (id: string, status: ReferralStatus) => void;
};

const CareWorkflowContext = createContext<CareWorkflowValue | null>(null);

export function CareWorkflowProvider({ children }: { children: React.ReactNode }) {
  const [opdRegistrations, setOPDRegistrations] = useState<OPDRegistration[]>([]);
  const [emergencyCases, setEmergencyCases] = useState<EmergencyCase[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>(demoInvoices);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>(demoReferrals);

  const value = useMemo<CareWorkflowValue>(() => ({
    opdRegistrations,
    emergencyCases,
    invoices,
    payments,
    bloodRequests,
    referrals,
    addOPDRegistration: (registration) => setOPDRegistrations((current) => [registration, ...current]),
    addEmergencyCase: (emergencyCase) => setEmergencyCases((current) => [emergencyCase, ...current]),
    updateEmergencyCaseStatus: (id, status) => setEmergencyCases((current) => current.map((item) => item.id === id ? { ...item, status } : item)),
    addInvoice: (invoice) => setInvoices((current) => [invoice, ...current]),
    recordPayment: (payment) => {
      setPayments((current) => [payment, ...current]);
      setInvoices((current) => current.map((invoice) => invoice.id === payment.invoiceId ? { ...invoice, status: payment.status } : invoice));
    },
    addBloodRequest: (request) => setBloodRequests((current) => [request, ...current]),
    addReferral: (referral) => setReferrals((current) => [referral, ...current]),
    updateReferralStatus: (id, status) => setReferrals((current) => current.map((referral) => referral.id === id ? { ...referral, status } : referral)),
  }), [bloodRequests, emergencyCases, invoices, opdRegistrations, payments, referrals]);

  return <CareWorkflowContext.Provider value={value}>{children}</CareWorkflowContext.Provider>;
}

export function useCareWorkflow() {
  const context = useContext(CareWorkflowContext);
  if (!context) throw new Error('useCareWorkflow must be used inside CareWorkflowProvider');
  return context;
}
