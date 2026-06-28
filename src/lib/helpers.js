// src/lib/helpers.js
// Helper functions untuk Pet Clinic Management System

/**
 * Menghitung tier membership berdasarkan poin
 * @param {number} points - Jumlah poin member
 * @returns {object} - { name, color, bgColor, discount, nextTier, nextTierPoints }
 */
export const getTier = (points = 0) => {
  if (points > 1500) {
    return {
      name: 'Platinum',
      color: 'text-slate-700',
      bgColor: 'bg-gradient-to-r from-slate-200 to-slate-300',
      borderColor: 'border-slate-300',
      discount: 20,
      nextTier: null,
      nextTierPoints: null,
    };
  }
  if (points > 500) {
    return {
      name: 'Gold',
      color: 'text-yellow-700',
      bgColor: 'bg-gradient-to-r from-yellow-100 to-yellow-200',
      borderColor: 'border-yellow-300',
      discount: 15,
      nextTier: 'Platinum',
      nextTierPoints: 1501,
    };
  }
  if (points > 100) {
    return {
      name: 'Silver',
      color: 'text-gray-600',
      bgColor: 'bg-gradient-to-r from-gray-100 to-gray-200',
      borderColor: 'border-gray-300',
      discount: 10,
      nextTier: 'Gold',
      nextTierPoints: 501,
    };
  }
  return {
    name: 'Bronze',
    color: 'text-orange-700',
    bgColor: 'bg-gradient-to-r from-orange-100 to-orange-200',
    borderColor: 'border-orange-300',
    discount: 5,
    nextTier: 'Silver',
    nextTierPoints: 101,
  };
};

/**
 * Mengambil data user yang sedang login dari sessionStorage
 * (Backward compatibility - untuk halaman v1 yang belum di-migrate)
 * @returns {object} - { isLoggedIn, username, role, membership, full_name, user_id }
 */
export const getCurrentUser = () => {
  return {
    isLoggedIn: sessionStorage.getItem('isLoggedIn') === 'true',
    username: sessionStorage.getItem('user') || '',
    role: sessionStorage.getItem('role') || '',
    membership: sessionStorage.getItem('membership') || 'standar',
    full_name: sessionStorage.getItem('full_name') || '',
    user_id: sessionStorage.getItem('user_id') || '',
  };
};

/**
 * Konversi username ke email format untuk Supabase Auth
 * @param {string} username - Username yang dimasukkan user
 * @returns {string} - Email format username@petclinic.local
 */
export const getAuthEmail = (username) => {
  return `${username}@petclinic.local`;
};

/**
 * Cek apakah user yang login adalah admin
 * @returns {boolean}
 */
export const isAdmin = () => {
  return sessionStorage.getItem('role') === 'admin';
};

/**
 * Cek apakah user yang login adalah member/customer
 * @returns {boolean}
 */
export const isMember = () => {
  const role = sessionStorage.getItem('role');
  return role === 'member' || role === 'customer';
};

/**
 * Format tanggal ke format Indonesia
 * @param {string|Date} date - Tanggal yang akan diformat
 * @returns {string} - Tanggal dalam format "DD MMM YYYY"
 */
export const formatDate = (date) => {
  if (!date) return '-';
  const d = new Date(date);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

/**
 * Format tanggal dan waktu ke format Indonesia
 * @param {string|Date} date 
 * @returns {string} - "DD MMM YYYY, HH:MM WIB"
 */
export const formatDateTime = (date) => {
  if (!date) return '-';
  const d = new Date(date);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}, ${hours}:${minutes} WIB`;
};

/**
 * Hitung persentase progress ke tier berikutnya
 * @param {number} points - Poin saat ini
 * @returns {number} - Persentase 0-100
 */
export const getTierProgress = (points = 0) => {
  if (points > 1500) return 100;
  if (points > 500) return Math.round(((points - 500) / (1501 - 500)) * 100);
  if (points > 100) return Math.round(((points - 100) / (501 - 100)) * 100);
  return Math.round((points / 101) * 100);
};

/**
 * Generate warna badge berdasarkan status
 * @param {string} status 
 * @returns {string} - Tailwind classes
 */
export const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200/60',
    confirmed: 'bg-blue-50 text-blue-700 border-blue-200/60',
    completed: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    cancelled: 'bg-red-50 text-red-700 border-red-200/60',
    Antri: 'bg-amber-50 text-amber-700 border-amber-200/60',
    Perawatan: 'bg-blue-50 text-blue-700 border-blue-200/60',
    Selesai: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
  };
  return colors[status] || 'bg-slate-50 text-slate-700 border-slate-200/60';
};
