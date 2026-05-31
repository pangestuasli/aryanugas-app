import React, { useState } from 'react';
import Footer from '../components/Footer';
import BarChart from '../components/BarChart';
import DonutChart from '../components/DonutChart';
import DateRangePicker from '../components/DateRangePicker';

const Dashboard = () => {
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });

  const weeklyData = [
    { label: 'Sen', value: 60 },
    { label: 'Sel', value: 45 },
    { label: 'Rab', value: 95 },
    { label: 'Kam', value: 70 },
    { label: 'Jum', value: 85 },
    { label: 'Sab', value: 40 },
    { label: 'Min', value: 55 },
  ];

  const speciesData = [
    { label: 'Kucing', value: 75, color: '#10b981' },
    { label: 'Anjing', value: 15, color: '#f59e0b' },
    { label: 'Lainnya', value: 10, color: '#94a3b8' },
  ];

  const handleDateRangeChange = ({ startDate, endDate }) => {
    setDateRange({ startDate, endDate });
    console.log('Date range selected:', { startDate, endDate });
    // Di sini Anda bisa fetch data berdasarkan date range
  };

  return (
    <div className="p-2 md:p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Ringkasan Klinik</h1>
        <p className="text-sm text-slate-400">Pantau kesehatan Anabul hari ini secara real-time.</p>
      </div>

      {/* Date Range Picker di Header */}
      <div className="mb-6 flex justify-end">
        <div className="w-80">
          <DateRangePicker
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onChange={handleDateRangeChange}
            placeholder="Pilih tanggal laporan"
            size="md"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        <StatCard icon="🐕" title="Pasien Anjing" value="42" color="bg-emerald-500" />
        <StatCard icon="🐈" title="Pasien Kucing" value="128" color="bg-blue-500" />
        <StatCard icon="💉" title="Vaksinasi" value="15" color="bg-orange-400" />
        <StatCard icon="💊" title="Stok Obat" value="890" color="bg-indigo-500" />
        <StatCard icon="🏥" title="Rawat Inap" value="12" color="bg-red-500" />
        <StatCard icon="✨" title="Grooming" value="24" color="bg-pink-500" />
      </div>

      {/* CHART & ANALYTICS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold">Jumlah Pasien Hewan</h3>
              <p className="text-xs text-slate-400">Total Kunjungan Mingguan</p>
            </div>
            <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg">
              Mei 2026
            </span>
          </div>
          
          <BarChart 
            data={weeklyData}
            barColor="bg-emerald-500"
            showValues={false}
            showLabels={true}
            animate={true}
          />
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-50 flex flex-col items-center">
          <h3 className="text-lg font-bold w-full text-left">Jenis Hewan</h3>
          <p className="text-xs text-slate-400 w-full text-left mb-6">Persentase Pasien Aktif</p>
          
          <DonutChart 
            data={speciesData}
            size={160}
            thickness={14}
            showPercentage={true}
            centerText="75%"
            centerSubtext="Kucing"
            animate={true}
          />
          
          <div className="grid grid-cols-2 gap-4 mt-8 w-full">
            {speciesData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs font-bold text-slate-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabel Antrian */}
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
      <Footer />
    </div>
  );
};

// StatCard Component
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

// PatientRow Component
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