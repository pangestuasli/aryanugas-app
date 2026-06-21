// pages/customer/CustomerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Crown, Lock, Calendar, Heart, Bell, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const CustomerDashboard = () => {
  const [membership, setMembership] = useState('standar');
  const [fullname, setFullname] = useState('');
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMembership(sessionStorage.getItem('membership') || 'standar');
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const username = sessionStorage.getItem('user');

    const { data: userData } = await supabase
      .from('users')
      .select('fullname')
      .eq('username', username)
      .single();
    if (userData) setFullname(userData.fullname);

    const { data: petsData } = await supabase
      .from('patients')
      .select('*')
      .eq('owner', username);
    setPets(petsData || []);

    setLoading(false);
  };

  const isPriority = membership === 'prioritas';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      {/* GREETING */}
      <div className="mb-6">
        <p className="text-sm text-[#6B6357]">Selamat datang kembali,</p>
        <h1
          className="text-2xl font-bold text-[#1F3A2E]"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          {fullname || 'Anabul Lover'}
        </h1>
      </div>

      {/* UPGRADE BANNER - hanya muncul kalau belum prioritas */}
      {!isPriority && (
        <Link
          to="/upgrade"
          className="flex items-center justify-between gap-4 bg-[#1F3A2E] text-[#F8F4EC] rounded-2xl p-5 mb-8 hover:bg-[#16291F] transition-colors"
        >
          <div className="flex items-center gap-3">
            <Crown size={20} className="text-[#9C732C] flex-shrink-0" />
            <div>
              <p className="font-bold text-sm">Belum jadi Member Prioritas</p>
              <p className="text-xs opacity-70">Booking tanpa antre, konsultasi 24/7, diskon, dan lainnya</p>
            </div>
          </div>
          <ArrowRight size={18} className="flex-shrink-0" />
        </Link>
      )}

      {/* QUICK ACTIONS - selalu tersedia, semua membership */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <ActionCard
          icon={<Calendar size={20} />}
          title="Booking Jadwal"
          desc="Buat jadwal kunjungan baru"
        />
        <ActionCard
          icon={<Heart size={20} />}
          title="Anabul Saya"
          desc={`${pets.length} hewan terdaftar`}
        />
        <ActionCard
          icon={<Bell size={20} />}
          title="Notifikasi"
          desc="Info & promo klinik"
        />
      </div>

      {/* FITUR PRIORITAS */}
      <div className="bg-white rounded-2xl border border-[#1F3A2E]/10 p-6 mb-8">
        <h2 className="font-bold text-[#1F3A2E] mb-4 flex items-center gap-2">
          <Crown size={16} className="text-[#9C732C]" />
          Konsultasi Chat dengan Dokter (24/7)
        </h2>

        {isPriority ? (
          <div className="bg-[#F8F4EC] rounded-xl p-6 text-center text-sm text-[#6B6357]">
            Fitur chat konsultasi aktif untukmu. (Komponen chat bisa ditaruh di sini.)
          </div>
        ) : (
          <LockedFeature />
        )}
      </div>

      <div className="bg-white rounded-2xl border border-[#1F3A2E]/10 p-6 mb-8">
        <h2 className="font-bold text-[#1F3A2E] mb-4 flex items-center gap-2">
          <Crown size={16} className="text-[#9C732C]" />
          Booking Tanpa Antre
        </h2>
        {isPriority ? (
          <div className="bg-[#F8F4EC] rounded-xl p-6 text-center text-sm text-[#6B6357]">
            Slot prioritas tersedia untuk setiap kunjunganmu.
          </div>
        ) : (
          <LockedFeature />
        )}
      </div>

      {/* DAFTAR ANABUL */}
      <div className="bg-white rounded-2xl border border-[#1F3A2E]/10 p-6">
        <h2 className="font-bold text-[#1F3A2E] mb-4">Anabul Saya</h2>
        {pets.length === 0 ? (
          <p className="text-sm text-[#6B6357]">Belum ada anabul yang terdaftar.</p>
        ) : (
          <div className="space-y-3">
            {pets.map((pet) => (
              <div
                key={pet.id}
                className="flex items-center justify-between border-b border-[#1F3A2E]/5 last:border-0 pb-3 last:pb-0"
              >
                <div>
                  <p className="font-semibold text-sm text-[#1F3A2E]">{pet.name}</p>
                  <p className="text-xs text-[#6B6357]">{pet.type}</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#F8F4EC] text-[#1F3A2E]">
                  {pet.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ActionCard = ({ icon, title, desc }) => (
  <div className="bg-white rounded-2xl border border-[#1F3A2E]/10 p-5 flex items-start gap-4 hover:shadow-sm transition-shadow cursor-pointer">
    <div className="w-10 h-10 rounded-xl bg-[#EFE6D2] text-[#2F6B4C] flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div>
      <p className="font-bold text-sm text-[#1F3A2E]">{title}</p>
      <p className="text-xs text-[#6B6357] mt-0.5">{desc}</p>
    </div>
  </div>
);

const LockedFeature = () => (
  <div className="bg-[#F8F4EC] border border-dashed border-[#1F3A2E]/15 rounded-xl p-6 text-center">
    <Lock size={20} className="mx-auto mb-2 text-[#6B6357]" />
    <p className="text-sm text-[#6B6357] mb-3">Fitur ini khusus member Prioritas</p>
    <Link
      to="/upgrade"
      className="text-sm font-bold text-[#2F6B4C] hover:underline"
    >
      Upgrade sekarang →
    </Link>
  </div>
);

export default CustomerDashboard;