/**
 * RiskBadge — Displays a color-coded risk level pill.
 * Props: level ('High' | 'Medium' | 'Low' | 'Critical'), size ('sm' | 'md' | 'lg')
 */
const configs = {
  Critical: { bg: '#FEE2E2', color: '#991B1B', dot: '#DC2626', label: 'Critical' },
  High:     { bg: '#FEE2E2', color: '#991B1B', dot: '#EF4444', label: 'High Risk' },
  Medium:   { bg: '#FEF3C7', color: '#92400E', dot: '#F59E0B', label: 'Medium Risk' },
  Low:      { bg: '#D1FAE5', color: '#065F46', dot: '#10B981', label: 'Low Risk' },
};

const sizes = {
  sm: { fontSize: '10px', padding: '2px 8px', dotSize: '5px' },
  md: { fontSize: '11px', padding: '4px 10px', dotSize: '6px' },
  lg: { fontSize: '13px', padding: '6px 14px', dotSize: '8px' },
};

export default function RiskBadge({ level = 'Low', size = 'md' }) {
  const cfg = configs[level] || configs.Low;
  const sz  = sizes[size] || sizes.md;

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      background: cfg.bg, color: cfg.color,
      padding: sz.padding, borderRadius: '50px',
      fontSize: sz.fontSize, fontWeight: 700,
      border: `1px solid ${cfg.dot}44`,
    }}>
      <span style={{ width: sz.dotSize, height: sz.dotSize, borderRadius: '50%', background: cfg.dot, flexShrink: 0 }} />
      {cfg.label}
    </span>
  );
}
