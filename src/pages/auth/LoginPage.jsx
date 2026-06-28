import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    // KEMBALI KE SISTEM LAMA: Mengecek data langsung dari tabel 'users'
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();

    if (error || !data) {
      setErrorMsg('Username atau password salah. Coba lagi.');
      setLoading(false);
      return;
    }

    // Simpan data di sessionStorage seperti sistem lama
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('user', data.username);
    sessionStorage.setItem('role', data.role);
    sessionStorage.setItem('membership', data.membership || 'standar');
    sessionStorage.setItem('full_name', data.fullname);
    
    setLoading(false);
    if (data.role === 'admin' || data.role === 'dokter' || data.role === 'doctor') {
      navigate('/admin/dashboard'); // Arahkan Admin ke jalurnya
    } else {
      navigate('/dashboard');
    }

    
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1F3A2E]" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
          Selamat Datang Kembali
        </h1>
        <p className="text-slate-400 mt-2">
          Masuk untuk melanjutkan ke sistem Arya Pet Care
        </p>
      </div>

      {errorMsg && (
        <div className="mb-5 text-sm text-[#9C3B23] bg-[#C1693C]/10 border border-[#C1693C]/30 rounded-lg px-4 py-3">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
          <input
            type="text"
            placeholder="Masukkan username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6B4C]"
            required
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
          <input
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6B4C]"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold text-white bg-[#2F6B4C] hover:bg-[#1F3A2E] transition-colors"
        >
          {loading ? 'Memproses...' : 'Sign In'}
        </button>
      </form>

      <p className="text-center mt-8 text-slate-500">
        Baru di Arya Pet Care? <Link to="/register" className="text-[#2F6B4C] font-semibold hover:underline">Buat akun</Link>
      </p>
    </>
  );
};

export default LoginPage;