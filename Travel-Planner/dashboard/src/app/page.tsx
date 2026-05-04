import StatusHeader from '@/components/StatusHeader';
import ExpenseWidget from '@/components/ExpenseWidget';
import ItineraryTimeline from '@/components/ItineraryTimeline';
import { getExpenseSummary, getTodayPlan } from '@/lib/markdownParser';

export default function Home() {
  // In a real app, you might use new Date() to get the current date
  // For this trip, we'll hardcode the current simulation date
  const targetDate = '2026-05-04';
  const plan = getTodayPlan(targetDate);
  const expenses = getExpenseSummary();

  return (
    <main>
      <StatusHeader date={targetDate} />
      
      <ExpenseWidget 
        total={expenses.total} 
        recent={expenses.recent} 
      />
      
      {plan && <ItineraryTimeline items={plan.items} />}
      
      <footer style={{ textAlign: 'center', marginTop: '40px' }} className="text-muted">
        <p>Built with ❤️ for the South Explorer Trip</p>
        <p style={{ fontSize: '0.7rem', marginTop: '5px' }}>Data synced from Markdown logs</p>
      </footer>
    </main>
  );
}
