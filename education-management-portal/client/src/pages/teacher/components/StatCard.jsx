export default function StatCard({ title, value, subtitle, icon, gradient = 'gradient-1', valueColor = '', subtitleColor = '', iconColor = 'orange' }) {
  return (
    <div className={`stat-card ${gradient}`}>
      <div className="stat-header">
        <span className="stat-title">{title}</span>
        <div className={`stat-icon ${iconColor}`}>{icon}</div>
      </div>
      <div className={`stat-value ${valueColor}`}>{value}</div>
      {subtitle && <div className={`stat-subtitle ${subtitleColor}`}>{subtitle}</div>}
    </div>
  );
}
