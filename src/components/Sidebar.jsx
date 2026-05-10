import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/", icon: "🏠" },
    { name: "Jadwal Periksa", path: "/appointments", icon: "📅" },
    { name: "Pasien (Anabul)", path: "/patients", icon: "🐾" },
    { name: "Rekam Medis", path: "/medical-records", icon: "📁" },
    { name: "Stok Obat", path: "/medicines", icon: "💊" },
  ];

  return (
    <div className="w-72 bg-[#064E3B] flex flex-col text-white shadow-2xl">
      {/* Logo Section */}
      <div className="p-8 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🐾</span>
          <div>
            <h1 className="text-xl font-bold tracking-tight leading-none text-emerald-400">Arya Pet Care</h1>
            <p className="text-[9px] text-white/50 font-bold tracking-[0.2em] mt-1">ANIMAL CLINIC SYSTEM</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 ${
                isActive 
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-900/40" 
                : "hover:bg-white/5 text-emerald-100/60 hover:text-white"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-semibold text-sm">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5">
        <button className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white py-4 rounded-2xl font-bold transition-all border border-red-500/20 text-sm">
          Keluar Sistem 🚪
        </button>
      </div>
    </div>
  );
};

export default Sidebar;