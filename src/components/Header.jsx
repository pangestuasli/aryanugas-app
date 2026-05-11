import React from 'react';

const Header = ({ onToggleSidebar }) => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40 border-b border-slate-50">
      <div className="flex items-center gap-4">
        {/* Toggle Button */}
        <button onClick={onToggleSidebar} className="p-2 hover:bg-slate-50 rounded-lg text-slate-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        
        {/* Search */}
        <div className="relative hidden md:block">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </span>
          <input type="text" placeholder="Search" className="bg-slate-100 border-none rounded-xl py-2 pl-10 pr-4 w-64 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 pr-4 border-r border-slate-100">
          <NavToolIcon icon="🌙" />
          <NavToolIcon icon="🇬🇧" />
          <div className="relative">
            <NavToolIcon icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            } />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </div>
        </div>
        
        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800">Arya Pangestu</p>
            <p className="text-[10px] font-medium text-slate-400">Doctor</p>
          </div>
          <img src="https://i.pravatar.cc/150?u=chedo" className="w-10 h-10 rounded-full border-2 border-blue-100" alt="profile" />
        </div>
      </div>
    </header>
  );
};

const NavToolIcon = ({ icon }) => (
  <button className="p-2 hover:bg-slate-50 rounded-full text-slate-500 transition-colors">
    {icon}
  </button>
);

export default Header;