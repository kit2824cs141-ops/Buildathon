import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  BarChart2, CheckSquare, Sparkles, MessageSquare, TrendingUp, 
  BookOpen, AlertTriangle, ArrowUpRight, HelpCircle, Check, Play, RefreshCw 
} from 'lucide-react';

export default function Progress() {
  const location = useLocation();

  // Parse query parameter tab
  const getTab = () => {
    const params = new URLSearchParams(location.search);
    return params.get('tab') || 'performance';
  };

  const activeTab = getTab();

  // Weak subjects state
  const weakSubjects = [
    { 
      code: 'PHYS202', 
      title: 'General Physics II', 
      grade: 'C+', 
      score: 45, 
      weakAreas: ['DC Circuits Analysis', 'Electric Potential equations'], 
      action: 'Schedule Tutoring Session' 
    },
    { 
      code: 'MATH302', 
      title: 'Calculus III', 
      grade: 'B', 
      score: 62, 
      weakAreas: ['Triple Integrals in Spherical Coordinates', 'Surface Integrals'], 
      action: 'Solve Practice Worksheet 5' 
    }
  ];

  // Improvement checklist
  const [tips, setTips] = useState([
    { id: 1, text: 'Spend 20 minutes practicing SQL Join questions', completed: false, category: 'DBMS' },
    { id: 2, text: 'Revise Gauss Law tutorial calculations', completed: true, category: 'Physics' },
    { id: 3, text: 'Watch video lecture: Multivariable Integration Limits', completed: false, category: 'Calculus' },
    { id: 4, text: 'Implement AVL Tree insertion code locally', completed: false, category: 'Algorithms' }
  ]);

  const toggleTip = (id) => {
    setTips(tips.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  // AI insights report simulator
  const [generating, setGenerating] = useState(false);
  const [insightReport, setInsightReport] = useState(
    "Alex, your performance indicates a strong affinity for programming theory (Algorithms 78%, DBMS 90%). However, mathematical applications are facing resistance. General Physics II score is 45% due to low scores in DC circuits quizzes. Calculus III integrals are showing a minor dip. Reallocating 3 hours from Database studies to Calculus practice this week is highly recommended."
  );

  const regenerateInsights = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setInsightReport(
        "AI Assessment updated: You have completed the Gauss Law physics tutorial. Electromagnetics confidence level increased by 8%. Calculus double integrals remain the highest priority. Recommended next step: watch the Multivariable Limits video tutorial to secure B+ zone."
      );
    }, 1500);
  };

  return (
    <div id="student-progress-page" className="tab-view-container animate-fade">
      <div className="view-title-row">
        <h2 className="view-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {activeTab === 'performance' && <BarChart2 color="var(--primary)" />}
          {activeTab === 'weak' && <CheckSquare color="var(--primary)" />}
          {activeTab === 'tips' && <Sparkles color="var(--primary)" />}
          {activeTab === 'insights' && <MessageSquare color="var(--primary)" />}
          <span>
            {activeTab === 'performance' && 'Performance Overview'}
            {activeTab === 'weak' && 'Weak Subjects Tracker'}
            {activeTab === 'tips' && 'Improvement Tips Checklist'}
            {activeTab === 'insights' && 'AI Academic Insights'}
          </span>
        </h2>
      </div>

      {activeTab === 'performance' && (
        <div className="animate-fade">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Visual metrics demonstrating your grade progression and weekly study hours.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            {/* Semester Grade Progression Chart */}
            <div className="edu-card">
              <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>GPA Progression (Semesters 1 - 4)</h3>
              
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '240px', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
                {/* Semester 1 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '8px' }}>3.40</div>
                  <div style={{ width: '36px', height: '170px', background: 'var(--border)', borderRadius: '6px', position: 'relative' }}>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '85%', background: 'var(--primary-light)', borderRadius: 'inherit' }}></div>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', marginTop: '8px', color: 'var(--text-secondary)' }}>Sem 1</span>
                </div>

                {/* Semester 2 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '8px' }}>3.55</div>
                  <div style={{ width: '36px', height: '170px', background: 'var(--border)', borderRadius: '6px', position: 'relative' }}>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '88.7%', background: 'var(--primary-light)', borderRadius: 'inherit' }}></div>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', marginTop: '8px', color: 'var(--text-secondary)' }}>Sem 2</span>
                </div>

                {/* Semester 3 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '8px' }}>3.72</div>
                  <div style={{ width: '36px', height: '170px', background: 'var(--border)', borderRadius: '6px', position: 'relative' }}>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '93%', background: 'var(--primary-light)', borderRadius: 'inherit' }}></div>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', marginTop: '8px', color: 'var(--text-secondary)' }}>Sem 3</span>
                </div>

                {/* Semester 4 (Current) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '8px' }}>3.82</div>
                  <div style={{ width: '36px', height: '170px', background: 'var(--border)', borderRadius: '6px', position: 'relative' }}>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '95.5%', background: 'var(--primary)', borderRadius: 'inherit' }}></div>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', marginTop: '8px', color: 'var(--primary)' }}>Sem 4</span>
                </div>
              </div>
            </div>

            {/* Study Target */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="edu-card stat-glow" style={{ textAlign: 'center' }}>
                <div className="stat-label">WEEKLY STUDY HOURS</div>
                <div className="stat-value">24.5 Hrs</div>
                <div className="stat-footer">Target: <span className="stat-highlight">28 Hrs</span> / week</div>
              </div>

              <div className="edu-card">
                <h4 style={{ fontSize: '0.9rem', marginBottom: '10px' }}>Performance Analytics</h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Highest Subject Score:</span>
                    <strong style={{ color: 'var(--text-primary)' }}>DBMS (90%)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Class Standing:</span>
                    <strong style={{ color: 'var(--text-primary)' }}>12th / 150</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'weak' && (
        <div className="animate-fade">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Automatic identification of subjects with progress below 70% threshold.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {weakSubjects.map((sub) => (
              <div key={sub.code} className="edu-card" style={{ borderLeft: '4px solid var(--primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <span className="edu-badge edu-badge-warning" style={{ marginBottom: '6px' }}>{sub.code}</span>
                    <h3 style={{ fontSize: '1.15rem' }}>{sub.title}</h3>
                  </div>
                  <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary)' }}>{sub.score}% Complete</span>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)' }}>Identified Weak Topic Focus Areas:</span>
                  <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {sub.weakAreas.map((area, idx) => (
                      <li key={idx}>{area}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Required target grade for scholarship eligibility: B+</span>
                  <button className="btn-brand-outline" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
                    {sub.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'tips' && (
        <div className="animate-fade">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Practical study actions compiled dynamically based on weak subject results.</p>

          <div className="edu-card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Your Daily Checklists</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {tips.map((tip) => (
                <div 
                  key={tip.id} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    padding: '12px 16px', 
                    border: '1px solid var(--border)', 
                    borderRadius: 'var(--radius-md)',
                    background: tip.completed ? 'var(--bg-hover)' : 'var(--bg-card)',
                    opacity: tip.completed ? 0.7 : 1,
                    transition: 'var(--transition)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button 
                      onClick={() => toggleTip(tip.id)}
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px',
                        border: '2px solid var(--primary)',
                        background: tip.completed ? 'var(--primary)' : 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        padding: 0
                      }}
                    >
                      {tip.completed && <Check size={14} />}
                    </button>
                    <span style={{ fontSize: '0.85rem', textDecoration: tip.completed ? 'line-through' : 'none', fontWeight: '500' }}>
                      {tip.text}
                    </span>
                  </div>

                  <span className="edu-badge edu-badge-primary" style={{ fontSize: '0.7rem' }}>
                    {tip.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="animate-fade">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Deep learning analytical report checking quiz curves and study loads.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="edu-card" style={{ borderLeft: '4px solid var(--primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={18} color="var(--primary)" />
                  <span>AI Academic Analysis Report</span>
                </h3>
                <button 
                  onClick={regenerateInsights} 
                  disabled={generating}
                  className="btn-brand-outline" 
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', padding: '6px 12px' }}
                >
                  <RefreshCw size={14} className={generating ? 'animate-spin' : ''} /> 
                  {generating ? 'Re-analyzing...' : 'Request Fresh Analysis'}
                </button>
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', padding: '16px', background: 'var(--bg-hover)', borderRadius: 'var(--radius-md)' }}>
                {generating ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span>Evaluating current syllabus completion rates...</span>
                  </div>
                ) : (
                  insightReport
                )}
              </div>
            </div>

            <div className="card-container">
              <div className="edu-card">
                <h4 style={{ fontSize: '0.9rem', marginBottom: '8px' }}>Study Load Balance</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Calculus: <strong>High Demand</strong> (+2h requested)</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>DBMS: <strong>Optimal Status</strong></p>
              </div>

              <div className="edu-card">
                <h4 style={{ fontSize: '0.9rem', marginBottom: '8px' }}>Confidence Scores</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Calculus integration: <strong>68%</strong></p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Physics circuits: <strong>52%</strong> (Critical)</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
