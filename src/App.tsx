import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { CareWorkflowProvider } from './context/CareWorkflowContext';
import MainLayout from './layouts/MainLayout';

const AIAssistantPage = lazy(() => import('./pages/AIAssistantPage'));
const AffordableCarePage = lazy(() => import('./pages/AffordableCarePage'));
const AppointmentBookingPage = lazy(() => import('./pages/AppointmentBookingPage'));
const AppointmentsPage = lazy(() => import('./pages/AppointmentsPage'));
const BloodBankPage = lazy(() => import('./pages/BloodBankPage'));
const ComparePage = lazy(() => import('./pages/ComparePage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const DigitalOPDPage = lazy(() => import('./pages/DigitalOPDPage'));
const DoctorProfilePage = lazy(() => import('./pages/DoctorProfilePage'));
const DoctorsPage = lazy(() => import('./pages/DoctorsPage'));
const EmergencyAssistancePage = lazy(() => import('./pages/EmergencyAssistancePage'));
const HomeVisitPage = lazy(() => import('./pages/HomeVisitPage'));
const HospitalERPPage = lazy(() => import('./pages/HospitalERPPage'));
const HospitalsPage = lazy(() => import('./pages/HospitalsPage'));
const MedicalRecordsPage = lazy(() => import('./pages/MedicalRecordsPage'));
const PaymentsPage = lazy(() => import('./pages/PaymentsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const ReferralsPage = lazy(() => import('./pages/ReferralsPage'));
const ReportsPage = lazy(() => import('./pages/ReportsPage'));
const TimelinePage = lazy(() => import('./pages/TimelinePage'));
const WelcomePage = lazy(() => import('./pages/WelcomePage'));

export default function App() {
  return (
    <AppProvider>
      <CareWorkflowProvider>
        <BrowserRouter>
          <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-sm font-semibold text-slate-500" role="status">Loading MediSahayak…</div>}>
            <Routes>
              <Route path="/" element={<Navigate to="/welcome" replace />} />
              <Route path="/welcome" element={<WelcomePage />} />

              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/medical-records" element={<MedicalRecordsPage />} />
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/doctors/:id" element={<DoctorProfilePage />} />
                <Route path="/hospitals" element={<HospitalsPage />} />
                <Route path="/home-visit" element={<HomeVisitPage />} />
                <Route path="/affordable-care" element={<AffordableCarePage />} />
                <Route path="/appointments" element={<AppointmentsPage />} />
                <Route path="/appointments/book" element={<AppointmentBookingPage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/timeline" element={<TimelinePage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/settings" element={<PrivacyPage />} />
                <Route path="/assistant" element={<AIAssistantPage />} />
                <Route path="/opd" element={<DigitalOPDPage />} />
                <Route path="/emergency" element={<EmergencyAssistancePage />} />
                <Route path="/payments" element={<PaymentsPage />} />
                <Route path="/blood-bank" element={<BloodBankPage />} />
                <Route path="/referrals" element={<ReferralsPage />} />
                <Route path="/hospital-erp" element={<HospitalERPPage />} />
              </Route>

              <Route path="*" element={<Navigate to="/welcome" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CareWorkflowProvider>
    </AppProvider>
  );
}
