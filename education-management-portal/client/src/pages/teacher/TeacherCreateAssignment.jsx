import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Save, Sparkles, UploadCloud } from 'lucide-react';
import SectionCard from './components/SectionCard';
import { useFeedback } from '../../context/FeedbackContext';

export default function TeacherCreateAssignment() {
  const navigate = useNavigate();
  const { showToast, confirmAction } = useFeedback();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    course: '',
    class: '',
    dueDate: '',
    maxMarks: '',
  });

  const isDirty = formData.title || formData.description || formData.course || formData.class || formData.dueDate || formData.maxMarks;

  const handleCancel = () => {
    if (isDirty) {
      confirmAction({
        title: 'Discard Changes',
        message: 'Are you sure you want to cancel? Any unsaved assignment details will be lost.',
        confirmText: 'Discard',
        cancelText: 'Keep Editing',
        onConfirm: () => navigate('/teacher/assignments')
      });
    } else {
      navigate('/teacher/assignments');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Assignment published successfully!', 'success');
    navigate('/teacher/assignments');
  };

  return (
    <div className="create-assignment-page" style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div className="teacher-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn-teacher secondary" style={{ padding: '8px' }} onClick={handleCancel}>
            <ChevronLeft size={18} />
          </button>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px' }}>Create New Assignment</h1>
            <p style={{ margin: 0, color: '#6B7280', fontSize: '13px' }}>Publish a new academic activity for your classes</p>
          </div>
        </div>
      </div>

      <SectionCard title="Assignment Information">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="form-group">
            <label htmlFor="title">Assignment Title *</label>
            <input 
              type="text" 
              id="title" 
              placeholder="e.g. Binary Tree Traversal Implementation" 
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Detailed Description *</label>
            <textarea 
              id="description" 
              placeholder="Provide instructions, algorithm complexity constraints, and testing criteria..." 
              required
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="course">Subject / Course *</label>
              <select 
                id="course" 
                required
                value={formData.course}
                onChange={(e) => setFormData({...formData, course: e.target.value})}
              >
                <option value="">Select Course</option>
                <option value="DSA">Data Structures & Algorithms (CS301)</option>
                <option value="DBMS">Database Management Systems (CS201)</option>
                <option value="ML">Machine Learning (CS401)</option>
                <option value="OS">Operating Systems (IT301)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="class">Target Class Section *</label>
              <select 
                id="class" 
                required
                value={formData.class}
                onChange={(e) => setFormData({...formData, class: e.target.value})}
              >
                <option value="">Select Class</option>
                <option value="csea-3">CSE-A (3rd Year)</option>
                <option value="cseb-2">CSE-B (2nd Year)</option>
                <option value="ita-3">IT-A (3rd Year)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dueDate">Due Date & Time *</label>
              <input 
                type="datetime-local" 
                id="dueDate" 
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label htmlFor="maxMarks">Maximum Marks *</label>
              <input 
                type="number" 
                id="maxMarks" 
                placeholder="e.g. 100" 
                required
                min="1"
                value={formData.maxMarks}
                onChange={(e) => setFormData({...formData, maxMarks: e.target.value})}
              />
            </div>
          </div>

          {/* Attachment placeholder */}
          <div className="form-group">
            <label>Attachments (Optional)</label>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', border: '2px dashed #E5E7EB', borderRadius: '10px', background: '#FAFBFC', cursor: 'pointer' }}>
              <UploadCloud size={32} color="#9CA3AF" style={{ marginBottom: '8px' }} />
              <span style={{ fontSize: '13px', color: '#4B5563', fontWeight: 500 }}>Upload assignment sheets or guideline templates</span>
              <span style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px' }}>Supports PDF, ZIP, DOCX up to 10MB</span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button 
              type="button" 
              className="btn-teacher secondary" 
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn-teacher primary">
              <Save size={16} /> Publish Assignment
            </button>
          </div>
        </form>
      </SectionCard>
    </div>
  );
}
