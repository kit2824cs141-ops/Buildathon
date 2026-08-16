import { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';

const FeedbackContext = createContext(null);

export function FeedbackProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState(null);

  // Add a toast notification
  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Open confirmation dialog
  const confirmAction = useCallback(({ title, message, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel }) => {
    setConfirmDialog({
      title,
      message,
      confirmText,
      cancelText,
      onConfirm: () => {
        onConfirm();
        setConfirmDialog(null);
      },
      onCancel: () => {
        if (onCancel) onCancel();
        setConfirmDialog(null);
      }
    });
  }, []);

  const toastIcons = {
    success: <CheckCircle size={16} color="#10B981" />,
    warning: <AlertTriangle size={16} color="#F59E0B" />,
    error: <AlertCircle size={16} color="#EF4444" />,
    info: <Info size={16} color="#3B82F6" />,
  };

  const toastBorderColors = {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  };

  return (
    <FeedbackContext.Provider value={{ showToast, confirmAction }}>
      {children}

      {/* Render Toast notifications */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '10px', pointerEvents: 'none' }}>
        {toasts.map(t => (
          <div
            key={t.id}
            style={{
              pointerEvents: 'auto',
              background: '#FFFFFF',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              border: '1px solid #E5E7EB',
              borderLeft: `4px solid ${toastBorderColors[t.type]}`,
              borderRadius: '8px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              minWidth: '280px',
              maxWidth: '380px',
              animation: 'slideIn 0.2s ease forwards',
            }}
          >
            {toastIcons[t.type]}
            <span style={{ fontSize: '13px', color: '#1F2937', fontWeight: 500, flex: 1 }}>{t.message}</span>
            <button
              onClick={() => removeToast(t.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: '2px', display: 'flex', alignItems: 'center' }}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Render Destructive Confirmation Dialog */}
      {confirmDialog && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '12px', width: '100%', maxWidth: '400px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', border: '1px solid #E5E7EB' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <AlertTriangle size={18} color="#EF4444" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#111827' }}>{confirmDialog.title}</h3>
                <p style={{ margin: '8px 0 0', fontSize: '13.5px', color: '#6B7280', lineHeight: '1.5' }}>{confirmDialog.message}</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '24px' }}>
              <button
                onClick={confirmDialog.onCancel}
                style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #D1D5DB', background: '#FFFFFF', color: '#374151', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
              >
                {confirmDialog.cancelText}
              </button>
              <button
                onClick={confirmDialog.onConfirm}
                style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#EF4444', color: '#FFFFFF', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
              >
                {confirmDialog.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateY(12px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
}
