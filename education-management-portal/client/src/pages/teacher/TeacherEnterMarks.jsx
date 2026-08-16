import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Save, Award } from 'lucide-react';
import SectionCard from './components/SectionCard';

const initialClassRoster = [
  { roll: 'CSE2601', name: 'Rahul Sharma', score: '', grade: '—', remarks: '' },
  { roll: 'CSE2602', name: 'Karthik Raj', score: '', grade: '—', remarks: '' },
  { roll: 'CSE2603', name: 'Priya Nair', score: '', grade: '—', remarks: '' },
  { roll: 'CSE2604', name: 'Aditya Sen', score: '', grade: '—', remarks: '' },
  { roll: 'CSE2605', name: 'Meera Das', score: '', grade: '—', remarks: '' },
];

export default function TeacherEnterMarks() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [maxMarks] = useState(50); // Mid-sem max
  const [roster, setRoster] = useState(initialClassRoster);
  const [success, setSuccess] = useState(false);

  const calculateGrade = (score) => {
    if (score === '' || isNaN(score)) return '—';
    const percent = (parseFloat(score) / maxMarks) * 100;
    if (percent >= 90) return 'A+';
    if (percent >= 80) return 'A';
    if (percent >= 70) return 'B';
    if (percent >= 60) return 'C';
    if (percent >= 50) return 'D';
    return 'F';
  };

  const handleScoreChange = (index, value) => {
    const updated = [...roster];
    
    // Boundary check
    let numericValue = value;
    if (value !== '') {
      numericValue = Math.min(maxMarks, Math.max(0, parseFloat(value)));
    }
    
    updated[index].score = numericValue;
    updated[index].grade = calculateGrade(numericValue);
    setRoster(updated);
  };

  const handleRemarksChange = (index, value) => {
    const updated = [...roster];
    updated[index].remarks = value;
    setRoster(updated);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      navigate(`/teacher/examinations/${id}`);
    }, 1500);
  };

  return (
    <div className="enter-marks-page" style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* Header */}
      <div className="teacher-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn-teacher secondary" style={{ padding: '8px' }} onClick={() => navigate(`/teacher/examinations/${id}`)}>
            <ChevronLeft size={18} />
          </button>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px' }}>Enter Examination Marks</h1>
            <p style={{ margin: 0, color: '#6B7280', fontSize: '13px' }}>Class: CSE-A (3rd Year) • Maximum Marks: {maxMarks}</p>
          </div>
        </div>
      </div>

      {success && (
        <div style={{ background: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', fontWeight: 600 }}>
          ✓ Examination scores compiled and saved successfully!
        </div>
      )}

      {/* Marks Registry Table */}
      <SectionCard title="Grades Compilation Sheet">
        <form onSubmit={handleSave}>
          <div className="table-container" style={{ margin: '0 0 20px 0' }}>
            <table className="teacher-table">
              <thead>
                <tr>
                  <th>Roll Number</th>
                  <th>Student Name</th>
                  <th style={{ width: '130px' }}>Marks Scored</th>
                  <th style={{ width: '100px' }}>Auto Grade</th>
                  <th>Teacher Remarks</th>
                </tr>
              </thead>
              <tbody>
                {roster.map((student, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{student.roll}</td>
                    <td>{student.name}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          type="number"
                          placeholder="Score"
                          required
                          min="0"
                          max={maxMarks}
                          step="0.5"
                          style={{ width: '80px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E5E7EB' }}
                          value={student.score}
                          onChange={(e) => handleScoreChange(i, e.target.value)}
                        />
                        <span style={{ fontSize: '12.5px', color: '#6B7280' }}>/ {maxMarks}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${
                        student.grade === 'A+' || student.grade === 'A' ? 'badge-success' : student.grade === 'B' || student.grade === 'C' ? 'badge-primary' : student.grade === 'D' ? 'badge-warning' : student.grade === 'F' ? 'badge-danger' : ''
                      }`} style={{ width: '45px', textAlign: 'center' }}>
                        {student.grade}
                      </span>
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="e.g. Good logical flow"
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E5E7EB' }}
                        value={student.remarks}
                        onChange={(e) => handleRemarksChange(i, e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button 
              type="button" 
              className="btn-teacher secondary" 
              onClick={() => navigate(`/teacher/examinations/${id}`)}
            >
              Discard Changes
            </button>
            <button type="submit" className="btn-teacher primary">
              <Save size={16} /> Save Scores
            </button>
          </div>
        </form>
      </SectionCard>
    </div>
  );
}
