import { AlertCircle } from 'lucide-react';

const severityStyles = {
  Critical: { color: '#EF4444', bg: '#FEF2F2', border: '#FCA5A5' },
  High: { color: '#FF6B00', bg: '#FFF5EB', border: '#FFD3B4' },
  Medium: { color: '#F59E0B', bg: '#FFFBEB', border: '#FDE68A' },
  Low: { color: '#3B82F6', bg: '#EFF6FF', border: '#BFDBFE' }
};

export default function WeakTopicCard({ subject, topic, avgScore, studentsStruggling, maxStudents, severity }) {
  const styles = severityStyles[severity] || severityStyles.Medium;
  const percentageStruggling = Math.round((studentsStruggling / maxStudents) * 100);

  return (
    <div className="chart-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '11px', color: '#6B7280', display: 'block', fontWeight: 600, textTransform: 'uppercase' }}>{subject}</span>
          <h3 style={{ margin: '2px 0 0', fontSize: '14.5px', fontWeight: 700, color: '#1A1A2E' }}>{topic}</h3>
        </div>
        <span style={{
          fontSize: '11px', fontWeight: 700, color: styles.color, background: styles.bg,
          padding: '3px 8px', borderRadius: '4px', border: `1px solid ${styles.border}`
        }}>
          {severity} Severity
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '16px', marginTop: '4px' }}>
        <div style={{ background: '#FAFBFC', border: '1px solid #F0F0F0', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
          <span style={{ display: 'block', fontSize: '10px', color: '#9CA3AF', fontWeight: 600 }}>CLASS AVERAGE</span>
          <strong style={{ fontSize: '18px', color: avgScore < 50 ? '#EF4444' : '#FF6B00' }}>{avgScore}%</strong>
        </div>

        <div style={{ background: '#FAFBFC', border: '1px solid #F0F0F0', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '4px' }}>
            <span style={{ color: '#4B5563' }}>Struggling:</span>
            <strong style={{ color: '#1A1A2E' }}>{studentsStruggling} / {maxStudents} ({percentageStruggling}%)</strong>
          </div>
          <div className="compare-bar-track" style={{ height: '6px' }}>
            <div className="compare-bar-fill orange" style={{ width: `${percentageStruggling}%`, background: styles.color }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
