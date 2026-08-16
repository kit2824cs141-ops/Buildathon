import { useState } from 'react';
import { Award, BookOpen, AlertCircle, HelpCircle } from 'lucide-react';

export default function Grades() {
  const [activeCourseId, setActiveCourseId] = useState('CS201');

  const gradeReport = [
    {
      id: 'CS201',
      name: 'Data Structures & Algorithms',
      gpaPoints: '3.7',
      grade: 'A-',
      components: [
        { name: 'Quizzes (Avg of 3)', weight: '15%', score: '92%' },
        { name: 'Lab Assignments (4)', weight: '35%', score: '88%' },
        { name: 'Midterm Exam', weight: '25%', score: '85%' },
        { name: 'Final Exam Project', weight: '25%', score: '90%' }
      ]
    },
    {
      id: 'MATH302',
      name: 'Calculus III',
      gpaPoints: '3.0',
      grade: 'B',
      components: [
        { name: 'Weekly Homeworks', weight: '10%', score: '80%' },
        { name: 'Class Quizzes', weight: '20%', score: '84%' },
        { name: 'Midterm Exam', weight: '30%', score: '78%' },
        { name: 'Final Exam Paper', weight: '40%', score: '82%' }
      ]
    },
    {
      id: 'PHYS202',
      name: 'General Physics II',
      gpaPoints: '2.3',
      grade: 'C+',
      components: [
        { name: 'Lab Experiments', weight: '20%', score: '94%' },
        { name: 'Surprise Tests', weight: '15%', score: '62%' },
        { name: 'Midterm Exam', weight: '25%', score: '70%' },
        { name: 'Final Written Exam', weight: '40%', score: '72%' }
      ]
    },
    {
      id: 'CS204',
      name: 'Database Management Systems',
      gpaPoints: '4.0',
      grade: 'A',
      components: [
        { name: 'Relational Model Quiz', weight: '10%', score: '100%' },
        { name: 'SQL Schema Lab', weight: '30%', score: '95%' },
        { name: 'Midterm Exam', weight: '25%', score: '92%' },
        { name: 'DBMS Capstone Project', weight: '35%', score: '98%' }
      ]
    }
  ];

  const selectedCourse = gradeReport.find(c => c.id === activeCourseId);

  return (
    <div className="tab-view-container animate-fade">
      <div className="view-title-row">
        <h2 className="view-title">Transcript & Gradebook</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        {/* Transcript Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="edu-card stat-glow" style={{ textAlign: 'center' }}>
            <div className="stat-label">CUMULATIVE GPA</div>
            <div className="stat-value">3.82</div>
            <div className="stat-footer">Passing status: <span className="stat-highlight" style={{ color: 'var(--success)' }}>Distinction</span></div>
          </div>

          <div className="edu-card">
            <h3 style={{ fontSize: '1rem', marginBottom: '12px' }}>Course GPA Directory</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {gradeReport.map((course) => (
                <div 
                  key={course.id}
                  onClick={() => setActiveCourseId(course.id)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    background: activeCourseId === course.id ? 'var(--primary-bg)' : 'var(--bg-white)',
                    borderColor: activeCourseId === course.id ? 'var(--primary)' : 'var(--border)',
                    transition: 'var(--transition)'
                  }}
                >
                  <div>
                    <p style={{ fontSize: '0.85rem', fontWeight: '700' }}>{course.id}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>GPA Points: {course.gpaPoints}</p>
                  </div>
                  <span className="edu-badge edu-badge-primary" style={{ fontSize: '0.85rem', fontWeight: '800' }}>{course.grade}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Course Grade breakdown */}
        {selectedCourse && (
          <div className="edu-card animate-fade">
            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '16px', marginBottom: '16px' }}>
              <span className="edu-badge edu-badge-primary" style={{ marginBottom: '6px' }}>{selectedCourse.id}</span>
              <h3 style={{ fontSize: '1.25rem' }}>{selectedCourse.name}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Grading Schema: Standard CSE weight distribution</p>
            </div>

            <h4 style={{ fontSize: '0.95rem', marginBottom: '12px' }}>Assessment Ledger</h4>
            
            <div className="edu-table-container" style={{ marginBottom: '20px' }}>
              <table className="edu-table">
                <thead>
                  <tr>
                    <th>Assessment Task</th>
                    <th>Course Weight</th>
                    <th>Score / Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCourse.components.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.name}</td>
                      <td>{item.weight}</td>
                      <td style={{ fontWeight: '700', color: 'var(--primary)' }}>{item.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ background: 'var(--bg-hover)', padding: '12px', borderRadius: 'var(--radius-sm)', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <AlertCircle size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                Note: Grades shown above are provisional. Final grades will be uploaded to official university transcripts post dean approval at the end of the term.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
