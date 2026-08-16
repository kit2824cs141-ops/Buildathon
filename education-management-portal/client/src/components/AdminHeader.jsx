import React from 'react';
import { Sun, Moon, ChevronDown, Bell, ShieldCheck } from 'lucide-react';

export default function AdminHeader({ theme, toggleTheme, userProfile = { name: 'Global Super Admin', role: 'Super Admin', initials: 'G' } }) {
  return (
    <header className="main-navbar">
      {/* Brand Logo & Name */}
      <div className="navbar-brand">
        <div className="brand-icon">
          <ShieldCheck size={20} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Paper Buddy</span>
          </div>
          <div className="brand-tag">by E.D.I.T.H</div>
        </div>
      </div>

      {/* Main Nav Links */}
      <div className="navbar-nav">
        <a href="/" className="nav-item">Home</a>
        <a href="/admin/dashboard" className="nav-item active">Dashboard</a>
      </div>

      {/* Actions (Notifications, Theme Toggle, User Profile) */}
      <div className="navbar-actions">
        <button 
          className="icon-btn" 
          title="Notifications" 
          onClick={() => alert("System Notifications: All services operational.")}
        >
          <Bell size={18} />
        </button>

        <button 
          className="icon-btn" 
          onClick={toggleTheme} 
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="user-profile-badge">
          <div className="avatar-circle">{userProfile.initials}</div>
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{userProfile.name}</span>
          <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />
        </div>
      </div>
    </header>
  );
}
