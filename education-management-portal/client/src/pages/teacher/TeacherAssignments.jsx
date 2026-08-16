import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Calendar, FileText } from 'lucide-react';
import SectionCard from './components/SectionCard';
import SkeletonLoader from './components/SkeletonLoader';
import { getAssignments } from '../../services/academicDataService';


export default function TeacherAssignments() {
  const navigate = useNavigate();
  const [allAssignments, setAllAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    getAssignments().then(data => { setAllAssignments(data); setLoading(false); });
  }, []);

  const isFiltered = search || courseFilter !== 'All' || classFilter !== 'All' || statusFilter !== 'All';
  const clearFilters = () => { setSearch(''); setCourseFilter('All'); setClassFilter('All'); setStatusFilter('All'); };

  const filtered = allAssignments.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesCourse = courseFilter === 'All' || item.course === courseFilter;
    const matchesClass = classFilter === 'All' || item.class.startsWith(classFilter);
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesCourse && matchesClass && matchesStatus;
  });

  if (loading) return <div style={{ padding: '20px' }}><SkeletonLoader type="card" count={3} /></div>;


  return (
    <div className="assignments-page">
      <div className="teacher-page-header">
        <h1>Assignments Directory</h1>
        <div className="page-actions">
          <button className="btn-teacher primary" onClick={() => navigate('/teacher/assignments/create')}>
            <Plus size={16} /> Create Assignment
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search assignments by title..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="filter-select" value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
          <option value="All">All Courses</option>
          <option value="DSA">DSA</option>
          <option value="DBMS">DBMS</option>
          <option value="ML">ML</option>
          <option value="OS">OS</option>
        </select>
        <select className="filter-select" value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
          <option value="All">All Classes</option>
          <option value="CSE-A">CSE-A</option>
          <option value="CSE-B">CSE-B</option>
          <option value="IT-A">IT-A</option>
        </select>
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Grid */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
        {filtered.map(item => (
          <SectionCard key={item.id} title={item.title} actionLabel={item.course}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#6B7280' }}>
                <span>Class: {item.class}</span>
                <span className={`badge ${item.status === 'Active' ? 'badge-primary' : 'badge-success'}`}>
                  {item.status}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#4B5563' }}>
                <Calendar size={15} color="#FF6B00" />
                <span>Due Date: {item.dueDate}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: '#FAFBFC', padding: '10px', borderRadius: '8px', border: '1px solid #F0F0F0', marginTop: '4px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#6B7280' }}>Submissions</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#1A1A2E' }}>
                    {item.submissions} / {item.total}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#6B7280' }}>Pending Grading</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: item.pendingGrading > 0 ? '#FF6B00' : '#10B981' }}>
                    {item.pendingGrading}
                  </div>
                </div>
              </div>

              <button 
                className="btn-teacher secondary" 
                style={{ width: '100%', marginTop: '10px', justifyContent: 'center' }}
                onClick={() => navigate(`/teacher/assignments/${item.id}`)}
              >
                View Assignment Details
              </button>
            </div>
          </SectionCard>
        ))}

        {filtered.length === 0 && (
          <div className="section-card" style={{ gridColumn: '1 / -1' }}>
            <div className="page-placeholder">
              <div className="placeholder-icon"><FileText size={28} /></div>
              <h3>No assignments found</h3>
              <p>Try modifying your search query or filters.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
