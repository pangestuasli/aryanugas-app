import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";

// Penambahan ikon SVG (Logo Paw & Logout) agar lebih profesional tanpa emoji
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
  Paw: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8.5 7c-1.38 0-2.5 1.12-2.5 2.5S7.12 12 8.5 12 11 10.88 11 9.5 9.88 7 8.5 7zM15.5 7c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5S16.88 7 15.5 7zM5 12.5C3.34 12.5 2 13.84 2 15.5S3.34 18.5 5 18.5 8 17.16 8 15.5 6.66 12.5 5 12.5zm14 0c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm-7-2c-2.48 0-4.5 2.02-4.5 4.5 0 2.22 1.63 4.05 3.76 4.42.24.04.48.08.74.08 2.48 0 4.5-2.02 4.5-4.5S14.48 10.5 12 10.5z" />
    </svg>
  ),
  Logout: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  )
};

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <Icons.Dashboard />, section: "DASHBOARD" },
    { name: "Pasien Hewan", path: "/patients", icon: <Icons.Patient />, section: "RECORDS" },
    { name: "Stok Obat", path: "/medicines", icon: <Icons.Medicine />, section: "RECORDS" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("user"); 
    navigate("/login"); 
  };

  return (
    <aside className={`${isOpen ? 'w-72' : 'w-20'} bg-white fixed h-full transition-all duration-300 border-r border-slate-200/60 z-50 flex flex-col shadow-sm`}>
      
      {/* Logo Section */}
      <div className="p-6 mb-2 flex items-center gap-3">
        <div className="min-w-[40px] h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-sm shadow-emerald-200">
          <Icons.Paw />
        </div>
        {isOpen && (
          <div className="overflow-hidden whitespace-nowrap fade-in duration-300">
            <h1 className="text-lg font-bold tracking-tight text-slate-800 leading-none">Arya Pet Care</h1>
            <p className="text-[9px] text-slate-500 font-bold tracking-[0.15em] mt-1 uppercase">Sistem Klinik Hewan</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto space-y-1">
        {menuItems.map((item, index) => (
          <React.Fragment key={item.name}>
            {isOpen && (index === 0 || menuItems[index-1].section !== item.section) && (
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2 mt-6">
                {item.section}
              </p>
            )}
            
            <NavLink
              to={item.path}
              className={({ isActive }) => 
                `flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                  isActive 
                  ? "bg-emerald-50 border border-emerald-100 text-emerald-700 font-semibold" 
                  : "hover:bg-slate-50 border border-transparent text-slate-500 hover:text-slate-800 font-medium"
                }`
              }
            >
              <div className="flex items-center gap-3.5">
                <span className={`${({ isActive }) => isActive ? "text-emerald-600" : "text-slate-400"} transition-colors`}>
                  {item.icon}
                </span>
                {isOpen && <span className="text-sm">{item.name}</span>}
              </div>
              {isOpen && (
                 <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              )}
            </NavLink>
          </React.Fragment>
        ))}
      </nav>

      {/* Support Card (Clean Enterprise Design) */}
      {isOpen && (
        <div className="m-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/60 relative overflow-hidden">
           <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Support Center</p>
              </div>
              <p className="text-slate-700 text-xs leading-relaxed font-medium">Butuh bantuan teknis terkait sistem klinik?</p>
              <button className="mt-3 w-full bg-white border border-slate-200 text-slate-700 py-2 rounded-lg text-xs font-bold hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-sm">
                Hubungi Admin
              </button>
           </div>
        </div>
      )}

      {/* Logout Section */}
      <div className="p-4 border-t border-slate-100">
        <button 
          onClick={handleLogout} 
          className={`w-full flex items-center ${isOpen ? 'justify-start px-4' : 'justify-center'} gap-3 bg-white border border-slate-200 hover:bg-red-50 hover:border-red-100 text-red-600 py-2.5 rounded-xl font-semibold transition-all text-sm group shadow-sm`}
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            <Icons.Logout />
          </span>
          {isOpen && <span>Keluar Sistem</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;