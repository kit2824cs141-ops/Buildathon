import { useState } from 'react';
import { Calendar, Clock, AlertTriangle, Info } from 'lucide-react';
import SectionCard from './components/SectionCard';

const dailySchedule = [
  { time: '09:00 AM - 10:30 AM', subject: 'Data Structures & Algorithms', course: 'CS301', room: 'Room 301', class: 'CSE-A (3rd Year)', conflict: true },
  { time: '10:30 AM - 12:00 PM', subject: 'Database Management Systems', course: 'CS201', room: 'Room 204', class: 'CSE-B (2nd Year)', conflict: false },
  { time: '01:00 PM - 02:30 PM', subject: 'Machine Learning Lab', course: 'CS401', room: 'Lab 102', class: 'CSE-A (4th Year)', conflict: false },
  { time: '03:00 PM - 04:30 PM', subject: 'Operating Systems', course: 'IT301', room: 'Room 405', class: 'IT-A (3rd Year)', conflict: false },
];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = ['09:00 AM', '10:30 AM', '01:00 PM', '03:00 PM'];

// Weekly layout mapping
const weeklyClasses = {
  'Monday-09:00 AM': { subject: 'DSA', class: 'CSE-A', room: 'R301', conflict: true },
  'Monday-01:00 PM': { subject: 'ML Lab', class: 'CSE-A', room: 'L102' },
  'Tuesday-10:30 AM': { subject: 'DBMS', class: 'CSE-B', room: 'R204' },
  'Tuesday-03:00 PM': { subject: 'OS', class: 'IT-A', room: 'R405' },
  'Wednesday-09:00 AM': { subject: 'DSA', class: 'CSE-A', room: 'R301' },
  'Wednesday-01:00 PM': { subject: 'ML Lab', class: 'CSE-A', room: 'L102' },
  'Thursday-10:30 AM': { subject: 'DBMS', class: 'CSE-B', room: 'R204' },
  'Friday-03:00 PM': { subject: 'OS', class: 'IT-A', room: 'R405' },
};

export default function TeacherTimetable() {
  const [viewMode, setViewMode] = useState('daily');

  return (
    <div className="timetable-page">
      <div className="teacher-page-header">
        <h1>Weekly Lecture Timetable</h1>
        <div className="page-actions">
          <button 
            className={`btn-teacher ${viewMode === 'daily' ? 'primary' : 'secondary'}`} 
            onClick={() => setViewMode('daily')}
          >
            Daily View
          </button>
          <button 
            className={`btn-teacher ${viewMode === 'weekly' ? 'primary' : 'secondary'}`} 
            onClick={() => setViewMode('weekly')}
          >
            Weekly Grid
          </button>
        </div>
      </div>

      {/* Conflicts Banner */}
      <div className="conflict-warning">
        <AlertTriangle className="warning-icon" size={18} />
        <div>
          <strong>Schedule Conflict Warning:</strong> There is a Room booking conflict on <strong>Monday 09:00 AM</strong>. Room 301 is double-booked for CSE-A (Algorithms Lecture) and CSE-B (OOP Lab session).
        </div>
      </div>

      {viewMode === 'daily' ? (
        <SectionCard title="Today's Schedule Lectures">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {dailySchedule.map((item, i) => (
              <div 
                key={i} 
                className={`schedule-item`} 
                style={{ 
                  background: item.conflict ? '#FFFBEB' : '#FAFBFC', 
                  padding: '16px', 
                  borderRadius: '12px', 
                  border: item.conflict ? '1px solid #FDE68A' : '1px solid #F0F0F0',
                  borderLeft: item.conflict ? '4px solid #D97706' : '4px solid #FF6B00',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ background: '#FFFFFF', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '150px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#6B7280', marginBottom: '2px' }}>
                      <Clock size={12} color="#FF6B00" />
                      <span>TIMING</span>
                    </div>
                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#1A1A2E' }}>{item.time.split(' ')[0]} {item.time.split(' ')[1]}</span>
                  </div>

                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 700, color: '#1A1A2E' }}>{item.subject}</h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>
                      Course Code: {item.course} • Class: {item.class} • Room: <strong>{item.room}</strong>
                    </p>
                  </div>
                </div>

                {item.conflict && (
                  <span className="badge badge-warning" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AlertTriangle size={12} /> Conflict Warning
                  </span>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <div className="timetable-grid" style={{ minWidth: '700px' }}>
            {/* Header labels */}
            <div className="timetable-header-cell" style={{ background: 'transparent' }}>Time Slot</div>
            {daysOfWeek.map((day, i) => (
              <div className="timetable-header-cell" key={i}>{day}</div>
            ))}

            {/* Matrix slots */}
            {timeSlots.map((time, tIdx) => (
              <>
                <div className="timetable-time-cell" key={`t-${tIdx}`}>{time}</div>
                {daysOfWeek.map((day, dIdx) => {
                  const key = `${day}-${time}`;
                  const slot = weeklyClasses[key];

                  return slot ? (
                    <div 
                      className={`timetable-slot occupied ${slot.conflict ? 'conflict' : ''}`}
                      key={`slot-${tIdx}-${dIdx}`}
                      style={{ background: slot.conflict ? '#FEF2F2' : '', border: slot.conflict ? '1.5px solid #FCA5A5' : '' }}
                    >
                      <h4 style={{ color: slot.conflict ? '#EF4444' : '' }}>{slot.subject}</h4>
                      <span>{slot.class} • {slot.room}</span>
                      {slot.conflict && (
                        <div style={{ fontSize: '9px', color: '#EF4444', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
                          <AlertTriangle size={10} /> Double Booked
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="timetable-slot" key={`slot-${tIdx}-${dIdx}`}>
                      <span>Free Slot</span>
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
