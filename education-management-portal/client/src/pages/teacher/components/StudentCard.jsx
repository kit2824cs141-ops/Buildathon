export default function StudentCard({ name, initials, issue, riskLevel, avatarColor = 'red' }) {
  return (
    <div className="student-risk-item">
      <div className="student-risk-left">
        <div className={`student-avatar ${avatarColor}`}>{initials}</div>
        <div className="student-risk-info">
          <h4>{name}</h4>
          <p>{issue}</p>
        </div>
      </div>
      <span className={`risk-badge ${riskLevel.toLowerCase()}`}>{riskLevel}</span>
    </div>
  );
}
