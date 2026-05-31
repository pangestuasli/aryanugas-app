import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [isFilterLoading, setIsFilterLoading] = useState(true);
  
  // Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Data states
  const [patientsData, setPatientsData] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortBy, setSortBy] = useState("");
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

  // Simulasi fetch data
  useEffect(() => {
    // Simulasi loading page
    setTimeout(() => {
      setIsPageLoading(false);
    }, 1500);

    // Simulasi fetch data pasien
    setTimeout(() => {
      const mockData = [
        { id: 1, name: "Mochi", type: "Kucing Persia", owner: "Bpk. Aryanugas", status: "Perawatan", icon: "🐱", color: "bg-blue-500", phone: "08123456789", address: "Jl. Merdeka No. 1" },
        { id: 2, name: "Bruno", type: "Golden Retriever", owner: "Ibu Siti", status: "Selesai", icon: "🐶", color: "bg-emerald-500", phone: "08123456788", address: "Jl. Sudirman No. 2" },
        { id: 3, name: "Luna", type: "Kelinci", owner: "Rian", status: "Antri", icon: "🐰", color: "bg-orange-400", phone: "08123456787", address: "Jl. Thamrin No. 3" },
        { id: 4, name: "Oyen", type: "Kucing Domestik", owner: "Bpk. Budi", status: "Perawatan", icon: "🐈", color: "bg-blue-500", phone: "08123456786", address: "Jl. Kuningan No. 4" },
        { id: 5, name: "Bella", type: "Hamster", owner: "Putri", status: "Selesai", icon: "🐹", color: "bg-emerald-500", phone: "08123456785", address: "Jl. Gatot Subroto No. 5" },
      ];
      setPatientsData(mockData);
      setIsTableLoading(false);
      setIsFilterLoading(false);
    }, 2000);
  }, []);

  // Handle Tambah Pasien dengan loading
  const handleAddPatient = () => {
    setFormData({
      name: '',
      type: '',
      owner: '',
      status: '',
      phone: '',
      address: '',
    });
    setIsAddModalOpen(true);
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulasi API call
    setTimeout(() => {
      const newPatient = {
        id: patientsData.length + 1,
        name: formData.name,
        type: formData.type,
        owner: formData.owner,
        status: formData.status,
        icon: formData.type.includes('Kucing') ? '🐱' : formData.type.includes('Anjing') ? '🐶' : '🐹',
        color: formData.status === 'Selesai' ? 'bg-emerald-500' : formData.status === 'Perawatan' ? 'bg-blue-500' : 'bg-orange-400',
        phone: formData.phone,
        address: formData.address,
      };
      setPatientsData([...patientsData, newPatient]);
      success('Berhasil!', `Pasien ${formData.name} telah ditambahkan`);
      setIsAddModalOpen(false);
      setLoading(false);
    }, 1500);
  };

  // Handle Hapus Pasien dengan loading
  const handleDeleteClick = (patient) => {
    setSelectedPatient(patient);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    
    setTimeout(() => {
      setPatientsData(patientsData.filter(p => p.id !== selectedPatient.id));
      success('Terhapus!', `Pasien ${selectedPatient.name} berhasil dihapus`);
      setIsDeleteModalOpen(false);
      setLoading(false);
    }, 1000);
  };

  // Handle refresh data dengan loading
  const handleRefresh = () => {
    setIsTableLoading(true);
    setIsFilterLoading(true);
    
    setTimeout(() => {
      // Refresh data logic
      setIsTableLoading(false);
      setIsFilterLoading(false);
      success('Sukses', 'Data berhasil dimuat ulang');
    }, 1500);
  };

  const statusOptions = [
    { value: "all", label: "Semua Status" },
    { value: "Perawatan", label: "Perawatan", icon: "💉" },
    { value: "Selesai", label: "Selesai", icon: "✅" },
    { value: "Antri", label: "Antri", icon: "⏳" },
  ];

  const typeOptions = [
    { value: "all", label: "Semua Jenis" },
    { value: "Kucing", label: "Kucing", icon: "🐱" },
    { value: "Anjing", label: "Anjing", icon: "🐶" },
    { value: "Kelinci", label: "Kelinci", icon: "🐰" },
    { value: "Hamster", label: "Hamster", icon: "🐹" },
  ];

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Filter data
  let filteredPatients = patientsData.filter(patient => {
    if (filterStatus && filterStatus !== "all" && patient.status !== filterStatus) return false;
    if (filterType && filterType !== "all" && !patient.type.includes(filterType)) return false;
    return true;
  });

  // Sorting
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

  // Loading page
  if (isPageLoading) {
    return <PageLoading />;
  }

  return (
    <div className="p-2 md:p-4 animate-in fade-in duration-700">
      {/* Alert Container */}
      <AlertContainer alerts={alerts} onRemove={removeAlert} position="top-right" />

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Data Pasien Anabul</h2>
          <p className="text-sm text-slate-400 mt-1">Manajemen informasi pasien klinik Arya Pet Care</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleRefresh}
            disabled={isTableLoading}
            className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2.5 rounded-xl font-bold transition-all active:scale-95 flex items-center gap-2 text-sm disabled:opacity-50"
          >
            {isTableLoading ? (
              <ButtonLoading text="Memuat..." />
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </>
            )}
          </button>
          <button 
            onClick={handleAddPatient}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-100 transition-all active:scale-95 flex items-center gap-2 text-sm"
          >
            <span className="text-lg">+</span> Tambah Pasien
          </button>
        </div>
      </div>

      {/* Filter Section with Loading */}
      {isFilterLoading ? (
        <FilterSkeleton />
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-50 p-6 mb-6">
          <h3 className="text-sm font-bold text-slate-800 mb-4">Filter Pasien</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Status"
              name="status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              options={statusOptions}
              placeholder="Pilih status"
              icon="📋"
              clearable
            />
            
            <Select
              label="Jenis Hewan"
              name="type"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              options={typeOptions}
              placeholder="Pilih jenis"
              icon="🐾"
              clearable
              searchable
            />
            
            <Select
              label="Urutkan Berdasarkan"
              name="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={[
                { value: "newest", label: "Terbaru" },
                { value: "oldest", label: "Terlama" },
                { value: "name_asc", label: "Nama A-Z" },
                { value: "name_desc", label: "Nama Z-A" },
              ]}
              placeholder="Urutkan"
              size="sm"
              clearable
            />
            
            <Select
              label="Jumlah Per Halaman"
              name="limit"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(e.target.value)}
              options={[
                { value: "5", label: "5 data" },
                { value: "10", label: "10 data" },
                { value: "25", label: "25 data" },
                { value: "50", label: "50 data" },
              ]}
              placeholder="Tampilkan"
              size="sm"
            />
          </div>
        </div>
      )}

      {/* Tabel Data with Loading */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-50 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Daftar Pasien Aktif</h3>
          <p className="text-xs text-slate-400">
            {isTableLoading ? 'Memuat...' : `Menampilkan ${displayedPatients.length} dari ${filteredPatients.length} pasien`}
          </p>
        </div>

        {isTableLoading ? (
          <TableSkeleton rows={5} columns={5} />
        ) : (
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
                {displayedPatients.map((patient) => (
                  <tr 
                    key={patient.id} 
                    className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
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
                          className="p-2 hover:bg-emerald-50 text-emerald-500 rounded-lg transition-colors"
                          title="Detail"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                          </svg>
                        </button>
                        <button 
                          onClick={() => {
                            setFormData({
                              name: patient.name,
                              type: patient.type,
                              owner: patient.owner,
                              status: patient.status,
                              phone: patient.phone || '',
                              address: patient.address || '',
                            });
                            setSelectedPatient(patient);
                            setIsEditModalOpen(true);
                          }}
                          className="p-2 hover:bg-blue-50 text-blue-500 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(patient)}
                          className="p-2 hover:bg-red-50 text-red-400 rounded-lg transition-colors"
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

      {/* Footer Info */}
      {!isTableLoading && (
        <div className="flex justify-between items-center mt-6 px-2 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
          <p>Menampilkan {displayedPatients.length} dari {filteredPatients.length} data pasien</p>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 rounded-lg border border-slate-100 hover:bg-white transition-all">Prev</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-500 text-white shadow-md shadow-emerald-100">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-all">2</button>
            <button className="px-3 py-1.5 rounded-lg border border-slate-100 hover:bg-white transition-all">Next</button>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={selectedPatient?.name}
        loading={loading}
      />

      {/* Add Patient Modal */}
      <FormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Pasien Baru"
        onSubmit={handleSubmitAdd}
        loading={loading}
        submitText="Simpan"
      >
        <div className="space-y-4">
          <Input
            label="Nama Pasien"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Masukkan nama pasien"
            icon="🐾"
            required
          />
          <Input
            label="Jenis Hewan"
            name="type"
            value={formData.type}
            onChange={handleFormChange}
            placeholder="Contoh: Kucing Persia"
            icon="🐱"
            required
          />
          <Input
            label="Nama Pemilik"
            name="owner"
            value={formData.owner}
            onChange={handleFormChange}
            placeholder="Masukkan nama pemilik"
            icon="👤"
            required
          />
          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleFormChange}
            options={[
              { value: "Perawatan", label: "Perawatan" },
              { value: "Selesai", label: "Selesai" },
              { value: "Antri", label: "Antri" },
            ]}
            placeholder="Pilih status"
            required
          />
          <Input
            label="Nomor Telepon"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleFormChange}
            placeholder="08123456789"
            icon="📞"
          />
          <Textarea
            label="Alamat"
            name="address"
            value={formData.address}
            onChange={handleFormChange}
            placeholder="Masukkan alamat lengkap"
            rows={3}
          />
        </div>
      </FormModal>

      {/* Edit Patient Modal */}
      <FormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Data Pasien"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => {
            setPatientsData(patientsData.map(p => 
              p.id === selectedPatient.id 
                ? { ...p, ...formData }
                : p
            ));
            success('Berhasil!', `Data ${formData.name} telah diperbarui`);
            setIsEditModalOpen(false);
            setLoading(false);
          }, 1000);
        }}
        loading={loading}
        submitText="Update"
      >
        <div className="space-y-4">
          <Input
            label="Nama Pasien"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Masukkan nama pasien"
            icon="🐾"
            required
          />
          <Input
            label="Jenis Hewan"
            name="type"
            value={formData.type}
            onChange={handleFormChange}
            placeholder="Contoh: Kucing Persia"
            icon="🐱"
            required
          />
          <Input
            label="Nama Pemilik"
            name="owner"
            value={formData.owner}
            onChange={handleFormChange}
            placeholder="Masukkan nama pemilik"
            icon="👤"
            required
          />
          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleFormChange}
            options={[
              { value: "Perawatan", label: "Perawatan" },
              { value: "Selesai", label: "Selesai" },
              { value: "Antri", label: "Antri" },
            ]}
            placeholder="Pilih status"
            required
          />
          <Input
            label="Nomor Telepon"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleFormChange}
            placeholder="08123456789"
            icon="📞"
          />
          <Textarea
            label="Alamat"
            name="address"
            value={formData.address}
            onChange={handleFormChange}
            placeholder="Masukkan alamat lengkap"
            rows={3}
          />
        </div>
      </FormModal>
    </div>
  );
};

export default Patients;