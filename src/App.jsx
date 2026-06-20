import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import LoadingSpinner from './components/LoadingSpinner';
import Components from './pages/Components';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/auth/LoginPage'));
const Register = lazy(() => import('./pages/auth/RegisterPage'));
const Patients = lazy(() => import('./pages/Patients'));
const PatientDetail = lazy(() => import('./pages/PatientDetail'));
const Medicines = lazy(() => import('./pages/Medicines'));
const MedicineDetail = lazy(() => import('./pages/MedicineDetail'));
const GuestDashboard = lazy(() => import('./pages/GuestDashboard'));

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
            {/* Dashboard Admin sekarang ada di /dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

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