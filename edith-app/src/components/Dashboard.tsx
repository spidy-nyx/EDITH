import { motion } from 'framer-motion';
import { useEdithStore } from '../store/edithStore';
import { personalityInfo } from '../utils/personalities';

const Dashboard = () => {
  const { stats, personality, chatHistory } = useEdithStore();

  const daysSinceStart = Math.floor((Date.now() - stats.startDate) / (1000 * 60 * 60 * 24));
  const avgMessagesPerDay = daysSinceStart > 0 ? (stats.totalMessages / daysSinceStart).toFixed(1) : stats.totalMessages;

  const statCards = [
    {
      label: 'Total Messages',
      value: stats.totalMessages,
      icon: '💬',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Conversations',
      value: stats.totalConversations,
      icon: '🗨️',
      color: 'from-purple-500 to-pink-500'
    },
    {
      label: 'Days Active',
      value: daysSinceStart || 1,
      icon: '📅',
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Avg/Day',
      value: avgMessagesPerDay,
      icon: '📊',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <motion.div
      className="glass rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold gradient-text">Dashboard</h2>
        <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 border border-white/10">
          <span className="text-2xl">{personalityInfo[personality].icon}</span>
          <span className="text-sm text-gray-300">{personalityInfo[personality].name}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            className={`bg-gradient-to-br ${stat.color} rounded-xl p-4 text-white`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-xs opacity-90">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Commands Info */}
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h3 className="text-lg font-semibold text-red-400 mb-3">Quick Commands</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-blue-400">/time</span>
            <span className="text-gray-400">- Current time</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400">/date</span>
            <span className="text-gray-400">- Today's date</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400">/weather</span>
            <span className="text-gray-400">- Local weather</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400">/search</span>
            <span className="text-gray-400">- Web search</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400">/news</span>
            <span className="text-gray-400">- Latest news</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400">/remind</span>
            <span className="text-gray-400">- Set reminder</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400">/joke</span>
            <span className="text-gray-400">- Random joke</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400">/help</span>
            <span className="text-gray-400">- All commands</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      {chatHistory.length > 0 && (
        <div className="mt-4 bg-white/5 rounded-xl p-4 border border-white/10">
          <h3 className="text-lg font-semibold text-red-400 mb-3">Recent Activity</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {chatHistory.slice(-5).reverse().map((msg, index) => (
              <div key={index} className="text-xs text-gray-400">
                <span className={msg.role === 'user' ? 'text-blue-400' : 'text-green-400'}>
                  {msg.role === 'user' ? '👤 You' : '🤖 E.D.I.T.H'}:
                </span>
                <span className="ml-2">{msg.content.substring(0, 50)}{msg.content.length > 50 ? '...' : ''}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;
