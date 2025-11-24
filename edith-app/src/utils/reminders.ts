// Reminders & Calendar
import { getCookie, setCookie } from './cookies';

export interface Reminder {
  id: string;
  title: string;
  description: string;
  dueDate: number; // timestamp
  completed: boolean;
  createdAt: number;
}

export class ReminderManager {
  private static STORAGE_KEY = 'EDITH_REMINDERS';

  static getReminders(): Reminder[] {
    const data = getCookie(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  static saveReminders(reminders: Reminder[]): void {
    setCookie(this.STORAGE_KEY, JSON.stringify(reminders), 365);
  }

  static addReminder(title: string, description: string, dueDate: Date): Reminder {
    const reminders = this.getReminders();
    const newReminder: Reminder = {
      id: Date.now().toString(),
      title,
      description,
      dueDate: dueDate.getTime(),
      completed: false,
      createdAt: Date.now()
    };
    reminders.push(newReminder);
    this.saveReminders(reminders);
    
    // Schedule notification
    this.scheduleNotification(newReminder);
    
    return newReminder;
  }

  static completeReminder(id: string): void {
    const reminders = this.getReminders();
    const reminder = reminders.find(r => r.id === id);
    if (reminder) {
      reminder.completed = true;
      this.saveReminders(reminders);
    }
  }

  static deleteReminder(id: string): void {
    const reminders = this.getReminders();
    const filtered = reminders.filter(r => r.id !== id);
    this.saveReminders(filtered);
  }

  static getUpcomingReminders(): Reminder[] {
    const reminders = this.getReminders();
    const now = Date.now();
    return reminders
      .filter(r => !r.completed && r.dueDate > now)
      .sort((a, b) => a.dueDate - b.dueDate);
  }

  static getOverdueReminders(): Reminder[] {
    const reminders = this.getReminders();
    const now = Date.now();
    return reminders
      .filter(r => !r.completed && r.dueDate <= now)
      .sort((a, b) => a.dueDate - b.dueDate);
  }

  static scheduleNotification(reminder: Reminder): void {
    if (!('Notification' in window)) return;

    // Request permission
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Calculate time until reminder
    const timeUntil = reminder.dueDate - Date.now();
    
    if (timeUntil > 0 && timeUntil < 24 * 60 * 60 * 1000) { // Within 24 hours
      setTimeout(() => {
        if (Notification.permission === 'granted') {
          new Notification('E.D.I.T.H Reminder', {
            body: reminder.title,
            icon: '/jarvis.gif',
            badge: '/jarvis.gif'
          });
        }
      }, timeUntil);
    }
  }

  static checkReminders(): string {
    const upcoming = this.getUpcomingReminders();
    const overdue = this.getOverdueReminders();
    
    if (overdue.length > 0) {
      return `⚠️ You have ${overdue.length} overdue reminder(s): ${overdue[0].title}`;
    }
    
    if (upcoming.length > 0) {
      const next = upcoming[0];
      const timeUntil = next.dueDate - Date.now();
      const hours = Math.floor(timeUntil / (1000 * 60 * 60));
      return `📅 Next reminder in ${hours} hours: ${next.title}`;
    }
    
    return '✅ No upcoming reminders.';
  }
}

// Parse natural language for reminders
export function parseReminderCommand(text: string): { title: string; date: Date } | null {
  const lowerText = text.toLowerCase();
  
  // Simple patterns
  const patterns = [
    { regex: /remind me to (.+) in (\d+) (hour|hours|minute|minutes)/, type: 'relative' },
    { regex: /remind me to (.+) at (\d+):(\d+)/, type: 'time' },
    { regex: /remind me to (.+) tomorrow/, type: 'tomorrow' },
    { regex: /remind me to (.+)/, type: 'default' }
  ];
  
  for (const pattern of patterns) {
    const match = lowerText.match(pattern.regex);
    if (match) {
      const title = match[1];
      let date = new Date();
      
      if (pattern.type === 'relative') {
        const amount = parseInt(match[2]);
        const unit = match[3];
        if (unit.startsWith('hour')) {
          date.setHours(date.getHours() + amount);
        } else {
          date.setMinutes(date.getMinutes() + amount);
        }
      } else if (pattern.type === 'time') {
        date.setHours(parseInt(match[2]), parseInt(match[3]), 0);
      } else if (pattern.type === 'tomorrow') {
        date.setDate(date.getDate() + 1);
        date.setHours(9, 0, 0); // 9 AM tomorrow
      } else {
        date.setHours(date.getHours() + 1); // Default: 1 hour
      }
      
      return { title, date };
    }
  }
  
  return null;
}
