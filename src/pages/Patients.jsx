import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// IMPORT SUPABASE CLIENT
import { supabase } from '../lib/supabase';
import PatientDetail from './PatientDetail';

import Select from '../components/Select';
import Alert, { AlertContainer, useAlert } from '../components/Alert';
import Modal, { ConfirmDeleteModal, FormModal, DetailModal } from '../components/Modal';
import Input, { Textarea } from '../components/Input';
import Loading, { 
  TableSkeleton, 
  CardSkeleton, 
  FilterSkeleton,
  ButtonLoading,
  PageLoading 
} from '../components/Loading';

const Patients = () => {
  const navigate = useNavigate();
  const { alerts, removeAlert, success, error, warning, info } = useAlert();
  
  // Loading states
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  
  // Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // 1. STATE BARU: Untuk mengontrol pemindahan ke halaman detail pasien
  const [viewingPatientId, setViewingPatientId] = useState(null);
  
  // Data states
  const [patientsData, setPatientsData] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [itemsPerPage, setItemsPerPage] = useState("10");

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    owner: '',
    status: '',
    phone: '',
    address: '',
  });

  // Fungsi untuk memformat data (menambahkan inisial dan warna badge)
  const formatPatientData = (patient) => ({
    ...patient,
    textInitials: patient.name.substring(0, 2).toUpperCase(),
    color: patient.status === 'Selesai' 
      ? 'text-emerald-600 bg-emerald-50 border-emerald-100' 
      : patient.status === 'Perawatan' 
      ? 'text-blue-600 bg-blue-50 border-blue-100' 
      : 'text-amber-600 bg-amber-50 border-amber-100'
  });

  // READ: Mengambil data dari Supabase
  const fetchPatients = async () => {
    setIsTableLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('patients')
        .select('*')
        .order('id', { ascending: false });

      if (fetchError) throw fetchError;

      const formattedData = data.map(formatPatientData);
      setPatientsData(formattedData);
    } catch (err) {
      console.error(err);
      error('Gagal memuat data', err.message);
    } finally {
      setIsTableLoading(false);
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleAddPatient = () => {
    setFormData({ name: '', type: '', owner: '', status: '', phone: '', address: '' });
    setIsAddModalOpen(true);
  };

  // CREATE: Menambah data ke Supabase
  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error: insertError } = await supabase
        .from('patients')
        .insert([
          {
            name: formData.name,
            type: formData.type,
            owner: formData.owner,
            status: formData.status,
            phone: formData.phone,
            address: formData.address,
          }
        ])
        .select();

      if (insertError) throw insertError;

      if (data) {
        setPatientsData([formatPatientData(data[0]), ...patientsData]);
        success('Berhasil!', `Pasien ${formData.name} telah ditambahkan`);
        setIsAddModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      error('Gagal menambah pasien', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (patient) => {
    setSelectedPatient(patient);
    setIsDeleteModalOpen(true);
  };

  // DELETE: Menghapus data dari Supabase
  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      const { error: deleteError } = await supabase
        .from('patients')
        .delete()
        .eq('id', selectedPatient.id);

      if (deleteError) throw deleteError;

      setPatientsData(patientsData.filter(p => p.id !== selectedPatient.id));
      success('Terhapus!', `Pasien ${selectedPatient.name} berhasil dihapus`);
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error(err);
      error('Gagal menghapus data', err.message);
    } finally {
      setLoading(false);
    }
  };

  // UPDATE: Memperbarui data di Supabase
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error: updateError } = await supabase
        .from('patients')
        .update({
          name: formData.name,
          type: formData.type,
          owner: formData.owner,
          status: formData.status,
          phone: formData.phone,
          address: formData.address,
        })
        .eq('id', selectedPatient.id)
        .select();

      if (updateError) throw updateError;

      if (data) {
        setPatientsData(patientsData.map(p => 
          p.id === selectedPatient.id ? formatPatientData(data[0]) : p
        ));
        success('Berhasil!', `Data ${formData.name} telah diperbarui`);
        setIsEditModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      error('Gagal memperbarui data', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchPatients();
    success('Sukses', 'Data berhasil dimuat ulang dari server');
  };

  const statusOptions = [
    { value: "all", label: "Semua Status" },
    { value: "Perawatan", label: "Perawatan" },
    { value: "Selesai", label: "Selesai" },
    { value: "Antri", label: "Antri" },
  ];

  const typeOptions = [
    { value: "all", label: "Semua Jenis" },
    { value: "Kucing", label: "Kucing" },
    { value: "Anjing", label: "Anjing" },
    { value: "Kelinci", label: "Kelinci" },
    { value: "Hamster", label: "Hamster" },
  ];

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let filteredPatients = patientsData.filter(patient => {
    if (filterStatus && filterStatus !== "all" && patient.status !== filterStatus) return false;
    if (filterType && filterType !== "all" && !patient.type.toLowerCase().includes(filterType.toLowerCase())) return false;
    return true;
  });

  if (sortBy === "name_asc") {
    filteredPatients.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "name_desc") {
    filteredPatients.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortBy === "newest") {
    filteredPatients.sort((a, b) => b.id - a.id);
  } else if (sortBy === "oldest") {
    filteredPatients.sort((a, b) => a.id - b.id);
  }

  const displayedPatients = filteredPatients.slice(0, parseInt(itemsPerPage));

  if (isPageLoading) {
    return <PageLoading />;
  }

  // 2. CONDITIONAL RENDERING: Jika ID pasien terisi, langsung tampilkan komponen PatientDetail
  if (viewingPatientId) {
    return (
      <div className="p-4 md:p-6 lg:p-8 bg-slate-50/50 min-h-screen animate-in fade-in duration-500">
        <AlertContainer alerts={alerts} onRemove={removeAlert} position="top-right" />
        <PatientDetail 
          patientId={viewingPatientId} 
          onBack={() => setViewingPatientId(null)} // Reset ke null untuk kembali ke list tabel
        />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-slate-50/50 min-h-screen animate-in fade-in duration-500">
      <AlertContainer alerts={alerts} onRemove={removeAlert} position="top-right" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Data Pasien Anabul</h2>
          <p className="text-sm text-slate-500 mt-0.5">Manajemen informasi pasien klinik Arya Pet Care</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button 
            onClick={handleRefresh}
            disabled={isTableLoading}
            className="flex-1 sm:flex-none border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 px-4 py-2.5 rounded-xl font-semibold transition-all active:scale-98 flex items-center justify-center gap-2 text-sm disabled:opacity-50 shadow-sm"
          >
            {isTableLoading ? (
              <ButtonLoading text="Memuat..." />
            ) : (
              <>
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </>
            )}
          </button>
          <button 
            onClick={handleAddPatient}
            className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-all active:scale-98 flex items-center justify-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            Tambah Pasien
          </button>
        </div>
      </div>

      {/* Filter Section */}
      {isFilterLoading ? (
        <FilterSkeleton />
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 mb-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Saring & Urutkan</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select label="Status" name="status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} options={statusOptions} placeholder="Semua Status" clearable />
            <Select label="Jenis Hewan" name="type" value={filterType} onChange={(e) => setFilterType(e.target.value)} options={typeOptions} placeholder="Semua Jenis" clearable searchable />
            <Select label="Urutkan" name="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} options={[ { value: "newest", label: "Terbaru" }, { value: "oldest", label: "Terlama" }, { value: "name_asc", label: "Nama A-Z" }, { value: "name_desc", label: "Nama Z-A" }, ]} placeholder="Urutan Default" clearable />
            <Select label="Tampilkan" name="limit" value={itemsPerPage} onChange={(e) => setItemsPerPage(e.target.value)} options={[ { value: "5", label: "5 Baris" }, { value: "10", label: "10 Baris" }, { value: "25", label: "25 Baris" }, { value: "50", label: "50 Baris" }, ]} />
          </div>
        </div>
      )}

      {/* Tabel Data Modern */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-800">Daftar Pasien Aktif</h3>
          <p className="text-xs font-medium text-slate-500">
            {isTableLoading ? 'Memuat...' : `Total: ${filteredPatients.length} pasien`}
          </p>
        </div>

        {isTableLoading ? (
          <TableSkeleton rows={5} columns={5} />
        ) : displayedPatients.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <p>Tidak ada data pasien ditemukan.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3.5">Anabul</th>
                  <th className="px-6 py-3.5">Jenis</th>
                  <th className="px-6 py-3.5">Pemilik</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-slate-50/70 transition-colors group">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 ${patient.color} rounded-xl flex items-center justify-center text-xs font-bold border shadow-sm`}>
                          {patient.textInitials}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{patient.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">ID: #{patient.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5"><p className="text-xs font-medium text-slate-600">{patient.type}</p></td>
                    <td className="px-6 py-3.5"><p className="text-xs text-slate-600">{patient.owner}</p></td>
                    <td className="px-6 py-3.5">
                      <span className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${patient.status === 'Selesai' ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60' : patient.status === 'Perawatan' ? 'bg-blue-50 text-blue-700 border-blue-200/60' : 'bg-amber-50 text-amber-700 border-amber-200/60'}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <div className="flex justify-end gap-1.5">
                        
                        {/* 3. PERBAIKAN: Menambahkan fungsi onClick untuk melihat detail pasien */}
                        <button 
                          onClick={() => setViewingPatientId(patient.id)}
                          className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-slate-700 rounded-lg transition-colors" 
                          title="Detail"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                          </svg>
                        </button>

                        <button 
                          onClick={() => {
                            setFormData({
                              name: patient.name, type: patient.type, owner: patient.owner, status: patient.status, phone: patient.phone || '', address: patient.address || '',
                            });
                            setSelectedPatient(patient);
                            setIsEditModalOpen(true);
                          }}
                          className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-blue-600 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                          </svg>
                        </button>
                        <button onClick={() => handleDeleteClick(patient)} className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors" title="Hapus">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination Minimalis */}
      {!isTableLoading && displayedPatients.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-5 gap-4 px-1 text-xs text-slate-500 font-medium">
          <p>Menampilkan {displayedPatients.length} dari {filteredPatients.length} data pasien</p>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all font-semibold shadow-sm">Prev</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-900 text-white font-semibold shadow-sm">1</button>
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all font-semibold shadow-sm">Next</button>
          </div>
        </div>
      )}

      {/* Modals Form */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={selectedPatient?.name}
        loading={loading}
      />

      <FormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Pasien Baru"
        onSubmit={handleSubmitAdd}
        loading={loading}
        submitText="Simpan"
      >
        <div className="space-y-4">
          <Input label="Nama Pasien" name="name" value={formData.name} onChange={handleFormChange} placeholder="Masukkan nama pasien" required />
          <Input label="Jenis Hewan" name="type" value={formData.type} onChange={handleFormChange} placeholder="Contoh: Kucing Persia" required />
          <Input label="Nama Pemilik" name="owner" value={formData.owner} onChange={handleFormChange} placeholder="Masukkan nama pemilik" required />
          <Select label="Status" name="status" value={formData.status} onChange={handleFormChange} options={statusOptions.slice(1)} placeholder="Pilih status" required />
          <Input label="Nomor Telepon" name="phone" type="tel" value={formData.phone} onChange={handleFormChange} placeholder="08123456789" />
          <Textarea label="Alamat" name="address" value={formData.address} onChange={handleFormChange} placeholder="Masukkan alamat lengkap" rows={3} />
        </div>
      </FormModal>

      <FormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Data Pasien"
        onSubmit={handleSubmitEdit}
        loading={loading}
        submitText="Update"
      >
        <div className="space-y-4">
          <Input label="Nama Pasien" name="name" value={formData.name} onChange={handleFormChange} placeholder="Masukkan nama pasien" required />
          <Input label="Jenis Hewan" name="type" value={formData.type} onChange={handleFormChange} placeholder="Contoh: Kucing Persia" required />
          <Input label="Nama Pemilik" name="owner" value={formData.owner} onChange={handleFormChange} placeholder="Masukkan nama pemilik" required />
          <Select label="Status" name="status" value={formData.status} onChange={handleFormChange} options={statusOptions.slice(1)} placeholder="Pilih status" required />
          <Input label="Nomor Telepon" name="phone" type="tel" value={formData.phone} onChange={handleFormChange} placeholder="08123456789" />
          <Textarea label="Alamat" name="address" value={formData.address} onChange={handleFormChange} placeholder="Masukkan alamat lengkap" rows={3} />
        </div>
      </FormModal>
    </div>
  );
};

export default Patients;