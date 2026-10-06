import { NavLink, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SafetyBanner from '../components/SafetyBanner';
import Toast from '../components/Toast';
import Topbar from '../components/Topbar';
import { useApp } from '../context/AppContext';

export default function MainLayout() {
  const { toast, hideToast } = useApp();

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-slate-800">
      <div className="mx-auto flex min-h-screen max-w-[1680px]">
        <Sidebar />
        <main className="min-w-0 flex-1 px-4 py-4 pb-28 sm:px-6 lg:px-10 lg:py-6 lg:pb-28 xl:pb-6">
          <Topbar />
          <SafetyBanner />
          <Outlet />
        </main>
      </div>
      <nav aria-label="Mobile navigation" className="fixed inset-x-3 bottom-3 z-20 flex gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-lg backdrop-blur xl:hidden">
        {[
          ['/dashboard', 'Home'],
          ['/reports', 'Reports'],
          ['/doctors', 'Doctors'],
          ['/hospitals', 'Hospitals'],
          ['/appointments', 'Visits'],
          ['/compare', 'Compare'],
          ['/assistant', 'Assistant'],
          ['/opd', 'OPD'],
          ['/emergency', 'Emergency'],
          ['/home-visit', 'Home Visit'],
          ['/affordable-care', 'Affordable'],
          ['/medical-records', 'Records'],
          ['/timeline', 'Timeline'],
          ['/payments', 'Payments'],
          ['/blood-bank', 'Blood Bank'],
          ['/referrals', 'Referrals'],
          ['/hospital-erp', 'Provider'],
          ['/privacy', 'Settings'],
        ].map(([to, label]) => (
          <NavLink key={to} to={to} title={label} className={({ isActive }) => `shrink-0 rounded-xl px-3 py-2 text-center text-[11px] font-semibold ${isActive ? 'bg-sky-100 text-sky-800' : 'text-slate-500'}`}>
            {label}
          </NavLink>
        ))}
      </nav>
      <Toast visible={toast.visible} message={toast.message} onClose={hideToast} />
    </div>
  );
}
