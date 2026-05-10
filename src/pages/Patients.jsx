import React from 'react';
// 1. Import useNavigate dari react-router-dom
import { useNavigate } from 'react-router-dom';

const Patients = () => {
  // 2. Inisialisasi navigate
  const navigate = useNavigate();

  const patientsData = [
    { id: 1, name: "Mochi", type: "Kucing Persi", owner: "Bpk. Aryanugas", status: "Perawatan", icon: "🐱" },
    { id: 2, name: "Bruno", type: "Golden Retriever", owner: "Ibu Siti", status: "Selesai", icon: "🐶" },
    { id: 3, name: "Luna", type: "Kelinci", owner: "Rian", status: "Antri", icon: "🐰" },
    { id: 4, name: "Oyen", type: "Kucing Domestik", owner: "Bpk. Budi", status: "Perawatan", icon: "🐈" },
    { id: 5, name: "Bella", type: "Hamster", owner: "Putri", status: "Selesai", icon: "🐹" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Halaman */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Data Pasien Anabul</h2>
          <p className="text-emerald-600 font-medium">Manajemen informasi pasien klinik</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-100 transition-all active:scale-95 flex items-center gap-2">
          <span>+</span> Tambah Pasien
        </button>
      </div>

      {/* Tabel Data */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-emerald-50/50">
            <tr>
              <th className="p-6 text-sm font-bold text-emerald-900 uppercase tracking-wider">Anabul</th>
              <th className="p-6 text-sm font-bold text-emerald-900 uppercase tracking-wider">Jenis</th>
              <th className="p-6 text-sm font-bold text-emerald-900 uppercase tracking-wider">Pemilik</th>
              <th className="p-6 text-sm font-bold text-emerald-900 uppercase tracking-wider">Status</th>
              <th className="p-6 text-sm font-bold text-emerald-900 uppercase tracking-wider text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {patientsData.map((patient) => (
              <tr 
                key={patient.id} 
                className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                onClick={() => navigate(`/patients/${patient.id}`)}
              >
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white border border-emerald-100 rounded-xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
                      {patient.icon}
                    </div>
                    <span className="font-bold text-slate-900 text-lg">{patient.name}</span>
                  </div>
                </td>
                <td className="p-6 text-slate-600 font-medium">{patient.type}</td>
                <td className="p-6 text-slate-600">{patient.owner}</td>
                <td className="p-6">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter ${
                    patient.status === 'Selesai' ? 'bg-green-100 text-green-700' : 
                    patient.status === 'Perawatan' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {patient.status}
                  </span>
                </td>
                <td className="p-6 text-center" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={() => navigate(`/patients/${patient.id}`)}
                    className="text-emerald-600 hover:text-emerald-800 font-bold text-sm mr-4"
                  >
                    Detail
                  </button>
                  <button className="text-red-400 hover:text-red-600 font-bold text-sm">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="flex justify-between items-center px-4 text-slate-400 text-sm font-medium">
        <p>Menampilkan {patientsData.length} pasien terdaftar</p>
        <div className="flex gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-white transition-all">←</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-600 text-white font-bold">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-white transition-all">→</button>
        </div>
      </div>
    </div>
  );
};

export default Patients;