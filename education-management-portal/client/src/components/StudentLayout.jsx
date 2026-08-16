import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  User, BookOpen, FileText, Calendar, Award, Compass, BarChart2, 
  HelpCircle, MessageSquare, Sun, Moon, LogOut, ChevronDown, Bell, CheckSquare, Sparkles, TrendingUp
} from 'lucide-react';

export default function StudentLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hi! I am your AI Study Assistant. Ask me anything about your courses, assignments, or progress!' }
  ]);
  const [userInput, setUserInput] = useState('');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-theme');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const query = userInput.trim();
    if (!query) return;

    const newMsgs = [...chatMessages, { sender: 'user', text: query }];
    setChatMessages(newMsgs);
    setUserInput('');

    // Mock AI response
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      let botResponse = "I'm analyzing your academic record. To improve your overall performance, I suggest reviewing your General Physics II notes.";

      if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
        botResponse = "Hello Alex! I am your EduPortal AI Assistant. How can I help you with your studies, assignments, or grades today?";
      } else if (lowerQuery.includes('gpa') || lowerQuery.includes('grade') || lowerQuery.includes('transcript') || lowerQuery.includes('score')) {
        botResponse = "Your current Cumulative GPA is 3.82. Your grades are: DBMS (A), Data Structures (A-), Calculus III (B), and Physics II (C+). Let me know if you want study tips for any of these!";
      } else if (lowerQuery.includes('course') || lowerQuery.includes('class') || lowerQuery.includes('schedule')) {
        botResponse = "You are enrolled in 4 courses: CS201 (Data Structures), MATH302 (Calculus III), PHYS202 (Physics II), and CS204 (DBMS). Your next class is Calculus III tomorrow at 9:00 AM in Hall A.";
      } else if (lowerQuery.includes('assignment') || lowerQuery.includes('homework') || lowerQuery.includes('lab') || lowerQuery.includes('task')) {
        botResponse = "You have 3 pending tasks: 'Red-Black Trees balancing' for Data Structures (due in 2 days) and 'SQL Complex Queries' for DBMS (due in 5 days). You also have a submitted Calculus problem set.";
      } else if (lowerQuery.includes('attendance') || lowerQuery.includes('absent') || lowerQuery.includes('late')) {
        botResponse = "Your average attendance is 94.1%. You have been late 3 times and absent twice (Aug 5 and Aug 12). If you need to request an excuse, click 'Request Absence Excuse' on the Attendance page.";
      } else if (lowerQuery.includes('weak') || lowerQuery.includes('subject') || lowerQuery.includes('physics') || lowerQuery.includes('calculus')) {
        botResponse = "Your weakest subject is General Physics II (45% syllabus complete, C+ grade). Calculus III is also at 62%. Focus on DC Circuits and triple integrals this week.";
      } else if (lowerQuery.includes('tip') || lowerQuery.includes('improve') || lowerQuery.includes('study')) {
        botResponse = "Study Tip: Try dedicating 25 minutes of focused study followed by a 5-minute break (Pomodoro method). Also check the 'Improvement Tips' section under 'MY PROGRESS' for a custom checklist!";
      } else if (lowerQuery.includes('help') || lowerQuery.includes('capabilities') || lowerQuery.includes('what can you do')) {
        botResponse = "I can tell you about: 1. Your current Grades & GPA, 2. Enrolled Courses & Schedule, 3. Upcoming Assignments & Labs, 4. Attendance Stats, 5. Weak Subjects & Custom study tips.";
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 600);
  };

  const getPageInfo = (path) => {
    switch (path) {
      case '/student/dashboard':
        return {
          title: "What is this page for?",
          desc: "This is the student dashboard providing a high-level overview of your active courses, upcoming assignments, and study milestones."
        };
      case '/student/courses':
        return {
          title: "My Courses Portal",
          desc: "Access your enrolled courses, view syllabus details, check lesson progress, and download course documents."
        };
      case '/student/assignments':
        return {
          title: "Assignments Tracker",
          desc: "View, upload, and track submissions for all pending, completed, and graded course assignments."
        };
      case '/student/attendance':
        return {
          title: "Attendance Tracker",
          desc: "Monitor your overall class attendance stats, view monthly schedules, and check attendance details per subject."
        };
      case '/student/grades':
        return {
          title: "Academic Transcript & Grades",
          desc: "Review your overall cumulative GPA, exam scores, individual course grades, and performance details."
        };
      case '/student/progress':
        return {
          title: "My Progress & Performance Insights",
          desc: "Visualize your academic performance, identify weak subjects, view personalized study suggestions, and get automated AI recommendations."
        };
      default:
        return {
          title: "Student Portal Portal",
          desc: "Manage your academic journey, tracking courses, scores, recommendations and personal goals."
        };
    }
  };

  const pageInfo = getPageInfo(location.pathname);

  const menuItemsDashboard = [
    { name: 'Profile', path: '/student/dashboard?tab=profile', icon: User },
    { name: 'My Courses', path: '/student/courses', icon: BookOpen },
    { name: 'My Assignments', path: '/student/assignments', icon: FileText },
    { name: 'Attendance', path: '/student/attendance', icon: Calendar },
    { name: 'Grades', path: '/student/grades', icon: Award },
    { name: 'AI Recommendations', path: '/student/dashboard?tab=ai-rec', icon: Compass },
    { name: 'Progress Overview', path: '/student/dashboard?tab=overview', icon: TrendingUp },
  ];

  const menuItemsProgress = [
    { name: 'Performance Overview', path: '/student/progress?tab=performance', icon: BarChart2 },
    { name: 'Weak Subjects', path: '/student/progress?tab=weak', icon: CheckSquare },
    { name: 'Improvement Tips', path: '/student/progress?tab=tips', icon: Sparkles },
    { name: 'AI Insights', path: '/student/progress?tab=insights', icon: MessageSquare },
  ];

  const isActive = (path) => {
    // Exact match or query parameter match
    const currentFull = location.pathname + location.search;
    if (path.includes('?')) {
      return currentFull === path;
    }
    // For general routes without query, check base path but only if current path doesn't have query
    return location.pathname === path && !location.search;
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className={`portal-container ${darkMode ? 'dark-theme' : ''}`}>
      {/* Mesh grid background */}
      <div className="mesh-bg"></div>

      {/* Top Navbar */}
      <header className="portal-header">
        <div className="header-left">
          <div className="logo-container" onClick={() => navigate('/student/dashboard')}>
            <span className="logo-icon-box"></span>
            <span className="logo-text">EduPortal <span className="logo-sub">STUDENT</span></span>
          </div>
        </div>

        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/student/dashboard" className={`nav-link ${location.pathname.startsWith('/student') ? 'active' : ''}`}>Dashboard</Link>
        </nav>

        <div className="header-right">
          <button className="theme-toggle-btn" onClick={toggleDarkMode} title="Toggle Theme">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button className="notification-btn" title="Notifications">
            <Bell size={20} />
            <span className="notification-badge"></span>
          </button>

          <div className="profile-dropdown-wrapper">
            <div className="profile-trigger" onClick={() => setShowProfileMenu(!showProfileMenu)}>
              <span className="avatar-badge">S</span>
              <span className="profile-name">Global Student</span>
              <ChevronDown size={16} />
            </div>

            {showProfileMenu && (
              <div className="profile-menu">
                <div className="profile-menu-header">
                  <p className="menu-name">Global Student</p>
                  <p className="menu-email">student@eduportal.com</p>
                </div>
                <hr />
                <Link to="/student/dashboard?tab=profile" className="profile-menu-item" onClick={() => setShowProfileMenu(false)}>
                  <User size={16} /> My Profile
                </Link>
                <button className="profile-menu-item logout-btn" onClick={handleLogout}>
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="portal-body">
        {/* Left Sidebar */}
        <aside className="portal-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">USER DASHBOARD</h3>
            <ul className="sidebar-menu">
              {menuItemsDashboard.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <li key={item.name}>
                    <Link to={item.path} className={`sidebar-link ${active ? 'active' : ''}`}>
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-section-title">MY PROGRESS</h3>
            <ul className="sidebar-menu">
              {menuItemsProgress.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <li key={item.name}>
                    <Link to={item.path} className={`sidebar-link ${active ? 'active' : ''}`}>
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* Main Panel */}
        <main className="portal-content">
          {/* Top Informative Banner */}
          <div className="info-banner">
            <div className="info-icon-box">
              <HelpCircle size={20} />
            </div>
            <div className="info-text-container">
              <h4 className="info-banner-title">{pageInfo.title}</h4>
              <p className="info-banner-desc">{pageInfo.desc}</p>
            </div>
          </div>

          {/* Children View */}
          <div className="view-content-wrapper">
            {children}
          </div>
        </main>
      </div>

      {/* AI Assistant Chat Widget */}
      <div className="chatbot-widget">
        <button className="chatbot-trigger-btn" onClick={() => setShowChat(!showChat)} title="AI Study Assistant">
          <MessageSquare size={24} />
        </button>

        {showChat && (
          <div className="chatbot-window">
            <div className="chatbot-header">
              <div className="chatbot-header-title">
                <Sparkles size={18} className="sparkle-icon" />
                <span>AI Study Assistant</span>
              </div>
              <button className="chatbot-close-btn" onClick={() => setShowChat(false)}>×</button>
            </div>

            <div className="chatbot-messages">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`chat-message ${msg.sender}`}>
                  <div className="chat-bubble">{msg.text}</div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="chatbot-input-form">
              <input 
                type="text" 
                placeholder="Ask your assistant..." 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <button type="submit" className="chatbot-send-btn">Send</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
