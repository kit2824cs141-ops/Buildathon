import { Sparkles } from 'lucide-react';

/**
 * InsightCard — AI insight card with severity theming.
 * Props: title, summary, type ('warning'|'danger'|'success'|'info'|'tip'),
 *        confidence (number 0-100), category (string), icon (ReactNode), action (string)
 */
const typeConfig = {
  danger:  { bg: '#FEF2F2', border: '#EF4444', accent: '#DC2626', badgeBg: '#FEE2E2', badgeText: '#991B1B' },
  warning: { bg: '#FFFBEB', border: '#F59E0B', accent: '#D97706', badgeBg: '#FEF3C7', badgeText: '#92400E' },
  success: { bg: '#ECFDF5', border: '#10B981', accent: '#059669', badgeBg: '#D1FAE5', badgeText: '#065F46' },
  info:    { bg: '#EFF6FF', border: '#3B82F6', accent: '#2563EB', badgeBg: '#DBEAFE', badgeText: '#1E40AF' },
  tip:     { bg: '#F5F3FF', border: '#7C3AED', accent: '#6D28D9', badgeBg: '#EDE9FE', badgeText: '#4C1D95' },
};

export default function InsightCard({ title, summary, type = 'info', confidence, category, icon, action }) {
  const cfg = typeConfig[type] || typeConfig.info;

  return (
    <div style={{
      background: cfg.bg, border: `1px solid ${cfg.border}33`,
      borderLeft: `4px solid ${cfg.accent}`,
      borderRadius: '12px', padding: '18px 20px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {icon && <span style={{ color: cfg.accent }}>{icon}</span>}
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#1A1A2E' }}>{title}</h4>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {category && (
            <span style={{ background: cfg.badgeBg, color: cfg.badgeText, padding: '3px 10px', borderRadius: '50px', fontSize: '11px', fontWeight: 600 }}>
              {category}
            </span>
          )}
          {confidence !== undefined && (
            <span style={{ fontSize: '10px', color: '#6B7280', background: '#F3F4F6', border: '1px solid #E5E7EB', padding: '2px 7px', borderRadius: '4px', fontWeight: 600 }}>
              {confidence}% confidence
            </span>
          )}
        </div>
      </div>

      <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#374151', lineHeight: '1.6' }}>{summary}</p>

      {action && (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', padding: '9px 12px' }}>
          <Sparkles size={13} color={cfg.accent} style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ margin: 0, fontSize: '12px', color: '#4B5563', fontStyle: 'italic' }}>
            <strong style={{ color: cfg.accent, fontStyle: 'normal' }}>Recommended: </strong>{action}
          </p>
        </div>
      )}
    </div>
  );
}
