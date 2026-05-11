import React from 'react';
import { useNavigate } from 'react-router-dom';

const Medicines = () => {
  const navigate = useNavigate();

  const medicineData = [
    { id: 1, name: "Amoxicillin 250mg", category: "Antibiotik", stock: 120, unit: "Tablet", status: "Tersedia", color: "bg-emerald-500" },
    { id: 2, name: "Ivermectin", category: "Obat Cacing", stock: 15, unit: "Botol", status: "Menipis", color: "bg-orange-400" },
    { id: 3, name: "Vaksin Rabies", category: "Vaksin", stock: 45, unit: "Vial", status: "Tersedia", color: "bg-emerald-500" },
    { id: 4, name: "Ketoconazole", category: "Anti Jamur", stock: 0, unit: "Salep", status: "Habis", color: "bg-red-500" },
  ];

  return (
    <div className="p-2 md:p-4 animate-in fade-in duration-700">
      {/* 1. Header Halaman (Style Dashnext) */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Stok Obat & Alkes</h2>
          <p className="text-sm text-slate-400 mt-1">Monitoring inventaris apotek klinik Arya Pet Care</p>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-100 transition-all active:scale-95 flex items-center gap-2 text-sm">
          <span className="text-lg">+</span> Tambah Stok
        </button>
      </div>

      {/* 2. Tabel Inventaris (Meniru Employee Task Overview) */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-50 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Inventaris Apotek</h3>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Cari obat..." 
              className="bg-slate-50 border-none text-xs p-2 px-4 rounded-lg outline-none focus:ring-1 focus:ring-emerald-500 w-48"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Nama Obat</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Jumlah Stok</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {medicineData.map((item) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                  onClick={() => navigate(`/medicines/${item.id}`)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar-style Icon (Dashnext Style) */}
                      <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105`}>
                        <span className="text-lg">💊</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 leading-none">{item.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium mt-1">ID: #MED-{item.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs font-semibold text-slate-600">{item.category}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <p className="text-sm font-bold text-slate-700">{item.stock}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">{item.unit}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {/* Badge Status Kotak (Sesuai gambar referensi) */}
                    <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase text-white shadow-sm ${
                      item.status === 'Tersedia' ? 'bg-emerald-500' : 
                      item.status === 'Menipis' ? 'bg-orange-400' : 'bg-red-500'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end gap-2">
                      <button className="p-2 hover:bg-emerald-50 text-emerald-500 rounded-lg transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                      </button>
                      <button className="p-2 hover:bg-red-50 text-red-400 rounded-lg transition-colors">
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

      {/* 3. Info Ringkasan Bawah */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex items-center gap-4">
          <div className="text-2xl">✅</div>
          <div>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Obat Tersedia</p>
            <p className="text-lg font-bold text-emerald-900 leading-none">248 Item</p>
          </div>
        </div>
        <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex items-center gap-4">
          <div className="text-2xl">⚠️</div>
          <div>
            <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Perlu Restock</p>
            <p className="text-lg font-bold text-orange-900 leading-none">12 Item</p>
          </div>
        </div>
        <div className="bg-red-50 p-4 rounded-2xl border border-red-100 flex items-center gap-4">
          <div className="text-2xl">🚫</div>
          <div>
            <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">Stok Kosong</p>
            <p className="text-lg font-bold text-red-900 leading-none">3 Item</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medicines;