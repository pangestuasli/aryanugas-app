import React from 'react';
import { useNavigate } from 'react-router-dom';

const Medicines = () => {
  const navigate = useNavigate();

  const medicineData = [
    { id: 1, name: "Amoxicillin 250mg", category: "Antibiotik", stock: 120, unit: "Tablet", status: "Tersedia", expiry: "2025-12-10" },
    { id: 2, name: "Ivermectin", category: "Obat Cacing", stock: 15, unit: "Botol", status: "Stok Menipis", expiry: "2024-08-20" },
    { id: 3, name: "Vaksin Rabies", category: "Vaksin", stock: 45, unit: "Vial", status: "Tersedia", expiry: "2025-01-15" },
    { id: 4, name: "Ketoconazole", category: "Anti Jamur", stock: 0, unit: "Salep", status: "Habis", expiry: "2024-11-05" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Stok Obat & Alkes</h2>
          <p className="text-emerald-600 font-medium">Monitoring inventaris apotek klinik</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-100 transition-all active:scale-95 flex items-center gap-2">
          <span>+</span> Tambah Obat
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-emerald-50/50">
            <tr>
              <th className="p-6 text-sm font-bold text-emerald-900 uppercase tracking-wider">Nama Obat</th>
              <th className="p-6 text-sm font-bold text-emerald-900 uppercase tracking-wider">Kategori</th>
              <th className="p-6 text-sm font-bold text-emerald-900 uppercase tracking-wider">Stok</th>
              <th className="p-6 text-sm font-bold text-emerald-900 uppercase tracking-wider">Status</th>
              <th className="p-6 text-sm font-bold text-emerald-900 uppercase tracking-wider text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {medicineData.map((item) => (
              <tr 
                key={item.id} 
                className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                onClick={() => navigate(`/medicines/${item.id}`)}
              >
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-xl shadow-sm">
                      💊
                    </div>
                    <span className="font-bold text-slate-900 text-lg">{item.name}</span>
                  </div>
                </td>
                <td className="p-6 text-slate-600 font-medium">{item.category}</td>
                <td className="p-6 text-slate-600 font-bold">{item.stock} {item.unit}</td>
                <td className="p-6">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter ${
                    item.status === 'Tersedia' ? 'bg-green-100 text-green-700' : 
                    item.status === 'Stok Menipis' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-6 text-center" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={() => navigate(`/medicines/${item.id}`)}
                    className="text-emerald-600 hover:text-emerald-800 font-bold text-sm mr-4"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Medicines;