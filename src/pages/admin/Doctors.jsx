import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

import Alert, { AlertContainer, useAlert } from '../../components/Alert';
import Modal, { ConfirmDeleteModal, FormModal } from '../../components/Modal';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { PageLoading, TableSkeleton, ButtonLoading } from '../../components/Loading';

const Doctors = () => {
  const { alerts, removeAlert, success, error } = useAlert();

  // Loading states
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isTableLoading, setIsTableLoading] = useState(true);

  // Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(false);

  // Data states
  const [doctorsData, setDoctorsData] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    is_active: 'true',
  });

  // READ: Fetch doctors from Supabase
  const fetchDoctors = async () => {
    setIsTableLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('doctors')
        .select('*')
        .order('name', { ascending: true });

      if (fetchError) throw fetchError;
      setDoctorsData(data || []);
    } catch (err) {
      console.error(err);
      error('Gagal memuat data', err.message);
    } finally {
      setIsTableLoading(false);
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleAddDoctor = () => {
    setFormData({ name: '', specialization: '', is_active: 'true' });
    setIsAddModalOpen(true);
  };

  // CREATE: Add doctor to Supabase
  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error: insertError } = await supabase
        .from('doctors')
        .insert([{
          name: formData.name,
          specialization: formData.specialization,
          is_active: formData.is_active === 'true',
        }])
        .select();

      if (insertError) throw insertError;

      if (data) {
        setDoctorsData([...doctorsData, data[0]]);
        success('Berhasil!', `Dokter ${formData.name} telah ditambahkan`);
        setIsAddModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      error('Gagal menambah dokter', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (doctor) => {
    setSelectedDoctor(doctor);
    setIsDeleteModalOpen(true);
  };

  // DELETE: Remove doctor from Supabase
  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      const { error: deleteError } = await supabase
        .from('doctors')
        .delete()
        .eq('id', selectedDoctor.id);

      if (deleteError) throw deleteError;

      setDoctorsData(doctorsData.filter(d => d.id !== selectedDoctor.id));
      success('Terhapus!', `Dokter ${selectedDoctor.name} berhasil dihapus`);
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error(err);
      error('Gagal menghapus data', err.message);
    } finally {
      setLoading(false);
    }
  };

  // UPDATE: Edit doctor in Supabase
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error: updateError } = await supabase
        .from('doctors')
        .update({
          name: formData.name,
          specialization: formData.specialization,
          is_active: formData.is_active === 'true',
        })
        .eq('id', selectedDoctor.id)
        .select();

      if (updateError) throw updateError;

      if (data) {
        setDoctorsData(doctorsData.map(d =>
          d.id === selectedDoctor.id ? data[0] : d
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
    fetchDoctors();
    success('Sukses', 'Data berhasil dimuat ulang dari server');
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const statusOptions = [
    { value: 'all', label: 'Semua Status' },
    { value: 'true', label: 'Aktif' },
    { value: 'false', label: 'Nonaktif' },
  ];

  const activeStatusOptions = [
    { value: 'true', label: 'Aktif' },
    { value: 'false', label: 'Nonaktif' },
  ];

  // Filter & Search
  let filteredDoctors = doctorsData.filter(doctor => {
    if (filterStatus !== 'all' && String(doctor.is_active) !== filterStatus) return false;
    if (searchQuery && !doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !(doctor.specialization || '').toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  if (isPageLoading) {
    return <PageLoading />;
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-slate-50/50 min-h-screen animate-in fade-in duration-500">
      <AlertContainer alerts={alerts} onRemove={removeAlert} position="top-right" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Data Dokter</h2>
          <p className="text-sm text-slate-500 mt-0.5">Manajemen dokter hewan di klinik Arya Pet Care</p>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </>
            )}
          </button>
          <button
            onClick={handleAddDoctor}
            className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-all active:scale-98 flex items-center justify-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            Tambah Dokter
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 mb-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Saring & Cari</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Select
            label="Status"
            name="status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={statusOptions}
            placeholder="Semua Status"
            clearable
          />
          <div className="sm:col-span-2">
            <Input
              label="Cari Dokter"
              name="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama dokter atau spesialisasi..."
              icon="🔍"
            />
          </div>
        </div>
      </div>

      {/* Tabel Data */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-800">Daftar Dokter Aktif</h3>
          <p className="text-xs font-medium text-slate-500">
            {isTableLoading ? 'Memuat...' : `Total: ${filteredDoctors.length} dokter`}
          </p>
        </div>

        {isTableLoading ? (
          <TableSkeleton rows={3} columns={4} />
        ) : filteredDoctors.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <p>Tidak ada data dokter ditemukan.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3.5">Dokter</th>
                  <th className="px-6 py-3.5">Spesialisasi</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.id} className="hover:bg-slate-50/70 transition-colors group">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-sm font-bold border border-emerald-100 shadow-sm">
                          {doctor.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{doctor.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">ID: #{doctor.id.substring(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <p className="text-xs font-medium text-slate-600">{doctor.specialization || '-'}</p>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${
                        doctor.is_active
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                          : 'bg-slate-50 text-slate-500 border-slate-200/60'
                      }`}>
                        {doctor.is_active ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setFormData({
                              name: doctor.name,
                              specialization: doctor.specialization || '',
                              is_active: String(doctor.is_active),
                            });
                            setSelectedDoctor(doctor);
                            setIsEditModalOpen(true);
                          }}
                          className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-blue-600 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(doctor)}
                          className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                          title="Hapus"
                        >
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

      {/* Modals */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={selectedDoctor?.name}
        loading={loading}
      />

      <FormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Dokter Baru"
        onSubmit={handleSubmitAdd}
        loading={loading}
        submitText="Simpan"
      >
        <div className="space-y-4">
          <Input label="Nama Dokter" name="name" value={formData.name} onChange={handleFormChange} placeholder="Misal: drh. Sarah Wijaya" required />
          <Input label="Spesialisasi" name="specialization" value={formData.specialization} onChange={handleFormChange} placeholder="Misal: Bedah & Radiologi" required />
          <Select label="Status" name="is_active" value={formData.is_active} onChange={handleFormChange} options={activeStatusOptions} placeholder="Pilih status" required />
        </div>
      </FormModal>

      <FormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Data Dokter"
        onSubmit={handleSubmitEdit}
        loading={loading}
        submitText="Update"
      >
        <div className="space-y-4">
          <Input label="Nama Dokter" name="name" value={formData.name} onChange={handleFormChange} placeholder="Masukkan nama dokter" required />
          <Input label="Spesialisasi" name="specialization" value={formData.specialization} onChange={handleFormChange} placeholder="Misal: Bedah & Radiologi" required />
          <Select label="Status" name="is_active" value={formData.is_active} onChange={handleFormChange} options={activeStatusOptions} placeholder="Pilih status" required />
        </div>
      </FormModal>
    </div>
  );
};

export default Doctors;
