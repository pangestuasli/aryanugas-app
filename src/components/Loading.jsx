import React from 'react';

// Loading Spinner (Default)
const Loading = ({ 
  size = "md", // sm, md, lg, xl
  color = "emerald",
  text = "",
  fullScreen = false,
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
    xl: "w-16 h-16 border-4",
  };

  const colorClasses = {
    emerald: "border-emerald-500 border-t-transparent",
    blue: "border-blue-500 border-t-transparent",
    red: "border-red-500 border-t-transparent",
    yellow: "border-yellow-500 border-t-transparent",
    purple: "border-purple-500 border-t-transparent",
    white: "border-white border-t-transparent",
    gray: "border-gray-500 border-t-transparent",
  };

  const spinner = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div 
        className={`
          ${sizeClasses[size]} 
          ${colorClasses[color]}
          rounded-full 
          animate-spin
        `}
      />
      {text && <p className="text-sm text-slate-500 font-medium">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

// Loading Skeleton untuk Table
export const TableSkeleton = ({ rows = 5, columns = 5 }) => {
  return (
    <div className="animate-pulse">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50">
            <tr>
              {Array(columns).fill().map((_, i) => (
                <th key={i} className="px-6 py-4">
                  <div className="h-3 bg-slate-200 rounded w-20"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {Array(rows).fill().map((_, i) => (
              <tr key={i}>
                {Array(columns).fill().map((_, j) => (
                  <td key={j} className="px-6 py-4">
                    <div className="h-4 bg-slate-100 rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Loading Skeleton untuk Card
export const CardSkeleton = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {Array(count).fill().map((_, i) => (
        <div key={i} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-50 animate-pulse">
          <div className="w-12 h-12 bg-slate-200 rounded-2xl mb-3"></div>
          <div className="h-7 bg-slate-200 rounded w-12 mb-2"></div>
          <div className="h-3 bg-slate-100 rounded w-20"></div>
        </div>
      ))}
    </div>
  );
};

// Loading Skeleton untuk Chart
export const ChartSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-50 animate-pulse">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="h-6 bg-slate-200 rounded w-32 mb-2"></div>
          <div className="h-3 bg-slate-100 rounded w-40"></div>
        </div>
        <div className="h-8 bg-slate-200 rounded w-24"></div>
      </div>
      <div className="h-64 bg-slate-100 rounded-2xl flex items-center justify-center">
        <div className="h-40 w-40 rounded-full border-4 border-slate-200 border-t-emerald-400 animate-spin"></div>
      </div>
    </div>
  );
};

// Loading Skeleton untuk Filter
export const FilterSkeleton = () => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-50 p-6 mb-6 animate-pulse">
      <div className="h-5 bg-slate-200 rounded w-32 mb-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array(4).fill().map((_, i) => (
          <div key={i}>
            <div className="h-3 bg-slate-200 rounded w-20 mb-2"></div>
            <div className="h-10 bg-slate-100 rounded-xl"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Loading Overlay untuk button/form
export const ButtonLoading = ({ text = "Memproses...", className = "" }) => {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {text}
    </div>
  );
};

// Loading Inline (untuk tombol)
export const InlineLoading = ({ size = "sm" }) => {
  const sizeClasses = {
    sm: "w-3 h-3 border-2",
    md: "w-4 h-4 border-2",
    lg: "w-5 h-5 border-3",
  };

  return (
    <div className={`${sizeClasses[size]} border-emerald-500 border-t-transparent rounded-full animate-spin`} />
  );
};

// Loading untuk Modal/Page Content
export const PageLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-emerald-200 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-500 font-medium">Memuat data...</p>
    </div>
  );
};

// Loading Skeleton untuk List Item
export const ListSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-4 animate-pulse">
      {Array(count).fill().map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100">
          <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-slate-200 rounded w-32 mb-2"></div>
            <div className="h-3 bg-slate-100 rounded w-48"></div>
          </div>
          <div className="w-20 h-8 bg-slate-200 rounded-lg"></div>
        </div>
      ))}
    </div>
  );
};

// Loading Skeleton untuk Form
export const FormSkeleton = ({ fields = 4 }) => {
  return (
    <div className="space-y-4 animate-pulse">
      {Array(fields).fill().map((_, i) => (
        <div key={i}>
          <div className="h-3 bg-slate-200 rounded w-24 mb-2"></div>
          <div className="h-10 bg-slate-100 rounded-xl"></div>
        </div>
      ))}
      <div className="flex justify-end gap-3">
        <div className="h-10 bg-slate-200 rounded-xl w-24"></div>
        <div className="h-10 bg-slate-200 rounded-xl w-24"></div>
      </div>
    </div>
  );
};

export default Loading;