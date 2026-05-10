import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
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
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F0FDF4] p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-10 border border-emerald-50">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🐾</div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">VETCARE</h1>
          <p className="text-emerald-600 font-bold text-xs tracking-widest uppercase mt-1 italic">Login</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Username</label>
            <input 
              type="text" 
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
            <input 
              type="password" 
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl shadow-lg transition-all active:scale-95"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;