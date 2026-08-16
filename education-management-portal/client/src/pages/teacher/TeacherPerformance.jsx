import { useState } from 'react';
import { Award, BarChart3, Calendar, ClipboardCheck, TrendingUp, Users, ThumbsUp, ThumbsDown } from 'lucide-react';
import SectionCard from './components/SectionCard';
import StatCard from './components/StatCard';

const studentsStats = [
  { roll: 'CSE2601', name: 'Rahul Sharma', attendance: 95, assignmentAvg: 88, examAvg: 85, overall: 86, strong: ['Algorithms', 'DBMS'], weak: ['Theory of Comp.'] },
  { roll: 'CSE2602', name: 'Karthik Raj', attendance: 65, assignmentAvg: 55, examAvg: 58, overall: 56, strong: ['UI/UX Design'], weak: ['Algorithms', 'DBMS'] },
  { roll: 'CSE2603', name: 'Priya Nair', attendance: 88, assignmentAvg: 72, examAvg: 78, overall: 76, strong: ['ML Lab'], weak: ['Theory of Comp.'] },
  { roll: 'CSE2604', name: 'Aditya Sen', attendance: 98, assignmentAvg: 95, examAvg: 92, overall: 94, strong: ['Discrete Math', 'OS'], weak: ['None'] },
];

const classComparison = [
  { className: 'CSE-A (3rd Year)', attendance: 92, assignment: 85, exam: 79, overall: 82, color: 'orange' },
  { className: 'CSE-B (2nd Year)', attendance: 88, assignment: 78, exam: 73, overall: 76, color: 'blue' },
  { className: 'IT-A (3rd Year)', attendance: 85, assignment: 80, exam: 80, overall: 80, color: 'green' },
];

export default function TeacherPerformance() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStudent, setSelectedStudent] = useState(studentsStats[0]);

  return (
    <div className="performance-page">
      <div className="teacher-page-header">
        <h1>Performance & Analytics</h1>
      </div>

      {/* Tabs */}
      <div className="details-tabs">
        <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Class Overview</button>
        <button className={`tab-btn ${activeTab === 'student' ? 'active' : ''}`} onClick={() => setActiveTab('student')}>Student Performance</button>
        <button className={`tab-btn ${activeTab === 'comparison' ? 'active' : ''}`} onClick={() => setActiveTab('comparison')}>Class Comparison</button>
      </div>

      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Stats Row */}
          <div className="stats-grid">
            <StatCard title="Overall Class Avg" value="82%" icon={<Award size={20} />} gradient="gradient-1" iconColor="orange" />
            <StatCard title="Attendance Average" value="92%" icon={<Calendar size={20} />} gradient="gradient-2" valueColor="blue" iconColor="blue" />
            <StatCard title="Assignment Average" value="85%" icon={<TrendingUp size={20} />} gradient="gradient-4" valueColor="green" iconColor="green" />
            <StatCard title="Examination Avg" value="79%" icon={<BarChart3 size={20} />} gradient="gradient-3" valueColor="cyan" iconColor="cyan" />
          </div>

          {/* CSS Chart Layouts */}
          <div className="css-chart-grid">
            <SectionCard title="Attendance Trend (Weekly)">
              <div className="visual-bar-chart">
                <div className="bar-column"><div className="bar-pill" style={{ height: '90%' }}>90%</div><span className="bar-label">Mon</span></div>
                <div className="bar-column"><div className="bar-pill" style={{ height: '95%' }}>95%</div><span className="bar-label">Tue</span></div>
                <div className="bar-column"><div className="bar-pill" style={{ height: '88%' }}>88%</div><span className="bar-label">Wed</span></div>
                <div className="bar-column"><div className="bar-pill" style={{ height: '92%' }}>92%</div><span className="bar-label">Thu</span></div>
                <div className="bar-column"><div className="bar-pill" style={{ height: '94%' }}>94%</div><span className="bar-label">Fri</span></div>
              </div>
            </SectionCard>

            <SectionCard title="Assignment Performance (By Course)">
              <div className="visual-bar-chart">
                <div className="bar-column"><div className="bar-pill blue" style={{ height: '88%' }}>88%</div><span className="bar-label">DSA</span></div>
                <div className="bar-column"><div className="bar-pill blue" style={{ height: '82%' }}>82%</div><span className="bar-label">DBMS</span></div>
                <div className="bar-column"><div className="bar-pill blue" style={{ height: '90%' }}>90%</div><span className="bar-label">ML</span></div>
                <div className="bar-column"><div className="bar-pill blue" style={{ height: '78%' }}>78%</div><span className="bar-label">OS</span></div>
              </div>
            </SectionCard>

            <SectionCard title="Examination Average (By Course)">
              <div className="visual-bar-chart">
                <div className="bar-column"><div className="bar-pill green" style={{ height: '78%' }}>78%</div><span className="bar-label">DSA Mid</span></div>
                <div className="bar-column"><div className="bar-pill green" style={{ height: '74%' }}>74%</div><span className="bar-label">DBMS Mid</span></div>
                <div className="bar-column"><div className="bar-pill green" style={{ height: '85%' }}>85%</div><span className="bar-label">ML Quiz</span></div>
              </div>
            </SectionCard>

            <SectionCard title="Subject Performance Ratio">
              <div className="visual-bar-chart">
                <div className="bar-column"><div className="bar-pill" style={{ height: '85%' }}>85%</div><span className="bar-label">DSA</span></div>
                <div className="bar-column"><div className="bar-pill blue" style={{ height: '79%' }}>79%</div><span className="bar-label">DBMS</span></div>
                <div className="bar-column"><div className="bar-pill green" style={{ height: '87%' }}>87%</div><span className="bar-label">ML</span></div>
                <div className="bar-column"><div className="bar-pill" style={{ height: '80%' }}>80%</div><span className="bar-label">OS</span></div>
              </div>
            </SectionCard>
          </div>
        </div>
      )}

      {activeTab === 'student' && (
        <div className="details-grid">
          {/* Left panel: student selector list */}
          <div className="details-sidebar" style={{ gridColumn: 'span 1' }}>
            <SectionCard title="Select Student">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {studentsStats.map((st, i) => (
                  <div 
                    key={i} 
                    style={{ 
                      padding: '12px', 
                      borderRadius: '8px', 
                      border: '1px solid #E5E7EB', 
                      background: selectedStudent.roll === st.roll ? '#FFF5EB' : '#FFFFFF',
                      borderColor: selectedStudent.roll === st.roll ? '#FF6B00' : '#E5E7EB',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                    onClick={() => setSelectedStudent(st)}
                  >
                    <div className="student-avatar orange" style={{ width: '32px', height: '32px', fontSize: '12px' }}>
                      {st.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#1A1A2E' }}>{st.name}</div>
                      <div style={{ fontSize: '11px', color: '#6B7280' }}>Roll: {st.roll}</div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Right panel: student 360 diagnosis summary */}
          <div className="details-main" style={{ gridColumn: 'span 1' }}>
            <SectionCard title={`${selectedStudent.name} — Performance 360°`}>
              <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
                <div style={{ padding: '14px', background: '#FAFBFC', border: '1px solid #F0F0F0', borderRadius: '10px' }}>
                  <span style={{ fontSize: '11px', color: '#9CA3AF', display: 'block', fontWeight: 600 }}>OVERALL GRADE</span>
                  <strong style={{ fontSize: '18px', color: '#FF6B00' }}>{selectedStudent.overall}%</strong>
                </div>
                <div style={{ padding: '14px', background: '#FAFBFC', border: '1px solid #F0F0F0', borderRadius: '10px' }}>
                  <span style={{ fontSize: '11px', color: '#9CA3AF', display: 'block', fontWeight: 600 }}>ATTENDANCE</span>
                  <strong style={{ fontSize: '18px', color: '#3B82F6' }}>{selectedStudent.attendance}%</strong>
                </div>
                <div style={{ padding: '14px', background: '#FAFBFC', border: '1px solid #F0F0F0', borderRadius: '10px' }}>
                  <span style={{ fontSize: '11px', color: '#9CA3AF', display: 'block', fontWeight: 600 }}>ASSIGNMENT AVG</span>
                  <strong style={{ fontSize: '18px', color: '#10B981' }}>{selectedStudent.assignmentAvg}%</strong>
                </div>
                <div style={{ padding: '14px', background: '#FAFBFC', border: '1px solid #F0F0F0', borderRadius: '10px' }}>
                  <span style={{ fontSize: '11px', color: '#9CA3AF', display: 'block', fontWeight: 600 }}>EXAMINATION AVG</span>
                  <strong style={{ fontSize: '18px', color: '#06B6D4' }}>{selectedStudent.examAvg}%</strong>
                </div>
              </div>

              <div className="strong-weak-grid" style={{ marginBottom: '16px' }}>
                <div className="sw-panel strong">
                  <h4><ThumbsUp size={15} /> Key Strengths</h4>
                  <ul>
                    {selectedStudent.strong.map((sub, i) => <li key={i}>{sub}</li>)}
                  </ul>
                </div>
                <div className="sw-panel weak">
                  <h4><ThumbsDown size={15} /> Focus Areas</h4>
                  <ul>
                    {selectedStudent.weak.map((sub, i) => <li key={i}>{sub}</li>)}
                  </ul>
                </div>
              </div>

              {/* Progress trend */}
              <div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#1A1A2E', display: 'block', marginBottom: '8px' }}>Performance Trend Log</span>
                <div className="progress-bar-container" style={{ width: '100%', height: '8px' }}>
                  <div className="progress-bar-fill orange" style={{ width: `${selectedStudent.overall}%` }}></div>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      )}

      {activeTab === 'comparison' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <SectionCard title="Comparative Performance: CSE-A vs CSE-B vs IT-A">
            <div className="compare-list">
              {/* Metric 1: Overall Average */}
              <div className="compare-row-item">
                <div className="compare-row-header">
                  <span>Overall Grade Average</span>
                </div>
                {classComparison.map((cls, i) => (
                  <div key={i} style={{ marginBottom: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#4B5563', marginBottom: '2px' }}>
                      <span>{cls.className}</span>
                      <strong>{cls.overall}%</strong>
                    </div>
                    <div className="compare-bar-track">
                      <div className={`compare-bar-fill ${cls.color}`} style={{ width: `${cls.overall}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="sidebar-divider" style={{ margin: '12px 0' }} />

              {/* Metric 2: Attendance Rate */}
              <div className="compare-row-item">
                <div className="compare-row-header">
                  <span>Attendance Percentage</span>
                </div>
                {classComparison.map((cls, i) => (
                  <div key={i} style={{ marginBottom: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#4B5563', marginBottom: '2px' }}>
                      <span>{cls.className}</span>
                      <strong>{cls.attendance}%</strong>
                    </div>
                    <div className="compare-bar-track">
                      <div className={`compare-bar-fill ${cls.color}`} style={{ width: `${cls.attendance}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="sidebar-divider" style={{ margin: '12px 0' }} />

              {/* Metric 3: Assignment Completion */}
              <div className="compare-row-item">
                <div className="compare-row-header">
                  <span>Assignment Performance</span>
                </div>
                {classComparison.map((cls, i) => (
                  <div key={i} style={{ marginBottom: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#4B5563', marginBottom: '2px' }}>
                      <span>{cls.className}</span>
                      <strong>{cls.assignment}%</strong>
                    </div>
                    <div className="compare-bar-track">
                      <div className={`compare-bar-fill ${cls.color}`} style={{ width: `${cls.assignment}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="sidebar-divider" style={{ margin: '12px 0' }} />

              {/* Metric 4: Exam Scores */}
              <div className="compare-row-item">
                <div className="compare-row-header">
                  <span>Exam Performance Average</span>
                </div>
                {classComparison.map((cls, i) => (
                  <div key={i} style={{ marginBottom: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#4B5563', marginBottom: '2px' }}>
                      <span>{cls.className}</span>
                      <strong>{cls.exam}%</strong>
                    </div>
                    <div className="compare-bar-track">
                      <div className={`compare-bar-fill ${cls.color}`} style={{ width: `${cls.exam}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>
      )}
    </div>
  );
}
