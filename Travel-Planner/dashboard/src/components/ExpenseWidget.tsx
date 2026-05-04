import { ExpenseEntry } from '@/lib/markdownParser';

export default function ExpenseWidget({ total, recent }: { total: number; recent: ExpenseEntry[] }) {
  return (
    <div className="card">
      <div className="flex-between" style={{ marginBottom: '15px' }}>
        <h2>Expenses</h2>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>
          ฿{total.toLocaleString()}
        </div>
      </div>
      
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
        <h3 style={{ fontSize: '1rem' }}>Recent Activity</h3>
        <ul style={{ listStyle: 'none' }}>
          {recent.map((entry, i) => (
            <li key={i} className="flex-between" style={{ padding: '8px 0', fontSize: '0.9rem' }}>
              <span>{entry.item}</span>
              <span style={{ fontWeight: 'bold' }}>฿{entry.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
