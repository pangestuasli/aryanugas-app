import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LoadingSpinner from './components/LoadingSpinner';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const Patients = lazy(() => import('./pages/Patients'));
const PatientDetail = lazy(() => import('./pages/PatientDetail'));
const Medicines = lazy(() => import('./pages/Medicines'));
const MedicineDetail = lazy(() => import('./pages/MedicineDetail'));

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
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            } 
          />
          
          {/* Pasien Section */}
          <Route 
            path="/patients" 
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Patients />
                </MainLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/patients/:id" 
            element={
              <ProtectedRoute>
                <MainLayout>
                  <PatientDetail />
                </MainLayout>
              </ProtectedRoute>
            } 
          />

          {/* Stok Obat Section */}
          <Route 
            path="/medicines" 
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Medicines />
                </MainLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/medicines/:id" 
            element={
              <ProtectedRoute>
                <MainLayout>
                  <MedicineDetail />
                </MainLayout>
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;