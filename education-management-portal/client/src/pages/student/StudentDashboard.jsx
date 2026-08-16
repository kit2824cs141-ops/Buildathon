import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  User, Award, BookOpen, Clock, FileText, CheckCircle, AlertCircle, 
  ChevronRight, Calendar, Settings, Sparkles, Brain, Check
} from 'lucide-react';

export default function StudentDashboard() {
  const location = useLocation();
  
  // Parse query parameter tab
  const getTab = () => {
    const params = new URLSearchParams(location.search);
    return params.get('tab') || 'overview';
  };

  const activeTab = getTab();

  // Profile State
  const [profile, setProfile] = useState({
    name: 'Alex Carter',
    id: 'STU-2026-9874',
    email: 'alex.carter@eduportal.com',
    phone: '+1 (555) 019-2834',
    major: 'Computer Science & Engineering',
    semester: '4th Semester (Sophomore)',
    gpa: '3.82',
    bio: 'Passionate CS student focusing on Artificial Intelligence and Software Engineering. Active member of the Coding Club.',
    avatar: 'A'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleProfileSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // AI recommendations actions
  const [recList, setRecList] = useState([
    { id: 1, text: "Revise Electromagnetism formulas for the upcoming Physics Midterm.", completed: false, tag: "Urgent" },
    { id: 2, text: "Review feedback on 'Database Relational Algebra' assignment.", completed: false, tag: "Review" },
    { id: 3, text: "Practice 15 limits problems to boost your Calculus scores.", completed: false, tag: "Practice" },
    { id: 4, text: "Read Chapter 4 of Data Structures textbook for tomorrow's class.", completed: false, tag: "Preparation" },
  ]);

  const toggleRec = (id) => {
    setRecList(recList.map(rec => rec.id === id ? { ...rec, completed: !rec.completed } : rec));
  };

  return (
    <div id="student-dashboard-page">
      {activeTab === 'overview' && (
        <div className="tab-view-container animate-fade">
          <div className="view-title-row">
            <h2 className="view-title">Welcome back, {profile.name}!</h2>
            <div className="edu-badge edu-badge-primary">
              <Sparkles size={14} style={{ marginRight: '6px' }} /> CS Department
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Here is a summary of your academic status for Semester 4.</p>

          {/* Quick Stats Grid */}
          <div className="card-container" style={{ marginBottom: '24px' }}>
            <div className="edu-card stat-glow">
              <div className="stat-label">CUMULATIVE GPA</div>
              <div className="stat-value">{profile.gpa}</div>
              <div className="stat-footer">Top <span className="stat-highlight">8%</span> of your cohort</div>
            </div>

            <div className="edu-card stat-glow">
              <div className="stat-label">ENROLLED COURSES</div>
              <div className="stat-value">4</div>
              <div className="stat-footer">All <span className="stat-highlight">Core Curriculum</span></div>
            </div>

            <div className="edu-card stat-glow">
              <div className="stat-label">ATTENDANCE RATE</div>
              <div className="stat-value">94.8%</div>
              <div className="stat-footer">Safe zone (<span className="stat-highlight">&gt; 85%</span> required)</div>
            </div>

            <div className="edu-card stat-glow">
              <div className="stat-label">PENDING ASSIGNMENTS</div>
              <div className="stat-value">3</div>
              <div className="stat-footer">Next due: <span className="stat-highlight">2 days</span></div>
            </div>
          </div>

          {/* Two Columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            {/* Left Column: Progress & Courses */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="edu-card">
                <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen size={18} color="var(--primary)" />
                  <span>My Active Courses & Completion</span>
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '600' }}>CS201: Data Structures & Algorithms</span>
                      <span style={{ color: 'var(--primary)', fontWeight: '600' }}>78%</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '78%', height: '100%', background: 'var(--primary)' }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '600' }}>MATH302: Calculus III</span>
                      <span style={{ color: 'var(--primary)', fontWeight: '600' }}>62%</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '62%', height: '100%', background: 'var(--primary)' }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '600' }}>PHYS202: General Physics II</span>
                      <span style={{ color: 'var(--primary)', fontWeight: '600' }}>45%</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '45%', height: '100%', background: 'var(--primary)' }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '600' }}>CS204: Database Management Systems</span>
                      <span style={{ color: 'var(--primary)', fontWeight: '600' }}>90%</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '90%', height: '100%', background: 'var(--primary)' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Notifications */}
              <div className="edu-card">
                <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={18} color="var(--primary)" />
                  <span>Recent Announcements</span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', display: 'flex', gap: '12px' }}>
                    <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', marginTop: '5px' }}></div>
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>Physics Midterm Schedule Released</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>The General Physics II midterm exam is set for Thursday, Aug 20 at 10:00 AM in Room 402.</p>
                    </div>
                  </div>

                  <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', display: 'flex', gap: '12px' }}>
                    <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', marginTop: '5px' }}></div>
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>New Assignment Uploaded - DBMS</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DBMS Lab Assignment 4: SQL Complex Queries has been uploaded. Due in 5 days.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Schedule & Quick links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Daily Schedule */}
              <div className="edu-card">
                <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={18} color="var(--primary)" />
                  <span>Today's Classes</span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ paddingLeft: '12px', borderLeft: '3px solid var(--primary)' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: '700' }}>09:00 AM - 10:30 AM</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Calculus III (Lecture)</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Hall A • Dr. Sarah Jenkins</p>
                  </div>

                  <div style={{ paddingLeft: '12px', borderLeft: '3px solid var(--primary)' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: '700' }}>11:00 AM - 12:30 PM</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Data Structures (Lab)</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Lab 3 • Prof. Ryan Miller</p>
                  </div>

                  <div style={{ paddingLeft: '12px', borderLeft: '3px solid var(--text-muted)' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)' }}>02:00 PM - 03:30 PM</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>DBMS Seminar (Optional)</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Seminar Hall • Prof. Amy Lin</p>
                  </div>
                </div>
              </div>

              {/* Study milestones */}
              <div className="edu-card">
                <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={18} color="var(--primary)" />
                  <span>Next Milestones</span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Complete DBMS Quiz 2</span>
                    <span className="edu-badge edu-badge-success">Passed</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Calculus Limits Practice</span>
                    <span className="edu-badge edu-badge-warning">In Progress</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Physics Forces Lab</span>
                    <span className="edu-badge edu-badge-info">Pending</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="tab-view-container animate-fade">
          <div className="view-title-row">
            <h2 className="view-title">My Profile</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Manage your personal details and academic specialization profile.</p>

          {saveSuccess && (
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', marginBottom: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={16} /> Profile changes saved successfully!
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
            {/* Left Profile Avatar Card */}
            <div className="edu-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: 'fit-content' }}>
              <div style={{ width: '100px', height: '100px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifycontent: 'center', fontSize: '3rem', fontWeight: '800', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                {profile.avatar}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{profile.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600', marginBottom: '12px' }}>{profile.id}</p>
              
              <hr style={{ width: '100%', margin: '16px 0', borderColor: 'var(--border)' }} />

              <div style={{ width: '100%', textAlign: 'left', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div>
                  <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>Major:</span>
                  <p>{profile.major}</p>
                </div>
                <div>
                  <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>Status:</span>
                  <p>{profile.semester}</p>
                </div>
                <div>
                  <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>GPA:</span>
                  <p>{profile.gpa} / 4.00</p>
                </div>
              </div>
            </div>

            {/* Right Profile Fields Form */}
            <div className="edu-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.1rem' }}>Personal Information</h3>
                {!isEditing && (
                  <button className="btn-brand-outline" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </button>
                )}
              </div>

              <form onSubmit={handleProfileSave}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div className="edu-input-group">
                    <label className="edu-label">Full Name</label>
                    <input 
                      type="text" 
                      className="edu-input" 
                      value={profile.name} 
                      disabled={!isEditing} 
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="edu-input-group">
                    <label className="edu-label">Student ID (Read-only)</label>
                    <input 
                      type="text" 
                      className="edu-input" 
                      value={profile.id} 
                      disabled 
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div className="edu-input-group">
                    <label className="edu-label">Email Address</label>
                    <input 
                      type="email" 
                      className="edu-input" 
                      value={profile.email} 
                      disabled={!isEditing}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="edu-input-group">
                    <label className="edu-label">Phone Number</label>
                    <input 
                      type="text" 
                      className="edu-input" 
                      value={profile.phone} 
                      disabled={!isEditing}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="edu-input-group" style={{ marginBottom: '16px' }}>
                  <label className="edu-label">Major/Degree</label>
                  <input 
                    type="text" 
                    className="edu-input" 
                    value={profile.major} 
                    disabled={!isEditing}
                    onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                    required
                  />
                </div>

                <div className="edu-input-group" style={{ marginBottom: '24px' }}>
                  <label className="edu-label">Biography</label>
                  <textarea 
                    rows="4" 
                    className="edu-input" 
                    value={profile.bio} 
                    disabled={!isEditing}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    style={{ resize: 'none' }}
                  ></textarea>
                </div>

                {isEditing && (
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button type="button" className="btn-brand-outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn-brand">
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ai-rec' && (
        <div className="tab-view-container animate-fade">
          <div className="view-title-row">
            <h2 className="view-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Brain color="var(--primary)" />
              <span>AI Study Recommendations</span>
            </h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Smart study objectives tailored to improve your core subject grades.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            <div className="edu-card">
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Your Personalized Study Plan</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>Check off objectives to complete them. Our AI algorithm evaluates completion rates to dynamically update tips.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {recList.map((rec) => (
                  <div 
                    key={rec.id} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      padding: '14px 16px', 
                      border: '1px solid var(--border)', 
                      borderRadius: 'var(--radius-md)',
                      background: rec.completed ? 'var(--bg-hover)' : 'var(--bg-card)',
                      opacity: rec.completed ? 0.7 : 1,
                      transition: 'var(--transition)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button 
                        onClick={() => toggleRec(rec.id)}
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '4px',
                          border: '2px solid var(--primary)',
                          background: rec.completed ? 'var(--primary)' : 'transparent',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          padding: 0
                        }}
                      >
                        {rec.completed && <Check size={14} />}
                      </button>
                      <span style={{ fontSize: '0.9rem', textDecoration: rec.completed ? 'line-through' : 'none', fontWeight: '500' }}>
                        {rec.text}
                      </span>
                    </div>

                    <span className={`edu-badge ${
                      rec.tag === 'Urgent' ? 'edu-badge-warning' : 
                      rec.tag === 'Review' ? 'edu-badge-info' : 
                      rec.tag === 'Practice' ? 'edu-badge-success' : 'edu-badge-primary'
                    }`}>
                      {rec.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="edu-card" style={{ background: 'var(--primary-bg)', borderColor: 'var(--primary-border)' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} />
                  <span>AI Learning Path</span>
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  Based on recent grades, your learning path is pointing towards reinforcing Calculus integral math and Physics electromagnetism basics. Completed items will automatically sync to progress reports.
                </p>
              </div>

              <div className="edu-card">
                <h3 style={{ fontSize: '1rem', marginBottom: '12px' }}>Resource Recommendations</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.8rem' }}>
                  <a href="#tutorial" style={{ display: 'block', padding: '8px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', textDecoration: 'none', color: 'inherit' }}>
                    <p style={{ fontWeight: '600', color: 'var(--primary)' }}>Syllabus: Integration Rules</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PDF study guide • 1.2 MB</p>
                  </a>
                  <a href="#tutorial" style={{ display: 'block', padding: '8px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', textDecoration: 'none', color: 'inherit' }}>
                    <p style={{ fontWeight: '600', color: 'var(--primary)' }}>Video: Gauss's Law Explained</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>14 mins lecture • Youtube</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
