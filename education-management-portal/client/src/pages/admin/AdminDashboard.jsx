import React, { useState, useEffect } from 'react';
import AdminHeader from '../../components/AdminHeader';
import AdminSidebar from '../../components/AdminSidebar';
import AIAssistantWidget from '../../components/AIAssistantWidget';
import { 
  adminApi, 
  initialAdminStats, 
  initialStudents, 
  initialTeachers, 
  initialCourses, 
  initialAssignments, 
  initialExams 
} from '../../services/api';
import { 
  Info, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  TrendingUp, 
  Users, 
  UserCheck, 
  BookOpen, 
  FileText, 
  Award, 
  BarChart3, 
  Bot, 
  CheckCircle, 
  AlertTriangle, 
  Download, 
  Printer, 
  X, 
  Sparkles, 
  DollarSign, 
  Clock, 
  RefreshCw 
} from 'lucide-react';

export default function AdminDashboard() {
  // Theme state
  const [theme, setTheme] = useState('light');

  // Sidebar & Navigation state
  const [activeTab, setActiveTab] = useState('analytics');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Data states
  const [stats, setStats] = useState(initialAdminStats);
  const [students, setStudents] = useState(initialStudents);
  const [teachers, setTeachers] = useState(initialTeachers);
  const [courses, setCourses] = useState(initialCourses);
  const [assignments, setAssignments] = useState(initialAssignments);
  const [exams, setExams] = useState(initialExams);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals state
  const [modalType, setModalType] = useState(null); // 'addStudent', 'editStudent', 'viewStudent', 'addTeacher', 'addCourse', 'addAssignment', 'addExam', 'exportReport'
  const [selectedItem, setSelectedItem] = useState(null);

  // Form states
  const [formData, setFormData] = useState({});

  // Toggle Light/Dark mode
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  // Sync data on load
  useEffect(() => {
    adminApi.getStats().then(data => setStats(data));
    adminApi.getStudents().then(data => setStudents(data));
    adminApi.getTeachers().then(data => setTeachers(data));
    adminApi.getCourses().then(data => setCourses(data));
    adminApi.getAssignments().then(data => setAssignments(data));
    adminApi.getExams().then(data => setExams(data));
  }, []);

  // Filter handlers
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'All' || s.department === deptFilter;
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const filteredTeachers = teachers.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'All' || t.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'All' || c.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  // Modal Submit Handlers
  const handleSaveStudent = (e) => {
    e.preventDefault();
    if (modalType === 'editStudent' && selectedItem) {
      setStudents(prev => prev.map(s => s.id === selectedItem.id ? { ...s, ...formData } : s));
    } else {
      const newStudent = {
        id: `STU-${Math.floor(1000 + Math.random() * 9000)}`,
        name: formData.name || 'New Student',
        email: formData.email || 'student@college.edu',
        department: formData.department || 'Computer Science',
        gpa: parseFloat(formData.gpa) || 8.5,
        attendance: parseInt(formData.attendance) || 85,
        status: formData.status || 'Active',
        enrolledCourses: 3
      };
      setStudents(prev => [newStudent, ...prev]);
    }
    closeModal();
  };

  const handleSaveTeacher = (e) => {
    e.preventDefault();
    const newTeacher = {
      id: `TCH-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name || 'New Professor',
      email: formData.email || 'prof@college.edu',
      department: formData.department || 'Computer Science',
      coursesAssigned: formData.courses ? formData.courses.split(',') : ['CS-101'],
      status: 'Active',
      rating: 4.8
    };
    setTeachers(prev => [newTeacher, ...prev]);
    closeModal();
  };

  const handleSaveCourse = (e) => {
    e.preventDefault();
    const newCourse = {
      id: formData.id || `CS-${Math.floor(100 + Math.random() * 800)}`,
      title: formData.title || 'Advanced Subject',
      department: formData.department || 'Computer Science',
      instructor: formData.instructor || 'Dr. Alan Turing',
      studentsEnrolled: parseInt(formData.studentsEnrolled) || 30,
      credits: parseInt(formData.credits) || 3,
      status: 'Active'
    };
    setCourses(prev => [newCourse, ...prev]);
    closeModal();
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm(`Are you sure you want to delete student ${id}?`)) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleDeleteTeacher = (id) => {
    if (window.confirm(`Are you sure you want to delete teacher ${id}?`)) {
      setTeachers(prev => prev.filter(t => t.id !== id));
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedItem(null);
    setFormData({});
  };

  // Helper banner text per tab
  const getBannerInfo = () => {
    switch (activeTab) {
      case 'analytics':
        return {
          title: "What is this page for?",
          description: "This is the master dashboard providing a high-level overview of total colleges, students, and overall system processing volume."
        };
      case 'students':
        return {
          title: "What is this page for?",
          description: "Manage student enrollments, track performance, view academic profiles, and update account statuses across all academic departments."
        };
      case 'teachers':
        return {
          title: "What is this page for?",
          description: "Overview of faculty members, department assignments, course workloads, and teaching performance metrics."
        };
      case 'courses':
        return {
          title: "What is this page for?",
          description: "Configure course catalogs, assign lead instructors, manage class capacities, and credit allocation."
        };
      case 'assignments':
        return {
          title: "What is this page for?",
          description: "Monitor student assignment progress across all courses, track submission rates, and manage submission deadlines."
        };
      case 'exams':
        return {
          title: "What is this page for?",
          description: "Schedule midterm and final examinations, publish grade results, and monitor overall GPA distribution."
        };
      case 'reports':
        return {
          title: "What is this page for?",
          description: "System-wide analytics reports including attendance trends, financial collection ledger, and academic outputs."
        };
      case 'ai':
        return {
          title: "What is this page for?",
          description: "AI-powered automated insights, early risk detection flags for struggling students, and operational anomaly monitoring."
        };
      default:
        return { title: "What is this page for?", description: "Admin Management Portal" };
    }
  };

  const infoBannerText = getBannerInfo();

  return (
    <div className="app-layout">
      {/* Top Header Navbar */}
      <AdminHeader theme={theme} toggleTheme={toggleTheme} />

      <div className="admin-layout-container">
        {/* Left Sidebar Navigation */}
        <AdminSidebar 
          activeTab={activeTab} 
          setActiveTab={(tab) => { setActiveTab(tab); setSearchTerm(''); }} 
          collapsed={sidebarCollapsed} 
          setCollapsed={setSidebarCollapsed} 
        />

        {/* Main Content Area */}
        <main className="admin-main-content">
          {/* Information Banner (Paper Buddy Style) */}
          <div className="info-banner">
            <Info className="info-icon" size={20} />
            <div>
              <h4>{infoBannerText.title}</h4>
              <p>{infoBannerText.description}</p>
            </div>
          </div>

          {/* Top KPI Stat Cards */}
          <div className="stat-cards-grid">
            <div className="stat-card">
              <div className="stat-title">Total Colleges</div>
              <div className="stat-value">{stats.totalColleges}</div>
              <div className="stat-subtitle">{stats.activeSubscriptions} Active Subscriptions</div>
            </div>

            <div className="stat-card" style={{ background: 'var(--card-gradient-2)' }}>
              <div className="stat-title">Total Students</div>
              <div className="stat-value">{students.length}</div>
              <div className="stat-subtitle">Across all tenants</div>
            </div>

            <div className="stat-card" style={{ background: 'var(--card-gradient-3)' }}>
              <div className="stat-title">Total Processed Volume</div>
              <div className="stat-value">{stats.totalProcessedVolume}</div>
              <div className="stat-subtitle">{stats.revenueSubtitle}</div>
            </div>

            <div className="stat-card">
              <div className="stat-title">Active Faculty</div>
              <div className="stat-value">{teachers.length}</div>
              <div className="stat-subtitle">Across 4 Departments</div>
            </div>
          </div>

          {/* ── TAB 1: GLOBAL ANALYTICS ── */}
          {activeTab === 'analytics' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                
                {/* System Activity Feed */}
                <div className="card">
                  <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={18} style={{ color: 'var(--primary)' }} /> System Activity Log
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div className="badge badge-success" style={{ marginTop: '2px' }}>Enrollment</div>
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Sophia Chen enrolled in AI-401</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>10 minutes ago</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div className="badge badge-primary" style={{ marginTop: '2px' }}>Exam</div>
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Grades published for Midterm Assessment CS-201</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>1 hour ago</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div className="badge badge-warning" style={{ marginTop: '2px' }}>AI Alert</div>
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>AI flagged Alex Smith for attendance drops</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>3 hours ago</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Admin Actions */}
                <div className="card">
                  <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={18} style={{ color: 'var(--primary)' }} /> Administrative Quick Actions
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <button className="btn btn-outline" onClick={() => { setActiveTab('students'); setModalType('addStudent'); }}>
                      <Plus size={16} /> Add Student
                    </button>
                    <button className="btn btn-outline" onClick={() => { setActiveTab('teachers'); setModalType('addTeacher'); }}>
                      <Plus size={16} /> Add Teacher
                    </button>
                    <button className="btn btn-outline" onClick={() => { setActiveTab('courses'); setModalType('addCourse'); }}>
                      <Plus size={16} /> Create Course
                    </button>
                    <button className="btn btn-primary" onClick={() => setModalType('exportReport')}>
                      <Download size={16} /> Export Report
                    </button>
                  </div>
                </div>
              </div>

              {/* Department Overview */}
              <div className="card">
                <h3 style={{ marginBottom: '16px' }}>Department Enrollment & Distribution</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                      <span>Computer Science</span>
                      <span style={{ fontWeight: 600 }}>68 Students (45%)</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '45%', height: '100%', background: 'var(--primary)' }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                      <span>Mathematics</span>
                      <span style={{ fontWeight: 600 }}>42 Students (28%)</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '28%', height: '100%', background: '#3B82F6' }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                      <span>Physics</span>
                      <span style={{ fontWeight: 600 }}>26 Students (17%)</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '17%', height: '100%', background: '#10B981' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 2: MANAGE STUDENTS ── */}
          {activeTab === 'students' && (
            <div className="card">
              <div className="table-toolbar">
                <div className="search-input-wrapper">
                  <Search size={18} />
                  <input 
                    type="text" 
                    placeholder="Search by student name, ID, or email..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} style={{ width: '180px' }}>
                    <option value="All">All Departments</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electrical Eng.">Electrical Eng.</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                  </select>

                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ width: '140px' }}>
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Suspended">Suspended</option>
                  </select>

                  <button className="btn btn-primary" onClick={() => setModalType('addStudent')}>
                    <Plus size={16} /> Add Student
                  </button>
                </div>
              </div>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Full Name</th>
                      <th>Department</th>
                      <th>GPA (out of 10)</th>
                      <th>Attendance</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((s) => (
                      <tr key={s.id}>
                        <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{s.id}</td>
                        <td>
                          <div>
                            <div style={{ fontWeight: 600 }}>{s.name}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.email}</div>
                          </div>
                        </td>
                        <td>{s.department}</td>
                        <td style={{ fontWeight: 700 }}>{s.gpa}</td>
                        <td>
                          <span style={{ color: s.attendance < 70 ? '#DC2626' : '#059669', fontWeight: 600 }}>
                            {s.attendance}%
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${s.status === 'Active' ? 'badge-success' : s.status === 'Pending' ? 'badge-warning' : 'badge-danger'}`}>
                            {s.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <button 
                              className="btn btn-ghost btn-sm" 
                              onClick={() => { setSelectedItem(s); setModalType('viewStudent'); }}
                              title="View Profile"
                            >
                              <Eye size={15} />
                            </button>
                            <button 
                              className="btn btn-ghost btn-sm" 
                              onClick={() => { setSelectedItem(s); setFormData(s); setModalType('editStudent'); }}
                              title="Edit Student"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button 
                              className="btn btn-ghost btn-sm" 
                              onClick={() => handleDeleteStudent(s.id)}
                              style={{ color: '#EF4444' }}
                              title="Delete Student"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── TAB 3: MANAGE TEACHERS ── */}
          {activeTab === 'teachers' && (
            <div className="card">
              <div className="table-toolbar">
                <div className="search-input-wrapper">
                  <Search size={18} />
                  <input 
                    type="text" 
                    placeholder="Search by teacher name or ID..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} style={{ width: '180px' }}>
                    <option value="All">All Departments</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                  </select>

                  <button className="btn btn-primary" onClick={() => setModalType('addTeacher')}>
                    <Plus size={16} /> Add Teacher
                  </button>
                </div>
              </div>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Teacher ID</th>
                      <th>Name & Email</th>
                      <th>Department</th>
                      <th>Assigned Courses</th>
                      <th>Rating</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeachers.map((t) => (
                      <tr key={t.id}>
                        <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{t.id}</td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{t.name}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t.email}</div>
                        </td>
                        <td>{t.department}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                            {t.coursesAssigned.map((c, i) => (
                              <span key={i} className="badge badge-primary">{c}</span>
                            ))}
                          </div>
                        </td>
                        <td style={{ fontWeight: 700, color: '#D97706' }}>⭐ {t.rating}</td>
                        <td>
                          <span className={`badge ${t.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                            {t.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button 
                            className="btn btn-ghost btn-sm" 
                            onClick={() => handleDeleteTeacher(t.id)}
                            style={{ color: '#EF4444' }}
                            title="Remove Teacher"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── TAB 4: MANAGE COURSES & CLASSES ── */}
          {activeTab === 'courses' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="table-toolbar">
                <div className="search-input-wrapper">
                  <Search size={18} />
                  <input 
                    type="text" 
                    placeholder="Search by course code or title..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <button className="btn btn-primary" onClick={() => setModalType('addCourse')}>
                  <Plus size={16} /> Create Course
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {filteredCourses.map((c) => (
                  <div key={c.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span className="badge badge-primary" style={{ fontSize: '0.8rem' }}>{c.id}</span>
                        <span className="badge badge-success">{c.status}</span>
                      </div>
                      <h4 style={{ marginBottom: '6px', fontSize: '1.05rem' }}>{c.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                        Dept: {c.department} • {c.credits} Credits
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', marginTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                      <div>
                        <span style={{ color: 'var(--text-muted)' }}>Instructor:</span>
                        <div style={{ fontWeight: 600 }}>{c.instructor}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Enrolled:</span>
                        <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{c.studentsEnrolled} Students</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB 5: MANAGE ASSIGNMENTS ── */}
          {activeTab === 'assignments' && (
            <div className="card">
              <div className="table-toolbar">
                <h3 style={{ fontSize: '1.1rem' }}>Active Course Assignments</h3>
                <button className="btn btn-primary" onClick={() => alert("Create Assignment dialog ready.")}>
                  <Plus size={16} /> Create Assignment
                </button>
              </div>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Assignment ID</th>
                      <th>Title</th>
                      <th>Course</th>
                      <th>Due Date</th>
                      <th>Submissions</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignments.map((a) => (
                      <tr key={a.id}>
                        <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{a.id}</td>
                        <td style={{ fontWeight: 600 }}>{a.title}</td>
                        <td><span className="badge badge-info">{a.course}</span></td>
                        <td>{a.dueDate}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '100px', height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                              <div style={{ width: `${(a.totalSubmissions / a.maxStudents) * 100}%`, height: '100%', background: 'var(--primary)' }}></div>
                            </div>
                            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{a.totalSubmissions}/{a.maxStudents}</span>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${a.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── TAB 6: MANAGE EXAMS & GRADES ── */}
          {activeTab === 'exams' && (
            <div className="card">
              <div className="table-toolbar">
                <h3 style={{ fontSize: '1.1rem' }}>Examination Schedule & Grade Management</h3>
                <button className="btn btn-primary" onClick={() => alert("Schedule Exam dialog ready.")}>
                  <Plus size={16} /> Schedule Exam
                </button>
              </div>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Exam Code</th>
                      <th>Assessment Name</th>
                      <th>Course</th>
                      <th>Date</th>
                      <th>Pass %</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exams.map((ex) => (
                      <tr key={ex.id}>
                        <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{ex.id}</td>
                        <td style={{ fontWeight: 600 }}>{ex.name}</td>
                        <td><span className="badge badge-primary">{ex.course}</span></td>
                        <td>{ex.date}</td>
                        <td style={{ fontWeight: 700, color: '#059669' }}>{ex.passPercentage}</td>
                        <td>
                          <span className={`badge ${ex.status === 'Published' ? 'badge-success' : 'badge-warning'}`}>
                            {ex.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── TAB 7: VIEW REPORTS & ANALYTICS ── */}
          {activeTab === 'reports' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                <div className="card">
                  <h4 style={{ marginBottom: '8px' }}>Attendance Performance Report</h4>
                  <p style={{ fontSize: '0.85rem', marginBottom: '16px' }}>Overall institutional attendance average across departments is <strong>88.4%</strong>.</p>
                  <button className="btn btn-outline" onClick={() => setModalType('exportReport')}>
                    <Printer size={16} /> Generate PDF Report
                  </button>
                </div>

                <div className="card">
                  <h4 style={{ marginBottom: '8px' }}>Global Revenue & Fee Ledger</h4>
                  <p style={{ fontSize: '0.85rem', marginBottom: '16px' }}>Total collections processed: <strong>₹4,85,000</strong>. Outstanding balance: 0.</p>
                  <button className="btn btn-outline" onClick={() => setModalType('exportReport')}>
                    <Download size={16} /> Export CSV Ledger
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 8: AI INSIGHTS & MONITORING ── */}
          {activeTab === 'ai' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Bot size={22} style={{ color: 'var(--primary)' }} /> AI Early Intervention Risk Detection
                </h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '16px' }}>
                  EDITH AI detected 3 students experiencing attendance or academic performance dips:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ padding: '12px 16px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontWeight: 700, color: '#DC2626' }}>Alex Smith (STU-1001)</span>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Attendance dropped to 62% in CS-201. Recommended counselor check-in.</div>
                    </div>
                    <button className="btn btn-sm btn-primary" onClick={() => alert("Alert sent to Academic Advisor.")}>Notify Counselor</button>
                  </div>

                  <div style={{ padding: '12px 16px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontWeight: 700, color: '#D97706' }}>Priya Sharma (STU-1002)</span>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Midterm score 54% in MATH-202. Recommended tutoring allocation.</div>
                    </div>
                    <button className="btn btn-sm btn-outline" onClick={() => alert("Tutoring resource assigned.")}>Assign Tutor</button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Floating AI Bot Assistant */}
      <AIAssistantWidget />

      {/* ── MODALS ── */}

      {/* Add / Edit Student Modal */}
      {(modalType === 'addStudent' || modalType === 'editStudent') && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalType === 'editStudent' ? 'Edit Student Details' : 'Add New Student'}</h3>
              <button className="btn btn-ghost btn-sm" onClick={closeModal}><X size={18} /></button>
            </div>
            <form onSubmit={handleSaveStudent}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    required 
                    defaultValue={selectedItem?.name || ''} 
                    onChange={e => setFormData({ ...formData, name: e.target.value })} 
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    required 
                    defaultValue={selectedItem?.email || ''} 
                    onChange={e => setFormData({ ...formData, email: e.target.value })} 
                  />
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Department</label>
                    <select 
                      defaultValue={selectedItem?.department || 'Computer Science'} 
                      onChange={e => setFormData({ ...formData, department: e.target.value })}
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Electrical Eng.">Electrical Eng.</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Physics">Physics</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>GPA (Scale 0 - 10)</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      min="0" 
                      max="10.0" 
                      defaultValue={selectedItem?.gpa || 8.5} 
                      placeholder="e.g. 8.5"
                      onChange={e => setFormData({ ...formData, gpa: e.target.value })} 
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Student</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Student Profile Modal */}
      {modalType === 'viewStudent' && selectedItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Student Profile - {selectedItem.name}</h3>
              <button className="btn btn-ghost btn-sm" onClick={closeModal}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
                <div className="avatar-circle" style={{ width: '50px', height: '50px', fontSize: '1.2rem' }}>
                  {selectedItem.name[0]}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem' }}>{selectedItem.name}</h4>
                  <p style={{ fontSize: '0.85rem' }}>{selectedItem.email} • ID: {selectedItem.id}</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', textAlign: 'center' }}>
                <div className="card" style={{ padding: '12px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>GPA (Out of 10)</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>{selectedItem.gpa} / 10</div>
                </div>
                <div className="card" style={{ padding: '12px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Attendance</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{selectedItem.attendance}%</div>
                </div>
                <div className="card" style={{ padding: '12px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Courses</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{selectedItem.enrolledCourses}</div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Teacher Modal */}
      {modalType === 'addTeacher' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Faculty Member</h3>
              <button className="btn btn-ghost btn-sm" onClick={closeModal}><X size={18} /></button>
            </div>
            <form onSubmit={handleSaveTeacher}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Faculty Full Name</label>
                  <input type="text" required onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" required onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <select onChange={e => setFormData({ ...formData, department: e.target.value })}>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Faculty</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {modalType === 'addCourse' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Course</h3>
              <button className="btn btn-ghost btn-sm" onClick={closeModal}><X size={18} /></button>
            </div>
            <form onSubmit={handleSaveCourse}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Course Code (e.g. CS-301)</label>
                  <input type="text" required onChange={e => setFormData({ ...formData, id: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Course Title</label>
                  <input type="text" required onChange={e => setFormData({ ...formData, title: e.target.value })} />
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Instructor</label>
                    <input type="text" defaultValue="Dr. Alan Turing" onChange={e => setFormData({ ...formData, instructor: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Credits</label>
                    <input type="number" defaultValue={4} onChange={e => setFormData({ ...formData, credits: e.target.value })} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Publish Course</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Export Report Modal */}
      {modalType === 'exportReport' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Export System Analytics Report</h3>
              <button className="btn btn-ghost btn-sm" onClick={closeModal}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <p style={{ marginBottom: '16px' }}>Generate and download comprehensive PDF/CSV analytics reports for institutional auditing.</p>
              <div className="form-group">
                <label>Report Format</label>
                <select>
                  <option>PDF Document (.pdf)</option>
                  <option>CSV Spreadsheet (.csv)</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
              <button className="btn btn-primary" onClick={() => { alert("Report generated and downloaded!"); closeModal(); }}>
                <Download size={16} /> Download
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
