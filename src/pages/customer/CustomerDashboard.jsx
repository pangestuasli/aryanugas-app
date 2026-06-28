import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Crown, Lock, Calendar, Heart, Bell, ArrowRight, Star, Gift } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { getTier, getTierProgress } from '../../lib/helpers';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State untuk data profil lama
  const [points, setPoints] = useState(0);
  const [membership, setMembership] = useState('standar');
  const [fullname, setFullname] = useState('Anabul Lover');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const username = sessionStorage.getItem('user');
    
    // Keamanan jika user belum login
    if (!username) {
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      // 1. Tarik profil dan poin dari tabel 'users'
      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();

      if (userData) {
        setPoints(userData.points || 0);
        setMembership(userData.membership || 'standar');
        setFullname(userData.fullname || 'Anabul Lover');
      }

      // 2. Tarik daftar anabul dari tabel 'patients' (menggunakan kolom owner lama)
      const { data: petsData } = await supabase
        .from('patients')
        .select('*')
        .eq('owner', username); // Versi lama pakai owner string

      setPets(petsData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const isPriority = membership === 'prioritas';
  const tier = getTier(points);
  const tierProgress = getTierProgress(points);

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
          {fullname}
        </h1>
      </div>

      {/* UPGRADE BANNER */}
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

      {/* POINTS & TIERING WIDGET */}
      <div className={`rounded-2xl p-5 mb-8 border ${tier.borderColor} ${tier.bgColor}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center shadow-sm">
              <Star size={24} className={tier.color} fill="currentColor" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#6B6357]">Member Tier</p>
              <h2 className={`text-xl font-bold ${tier.color}`}>{tier.name}</h2>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#6B6357]">Poin Anda</p>
            <p className="text-2xl font-bold text-[#1F3A2E]">{points}</p>
          </div>
        </div>

        {/* Progress Bar */}
        {tier.nextTier && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-[#6B6357] mb-1">
              <span>Progress ke {tier.nextTier}</span>
              <span>{tierProgress}%</span>
            </div>
            <div className="w-full h-2 bg-white/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2F6B4C] rounded-full transition-all duration-500"
                style={{ width: `${tierProgress}%` }}
              />
            </div>
            <p className="text-[10px] text-[#6B6357] mt-1">
              Butuh {tier.nextTierPoints - points} poin lagi untuk naik tier
            </p>
          </div>
        )}

        {/* Discount Info */}
        <div className="mt-4 flex items-center gap-2 bg-white/60 rounded-xl p-3">
          <Gift size={16} className="text-[#2F6B4C]" />
          <p className="text-sm font-semibold text-[#1F3A2E]">
            Diskon Layanan: {tier.discount}%
          </p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Link to="/member/booking" className="bg-white rounded-2xl border border-[#1F3A2E]/10 p-5 flex items-start gap-4 hover:shadow-sm transition-shadow cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-[#EFE6D2] text-[#2F6B4C] flex items-center justify-center flex-shrink-0">
            <Calendar size={20} />
          </div>
          <div>
            <p className="font-bold text-sm text-[#1F3A2E]">Booking Jadwal</p>
            <p className="text-xs text-[#6B6357] mt-0.5">Buat janji temu baru</p>
          </div>
        </Link>
        <Link to="/member/medical-history" className="bg-white rounded-2xl border border-[#1F3A2E]/10 p-5 flex items-start gap-4 hover:shadow-sm transition-shadow cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-[#EFE6D2] text-[#2F6B4C] flex items-center justify-center flex-shrink-0">
            <Heart size={20} />
          </div>
          <div>
            <p className="font-bold text-sm text-[#1F3A2E]">Riwayat Medis</p>
            <p className="text-xs text-[#6B6357] mt-0.5">{pets.length} anabul terdaftar</p>
          </div>
        </Link>
        <Link to="/member/feedback" className="bg-white rounded-2xl border border-[#1F3A2E]/10 p-5 flex items-start gap-4 hover:shadow-sm transition-shadow cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-[#EFE6D2] text-[#2F6B4C] flex items-center justify-center flex-shrink-0">
            <Bell size={20} />
          </div>
          <div>
            <p className="font-bold text-sm text-[#1F3A2E]">Feedback</p>
            <p className="text-xs text-[#6B6357] mt-0.5">Beri rating & ulasan</p>
          </div>
        </Link>
      </div>

      {/* FITUR PRIORITAS */}
      <div className="bg-white rounded-2xl border border-[#1F3A2E]/10 p-6 mb-8">
        <h2 className="font-bold text-[#1F3A2E] mb-4 flex items-center gap-2">
          <Crown size={16} className="text-[#9C732C]" />
          Konsultasi Chat dengan Dokter (24/7)
        </h2>

        {isPriority ? (
          <div className="bg-[#F8F4EC] rounded-xl p-6 text-center text-sm text-[#6B6357]">
            Fitur chat konsultasi aktif untukmu.
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
                  <p className="text-xs text-[#6B6357]">{pet.type || pet.species || '-'}</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#F8F4EC] text-[#1F3A2E]">
                  {pet.status || 'Terdaftar'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

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