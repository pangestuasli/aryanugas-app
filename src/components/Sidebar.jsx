import React from 'react';
import { NavLink } from "react-router-dom";

// Ikon SVG Manual agar tetap ringan dan tidak perlu install library baru
const Icons = {
  Dashboard: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  Patient: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  Medicine: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.022.547l-2.387 2.387a2 2 0 000 2.828l.318.318a2 2 0 002.828 0l2.387-2.387z" />
    </svg>
  ),
};

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { name: "Dashboard", path: "/", icon: <Icons.Dashboard />, section: "DASHBOARD" },
    { name: "Pasien (Anabul)", path: "/patients", icon: <Icons.Patient />, section: "RECORDS" },
    { name: "Stok Obat", path: "/medicines", icon: <Icons.Medicine />, section: "RECORDS" },
  ];

  return (
    <aside className={`${isOpen ? 'w-72' : 'w-20'} bg-white fixed h-full transition-all duration-300 border-r border-slate-100 z-50 flex flex-col shadow-sm`}>
      
      {/* Logo Section */}
      <div className="p-6 mb-4 flex items-center gap-3">
        <div className="min-w-[40px] h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
          <span className="text-xl">🐾</span>
        </div>
        {isOpen && (
          <div className="overflow-hidden whitespace-nowrap">
            <h1 className="text-lg font-bold tracking-tight text-slate-800 leading-none">Arya Pet Care</h1>
            <p className="text-[8px] text-emerald-500 font-bold tracking-[0.2em] mt-1">ANIMAL CLINIC SYSTEM</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto space-y-1">
        {menuItems.map((item, index) => (
          <React.Fragment key={item.name}>
            {/* Tampilkan Judul Section (seperti Dashboard/Form/Auth pada gambar referensi) */}
            {isOpen && (index === 0 || menuItems[index-1].section !== item.section) && (
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2 mt-6">
                {item.section}
              </p>
            )}
            
            <NavLink
              to={item.path}
              className={({ isActive }) => 
                `flex items-center justify-between p-3.5 rounded-2xl transition-all duration-200 ${
                  isActive 
                  ? "bg-emerald-50 text-emerald-600 shadow-sm shadow-emerald-100" 
                  : "hover:bg-slate-50 text-slate-500 hover:text-slate-800"
                }`
              }
            >
              <div className="flex items-center gap-4">
                <span className="transition-colors">{item.icon}</span>
                {isOpen && <span className="font-bold text-sm">{item.name}</span>}
              </div>
              {isOpen && (
                 <svg className="w-3 h-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
              )}
            </NavLink>
          </React.Fragment>
        ))}
      </nav>

      {/* Upgrade Card / Support Info (Meniru gaya gambar referensi) */}
      {isOpen && (
        <div className="m-4 p-5 bg-gradient-to-br from-[#3B82F6] via-[#22D3EE] to-[#2DD4BF] rounded-3xl relative overflow-hidden shadow-lg shadow-blue-100">
           <div className="relative z-10">
              <p className="text-white text-[10px] font-bold opacity-80 uppercase tracking-widest">Support Clinic</p>
              <p className="text-white text-xs mt-2 leading-relaxed font-medium">Butuh bantuan teknis atau stok habis?</p>
              <button className="mt-4 w-full bg-white text-emerald-600 py-2.5 rounded-xl text-xs font-extrabold hover:bg-emerald-50 transition-colors shadow-sm">
                Hubungi Admin
              </button>
           </div>
           <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        </div>
      )}

      {/* Logout Section */}
      <div className="p-4 border-t border-slate-50">
        <button className="w-full flex items-center justify-center gap-3 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white py-3.5 rounded-2xl font-bold transition-all text-xs group">
          <span className="group-hover:scale-110 transition-transform">🚪</span>
          {isOpen && <span>Keluar Sistem</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;