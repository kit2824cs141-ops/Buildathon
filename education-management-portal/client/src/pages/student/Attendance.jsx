import { useState } from 'react';
import { Calendar as CalendarIcon, CheckCircle, AlertCircle, XCircle, Mail } from 'lucide-react';

export default function Attendance() {
  const [showExcuseModal, setShowExcuseModal] = useState(false);
  const [excuseSent, setExcuseSent] = useState(false);
  const [excuseForm, setExcuseForm] = useState({ course: 'CS201', date: '', reason: '' });

  const attendanceSummary = [
    { code: 'CS201', name: 'Data Structures', attended: 28, total: 30, pct: 93.3 },
    { code: 'MATH302', name: 'Calculus III', attended: 29, total: 30, pct: 96.6 },
    { code: 'PHYS202', name: 'General Physics II', attended: 26, total: 30, pct: 86.6 },
    { code: 'CS204', name: 'DBMS', attended: 30, total: 30, pct: 100 }
  ];

  // Calendar dates list mock
  const days = Array.from({ length: 31 }, (_, i) => {
    const dayNum = i + 1;
    let status = 'present';
    if ([5, 12].includes(dayNum)) status = 'absent';
    if ([8, 19, 26].includes(dayNum)) status = 'late';
    return { dayNum, status };
  });

  const handleExcuseSubmit = (e) => {
    e.preventDefault();
    setExcuseSent(true);
    setTimeout(() => {
      setExcuseSent(false);
      setShowExcuseModal(false);
      setExcuseForm({ course: 'CS201', date: '', reason: '' });
    }, 2000);
  };

  return (
    <div className="tab-view-container animate-fade">
      <div className="view-title-row">
        <h2 className="view-title">Attendance Portal</h2>
        <button className="btn-brand" onClick={() => setShowExcuseModal(true)}>
          <Mail size={16} /> Request Absence Excuse
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Course-by-course Breakdown */}
        <div className="edu-card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Subject-wise Attendance Logs</h3>
          <div className="edu-table-container">
            <table className="edu-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Course Title</th>
                  <th>Attended Classes</th>
                  <th>Total Classes</th>
                  <th>Percentage</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceSummary.map((item) => (
                  <tr key={item.code}>
                    <td><strong>{item.code}</strong></td>
                    <td>{item.name}</td>
                    <td>{item.attended}</td>
                    <td>{item.total}</td>
                    <td style={{ fontWeight: '700', color: item.pct >= 90 ? 'var(--success)' : 'var(--primary)' }}>{item.pct}%</td>
                    <td>
                      <span className={`edu-badge ${item.pct >= 90 ? 'edu-badge-success' : 'edu-badge-warning'}`}>
                        {item.pct >= 90 ? 'Good' : 'Needs attention'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend / Metrics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="edu-card stat-glow" style={{ textAlign: 'center' }}>
            <div className="stat-label">AVERAGE ATTENDANCE</div>
            <div className="stat-value" style={{ color: 'var(--success)' }}>94.1%</div>
            <div className="stat-footer">Across all registered lectures & labs</div>
          </div>

          <div className="edu-card">
            <h4 style={{ fontSize: '0.95rem', marginBottom: '12px' }}>Attendance Ledger Legend</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={16} color="var(--success)" />
                <span>Present: 113 Sessions</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={16} color="var(--warning)" />
                <span>Late/Tardy: 3 Sessions</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <XCircle size={16} color="var(--danger)" />
                <span>Absent: 2 Sessions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Grid Sheet */}
      <div className="edu-card">
        <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CalendarIcon size={18} color="var(--primary)" />
          <span>August 2026 Monthly Log Sheet</span>
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', maxWidth: '700px' }}>
          {/* Calendar Headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(h => (
            <div key={h} style={{ textAlign: 'center', fontWeight: '700', fontSize: '0.8rem', padding: '6px 0', color: 'var(--text-muted)' }}>
              {h}
            </div>
          ))}

          {/* Calendar Days */}
          {days.map((day) => (
            <div 
              key={day.dayNum} 
              style={{ 
                height: '50px', 
                border: '1px solid var(--border)', 
                borderRadius: '6px', 
                padding: '4px', 
                position: 'relative',
                background: 'var(--bg-white)',
                opacity: day.status === 'absent' ? 0.8 : 1
              }}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>{day.dayNum}</span>
              <div 
                style={{ 
                  position: 'absolute', 
                  bottom: '6px', 
                  right: '6px', 
                  width: '10px', 
                  height: '10px', 
                  borderRadius: '50%',
                  background: 
                    day.status === 'present' ? 'var(--success)' :
                    day.status === 'late' ? 'var(--warning)' : 'var(--danger)'
                }}
                title={day.status.toUpperCase()}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Request Absence Excuse Modal */}
      {showExcuseModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifycontent: 'center', display: 'flex', justifyContent: 'center' }}>
          <div className="edu-card animate-fade" style={{ width: '400px', margin: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3>Submit Absence Request</h3>
              <button onClick={() => setShowExcuseModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
            </div>

            {excuseSent ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle size={40} color="var(--success)" style={{ marginBottom: '8px' }} />
                <h4>Absence Excuse Sent!</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Faculty will receive your excuse notice shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleExcuseSubmit}>
                <div className="edu-input-group">
                  <label className="edu-label">Course Subject</label>
                  <select 
                    className="edu-input" 
                    value={excuseForm.course}
                    onChange={(e) => setExcuseForm({ ...excuseForm, course: e.target.value })}
                  >
                    <option value="CS201">CS201: Data Structures</option>
                    <option value="MATH302">MATH302: Calculus III</option>
                    <option value="PHYS202">PHYS202: General Physics II</option>
                    <option value="CS204">CS204: DBMS</option>
                  </select>
                </div>

                <div className="edu-input-group">
                  <label className="edu-label">Absence Date</label>
                  <input 
                    type="date" 
                    className="edu-input" 
                    required 
                    value={excuseForm.date}
                    onChange={(e) => setExcuseForm({ ...excuseForm, date: e.target.value })}
                  />
                </div>

                <div className="edu-input-group" style={{ marginBottom: '20px' }}>
                  <label className="edu-label">Reason for Absence</label>
                  <textarea 
                    rows="3" 
                    className="edu-input" 
                    placeholder="Provide medical or personal reason details..."
                    required
                    value={excuseForm.reason}
                    onChange={(e) => setExcuseForm({ ...excuseForm, reason: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" className="btn-brand-outline" style={{ flex: 1 }} onClick={() => setShowExcuseModal(false)}>Cancel</button>
                  <button type="submit" className="btn-brand" style={{ flex: 2 }}>Submit Request</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
