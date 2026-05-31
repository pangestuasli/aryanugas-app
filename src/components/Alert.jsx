import React, { useState, useEffect } from 'react';

const Alert = ({ 
  type = "info", // info, success, warning, error
  title,
  message,
  show = true,
  onClose,
  autoClose = false,
  autoCloseTime = 5000,
  closable = true,
  icon = true,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseTime);
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseTime, isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  const styles = {
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
      iconSvg: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    success: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-800",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-500",
      iconSvg: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    warning: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      text: "text-orange-800",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
      iconSvg: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
      iconSvg: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  };

  const currentStyle = styles[type];

  return (
    <div className={`${currentStyle.bg} ${currentStyle.border} border rounded-xl p-4 ${className} animate-in slide-in-from-top-2 fade-in duration-300`}>
      <div className="flex items-start gap-3">
        {icon && (
          <div className={`${currentStyle.iconBg} rounded-lg p-1.5 ${currentStyle.iconColor}`}>
            {currentStyle.iconSvg}
          </div>
        )}
        <div className="flex-1">
          {title && (
            <h4 className={`text-sm font-bold ${currentStyle.text} mb-1`}>{title}</h4>
          )}
          <p className={`text-xs ${currentStyle.text} opacity-90`}>{message}</p>
        </div>
        {closable && (
          <button
            onClick={handleClose}
            className={`p-1 rounded-lg hover:bg-white/50 transition-colors ${currentStyle.text}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

// Alert Container untuk multiple alerts (toast style)
export const AlertContainer = ({ alerts, onRemove, position = "top-right" }) => {
  const positions = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  };

  return (
    <div className={`fixed z-50 ${positions[position]} space-y-2 min-w-[320px] max-w-md`}>
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          type={alert.type}
          title={alert.title}
          message={alert.message}
          show={true}
          onClose={() => onRemove(alert.id)}
          autoClose={alert.autoClose !== false}
          autoCloseTime={alert.autoCloseTime || 5000}
          closable={true}
        />
      ))}
    </div>
  );
};

// Custom Hook untuk manage alerts
export const useAlert = () => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (type, title, message, options = {}) => {
    const id = Date.now();
    const newAlert = {
      id,
      type,
      title,
      message,
      autoClose: options.autoClose !== false,
      autoCloseTime: options.autoCloseTime || 5000,
    };
    setAlerts((prev) => [...prev, newAlert]);
    return id;
  };

  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const clearAll = () => {
    setAlerts([]);
  };

  // Shorthand methods
  const success = (title, message, options) => addAlert('success', title, message, options);
  const error = (title, message, options) => addAlert('error', title, message, options);
  const warning = (title, message, options) => addAlert('warning', title, message, options);
  const info = (title, message, options) => addAlert('info', title, message, options);

  return {
    alerts,
    addAlert,
    removeAlert,
    clearAll,
    success,
    error,
    warning,
    info,
  };
};

export default Alert;