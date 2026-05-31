import React from 'react';

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  disabled = false,
  readOnly = false,
  icon,
  iconPosition = "left",
  className = "",
  containerClassName = "",
  labelClassName = "",
  inputClassName = "",
  helperText,
  size = "md", // sm, md, lg
  fullWidth = true,
}) => {
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
  };

  const baseInputStyles = `
    rounded-xl
    bg-slate-50
    border
    outline-none
    transition-all
    duration-200
    focus:ring-2
    focus:ring-emerald-500/20
    focus:border-emerald-500
    disabled:bg-slate-100
    disabled:cursor-not-allowed
    disabled:text-slate-400
    read-only:bg-slate-100
    read-only:cursor-default
    ${sizeStyles[size]}
    ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-emerald-500'}
    ${fullWidth ? 'w-full' : ''}
    ${icon && iconPosition === 'left' ? 'pl-10' : ''}
    ${icon && iconPosition === 'right' ? 'pr-10' : ''}
    ${inputClassName}
  `;

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${containerClassName}`}>
      {label && (
        <label className={`block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider ${labelClassName}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {typeof icon === 'string' ? <span className="text-base">{icon}</span> : icon}
          </div>
        )}
        
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          className={baseInputStyles}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {typeof icon === 'string' ? <span className="text-base">{icon}</span> : icon}
          </div>
        )}
      </div>
      
      {helperText && !error && (
        <p className="text-[10px] text-slate-400 mt-1 ml-1">{helperText}</p>
      )}
      
      {error && (
        <p className="text-[10px] text-red-500 mt-1 ml-1 flex items-center gap-1">
          <span>⚠️</span> {error}
        </p>
      )}
    </div>
  );
};

// Input dengan Textarea
export const Textarea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  rows = 3,
  className = "",
  labelClassName = "",
  fullWidth = true,
}) => {
  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className={`block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider ${labelClassName}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        className={`
          w-full
          rounded-xl
          bg-slate-50
          border
          outline-none
          transition-all
          duration-200
          focus:ring-2
          focus:ring-emerald-500/20
          focus:border-emerald-500
          disabled:bg-slate-100
          disabled:cursor-not-allowed
          px-4
          py-2.5
          text-sm
          resize-none
          ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-emerald-500'}
          ${className}
        `}
      />
      {error && (
        <p className="text-[10px] text-red-500 mt-1 ml-1">{error}</p>
      )}
    </div>
  );
};

// Input untuk Search
export const SearchInput = ({ value, onChange, placeholder = "Cari...", className = "" }) => {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          bg-slate-100
          border-none
          rounded-xl
          py-2
          pl-10
          pr-4
          w-64
          focus:ring-2
          focus:ring-emerald-500
          outline-none
          text-sm
          ${className}
        `}
      />
    </div>
  );
};

export default Input;