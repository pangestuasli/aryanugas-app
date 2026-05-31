import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#f4f7fe] text-slate-700 font-sans">

      {/* SIDEBAR */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* CONTENT */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >

        {/* HEADER */}
        <Header
          onToggleSidebar={() =>
            setIsSidebarOpen(!isSidebarOpen)
          }
        />

        {/* PAGE */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;