import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#f4f7fe] text-slate-700 font-sans">
      
      {/* SIDEBAR */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* CONTENT AREA */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        
        {/* NAVBAR / HEADER */}
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* PAGE CONTENT */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;