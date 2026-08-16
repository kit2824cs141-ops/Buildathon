import { Link, useNavigate } from 'react-router-dom';
import { Menu, Bell, ChevronDown } from 'lucide-react';

export default function TeacherHeader({ onMobileToggle }) {
  const navigate = useNavigate();
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
        <div className="header-profile">
          <div className="avatar">MK</div>
          <div className="profile-info">
            <div className="profile-name">Prof. Muruga Kumar</div>
            <div className="profile-role">Senior Faculty</div>
          </div>
          <ChevronDown className="dropdown-icon" size={16} />
        </div>
      </div>
    </header>
  );
}
