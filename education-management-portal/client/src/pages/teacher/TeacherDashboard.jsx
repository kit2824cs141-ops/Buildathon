import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Users, BookOpen, FileText, Award, ClipboardCheck, Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';
import StatCard from './components/StatCard';
import SectionCard from './components/SectionCard';
import AssignmentCard from './components/AssignmentCard';
import InsightCard from './components/InsightCard';
import StudentCard from './components/StudentCard';
import SkeletonLoader from './components/SkeletonLoader';
import { getStudents, getCourses, getAssignments, getTimetable } from '../../services/academicDataService';
import { getAIRiskSummary } from '../../services/ai/aiMockService';

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [aiSummary, setAiSummary] = useState(null);
  const { userProfile } = useAuth();

  useEffect(() => {
    async function loadData() {
      try {
        const [stList, crList, asList, ttList, aiSum] = await Promise.all([
          getStudents(),
          getCourses(),
          getAssignments(),
          getTimetable(),
          getAIRiskSummary()
        ]);
        setStudents(stList);
        setCourses(crList);
        setAssignments(asList);
        setSchedule(ttList.slice(0, 4)); // Get first 4 slots for dashboard
        setAiSummary(aiSum);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '20px' }}>
        <div className="teacher-welcome" style={{ marginBottom: '24px' }}>
          <div className="skeleton-line" style={{ height: '32px', width: '300px', borderRadius: '4px', marginBottom: '8px' }} />
          <div className="skeleton-line" style={{ height: '16px', width: '450px', borderRadius: '3px' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="section-card" style={{ padding: '16px', minHeight: '100px' }}>
              <div className="skeleton-line" style={{ height: '14px', width: '50%', marginBottom: '12px' }} />
              <div className="skeleton-line" style={{ height: '24px', width: '30%', marginBottom: '8px' }} />
              <div className="skeleton-line" style={{ height: '12px', width: '80%' }} />
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          <SkeletonLoader type="card" count={1} />
          <SkeletonLoader type="card" count={1} />
        </div>
      </div>
    );
  }

  // Calculate stats dynamically
  const totalStudents = students.length;
  const totalCourses = courses.length;
  const pendingAssignments = assignments.filter(a => a.status === 'Active').length;
  const avgAttendance = Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / totalStudents) || 85;

  return (
    <>
      {/* Welcome */}
      <div className="teacher-welcome">
        <h1>Welcome back, {userProfile?.name || 'Professor'}! 👋</h1>
        <p>Here's what's happening with your classes today — {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'})}</p>
      </div>

      {/* Smart Warning Alerts Banner */}
      {students.some(s => s.attendance < 75) && (
        <div className="teacher-info-banner" style={{ background: '#FFFBEB', border: '1px solid #FDE68A', display: 'flex', gap: '12px', padding: '16px', borderRadius: '10px', marginBottom: '20px', cursor: 'pointer' }} onClick={() => navigate('/teacher/ai-insights')}>
          <div className="info-icon" style={{ background: '#F59E0B', color: '#FFFFFF', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AlertTriangle size={16} />
          </div>
          <div>
            <h4 style={{ margin: 0, color: '#92400E', fontSize: '14px', fontWeight: 700 }}>Smart Notification Alert: Students at Academic Risk</h4>
            <p style={{ margin: '2px 0 0', color: '#B45309', fontSize: '13px', lineHeight: '1.4' }}>
              We detected {students.filter(s => s.attendance < 75).length} student(s) below the 75% attendance threshold. Click to view risk details in AI Insights.
            </p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          title="Total Students"
          value={totalStudents}
          subtitle="Across all sections"
          icon={<Users size={20} />}
          gradient="gradient-1"
          iconColor="orange"
        />
        <StatCard
          title="Total Courses"
          value={totalCourses}
          subtitle="Active Faculty Semesters"
          icon={<BookOpen size={20} />}
          gradient="gradient-2"
          valueColor="blue"
          subtitleColor="blue"
          iconColor="blue"
        />
        <StatCard
          title="Active Assignments"
          value={pendingAssignments}
          subtitle="Require grading feedback"
          icon={<FileText size={20} />}
          gradient="gradient-3"
          valueColor="cyan"
          iconColor="cyan"
        />
        <StatCard
          title="Upcoming Exams"
          value="2"
          subtitle="DSA Mid-Sem: Aug 24"
          icon={<Award size={20} />}
          gradient="gradient-4"
          valueColor="green"
          subtitleColor="green"
          iconColor="green"
        />
        <StatCard
          title="Avg Attendance"
          value={`${avgAttendance}%`}
          subtitle="Matches institution goal"
          icon={<ClipboardCheck size={20} />}
          gradient="gradient-5"
          valueColor="red"
          iconColor="red"
        />
      </div>

      {/* Row: Chart + Schedule */}
      <div className="dashboard-grid">
        <SectionCard title="Class Performance Average" actionLabel="View Performance" onActionClick={() => navigate('/teacher/performance')}>
          <div className="css-chart-grid" style={{ minHeight: '180px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', padding: '10px 0 20px', borderBottom: '1px solid #E5E7EB', position: 'relative' }}>
            {/* Chart Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#FF6B00' }}>82%</span>
              <div style={{ width: '28px', height: '110px', background: 'linear-gradient(to top, #FF6B00, #FF8C38)', borderRadius: '4px 4px 0 0', position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '18%', background: 'rgba(0,0,0,0.06)' }} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563', textAlign: 'center' }}>DSA</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#3B82F6' }}>76%</span>
              <div style={{ width: '28px', height: '100px', background: 'linear-gradient(to top, #3B82F6, #60A5FA)', borderRadius: '4px 4px 0 0', position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '24%', background: 'rgba(0,0,0,0.06)' }} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563', textAlign: 'center' }}>DBMS</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#10B981' }}>88%</span>
              <div style={{ width: '28px', height: '120px', background: 'linear-gradient(to top, #10B981, #34D399)', borderRadius: '4px 4px 0 0', position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '12%', background: 'rgba(0,0,0,0.06)' }} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563', textAlign: 'center' }}>ML</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#7C3AED' }}>64%</span>
              <div style={{ width: '28px', height: '85px', background: 'linear-gradient(to top, #7C3AED, #A78BFA)', borderRadius: '4px 4px 0 0', position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '36%', background: 'rgba(0,0,0,0.06)' }} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563', textAlign: 'center' }}>OS</span>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Today's Timetable" actionLabel="Full Timetable" onActionClick={() => navigate('/teacher/timetable')}>
          {schedule.map((s, i) => (
            <div className="schedule-item" key={i}>
              <div className="schedule-time">{s.time}</div>
              <div className="schedule-info">
                <h4>{s.subject}</h4>
                <p>{s.room}</p>
              </div>
            </div>
          ))}
        </SectionCard>
      </div>

      {/* Row: Recent Assignments + AI Insights + At-Risk */}
      <div className="dashboard-grid-3">
        <SectionCard title="Recent Assignments" actionLabel="View All" onActionClick={() => navigate('/teacher/assignments')}>
          {assignments.slice(0, 4).map((a, i) => (
            <AssignmentCard key={i} {...a} />
          ))}
        </SectionCard>

        <SectionCard title="AI Academic Insights" actionLabel="View All" onActionClick={() => navigate('/teacher/ai-insights')}>
          {aiSummary?.weakSubjects.slice(0, 2).map((sub, i) => (
            <InsightCard
              key={i}
              title={`Weak Topic Alert: ${sub.subject}`}
              description={`The class average score is currently at ${sub.avgScore}%. We suggest launching revision labs.`}
              icon={<Sparkles size={16} />}
            />
          ))}
        </SectionCard>

        <SectionCard title="At-Risk Students" actionLabel="View All" onActionClick={() => navigate('/teacher/ai-insights')}>
          {aiSummary?.high.slice(0, 3).map((s, i) => (
            <StudentCard
              key={i}
              name={s.name}
              initials={s.name.split(' ').map(n => n[0]).join('')}
              issue={`Attendance: ${s.attendance}% | Assignment Avg: ${s.assignmentAvg}%`}
              riskLevel={s.riskLevel}
              avatarColor="red"
            />
          ))}
        </SectionCard>
      </div>
    </>
  );
}
