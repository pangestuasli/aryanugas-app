import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { getCurrentUser } from '../../lib/helpers';

import { AlertContainer, useAlert } from '../../components/Alert';
import { PageLoading } from '../../components/Loading';
import { formatDate } from '../../lib/helpers';

const MedicalHistoryPage = () => {
  const { alerts, removeAlert, error } = useAlert();
  const currentUser = getCurrentUser();

  // Loading states
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Data states
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [petsData, setPetsData] = useState([]);
  const [selectedPet, setSelectedPet] = useState('all');

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsPageLoading(true);
    try {
      // Fetch pets owned by this member
      const { data: pets, error: petsError } = await supabase
        .from('patients')
        .select('*')
        .eq('owner', currentUser.username)
        .order('name');

      if (petsError) throw petsError;

      setPetsData(pets || []);

      if (pets && pets.length > 0) {
        const petIds = pets.map(p => p.id);

        // Fetch medical histories for these pets
        const { data: histories, error: historiesError } = await supabase
          .from('medical_histories')
          .select(`
            *,
            doctors:doctor_id (name, specialization),
            patients:patient_id (name, type)
          `)
          .in('patient_id', petIds)
          .order('created_at', { ascending: false });

        if (historiesError) throw historiesError;
        setMedicalHistory(histories || []);
      }
    } catch (err) {
      console.error(err);
      error('Gagal memuat data', err.message);
    } finally {
      setIsPageLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  // Filter by selected pet
  const filteredHistory = selectedPet === 'all'
    ? medicalHistory
    : medicalHistory.filter(h => h.patient_id === parseInt(selectedPet));

  // Group history by pet
  const groupedByPet = petsData.map(pet => ({
    pet,
    histories: medicalHistory.filter(h => h.patient_id === pet.id),
  })).filter(group => group.histories.length > 0);

  if (isPageLoading) {
    return <PageLoading />;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <AlertContainer alerts={alerts} onRemove={removeAlert} position="top-right" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <p className="text-sm text-[#6B6357]">Rekam medis anabul Anda</p>
          <h1
            className="text-2xl font-bold text-[#1F3A2E]"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            Riwayat Medis
          </h1>
        </div>
        <button
          onClick={handleRefresh}
          className="border border-[#1F3A2E]/10 bg-white hover:bg-[#F8F4EC] text-[#1F3A2E] px-4 py-2.5 rounded-xl font-semibold transition-all text-sm shadow-sm"
        >
          Refresh
        </button>
      </div>

      {/* Info: No pets */}
      {petsData.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
          <p className="font-semibold">Belum ada anabul terdaftar</p>
          <p className="mt-1">Riwayat medis akan muncul setelah anabul Anda terdaftar di sistem klinik.</p>
        </div>
      )}

      {/* Filter by pet */}
      {petsData.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#1F3A2E]/10 p-6 mb-6">
          <h3 className="text-xs font-bold text-[#6B6357] uppercase tracking-wider mb-4">Filter berdasarkan Anabul</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedPet('all')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                selectedPet === 'all'
                  ? 'bg-[#1F3A2E] text-[#F8F4EC]'
                  : 'bg-[#F8F4EC] text-[#1F3A2E] border border-[#1F3A2E]/10 hover:bg-[#EFE6D2]'
              }`}
            >
              Semua Anabul
            </button>
            {petsData.map(pet => (
              <button
                key={pet.id}
                onClick={() => setSelectedPet(String(pet.id))}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  selectedPet === String(pet.id)
                    ? 'bg-[#1F3A2E] text-[#F8F4EC]'
                    : 'bg-[#F8F4EC] text-[#1F3A2E] border border-[#1F3A2E]/10 hover:bg-[#EFE6D2]'
                }`}
              >
                {pet.name} ({pet.type || 'Hewan'})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Medical History List */}
      {groupedByPet.length === 0 && petsData.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#1F3A2E]/10 p-8 text-center">
          <p className="text-[#6B6357] text-sm">Belum ada riwayat medis untuk anabul Anda.</p>
          <p className="text-[#6B6357] text-xs mt-2">Riwayat akan muncul setelah anabul diperiksa oleh dokter.</p>
        </div>
      )}

      {groupedByPet.map(({ pet, histories }) => {
        const filteredHistories = selectedPet === 'all'
          ? histories
          : histories.filter(h => h.patient_id === parseInt(selectedPet));

        if (filteredHistories.length === 0) return null;

        return (
          <div key={pet.id} className="bg-white rounded-2xl border border-[#1F3A2E]/10 p-6 mb-6">
            {/* Pet Header */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#1F3A2E]/10">
              <div className="w-12 h-12 bg-[#EFE6D2] rounded-xl flex items-center justify-center text-2xl">
                {pet.type?.toLowerCase().includes('kucing') ? '🐈' :
                 pet.type?.toLowerCase().includes('anjing') ? '🐕' : '🐾'}
              </div>
              <div>
                <h2 className="font-bold text-[#1F3A2E]">{pet.name}</h2>
                <p className="text-xs text-[#6B6357]">{pet.type || 'Hewan'} {pet.breed ? `• ${pet.breed}` : ''}</p>
              </div>
            </div>

            {/* History Entries */}
            <div className="space-y-4">
              {filteredHistories.map((history) => (
                <div
                  key={history.id}
                  className="bg-[#F8F4EC] rounded-xl p-4 border border-[#1F3A2E]/5"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-bold text-[#1F3A2E]">{history.diagnosis}</p>
                      <p className="text-xs text-[#6B6357] mt-0.5">
                        {history.doctors?.name || 'Dokter'} • {history.doctors?.specialization || ''}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#6B6357] bg-white px-2 py-1 rounded-lg">
                      {formatDate(history.created_at)}
                    </span>
                  </div>

                  {history.treatment && (
                    <div className="mt-3">
                      <p className="text-[10px] font-bold text-[#6B6357] uppercase tracking-wider mb-1">Penanganan</p>
                      <p className="text-sm text-[#1F3A2E] bg-white p-3 rounded-lg border border-[#1F3A2E]/5">
                        {history.treatment}
                      </p>
                    </div>
                  )}

                  {history.notes && (
                    <div className="mt-3">
                      <p className="text-[10px] font-bold text-[#6B6357] uppercase tracking-wider mb-1">Catatan</p>
                      <p className="text-sm text-[#6B6357] italic">"{history.notes}"</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MedicalHistoryPage;
