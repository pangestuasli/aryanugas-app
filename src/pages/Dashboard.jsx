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
    // TODO: Fetch data berdasarkan date range di sini
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-slate-50/50 min-h-screen">
      {/* HEADER SECTION */}
      <div className="flex flex-col mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Ringkasan Klinik</h1>
          <p className="text-sm text-slate-500 mt-1">Pantau kesehatan Anabul hari ini secara real-time.</p>
        </div>
        
        {/* Date Range Picker - Sekarang ada di bawah teks */}
        <div className="w-full sm:w-80 mt-2">
          <DateRangePicker
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onChange={handleDateRangeChange}
            placeholder="Pilih tanggal laporan"
            size="md"
          />
        </div>
      </div>

      {/* STATS CARDS SECTION */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <StatCard title="Pasien Anjing" value="42" color="bg-emerald-500" />
        <StatCard title="Pasien Kucing" value="128" color="bg-blue-500" />
        <StatCard title="Vaksinasi" value="15" color="bg-orange-400" />
        <StatCard title="Stok Obat" value="890" color="bg-indigo-500" />
        <StatCard title="Rawat Inap" value="12" color="bg-red-500" />
      </div>

      {/* CHART & ANALYTICS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Jumlah Pasien Hewan</h3>
              <p className="text-xs text-slate-400 mt-1">Total Kunjungan Mingguan</p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
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

        {/* Donut Chart */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
          <div className="w-full text-left mb-6">
            <h3 className="text-lg font-bold text-slate-800">Jenis Hewan</h3>
            <p className="text-xs text-slate-400 mt-1">Persentase Pasien Aktif</p>
          </div>
          
          <DonutChart 
            data={speciesData}
            size={160}
            thickness={14}
            showPercentage={true}
            centerText="75%"
            centerSubtext="Kucing"
            animate={true}
          />
          
          <div className="flex flex-wrap justify-center gap-4 mt-8 w-full">
            {speciesData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs font-bold text-slate-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PATIENT QUEUE TABLE SECTION */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-8">
        <div className="p-6 flex justify-between items-center border-b border-slate-50">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Antrian Pasien Hari Ini</h3>
            <p className="text-xs text-slate-400 mt-1">Daftar pemeriksaan yang sedang berjalan</p>
          </div>
          <button className="text-emerald-500 text-sm font-bold hover:text-emerald-600 transition-colors">
            Lihat Semua
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
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

// --- SUB-COMPONENTS ---

const StatCard = ({ title, value, color }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow cursor-default">
    {/* Garis aksen tipis di sebelah kiri sebagai penanda warna elegan */}
    <div className={`absolute top-0 left-0 w-1.5 h-full ${color}`}></div>
    
    <div>
      <p className="text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider">{title}</p>
      <p className="text-3xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

const PatientRow = ({ name, species, owner, issue, status, sColor, doctor }) => {
  // Menentukan icon secara otomatis berdasarkan jenis hewan
  const getIcon = (type) => {
    if (type === 'Kucing') return '🐈';
    if (type === 'Anjing') return '🐕';
    return '🐹';
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg shadow-sm">
            {getIcon(species)}
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
        <span className={`${sColor} text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4">
        <p className="text-xs font-bold text-slate-700">{doctor}</p>
      </td>
    </tr>
  );
};

export default Dashboard;