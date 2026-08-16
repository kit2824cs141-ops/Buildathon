import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Star, Users, Award, CheckCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const COURSES = {
  course_001: { id: 'course_001', title: 'Machine Learning Fundamentals', teacher: 'Dr. Priya M', category: 'AIML', credits: 4, duration: '90 hours', difficulty: 'Intermediate', rating: 4.7, enrollments: 60, description: 'Core concepts of machine learning including supervised, unsupervised, and reinforcement learning. Build real-world ML pipelines using Python and scikit-learn.', modules: [{ title: 'Introduction to ML', topics: ['What is Machine Learning?', 'Types of ML', 'ML Workflow & Tools'] }, { title: 'Regression Models', topics: ['Linear Regression', 'Logistic Regression', 'Evaluation Metrics'] }, { title: 'Classification', topics: ['Decision Trees', 'SVM', 'K-Nearest Neighbors'] }] },
  course_002: { id: 'course_002', title: 'Deep Learning with Python', teacher: 'Dr. Priya M', category: 'AIML', credits: 4, duration: '90 hours', difficulty: 'Advanced', rating: 4.5, enrollments: 45, description: 'Neural networks, CNNs, RNNs, and transformers using Python and TensorFlow. Build state-of-the-art deep learning models.', modules: [{ title: 'Neural Networks', topics: ['Perceptrons', 'Backpropagation', 'Activation Functions'] }, { title: 'CNNs', topics: ['Convolutions', 'Pooling Layers', 'Image Classification'] }] },
  course_003: { id: 'course_003', title: 'Data Structures and Algorithms', teacher: 'Dr. Priya M', category: 'CS Core', credits: 3, duration: '60 hours', difficulty: 'Beginner', rating: 4.3, enrollments: 80, description: 'Fundamental data structures and algorithm design techniques. Build efficient programs with deep understanding of arrays, trees, graphs and sorting algorithms.', modules: [{ title: 'Arrays and Strings', topics: ['Traversal', 'Insertion & Deletion', 'Two-Pointer Technique'] }, { title: 'Trees', topics: ['Binary Trees', 'BST', 'Tree Traversals'] }] },
};

const DIFF_COLORS = { Beginner: '#10B981', Intermediate: '#F59E0B', Advanced: '#EF4444' };

export default function CourseDetails() {
  const { id } = useParams();
  const course = COURSES[id];
  const [openModule, setOpenModule] = useState(0);

  if (!course) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', fontFamily: 'var(--font-sans)' }}>
        <BookOpen size={48} style={{ opacity: 0.3 }} />
        <h2 style={{ color: 'var(--text-primary)' }}>Course not found</h2>
        <Link to="/courses" className="btn btn-primary">Browse All Courses</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1e293b, #334155)', padding: '48px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Link to="/courses" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '24px' }}>
            <ArrowLeft size={14} /> All Courses
          </Link>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span style={{ background: 'var(--primary)', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '6px' }}>{course.category}</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', background: `${DIFF_COLORS[course.difficulty]}30`, color: DIFF_COLORS[course.difficulty], border: `1px solid ${DIFF_COLORS[course.difficulty]}40` }}>{course.difficulty}</span>
          </div>
          <h1 style={{ color: 'white', fontSize: '2rem', fontWeight: 900, marginBottom: '12px', letterSpacing: '-0.5px' }}>{course.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '24px', maxWidth: '680px' }}>{course.description}</p>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {[
              { icon: <Star size={15} color="#F59E0B" fill="#F59E0B" />, text: `${course.rating} Rating` },
              { icon: <Users size={15} color="rgba(255,255,255,0.6)" />, text: `${course.enrollments} Students` },
              { icon: <Clock size={15} color="rgba(255,255,255,0.6)" />, text: course.duration },
              { icon: <Award size={15} color="rgba(255,255,255,0.6)" />, text: `${course.credits} Credits` },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>
                {item.icon} {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 40px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px', alignItems: 'start' }}>
        {/* Syllabus */}
        <div>
          <h2 style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: '20px', color: 'var(--text-primary)' }}>Course Syllabus</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {course.modules.map((mod, i) => (
              <div key={i} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <button onClick={() => setOpenModule(openModule === i ? -1 : i)}
                  style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'inherit' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '28px', height: '28px', background: 'var(--primary-bg)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)' }}>{i + 1}</div>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{mod.title}</span>
                  </div>
                  {openModule === i ? <ChevronDown size={16} color="var(--text-muted)" /> : <ChevronRight size={16} color="var(--text-muted)" />}
                </button>
                {openModule === i && (
                  <div style={{ borderTop: '1px solid var(--border)', padding: '12px 20px 16px' }}>
                    {mod.topics.map((t, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        <CheckCircle size={14} color="var(--primary)" />
                        {t}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar enrollment card */}
        <div className="card" style={{ position: 'sticky', top: '84px', padding: '28px', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', background: 'var(--primary-bg)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <BookOpen size={28} color="var(--primary)" />
          </div>
          <h3 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '8px', color: 'var(--text-primary)' }}>{course.title}</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
            <div style={{ textAlign: 'center', padding: '10px 16px', background: 'var(--bg-base)', borderRadius: '8px' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>{course.credits}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>Credits</div>
            </div>
            <div style={{ textAlign: 'center', padding: '10px 16px', background: 'var(--bg-base)', borderRadius: '8px' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>{course.modules.length}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>Modules</div>
            </div>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Instructor</div>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '24px' }}>{course.teacher}</div>
          <Link to="/login" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>Enroll Now</Link>
          <Link to="/courses" style={{ display: 'block', marginTop: '12px', color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}>Browse other courses</Link>
        </div>
      </div>
    </div>
  );
}
