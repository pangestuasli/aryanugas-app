import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './lib/AuthContext'; 

import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import CustomerLayout from './layouts/CustomerLayout';
import LoadingSpinner from './components/LoadingSpinner';
import Components from './pages/Components';

const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const Login = lazy(() => import('./pages/auth/LoginPage'));
const Register = lazy(() => import('./pages/auth/RegisterPage'));
const Patients = lazy(() => import('./pages/Patients'));
const PatientDetail = lazy(() => import('./pages/PatientDetail'));
const Medicines = lazy(() => import('./pages/Medicines'));
const MedicineDetail = lazy(() => import('./pages/MedicineDetail'));
const GuestDashboard = lazy(() => import('./pages/GuestDashboard'));
const CustomerDashboard = lazy(() => import('./pages/customer/CustomerDashboard'));
const UpgradeMembership = lazy(() => import('./pages/customer/UpgradeMembership'));
const Feedback = lazy(() => import('./pages/admin/Feedback'));
const Campaigns = lazy(() => import('./pages/admin/Campaigns'));
const Doctors = lazy(() => import('./pages/admin/Doctors'));
const BookingPage = lazy(() => import('./pages/member/BookingPage'));
const FeedbackPage = lazy(() => import('./pages/member/FeedbackPage'));
const MedicalHistoryPage = lazy(() => import('./pages/member/MedicalHistoryPage'));

const ProtectedRoute = ({ children }) => {
  const auth = sessionStorage.getItem('isLoggedIn');

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>

            {/* ================= PUBLIC ROUTES ================= */}
            <Route path="/" element={<GuestDashboard />} />
            
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* ================= PROTECTED ROUTES (CUSTOMER) ================= */}
            {/* Dibungkus ProtectedRoute agar aman, dan pakai CustomerLayout */}
            <Route
              element={
                <ProtectedRoute>
                  <CustomerLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<CustomerDashboard />} />
              <Route path="/upgrade" element={<UpgradeMembership />} />
              <Route path="/member/booking" element={<BookingPage />} />
              <Route path="/member/feedback" element={<FeedbackPage />} />
              <Route path="/member/medical-history" element={<MedicalHistoryPage />} />
              <Route path="/customer/UpgradeMembership" element={<UpgradeMembership />} />
            </Route>

            {/* ================= PROTECTED ROUTES (ADMIN/STAFF) ================= */}
            {/* Dibungkus ProtectedRoute agar aman, dan pakai MainLayout */}
            <Route
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/doctors" element={<Doctors />} />
              <Route path="/admin/campaigns" element={<Campaigns />} />
              <Route path="/admin/feedback" element={<Feedback />} />
              
              <Route path="/patients" element={<Patients />} />
              <Route path="/patients/:id" element={<PatientDetail />} />
              
              <Route path="/medicines" element={<Medicines />} />
              <Route path="/medicines/:id" element={<MedicineDetail />} />
              
              <Route path="/components" element={<Components />} />
              
            </Route>

            {/* Redirect jika URL tidak ditemukan */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;