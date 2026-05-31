import React from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from './Badge';

const Table = ({ data, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          <tr>
            <th className="px-6 py-4">Nama Obat</th>
            <th className="px-6 py-4">Kategori</th>
            <th className="px-6 py-4">Jumlah Stok</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {data.map((item) => (
            <tr 
              key={item.id} 
              className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
              onClick={() => navigate(`/medicines/${item.id}`)}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105`}>
                    <span className="text-lg">💊</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 leading-none">{item.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">ID: #MED-{item.id}</p>
                  </div>
                </div>
               </td>
              <td className="px-6 py-4">
                <p className="text-xs font-semibold text-slate-600">{item.category}</p>
               </td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-slate-700">{item.stock}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">{item.unit}</p>
                </div>
               </td>
              <td className="px-6 py-4">
                <Badge type={item.status === "Tersedia" ? "success" : item.status === "Menipis" ? "warning" : "danger"}>
                  {item.status}
                </Badge>
               </td>
              <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => onEdit && onEdit(item)}
                    className="p-2 hover:bg-emerald-50 text-emerald-500 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button 
                    onClick={() => onDelete && onDelete(item)}
                    className="p-2 hover:bg-red-50 text-red-400 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
               </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;