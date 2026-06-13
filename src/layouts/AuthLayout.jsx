import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-white font-sans text-slate-700">
      
      {/* Sisi Kiri: Ilustrasi */}
      <div className="hidden lg:flex w-1/2 bg-[#eef8ff] flex-col p-12 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-[#38bdf8] rounded-md flex items-center justify-center">
          </div>

          <span className="text-2xl font-bold text-[#1e293b]">
            Pet Care
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-200 rounded-full opacity-50 blur-3xl"></div>

            <img
  src="https://images.unsplash.com/photo-1517849845537-4d257902454a"
  alt="Pet Care"
/>
          </div>
        </div>
      </div>

      {/* Sisi Kanan */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;  