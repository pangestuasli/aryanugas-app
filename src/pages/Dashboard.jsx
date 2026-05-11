import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-2 md:p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Ringkasan Klinik</h1>
        <p className="text-sm text-slate-400">Pantau kesehatan Anabul hari ini secara real-time.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        <StatCard icon="🐕" title="Pasien Anjing" value="42" color="bg-emerald-500" />
        <StatCard icon="🐈" title="Pasien Kucing" value="128" color="bg-blue-500" />
        <StatCard icon="💉" title="Vaksinasi" value="15" color="bg-orange-400" />
        <StatCard icon="💊" title="Stok Obat" value="890" color="bg-indigo-500" />
        <StatCard icon="🏥" title="Rawat Inap" value="12" color="bg-red-500" />
        <StatCard icon="✨" title="Grooming" value="24" color="bg-pink-500" />
      </div>

      {/* 3. CHART & ANALYTICS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Grafik Kunjungan (Gaya Bar Chart) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold">Jumlah Pasien Hewan</h3>
              <p className="text-xs text-slate-400">Total Kunjungan Mingguan</p>
            </div>
            <select className="bg-slate-50 border-none text-xs font-bold p-2 rounded-lg outline-none cursor-pointer hover:bg-slate-100 transition-colors">
              <option>Mei 2026</option>
            </select>
          </div>
          
          <div className="h-64 flex items-end justify-around p-4 gap-3 bg-slate-50/50 rounded-2xl">
            {[60, 45, 95, 70, 85, 40, 55].map((h, i) => (
              <div key={i} className="group relative w-full flex flex-col items-center">
                <div 
                  className="w-full bg-emerald-500 rounded-t-lg transition-all duration-500 hover:bg-emerald-600 cursor-pointer shadow-lg shadow-emerald-100" 
                  style={{ height: `${h}%` }}
                ></div>
                <span className="text-[10px] font-bold text-slate-400 mt-2">
                  {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-50 flex flex-col items-center">
          <h3 className="text-lg font-bold w-full text-left">Jenis Hewan</h3>
          <p className="text-xs text-slate-400 w-full text-left mb-10">Persentase Pasien Aktif</p>
          
          <div className="relative flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border-[14px] border-slate-100 flex items-center justify-center">
              <div className="absolute inset-0 border-[14px] border-emerald-500 rounded-full border-t-transparent border-l-transparent -rotate-45"></div>
              <div className="text-center">
                <p className="text-3xl font-bold">75%</p>
                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Kucing</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-8 w-full">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-xs font-bold text-slate-600">Kucing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
              <span className="text-xs font-bold text-slate-400">Lainnya</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-50 overflow-hidden">
        <div className="p-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">Antrian Pasien Hari Ini</h3>
            <p className="text-xs text-slate-400">Daftar pemeriksaan yang sedang berjalan</p>
          </div>
          <button className="text-emerald-500 text-xs font-bold hover:underline">Lihat Semua</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Nama Pasien (Anabul)</th>
                <th className="px-6 py-4">Pemilik</th>
                <th className="px-6 py-4">Keluhan</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Dokter</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <PatientRow name="Miko" species="Kucing" owner="Andi" issue="Vaksin F3" status="Menunggu" sColor="bg-orange-400" doctor="drh. Siti" />
              <PatientRow name="Bruno" species="Anjing" owner="Rina" issue="Patah Tulang" status="Tindakan" sColor="bg-red-500" doctor="drh. Arya" />
              <PatientRow name="Luna" species="Kucing" owner="Budi" issue="Grooming" status="Selesai" sColor="bg-emerald-500" doctor="Staff Rian" />
              <PatientRow name="Ciko" species="Hamster" owner="Dewi" issue="Check Up" status="Menunggu" sColor="bg-orange-400" doctor="drh. Siti" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- SUB-KOMPONEN INTERNAL ---

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-50 flex flex-col gap-3 hover:translate-y-[-4px] transition-all cursor-default group">
    <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-opacity-20`}>
      {icon}
    </div>
    <div>
      <p className="text-2xl font-black text-slate-800 leading-none">{value}</p>
      <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{title}</p>
    </div>
  </div>
);

const PatientRow = ({ name, species, owner, issue, status, sColor, doctor }) => (
  <tr className="hover:bg-slate-50/50 transition-colors group">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-lg">
          {species === 'Kucing' ? '🐈' : species === 'Anjing' ? '🐕' : '🐹'}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800">{name}</p>
          <p className="text-[10px] text-slate-400 font-medium">{species}</p>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 text-xs font-semibold text-slate-600">{owner}</td>
    <td className="px-6 py-4 text-xs text-slate-500">{issue}</td>
    <td className="px-6 py-4">
      <span className={`${sColor} text-white text-[10px] font-black px-3 py-1 rounded-full uppercase`}>{status}</span>
    </td>
    <td className="px-6 py-4">
      <p className="text-xs font-bold text-slate-700">{doctor}</p>
    </td>
  </tr>
);

export default Dashboard;