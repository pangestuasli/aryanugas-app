import React, { useState } from 'react';
import MedicineTable from '../components/Table';
import { Input } from '../components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

const Medicines = () => {
  const medicineData = [
    { id: 1, name: "Amoxicillin 250mg", category: "Antibiotik", stock: 120, unit: "Tablet", status: "Tersedia", color: "bg-emerald-500" },
    { id: 2, name: "Ivermectin", category: "Obat Cacing", stock: 15, unit: "Botol", status: "Menipis", color: "bg-orange-400" },
    { id: 3, name: "Vaksin Rabies", category: "Vaksin", stock: 45, unit: "Vial", status: "Tersedia", color: "bg-emerald-500" },
    { id: 4, name: "Ketoconazole", category: "Anti Jamur", stock: 0, unit: "Salep", status: "Habis", color: "bg-red-500" },
  ];

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  // State untuk DropdownMenuCheckboxItem
  const [showStock, setShowStock] = useState(true);
  const [showStatus, setShowStatus] = useState(true);

  // State untuk DropdownMenuRadioGroup (Filter Tampilan)
  const [filterView, setFilterView] = useState("semua");

  const handleEdit = (item) => {
    console.log("Edit item:", item);
    setSelectedMedicine(item);
    setIsEditOpen(true);
  };

  const handleDelete = (item) => {
    console.log("Delete item:", item);
  };

  return (
    <div className="p-2 md:p-4 animate-in fade-in duration-700">
      
      {/* 1. Header Halaman */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Stok Obat & Alkes</h2>
          <p className="text-sm text-slate-400 mt-1">Monitoring inventaris apotek klinik Arya Pet Care</p>
        </div>

        <div className="flex gap-2">
          
          {/* ====================================================================
              PENGGUNAAN SELURUH SUB-KOMPONEN DROPDOWN MENU SHADCN UI 
             ==================================================================== */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-medium transition-all active:scale-95 text-sm flex items-center gap-1">
                ⚙️ Menu Panel Apotek <span className="text-xs">▼</span>
              </button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent className="w-64 bg-white border border-slate-100 shadow-xl rounded-xl p-1">
              
              {/* 1. DropdownMenuLabel */}
              <DropdownMenuLabel>Manajemen Data</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {/* 2. DropdownMenuGroup & DropdownMenuItem & DropdownMenuShortcut */}
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer" onClick={() => alert("Membuka Log Logistik")}>
                  📋 Log Riwayat Masuk
                  <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
                </DropdownMenuItem>
                
                {/* 3. DropdownMenuSub (Menu Bersarang / Sub-Menu) */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="cursor-pointer">
                    📥 Ekspor / Unduh Data
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-white border shadow-lg rounded-lg p-1 min-w-[150px]">
                    <DropdownMenuItem className="cursor-pointer" onClick={() => console.log("PDF")}>
                      Dokumen PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => console.log("Excel")}>
                      Spreadsheet Excel
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              {/* 4. DropdownMenuCheckboxItem */}
              <DropdownMenuLabel>Pengaturan Kolom Tabel</DropdownMenuLabel>
              <DropdownMenuCheckboxItem 
                checked={showStock} 
                onCheckedChange={setShowStock}
                className="cursor-pointer"
              >
                Tampilkan Jumlah Stok
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={showStatus} 
                onCheckedChange={setShowStatus}
                className="cursor-pointer"
              >
                Tampilkan Status Indikator
              </DropdownMenuCheckboxItem>

              <DropdownMenuSeparator />

              {/* 5. DropdownMenuRadioGroup & DropdownMenuRadioItem */}
              <DropdownMenuLabel>Filter Cepat Kategori</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={filterView} onValueChange={setFilterView}>
                <DropdownMenuRadioItem value="semua" className="cursor-pointer">
                  Semua Item
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="terbatas" className="cursor-pointer">
                  Stok Menipis / Habis
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="vaksin" className="cursor-pointer">
                  Khusus Vaksin
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>

              <DropdownMenuSeparator />
              
              {/* Item dengan Variasi Destructive untuk Aksi Berbahaya */}
              <DropdownMenuItem variant="destructive" className="cursor-pointer" onClick={() => alert("Gudang dikunci")}>
                🔒 Kunci Akses Gudang
                <DropdownMenuShortcut>⇧⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
          {/* ==================================================================== */}

          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-100 transition-all active:scale-95 flex items-center gap-2 text-sm">
            <span className="text-lg">+</span> Tambah Stok
          </button>
        </div>
      </div>

      {/* 2. Tabel Inventaris */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-50 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Inventaris Apotek</h3>
          <div className="flex gap-2">
            <Input 
              type="text" 
              placeholder="Cari obat..." 
              className="w-48 bg-slate-50 border-none text-xs p-2 px-4 rounded-lg outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
            />
          </div>
        </div>

        {/* Kirim status kolom checkbox ke table jika dibutuhkan, atau biarkan default */}
        <MedicineTable
          data={medicineData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* 3. Shadcn Sheet (Slide-over untuk form edit data) */}
      <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
        <SheetContent side="right" className="w-[400px] sm:w-[540px] bg-white p-6 shadow-xl">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold text-slate-800">Edit Stok Obat</SheetTitle>
            <SheetDescription className="text-sm text-slate-400">
              Ubah rincian informasi obat yang terpilih di bawah ini.
            </SheetDescription>
          </SheetHeader>
          
          {selectedMedicine && (
            <div className="grid gap-5 py-6 mt-6 border-t border-slate-100">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nama Obat</label>
                <Input defaultValue={selectedMedicine.name} className="bg-slate-50 border-slate-200" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kategori</label>
                <Input defaultValue={selectedMedicine.category} className="bg-slate-50 border-slate-200" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Jumlah Stok ({selectedMedicine.unit})</label>
                <Input type="number" defaultValue={selectedMedicine.stock} className="bg-slate-50 border-slate-200" />
              </div>
              <div className="pt-4 flex gap-2">
                <button 
                  onClick={() => setIsEditOpen(false)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white p-2.5 rounded-xl text-sm font-semibold transition-all"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* 4. Info Ringkasan Bawah */}
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