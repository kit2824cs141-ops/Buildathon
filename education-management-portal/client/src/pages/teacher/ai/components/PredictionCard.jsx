import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import RiskBadge from './RiskBadge';

export default function PredictionCard({ name, roll, className, currentScore, predictedScore, trend, riskLevel, confidence }) {
  const diff = predictedScore - currentScore;

  const trendIcon = () => {
    if (trend === 'Improving') return <ArrowUpRight size={16} color="#10B981" style={{ strokeWidth: 3 }} />;
    if (trend === 'Declining') return <ArrowDownRight size={16} color="#EF4444" style={{ strokeWidth: 3 }} />;
    return <Minus size={16} color="#6B7280" style={{ strokeWidth: 3 }} />;
  };

  const trendColor = () => {
    if (trend === 'Improving') return '#10B981';
    if (trend === 'Declining') return '#EF4444';
    return '#6B7280';
  };

  return (
    <div className="chart-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '14.5px', fontWeight: 700, color: '#1A1A2E' }}>{name}</h3>
          <span style={{ fontSize: '11px', color: '#6B7280' }}>Roll: {roll} • {className}</span>
        </div>
        <RiskBadge level={riskLevel} size="sm" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', background: '#FAFBFC', border: '1px solid #F0F0F0', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
        <div>
          <span style={{ display: 'block', fontSize: '10px', color: '#9CA3AF', fontWeight: 600 }}>CURRENT AVG</span>
          <strong style={{ fontSize: '15px', color: '#1A1A2E' }}>{currentScore}%</strong>
        </div>

        <div style={{ borderLeft: '1px solid #E5E7EB', borderRight: '1px solid #E5E7EB' }}>
          <span style={{ display: 'block', fontSize: '10px', color: '#9CA3AF', fontWeight: 600 }}>PREDICTED</span>
          <strong style={{ fontSize: '16px', color: '#FF6B00' }}>{predictedScore}%</strong>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ display: 'block', fontSize: '10px', color: '#9CA3AF', fontWeight: 600, marginBottom: '2px' }}>TREND FORECAST</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {trendIcon()}
            <span style={{ fontSize: '13px', fontWeight: 700, color: trendColor() }}>
              {diff > 0 ? `+${diff}%` : diff === 0 ? 'Stable' : `${diff}%`}
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#9CA3AF', borderTop: '1px dashed #E5E7EB', paddingTop: '8px' }}>
        <span>Estimate Confidence: <strong>{confidence}%</strong></span>
        <span style={{ fontStyle: 'italic' }}>* AI-Generated Estimate</span>
      </div>
    </div>
  );
}
