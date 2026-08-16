import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, FileText, Search } from 'lucide-react';
import SectionCard from './components/SectionCard';

const historyLogs = [
  { date: 'Aug 15, 2026', class: 'CSE-B (2nd Year)', course: 'Database Systems', present: 50, total: 52, percentage: '96%', recorder: 'Prof. Muruga Kumar' },
  { date: 'Aug 14, 2026', class: 'CSE-A (3rd Year)', course: 'Data Structures', present: 43, total: 45, percentage: '95%', recorder: 'Prof. Muruga Kumar' },
  { date: 'Aug 13, 2026', class: 'CSE-A (3rd Year)', course: 'Machine Learning', present: 36, total: 38, percentage: '94%', recorder: 'Prof. Muruga Kumar' },
  { date: 'Aug 12, 2026', class: 'IT-A (3rd Year)', course: 'Operating Systems', present: 14, total: 16, percentage: '87%', recorder: 'Prof. Muruga Kumar' },
];

export default function TeacherAttendanceHistory() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = historyLogs.filter(log => 
    log.class.toLowerCase().includes(search.toLowerCase()) || 
    log.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="attendance-history-page">
      {/* Header */}
      <div className="teacher-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn-teacher secondary" style={{ padding: '8px' }} onClick={() => navigate('/teacher/attendance')}>
            <ChevronLeft size={18} />
          </button>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px' }}>Attendance History Log</h1>
            <p style={{ margin: 0, color: '#6B7280', fontSize: '13px' }}>View previous attendance sheets and enrollment metrics</p>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="filters-bar">
        <div className="search-wrapper" style={{ width: '100%' }}>
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by class name or subject..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <SectionCard title="Attendance Archive Sheets">
        <div className="table-container" style={{ margin: 0 }}>
          <table className="teacher-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Class</th>
                <th>Subject</th>
                <th>Students Present</th>
                <th>Attendance Rate</th>
                <th>Recorder</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{log.date}</td>
                  <td>{log.class}</td>
                  <td>{log.course}</td>
                  <td>{log.present} / {log.total}</td>
                  <td style={{ fontWeight: 700, color: '#FF6B00' }}>{log.percentage}</td>
                  <td>{log.recorder}</td>
                  <td>
                    <button className="btn-teacher secondary" style={{ padding: '4px 12px', fontSize: '12px' }} onClick={() => navigate('/teacher/attendance')}>
                      Edit Log
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '30px' }}>No history records found matching searches.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
