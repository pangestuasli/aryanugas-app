import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Password dan konfirmasi password tidak cocok.');
      return;
    }

    setLoading(true);

    // KEMBALI KE SISTEM LAMA: Memasukkan data langsung ke tabel 'users'
    const { error } = await supabase.from('users').insert([
      {
        fullname,
        username,
        password,
        role: 'customer',
        membership: 'standar'
      },
    ]);

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    setSuccessMsg('Registrasi berhasil! Mengarahkan ke halaman login…');
    setTimeout(() => navigate('/login'), 1200);
  };

  return (
    <>
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-[#1F3A2E]"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          Buat Akun Baru
        </h1>
        <p className="text-slate-400 mt-2">
          Daftar untuk mulai mengelola kesehatan anabul Anda
        </p>
      </div>

      {errorMsg && (
        <div className="mb-5 text-sm text-[#9C3B23] bg-[#C1693C]/10 border border-[#C1693C]/30 rounded-lg px-4 py-3">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="mb-5 text-sm text-[#1F3A2E] bg-[#2F6B4C]/10 border border-[#2F6B4C]/30 rounded-lg px-4 py-3">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleRegister}>
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Nama Lengkap
          </label>
          <input
            type="text"
            placeholder="Masukkan nama lengkap"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6B4C] focus:border-transparent transition-all"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Username
          </label>
          <input
            type="text"
            placeholder="Masukkan username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6B4C] focus:border-transparent transition-all"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Buat password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6B4C] focus:border-transparent transition-all"
            required
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Konfirmasi Password
          </label>
          <input
            type="password"
            placeholder="Ulangi password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6B4C] focus:border-transparent transition-all"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold text-white bg-[#2F6B4C] hover:bg-[#1F3A2E] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Mendaftarkan…' : 'Register'}
        </button>
      </form>

      <p className="text-center mt-8 text-slate-500">
        Sudah punya akun?{' '}
        <Link to="/login" className="text-[#2F6B4C] font-semibold hover:underline">
          Masuk di sini
        </Link>
      </p>
    </>
  );
};

export default RegisterPage;