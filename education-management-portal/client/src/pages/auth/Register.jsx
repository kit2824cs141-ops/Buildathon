import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student', rollNumber: '' });
  const [showPw, setShowPw]   = useState(false);
  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser, role } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser && role) {
      if (role === 'admin')   navigate('/admin/dashboard', { replace: true });
      else if (role === 'teacher') navigate('/teacher/dashboard', { replace: true });
      else navigate('/student/dashboard', { replace: true });
    }
  }, [currentUser, role, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    setError(null);
    try {
      // Create Firebase Auth user
      const cred = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const idToken = await cred.user.getIdToken();

      // Register profile in backend RTDB  
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idToken,
          name: formData.name,
          role: formData.role,
          rollNumber: formData.role === 'student' ? formData.rollNumber : undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Registration failed');
      }

      // AuthContext will pick up auth state change and redirect
    } catch (err) {
      const msg = err.code === 'auth/email-already-in-use' ? 'This email is already registered. Please sign in.'
                : err.code === 'auth/invalid-email'        ? 'Please enter a valid email address.'
                : err.message || 'Registration failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card register-card">
        <div className="auth-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '36px', height: '36px', background: 'var(--primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={20} color="white" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>EduPortal</span>
          </div>
          <h1>Create Account</h1>
          <p>Join the digital campus ecosystem</p>
        </div>

        {error && <div className="auth-alert error">{error}</div>}

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-group flex-group">
            <div>
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div>
              <label>Account Type</label>
              <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="you@university.edu" value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})} required />
          </div>

          {formData.role === 'student' && (
            <div className="form-group">
              <label>Student Roll Number</label>
              <input type="text" placeholder="e.g. 22ADS001" value={formData.rollNumber}
                onChange={e => setFormData({...formData, rollNumber: e.target.value})} required />
            </div>
          )}

          <div className="form-group">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <input type={showPw ? 'text' : 'password'} placeholder="Min. 6 characters" value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})} required style={{ paddingRight: '44px' }} />
              <button type="button" onClick={() => setShowPw(!showPw)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
        <p style={{ textAlign: 'center', marginTop: '8px' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'none' }}>← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}
