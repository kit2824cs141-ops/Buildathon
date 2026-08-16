import { useState, useEffect } from 'react';
import { Sparkles, Brain, AlertTriangle, ShieldAlert, BookOpen, BarChart3, TrendingUp, RefreshCw, ThumbsDown, CheckSquare } from 'lucide-react';
import SectionCard from './components/SectionCard';
import StatCard from './components/StatCard';

// Reusable AI components
import RiskBadge from './ai/components/RiskBadge';
import InsightCard from './ai/components/InsightCard';
import RecommendationCard from './ai/components/RecommendationCard';
import WeakTopicCard from './ai/components/WeakTopicCard';
import PredictionCard from './ai/components/PredictionCard';

// AI Data Service
import {
  getAIRiskSummary,
  getAtRiskStudents,
  getWeakTopics,
  getRecommendations,
  getPerformancePredictions
} from '../../services/ai/aiMockService';

export default function TeacherAIInsights() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);

  // States for AI datasets
  const [riskSummary, setRiskSummary] = useState(null);
  const [atRiskStudents, setAtRiskStudents] = useState([]);
  const [weakTopics, setWeakTopics] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [predictions, setPredictions] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [summaryData, atRiskData, weakTopicsData, recsData, predictionsData] = await Promise.all([
        getAIRiskSummary(),
        getAtRiskStudents(),
        getWeakTopics(),
        getRecommendations(),
        getPerformancePredictions()
      ]);
      setRiskSummary(summaryData);
      setAtRiskStudents(atRiskData);
      setWeakTopics(weakTopicsData);
      setRecommendations(recsData);
      setPredictions(predictionsData);
    } catch (error) {
      console.error('Failed to load AI Academic Intelligence data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading || !riskSummary) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '16px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid #E5E7EB', borderTopColor: '#FF6B00', animation: 'spin 1s linear infinite' }} />
        <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: 600 }}>Analyzing academic datasets...</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="ai-intelligence-hub">
      <div className="teacher-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Brain size={22} color="#FF6B00" />
            <h1 style={{ margin: 0 }}>Academic Intelligence Hub</h1>
          </div>
          <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>
            AI-driven student evaluation, performance prognosis, and curriculum remediation advice.
          </p>
        </div>
        <button className="btn-teacher secondary" onClick={fetchData} disabled={isLoading}>
          <RefreshCw size={14} style={{ animation: isLoading ? 'spin 1s linear infinite' : 'none' }} />
          <span>Refetch AI Models</span>
        </button>
      </div>

      {/* Engine Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1A1A2E 0%, #2D2D44 100%)',
        borderRadius: '12px', padding: '18px 24px', marginBottom: '24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Sparkles size={16} color="#FF6B00" />
            <span style={{ color: '#FF6B00', fontSize: '11px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
              Paper Buddy Academic Engine v1.0
            </span>
          </div>
          <h2 style={{ color: '#FFFFFF', margin: 0, fontSize: '16px', fontWeight: 600 }}>AI Inference Models Loaded Successfully</h2>
        </div>
        <div style={{ fontSize: '11.5px', color: '#9CA3AF', background: 'rgba(255,255,255,0.06)', padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}>
          Last Analysis: <strong>{riskSummary.lastUpdated}</strong>
        </div>
      </div>

      {/* Tabs */}
      <div className="details-tabs" style={{ marginBottom: '20px' }}>
        <button className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
          AI Insights Dashboard
        </button>
        <button className={`tab-btn ${activeTab === 'at-risk' ? 'active' : ''}`} onClick={() => setActiveTab('at-risk')}>
          At-Risk Students ({riskSummary.high.length + riskSummary.medium.length})
        </button>
        <button className={`tab-btn ${activeTab === 'weak-topics' ? 'active' : ''}`} onClick={() => setActiveTab('weak-topics')}>
          Weak Topic Detection ({weakTopics.length})
        </button>
        <button className={`tab-btn ${activeTab === 'recommendations' ? 'active' : ''}`} onClick={() => setActiveTab('recommendations')}>
          AI Recommendations ({recommendations.length})
        </button>
        <button className={`tab-btn ${activeTab === 'predictions' ? 'active' : ''}`} onClick={() => setActiveTab('predictions')}>
          Performance Prediction
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'dashboard' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Metrics Row */}
          <div className="stats-grid">
            <StatCard
              title="High Academic Risk"
              value={riskSummary.high.length}
              subtitle="Critical intervention needed"
              icon={<ShieldAlert size={20} />}
              gradient="gradient-5"
              valueColor="red"
              iconColor="red"
            />
            <StatCard
              title="Medium Academic Risk"
              value={riskSummary.medium.length}
              subtitle="Counselling recommended"
              icon={<AlertTriangle size={20} />}
              gradient="gradient-1"
              valueColor="orange"
              iconColor="orange"
            />
            <StatCard
              title="Declining Forecast"
              value={riskSummary.trends.declining}
              subtitle="Students with negative trends"
              icon={<TrendingUp size={20} style={{ transform: 'rotate(180deg)' }} />}
              gradient="gradient-2"
              valueColor="blue"
              iconColor="blue"
            />
            <StatCard
              title="Weak Subject Areas"
              value={riskSummary.weakSubjects.length}
              subtitle="Averages below 65%"
              icon={<BookOpen size={20} />}
              gradient="gradient-3"
              valueColor="cyan"
              iconColor="cyan"
            />
          </div>

          <div className="details-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {/* Risk Overview Chart Card */}
            <SectionCard title="Academic Risk Overview">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#EF4444', fontWeight: 600 }}>High Risk</span>
                  <strong>{riskSummary.high.length} Student(s)</strong>
                </div>
                <div className="compare-bar-track" style={{ height: '8px' }}>
                  <div className="compare-bar-fill orange" style={{ width: `${(riskSummary.high.length / atRiskStudents.length) * 100}%`, background: '#EF4444' }}></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginTop: '4px' }}>
                  <span style={{ color: '#F59E0B', fontWeight: 600 }}>Medium Risk</span>
                  <strong>{riskSummary.medium.length} Student(s)</strong>
                </div>
                <div className="compare-bar-track" style={{ height: '8px' }}>
                  <div className="compare-bar-fill orange" style={{ width: `${(riskSummary.medium.length / atRiskStudents.length) * 100}%`, background: '#F59E0B' }}></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginTop: '4px' }}>
                  <span style={{ color: '#10B981', fontWeight: 600 }}>Low Risk</span>
                  <strong>{riskSummary.low.length} Student(s)</strong>
                </div>
                <div className="compare-bar-track" style={{ height: '8px' }}>
                  <div className="compare-bar-fill green" style={{ width: `${(riskSummary.low.length / atRiskStudents.length) * 100}%` }}></div>
                </div>
              </div>
            </SectionCard>

            {/* Performance Trends Card */}
            <SectionCard title="Performance Trends Forecast">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#10B981', fontWeight: 600 }}>Improving Grade Trend</span>
                  <strong>{riskSummary.trends.improving} Student(s)</strong>
                </div>
                <div className="compare-bar-track" style={{ height: '8px' }}>
                  <div className="compare-bar-fill green" style={{ width: `${(riskSummary.trends.improving / predictions.length) * 100}%` }}></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginTop: '4px' }}>
                  <span style={{ color: '#3B82F6', fontWeight: 600 }}>Stable Performance</span>
                  <strong>{riskSummary.trends.stable} Student(s)</strong>
                </div>
                <div className="compare-bar-track" style={{ height: '8px' }}>
                  <div className="compare-bar-fill blue" style={{ width: `${(riskSummary.trends.stable / predictions.length) * 100}%` }}></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginTop: '4px' }}>
                  <span style={{ color: '#EF4444', fontWeight: 600 }}>Declining Grade Trend</span>
                  <strong>{riskSummary.trends.declining} Student(s)</strong>
                </div>
                <div className="compare-bar-track" style={{ height: '8px' }}>
                  <div className="compare-bar-fill orange" style={{ width: `${(riskSummary.trends.declining / predictions.length) * 100}%`, background: '#EF4444' }}></div>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Detailed Lists Summary Grid */}
          <div className="details-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <SectionCard title="Weak Core Subject Areas">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {riskSummary.weakSubjects.map((sub, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#FAFBFC', border: '1px solid #F0F0F0', borderRadius: '8px' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '13.5px', fontWeight: 700, color: '#1A1A2E' }}>{sub.subject}</h4>
                      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>Class Average Score</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <strong style={{ fontSize: '16px', color: '#EF4444', display: 'block' }}>{sub.avgScore}%</strong>
                      <span style={{ fontSize: '10px', color: '#EF4444', background: '#FEF2F2', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                        {sub.severity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Immediate Compliance Risks">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Attendance threshold */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#1A1A2E' }}>Below 75% Attendance Threshold ({riskSummary.attendanceRisk.length})</span>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {riskSummary.attendanceRisk.map((st, i) => (
                      <span key={i} style={{ fontSize: '11px', color: '#EF4444', background: '#FEF2F2', border: '1px solid #FCA5A5', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>
                        {st.name} ({st.attendance}%)
                      </span>
                    ))}
                  </div>
                </div>

                <div className="sidebar-divider" style={{ margin: '8px 0' }} />

                {/* Assignment threshold */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#1A1A2E' }}>Repeated Low Assignment Scores ({riskSummary.assignmentRisk.length})</span>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {riskSummary.assignmentRisk.map((st, i) => (
                      <span key={i} style={{ fontSize: '11px', color: '#B45309', background: '#FFF5EB', border: '1px solid #FFD3B4', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>
                        {st.name} ({st.assignmentAvg}%)
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      )}

      {activeTab === 'at-risk' && (
        <div className="details-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
          {atRiskStudents.map((st, i) => (
            <div key={i} className="chart-card" style={{ borderLeft: `4px solid ${st.riskLevel === 'High' ? '#EF4444' : st.riskLevel === 'Medium' ? '#F59E0B' : '#10B981'}`, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#1A1A2E' }}>{st.name}</h3>
                  <span style={{ fontSize: '11.5px', color: '#6B7280' }}>Roll: {st.id} • Class: {st.class}</span>
                </div>
                <RiskBadge level={st.riskLevel} />
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', background: '#FAFBFC', border: '1px solid #F0F0F0', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '9.5px', color: '#9CA3AF', fontWeight: 600 }}>ATTENDANCE</span>
                  <strong style={{ fontSize: '14px', color: st.attendance < 75 ? '#EF4444' : '#10B981' }}>{st.attendance}%</strong>
                </div>
                <div style={{ borderLeft: '1px solid #E5E7EB', borderRight: '1px solid #E5E7EB' }}>
                  <span style={{ display: 'block', fontSize: '9.5px', color: '#9CA3AF', fontWeight: 600 }}>ASSIGNMENT</span>
                  <strong style={{ fontSize: '14px', color: st.assignmentAvg < 60 ? '#EF4444' : '#1A1A2E' }}>{st.assignmentAvg}%</strong>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '9.5px', color: '#9CA3AF', fontWeight: 600 }}>EXAM AVG</span>
                  <strong style={{ fontSize: '14px', color: st.examAvg < 60 ? '#EF4444' : '#1A1A2E' }}>{st.examAvg}%</strong>
                </div>
              </div>

              {/* Reasons */}
              {st.reasons.length > 0 && (
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#1A1A2E', display: 'block', marginBottom: '4px' }}>Risk Trigger Factors:</span>
                  <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {st.reasons.map((reason, idx) => (
                      <li key={idx} style={{ fontSize: '11.5px', color: '#EF4444', fontWeight: 500 }}>{reason}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="sidebar-divider" style={{ margin: '4px 0' }} />

              {/* Recommended actions */}
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#1A1A2E', display: 'block', marginBottom: '6px' }}>AI Recommended Action Steps:</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {st.recommendedActions.map((act, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#4B5563' }}>
                      <CheckSquare size={12} color="#FF6B00" style={{ flexShrink: 0 }} />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'weak-topics' && (
        <div className="details-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {weakTopics.map((topic, i) => (
            <WeakTopicCard
              key={i}
              subject={topic.subject}
              topic={topic.topic}
              avgScore={topic.avgScore}
              studentsStruggling={topic.studentsStruggling}
              maxStudents={topic.maxStudents}
              severity={topic.severity}
            />
          ))}
        </div>
      )}

      {activeTab === 'recommendations' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {recommendations.map((rec, i) => (
            <RecommendationCard
              key={i}
              title={rec.title}
              description={rec.description}
              priority={rec.priority}
              category={rec.category}
              targetClass={rec.targetClass}
              targetSubject={rec.targetSubject}
              estimatedImpact={rec.estimatedImpact}
              actions={rec.actions}
            />
          ))}
        </div>
      )}

      {activeTab === 'predictions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Estimate Disclaimer Warning */}
          <div className="conflict-warning" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#1E40AF' }}>
            <Sparkles className="warning-icon" size={18} color="#3B82F6" />
            <div>
              <strong>AI Forecast Disclaimer:</strong> The score predictions and risk levels shown below are statistical estimates generated by mock machine learning models based on current attendance patterns, examination marks, and assignments. They should be used for early support planning rather than final grading choices.
            </div>
          </div>

          <div className="details-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {predictions.map((p, i) => (
              <PredictionCard
                key={i}
                name={p.name}
                roll={p.id}
                className={p.class}
                currentScore={p.currentScore}
                predictedScore={p.predictedScore}
                trend={p.trend}
                riskLevel={p.riskLevel}
                confidence={p.confidence}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
