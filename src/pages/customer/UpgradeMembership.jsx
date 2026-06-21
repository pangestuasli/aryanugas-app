import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Crown, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const priorityPerks = [
  'Booking tanpa antre — slot prioritas tiap kunjungan',
  'Konsultasi chat dengan dokter, 24/7',
  'Diskon 15% untuk vaksinasi & grooming',
  'Rekam medis lengkap & pengingat otomatis',
  'Home visit gratis, 2x setahun',
  'Kartu anggota digital + fisik bertanda gold',
];

const UpgradeMembership = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleUpgrade = async () => {
    setLoading(true);
    setErrorMsg('');
    const username = sessionStorage.getItem('user');

    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 1);

    const { error } = await supabase
      .from('users')
      .update({
        membership: 'prioritas',
        membership_expires_at: expiresAt.toISOString(),
      })
      .eq('username', username);

    setLoading(false);

    if (error) {
      setErrorMsg('Gagal upgrade: ' + error.message);
      return;
    }

    sessionStorage.setItem('membership', 'prioritas');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8F4EC] flex items-center justify-center p-6">
      <div className="max-w-lg w-full">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6B6357] hover:text-[#1F3A2E] mb-4"
        >
          <ArrowLeft size={15} /> Kembali ke dashboard
        </Link>

        <div className="bg-[#1F3A2E] text-[#F8F4EC] rounded-2xl p-8 relative overflow-hidden">
          <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide bg-[#9C732C]/20 text-[#EFE0BC] px-3 py-1 rounded-full mb-4">
            <Crown size={13} /> Prioritas
          </span>
          <h1
            className="text-2xl font-bold mb-1"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            Upgrade ke VetCare Prioritas
          </h1>
          <p className="text-sm opacity-70 mb-6">
            Rp99.000 / bulan — simulasi, tanpa pembayaran sungguhan
          </p>

          {errorMsg && (
            <div className="mb-4 text-sm bg-red-500/15 border border-red-400/30 text-red-200 rounded-lg px-4 py-3">
              {errorMsg}
            </div>
          )}

          <ul className="mb-8 space-y-2.5">
            {priorityPerks.map((perk) => (
              <li key={perk} className="flex gap-2 text-sm">
                <Check size={16} className="text-[#EFE0BC] flex-shrink-0 mt-0.5" />
                {perk}
              </li>
            ))}
          </ul>

          {!confirming ? (
            <button
              onClick={() => setConfirming(true)}
              className="w-full py-3 rounded-lg font-bold bg-[#9C732C] text-[#1F3A2E] flex items-center justify-center gap-2 hover:bg-[#EFE0BC] transition-colors"
            >
              Upgrade Sekarang <ArrowRight size={16} />
            </button>
          ) : (
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm mb-4">
                Konfirmasi: akun kamu akan diupgrade jadi Prioritas selama 1 bulan
                (simulasi).
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setConfirming(false)}
                  className="flex-1 py-2.5 rounded-lg border border-white/30 text-sm font-semibold hover:bg-white/5"
                >
                  Batal
                </button>
                <button
                  onClick={handleUpgrade}
                  disabled={loading}
                  className="flex-1 py-2.5 rounded-lg bg-[#9C732C] text-[#1F3A2E] text-sm font-bold disabled:opacity-60"
                >
                  {loading ? 'Memproses…' : 'Ya, Upgrade'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpgradeMembership;