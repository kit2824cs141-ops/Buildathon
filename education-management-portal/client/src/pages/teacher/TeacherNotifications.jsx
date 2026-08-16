import { useState } from 'react';
import { Bell, CheckCheck, AlertTriangle, FileText, Calendar, Users, X, Sparkles } from 'lucide-react';
import SectionCard from './components/SectionCard';

const notificationsData = [
  { id: 1, type: 'warning', icon: <AlertTriangle size={16} />, title: 'Low Attendance Alert — Karthik Raj', body: 'Roll CSE2602 has crossed below the 75% mandatory attendance threshold. Immediate counselling is recommended.', time: '10 mins ago', read: false },
  { id: 2, type: 'submission', icon: <FileText size={16} />, title: 'New Assignment Submission', body: 'Priya Nair (CSE2603) submitted "Binary Tree Traversal" assignment. Pending grading.', time: '42 mins ago', read: false },
  { id: 3, type: 'submission', icon: <FileText size={16} />, title: 'New Assignment Submission', body: 'Aditya Sen (CSE2604) submitted "Binary Tree Traversal" assignment. Pending grading.', time: '1 hr ago', read: false },
  { id: 4, type: 'exam', icon: <Calendar size={16} />, title: 'Exam Reminder — 5 Days Left', body: 'DSA Mid-Semester Examination is scheduled for Aug 24, 2026 (09:00 AM). Room 301 is confirmed.', time: '2 hrs ago', read: true },
  { id: 5, type: 'ai', icon: <Sparkles size={16} />, title: 'AI Insight Generated', body: 'New AI academic insight detected: Bimodal grade distribution in DBMS Mid-Term. View recommendations.', time: '3 hrs ago', read: true },
  { id: 6, type: 'system', icon: <Bell size={16} />, title: 'System Announcement', body: 'The academic portal will undergo scheduled maintenance on Aug 20, 2026 from 11:00 PM – 2:00 AM IST.', time: 'Yesterday', read: true },
  { id: 7, type: 'class', icon: <Users size={16} />, title: 'Class Timetable Updated', body: 'CSE-A Operating Systems lecture has been moved from Room 301 to Lab 102 for this week.', time: 'Yesterday', read: true },
];

const typeColors = {
  warning: { bg: '#FEF2F2', accent: '#EF4444', icon: '#EF4444' },
  submission: { bg: '#EFF6FF', accent: '#3B82F6', icon: '#3B82F6' },
  exam: { bg: '#FFF5EB', accent: '#FF6B00', icon: '#FF6B00' },
  ai: { bg: '#F5F3FF', accent: '#7C3AED', icon: '#7C3AED' },
  system: { bg: '#F9FAFB', accent: '#6B7280', icon: '#6B7280' },
  class: { bg: '#ECFDF5', accent: '#059669', icon: '#059669' },
};

export default function TeacherNotifications() {
  const [notifications, setNotifications] = useState(notificationsData);
  const [filter, setFilter] = useState('All');

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const dismiss = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filters = ['All', 'Unread', 'Submissions', 'Alerts', 'Exams'];
  const filtered = notifications.filter(n => {
    if (filter === 'All') return true;
    if (filter === 'Unread') return !n.read;
    if (filter === 'Submissions') return n.type === 'submission';
    if (filter === 'Alerts') return n.type === 'warning';
    if (filter === 'Exams') return n.type === 'exam';
    return true;
  });

  return (
    <div className="notifications-page">
      <div className="teacher-page-header">
        <div>
          <h1>Notification Centre</h1>
          <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>
            {unreadCount > 0 ? <><strong style={{ color: '#FF6B00' }}>{unreadCount} unread</strong> notifications</> : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button className="btn-teacher secondary" onClick={markAllRead}>
            <CheckCheck size={16} /> Mark All Read
          </button>
        )}
      </div>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: '6px 14px', borderRadius: '50px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', background: filter === f ? '#FF6B00' : '#F3F4F6', color: filter === f ? '#FFFFFF' : '#4B5563', border: 'none' }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.map(n => {
          const cfg = typeColors[n.type];
          return (
            <div key={n.id} style={{ display: 'flex', gap: '14px', padding: '16px 20px', borderRadius: '12px', background: n.read ? '#FAFBFC' : cfg.bg, border: `1px solid ${n.read ? '#E5E7EB' : cfg.accent}22`, position: 'relative', transition: 'all 0.2s' }}>
              {/* Unread dot */}
              {!n.read && <div style={{ position: 'absolute', top: '16px', left: '8px', width: '6px', height: '6px', borderRadius: '50%', background: cfg.accent }} />}

              {/* Icon */}
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${cfg.accent}18`, color: cfg.icon, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {n.icon}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <h4 style={{ margin: 0, fontSize: '13.5px', fontWeight: n.read ? 500 : 700, color: '#1A1A2E' }}>{n.title}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', color: '#9CA3AF', whiteSpace: 'nowrap' }}>{n.time}</span>
                    <button onClick={() => dismiss(n.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: '2px', display: 'flex', alignItems: 'center' }}>
                      <X size={14} />
                    </button>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: '12.5px', color: '#6B7280', lineHeight: '1.5' }}>{n.body}</p>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <SectionCard>
            <div className="page-placeholder">
              <div className="placeholder-icon"><Bell size={28} /></div>
              <h3>No Notifications</h3>
              <p>You're all caught up! No notifications in this category.</p>
            </div>
          </SectionCard>
        )}
      </div>
    </div>
  );
}
