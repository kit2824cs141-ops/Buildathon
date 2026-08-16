import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Clock, Star, GraduationCap, ArrowLeft, Filter } from 'lucide-react';

const COURSES = [
  { id: 'course_001', title: 'Machine Learning Fundamentals', teacher: 'Dr. Priya M', category: 'AIML', credits: 4, duration: '90 hours', difficulty: 'Intermediate', rating: 4.7, enrollments: 60, description: 'Core concepts of ML including supervised, unsupervised, and reinforcement learning.' },
  { id: 'course_002', title: 'Deep Learning with Python', teacher: 'Dr. Priya M', category: 'AIML', credits: 4, duration: '90 hours', difficulty: 'Advanced', rating: 4.5, enrollments: 45, description: 'Neural networks, CNNs, RNNs, and transformers using Python and TensorFlow.' },
  { id: 'course_003', title: 'Data Structures and Algorithms', teacher: 'Dr. Priya M', category: 'CS Core', credits: 3, duration: '60 hours', difficulty: 'Beginner', rating: 4.3, enrollments: 80, description: 'Fundamental data structures and algorithm design techniques.' },
  { id: 'course_004', title: 'Database Management Systems', teacher: 'Prof. Anand K', category: 'CS Core', credits: 4, duration: '75 hours', difficulty: 'Intermediate', rating: 4.6, enrollments: 70, description: 'Relational databases, SQL, normalization, and query optimization.' },
  { id: 'course_005', title: 'Web Technologies', teacher: 'Prof. Meena S', category: 'CS Core', credits: 3, duration: '60 hours', difficulty: 'Beginner', rating: 4.4, enrollments: 90, description: 'HTML, CSS, JavaScript, React and full-stack web development fundamentals.' },
  { id: 'course_006', title: 'Computer Networks', teacher: 'Dr. Rajan P', category: 'CS Core', credits: 4, duration: '80 hours', difficulty: 'Intermediate', rating: 4.2, enrollments: 55, description: 'OSI model, TCP/IP, routing protocols, and network security fundamentals.' },
];

const DIFF_COLORS = { Beginner: '#10B981', Intermediate: '#F59E0B', Advanced: '#EF4444' };

export default function Courses() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = COURSES.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.teacher.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || c.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8C38)', padding: '48px 40px 60px' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '24px' }}>
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <h1 style={{ color: 'white', fontSize: '2.2rem', fontWeight: 900, marginBottom: '8px', letterSpacing: '-0.5px' }}>Course Catalog</h1>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem' }}>Browse all available courses across departments</p>
      </div>

      {/* Filters */}
      <div style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--border)', padding: '20px 40px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', marginTop: '-20px', borderRadius: '16px 16px 0 0', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ flex: 1, minWidth: '240px', display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: '10px', padding: '10px 14px' }}>
          <Search size={16} color="var(--text-muted)" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses or teachers..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.9rem', flex: 1, fontFamily: 'inherit', color: 'var(--text-primary)' }} />
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Filter size={16} color="var(--text-muted)" />
          {['All', 'AIML', 'CS Core'].map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              style={{ padding: '8px 16px', borderRadius: '8px', border: '1.5px solid', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'inherit', transition: 'all 0.2s',
                borderColor: category === cat ? 'var(--primary)' : 'var(--border)',
                background: category === cat ? 'var(--primary-bg)' : 'transparent',
                color: category === cat ? 'var(--primary)' : 'var(--text-secondary)' }}
            >{cat}</button>
          ))}
        </div>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: 'auto' }}>{filtered.length} courses</span>
      </div>

      {/* Grid */}
      <div style={{ padding: '32px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {filtered.map(course => (
            <div key={course.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span style={{ background: 'var(--primary-bg)', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '6px' }}>{course.category}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', background: `${DIFF_COLORS[course.difficulty]}18`, color: DIFF_COLORS[course.difficulty] }}>{course.difficulty}</span>
              </div>

              <div style={{ width: '44px', height: '44px', background: 'var(--primary-bg)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <BookOpen size={20} color="var(--primary)" />
              </div>

              <h3 style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.3 }}>{course.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '16px', flex: 1 }}>{course.description}</p>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={13} /> {course.duration}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><GraduationCap size={13} /> {course.credits} Credits</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={13} color="#F59E0B" fill="#F59E0B" /> {course.rating}</span>
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Instructor</div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{course.teacher}</div>
                </div>
                <Link to={`/courses/${course.id}`} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>View Details</Link>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
            <BookOpen size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
            <p>No courses found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
