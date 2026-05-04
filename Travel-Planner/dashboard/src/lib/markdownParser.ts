import fs from 'fs';
import path from 'path';

const BASE_PATH = path.join(process.cwd(), '..', 'southern-thailand-trip-2026');

export interface ExpenseEntry {
  date: string;
  item: string;
  category: string;
  amount: number;
  note: string;
}

export interface ItineraryItem {
  time: string;
  activity: string;
  description?: string;
}

export function getExpenseSummary() {
  try {
    const filePath = path.join(BASE_PATH, 'expenses', 'daily-log.md');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Extract total accumulation
    const totalMatch = content.match(/\*\*ยอดรวมสะสม:\*\* ([\d,.]+)/);
    const totalAccumulation = totalMatch ? parseFloat(totalMatch[1].replace(/,/g, '')) : 0;

    // Extract table entries (latest 5)
    const lines = content.split('\n');
    const tableEntries: ExpenseEntry[] = [];
    
    // Simple table parser
    for (const line of lines) {
      if (line.includes('|') && !line.includes('---') && !line.includes('รายการ')) {
        const parts = line.split('|').map(p => p.trim());
        if (parts.length >= 5 && parts[1]) {
          tableEntries.push({
            date: parts[1],
            item: parts[2],
            category: parts[3],
            amount: parseFloat(parts[4].replace(/,/g, '')) || 0,
            note: parts[5] || ''
          });
        }
      }
    }

    return {
      total: totalAccumulation,
      recent: tableEntries.reverse().slice(0, 5)
    };
  } catch (error) {
    console.error('Error parsing expenses:', error);
    return { total: 0, recent: [] };
  }
}

export function getTodayPlan(dateStr: string = '2026-05-04') {
  try {
    const filePath = path.join(BASE_PATH, 'itinerary', `plan-${dateStr}.md`);
    if (!fs.existsSync(filePath)) return null;

    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const items: ItineraryItem[] = [];

    // Parse list items like "- **08:00:** Activity"
    for (const line of lines) {
      const match = line.match(/-\s*\*\*([\d:]+):\*\*\s*(.*)/);
      if (match) {
        items.push({
          time: match[1],
          activity: match[2].trim()
        });
      }
    }

    return {
      date: dateStr,
      items
    };
  } catch (error) {
    console.error('Error parsing plan:', error);
    return null;
  }
}
