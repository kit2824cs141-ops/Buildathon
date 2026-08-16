import React from 'react';
import {
  TrendingUp,
  Users,
  UserCheck,
  BookOpen,
  FileText,
  Award,
  BarChart3,
  Bot,
  ChevronLeft,
  ChevronRight,
  Shield
} from 'lucide-react';

export default function AdminSidebar({ activeTab, setActiveTab, collapsed, setCollapsed }) {
  const navItems = [
    { id: 'analytics', label: 'Global Analytics', icon: TrendingUp },
    { id: 'students', label: 'Manage Students', icon: Users },
    { id: 'teachers', label: 'Manage Teachers', icon: UserCheck },
    { id: 'courses', label: 'Manage Courses & Classes', icon: BookOpen },
    { id: 'assignments', label: 'Manage Assignments', icon: FileText },
    { id: 'exams', label: 'Manage Exams & Grades', icon: Award },
    { id: 'reports', label: 'View Reports & Analytics', icon: BarChart3 },
    { id: 'ai', label: 'AI Insights & Monitoring', icon: Bot },
  ];

  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Header */}
      <div 
        style={{
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={18} style={{ color: 'var(--primary)' }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Super Admin</h3>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: 'var(--bg-hover)',
            border: '1px solid var(--border)',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
          }}
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav List */}
      <div style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: isActive ? 'var(--primary-bg)' : 'transparent',
                color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                width: '100%',
                textAlign: 'left',
                borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
              }}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={19} style={{ flexShrink: 0, color: isActive ? 'var(--primary)' : 'inherit' }} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
