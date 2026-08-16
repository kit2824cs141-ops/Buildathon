import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, Bell, ChevronDown, User, LogOut } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function TeacherHeader({ onMobileToggle }) {
  const navigate = useNavigate();
  const { userProfile, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="teacher-header">
      <div className="header-left">
        <button className="mobile-toggle" onClick={onMobileToggle} aria-label="Toggle sidebar">
          <Menu size={22} />
        </button>
        <nav className="header-nav">
          <Link to="/">Home</Link>
          <Link to="/teacher/dashboard">Dashboard</Link>
        </nav>
      </div>

      <div className="header-right">
        <button
          className="header-icon-btn"
          title="Notifications"
          onClick={() => navigate('/teacher/notifications')}
          aria-label="View notifications"
        >
          <Bell size={18} />
          <span className="notif-badge" />
        </button>

        <div className="profile-dropdown-wrapper" style={{ position: 'relative' }}>
          <div 
            className="header-profile" 
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="avatar" style={{ background: 'var(--primary)', color: 'white', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {userProfile?.name?.charAt(0) || 'T'}
            </div>
            <div className="profile-info" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="profile-name" style={{ fontWeight: '600', fontSize: '14px' }}>
                {userProfile?.name || 'Teacher Profile'}
              </div>
              <div className="profile-role" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {userProfile?.department || 'Faculty'}
              </div>
            </div>
            <ChevronDown className="dropdown-icon" size={16} />
          </div>

          {showProfileMenu && (
            <div style={{
              position: 'absolute', top: '100%', right: '0', marginTop: '10px', background: 'var(--bg-white)',
              boxShadow: 'var(--shadow-md)', borderRadius: 'var(--radius-md)', padding: '8px 0', minWidth: '220px',
              border: '1px solid var(--border)', zIndex: 50
            }}>
              <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--border)', marginBottom: '8px' }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>{userProfile?.name}</p>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>{userProfile?.email}</p>
              </div>
              <Link to="/teacher/settings" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '13.5px' }} onClick={() => setShowProfileMenu(false)}>
                <User size={16} /> My Settings
              </Link>
              <button 
                onClick={handleLogout}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '13.5px' }}
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
