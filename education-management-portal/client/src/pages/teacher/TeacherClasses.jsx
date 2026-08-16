import { useNavigate } from 'react-router-dom';
import { Users, Calendar, Award, BookOpen } from 'lucide-react';
import SectionCard from './components/SectionCard';

const classesData = [
  { id: 'csea-3', name: 'CSE-A (3rd Year)', section: 'A', students: 45, subjects: ['Data Structures & Algorithms', 'Machine Learning Lab'], schedule: 'Mon, Wed, Fri', avgPerf: '82%', attendance: '92%' },
  { id: 'cseb-2', name: 'CSE-B (2nd Year)', section: 'B', students: 52, subjects: ['Database Management Systems'], schedule: 'Tue, Thu', avgPerf: '76%', attendance: '88%' },
  { id: 'ita-3', name: 'IT-A (3rd Year)', section: 'A', students: 16, subjects: ['Operating Systems'], schedule: 'Tue, Fri', avgPerf: '80%', attendance: '85%' },
];

export default function TeacherClasses() {
  const navigate = useNavigate();

  return (
    <div className="classes-page">
      <div className="teacher-page-header">
        <h1>Assigned Classes</h1>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))' }}>
        {classesData.map((c) => (
          <SectionCard 
            key={c.id} 
            title={c.name} 
            actionLabel={`Section ${c.section}`}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderBottom: '1px solid #F3F4F6', paddingBottom: '8px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Users size={16} color="#FF6B00" />
                  <strong>{c.students} Students</strong>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={16} color="#FF6B00" />
                  <span>{c.schedule}</span>
                </span>
              </div>

              {/* Subjects */}
              <div style={{ fontSize: '13px' }}>
                <div style={{ fontWeight: 600, color: '#1A1A2E', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <BookOpen size={15} color="#FF6B00" />
                  <span>Taught Subjects:</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                  {c.subjects.map((sub, i) => (
                    <span 
                      key={i} 
                      style={{ background: '#FFF5EB', color: '#FF6B00', fontSize: '11px', padding: '3px 8px', borderRadius: '50px', fontWeight: 500 }}
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Class Performance Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: '#FAFBFC', padding: '10px 14px', borderRadius: '8px', border: '1px solid #F0F0F0', marginTop: '4px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#6B7280' }}>Class Average</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#1A1A2E', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Award size={15} color="#FF6B00" />
                    <span>{c.avgPerf}</span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#6B7280' }}>Avg Attendance</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#1A1A2E' }}>{c.attendance}</div>
                </div>
              </div>

              {/* Action Button */}
              <button 
                className="btn-teacher primary" 
                style={{ width: '100%', marginTop: '8px', justifyContent: 'center' }}
                onClick={() => navigate(`/teacher/classes/${c.id}`)}
              >
                View Class Details
              </button>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}
