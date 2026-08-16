import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, GraduationCap, FileText, ClipboardCheck, Award, Calendar, TrendingUp, BarChart3, Sparkles, Bot, Bell, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

const navItems = [
  { to: '/teacher/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/teacher/courses', icon: BookOpen, label: 'Courses' },
  { to: '/teacher/classes', icon: Users, label: 'Classes' },
  { to: '/teacher/students', icon: GraduationCap, label: 'Students' },
  { to: '/teacher/assignments', icon: FileText, label: 'Assignments' },
  { to: '/teacher/attendance', icon: ClipboardCheck, label: 'Attendance' },
  { to: '/teacher/examinations', icon: Award, label: 'Examinations' },
  { to: '/teacher/timetable', icon: Calendar, label: 'Timetable' },
  { divider: true },
  { to: '/teacher/performance', icon: TrendingUp, label: 'Performance' },
  { to: '/teacher/reports', icon: BarChart3, label: 'Reports' },
  { to: '/teacher/ai-insights', icon: Sparkles, label: 'AI Insights' },
  { to: '/teacher/ai-assistant', icon: Bot, label: 'AI Assistant' },
  { divider: true },
  { to: '/teacher/notifications', icon: Bell, label: 'Notifications' },
  { to: '/teacher/settings', icon: Settings, label: 'Settings' },
];

export default function TeacherSidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  return (
    <>
      <div className={`sidebar-overlay ${mobileOpen ? 'visible' : ''}`} onClick={() => setMobileOpen(false)} />
      <aside className={`teacher-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-info">
            <div className="brand-logo">EP</div>
            <div className="brand-text">
              <h3>EduPortal</h3>
              <span>by EDITH</span>
            </div>
          </div>
          <button className="sidebar-toggle" onClick={() => { setCollapsed(!collapsed); setMobileOpen(false); }}>
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        <div className="sidebar-role">Teacher</div>

        <nav className="sidebar-nav">
          {navItems.map((item, i) =>
            item.divider ? (
              <div className="sidebar-divider" key={`div-${i}`} />
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <item.icon className="nav-icon" size={20} />
                <span className="nav-label">{item.label}</span>
              </NavLink>
            )
          )}
        </nav>
      </aside>
    </>
  );
}
