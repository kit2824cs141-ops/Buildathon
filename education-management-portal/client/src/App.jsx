// Main Routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Public Pages
import Home from './pages/public/Home';
import Courses from './pages/public/Courses';
import CourseDetails from './pages/public/CourseDetails';
import Contact from './pages/public/Contact';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Student Pages
import StudentLayout from './components/StudentLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import MyCourses from './pages/student/MyCourses';
import Assignments from './pages/student/Assignments';
import Attendance from './pages/student/Attendance';
import Grades from './pages/student/Grades';
import Progress from './pages/student/Progress';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

// Context
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/contact" element={<Contact />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentLayout><StudentDashboard /></StudentLayout>} />
          <Route path="/student/courses" element={<StudentLayout><MyCourses /></StudentLayout>} />
          <Route path="/student/assignments" element={<StudentLayout><Assignments /></StudentLayout>} />
          <Route path="/student/attendance" element={<StudentLayout><Attendance /></StudentLayout>} />
          <Route path="/student/grades" element={<StudentLayout><Grades /></StudentLayout>} />
          <Route path="/student/progress" element={<StudentLayout><Progress /></StudentLayout>} />

          {/* Teacher Routes */}
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
