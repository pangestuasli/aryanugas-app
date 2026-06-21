import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
const ProtectedRoute = ({ children }) => {
  const auth = sessionStorage.getItem('isLoggedIn');

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}
          {/* Halaman Guest menjadi halaman utama (/) */}
          <Route path="/" element={<GuestDashboard />} />
          
          <Route element={<CustomerLayout />}>
  <Route path="/dashboard" element={<CustomerDashboard />} />
  <Route path="/upgrade" element={<UpgradeMembership />} />
</Route>


          {/* Auth Layout */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* ================= PROTECTED ROUTES ================= */}
          {/* Main Layout (Hanya bisa diakses jika sudah login) */}
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/dashboard" element={<CustomerDashboard />} />

            {/* Patients */}
            <Route path="/patients" element={<Patients />} />
            <Route path="/patients/:id" element={<PatientDetail />} />

            {/* Medicines */}
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/medicines/:id" element={<MedicineDetail />} />
            <Route path="/components" element={<Components />} />
          </Route>

          {/* Redirect jika URL tidak ditemukan */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;