import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, FileText, Award, BarChart3, Clock, Sparkles, Star, ThumbsUp, ThumbsDown, BookOpen } from 'lucide-react';
import StatCard from './components/StatCard';
import SectionCard from './components/SectionCard';
import InsightCard from './components/InsightCard';

const student360Data = {
  '1': {
    name: 'Rahul Sharma',
    roll: 'CSE2601',
    class: 'CSE-A (3rd Year)',
    email: 'rahul.sharma@edu.in',
    attendance: 95,
    assignmentAvg: 88,
    examAvg: 85,
    overallGrade: '86% (A)',
    strongSubjects: ['Data Structures & Algorithms', 'Web Development'],
    weakSubjects: ['Theory of Computation'],
    recentActivities: [
      { type: 'submission', text: 'Submitted assignment "Binary Tree Traversal"', date: 'Today, 11:20 AM' },
      { type: 'exam', text: 'Scored 85% in DSA Mid-Semester Examination', date: 'Jul 15, 2026' },
      { type: 'attendance', text: 'Marked Present in Machine Learning Lab', date: 'Yesterday, 01:00 PM' }
    ],
    aiInsight: 'Rahul is highly consistent and shows exceptional logical skills in algorithms. He would benefit from advanced research project tasks or acting as a peer mentor for algorithm programming.',
    assignments: [
      { title: 'Binary Tree Traversal', score: '90/100', status: 'Graded' },
      { title: 'ER Diagram Design', score: '85/100', status: 'Graded' },
      { title: 'Stack & Queue Implementation', score: '92/100', status: 'Graded' }
    ],
    exams: [
      { name: 'Mid-Term Exam', score: '85%', status: 'Completed' },
      { name: 'Unit Quiz 1', score: '90%', status: 'Completed' },
    ]
  },
  '2': {
    name: 'Karthik Raj',
    roll: 'CSE2602',
    class: 'CSE-A (3rd Year)',
    email: 'karthik.raj@edu.in',
    attendance: 65,
    assignmentAvg: 55,
    examAvg: 58,
    overallGrade: '56% (D)',
    strongSubjects: ['Graphics & Design'],
    weakSubjects: ['Data Structures & Algorithms', 'Database Systems'],
    recentActivities: [
      { type: 'missed', text: 'Missed "Data Structures" lecture', date: 'Today, 09:00 AM' },
      { type: 'missed', text: 'Missed assignment deadline "Binary Tree Traversal"', date: 'Aug 18, 2026' },
      { type: 'attendance', text: 'Marked Present in Operating Systems', date: 'Yesterday, 03:00 PM' }
    ],
    aiInsight: 'Karthik is at severe risk of failing due to high absence rates (65% attendance). A parent check-in and targeted tutorial support on tree structures are recommended immediately.',
    assignments: [
      { title: 'Binary Tree Traversal', score: '0/100', status: 'Missing' },
      { title: 'ER Diagram Design', score: '60/100', status: 'Graded' },
      { title: 'Stack & Queue Implementation', score: '50/100', status: 'Graded' }
    ],
    exams: [
      { name: 'Mid-Term Exam', score: '58%', status: 'Completed' },
      { name: 'Unit Quiz 1', score: '52%', status: 'Completed' },
    ]
  }
};

export default function TeacherStudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('performance');

  const student = student360Data[id] || {
    name: 'Student Name',
    roll: id || 'N/A',
    class: 'Assigned Class',
    email: 'student@edu.in',
    attendance: 80,
    assignmentAvg: 70,
    examAvg: 70,
    overallGrade: '75% (B)',
    strongSubjects: ['General Subjects'],
    weakSubjects: ['None Identified'],
    recentActivities: [],
    aiInsight: 'AI has not generated insights for this student yet.',
    assignments: [],
    exams: []
  };

  const initials = student.name.split(' ').map(n => n[0]).join('');

  return (
    <div className="details-container">
      {/* Page Header */}
      <div className="teacher-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn-teacher secondary" style={{ padding: '8px' }} onClick={() => navigate('/teacher/students')}>
            <ChevronLeft size={18} />
          </button>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px' }}>Student Profile 360°</h1>
          </div>
        </div>
      </div>

      {/* Student Profile Card */}
      <div className="details-header-card">
        <div className="details-header-info">
          <div className="details-header-icon student-avatar orange">
            {initials}
          </div>
          <div className="details-header-text">
            <h2>{student.name}</h2>
            <p>Roll: {student.roll} • {student.class} • {student.email}</p>
          </div>
        </div>
        <div>
          <span className={`risk-badge ${student.attendance < 75 ? 'high' : 'low'}`} style={{ fontSize: '12px', padding: '6px 14px' }}>
            {student.attendance < 75 ? 'High Academic Risk' : 'Healthy Status'}
          </span>
        </div>
      </div>

      {/* Quick stats cards */}
      <div className="stats-grid">
        <StatCard
          title="Overall Average"
          value={student.overallGrade}
          icon={<Award size={20} />}
          gradient="gradient-1"
          iconColor="orange"
        />
        <StatCard
          title="Attendance Rate"
          value={`${student.attendance}%`}
          icon={<Calendar size={20} />}
          gradient={student.attendance >= 75 ? 'gradient-4' : 'gradient-5'}
          valueColor={student.attendance >= 75 ? 'green' : 'red'}
          iconColor={student.attendance >= 75 ? 'green' : 'red'}
        />
        <StatCard
          title="Assignment Average"
          value={`${student.assignmentAvg}%`}
          icon={<FileText size={20} />}
          gradient="gradient-2"
          valueColor="blue"
          iconColor="blue"
        />
        <StatCard
          title="Exam Average"
          value={`${student.examAvg}%`}
          icon={<BarChart3 size={20} />}
          gradient="gradient-3"
          valueColor="cyan"
          iconColor="cyan"
        />
      </div>

      {/* Details layout Grid */}
      <div className="details-grid">
        {/* Main Panel */}
        <div className="details-main">
          <div className="details-tabs">
            <button className={`tab-btn ${activeTab === 'performance' ? 'active' : ''}`} onClick={() => setActiveTab('performance')}>Performance details</button>
            <button className={`tab-btn ${activeTab === 'assignments' ? 'active' : ''}`} onClick={() => setActiveTab('assignments')}>Assignments</button>
            <button className={`tab-btn ${activeTab === 'exams' ? 'active' : ''}`} onClick={() => setActiveTab('exams')}>Exams</button>
          </div>

          {activeTab === 'performance' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <SectionCard title="Performance Trend">
                <div className="chart-placeholder" style={{ height: '200px' }}>
                  <BarChart3 size={22} />
                  <span>Performance Over Semester will be displayed here</span>
                </div>
              </SectionCard>

              {/* Strong / Weak Subjects */}
              <SectionCard title="Subject Diagnosis">
                <div className="strong-weak-grid">
                  <div className="sw-panel strong">
                    <h4><ThumbsUp size={16} /> Key Strengths</h4>
                    <ul>
                      {student.strongSubjects.map((sub, i) => <li key={i}>{sub}</li>)}
                    </ul>
                  </div>
                  <div className="sw-panel weak">
                    <h4><ThumbsDown size={16} /> Improvement Areas</h4>
                    <ul>
                      {student.weakSubjects.map((sub, i) => <li key={i}>{sub}</li>)}
                    </ul>
                  </div>
                </div>
              </SectionCard>
            </div>
          )}

          {activeTab === 'assignments' && (
            <SectionCard title="Assignments Submission Log">
              <div className="table-container" style={{ margin: 0 }}>
                <table className="teacher-table">
                  <thead>
                    <tr>
                      <th>Assignment Title</th>
                      <th>Earned Score</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.assignments.map((as, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 600 }}>{as.title}</td>
                        <td>{as.score}</td>
                        <td>
                          <span className={`badge ${
                            as.status === 'Graded' ? 'badge-success' : 'badge-primary'
                          }`} style={{ background: as.status === 'Missing' ? '#FEF2F2' : '', color: as.status === 'Missing' ? '#EF4444' : '' }}>
                            {as.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          )}

          {activeTab === 'exams' && (
            <SectionCard title="Examinations Record">
              <div className="table-container" style={{ margin: 0 }}>
                <table className="teacher-table">
                  <thead>
                    <tr>
                      <th>Exam Name</th>
                      <th>Earned Mark</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.exams.map((ex, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 600 }}>{ex.name}</td>
                        <td>{ex.score}</td>
                        <td>
                          <span className="badge badge-success">
                            {ex.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          )}
        </div>

        {/* Sidebar Panel */}
        <div className="details-sidebar">
          {/* AI Insights placeholder */}
          <SectionCard title="AI Academic Insight">
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: 'linear-gradient(135deg, #FFF5EB 0%, #FFF9F5 100%)', padding: '14px', borderRadius: '10px', border: '1px solid #FFE8D6' }}>
              <Sparkles size={20} color="#FF6B00" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ fontStyle: 'italic', fontSize: '12.5px', color: '#4B5563', lineHeight: '1.5' }}>
                "{student.aiInsight}"
              </p>
            </div>
          </SectionCard>

          {/* Recent Activity Log */}
          <SectionCard title="Recent Student Activity">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {student.recentActivities.map((act, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <Clock size={16} color="#9CA3AF" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: '13px', color: '#1A1A2E', fontWeight: 500, margin: 0 }}>{act.text}</p>
                    <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{act.date}</span>
                  </div>
                </div>
              ))}
              {student.recentActivities.length === 0 && (
                <div style={{ color: '#9CA3AF', fontSize: '13px' }}>No recent activity logged.</div>
              )}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
