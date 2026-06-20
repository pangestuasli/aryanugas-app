import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-white font-sans text-slate-700">

      {/* Sisi Kiri: Brand & Ilustrasi */}
      <div className="hidden lg:flex w-1/2 bg-[#1F3A2E] flex-col p-12 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#9C732C] opacity-20 blur-3xl pointer-events-none" />

        <Link to="/" className="flex items-center gap-2 mb-8 relative z-10">
          <div className="w-9 h-9 bg-[#F8F4EC] rounded-md flex items-center justify-center text-base">
            🐾
          </div>
          <span className="text-2xl font-bold text-[#F8F4EC]">
            Arya Pet Care
          </span>
        </Link>

        <svg className="absolute inset-0 w-full h-full z-0" aria-hidden="true">
          <defs>
            <pattern id="pawPattern" width="56" height="56" patternUnits="userSpaceOnUse" patternTransform="rotate(12)">
              <g fill="#F8F4EC" opacity="0.07">
                <ellipse cx="28" cy="34" rx="6" ry="5" />
                <circle cx="20" cy="24" r="2.6" />
                <circle cx="25" cy="19" r="2.8" />
                <circle cx="31" cy="19" r="2.8" />
                <circle cx="36" cy="24" r="2.6" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pawPattern)" />
        </svg>

        <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="w-24 h-24 rounded-full bg-[#F8F4EC]/[0.08] border border-[#F8F4EC]/15 flex items-center justify-center">
            <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
              <g fill="#F8F4EC">
                <ellipse cx="24" cy="30" rx="9" ry="7.5" />
                <circle cx="11" cy="16" r="4.2" />
                <circle cx="20" cy="9" r="4.6" />
                <circle cx="28" cy="9" r="4.6" />
                <circle cx="37" cy="16" r="4.2" />
              </g>
            </svg>
          </div>
        </div>

        <p className="relative z-10 text-sm text-[#F8F4EC]/70 max-w-sm">
          Dipercaya oleh 1.200+ pemilik hewan untuk merawat anabul kesayangan mereka.
        </p>
      </div>

      {/* Sisi Kanan: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;