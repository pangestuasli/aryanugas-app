import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/Button';
import { supabase } from '../../lib/supabase';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const usernameRef = useRef(null);
  useEffect(() => {
    if (usernameRef.current)
    usernameRef.current.focus();
  }, []);

  const handleLogin = async (e) => {
  e.preventDefault();

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .eq('password', password)
    .single();

  if (error || !data) {
    alert('Username atau Password salah!');
    return;
  }

  sessionStorage.setItem('isLoggedIn', 'true');
  sessionStorage.setItem('user', data.username);
  sessionStorage.setItem('role', data.role);

  navigate('/');
};

  return (
  <>
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-slate-800">
        Welcome to Arya Pet Care
      </h1>

      <p className="text-slate-400 mt-2">
        Login untuk melanjutkan ke sistem Arya Pet Care
      </p>
    </div>

    <form onSubmit={handleLogin}>
      <div className="mb-5">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Username
        </label>

        <input
          ref={usernameRef}
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
          required
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Password
        </label>

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
          required
        />
      </div>

      <div className="flex items-center justify-between mb-8">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-500"
          />

          <span className="text-sm text-slate-600">
            Remember this Device
          </span>
        </label>

        <button
          type="button"
          className="text-sm font-semibold text-sky-500 hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      <Button type="login" className="w-full py-3">
        Sign In
      </Button>
    </form>

    <p className="text-center mt-8 text-slate-500">
      New to Arya Pet Care?{' '}
      <Link
        to="/register"
        className="text-sky-500 font-semibold hover:underline"
      >
        Create an account
      </Link>
    </p>
  </>
);
};

export default LoginPage;