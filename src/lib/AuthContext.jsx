// src/lib/AuthContext.jsx
// AuthContext - State management untuk Supabase Auth
// Menggantikan sessionStorage-based auth dari v1

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);          // Supabase user object
  const [profile, setProfile] = useState(null);     // Row from profiles table
  const [role, setRole] = useState(null);           // 'admin' | 'member' | null
  const [loading, setLoading] = useState(true);     // Initial auth check

  // Fetch profile dari tabel profiles berdasarkan user ID
  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Gagal fetch profile:', error.message);
        return null;
      }
      return data;
    } catch (err) {
      console.error('Error fetch profile:', err);
      return null;
    }
  };

  // Sync data ke sessionStorage (backward compatibility untuk halaman v1)
  const syncToSessionStorage = (supabaseUser, profileData) => {
    if (supabaseUser && profileData) {
      sessionStorage.setItem('isLoggedIn', 'true');
      // Extract username dari email (email format: username@petclinic.local)
      const email = supabaseUser.email || '';
      const username = email.replace('@petclinic.com', '');
      sessionStorage.setItem('user', username);
      sessionStorage.setItem('role', profileData.role || 'member');
      sessionStorage.setItem('membership', 'standar'); // Default, bisa diupdate nanti
      sessionStorage.setItem('full_name', profileData.full_name || '');
      sessionStorage.setItem('user_id', supabaseUser.id);
    }
  };

  const clearSessionStorage = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('membership');
    sessionStorage.removeItem('full_name');
    sessionStorage.removeItem('user_id');
  };

  // Listen ke perubahan auth state Supabase
  useEffect(() => {
    // Cek session saat mount
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
        const profileData = await fetchProfile(session.user.id);
        setProfile(profileData);
        setRole(profileData?.role || 'member');
        syncToSessionStorage(session.user, profileData);
      } else {
        setUser(null);
        setProfile(null);
        setRole(null);
        clearSessionStorage();
      }
      setLoading(false);
    };

    checkSession();

    // Subscribe ke auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          const profileData = await fetchProfile(session.user.id);
          setProfile(profileData);
          setRole(profileData?.role || 'member');
          syncToSessionStorage(session.user, profileData);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
          setRole(null);
          clearSessionStorage();
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Fungsi logout
  const logout = async () => {
    await supabase.auth.signOut();
    clearSessionStorage();
    setUser(null);
    setProfile(null);
    setRole(null);
  };

  // Helper: cek apakah user adalah admin
  const isAdmin = () => role === 'admin';

  // Helper: cek apakah user adalah member
  const isMember = () => role === 'member';

  const value = {
    user,           // Supabase user object (null jika belum login)
    profile,        // Profile data dari tabel profiles
    role,           // 'admin' | 'member' | null
    loading,        // Boolean - true saat initial auth check
    logout,         // Function - panggil untuk logout
    isAdmin,        // Function - cek apakah admin
    isMember,       // Function - cek apakah member
    isAuthenticated: !!user, // Boolean - apakah sudah login
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook untuk menggunakan AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
