// Main Routing - Verified Wrap
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

// Teacher Pages & Layout
import TeacherLayout from './pages/teacher/TeacherLayout';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherCourses from './pages/teacher/TeacherCourses';
import TeacherCourseDetails from './pages/teacher/TeacherCourseDetails';
import TeacherClasses from './pages/teacher/TeacherClasses';
import TeacherClassDetails from './pages/teacher/TeacherClassDetails';
import TeacherStudents from './pages/teacher/TeacherStudents';
import TeacherStudentDetails from './pages/teacher/TeacherStudentDetails';
import TeacherAssignments from './pages/teacher/TeacherAssignments';
import TeacherAssignmentDetails from './pages/teacher/TeacherAssignmentDetails';
import TeacherCreateAssignment from './pages/teacher/TeacherCreateAssignment';
import TeacherAttendance from './pages/teacher/TeacherAttendance';
import TeacherAttendanceHistory from './pages/teacher/TeacherAttendanceHistory';
import TeacherExaminations from './pages/teacher/TeacherExaminations';
import TeacherExaminationDetails from './pages/teacher/TeacherExaminationDetails';
import TeacherEnterMarks from './pages/teacher/TeacherEnterMarks';
import TeacherTimetable from './pages/teacher/TeacherTimetable';
import TeacherPerformance from './pages/teacher/TeacherPerformance';
import TeacherReports from './pages/teacher/TeacherReports';
import TeacherAIInsights from './pages/teacher/TeacherAIInsights';
import TeacherAIAssistant from './pages/teacher/TeacherAIAssistant';
import TeacherNotifications from './pages/teacher/TeacherNotifications';
import TeacherSettings from './pages/teacher/TeacherSettings';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

// Context
import { AuthProvider } from './context/AuthContext';
import { FeedbackProvider } from './context/FeedbackContext';

function App() {
  return (
    <AuthProvider>
      <FeedbackProvider>
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

          {/* Teacher Routes nested in TeacherLayout */}
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route index element={<Navigate to="/teacher/dashboard" replace />} />
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="courses" element={<TeacherCourses />} />
            <Route path="courses/:id" element={<TeacherCourseDetails />} />
            <Route path="classes" element={<TeacherClasses />} />
            <Route path="classes/:id" element={<TeacherClassDetails />} />
            <Route path="students" element={<TeacherStudents />} />
            <Route path="students/:id" element={<TeacherStudentDetails />} />
            <Route path="assignments" element={<TeacherAssignments />} />
            <Route path="assignments/create" element={<TeacherCreateAssignment />} />
            <Route path="assignments/:id" element={<TeacherAssignmentDetails />} />
            <Route path="attendance" element={<TeacherAttendance />} />
            <Route path="attendance/history" element={<TeacherAttendanceHistory />} />
            <Route path="examinations" element={<TeacherExaminations />} />
            <Route path="examinations/:id" element={<TeacherExaminationDetails />} />
            <Route path="examinations/:id/marks" element={<TeacherEnterMarks />} />
            <Route path="timetable" element={<TeacherTimetable />} />
            <Route path="performance" element={<TeacherPerformance />} />
            <Route path="reports" element={<TeacherReports />} />
            <Route path="ai-insights" element={<TeacherAIInsights />} />
            <Route path="ai-assistant" element={<TeacherAIAssistant />} />
            <Route path="notifications" element={<TeacherNotifications />} />
            <Route path="settings" element={<TeacherSettings />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </FeedbackProvider>
  </AuthProvider>
  );
}

export default App;
