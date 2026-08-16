import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, BookOpen, User, Calendar, GraduationCap, ClipboardList, Award, Sparkles, Plus } from 'lucide-react';
import SectionCard from './components/SectionCard';
import StatCard from './components/StatCard';
import AssignmentCard from './components/AssignmentCard';

const courseDetailsData = {
  cs301: {
    name: 'Data Structures & Algorithms',
    code: 'CS301',
    description: 'This course covers linear and non-linear data structures including stacks, queues, trees, graphs, and hash tables. Students will analyze sorting, searching, and algorithmic complexity (Big-O notation) with practical programming assignments.',
    teacher: 'Prof. Muruga Kumar',
    schedule: 'Monday & Wednesday • 09:00 AM - 10:30 AM',
    studentsCount: 45,
    averageAttendance: 92,
    averageGrade: 'B+ (84%)',
    assignmentsCompleted: '84%',
    enrolledStudents: [
      { roll: 'CSE2601', name: 'Rahul Sharma', attendance: 95, assignmentAvg: 88, examAvg: 85, risk: 'Low' },
      { roll: 'CSE2602', name: 'Karthik Raj', attendance: 65, assignmentAvg: 55, examAvg: 58, risk: 'High' },
      { roll: 'CSE2603', name: 'Priya Nair', attendance: 88, assignmentAvg: 72, examAvg: 78, risk: 'Medium' },
      { roll: 'CSE2604', name: 'Aditya Sen', attendance: 98, assignmentAvg: 95, examAvg: 92, risk: 'Low' },
      { roll: 'CSE2605', name: 'Meera Das', attendance: 94, assignmentAvg: 90, examAvg: 88, risk: 'Low' },
    ],
    assignments: [
      { title: 'Binary Tree Traversal', course: 'DSA', status: 'Pending', dueDate: 'Aug 18' },
      { title: 'Stack & Queue Implementation', course: 'DSA', status: 'Graded', dueDate: 'Aug 10' },
      { title: 'Graph Shortest Path (Dijkstra)', course: 'DSA', status: 'Submitted', dueDate: 'Aug 14' },
    ],
    exams: [
      { name: 'Mid-Term Examination', date: 'Jul 15, 2026', avgScore: '78%', weight: '30%' },
      { name: 'Quiz 1 (Linked Lists)', date: 'Jun 10, 2026', avgScore: '85%', weight: '10%' },
      { name: 'End-Term Examination', date: 'TBD (Nov 2026)', avgScore: 'N/A', weight: '50%' },
    ]
  },
  cs201: {
    name: 'Database Management Systems',
    code: 'CS201',
    description: 'An introduction to databases, database design methodologies, entity-relationship (ER) modeling, relational algebra, SQL programming, normalization theory, and transaction management concepts.',
    teacher: 'Prof. Muruga Kumar',
    schedule: 'Tuesday & Thursday • 10:30 AM - 12:00 PM',
    studentsCount: 52,
    averageAttendance: 88,
    averageGrade: 'B (79%)',
    assignmentsCompleted: '90%',
    enrolledStudents: [
      { roll: 'CSE2610', name: 'Siddharth Roy', attendance: 92, assignmentAvg: 82, examAvg: 80, risk: 'Low' },
      { roll: 'CSE2611', name: 'Ananya Iyer', attendance: 96, assignmentAvg: 92, examAvg: 90, risk: 'Low' },
    ],
    assignments: [
      { title: 'ER Diagram Design', course: 'DBMS', status: 'Submitted', dueDate: 'Aug 15' },
      { title: 'SQL Joins & Grouping Worksheet', course: 'DBMS', status: 'Submitted', dueDate: 'Aug 14' },
    ],
    exams: [
      { name: 'Database Mid-Semester', date: 'Jul 18, 2026', avgScore: '74%', weight: '30%' },
    ]
  }
};

export default function TeacherCourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const course = courseDetailsData[id] || {
    name: 'Course Details',
    code: id?.toUpperCase() || 'N/A',
    description: 'Detailed course information is currently unavailable or being initialized.',
    teacher: 'Prof. Muruga Kumar',
    schedule: 'To Be Scheduled',
    studentsCount: 0,
    averageAttendance: 0,
    averageGrade: 'N/A',
    assignmentsCompleted: '0%',
    enrolledStudents: [],
    assignments: [],
    exams: []
  };

  return (
    <div className="details-container">
      {/* Header */}
      <div className="teacher-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn-teacher secondary" style={{ padding: '8px' }} onClick={() => navigate('/teacher/courses')}>
            <ChevronLeft size={18} />
          </button>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px' }}>{course.name}</h1>
            <p style={{ margin: 0, color: '#6B7280', fontSize: '13px' }}>Course ID: {course.code}</p>
          </div>
        </div>
        <div className="page-actions">
          <button className="btn-teacher secondary"><Plus size={16} /> Edit Details</button>
        </div>
      </div>

      {/* Course Stats */}
      <div className="stats-grid">
        <StatCard
          title="Students Enrolled"
          value={course.studentsCount}
          icon={<GraduationCap size={20} />}
          gradient="gradient-1"
          iconColor="orange"
        />
        <StatCard
          title="Avg Attendance"
          value={`${course.averageAttendance}%`}
          icon={<Calendar size={20} />}
          gradient="gradient-2"
          valueColor="blue"
          iconColor="blue"
        />
        <StatCard
          title="Average Grade"
          value={course.averageGrade}
          icon={<Award size={20} />}
          gradient="gradient-4"
          valueColor="green"
          iconColor="green"
        />
        <StatCard
          title="Submission Rate"
          value={course.assignmentsCompleted}
          icon={<ClipboardList size={20} />}
          gradient="gradient-3"
          valueColor="cyan"
          iconColor="cyan"
        />
      </div>

      {/* Tabs */}
      <div className="details-tabs">
        <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`} onClick={() => setActiveTab('students')}>Students Enrolled ({course.studentsCount})</button>
        <button className={`tab-btn ${activeTab === 'assignments' ? 'active' : ''}`} onClick={() => setActiveTab('assignments')}>Assignments ({course.assignments?.length || 0})</button>
        <button className={`tab-btn ${activeTab === 'exams' ? 'active' : ''}`} onClick={() => setActiveTab('exams')}>Exams ({course.exams?.length || 0})</button>
      </div>

      {/* Tab Panels */}
      <div className="details-grid">
        <div className="details-main">
          {activeTab === 'overview' && (
            <SectionCard title="Course Overview">
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#1A1A2E', marginBottom: '8px' }}>Description</h4>
              <p style={{ fontSize: '13.5px', color: '#4B5563', lineHeight: '1.6', marginBottom: '20px' }}>
                {course.description}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                <div style={{ background: '#FAFBFC', padding: '16px', borderRadius: '10px', border: '1px solid #F0F0F0' }}>
                  <h4 style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>Instructor</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: '#1A1A2E' }}>
                    <User size={16} color="#FF6B00" />
                    <span>{course.teacher}</span>
                  </div>
                </div>
                <div style={{ background: '#FAFBFC', padding: '16px', borderRadius: '10px', border: '1px solid #F0F0F0' }}>
                  <h4 style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>Weekly Schedule</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: '#1A1A2E' }}>
                    <Calendar size={16} color="#FF6B00" />
                    <span>{course.schedule}</span>
                  </div>
                </div>
              </div>
            </SectionCard>
          )}

          {activeTab === 'students' && (
            <SectionCard title="Enrolled Students">
              <div className="table-container" style={{ margin: 0 }}>
                <table className="teacher-table">
                  <thead>
                    <tr>
                      <th>Roll Number</th>
                      <th>Student Name</th>
                      <th>Attendance</th>
                      <th>Assignment Avg</th>
                      <th>Exam Avg</th>
                      <th>Risk Level</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {course.enrolledStudents.map((st, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 600 }}>{st.roll}</td>
                        <td>{st.name}</td>
                        <td>
                          <div className="progress-bar-container">
                            <div className={`progress-bar-fill ${st.attendance >= 75 ? 'green' : 'red'}`} style={{ width: `${st.attendance}%` }}></div>
                          </div>
                          <span className="progress-text">{st.attendance}%</span>
                        </td>
                        <td>{st.assignmentAvg}%</td>
                        <td>{st.examAvg}%</td>
                        <td>
                          <span className={`risk-badge ${st.risk.toLowerCase()}`}>
                            {st.risk}
                          </span>
                        </td>
                        <td>
                          <button className="btn-teacher secondary" style={{ padding: '4px 10px', fontSize: '12px' }} onClick={() => navigate(`/teacher/students/1`)}>
                            View Profile
                          </button>
                        </td>
                      </tr>
                    ))}
                    {course.enrolledStudents.length === 0 && (
                      <tr>
                        <td colSpan="7" style={{ textAlign: 'center', padding: '30px' }}>No enrolled students found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          )}

          {activeTab === 'assignments' && (
            <SectionCard title="Course Assignments">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {course.assignments.map((a, i) => (
                  <AssignmentCard key={i} {...a} />
                ))}
                {course.assignments.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '30px', color: '#9CA3AF' }}>No assignments linked to this course.</div>
                )}
              </div>
            </SectionCard>
          )}

          {activeTab === 'exams' && (
            <SectionCard title="Examinations Schedule">
              <div className="table-container" style={{ margin: 0 }}>
                <table className="teacher-table">
                  <thead>
                    <tr>
                      <th>Exam Name</th>
                      <th>Schedule Date</th>
                      <th>Avg Score</th>
                      <th>Grade Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {course.exams.map((ex, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 600 }}>{ex.name}</td>
                        <td>{ex.date}</td>
                        <td>{ex.avgScore}</td>
                        <td>{ex.weight}</td>
                      </tr>
                    ))}
                    {course.exams.length === 0 && (
                      <tr>
                        <td colSpan="4" style={{ textAlign: 'center', padding: '30px' }}>No examinations scheduled for this course.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          )}
        </div>

        {/* Sidebar Panel */}
        <div className="details-sidebar">
          <SectionCard title="Syllabus Status">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px', fontWeight: 500 }}>
                  <span>Syllabus Completion</span>
                  <span style={{ color: '#FF6B00', fontWeight: 600 }}>68%</span>
                </div>
                <div className="progress-bar-container" style={{ width: '100%' }}>
                  <div className="progress-bar-fill orange" style={{ width: '68%' }}></div>
                </div>
              </div>
              
              <div className="sidebar-divider" style={{ margin: '8px 0' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A2E' }}>Modules Covered:</div>
                <ul style={{ fontSize: '12.5px', color: '#6B7280', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <li>✓ Module 1: Complexity Analysis (100%)</li>
                  <li>✓ Module 2: Linked Lists & Stacks (100%)</li>
                  <li>✓ Module 3: Trees & Graphs (60%)</li>
                  <li style={{ color: '#9CA3AF' }}>○ Module 4: Hashing & Heaps (0%)</li>
                </ul>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
