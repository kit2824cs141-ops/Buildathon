import { useState } from 'react';
import { BookOpen, Search, User, Award, Clock, ArrowRight, Download, CheckCircle } from 'lucide-react';

export default function MyCourses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    {
      id: 'CS201',
      title: 'Data Structures & Algorithms',
      instructor: 'Dr. Sarah Jenkins',
      schedule: 'Mon, Wed 02:00 PM - 03:30 PM',
      credits: 4,
      progress: 78,
      grade: 'A-',
      status: 'Active',
      description: 'Core concepts of data structures including trees, graphs, heaps, and algorithmic analysis techniques.',
      syllabus: [
        { week: 'Week 1-3', title: 'Complexity Analysis & Linear Structures', completed: true },
        { week: 'Week 4-6', title: 'Trees, BST, AVL Trees & Red-Black Trees', completed: true },
        { week: 'Week 7-9', title: 'Heaps, Priority Queues & Hashing', completed: true },
        { week: 'Week 10-12', title: 'Graph Algorithms: BFS, DFS, Dijkstra', completed: false },
        { week: 'Week 13-15', title: 'Dynamic Programming & Greedy Algorithms', completed: false },
      ]
    },
    {
      id: 'MATH302',
      title: 'Calculus III',
      instructor: 'Prof. Ryan Miller',
      schedule: 'Tue, Thu 09:00 AM - 10:30 AM',
      credits: 4,
      progress: 62,
      grade: 'B',
      status: 'Active',
      description: 'Multivariable calculus including vectors, partial derivatives, multiple integrals, and vector analysis.',
      syllabus: [
        { week: 'Week 1-4', title: 'Vector Geometry and Functions', completed: true },
        { week: 'Week 5-8', title: 'Partial Derivatives & Optimization', completed: true },
        { week: 'Week 9-11', title: 'Double & Triple Integrals', completed: false },
        { week: 'Week 12-15', title: 'Line and Surface Integrals, Green\'s Theorem', completed: false },
      ]
    },
    {
      id: 'PHYS202',
      title: 'General Physics II',
      instructor: 'Dr. Alan Vance',
      schedule: 'Tue, Thu 01:00 PM - 02:30 PM',
      credits: 3,
      progress: 45,
      grade: 'C+',
      status: 'Active',
      description: 'Introduction to electromagnetism, circuits, light waves, and basics of modern physics.',
      syllabus: [
        { week: 'Week 1-3', title: 'Electrostatics & Electric Fields', completed: true },
        { week: 'Week 4-6', title: 'Electric Potential & Capacitance', completed: true },
        { week: 'Week 7-9', title: 'Current, Resistance & DC Circuits', completed: false },
        { week: 'Week 10-12', title: 'Magnetic Fields & Induction', completed: false },
        { week: 'Week 13-15', title: 'Maxwell\'s Equations & Electromagnetic Waves', completed: false },
      ]
    },
    {
      id: 'CS204',
      title: 'Database Management Systems',
      instructor: 'Prof. Amy Lin',
      schedule: 'Wed, Fri 11:00 AM - 12:30 PM',
      credits: 3,
      progress: 90,
      grade: 'A',
      status: 'Active',
      description: 'Relational databases design, SQL syntax, normal forms, transaction processing, and storage structures.',
      syllabus: [
        { week: 'Week 1-3', title: 'Relational Model & Relational Algebra', completed: true },
        { week: 'Week 4-7', title: 'SQL Queries, DDL, DML & Triggers', completed: true },
        { week: 'Week 8-10', title: 'Schema Normalization (1NF, 2NF, 3NF, BCNF)', completed: true },
        { week: 'Week 11-13', title: 'Transactions, Concurrency & Recovery', completed: true },
        { week: 'Week 14-15', title: 'NoSQL Databases & Distributed Systems', completed: false },
      ]
    }
  ];

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownloadSyllabus = (course) => {
    const textContent = `Course: ${course.id} - ${course.title}
Instructor: ${course.instructor}
Schedule: ${course.schedule}
Credits: ${course.credits}

Description:
${course.description}

Syllabus Modules:
${course.syllabus.map(item => `- ${item.week}: ${item.title} [${item.completed ? 'Completed' : 'Pending'}]`).join('\r\n')}
`;
    try {
      const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${course.id}_Syllabus.txt`;
      document.body.appendChild(link);
      link.click();
      
      // Delay removal and revocation to ensure the browser has processed the download event
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (err) {
      console.error("Failed to trigger download", err);
    }
  };


  return (
    <div className="tab-view-container animate-fade">
      <div className="view-title-row">
        <h2 className="view-title">My Enrolled Courses</h2>
        <div style={{ position: 'relative', width: '250px' }}>
          <Search size={18} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search courses..." 
            className="edu-input" 
            style={{ paddingLeft: '36px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedCourse ? '1fr 1fr' : '1fr', gap: '24px', transition: 'var(--transition)' }}>
        {/* Course List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredCourses.map((course) => (
            <div 
              key={course.id} 
              className={`edu-card ${selectedCourse?.id === course.id ? 'stat-glow' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedCourse(course)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="edu-badge edu-badge-primary" style={{ fontWeight: '700' }}>{course.id}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600' }}>Current Grade: {course.grade}</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{course.title}</h3>
              
              <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <User size={14} /> {course.instructor}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} /> {course.credits} Credits
                </span>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <span>Course Progress</span>
                  <span style={{ fontWeight: '600' }}>{course.progress}%</span>
                </div>
                <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${course.progress}%`, height: '100%', background: 'var(--primary)' }}></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600' }}>
                  View Syllabus <ArrowRight size={14} />
                </span>
              </div>
            </div>
          ))}

          {filteredCourses.length === 0 && (
            <div className="edu-card" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              No enrolled courses matched your search query.
            </div>
          )}
        </div>

        {/* Selected Course Details / Syllabus Drawer */}
        {selectedCourse && (
          <div className="edu-card animate-fade" style={{ height: 'fit-content', position: 'sticky', top: '88px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span className="edu-badge edu-badge-primary" style={{ marginBottom: '6px' }}>{selectedCourse.id}</span>
                <h3 style={{ fontSize: '1.3rem' }}>{selectedCourse.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Instructor: <strong>{selectedCourse.instructor}</strong></p>
              </div>
              <button 
                onClick={() => setSelectedCourse(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                ×
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.6' }}>
              {selectedCourse.description}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--bg-hover)', borderRadius: 'var(--radius-sm)', marginBottom: '20px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>Class Schedule:</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{selectedCourse.schedule}</span>
            </div>

            <h4 style={{ fontSize: '0.95rem', marginBottom: '12px' }}>Course Syllabus</h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '250px', overflowY: 'auto', marginBottom: '20px', paddingRight: '6px' }}>
              {selectedCourse.syllabus.map((item, index) => (
                <div 
                  key={index}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    padding: '8px 12px', 
                    border: '1px solid var(--border)', 
                    borderRadius: 'var(--radius-sm)',
                    background: item.completed ? 'var(--bg-hover)' : 'transparent',
                    opacity: item.completed ? 0.75 : 1
                  }}
                >
                  {item.completed ? (
                    <CheckCircle size={16} color="var(--success)" />
                  ) : (
                    <div style={{ width: '16px', height: '16px', border: '2px solid var(--text-muted)', borderRadius: '50%' }}></div>
                  )}
                  <div style={{ fontSize: '0.8rem' }}>
                    <span style={{ fontWeight: '700', marginRight: '6px' }}>{item.week}:</span>
                    <span>{item.title}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
              <button 
                className="btn-brand-outline" 
                style={{ flex: 1, display: 'flex', justifyContent: 'center' }}
                onClick={() => handleDownloadSyllabus(selectedCourse)}
              >
                <Download size={14} /> Download Syllabus
              </button>
              <button className="btn-brand" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                Contact Faculty
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
