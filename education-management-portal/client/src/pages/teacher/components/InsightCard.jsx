export default function InsightCard({ icon, title, description }) {
  return (
    <div className="insight-card">
      <div className="insight-icon">{icon}</div>
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}
