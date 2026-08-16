import { useState } from 'react';
import { FileText, Calendar, Clock, AlertTriangle, CheckCircle, Upload, FileUp, Check } from 'lucide-react';

export default function Assignments() {
  const [filter, setFilter] = useState('all');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [assignments, setAssignments] = useState([
    {
      id: 'asg-01',
      title: 'Lab 4: SQL Complex Queries & Views',
      courseId: 'CS204',
      courseName: 'DBMS',
      dueDate: '2026-08-21',
      status: 'pending',
      desc: 'Complete all questions in SQL Lab sheet 4. Implement subqueries, outer joins, and materialised views. Submit single .sql file.',
      points: '100 pts',
      daysLeft: 5
    },
    {
      id: 'asg-02',
      title: 'Assignment 2: Red-Black Trees Balancing',
      courseId: 'CS201',
      courseName: 'Data Structures',
      dueDate: '2026-08-18',
      status: 'pending',
      desc: 'Draw balancing rotations step-by-step for the given binary tree insertions. Submit PDF.',
      points: '50 pts',
      daysLeft: 2
    },
    {
      id: 'asg-03',
      title: 'Problem Set 4: Double Integrals in Polar Coords',
      courseId: 'MATH302',
      courseName: 'Calculus III',
      dueDate: '2026-08-14',
      status: 'submitted',
      desc: 'Solve problem sheet 4 questions 1-10. Show complete steps and sketch integration regions.',
      points: '80 pts',
      daysLeft: -2
    },
    {
      id: 'asg-04',
      title: 'Physics Lab 3: Ohm\'s Law & Series Circuits',
      courseId: 'PHYS202',
      courseName: 'General Physics II',
      dueDate: '2026-08-10',
      status: 'graded',
      desc: 'Submit experimental readings, calculations, errors analysis graphs and conclusion.',
      points: '100 pts',
      score: '94/100',
      feedback: 'Excellent work in calculations. Graph titles were missing details.'
    }
  ]);

  const filteredAssignments = assignments.filter(asg => {
    if (filter === 'all') return true;
    return asg.status === filter;
  });

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleAssignmentSubmit = (e) => {
    e.preventDefault();
    if (!uploadFile) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Update status in assignments
      setAssignments(assignments.map(asg => 
        asg.id === selectedAssignment.id ? { ...asg, status: 'submitted' } : asg
      ));

      setTimeout(() => {
        setSubmitSuccess(false);
        setUploadFile(null);
        setSelectedAssignment(null);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="tab-view-container animate-fade">
      <div className="view-title-row">
        <h2 className="view-title">Assignments Board</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className={`btn-brand-outline ${filter === 'all' ? 'active' : ''}`} style={{ padding: '6px 12px', fontSize: '0.8rem', background: filter === 'all' ? 'var(--primary-bg)' : '' }} onClick={() => setFilter('all')}>All</button>
          <button className={`btn-brand-outline ${filter === 'pending' ? 'active' : ''}`} style={{ padding: '6px 12px', fontSize: '0.8rem', background: filter === 'pending' ? 'var(--primary-bg)' : '' }} onClick={() => setFilter('pending')}>Pending</button>
          <button className={`btn-brand-outline ${filter === 'submitted' ? 'active' : ''}`} style={{ padding: '6px 12px', fontSize: '0.8rem', background: filter === 'submitted' ? 'var(--primary-bg)' : '' }} onClick={() => setFilter('submitted')}>Submitted</button>
          <button className={`btn-brand-outline ${filter === 'graded' ? 'active' : ''}`} style={{ padding: '6px 12px', fontSize: '0.8rem', background: filter === 'graded' ? 'var(--primary-bg)' : '' }} onClick={() => setFilter('graded')}>Graded</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedAssignment ? '1fr 1fr' : '1fr', gap: '24px' }}>
        {/* Assignments List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredAssignments.map((asg) => (
            <div 
              key={asg.id} 
              className={`edu-card ${selectedAssignment?.id === asg.id ? 'stat-glow' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                if (asg.status !== 'graded') {
                  setSelectedAssignment(asg);
                }
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="edu-badge edu-badge-primary">{asg.courseName} ({asg.courseId})</span>
                
                <span className={`edu-badge ${
                  asg.status === 'pending' ? (asg.daysLeft <= 2 ? 'edu-badge-warning' : 'edu-badge-info') :
                  asg.status === 'submitted' ? 'edu-badge-primary' : 'edu-badge-success'
                }`}>
                  {asg.status === 'pending' ? `Due in ${asg.daysLeft} days` :
                   asg.status === 'submitted' ? 'Submitted' : 'Graded'}
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>{asg.title}</h3>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} /> Due: {asg.dueDate}
                </span>
                <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>
                  {asg.status === 'graded' ? `Score: ${asg.score}` : `Weight: ${asg.points}`}
                </span>
              </div>

              {asg.status === 'graded' && asg.feedback && (
                <div style={{ marginTop: '12px', padding: '10px', background: 'var(--bg-hover)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--success)', fontSize: '0.8rem' }}>
                  <strong>Feedback:</strong> {asg.feedback}
                </div>
              )}
            </div>
          ))}

          {filteredAssignments.length === 0 && (
            <div className="edu-card" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              No assignments found in this section.
            </div>
          )}
        </div>

        {/* Selected Assignment Submit Drawer */}
        {selectedAssignment && (
          <div className="edu-card animate-fade" style={{ height: 'fit-content', position: 'sticky', top: '88px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span className="edu-badge edu-badge-primary" style={{ marginBottom: '6px' }}>{selectedAssignment.courseName} Assignment</span>
                <h3 style={{ fontSize: '1.25rem' }}>{selectedAssignment.title}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Submission portal closes soon.</p>
              </div>
              <button 
                onClick={() => setSelectedAssignment(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                ×
              </button>
            </div>

            <div style={{ background: 'var(--bg-hover)', padding: '12px', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.5' }}>
              {selectedAssignment.desc}
            </div>

            {submitSuccess ? (
              <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--success)' }}>
                <CheckCircle size={48} style={{ marginBottom: '10px' }} />
                <h4>Assignment Uploaded Successfully!</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Status is now updated to Submitted.</p>
              </div>
            ) : (
              <form onSubmit={handleAssignmentSubmit}>
                <div style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius-md)', padding: '24px', textAlign: 'center', cursor: 'pointer', marginBottom: '20px', position: 'relative', background: uploadFile ? 'var(--primary-bg)' : '' }}>
                  <input 
                    type="file" 
                    onChange={handleFileUpload} 
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                  />
                  {uploadFile ? (
                    <div>
                      <FileUp size={36} color="var(--primary)" style={{ marginBottom: '8px' }} />
                      <p style={{ fontSize: '0.85rem', fontWeight: '600' }}>{uploadFile.name}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{(uploadFile.size / 1024).toFixed(1)} KB • Click or drag to replace</p>
                    </div>
                  ) : (
                    <div>
                      <Upload size={36} color="var(--text-muted)" style={{ marginBottom: '8px' }} />
                      <p style={{ fontSize: '0.85rem', fontWeight: '500' }}>Click to select a file or drag here</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PDF, SQL, ZIP formats accepted (Max 10MB)</p>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="button" className="btn-brand-outline" style={{ flex: 1 }} onClick={() => { setUploadFile(null); setSelectedAssignment(null); }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-brand" style={{ flex: 2, display: 'flex', justifyContent: 'center' }} disabled={!uploadFile || isSubmitting}>
                    {isSubmitting ? 'Uploading...' : 'Submit Assignment'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
