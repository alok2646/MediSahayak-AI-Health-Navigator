import { hospitals } from '../data/hospitals';
import type {
  BloodInventory,
  BloodRequest,
  EmergencyCase,
  Hospital,
  Invoice,
  OPDRegistration,
  Payment,
  Referral,
} from '../types';
import { bloodInventory } from '../data/careCoordination';

export interface HospitalService {
  listHospitals(): Promise<Hospital[]>;
  registerOPD(registration: Omit<OPDRegistration, 'registrationId' | 'createdAt' | 'status'>): Promise<OPDRegistration>;
}

export interface PaymentService {
  simulatePayment(invoice: Invoice, outcome: 'Paid' | 'Failed'): Promise<Payment>;
}

export interface EmergencyService {
  prepareEmergencyInformation(emergencyCase: Omit<EmergencyCase, 'id' | 'createdAt' | 'status'>): Promise<EmergencyCase>;
}

export interface BloodBankService {
  listInventory(): Promise<BloodInventory[]>;
  submitRequest(request: Omit<BloodRequest, 'id' | 'createdAt' | 'status'>): Promise<BloodRequest>;
}

export interface ReferralService {
  submitReferral(referral: Omit<Referral, 'id' | 'createdAt' | 'status'>): Promise<Referral>;
}

const pause = () => new Promise<void>((resolve) => window.setTimeout(resolve, 180));

export const demoHospitalService: HospitalService = {
  async listHospitals() {
    await pause();
    return hospitals;
  },
  async registerOPD(registration) {
    await pause();
    return {
      ...registration,
      registrationId: `OPD-DEMO-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: 'Registered',
    };
  },
};

export const demoPaymentService: PaymentService = {
  async simulatePayment(invoice, outcome) {
    await pause();
    return {
      id: `PAY-DEMO-${Date.now().toString().slice(-6)}`,
      invoiceId: invoice.id,
      amount: invoice.amount,
      status: outcome,
      method: 'Demo Payment',
      transactionReference: `DEMO-TXN-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
    };
  },
};

export const demoEmergencyService: EmergencyService = {
  async prepareEmergencyInformation(emergencyCase) {
    await pause();
    if (!emergencyCase.patient.name.trim() || !emergencyCase.hospitalId) {
      throw new Error('Enter the patient name and select a receiving hospital.');
    }
    return {
      ...emergencyCase,
      id: `EMG-DEMO-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: 'Prepared',
    };
  },
};

export const demoBloodBankService: BloodBankService = {
  async listInventory() {
    await pause();
    return bloodInventory;
  },
  async submitRequest(request) {
    await pause();
    if (request.units < 1 || !request.patientName.trim()) {
      throw new Error('Enter the patient name and a valid number of units.');
    }
    return {
      ...request,
      id: `BLD-DEMO-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: 'Submitted',
    };
  },
};

export const demoReferralService: ReferralService = {
  async submitReferral(referral) {
    await pause();
    if (!referral.consentGiven) {
      throw new Error('Patient consent is required before submitting a referral.');
    }
    return {
      ...referral,
      id: `REF-DEMO-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: 'Sent',
    };
  },
};
