import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; // Pastikan path ini sesuai

const PatientDetail = ({ patientId, onBack }) => {
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data untuk riwayat medis (karena idealnya ini dibuat di tabel terpisah)
  const mockMedicalHistory = [
    { date: "10 Mei 2024", diagnostic: "Vaksin Tahunan", vet: "drh. Sarah", notes: "Kondisi sehat, suhu normal." },
    { date: "22 April 2024", diagnostic: "Flu Ringan", vet: "drh. Rian", notes: "Diberikan antibiotik dan vitamin." },
    { date: "05 Jan 2024", diagnostic: "Check-up Rutin", vet: "drh. Sarah", notes: "Berat badan naik 0.5kg." },
  ];

  useEffect(() => {
    const fetchPatientDetail = async () => {
      if (!patientId) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('patients')
          .select('*')
          .eq('id', patientId)
          .single();

        if (error) throw error;
        setPatient(data);
      } catch (error) {
        console.error("Error fetching patient detail:", error.message);
        alert("Gagal memuat profil pasien.");
        onBack(); // Kembalikan ke list jika error
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatientDetail();
  }, [patientId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] animate-in fade-in">
        <p className="text-slate-500 font-medium">Memuat profil pasien...</p>
      </div>
    );
  }

  if (!patient) return null;

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700">
      
      {/* Header & Navigasi */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
        >
          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <div>
          <h2 className="text-2xl font-black text-slate-900">Profil Pasien</h2>
          <p className="text-emerald-600 font-medium">ID Pasien: #ANB-00{patient.id}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Info Hewan & Pemilik */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 text-center">
            <div className="w-24 h-24 bg-emerald-50 rounded-3xl flex items-center justify-center text-5xl mx-auto mb-4 border-2 border-emerald-100">
              {patient.icon || '🐾'}
            </div>
            <h3 className="text-2xl font-black text-slate-900">{patient.name}</h3>
            <span className="inline-block px-4 py-1 mt-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
              {patient.type}
            </span>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-slate-400 text-xs font-bold uppercase">Berat</p>
                <p className="text-slate-900 font-black">{patient.weight || '-'}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-slate-400 text-xs font-bold uppercase">Umur</p>
                <p className="text-slate-900 font-black">{patient.age || '-'}</p>
              </div>
            </div>
          </div>

          {/* Info Pemilik */}
          <div className="bg-emerald-900 p-8 rounded-[2.5rem] text-white shadow-md">
            <h4 className="font-bold text-emerald-400 mb-4 uppercase text-xs tracking-widest">Informasi Pemilik</h4>
            <div className="space-y-4">
              <div>
                <p className="text-emerald-200/50 text-sm">Nama Pemilik</p>
                <p className="font-bold text-lg">{patient.owner}</p>
              </div>
              <div>
                <p className="text-emerald-200/50 text-sm">Nomor Telepon</p>
                <p className="font-medium">{patient.phone || '-'}</p>
              </div>
              <div>
                <p className="text-emerald-200/50 text-sm">Alamat</p>
                <p className="text-sm leading-relaxed text-emerald-100/90">{patient.address || '-'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Riwayat Medis */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h3 className="font-black text-slate-900 text-xl">Riwayat Medis</h3>
              <button 
                onClick={() => alert("Fitur tambah catatan medis akan tersambung ke tabel riwayat medis.")}
                className="text-sm font-bold text-emerald-600 hover:underline"
              >
                + Tambah Catatan
              </button>
            </div>
            
            <div className="p-0">
              {mockMedicalHistory.map((log, index) => (
                <div key={index} className="p-8 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-bold text-emerald-600 mb-1">{log.date}</p>
                      <h4 className="font-black text-slate-900 text-lg">{log.diagnostic}</h4>
                    </div>
                    <span className="text-xs font-bold bg-slate-100 px-3 py-1 rounded-lg text-slate-500">
                      {log.vet}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed bg-white border border-slate-100 p-4 rounded-2xl mt-4">
                    "{log.notes}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tombol Aksi Bawah */}
          <div className="flex gap-4">
            <button 
              onClick={() => window.print()} 
              className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-sm active:scale-98"
            >
              Cetak Rekam Medis
            </button>
            <button 
              onClick={() => alert("Fitur arsip pasien.")} 
              className="flex-1 border-2 border-red-100 text-red-500 py-4 rounded-2xl font-bold hover:bg-red-50 transition-all active:scale-98"
            >
              Arsip Pasien
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PatientDetail;