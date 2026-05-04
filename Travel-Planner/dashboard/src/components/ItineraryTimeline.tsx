import { ItineraryItem } from '@/lib/markdownParser';

export default function ItineraryTimeline({ items }: { items: ItineraryItem[] }) {
  return (
    <div className="card">
      <h2>Today's Plan</h2>
      <div style={{ position: 'relative', paddingLeft: '20px', borderLeft: '2px solid var(--primary)' }}>
        {items.map((item, i) => (
          <div key={i} style={{ marginBottom: '20px', position: 'relative' }}>
            <div style={{ 
              position: 'absolute', 
              left: '-27px', 
              top: '5px', 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%', 
              background: 'var(--primary)',
              border: '2px solid var(--background)'
            }}></div>
            <div style={{ fontWeight: 'bold', fontSize: '0.8rem', color: 'var(--primary)' }}>{item.time}</div>
            <div style={{ fontSize: '1rem' }}>{item.activity}</div>
          </div>
        ))}
        {items.length === 0 && <p className="text-muted">No plan found for today.</p>}
      </div>
    </div>
  );
}
