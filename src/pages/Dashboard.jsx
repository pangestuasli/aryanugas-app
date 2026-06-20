import React, { useState, useEffect } from 'react';
// IMPORT SUPABASE CLIENT
import { supabase } from '../lib/supabase';

import Footer from '../components/Footer';
import BarChart from '../components/BarChart';
import DonutChart from '../components/DonutChart';
import DateRangePicker from '../components/DateRangePicker';

const Dashboard = () => {
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const [isLoading, setIsLoading] = useState(true);
  
  // State untuk menyimpan hasil kalkulasi data dari Supabase
  const [stats, setStats] = useState({
    totalCats: 0,
    totalDogs: 0,
    totalAntri: 0,
    totalPerawatan: 0,
    totalSelesai: 0,
  });
  
  const [speciesData, setSpeciesData] = useState([]);
  const [recentQueue, setRecentQueue] = useState([]);

  // Data mingguan sementara tetap static atau bisa disesuaikan nanti
  const weeklyData = [
    { label: 'Sen', value: 30 },
    { label: 'Sel', value: 45 },
    { label: 'Rab', value: 75 },
    { label: 'Kam', value: 60 },
    { label: 'Jum', value: 90 },
    { label: 'Sab', value: 40 },
    { label: 'Min', value: 55 },
  ];

  // Fungsi mengamil & mengolah data dari Supabase
  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const { data: patients, error } = await supabase
        .from('patients')
        .select('*');

      if (error) throw error;

      if (patients) {
        let cats = 0;
        let dogs = 0;
        let others = 0;
        let antri = 0;
        let perawatan = 0;
        let selesai = 0;

        // Iterasi data untuk menghitung statistik mendalam
        patients.forEach((patient) => {
          const type = patient.type ? patient.type.toLowerCase() : '';
          if (type.includes('kucing')) cats++;
          else if (type.includes('anjing')) dogs++;
          else others++;

          if (patient.status === 'Antri') antri++;
          else if (patient.status === 'Perawatan') perawatan++;
          else if (patient.status === 'Selesai') selesai++;
        });

        // Hitung total untuk persentase chart
        const totalPatients = patients.length || 1; 
        const pctCats = Math.round((cats / totalPatients) * 100);
        const pctDogs = Math.round((dogs / totalPatients) * 100);
        const pctOthers = Math.round((others / totalPatients) * 100);

        setStats({
          totalCats: cats,
          totalDogs: dogs,
          totalAntri: antri,
          totalPerawatan: perawatan,
          totalSelesai: selesai,
        });

        setSpeciesData([
          { label: 'Kucing', value: pctCats, color: '#10b981' },
          { label: 'Anjing', value: pctDogs, color: '#f59e0b' },
          { label: 'Lainnya', value: pctOthers, color: '#94a3b8' },
        ]);

        // Mengambil 4 pasien terbaru yang butuh perhatian (Antri / Perawatan)
        const activeQueue = patients
          .filter(p => p.status === 'Antri' || p.status === 'Perawatan')
          .slice(0, 4);
        
        setRecentQueue(activeQueue);
      }
    } catch (err) {
      console.error('Gagal memuat data dashboard:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleDateRangeChange = ({ startDate, endDate }) => {
    setDateRange({ startDate, endDate });
    console.log('Date range selected:', { startDate, endDate });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50/50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-slate-50/50 min-h-screen animate-in fade-in duration-300">
      {/* HEADER SECTION */}
      <div className="flex flex-col mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Ringkasan Klinik</h1>
          <p className="text-sm text-slate-500 mt-1">Pantau kesehatan Anabul hari ini secara real-time.</p>
        </div>
        
        {/* Date Range Picker */}
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

      {/* STATS CARDS SECTION (Dinamis dari Supabase) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <StatCard title="Pasien Kucing" value={stats.totalCats} color="bg-emerald-500" />
        <StatCard title="Pasien Anjing" value={stats.totalDogs} color="bg-amber-500" />
        <StatCard title="Status Antri" value={stats.totalAntri} color="bg-orange-400" />
        <StatCard title="Dalam Perawatan" value={stats.totalPerawatan} color="bg-blue-500" />
        <StatCard title="Selesai Diperiksa" value={stats.totalSelesai} color="bg-indigo-500" />
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
              Juni 2026
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

        {/* Donut Chart (Persentase Jenis Terupdate) */}
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
            centerText={`${speciesData[0]?.value || 0}%`}
            centerSubtext="Kucing"
            animate={true}
          />
          
          <div className="flex flex-wrap justify-center gap-4 mt-8 w-full">
            {speciesData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs font-bold text-slate-600">{item.label} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PATIENT QUEUE TABLE SECTION (Menampilkan Antrian Sebenarnya) */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-8">
        <div className="p-6 flex justify-between items-center border-b border-slate-50">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Antrian Pasien Aktif</h3>
            <p className="text-xs text-slate-400 mt-1">Daftar pemeriksaan berjalan & menunggu</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-slate-50/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Nama Pasien (Anabul)</th>
                <th className="px-6 py-4">Pemilik</th>
                <th className="px-6 py-4">Nomor Telepon</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentQueue.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-xs text-slate-400">
                    Tidak ada antrian aktif saat ini.
                  </td>
                </tr>
              ) : (
                recentQueue.map((patient) => (
                  <PatientRow 
                    key={patient.id}
                    name={patient.name} 
                    species={patient.type} 
                    owner={patient.owner} 
                    phone={patient.phone || '-'} 
                    status={patient.status} 
                  />
                ))
              )}
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
    <div className={`absolute top-0 left-0 w-1.5 h-full ${color}`}></div>
    <div>
      <p className="text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider">{title}</p>
      <p className="text-3xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

const PatientRow = ({ name, species, owner, phone, status }) => {
  // Mendeteksi ikon emoji secara pintar dari teks tipe hewan
  const getIcon = (type) => {
    const lowerType = type ? type.toLowerCase() : '';
    if (lowerType.includes('kucing')) return '🐈';
    if (lowerType.includes('anjing')) return '🐕';
    if (lowerType.includes('kelinci')) return '🐇';
    return '🐹';
  };

  // Dinamisasi warna status menyamakan dengan Patients.jsx
  const getStatusColor = (statusName) => {
    if (statusName === 'Perawatan') return 'bg-blue-500';
    if (statusName === 'Selesai') return 'bg-emerald-500';
    return 'bg-amber-500'; // Default untuk 'Antri'
  };

  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
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
      <td className="px-6 py-4 text-xs text-slate-500">{phone}</td>
      <td className="px-6 py-4">
        <span className={`${getStatusColor(status)} text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide`}>
          {status}
        </span>
      </td>
    </tr>
  );
};

export default Dashboard;