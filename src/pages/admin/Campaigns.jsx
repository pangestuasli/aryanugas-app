import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

import { AlertContainer, useAlert } from '../../components/Alert';
import { ConfirmDeleteModal, FormModal } from '../../components/Modal';
import Input, { Textarea } from '../../components/Input';
import { PageLoading, TableSkeleton, ButtonLoading } from '../../components/Loading';
import { formatDate } from '../../lib/helpers';

const Campaigns = () => {
  const { alerts, removeAlert, success, error } = useAlert();

  // Loading states
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isTableLoading, setIsTableLoading] = useState(true);

  // Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [loading, setLoading] = useState(false);

  // Data states
  const [campaignsData, setCampaignsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discount_value: '',
    banner_url: '',
  });

  // READ: Fetch campaigns from Supabase
  const fetchCampaigns = async () => {
    setIsTableLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setCampaignsData(data || []);
    } catch (err) {
      console.error(err);
      error('Gagal memuat data', err.message);
    } finally {
      setIsTableLoading(false);
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleAddCampaign = () => {
    setFormData({ title: '', description: '', discount_value: '', banner_url: '' });
    setIsAddModalOpen(true);
  };

  // CREATE: Add campaign to Supabase
  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error: insertError } = await supabase
        .from('campaigns')
        .insert([{
          title: formData.title,
          description: formData.description,
          discount_value: parseInt(formData.discount_value) || 0,
          banner_url: formData.banner_url || null,
        }])
        .select();

      if (insertError) throw insertError;

      if (data) {
        setCampaignsData([data[0], ...campaignsData]);
        success('Berhasil!', `Campaign "${formData.title}" telah ditambahkan`);
        setIsAddModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      error('Gagal menambah campaign', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (campaign) => {
    setSelectedCampaign(campaign);
    setIsDeleteModalOpen(true);
  };

  // DELETE: Remove campaign from Supabase
  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      const { error: deleteError } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', selectedCampaign.id);

      if (deleteError) throw deleteError;

      setCampaignsData(campaignsData.filter(c => c.id !== selectedCampaign.id));
      success('Terhapus!', `Campaign "${selectedCampaign.title}" berhasil dihapus`);
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error(err);
      error('Gagal menghapus data', err.message);
    } finally {
      setLoading(false);
    }
  };

  // UPDATE: Edit campaign in Supabase
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error: updateError } = await supabase
        .from('campaigns')
        .update({
          title: formData.title,
          description: formData.description,
          discount_value: parseInt(formData.discount_value) || 0,
          banner_url: formData.banner_url || null,
        })
        .eq('id', selectedCampaign.id)
        .select();

      if (updateError) throw updateError;

      if (data) {
        setCampaignsData(campaignsData.map(c =>
          c.id === selectedCampaign.id ? data[0] : c
        ));
        success('Berhasil!', `Campaign "${formData.title}" telah diperbarui`);
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
    fetchCampaigns();
    success('Sukses', 'Data berhasil dimuat ulang dari server');
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Filter & Search
  const filteredCampaigns = campaignsData.filter(campaign => {
    if (searchQuery && !campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !(campaign.description || '').toLowerCase().includes(searchQuery.toLowerCase())) return false;
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
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Campaign & Promo</h2>
          <p className="text-sm text-slate-500 mt-0.5">Kelola brosur dan promo digital klinik</p>
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
            onClick={handleAddCampaign}
            className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-all active:scale-98 flex items-center justify-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            Tambah Campaign
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 mb-6">
        <Input
          label="Cari Campaign"
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari judul atau deskripsi campaign..."
          icon="🔍"
        />
      </div>

      {/* Tabel Data */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-800">Daftar Campaign Aktif</h3>
          <p className="text-xs font-medium text-slate-500">
            {isTableLoading ? 'Memuat...' : `Total: ${filteredCampaigns.length} campaign`}
          </p>
        </div>

        {isTableLoading ? (
          <TableSkeleton rows={3} columns={5} />
        ) : filteredCampaigns.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <p>Tidak ada campaign ditemukan.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3.5">Judul</th>
                  <th className="px-6 py-3.5">Deskripsi</th>
                  <th className="px-6 py-3.5">Diskon</th>
                  <th className="px-6 py-3.5">Tanggal Dibuat</th>
                  <th className="px-6 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-slate-50/70 transition-colors group">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-sm font-bold border border-purple-100 shadow-sm">
                          📢
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{campaign.title}</p>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">ID: #{campaign.id.substring(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <p className="text-xs font-medium text-slate-600 max-w-xs truncate">
                        {campaign.description || '-'}
                      </p>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold border bg-emerald-50 text-emerald-700 border-emerald-200/60">
                        {campaign.discount_value}%
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <p className="text-xs text-slate-500">{formatDate(campaign.created_at)}</p>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setFormData({
                              title: campaign.title,
                              description: campaign.description || '',
                              discount_value: String(campaign.discount_value || 0),
                              banner_url: campaign.banner_url || '',
                            });
                            setSelectedCampaign(campaign);
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
                          onClick={() => handleDeleteClick(campaign)}
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
        itemName={selectedCampaign?.title}
        loading={loading}
      />

      <FormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Campaign Baru"
        onSubmit={handleSubmitAdd}
        loading={loading}
        submitText="Simpan"
      >
        <div className="space-y-4">
          <Input label="Judul Campaign" name="title" value={formData.title} onChange={handleFormChange} placeholder="Misal: Promo Vaksinasi Tahunan" required />
          <Textarea label="Deskripsi" name="description" value={formData.description} onChange={handleFormChange} placeholder="Jelaskan detail campaign..." rows={3} />
          <Input label="Nilai Diskon (%)" name="discount_value" type="number" min="0" max="100" value={formData.discount_value} onChange={handleFormChange} placeholder="0" required />
          <Input label="URL Banner (Opsional)" name="banner_url" value={formData.banner_url} onChange={handleFormChange} placeholder="https://example.com/banner.jpg" />
        </div>
      </FormModal>

      <FormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Campaign"
        onSubmit={handleSubmitEdit}
        loading={loading}
        submitText="Update"
      >
        <div className="space-y-4">
          <Input label="Judul Campaign" name="title" value={formData.title} onChange={handleFormChange} placeholder="Masukkan judul campaign" required />
          <Textarea label="Deskripsi" name="description" value={formData.description} onChange={handleFormChange} placeholder="Jelaskan detail campaign..." rows={3} />
          <Input label="Nilai Diskon (%)" name="discount_value" type="number" min="0" max="100" value={formData.discount_value} onChange={handleFormChange} placeholder="0" required />
          <Input label="URL Banner (Opsional)" name="banner_url" value={formData.banner_url} onChange={handleFormChange} placeholder="https://example.com/banner.jpg" />
        </div>
      </FormModal>
    </div>
  );
};

export default Campaigns;
