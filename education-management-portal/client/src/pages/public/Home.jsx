import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Users, Award, ArrowRight, GraduationCap, BarChart3, Bot, CheckCircle } from 'lucide-react';

export default function Home() {
  const { currentUser, role } = useAuth();

  const getDashboardLink = () => {
    if (role === 'admin')   return '/admin/dashboard';
    if (role === 'teacher') return '/teacher/dashboard';
    if (role === 'student') return '/student/dashboard';
    return '/login';
  };

  return (
    <div style={{ fontFamily: 'var(--font-sans)', background: 'var(--bg-base)', minHeight: '100vh' }}>

      {/* Navbar */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: '64px'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <GraduationCap size={18} color="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>EduPortal</span>
        </Link>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Link to="/courses" style={{ padding: '8px 16px', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem', borderRadius: '8px', transition: 'all 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--primary)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
          >Courses</Link>
          <Link to="/contact" style={{ padding: '8px 16px', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem', borderRadius: '8px', transition: 'all 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--primary)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
          >Contact</Link>
          {currentUser ? (
            <Link to={getDashboardLink()} className="btn btn-primary" style={{ padding: '9px 20px', fontSize: '0.875rem' }}>My Dashboard</Link>
          ) : (
            <>
              <Link to="/login" style={{ padding: '9px 18px', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem', border: '1.5px solid var(--primary-border)', borderRadius: '8px' }}>Sign In</Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '9px 20px', fontSize: '0.875rem' }}>Get Started</Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        padding: '100px 40px 80px',
        textAlign: 'center',
        background: 'radial-gradient(at 30% 20%, rgba(242,92,5,0.06) 0px, transparent 60%), radial-gradient(at 80% 10%, rgba(14,165,233,0.05) 0px, transparent 60%)'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(242,92,5,0.08)', border: '1px solid rgba(242,92,5,0.2)', borderRadius: '50px', padding: '6px 16px', marginBottom: '28px' }}>
          <Bot size={14} color="var(--primary)" />
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)' }}>AI-Powered Education Management</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-1.5px' }}>
          The Smart Campus<br />
          <span style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8C38)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Management Platform</span>
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.7 }}>
          Streamline academics for students, teachers, and administrators with real-time data, AI insights, and a unified digital campus experience.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to={currentUser ? getDashboardLink() : '/register'} className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1rem', gap: '8px' }}>
            {currentUser ? 'Go to Dashboard' : 'Start Free'}
            <ArrowRight size={16} />
          </Link>
          <Link to="/courses" style={{ padding: '14px 32px', fontSize: '1rem', fontWeight: 600, border: '1.5px solid var(--border)', borderRadius: '10px', textDecoration: 'none', color: 'var(--text-primary)', background: 'var(--bg-white)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={16} /> Browse Courses
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '0 40px 80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
          {[
            { num: '500+', label: 'Students Enrolled', icon: <Users size={22} color="var(--primary)" /> },
            { num: '50+',  label: 'Expert Teachers',   icon: <Award size={22} color="#3B82F6" /> },
            { num: '120+', label: 'Active Courses',    icon: <BookOpen size={22} color="#10B981" /> },
            { num: '98%',  label: 'Exam Pass Rate',    icon: <BarChart3 size={22} color="#8B5CF6" /> },
          ].map((s, i) => (
            <div key={i} className="card" style={{ textAlign: 'center', padding: '28px 20px' }}>
              <div style={{ marginBottom: '12px' }}>{s.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-1px' }}>{s.num}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '0 40px 100px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 800, marginBottom: '12px', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Everything you need, in one place</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '48px', fontSize: '1rem' }}>Three powerful portals — each tailored for its users.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {[
            {
              title: 'Student Portal', color: '#FF6B00', bg: 'rgba(255,107,0,0.06)',
              icon: <GraduationCap size={28} color="#FF6B00" />,
              desc: 'Track your courses, attendance, grades, and get AI-powered study recommendations.',
              features: ['My Courses & Syllabus', 'Attendance Tracker', 'Grades & GPA', 'AI Study Plans'],
              link: '/student/dashboard', cta: 'Student Login'
            },
            {
              title: 'Teacher Portal', color: '#3B82F6', bg: 'rgba(59,130,246,0.06)',
              icon: <Users size={28} color="#3B82F6" />,
              desc: 'Manage your classes, mark attendance, grade assignments, and monitor student performance.',
              features: ['Class Management', 'Attendance Marking', 'Grade Assignments', 'AI Risk Alerts'],
              link: '/teacher/dashboard', cta: 'Teacher Login'
            },
            {
              title: 'Admin Portal', color: '#10B981', bg: 'rgba(16,185,129,0.06)',
              icon: <BarChart3 size={28} color="#10B981" />,
              desc: 'Institutional overview — manage users, courses, and get analytics reports.',
              features: ['User Management', 'Course Catalog', 'Exam Scheduling', 'Analytics & Reports'],
              link: '/admin/dashboard', cta: 'Admin Login'
            },
          ].map((card, i) => (
            <div key={i} className="card" style={{ borderTop: `3px solid ${card.color}`, padding: '28px' }}>
              <div style={{ width: '52px', height: '52px', background: card.bg, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                {card.icon}
              </div>
              <h3 style={{ fontWeight: 800, fontSize: '1.15rem', marginBottom: '8px', color: 'var(--text-primary)' }}>{card.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>{card.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {card.features.map((f, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle size={14} color={card.color} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: card.color, fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
                {card.cta} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ margin: '0 40px 80px', background: 'linear-gradient(135deg, #FF6B00, #FF8C38)', borderRadius: '20px', padding: '60px 40px', textAlign: 'center' }}>
        <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>Ready to transform your campus?</h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '32px', fontSize: '1rem' }}>Join hundreds of students and educators already on EduPortal.</p>
        <Link to="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'white', color: '#FF6B00', fontWeight: 700, padding: '14px 32px', borderRadius: '10px', textDecoration: 'none', fontSize: '1rem' }}>
          Create Free Account <ArrowRight size={16} />
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1rem' }}>EduPortal</span>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link to="/courses" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>Courses</Link>
          <Link to="/contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>Contact</Link>
          <Link to="/login"   style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>Login</Link>
        </div>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>© 2026 EduPortal. All rights reserved.</span>
      </footer>
    </div>
  );
}
