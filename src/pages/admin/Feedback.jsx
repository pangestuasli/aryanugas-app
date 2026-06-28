import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

import { AlertContainer, useAlert } from '../../components/Alert';
import { ConfirmDeleteModal } from '../../components/Modal';
import { PageLoading, ButtonLoading } from '../../components/Loading';
import { formatDateTime } from '../../lib/helpers';

const Feedbacks = () => {
  const { alerts, removeAlert, success, error } = useAlert();

  // Loading states
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isListLoading, setIsListLoading] = useState(true);

  // Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  // Data states
  const [feedbacksData, setFeedbacksData] = useState([]);
  const [filterRating, setFilterRating] = useState('all');

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    avgRating: 0,
    rating5: 0,
    rating4: 0,
    rating3: 0,
    rating2: 0,
    rating1: 0,
  });

  // READ: Fetch feedbacks from Supabase
  const fetchFeedbacks = async () => {
    setIsListLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('feedbacks')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      const feedbacks = data || [];
      setFeedbacksData(feedbacks);

      // Calculate stats
      const total = feedbacks.length;
      const avgRating = total > 0
        ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / total).toFixed(1)
        : 0;

      setStats({
        total,
        avgRating,
        rating5: feedbacks.filter(f => f.rating === 5).length,
        rating4: feedbacks.filter(f => f.rating === 4).length,
        rating3: feedbacks.filter(f => f.rating === 3).length,
        rating2: feedbacks.filter(f => f.rating === 2).length,
        rating1: feedbacks.filter(f => f.rating === 1).length,
      });
    } catch (err) {
      console.error(err);
      error('Gagal memuat data', err.message);
    } finally {
      setIsListLoading(false);
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleDeleteClick = (feedback) => {
    setSelectedFeedback(feedback);
    setIsDeleteModalOpen(true);
  };

  // DELETE: Remove feedback from Supabase
  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      const { error: deleteError } = await supabase
        .from('feedbacks')
        .delete()
        .eq('id', selectedFeedback.id);

      if (deleteError) throw deleteError;

      setFeedbacksData(feedbacksData.filter(f => f.id !== selectedFeedback.id));
      success('Terhapus!', 'Feedback berhasil dihapus');
      setIsDeleteModalOpen(false);

      // Refresh stats
      fetchFeedbacks();
    } catch (err) {
      console.error(err);
      error('Gagal menghapus data', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchFeedbacks();
    success('Sukses', 'Data berhasil dimuat ulang dari server');
  };

  // Filter by rating
  const filteredFeedbacks = feedbacksData.filter(feedback => {
    if (filterRating !== 'all' && feedback.rating !== parseInt(filterRating)) return false;
    return true;
  });

  // Render stars
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? 'text-amber-400' : 'text-slate-200'}`}
      >
        ★
      </span>
    ));
  };

  if (isPageLoading) {
    return <PageLoading />;
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-slate-50/50 min-h-screen animate-in fade-in duration-500">
      <AlertContainer alerts={alerts} onRemove={removeAlert} position="top-right" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Feedback & Rating</h2>
          <p className="text-sm text-slate-500 mt-0.5">Pantau ulasan dan masukan dari member</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isListLoading}
          className="flex-1 sm:flex-none border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 px-4 py-2.5 rounded-xl font-semibold transition-all active:scale-98 flex items-center justify-center gap-2 text-sm disabled:opacity-50 shadow-sm"
        >
          {isListLoading ? (
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
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
          <p className="text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Total</p>
          <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400"></div>
          <p className="text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Rata-rata</p>
          <div className="flex items-center gap-1">
            <p className="text-2xl font-bold text-slate-800">{stats.avgRating}</p>
            <span className="text-amber-400 text-lg">★</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-400"></div>
          <p className="text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Bintang 5</p>
          <p className="text-2xl font-bold text-slate-800">{stats.rating5}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-400"></div>
          <p className="text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Bintang 4</p>
          <p className="text-2xl font-bold text-slate-800">{stats.rating4}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-yellow-400"></div>
          <p className="text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Bintang 3</p>
          <p className="text-2xl font-bold text-slate-800">{stats.rating3}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-red-400"></div>
          <p className="text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Bintang 1-2</p>
          <p className="text-2xl font-bold text-slate-800">{stats.rating1 + stats.rating2}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 mb-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Filter Rating</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'all', label: 'Semua' },
            { value: '5', label: '★ 5' },
            { value: '4', label: '★ 4' },
            { value: '3', label: '★ 3' },
            { value: '2', label: '★ 2' },
            { value: '1', label: '★ 1' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setFilterRating(option.value)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                filterRating === option.value
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-800">Daftar Feedback Member</h3>
          <p className="text-xs font-medium text-slate-500">
            {isListLoading ? 'Memuat...' : `Menampilkan: ${filteredFeedbacks.length} feedback`}
          </p>
        </div>

        {isListLoading ? (
          <div className="p-8 text-center text-slate-500 text-sm font-medium">Memuat data...</div>
        ) : filteredFeedbacks.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <p>Tidak ada feedback ditemukan.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredFeedbacks.map((feedback) => (
              <div key={feedback.id} className="p-6 hover:bg-slate-50/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-sm font-bold border border-amber-100 shadow-sm">
                        {feedback.member_username.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{feedback.member_username}</p>
                        <div className="flex items-center gap-1">
                          {renderStars(feedback.rating)}
                        </div>
                      </div>
                    </div>
                    {feedback.comment && (
                      <p className="text-sm text-slate-600 mt-3 ml-12 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        "{feedback.comment}"
                      </p>
                    )}
                    <p className="text-[10px] text-slate-400 mt-2 ml-12">
                      {formatDateTime(feedback.created_at)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteClick(feedback)}
                    className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                    title="Hapus Feedback"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={`feedback dari ${selectedFeedback?.member_username}`}
        loading={loading}
      />
    </div>
  );
};

export default Feedbacks;
