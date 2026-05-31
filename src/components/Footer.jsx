import React from 'react';

const Footer = ({ 
  clinicName = "Klinik Arya Pangestu",
  year = new Date().getFullYear(),
  phone = "(021) kapan kita berjumpa",
  email = "arya@gmail.com",
  version = "2.0.1",
  showLinks = true,
  simple = false 
}) => {
  
  // Versi sederhana
  if (simple) {
    return (
      <footer className="mt-8 pt-6 text-center border-t border-slate-100">
        <p className="text-xs text-slate-400">
          © {year} {clinicName} — All rights reserved
        </p>
        <p className="text-[10px] text-slate-300 mt-1">
          📞 {phone} | ✉️ {email}
        </p>
      </footer>
    );
  }

  // Versi lengkap dengan links
  return (
    <footer className="mt-8 pt-6 border-t border-slate-100">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center">
            <span className="text-white text-sm">🐾</span>
          </div>
          <p className="text-xs text-slate-400">
            © {year} {clinicName}. All rights reserved.
          </p>
        </div>
        
        {showLinks && (
          <div className="flex gap-6">
            <a href="#" className="text-[11px] text-slate-400 hover:text-emerald-500 transition-colors font-medium">
              Kebijakan Privasi
            </a>
            <a href="#" className="text-[11px] text-slate-400 hover:text-emerald-500 transition-colors font-medium">
              Syarat & Ketentuan
            </a>
            <a href="#" className="text-[11px] text-slate-400 hover:text-emerald-500 transition-colors font-medium">
              Bantuan
            </a>
          </div>
        )}
        
        <div className="flex gap-3">
          <span className="text-[11px] text-slate-400">📞 {phone}</span>
          <span className="text-[11px] text-slate-400">✉️ {email}</span>
        </div>
      </div>
      
      <div className="text-center mt-4 pt-3 border-t border-slate-50">
        <p className="text-[10px] text-slate-300">
          Versi {version} | Last updated: {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
        </p>
      </div>
    </footer>
  );
};

export default Footer;