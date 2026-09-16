import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import MainLayout from './layouts/MainLayout';
import AffordableCarePage from './pages/AffordableCarePage';
import AppointmentBookingPage from './pages/AppointmentBookingPage';
import AppointmentsPage from './pages/AppointmentsPage';
import ComparePage from './pages/ComparePage';
import DashboardPage from './pages/DashboardPage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import DoctorsPage from './pages/DoctorsPage';
import HomeVisitPage from './pages/HomeVisitPage';
import HospitalsPage from './pages/HospitalsPage';
import MedicalRecordsPage from './pages/MedicalRecordsPage';
import PrivacyPage from './pages/PrivacyPage';
import ReportsPage from './pages/ReportsPage';
import TimelinePage from './pages/TimelinePage';
import WelcomePage from './pages/WelcomePage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
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
          </Route>

          <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
