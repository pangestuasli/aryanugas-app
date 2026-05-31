import React, { useEffect, useRef } from 'react';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md", // sm, md, lg, xl, full
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showFooter = true,
  footerActions,
  confirmText = "Konfirmasi",
  cancelText = "Batal",
  onConfirm,
  onCancel,
  loading = false,
  className = "",
  overlayClassName = "",
}) => {
  const modalRef = useRef(null);

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[90vw] w-full",
  };

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (closeOnEsc && e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [closeOnEsc, isOpen, onClose]);

  // Prevent body scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={`
          bg-white rounded-2xl shadow-2xl 
          w-full ${sizeClasses[size]} 
          mx-4 animate-in zoom-in-95 duration-200
          ${className}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Body */}
        <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {showFooter && (
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-100">
            {footerActions ? (
              footerActions
            ) : (
              <>
                <button
                  onClick={onCancel || onClose}
                  disabled={loading}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-50"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  disabled={loading}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading && (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {confirmText}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Modal untuk Konfirmasi Hapus
export const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, itemName, loading = false }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Hapus Data"
      size="sm"
      confirmText="Hapus"
      cancelText="Batal"
      onConfirm={onConfirm}
      loading={loading}
    >
      <div className="text-center py-4">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <p className="text-slate-600 mb-2">
          Apakah Anda yakin ingin menghapus data <span className="font-bold text-slate-800">{itemName}</span>?
        </p>
        <p className="text-xs text-slate-400">Data yang dihapus tidak dapat dikembalikan.</p>
      </div>
    </Modal>
  );
};

// Modal untuk Form (Tambah/Edit)
export const FormModal = ({ isOpen, onClose, title, onSubmit, children, loading = false, submitText = "Simpan" }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="md"
      confirmText={submitText}
      cancelText="Batal"
      onConfirm={handleSubmit}
      loading={loading}
    >
      <form onSubmit={handleSubmit}>
        {children}
      </form>
    </Modal>
  );
};

// Modal untuk Detail View
export const DetailModal = ({ isOpen, onClose, title, children, size = "md" }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      showFooter={false}
    >
      {children}
    </Modal>
  );
};

export default Modal;