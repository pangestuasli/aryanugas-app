import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MedicineDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data
  const medicine = {
    id: 1,
    name: "Amoxicillin 250mg",
    category: "Antibiotik",
    stock: 120,
    unit: "Tablet",
    supplier: "PT. Medika Satwa",
    expiry: "10 Dec 2025",
    description: "Antibiotik spektrum luas untuk infeksi bakteri pada kucing dan anjing.",
    logs: [
      { date: "15 May 2024", activity: "Stok Keluar (Pasien Mochi)", qty: "-2", user: "Admin" },
      { date: "10 May 2024", activity: "Stok Masuk (Restock)", qty: "+100", user: "Budi" },
    ]
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/medicines')}
          className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
        >
          ←
        </button>
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Detail Obat</h2>
          <p className="text-emerald-600 font-medium">Kelola informasi inventaris</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="w-20 h-20 bg-emerald-50 rounded-[1.5rem] flex items-center justify-center text-4xl mb-6">
              💊
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">{medicine.name}</h3>
            <p className="text-emerald-600 font-bold uppercase text-xs tracking-widest mb-6">{medicine.category}</p>
            
            <div className="space-y-4 pt-4 border-t border-slate-50">
              <div>
                <p className="text-slate-400 text-[10px] font-black uppercase">Supplier</p>
                <p className="text-slate-900 font-bold">{medicine.supplier}</p>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-black uppercase">Kadaluwarsa</p>
                <p className="text-red-500 font-bold">{medicine.expiry}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
            <p className="text-slate-400 text-[10px] font-black uppercase mb-2">Total Stok Saat Ini</p>
            <h4 className="text-5xl font-black">{medicine.stock} <span className="text-xl text-slate-400">{medicine.unit}</span></h4>
            <button className="w-full bg-emerald-600 mt-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all">
              Update Stok
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50">
            <h3 className="font-black text-slate-900 text-xl">Riwayat Inventaris</h3>
          </div>
          <div className="p-0">
            {medicine.logs.map((log, index) => (
              <div key={index} className="p-8 border-b border-slate-50 last:border-0 flex justify-between items-center">
                <div>
                  <p className="text-xs font-black text-emerald-600 uppercase mb-1">{log.date}</p>
                  <h4 className="font-bold text-slate-900">{log.activity}</h4>
                  <p className="text-slate-400 text-sm">Oleh: {log.user}</p>
                </div>
                <div className={`text-xl font-black ${log.qty.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {log.qty}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetail;