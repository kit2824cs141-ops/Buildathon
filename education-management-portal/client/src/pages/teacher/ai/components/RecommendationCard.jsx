import { CheckSquare, Info, Star } from 'lucide-react';

const priorityColors = {
  Critical: { bg: '#FEF2F2', border: '#EF4444', text: '#991B1B', badgeBg: '#FEE2E2' },
  High: { bg: '#FFF5EB', border: '#FF6B00', text: '#B45309', badgeBg: '#FFE4E6' },
  Medium: { bg: '#EFF6FF', border: '#3B82F6', text: '#1E40AF', badgeBg: '#DBEAFE' },
  Low: { bg: '#F9FAFB', border: '#D1D5DB', text: '#374151', badgeBg: '#F3F4F6' }
};

export default function RecommendationCard({ title, description, priority = 'Medium', category, targetClass, targetSubject, estimatedImpact, actions = [] }) {
  const colors = priorityColors[priority] || priorityColors.Medium;

  return (
    <div className="chart-card" style={{ borderLeft: `4px solid ${colors.border}`, display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 700, color: colors.text, background: colors.badgeBg, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase', marginRight: '8px' }}>
            {priority} Priority
          </span>
          <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>{category}</span>
        </div>
        <div style={{ fontSize: '11.5px', color: '#4B5563', background: '#F3F4F6', padding: '2px 8px', borderRadius: '4px' }}>
          Target: <strong>{targetClass}</strong>
        </div>
      </div>

      <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#1A1A2E' }}>{title}</h3>
      <p style={{ margin: 0, fontSize: '13px', color: '#4B5563', lineHeight: '1.5' }}>{description}</p>

      {estimatedImpact && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', background: '#ECFDF5', color: '#065F46', padding: '6px 10px', borderRadius: '6px' }}>
          <Star size={14} style={{ fill: '#059669' }} />
          <span>Estimated Impact: <strong>{estimatedImpact}</strong></span>
        </div>
      )}

      {actions.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
          <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#1A1A2E', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckSquare size={13} /> Recommended Implementation Steps:
          </span>
          <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {actions.map((act, idx) => (
              <li key={idx} style={{ fontSize: '12.5px', color: '#4B5563', lineHeight: '1.4' }}>{act}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
