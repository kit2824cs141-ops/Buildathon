export default function AssignmentCard({ title, course, status, dueDate }) {
  return (
    <div className="assignment-item">
      <div className="assignment-left">
        <div className="assignment-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        </div>
        <div className="assignment-info">
          <h4>{title}</h4>
          <p>{course} • Due: {dueDate}</p>
        </div>
      </div>
      <span className={`assignment-status ${status.toLowerCase()}`}>{status}</span>
    </div>
  );
}
