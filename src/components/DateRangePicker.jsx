import React, { useState, useRef, useEffect } from 'react';

const DateRangePicker = ({
  startDate,
  endDate,
  onChange,
  placeholder = "Pilih tanggal",
  label,
  error,
  required = false,
  disabled = false,
  size = "md",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tempStart, setTempStart] = useState(startDate ? new Date(startDate) : null);
  const [tempEnd, setTempEnd] = useState(endDate ? new Date(endDate) : null);
  const pickerRef = useRef(null);

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
  };

  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (date) => {
    if (!date) return '';
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const getDisplayText = () => {
    if (startDate && endDate) {
      return `${formatDate(new Date(startDate))} - ${formatDate(new Date(endDate))}`;
    }
    if (startDate) {
      return `${formatDate(new Date(startDate))} - ...`;
    }
    return placeholder;
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isSelected = (date) => {
    if (tempStart && date.toDateString() === tempStart.toDateString()) return true;
    if (tempEnd && date.toDateString() === tempEnd.toDateString()) return true;
    return false;
  };

  const isInRange = (date) => {
    if (!tempStart || !tempEnd) return false;
    return date >= tempStart && date <= tempEnd;
  };

  const handleDateClick = (date) => {
    if (!tempStart || (tempStart && tempEnd)) {
      setTempStart(date);
      setTempEnd(null);
    } else {
      let start = tempStart;
      let end = date;
      if (start > end) {
        start = date;
        end = tempStart;
      }
      setTempStart(start);
      setTempEnd(end);
      onChange({ startDate: start, endDate: end });
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setTempStart(null);
    setTempEnd(null);
    onChange({ startDate: null, endDate: null });
    setIsOpen(false);
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const calendarDays = [];
    
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-10 w-10" />);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = new Date().toDateString() === date.toDateString();
      const selected = isSelected(date);
      const inRange = isInRange(date);
      
      let bgClass = '';
      if (selected) bgClass = 'bg-emerald-500 text-white';
      else if (inRange) bgClass = 'bg-emerald-100';
      else bgClass = 'hover:bg-emerald-100';
      
      calendarDays.push(
        <button
          key={day}
          onClick={() => handleDateClick(date)}
          className={`
            h-10 w-10 rounded-lg text-sm font-medium
            transition-all duration-200
            ${bgClass}
            ${isToday && !selected ? 'ring-1 ring-emerald-500' : ''}
          `}
        >
          {day}
        </button>
      );
    }
    
    return calendarDays;
  };

  const quickOptions = [
    { label: 'Hari Ini', getValue: () => {
      const today = new Date();
      return { startDate: today, endDate: today };
    }},
    { label: '7 Hari Terakhir', getValue: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 6);
      return { startDate: start, endDate: end };
    }},
    { label: '30 Hari Terakhir', getValue: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 29);
      return { startDate: start, endDate: end };
    }},
    { label: 'Bulan Ini', getValue: () => {
      const start = new Date();
      start.setDate(1);
      const end = new Date();
      return { startDate: start, endDate: end };
    }},
  ];

  return (
    <div className="relative" ref={pickerRef}>
      {label && (
        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          relative rounded-xl bg-slate-50 border border-slate-200
          outline-none transition-all duration-200 cursor-pointer
          flex items-center justify-between
          ${sizeStyles[size]}
          ${disabled ? 'bg-slate-100 cursor-not-allowed opacity-60' : 'hover:border-slate-300'}
          ${isOpen ? 'ring-2 ring-emerald-500/20 border-emerald-500' : ''}
          ${error ? 'border-red-400' : ''}
          ${className}
        `}
      >
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className={`text-sm ${!startDate ? 'text-slate-400' : 'text-slate-700'}`}>
            {getDisplayText()}
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          {(startDate || endDate) && !disabled && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="p-0.5 hover:bg-slate-200 rounded-full transition-colors"
            >
              <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <svg className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {error && (
        <p className="text-[10px] text-red-500 mt-1 ml-1">{error}</p>
      )}
      
      {isOpen && !disabled && (
        <div className="absolute z-50 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden w-[500px]">
          <div className="flex">
            {/* Quick Options */}
            <div className="w-32 border-r border-slate-100 p-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Cepat Pilih
              </p>
              <div className="space-y-1">
                {quickOptions.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const { startDate, endDate } = option.getValue();
                      setTempStart(startDate);
                      setTempEnd(endDate);
                      onChange({ startDate, endDate });
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-2 py-1.5 text-xs text-slate-600 hover:bg-emerald-50 rounded-lg transition-colors"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Calendar */}
            <div className="flex-1 p-4">
              {/* Month Navigation */}
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={handlePrevMonth}
                  className="p-1 hover:bg-slate-100 rounded-lg"
                >
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-sm font-bold text-slate-700">
                  {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
                <button
                  onClick={handleNextMonth}
                  className="p-1 hover:bg-slate-100 rounded-lg"
                >
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {days.map(day => (
                  <div key={day} className="h-10 w-10 flex items-center justify-center text-[10px] font-bold text-slate-400">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {renderCalendar()}
              </div>
              
              {/* Footer */}
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={handleClear}
                  className="text-xs text-slate-500 hover:text-red-500"
                >
                  Hapus
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1.5 text-xs font-semibold bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;