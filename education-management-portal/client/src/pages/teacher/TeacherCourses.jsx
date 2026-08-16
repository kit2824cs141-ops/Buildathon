import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, User, Calendar, Plus } from 'lucide-react';
import SectionCard from './components/SectionCard';

const initialCourses = [
  { id: 'cs301', name: 'Data Structures & Algorithms', code: 'CS301', students: 45, schedule: 'Mon, Wed 09:00 AM', progress: 68, teacher: 'Prof. Muruga Kumar', department: 'CSE', semester: 'Semester 5' },
  { id: 'cs201', name: 'Database Management Systems', code: 'CS201', students: 52, schedule: 'Tue, Thu 10:30 AM', progress: 45, teacher: 'Prof. Muruga Kumar', department: 'CSE', semester: 'Semester 3' },
  { id: 'cs401', name: 'Machine Learning', code: 'CS401', students: 38, schedule: 'Mon, Wed 01:00 PM', progress: 82, teacher: 'Prof. Muruga Kumar', department: 'CSE', semester: 'Semester 7' },
  { id: 'it301', name: 'Operating Systems', code: 'IT301', students: 16, schedule: 'Tue, Fri 03:00 PM', progress: 55, teacher: 'Prof. Muruga Kumar', department: 'IT', semester: 'Semester 5' },
  { id: 'cs101', name: 'Introduction to Programming', code: 'CS101', students: 60, schedule: 'Fri 09:00 AM', progress: 95, teacher: 'Dr. Renita', department: 'CSE', semester: 'Semester 1' },
];

export default function TeacherCourses() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [semFilter, setSemFilter] = useState('All');

  const filteredCourses = initialCourses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(search.toLowerCase()) || 
                          course.code.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === 'All' || course.department === deptFilter;
    const matchesSem = semFilter === 'All' || course.semester === semFilter;
    return matchesSearch && matchesDept && matchesSem;
  });

  return (
    <div className="courses-page">
      <div className="teacher-page-header">
        <h1>Courses</h1>
        <div className="page-actions">
          <button className="btn-teacher primary"><Plus size={16} /> Add Course</button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="filters-bar">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by course name or code..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select 
          className="filter-select"
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
        >
          <option value="All">All Departments</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
        </select>
        <select 
          className="filter-select"
          value={semFilter}
          onChange={(e) => setSemFilter(e.target.value)}
        >
          <option value="All">All Semesters</option>
          <option value="Semester 1">Semester 1</option>
          <option value="Semester 3">Semester 3</option>
          <option value="Semester 5">Semester 5</option>
          <option value="Semester 7">Semester 7</option>
        </select>
      </div>

      {/* Courses Cards Grid */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
        {filteredCourses.map((c) => (
          <SectionCard 
            key={c.id} 
            title={c.name} 
            actionLabel={c.code}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#6B7280' }}>
                <span>{c.department} • {c.semester}</span>
                <span style={{ fontWeight: 600, color: '#1A1A2E' }}>{c.students} Enrolled</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#4B5563' }}>
                <Calendar size={15} color="#FF6B00" />
                <span>{c.schedule}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#4B5563' }}>
                <User size={15} color="#FF6B00" />
                <span>{c.teacher}</span>
              </div>

              {/* Progress */}
              <div style={{ marginTop: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px', fontWeight: 500 }}>
                  <span color="#6B7280">Syllabus Progress</span>
                  <span>{c.progress}%</span>
                </div>
                <div className="progress-bar-container" style={{ width: '100%' }}>
                  <div className="progress-bar-fill orange" style={{ width: `${c.progress}%` }}></div>
                </div>
              </div>

              {/* Details Action */}
              <button 
                className="btn-teacher secondary" 
                style={{ width: '100%', marginTop: '12px', justifyContent: 'center' }}
                onClick={() => navigate(`/teacher/courses/${c.id}`)}
              >
                View Details
              </button>
            </div>
          </SectionCard>
        ))}

        {filteredCourses.length === 0 && (
          <div className="section-card" style={{ gridColumn: '1 / -1' }}>
            <div className="page-placeholder">
              <div className="placeholder-icon"><BookOpen size={28} /></div>
              <h3>No courses found</h3>
              <p>Try modifying your search queries or reset the filters.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
