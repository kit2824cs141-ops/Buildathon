import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Users, Calendar, Award, ClipboardCheck, BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';
import StatCard from './components/StatCard';
import SectionCard from './components/SectionCard';

const classDetailsData = {
  'csea-3': {
    name: 'CSE-A (3rd Year)',
    section: 'A',
    studentsCount: 45,
    attendanceRate: 92,
    assignmentAvg: 85,
    examAvg: 79,
    classAverage: '82%',
    students: [
      { roll: 'CSE2601', name: 'Rahul Sharma', attendance: 95, assignmentAvg: 88, examAvg: 85, overall: 86, status: 'On Track' },
      { roll: 'CSE2602', name: 'Karthik Raj', attendance: 65, assignmentAvg: 55, examAvg: 58, overall: 56, status: 'At Risk' },
      { roll: 'CSE2603', name: 'Priya Nair', attendance: 88, assignmentAvg: 72, examAvg: 78, overall: 76, status: 'Warning' },
      { roll: 'CSE2604', name: 'Aditya Sen', attendance: 98, assignmentAvg: 95, examAvg: 92, overall: 94, status: 'On Track' },
      { roll: 'CSE2605', name: 'Meera Das', attendance: 94, assignmentAvg: 90, examAvg: 88, overall: 89, status: 'On Track' },
    ]
  },
  'cseb-2': {
    name: 'CSE-B (2nd Year)',
    section: 'B',
    studentsCount: 52,
    attendanceRate: 88,
    assignmentAvg: 78,
    examAvg: 73,
    classAverage: '76%',
    students: [
      { roll: 'CSE2610', name: 'Siddharth Roy', attendance: 92, assignmentAvg: 82, examAvg: 80, overall: 81, status: 'On Track' },
      { roll: 'CSE2611', name: 'Ananya Iyer', attendance: 96, assignmentAvg: 92, examAvg: 90, overall: 91, status: 'On Track' },
    ]
  }
};

export default function TeacherClassDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('students');

  const cls = classDetailsData[id] || {
    name: 'Class Details',
    section: 'N/A',
    studentsCount: 0,
    attendanceRate: 0,
    assignmentAvg: 0,
    examAvg: 0,
    classAverage: 'N/A',
    students: []
  };

  return (
    <div className="details-container">
      {/* Header */}
      <div className="teacher-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn-teacher secondary" style={{ padding: '8px' }} onClick={() => navigate('/teacher/classes')}>
            <ChevronLeft size={18} />
          </button>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px' }}>{cls.name}</h1>
            <p style={{ margin: 0, color: '#6B7280', fontSize: '13px' }}>Section: {cls.section} • Academic Overview</p>
          </div>
        </div>
      </div>

      {/* Class Level stats */}
      <div className="stats-grid">
        <StatCard
          title="Class Average"
          value={cls.classAverage}
          icon={<Award size={20} />}
          gradient="gradient-1"
          iconColor="orange"
        />
        <StatCard
          title="Attendance Rate"
          value={`${cls.attendanceRate}%`}
          icon={<ClipboardCheck size={20} />}
          gradient="gradient-2"
          valueColor="blue"
          iconColor="blue"
        />
        <StatCard
          title="Assignment Average"
          value={`${cls.assignmentAvg}%`}
          icon={<TrendingUp size={20} />}
          gradient="gradient-4"
          valueColor="green"
          iconColor="green"
        />
        <StatCard
          title="Examination Avg"
          value={`${cls.examAvg}%`}
          icon={<Users size={20} />}
          gradient="gradient-3"
          valueColor="cyan"
          iconColor="cyan"
        />
      </div>

      {/* Grid Layout */}
      <div className="details-grid">
        {/* Main Content */}
        <div className="details-main">
          <SectionCard title="Class Roster">
            <div className="table-container" style={{ margin: 0 }}>
              <table className="teacher-table">
                <thead>
                  <tr>
                    <th>Roll Number</th>
                    <th>Student Name</th>
                    <th>Attendance</th>
                    <th>Assignments</th>
                    <th>Exams</th>
                    <th>Overall Performance</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cls.students.map((st, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>{st.roll}</td>
                      <td>{st.name}</td>
                      <td>{st.attendance}%</td>
                      <td>{st.assignmentAvg}%</td>
                      <td>{st.examAvg}%</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div className="progress-bar-container" style={{ width: '60px' }}>
                            <div className="progress-bar-fill orange" style={{ width: `${st.overall}%` }}></div>
                          </div>
                          <span className="progress-text">{st.overall}%</span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${
                          st.status === 'On Track' ? 'badge-success' : st.status === 'Warning' ? 'badge-warning' : 'badge-primary'
                        }`} style={{ background: st.status === 'At Risk' ? '#FEF2F2' : '', color: st.status === 'At Risk' ? '#EF4444' : '' }}>
                          {st.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn-teacher secondary" style={{ padding: '4px 10px', fontSize: '12px' }} onClick={() => navigate(`/teacher/students/1`)}>
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                  {cls.students.length === 0 && (
                    <tr>
                      <td colSpan="8" style={{ textAlign: 'center', padding: '30px' }}>No student details found for this class.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        {/* Sidebar panels */}
        <div className="details-sidebar">
          <SectionCard title="Performance Analytics">
            <div className="chart-placeholder" style={{ height: '180px', marginBottom: '16px' }}>
              <BarChart3 size={20} />
              <span style={{ fontSize: '12px' }}>Weekly Performance Trend</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="info-row">
                <span className="info-label">Total At-Risk Students</span>
                <span className="info-value" style={{ color: '#EF4444' }}>
                  {cls.students.filter(s => s.status === 'At Risk').length} Students
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Class Schedule</span>
                <span className="info-value">Mon, Wed, Fri</span>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
