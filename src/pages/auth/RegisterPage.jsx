import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('users')
      .insert([
        {
          fullname,
          username,
          password,
          role: 'customer'
        }
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert('Registrasi berhasil');

    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-5">
        Register
      </h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className="w-full border p-3 mb-3 rounded"
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-3 mb-3 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 mb-3 rounded"
        />

        <button
          type="submit"
          className="w-full bg-sky-500 text-white p-3 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;