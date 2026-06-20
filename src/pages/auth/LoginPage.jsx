import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const EyeIcon = ({ open }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    {open ? (
      <>
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a18.5 18.5 0 0 1 4.06-4.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const usernameRef = useRef(null);

  useEffect(() => {
    if (usernameRef.current) usernameRef.current.focus();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

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

    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('user', data.username);
    sessionStorage.setItem('role', data.role);

    navigate('/dashboard');
  };

  return (
    <>
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-[#1F3A2E]"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
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
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Username
          </label>
          <input
            ref={usernameRef}
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
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6B4C] focus:border-transparent transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#2F6B4C]"
              aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-slate-300 text-[#2F6B4C] focus:ring-[#2F6B4C]"
            />
            <span className="text-sm text-slate-600">Ingat perangkat ini</span>
          </label>

          <button
            type="button"
            className="text-sm font-semibold text-[#2F6B4C] hover:underline"
          >
            Lupa Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold text-white bg-[#2F6B4C] hover:bg-[#1F3A2E] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Memproses…' : 'Sign In'}
        </button>
      </form>

      <p className="text-center mt-8 text-slate-500">
        Baru di Arya Pet Care?{' '}
        <Link to="/register" className="text-[#2F6B4C] font-semibold hover:underline">
          Buat akun
        </Link>
      </p>
    </>
  );
};

export default LoginPage;