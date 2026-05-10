const Dashboard = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Dr. Arya Pangestu</h2>
          <p className="text-emerald-600 mt-1 font-semibold">Welcome, Dokter Arya Pangestu! 🐶</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white p-2 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-2xl">
            <span>🔍</span>
            <input type="text" placeholder="Cari nama anabul..." className="bg-transparent outline-none text-sm w-48 font-medium" />
          </div>
          <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200 cursor-pointer hover:scale-105 transition-transform text-white">
            👤
          </div>
        </div>
      </div>

      {/* Statistik Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-100 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="text-4xl mb-4 bg-white/20 w-fit p-3 rounded-2xl">🐕</div>
            <p className="text-emerald-100 font-medium">Anabul Hari Ini</p>
            <h3 className="text-5xl font-black mt-2">08</h3>
          </div>
          <div className="absolute -right-4 -bottom-4 text-white/5 text-9xl font-black group-hover:scale-110 transition-transform">🐾</div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="text-4xl mb-4 bg-emerald-50 w-fit p-3 rounded-2xl">💉</div>
          <p className="text-slate-400 font-medium">Vaksinasi</p>
          <h3 className="text-5xl font-black text-slate-900 mt-2">15</h3>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="text-4xl mb-4 bg-orange-50 w-fit p-3 rounded-2xl text-orange-600">🩹</div>
          <p className="text-slate-400 font-medium">Rawat Inap</p>
          <h3 className="text-5xl font-black text-slate-900 mt-2">04</h3>
        </div>
      </div>

      {/* Antrian Terdekat */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span>🕒</span> Antrian Pasien Berikutnya
          </h3>
        </div>
        
        <div className="group flex items-center justify-between p-6 bg-emerald-50/30 rounded-3xl border border-emerald-100 hover:bg-emerald-50 hover:border-emerald-200 transition-all cursor-pointer">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-emerald-50 group-hover:bounce-subtle">🐱</div>
            <div>
              <p className="text-xl font-bold text-slate-900">Mochi (Kucing Persi)</p>
              <p className="text-sm text-emerald-600 font-bold uppercase tracking-tighter mt-0.5 italic">Owner: Bpk. Aryanugas • Vaksin F4</p>
            </div>
          </div>
          <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all hover:scale-105">
            Panggil Pasien
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;