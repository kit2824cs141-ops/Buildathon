export default function SkeletonLoader({ type = 'card', count = 1 }) {
  const renderSkeletonItem = (key) => {
    if (type === 'table') {
      return (
        <tr key={key}>
          {Array.from({ length: 5 }).map((_, i) => (
            <td key={i} style={{ padding: '16px' }}>
              <div className="skeleton-line" style={{ height: '14px', width: i === 0 ? '60px' : i === 1 ? '120px' : '80px' }} />
            </td>
          ))}
        </tr>
      );
    }

    if (type === 'list') {
      return (
        <div key={key} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #F3F4F6' }}>
          <div className="skeleton-line" style={{ width: '40px', height: '40px', borderRadius: '8px' }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div className="skeleton-line" style={{ height: '14px', width: '40%' }} />
            <div className="skeleton-line" style={{ height: '10px', width: '70%' }} />
          </div>
        </div>
      );
    }

    // Default: card skeleton
    return (
      <div key={key} className="section-card" style={{ padding: '20px', minHeight: '140px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div className="skeleton-line" style={{ height: '16px', width: '30%', borderRadius: '4px' }} />
        <div className="sidebar-divider" style={{ margin: '4px 0' }} />
        <div className="skeleton-line" style={{ height: '12px', width: '80%', borderRadius: '3px' }} />
        <div className="skeleton-line" style={{ height: '12px', width: '60%', borderRadius: '3px' }} />
        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <div className="skeleton-line" style={{ height: '28px', width: '80px', borderRadius: '6px' }} />
        </div>
      </div>
    );
  };

  return (
    <>
      {type === 'table' ? (
        <table className="teacher-table" style={{ width: '100%' }}>
          <tbody>
            {Array.from({ length: count }).map((_, idx) => renderSkeletonItem(idx))}
          </tbody>
        </table>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
          {Array.from({ length: count }).map((_, idx) => renderSkeletonItem(idx))}
        </div>
      )}

      <style>{`
        .skeleton-line {
          background: linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%);
          background-size: 200% 100%;
          animation: loading-pulse 1.5s infinite ease-in-out;
        }
        @keyframes loading-pulse {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </>
  );
}
