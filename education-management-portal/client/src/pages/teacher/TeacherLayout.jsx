import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TeacherSidebar from './components/TeacherSidebar';
import TeacherHeader from './components/TeacherHeader';
import './TeacherDashboard.css';

export default function TeacherLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={`teacher-layout ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <TeacherSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="teacher-main-area">
        <TeacherHeader onMobileToggle={() => setMobileOpen(!mobileOpen)} />
        <main className="teacher-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
