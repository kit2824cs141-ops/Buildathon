import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, GraduationCap, User } from 'lucide-react';
import SectionCard from './components/SectionCard';
import SkeletonLoader from './components/SkeletonLoader';
import { getStudents } from '../../services/academicDataService';

export default function TeacherStudents() {
  const navigate = useNavigate();
  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('All');
  const [perfFilter, setPerfFilter] = useState('All');
  const [attFilter, setAttFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    getStudents().then(data => { setAllStudents(data); setLoading(false); });
  }, []);

  const isFiltered = search || classFilter !== 'All' || perfFilter !== 'All' || attFilter !== 'All';

  const clearFilters = () => {
    setSearch('');
    setClassFilter('All');
    setPerfFilter('All');
    setAttFilter('All');
    setSortBy('name');
  };

  const filteredStudents = allStudents
    .filter(st => {
      const matchesSearch = st.name.toLowerCase().includes(search.toLowerCase()) || 
                            st.roll.toLowerCase().includes(search.toLowerCase());
      const matchesClass = classFilter === 'All' || st.class.startsWith(classFilter);
      
      // Performance logic
      let matchesPerf = true;
      if (perfFilter === 'High') matchesPerf = st.overall >= 85;
      else if (perfFilter === 'Medium') matchesPerf = st.overall >= 70 && st.overall < 85;
      else if (perfFilter === 'Low') matchesPerf = st.overall < 70;

      // Attendance logic
      let matchesAtt = true;
      if (attFilter === 'High') matchesAtt = st.attendance >= 90;
      else if (attFilter === 'Medium') matchesAtt = st.attendance >= 75 && st.attendance < 90;
      else if (attFilter === 'Low') matchesAtt = st.attendance < 75;

      return matchesSearch && matchesClass && matchesPerf && matchesAtt;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'attendance') return b.attendance - a.attendance;
      if (sortBy === 'grade') return b.overall - a.overall;
      return 0;
    });

  if (loading) return <div style={{ padding: '20px' }}><SkeletonLoader type="table" count={6} /></div>;

  return (
    <div className="students-page">
      <div className="teacher-page-header">
        <h1>Student Directory</h1>
      </div>

      {/* Search & Filters */}
      <div className="filters-bar">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by student name or roll number..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select 
          className="filter-select"
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
        >
          <option value="All">All Classes</option>
          <option value="CSE-A">CSE-A</option>
          <option value="CSE-B">CSE-B</option>
        </select>
        <select 
          className="filter-select"
          value={perfFilter}
          onChange={(e) => setPerfFilter(e.target.value)}
        >
          <option value="All">All Performance</option>
          <option value="High">High Grade (&gt;=85%)</option>
          <option value="Medium">Average Grade (70%-85%)</option>
          <option value="Low">Low Grade (&lt;70%)</option>
        </select>
        <select 
          className="filter-select"
          value={attFilter}
          onChange={(e) => setAttFilter(e.target.value)}
        >
          <option value="All">All Attendance</option>
          <option value="High">Excellent (&gt;=90%)</option>
          <option value="Medium">Satisfactory (75%-90%)</option>
          <option value="Low">Below 75% Limit</option>
        </select>
        <select 
          className="filter-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ borderLeft: '2px solid #FF6B00' }}
        >
          <option value="name">Sort by Name</option>
          <option value="attendance">Sort by Attendance</option>
          <option value="grade">Sort by Grade</option>
        </select>
        {isFiltered && (
          <button 
            className="btn-teacher secondary" 
            onClick={clearFilters}
            style={{ padding: '6px 12px', fontSize: '12px', height: '36px' }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Table Section */}
      <SectionCard title="Enrolled Students list">
        <div className="table-container" style={{ margin: 0 }}>
          <table className="teacher-table">
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Student Name</th>
                <th>Class</th>
                <th>Attendance</th>
                <th>Assignment Avg</th>
                <th>Exam Avg</th>
                <th>Overall Grade</th>
                <th>Risk Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((st) => (
                <tr key={st.id}>
                  <td style={{ fontWeight: 600 }}>{st.roll}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div className="student-avatar orange" style={{ width: '28px', height: '28px', fontSize: '11px' }}>
                        {st.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <span style={{ fontWeight: 500 }}>{st.name}</span>
                    </div>
                  </td>
                  <td>{st.class}</td>
                  <td>
                    <div className="progress-bar-container" style={{ width: '60px' }}>
                      <div className={`progress-bar-fill ${st.attendance >= 75 ? 'green' : 'red'}`} style={{ width: `${st.attendance}%` }}></div>
                    </div>
                    <span className="progress-text">{st.attendance}%</span>
                  </td>
                  <td>{st.assignmentAvg}%</td>
                  <td>{st.examAvg}%</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div className="progress-bar-container" style={{ width: '60px' }}>
                        <div className="progress-bar-fill orange" style={{ width: `${st.overall}%` }}></div>
                      </div>
                      <span className="progress-text">{st.overall}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={`risk-badge ${st.risk.toLowerCase()}`}>
                      {st.risk}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn-teacher secondary" 
                      style={{ padding: '4px 12px', fontSize: '12px' }}
                      onClick={() => navigate(`/teacher/students/${st.id}`)}
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '30px' }}>No students found matching filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
