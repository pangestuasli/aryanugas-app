const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full h-full">
      <div className="relative flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-emerald-50 rounded-full"></div>
        <div className="absolute w-20 h-20 border-4 border-transparent border-t-emerald-600 rounded-full animate-spin"></div>
        <span className="absolute text-2xl animate-bounce">🐱</span>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-2xl font-black text-emerald-900 tracking-tighter">VETCARE</p>
        <p className="text-sm text-emerald-600/70 font-bold uppercase tracking-[0.2em]">
          Menyiapkan Rekam Medis Anabul... 🐾
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;