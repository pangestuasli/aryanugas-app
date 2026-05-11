import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full bg-white font-sans text-slate-700">
      {/* Sisi Kiri: Ilustrasi */}
      <div className="hidden lg:flex w-1/2 bg-[#eef8ff] flex-col p-12 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-[#38bdf8] rounded-md flex items-center justify-center">
             <span className="text-white font-bold text-xl">D</span>
          </div>
          <span className="text-2xl font-bold text-[#1e293b]">Dashnext</span>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          {/* Placeholder untuk Ilustrasi */}
          <div className="relative w-full max-w-md">
             {/* Lingkaran Background Dekoratif */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-200 rounded-full opacity-50 blur-3xl"></div>
            <img 
              src="https://img.freepik.com/free-vector/flat-hand-drawn-gardening-concept_23-2148854483.jpg" 
              alt="Illustration" 
              className="relative z-10 w-full drop-shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Sisi Kanan: Form Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;