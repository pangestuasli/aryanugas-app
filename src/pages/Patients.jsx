import React from 'react';
import { useNavigate } from 'react-router-dom';

const Patients = () => {
  const navigate = useNavigate();

  const patientsData = [
    { id: 1, name: "Mochi", type: "Kucing Persia", owner: "Bpk. Aryanugas", status: "Perawatan", icon: "🐱", color: "bg-blue-500" },
    { id: 2, name: "Bruno", type: "Golden Retriever", owner: "Ibu Siti", status: "Selesai", icon: "🐶", color: "bg-emerald-500" },
    { id: 3, name: "Luna", type: "Kelinci", owner: "Rian", status: "Antri", icon: "🐰", color: "bg-orange-400" },
    { id: 4, name: "Oyen", type: "Kucing Domestik", owner: "Bpk. Budi", status: "Perawatan", icon: "🐈", color: "bg-blue-500" },
    { id: 5, name: "Bella", type: "Hamster", owner: "Putri", status: "Selesai", icon: "🐹", color: "bg-emerald-500" },
  ];

  return (
    <div className="p-2 md:p-4 animate-in fade-in duration-700">
      {/* 1. Header Halaman (Meniru gaya Dashnext) */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Data Pasien Anabul</h2>
          <p className="text-sm text-slate-400 mt-1">Manajemen informasi pasien klinik Arya Pet Care</p>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-100 transition-all active:scale-95 flex items-center gap-2 text-sm">
          <span className="text-lg">+</span> Tambah Pasien
        </button>
      </div>

      {/* 2. Tabel Data (Sesuai gaya Employee Task Overview di Dashnext) */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-50 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Daftar Pasien Aktif</h3>
          <select className="bg-slate-50 border-none text-[11px] font-bold p-2 rounded-lg outline-none cursor-pointer uppercase tracking-wider text-slate-400">
            <option>Terbaru</option>
            <option>Nama A-Z</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Anabul</th>
                <th className="px-6 py-4">Jenis</th>
                <th className="px-6 py-4">Pemilik</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {patientsData.map((patient) => (
                <tr 
                  key={patient.id} 
                  className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                  onClick={() => navigate(`/patients/${patient.id}`)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${patient.color} rounded-full flex items-center justify-center text-lg shadow-sm text-white transition-transform group-hover:scale-105`}>
                        {patient.icon}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 leading-none">{patient.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium mt-1">ID: #00{patient.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs font-semibold text-slate-600">{patient.type}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs font-medium text-slate-500">{patient.owner}</p>
                  </td>
                  <td className="px-6 py-4">
                    {/* Badge Status (Gaya Dashnext: High/Low/Medium) */}
                    <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase text-white shadow-sm ${
                      patient.status === 'Selesai' ? 'bg-emerald-500' : 
                      patient.status === 'Perawatan' ? 'bg-blue-500' : 'bg-orange-400'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => navigate(`/patients/${patient.id}`)}
                        className="p-2 hover:bg-emerald-50 text-emerald-500 rounded-lg transition-colors"
                        title="Detail"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                      </button>
                      <button className="p-2 hover:bg-red-50 text-red-400 rounded-lg transition-colors" title="Hapus">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Footer Info (Pagination bergaya minimalis) */}
      <div className="flex justify-between items-center mt-6 px-2 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
        <p>Menampilkan {patientsData.length} data pasien</p>
        <div className="flex gap-1">
          <button className="px-3 py-1.5 rounded-lg border border-slate-100 hover:bg-white transition-all">Prev</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-500 text-white shadow-md shadow-emerald-100">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-all">2</button>
          <button className="px-3 py-1.5 rounded-lg border border-slate-100 hover:bg-white transition-all">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Patients;