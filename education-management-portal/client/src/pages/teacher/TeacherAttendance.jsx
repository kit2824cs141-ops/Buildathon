import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, ClipboardCheck, AlertTriangle, FileText } from 'lucide-react';
import SectionCard from './components/SectionCard';
import StatCard from './components/StatCard';

const initialStudentsRoster = [
  { roll: 'CSE2601', name: 'Rahul Sharma', status: 'Present', attendanceRate: 95 },
  { roll: 'CSE2602', name: 'Karthik Raj', status: 'Absent', attendanceRate: 65 },
  { roll: 'CSE2603', name: 'Priya Nair', status: 'Present', attendanceRate: 88 },
  { roll: 'CSE2604', name: 'Aditya Sen', status: 'Present', attendanceRate: 98 },
  { roll: 'CSE2605', name: 'Meera Das', status: 'Present', attendanceRate: 94 },
];

export default function TeacherAttendance() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [roster, setRoster] = useState(initialStudentsRoster);
  const [saved, setSaved] = useState(false);

  const toggleStatus = (index) => {
    const updated = [...roster];
    updated[index].status = updated[index].status === 'Present' ? 'Absent' : 'Present';
    setRoster(updated);
  };

  const presentCount = roster.filter(s => s.status === 'Present').length;
  const absentCount = roster.filter(s => s.status === 'Absent').length;
  const totalCount = roster.length;
  const attendancePercentage = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;
  
  // Identify students below the 75% eligibility warning threshold
  const warningCount = roster.filter(s => s.attendanceRate < 75).length;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="attendance-page">
      <div className="teacher-page-header">
        <h1>Attendance Tracker</h1>
        <div className="page-actions">
          <button className="btn-teacher secondary" onClick={() => navigate('/teacher/attendance/history')}>
            <FileText size={16} /> View History Log
          </button>
        </div>
      </div>

      {/* Roster Controls */}
      <div className="filters-bar">
        <div className="form-group" style={{ flex: 1, minWidth: '160px' }}>
          <select 
            className="filter-select" 
            style={{ width: '100%', minWidth: '100%' }}
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select Target Class</option>
            <option value="csea-3">CSE-A (3rd Year)</option>
            <option value="cseb-2">CSE-B (2nd Year)</option>
            <option value="ita-3">IT-A (3rd Year)</option>
          </select>
        </div>
        <div className="form-group" style={{ flex: 1, minWidth: '160px' }}>
          <select 
            className="filter-select" 
            style={{ width: '100%', minWidth: '100%' }}
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select Subject</option>
            <option value="DSA">Data Structures & Algorithms</option>
            <option value="DBMS">Database Management Systems</option>
            <option value="ML">Machine Learning</option>
            <option value="OS">Operating Systems</option>
          </select>
        </div>
        <div className="form-group" style={{ flex: 1, minWidth: '160px' }}>
          <input 
            type="date" 
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #E5E7EB' }}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {/* Roster Area */}
      {selectedClass && selectedCourse ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Quick Metrics */}
          <div className="stats-grid">
            <StatCard
              title="Class Size"
              value={totalCount}
              icon={<Users size={20} />}
              gradient="gradient-1"
              iconColor="orange"
            />
            <StatCard
              title="Present Count"
              value={presentCount}
              icon={<ClipboardCheck size={20} />}
              gradient="gradient-4"
              valueColor="green"
              iconColor="green"
            />
            <StatCard
              title="Absent Count"
              value={absentCount}
              icon={<AlertTriangle size={20} />}
              gradient="gradient-5"
              valueColor="red"
              iconColor="red"
            />
            <StatCard
              title="Attendance Rate"
              value={`${attendancePercentage}%`}
              icon={<Calendar size={20} />}
              gradient="gradient-2"
              valueColor="blue"
              iconColor="blue"
            />
          </div>

          {/* Low attendance Warnings banner */}
          {warningCount > 0 && (
            <div className="conflict-warning">
              <AlertTriangle className="warning-icon" size={18} />
              <div>
                <strong>Low Attendance Warning:</strong> {warningCount} student(s) in this class section have cumulative attendance averages below the 75% mandatory threshold.
              </div>
            </div>
          )}

          {saved && (
            <div style={{ background: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0', padding: '12px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600 }}>
              ✓ Daily attendance log saved successfully!
            </div>
          )}

          {/* Table */}
          <SectionCard title="Attendance Registry Roster">
            <div className="table-container" style={{ margin: 0 }}>
              <table className="teacher-table">
                <thead>
                  <tr>
                    <th>Roll Number</th>
                    <th>Student Name</th>
                    <th>Average Attendance Rate</th>
                    <th>Mark Status</th>
                  </tr>
                </thead>
                <tbody>
                  {roster.map((student, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>{student.roll}</td>
                      <td>{student.name}</td>
                      <td>
                        <span style={{ fontWeight: 600, color: student.attendanceRate < 75 ? '#EF4444' : '#10B981' }}>
                          {student.attendanceRate}%
                        </span>
                        {student.attendanceRate < 75 && (
                          <span style={{ fontSize: '11px', color: '#EF4444', marginLeft: '8px', background: '#FEF2F2', padding: '2px 6px', borderRadius: '4px' }}>
                            Below Limit
                          </span>
                        )}
                      </td>
                      <td>
                        <button 
                          className={`attendance-toggle-btn ${student.status.toLowerCase()}`}
                          onClick={() => toggleStatus(i)}
                        >
                          {student.status}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Save Action */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button className="btn-teacher primary" onClick={handleSave}>
                Save Attendance Record
              </button>
            </div>
          </SectionCard>
        </div>
      ) : (
        <SectionCard>
          <div className="page-placeholder">
            <div className="placeholder-icon"><ClipboardCheck size={28} /></div>
            <h3>Attendance Log Sheet</h3>
            <p>Please select class and course selectors to view and edit student attendance registries.</p>
          </div>
        </SectionCard>
      )}
    </div>
  );
}
