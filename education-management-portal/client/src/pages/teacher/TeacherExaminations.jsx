import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Plus, Calendar, Clock } from 'lucide-react';
import SectionCard from './components/SectionCard';
import SkeletonLoader from './components/SkeletonLoader';
import { getExaminations } from '../../services/academicDataService';


export default function TeacherExaminations() {
  const navigate = useNavigate();
  const [examsData, setExamsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    getExaminations().then(data => {
      // Normalize status field: centralised DB uses 'status', local used 'type'
      setExamsData(data.map(e => ({ ...e, name: e.title, type: e.status })));
      setLoading(false);
    });
  }, []);

  const filteredExams = examsData.filter(ex =>
    activeTab === 'upcoming' ? ex.type === 'Upcoming' : ex.type === 'Completed'
  );

  if (loading) return <div style={{ padding: '20px' }}><SkeletonLoader type="card" count={2} /></div>;


  return (
    <div className="examinations-page">
      <div className="teacher-page-header">
        <h1>Examinations & Assessments</h1>
        <div className="page-actions">
          <button className="btn-teacher primary"><Plus size={16} /> Schedule Exam</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="details-tabs">
        <button 
          className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`} 
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Exams ({examsData.filter(e => e.type === 'Upcoming').length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`} 
          onClick={() => setActiveTab('completed')}
        >
          Completed Exams ({examsData.filter(e => e.type === 'Completed').length})
        </button>
      </div>

      {/* Cards list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredExams.map(ex => (
          <SectionCard 
            key={ex.id} 
            title={ex.name} 
            actionLabel={ex.course}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '8px', fontSize: '13px', color: '#4B5563' }}>
              <div>
                <div style={{ color: '#9CA3AF', fontSize: '11px', marginBottom: '2px' }}>Target Class</div>
                <div style={{ fontWeight: 600, color: '#1A1A2E' }}>{ex.class}</div>
              </div>
              <div>
                <div style={{ color: '#9CA3AF', fontSize: '11px', marginBottom: '2px' }}>Date & Time</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#1A1A2E' }}>
                  <Calendar size={14} color="#FF6B00" />
                  <span>{ex.date}</span>
                </div>
              </div>
              <div>
                <div style={{ color: '#9CA3AF', fontSize: '11px', marginBottom: '2px' }}>Exam Duration</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} color="#FF6B00" />
                  <span>{ex.duration}</span>
                </div>
              </div>
              <div>
                <div style={{ color: '#9CA3AF', fontSize: '11px', marginBottom: '2px' }}>Maximum Marks</div>
                <div style={{ fontWeight: 700, color: '#FF6B00' }}>{ex.maxMarks} Marks</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
                <button 
                  className="btn-teacher secondary" 
                  style={{ padding: '6px 12px', fontSize: '12px' }}
                  onClick={() => navigate(`/teacher/examinations/${ex.id}`)}
                >
                  View details
                </button>
                <button 
                  className="btn-teacher primary" 
                  style={{ padding: '6px 12px', fontSize: '12px' }}
                  onClick={() => navigate(`/teacher/examinations/${ex.id}/marks`)}
                >
                  Enter Marks
                </button>
              </div>
            </div>
          </SectionCard>
        ))}

        {filteredExams.length === 0 && (
          <div className="section-card">
            <div className="page-placeholder">
              <div className="placeholder-icon"><Award size={28} /></div>
              <h3>No exams found</h3>
              <p>There are no exams recorded in this category currently.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
