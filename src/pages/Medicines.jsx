import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; // Pastikan path ini sudah benar

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
  const [medicinesData, setMedicinesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Sheet States (Digunakan untuk Tambah & Edit)
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetMode, setSheetMode] = useState('add'); // 'add' atau 'edit'
  const [selectedId, setSelectedId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    stock: '',
    unit: '',
  });

  // State DropdownMenu
  const [showStock, setShowStock] = useState(true);
  const [showStatus, setShowStatus] = useState(true);
  const [filterView, setFilterView] = useState("semua");

  // Fungsi Cerdas: Menentukan Status & Warna otomatis dari jumlah stok
  const formatMedicineData = (item) => {
    let status = "Tersedia";
    let color = "text-emerald-700 bg-emerald-50 border-emerald-200/60";

    if (item.stock === 0) {
      status = "Habis";
      color = "text-red-700 bg-red-50 border-red-200/60";
    } else if (item.stock <= 20) {
      status = "Menipis";
      color = "text-amber-700 bg-amber-50 border-amber-200/60";
    }

    return { ...item, status, color };
  };

  // READ: Ambil data dari Supabase
  const fetchMedicines = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('medicines')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      
      const formattedData = data.map(formatMedicineData);
      setMedicinesData(formattedData);
    } catch (error) {
      console.error("Error fetching medicines:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  // Handler Form Changes
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Buka Sheet untuk Tambah Baru
  const handleOpenAdd = () => {
    setSheetMode('add');
    setFormData({ name: '', category: '', stock: '', unit: '' });
    setIsSheetOpen(true);
  };

  // Buka Sheet untuk Edit
  const handleEdit = (item) => {
    setSheetMode('edit');
    setSelectedId(item.id);
    setFormData({
      name: item.name,
      category: item.category,
      stock: item.stock,
      unit: item.unit,
    });
    setIsSheetOpen(true);
  };

  // CREATE & UPDATE: Simpan data ke Supabase
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      name: formData.name,
      category: formData.category,
      stock: parseInt(formData.stock) || 0,
      unit: formData.unit,
    };

    try {
      if (sheetMode === 'add') {
        const { error } = await supabase.from('medicines').insert([payload]);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('medicines').update(payload).eq('id', selectedId);
        if (error) throw error;
      }
      
      await fetchMedicines(); // Refresh data
      setIsSheetOpen(false);
    } catch (error) {
      console.error("Error saving medicine:", error.message);
      alert("Gagal menyimpan data: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  // DELETE: Hapus data dari Supabase
  const handleDelete = async (item) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus ${item.name}?`)) return;

    try {
      const { error } = await supabase.from('medicines').delete().eq('id', item.id);
      if (error) throw error;
      
      // Update state lokal agar cepat tanpa perlu fetch ulang
      setMedicinesData(medicinesData.filter(m => m.id !== item.id));
    } catch (error) {
      console.error("Error deleting medicine:", error.message);
      alert("Gagal menghapus data: " + error.message);
    }
  };

  // Statistik Dinamis untuk Ringkasan Card
  const totalTersedia = medicinesData.filter(m => m.stock > 20).length;
  const totalMenipis = medicinesData.filter(m => m.stock > 0 && m.stock <= 20).length;
  const totalHabis = medicinesData.filter(m => m.stock === 0).length;

  // Fitur Pencarian & Filter
  const filteredData = medicinesData.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterView === "terbatas") return matchSearch && item.stock <= 20;
    if (filterView === "vaksin") return matchSearch && item.category.toLowerCase().includes("vaksin");
    return matchSearch;
  });

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-slate-50/50 min-h-screen animate-in fade-in duration-500">
      
      {/* 1. Header Halaman */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Stok Obat & Alkes</h2>
          <p className="text-sm text-slate-500 mt-0.5">Monitoring inventaris apotek klinik Arya Pet Care</p>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex-1 sm:flex-none border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 px-4 py-2.5 rounded-xl font-semibold transition-all active:scale-98 flex items-center justify-center gap-2 text-sm shadow-sm">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Menu Panel
                <svg className="w-3 h-3 text-slate-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
              </button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent className="w-64 bg-white border border-slate-100 shadow-xl rounded-xl p-1">
              <DropdownMenuLabel className="text-xs text-slate-500 font-bold uppercase tracking-wider">Pengaturan Kolom</DropdownMenuLabel>
              <DropdownMenuCheckboxItem checked={showStock} onCheckedChange={setShowStock} className="cursor-pointer text-sm font-medium text-slate-700">Tampilkan Jumlah Stok</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={showStatus} onCheckedChange={setShowStatus} className="cursor-pointer text-sm font-medium text-slate-700">Tampilkan Status Indikator</DropdownMenuCheckboxItem>
              <DropdownMenuSeparator className="bg-slate-100" />
              <DropdownMenuLabel className="text-xs text-slate-500 font-bold uppercase tracking-wider">Filter Cepat</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={filterView} onValueChange={setFilterView}>
                <DropdownMenuRadioItem value="semua" className="cursor-pointer text-sm font-medium text-slate-700">Semua Item</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="terbatas" className="cursor-pointer text-sm font-medium text-slate-700">Stok Menipis / Habis</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="vaksin" className="cursor-pointer text-sm font-medium text-slate-700">Khusus Vaksin</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <button 
            onClick={handleOpenAdd}
            className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-all active:scale-98 flex items-center justify-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
            Tambah Stok
          </button>
        </div>
      </div>

      {/* 2. Tabel Inventaris */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50/50 gap-4">
          <h3 className="text-sm font-bold text-slate-800">Daftar Inventaris Apotek</h3>
          <div className="w-full sm:w-auto flex items-center bg-white border border-slate-200 rounded-xl px-3 shadow-sm focus-within:ring-1 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <Input 
              type="text" 
              placeholder="Cari obat atau kategori..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-56 bg-transparent border-none text-xs p-2.5 outline-none focus-visible:ring-0 shadow-none"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-slate-500 text-sm font-medium">Memuat data...</div>
        ) : filteredData.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm font-medium">Tidak ada data ditemukan.</div>
        ) : (
          <MedicineTable
            data={filteredData}
            onEdit={handleEdit}
            onDelete={handleDelete}
            // Kirim state hide/show ke table jika komponen MedicineTable Anda mendukungnya
            // showStock={showStock} 
            // showStatus={showStatus}
          />
        )}
      </div>

      {/* 3. Ringkasan Status Inventaris Dinamis */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
          <p className="text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Obat Tersedia</p>
          <div className="flex items-end gap-1">
            <p className="text-2xl font-bold text-slate-800">{totalTersedia}</p>
            <p className="text-sm font-medium text-slate-500 mb-0.5">Item</p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400"></div>
          <p className="text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Perlu Restock</p>
          <div className="flex items-end gap-1">
            <p className="text-2xl font-bold text-slate-800">{totalMenipis}</p>
            <p className="text-sm font-medium text-slate-500 mb-0.5">Item</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col relative overflow-hidden group col-span-2 md:col-span-1">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500"></div>
          <p className="text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Stok Kosong</p>
          <div className="flex items-end gap-1">
            <p className="text-2xl font-bold text-slate-800">{totalHabis}</p>
            <p className="text-sm font-medium text-slate-500 mb-0.5">Item</p>
          </div>
        </div>
      </div>

      {/* 4. Shadcn Sheet (Slide-over untuk form Tambah/Edit data) */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-[400px] sm:w-[480px] bg-white p-6 shadow-2xl border-l-slate-100">
          <SheetHeader>
            <SheetTitle className="text-lg font-bold text-slate-900">
              {sheetMode === 'add' ? 'Tambah Stok Baru' : 'Edit Stok Obat'}
            </SheetTitle>
            <SheetDescription className="text-sm text-slate-500">
              Silakan isi formulir di bawah ini dengan rincian yang valid.
            </SheetDescription>
          </SheetHeader>
          
          <form onSubmit={handleSave} className="grid gap-5 py-6 mt-6 border-t border-slate-100">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nama Obat / Alkes</label>
              <Input 
                name="name" 
                value={formData.name} 
                onChange={handleFormChange} 
                placeholder="Misal: Amoxicillin" 
                required 
                className="bg-white border-slate-200 focus-visible:ring-emerald-500" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Kategori</label>
              <Input 
                name="category" 
                value={formData.category} 
                onChange={handleFormChange} 
                placeholder="Misal: Antibiotik" 
                required 
                className="bg-white border-slate-200 focus-visible:ring-emerald-500" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Jumlah Stok</label>
                <Input 
                  name="stock" 
                  type="number" 
                  min="0"
                  value={formData.stock} 
                  onChange={handleFormChange} 
                  required 
                  className="bg-white border-slate-200 focus-visible:ring-emerald-500" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Satuan</label>
                <Input 
                  name="unit" 
                  value={formData.unit} 
                  onChange={handleFormChange} 
                  placeholder="Tablet / Botol" 
                  required 
                  className="bg-white border-slate-200 focus-visible:ring-emerald-500" 
                />
              </div>
            </div>
            <div className="pt-6 flex gap-3">
              <button 
                type="button"
                onClick={() => setIsSheetOpen(false)}
                className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
              >
                Batal
              </button>
              <button 
                type="submit"
                disabled={isSaving}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm disabled:opacity-50"
              >
                {isSaving ? 'Menyimpan...' : 'Simpan Data'}
              </button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

    </div>
  );
};

export default Medicines;