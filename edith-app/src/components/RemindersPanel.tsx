import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ReminderManager, Reminder } from '../utils/reminders';
import { soundEffects } from '../utils/soundEffects';

const RemindersPanel = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    loadReminders();
    // Refresh every minute
    const interval = setInterval(loadReminders, 60000);
    return () => clearInterval(interval);
  }, []);

  const loadReminders = () => {
    setReminders(ReminderManager.getReminders());
  };

  const handleComplete = (id: string) => {
    soundEffects.success();
    ReminderManager.completeReminder(id);
    loadReminders();
  };

  const handleDelete = (id: string) => {
    soundEffects.click();
    ReminderManager.deleteReminder(id);
    loadReminders();
  };

  const upcoming = reminders.filter(r => !r.completed && r.dueDate > Date.now());
  const overdue = reminders.filter(r => !r.completed && r.dueDate <= Date.now());
  const completed = reminders.filter(r => r.completed);

  const formatTimeUntil = (timestamp: number) => {
    const diff = timestamp - Date.now();
    if (diff < 0) return 'Overdue';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const ReminderCard = ({ reminder, isOverdue }: { reminder: Reminder; isOverdue?: boolean }) => (
    <motion.div
      className={`bg-white/5 rounded-lg p-3 border ${
        isOverdue ? 'border-red-500/50' : 'border-white/10'
      }`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-white mb-1">{reminder.title}</h4>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>{new Date(reminder.dueDate).toLocaleString()}</span>
            <span>•</span>
            <span className={isOverdue ? 'text-red-400' : ''}>
              {formatTimeUntil(reminder.dueDate)}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleComplete(reminder.id)}
            className="text-green-400 hover:text-green-300 transition-colors"
            title="Complete"
          >
            ✓
          </button>
          <button
            onClick={() => handleDelete(reminder.id)}
            className="text-red-400 hover:text-red-300 transition-colors"
            title="Delete"
          >
            ✕
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className="glass rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold gradient-text">Reminders</h2>
        <button
          onClick={() => setShowCompleted(!showCompleted)}
          className="text-xs text-gray-400 hover:text-white transition-colors"
        >
          {showCompleted ? 'Hide' : 'Show'} Completed
        </button>
      </div>

      {/* Overdue */}
      {overdue.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-2">
            <span>⚠️</span>
            <span>Overdue ({overdue.length})</span>
          </h3>
          <div className="space-y-2">
            {overdue.map(reminder => (
              <ReminderCard key={reminder.id} reminder={reminder} isOverdue />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
            <span>📅</span>
            <span>Upcoming ({upcoming.length})</span>
          </h3>
          <div className="space-y-2">
            {upcoming.map(reminder => (
              <ReminderCard key={reminder.id} reminder={reminder} />
            ))}
          </div>
        </div>
      )}

      {/* Completed */}
      {showCompleted && completed.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-2">
            <span>✅</span>
            <span>Completed ({completed.length})</span>
          </h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {completed.map(reminder => (
              <motion.div
                key={reminder.id}
                className="bg-white/5 rounded-lg p-3 border border-white/10 opacity-60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-sm text-gray-400 line-through">{reminder.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {reminders.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <p className="text-4xl mb-2">📅</p>
          <p className="text-sm">No reminders yet</p>
          <p className="text-xs mt-1">Use /remind command to create one</p>
        </div>
      )}

      {/* Help Text */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs text-gray-400">
          💡 Use <span className="text-blue-400">/remind me to [task] in [time]</span> to create reminders
        </p>
      </div>
    </motion.div>
  );
};

export default RemindersPanel;
