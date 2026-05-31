import React from 'react';
import MedicineTable from '../components/Table';

const Medicines = () => {
  const medicineData = [
    { id: 1, name: "Amoxicillin 250mg", category: "Antibiotik", stock: 120, unit: "Tablet", status: "Tersedia", color: "bg-emerald-500" },
    { id: 2, name: "Ivermectin", category: "Obat Cacing", stock: 15, unit: "Botol", status: "Menipis", color: "bg-orange-400" },
    { id: 3, name: "Vaksin Rabies", category: "Vaksin", stock: 45, unit: "Vial", status: "Tersedia", color: "bg-emerald-500" },
    { id: 4, name: "Ketoconazole", category: "Anti Jamur", stock: 0, unit: "Salep", status: "Habis", color: "bg-red-500" },
  ];

  const handleEdit = (item) => {
    console.log("Edit item:", item);
    // Aksi edit
  };

  const handleDelete = (item) => {
    console.log("Delete item:", item);
    // Aksi hapus
  };

  return (
    <div className="p-2 md:p-4 animate-in fade-in duration-700">
      {/* 1. Header Halaman */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Stok Obat & Alkes</h2>
          <p className="text-sm text-slate-400 mt-1">Monitoring inventaris apotek klinik Arya Pet Care</p>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-100 transition-all active:scale-95 flex items-center gap-2 text-sm">
          <span className="text-lg">+</span> Tambah Stok
        </button>
      </div>

      {/* 2. Tabel Inventaris */}
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

        <MedicineTable
          data={medicineData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
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