import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Clock, Award, BarChart3, Users, Edit } from 'lucide-react';
import SectionCard from './components/SectionCard';
import StatCard from './components/StatCard';

const examDetailsMock = {
  ex1: {
    name: 'DSA Mid-Semester Examination',
    course: 'Data Structures & Algorithms',
    class: 'CSE-A (3rd Year)',
    date: 'Aug 24, 2026',
    duration: '2 Hours (09:00 AM - 11:00 AM)',
    maxMarks: 50,
    type: 'Upcoming',
    enrolledCount: 45,
    syllabusCovered: 'Module 1 & Module 2 (Complexity, Arrays, Linked Lists, Stacks, Queues)',
    marksUploaded: false,
    stats: {
      average: 'N/A',
      highest: 'N/A',
      passRate: 'N/A',
    }
  },
  ex3: {
    name: 'Machine Learning Quiz 1',
    course: 'Machine Learning',
    class: 'CSE-A (4th Year)',
    date: 'Aug 10, 2026',
    duration: '1 Hour (02:00 PM - 03:00 PM)',
    maxMarks: 20,
    type: 'Completed',
    enrolledCount: 38,
    syllabusCovered: 'Introduction to Supervised Learning, Linear and Logistic Regression',
    marksUploaded: true,
    stats: {
      average: '15.4 (77%)',
      highest: '19 / 20',
      passRate: '92%',
    },
    marks: [
      { roll: 'CSE2601', name: 'Rahul Sharma', score: 18, grade: 'A', remarks: 'Excellent logical flow' },
      { roll: 'CSE2602', name: 'Karthik Raj', score: 11, grade: 'D', remarks: 'Needs revision on regression models' },
      { roll: 'CSE2603', name: 'Priya Nair', score: 15, grade: 'B', remarks: 'Good attempt' },
      { roll: 'CSE2604', name: 'Aditya Sen', score: 19, grade: 'A+', remarks: 'Perfect methodology' },
    ]
  }
};

export default function TeacherExaminationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const exam = examDetailsMock[id] || {
    name: 'Examination Details',
    course: 'N/A',
    class: 'N/A',
    date: 'TBD',
    duration: 'TBD',
    maxMarks: 100,
    syllabusCovered: 'TBD',
    marksUploaded: false,
    stats: { average: 'N/A', highest: 'N/A', passRate: 'N/A' },
    marks: []
  };

  return (
    <div className="details-container">
      {/* Header */}
      <div className="teacher-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn-teacher secondary" style={{ padding: '8px' }} onClick={() => navigate('/teacher/examinations')}>
            <ChevronLeft size={18} />
          </button>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px' }}>{exam.name}</h1>
            <p style={{ margin: 0, color: '#6B7280', fontSize: '13px' }}>{exam.course} • Class: {exam.class}</p>
          </div>
        </div>
        <div className="page-actions">
          <button className="btn-teacher primary" onClick={() => navigate(`/teacher/examinations/${id}/marks`)}>
            <Edit size={16} /> Enter / Edit Marks
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="stats-grid">
        <StatCard
          title="Maximum Marks"
          value={exam.maxMarks}
          icon={<Award size={20} />}
          gradient="gradient-1"
          iconColor="orange"
        />
        <StatCard
          title="Class Average"
          value={exam.stats.average}
          icon={<BarChart3 size={20} />}
          gradient="gradient-2"
          valueColor="blue"
          iconColor="blue"
        />
        <StatCard
          title="Highest Score"
          value={exam.stats.highest}
          icon={<Award size={20} />}
          gradient="gradient-4"
          valueColor="green"
          iconColor="green"
        />
        <StatCard
          title="Pass Percentage"
          value={exam.stats.passRate}
          icon={<Users size={20} />}
          gradient="gradient-3"
          valueColor="cyan"
          iconColor="cyan"
        />
      </div>

      <div className="details-grid">
        {/* Main section */}
        <div className="details-main">
          {exam.marksUploaded ? (
            <SectionCard title="Student Scores Sheet">
              <div className="table-container" style={{ margin: 0 }}>
                <table className="teacher-table">
                  <thead>
                    <tr>
                      <th>Roll Number</th>
                      <th>Student Name</th>
                      <th>Score Obtained</th>
                      <th>Calculated Grade</th>
                      <th>Teacher Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exam.marks?.map((st, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 600 }}>{st.roll}</td>
                        <td>{st.name}</td>
                        <td style={{ fontWeight: 700, color: '#FF6B00' }}>
                          {st.score} / {exam.maxMarks}
                        </td>
                        <td>
                          <span className={`badge ${
                            st.grade.startsWith('A') ? 'badge-success' : st.grade.startsWith('B') ? 'badge-primary' : 'badge-warning'
                          }`}>
                            {st.grade}
                          </span>
                        </td>
                        <td>{st.remarks || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          ) : (
            <SectionCard>
              <div className="page-placeholder">
                <div className="placeholder-icon"><Award size={28} /></div>
                <h3>Marks Sheet Not Uploaded</h3>
                <p>Academic performance results have not been uploaded for this exam. Click 'Enter Marks' to log classroom scores.</p>
              </div>
            </SectionCard>
          )}
        </div>

        {/* Sidebar panel */}
        <div className="details-sidebar">
          <SectionCard title="Exam Parameters">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13.5px' }}>
              <div>
                <div style={{ color: '#9CA3AF', fontSize: '11px', marginBottom: '2px' }}>Examination Date</div>
                <div style={{ fontWeight: 600, color: '#1A1A2E' }}>{exam.date}</div>
              </div>
              <div>
                <div style={{ color: '#9CA3AF', fontSize: '11px', marginBottom: '2px' }}>Duration Details</div>
                <div style={{ fontWeight: 600, color: '#1A1A2E' }}>{exam.duration}</div>
              </div>
              <div className="sidebar-divider" style={{ margin: '4px 0' }} />
              <div>
                <div style={{ color: '#9CA3AF', fontSize: '11px', marginBottom: '4px' }}>Syllabus Scope</div>
                <p style={{ margin: 0, fontSize: '12.5px', color: '#6B7280', lineHeight: '1.5' }}>
                  {exam.syllabusCovered}
                </p>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
