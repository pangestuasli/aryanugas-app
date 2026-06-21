// layouts/CustomerLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { Crown, LogOut, PawPrint } from 'lucide-react';

const CustomerLayout = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [membership, setMembership] = useState('standar');

  useEffect(() => {
    setUsername(sessionStorage.getItem('user') || '');
    setMembership(sessionStorage.getItem('membership') || 'standar');
  }, []);

  const isPriority = membership === 'prioritas';

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8F4EC]">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#F8F4EC]/90 backdrop-blur-sm border-b border-[#1F3A2E]/10">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 font-bold text-[#1F3A2E]">
            <PawPrint size={20} />
            Arya Pet Care
          </Link>

          <div className="flex items-center gap-3">
            <span
              className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${
                isPriority
                  ? 'bg-[#1F3A2E] text-[#EFE0BC]'
                  : 'bg-white text-[#6B6357] border border-[#1F3A2E]/10'
              }`}
            >
              {isPriority && <Crown size={12} />}
              {isPriority ? 'Prioritas' : 'Standar'}
            </span>

            <span className="text-sm font-semibold text-[#1F3A2E] hidden sm:inline">
              {username}
            </span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-bold text-[#6B6357] hover:text-[#9C3B23] px-3 py-1.5 rounded-full hover:bg-white transition-colors"
            >
              <LogOut size={14} />
              Keluar
            </button>
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default CustomerLayout;