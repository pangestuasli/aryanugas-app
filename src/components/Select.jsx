import React, { useState, useRef, useEffect } from 'react';

const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Pilih...",
  error,
  required = false,
  disabled = false,
  icon,
  className = "",
  containerClassName = "",
  labelClassName = "",
  size = "md", // sm, md, lg
  fullWidth = true,
  clearable = false,
  searchable = false,
  onSearch,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef(null);

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
  };

  const selectedOption = options.find(opt => opt.value === value);
  const displayValue = selectedOption ? selectedOption.label : placeholder;

  // Filter options berdasarkan search
  const filteredOptions = searchable && searchTerm
    ? options.filter(opt => 
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange({ target: { name, value: option.value } });
    setIsOpen(false);
    setSearchTerm("");
    if (onSearch) onSearch("");
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange({ target: { name, value: "" } });
  };

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${containerClassName}`} ref={selectRef}>
      {label && (
        <label className={`block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider ${labelClassName}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {/* Select Trigger */}
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`
            relative
            rounded-xl
            bg-slate-50
            border
            outline-none
            transition-all
            duration-200
            cursor-pointer
            flex
            items-center
            justify-between
            ${sizeStyles[size]}
            ${error ? 'border-red-400' : 'border-slate-200'}
            ${disabled ? 'bg-slate-100 cursor-not-allowed opacity-60' : 'hover:border-slate-300'}
            ${isOpen ? 'ring-2 ring-emerald-500/20 border-emerald-500' : ''}
            ${fullWidth ? 'w-full' : ''}
            ${className}
          `}
        >
          <div className="flex items-center gap-2">
            {icon && (
              <span className="text-slate-400">
                {typeof icon === 'string' ? icon : icon}
              </span>
            )}
            <span className={`${!value ? 'text-slate-400' : 'text-slate-700'} text-sm`}>
              {displayValue}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            {clearable && value && !disabled && (
              <button
                onClick={handleClear}
                className="p-0.5 hover:bg-slate-200 rounded-full transition-colors"
              >
                <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <svg
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Dropdown Options */}
        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
            {/* Search Input */}
            {searchable && (
              <div className="p-2 border-b border-slate-100">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    onSearch && onSearch(e.target.value);
                  }}
                  placeholder="Cari..."
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-center text-xs text-slate-400">
                  Tidak ada data
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option)}
                    className={`
                      px-4 py-2.5
                      text-sm
                      cursor-pointer
                      transition-colors
                      hover:bg-emerald-50
                      flex
                      items-center
                      justify-between
                      ${value === option.value ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700'}
                    `}
                  >
                    <div className="flex items-center gap-2">
                      {option.icon && (
                        <span className="text-base">{option.icon}</span>
                      )}
                      <span>{option.label}</span>
                    </div>
                    {value === option.value && (
                      <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-[10px] text-red-500 mt-1 ml-1 flex items-center gap-1">
          <span>⚠️</span> {error}
        </p>
      )}
    </div>
  );
};

// Select dengan Group Options
export const SelectGroup = ({
  label,
  name,
  value,
  onChange,
  groups = [],
  placeholder = "Pilih...",
  error,
  required = false,
  disabled = false,
  size = "md",
  fullWidth = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // Flatten options untuk mencari selected
  const allOptions = groups.flatMap(group => group.options);
  const selectedOption = allOptions.find(opt => opt.value === value);
  const displayValue = selectedOption ? selectedOption.label : placeholder;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
  };

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`} ref={selectRef}>
      {label && (
        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`
            relative rounded-xl bg-slate-50 border border-slate-200
            outline-none transition-all duration-200 cursor-pointer
            flex items-center justify-between
            ${sizeStyles[size]}
            ${disabled ? 'bg-slate-100 cursor-not-allowed opacity-60' : 'hover:border-slate-300'}
            ${isOpen ? 'ring-2 ring-emerald-500/20 border-emerald-500' : ''}
            ${fullWidth ? 'w-full' : ''}
          `}
        >
          <span className={`${!value ? 'text-slate-400' : 'text-slate-700'} text-sm`}>
            {displayValue}
          </span>
          <svg className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
            <div className="max-h-60 overflow-y-auto">
              {groups.map((group, idx) => (
                <div key={idx}>
                  <div className="px-4 py-2 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {group.label}
                  </div>
                  {group.options.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        onChange({ target: { name, value: option.value } });
                        setIsOpen(false);
                      }}
                      className={`
                        px-4 py-2.5 text-sm cursor-pointer transition-colors
                        hover:bg-emerald-50 flex items-center justify-between
                        ${value === option.value ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700'}
                      `}
                    >
                      <div className="flex items-center gap-2">
                        {option.icon && <span>{option.icon}</span>}
                        <span>{option.label}</span>
                      </div>
                      {value === option.value && (
                        <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-[10px] text-red-500 mt-1 ml-1">{error}</p>
      )}
    </div>
  );
};

export default Select;