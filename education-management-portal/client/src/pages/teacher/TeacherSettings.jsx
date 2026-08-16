import { useState } from 'react';
import { User, Bell, Shield, Palette, Globe, Save, Camera } from 'lucide-react';
import SectionCard from './components/SectionCard';

export default function TeacherSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Prof. Muruga Kumar',
    email: 'muruga.kumar@edu.in',
    phone: '+91 98765 43210',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor',
    employeeId: 'EMP2024001',
    bio: 'Specialising in Data Structures, Machine Learning, and Database Systems with 12+ years of teaching experience.',
  });
  const [notifications, setNotifications] = useState({
    submissionAlerts: true, attendanceAlerts: true, examReminders: true,
    aiInsights: true, systemAnnouncements: false, emailDigest: false,
  });
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={15} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={15} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={15} /> },
    { id: 'security', label: 'Security', icon: <Shield size={15} /> },
  ];

  return (
    <div className="settings-page">
      <div className="teacher-page-header">
        <h1>Account Settings</h1>
      </div>

      {saved && (
        <div style={{ background: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', fontWeight: 600 }}>
          ✓ Settings saved successfully!
        </div>
      )}

      <div className="details-tabs">
        {tabs.map(tab => (
          <button key={tab.id} className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <form onSubmit={handleSave}>
          <SectionCard title="Personal Information">
            {/* Avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px', padding: '20px', background: '#FAFBFC', borderRadius: '12px', border: '1px solid #F0F0F0' }}>
              <div style={{ position: 'relative' }}>
                <div className="student-avatar orange" style={{ width: '72px', height: '72px', fontSize: '24px', borderRadius: '16px' }}>MK</div>
                <button type="button" style={{ position: 'absolute', bottom: '-4px', right: '-4px', width: '24px', height: '24px', borderRadius: '50%', background: '#FF6B00', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Camera size={12} color="white" />
                </button>
              </div>
              <div>
                <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700 }}>{profile.name}</h3>
                <p style={{ margin: '0 0 4px', fontSize: '13px', color: '#6B7280' }}>{profile.designation} • {profile.department}</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#9CA3AF' }}>Employee ID: {profile.employeeId}</p>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Department</label>
                <select value={profile.department} onChange={e => setProfile({...profile, department: e.target.value})}>
                  <option>Computer Science & Engineering</option>
                  <option>Information Technology</option>
                  <option>Electronics & Communication</option>
                  <option>Mechanical Engineering</option>
                </select>
              </div>
              <div className="form-group">
                <label>Designation</label>
                <select value={profile.designation} onChange={e => setProfile({...profile, designation: e.target.value})}>
                  <option>Assistant Professor</option>
                  <option>Associate Professor</option>
                  <option>Professor</option>
                  <option>Head of Department</option>
                </select>
              </div>
              <div className="form-group">
                <label>Employee ID</label>
                <input type="text" value={profile.employeeId} readOnly style={{ background: '#F9FAFB', color: '#6B7280' }} />
              </div>
            </div>
            <div className="form-group">
              <label>Bio / About</label>
              <textarea value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} />
            </div>
          </SectionCard>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button type="submit" className="btn-teacher primary"><Save size={16} /> Save Profile</button>
          </div>
        </form>
      )}

      {activeTab === 'notifications' && (
        <form onSubmit={handleSave}>
          <SectionCard title="Notification Preferences">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {Object.entries(notifications).map(([key, value]) => {
                const labels = {
                  submissionAlerts: { label: 'Assignment Submission Alerts', desc: 'Get notified when students submit assignments' },
                  attendanceAlerts: { label: 'Low Attendance Warnings', desc: 'Alerts when student attendance drops below 75%' },
                  examReminders: { label: 'Exam Schedule Reminders', desc: 'Reminders 5 days before scheduled examinations' },
                  aiInsights: { label: 'AI Generated Insights', desc: 'Receive AI-powered performance analysis reports' },
                  systemAnnouncements: { label: 'System Announcements', desc: 'Platform maintenance and update notifications' },
                  emailDigest: { label: 'Weekly Email Digest', desc: 'Summary of weekly activity sent to your email' },
                };
                const info = labels[key];
                return (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #F5F5F5' }}>
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#1A1A2E' }}>{info.label}</div>
                      <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>{info.desc}</div>
                    </div>
                    <div
                      onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                      style={{ width: '44px', height: '24px', borderRadius: '12px', background: value ? '#FF6B00' : '#E5E7EB', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}
                    >
                      <div style={{ position: 'absolute', top: '3px', left: value ? '23px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: '#FFFFFF', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button type="submit" className="btn-teacher primary"><Save size={16} /> Save Preferences</button>
          </div>
        </form>
      )}

      {activeTab === 'appearance' && (
        <form onSubmit={handleSave}>
          <SectionCard title="Display Preferences">
            <div className="form-grid">
              <div className="form-group">
                <label>Theme</label>
                <select value={theme} onChange={e => setTheme(e.target.value)}>
                  <option value="light">Light Mode</option>
                  <option value="dark">Dark Mode (Coming Soon)</option>
                  <option value="system">Follow System</option>
                </select>
              </div>
              <div className="form-group">
                <label><Globe size={14} style={{ display: 'inline', marginRight: '4px' }} />Language</label>
                <select value={language} onChange={e => setLanguage(e.target.value)}>
                  <option value="en">English</option>
                  <option value="ta">Tamil</option>
                  <option value="hi">Hindi</option>
                </select>
              </div>
            </div>
          </SectionCard>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button type="submit" className="btn-teacher primary"><Save size={16} /> Save Appearance</button>
          </div>
        </form>
      )}

      {activeTab === 'security' && (
        <form onSubmit={handleSave}>
          <SectionCard title="Security Settings">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="form-group">
                <label>Current Password</label>
                <input type="password" placeholder="Enter current password" />
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" placeholder="Enter new password" />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="Re-enter new password" />
                </div>
              </div>
              <div style={{ background: '#F9FAFB', borderRadius: '10px', padding: '14px 16px', border: '1px solid #E5E7EB' }}>
                <p style={{ margin: 0, fontSize: '12.5px', color: '#6B7280' }}>
                  Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters.
                </p>
              </div>
            </div>
          </SectionCard>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button type="submit" className="btn-teacher primary"><Shield size={16} /> Update Password</button>
          </div>
        </form>
      )}
    </div>
  );
}
