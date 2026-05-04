export default function StatusHeader({ date }: { date: string }) {
  return (
    <header className="card flex-between">
      <div>
        <h1 style={{ margin: 0 }}>South Explorer</h1>
        <p className="text-muted">Southern Thailand Trip 2026</p>
      </div>
      <div className="badge">{date}</div>
    </header>
  );
}
