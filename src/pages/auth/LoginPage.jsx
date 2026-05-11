import React from 'react';
import AuthLayout from "../../layouts/AuthLayout";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Mencegah reload halaman
    const adminUser = {
      user: 'admin',
      pass: '12345'
    };

    if (username === adminUser.user && password === adminUser.pass) {
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('user', username);
      navigate('/');
    } else {
      alert('Username atau Password salah! (Coba: admin/12345)');
    }
  };
    
  return (
    <AuthLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Welcome to Arya Pet Care</h1>
        <p className="text-slate-400 mt-2">Welcome to Arya Pet Care</p>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button className="flex items-center justify-center gap-2 border border-slate-200 py-3 rounded-lg hover:bg-slate-50 transition-colors">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
          <span className="font-medium">Google</span>
        </button>
        <button className="flex items-center justify-center gap-2 border border-slate-200 py-3 rounded-lg hover:bg-slate-50 transition-colors">
          <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5" alt="Facebook" />
          <span className="font-medium">Facebook</span>
        </button>
      </div>

      <div className="relative flex items-center mb-8">
        <div className="flex-grow border-t border-slate-200"></div>
        <span className="flex-shrink mx-4 text-slate-400 text-sm">or sign in with</span>
        <div className="flex-grow border-t border-slate-200"></div>
      </div>

      {/* --- PERBAIKAN DI SINI: Tambahkan onSubmit --- */}
      <form onSubmit={handleLogin}>
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
          <input 
            type="text" 
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
          <input 
            type="password" 
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="flex items-center justify-between mb-8">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-500" />
            <span className="text-sm text-slate-600">Remember this Device</span>
          </label>
          <a href="#" className="text-sm font-semibold text-sky-500 hover:underline">Forgot Password ?</a>
        </div>

        <button 
          type="submit" 
          className="w-full bg-[#0ea5e9] text-white font-bold py-3 rounded-lg hover:bg-[#0284c7] transition-all shadow-lg shadow-sky-200"
        >
          Sign In
        </button>
      </form>

      <p className="text-center mt-8 text-slate-500">
        New to Dashnext? <a href="/" className="text-sky-500 font-semibold hover:underline">Create an account</a>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;