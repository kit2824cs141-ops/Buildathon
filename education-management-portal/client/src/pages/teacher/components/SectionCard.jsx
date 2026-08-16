export default function SectionCard({ title, action, actionLabel, onActionClick, children }) {
  const handler = onActionClick || action;
  return (
    <div className="section-card">
      <div className="section-header">
        <h3 className="section-title">{title}</h3>
        {handler && actionLabel && (
          <button className="section-action" onClick={handler}>{actionLabel}</button>
        )}
        {!handler && actionLabel && (
          <span className="section-action">{actionLabel}</span>
        )}
      </div>
      {children}
    </div>
  );
}
