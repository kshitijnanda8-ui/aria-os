import React from 'react'
import { useStore } from '../store/useStore'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Zap } from 'lucide-react'

function Dashboard() {
  const { tasks, campaigns, systemHealth } = useStore()

  const statsCards = [
    { label: 'Active Tasks', value: tasks.filter(t => t.status !== 'completed').length, icon: Zap, color: 'accent' },
    { label: 'Campaigns', value: campaigns.length, icon: TrendingUp, color: 'accent' },
    { label: 'System Health', value: `${systemHealth.performance}%`, icon: Users, color: 'accent' },
  ]

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <motion.div
        className="glass rounded-xl p-8 text-center glow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-4xl font-bold text-accent mb-2">Welcome back, Chief</h2>
        <p className="text-gray-400">Your AI Operating System is fully operational</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {statsCards.map((card, idx) => {
          const Icon = card.icon
          return (
            <motion.div
              key={idx}
              className="glass rounded-xl p-6 glow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`text-${card.color}`} size={24} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
              <div className="text-sm text-gray-400">{card.label}</div>
            </motion.div>
          )
        })}
      </div>

      {/* Recent Tasks */}
      <motion.div
        className="glass rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-bold text-white mb-4">Recent Tasks</h3>
        <div className="space-y-3">
          {tasks.slice(0, 3).map((task) => (
            <motion.div
              key={task.id}
              className="flex items-center justify-between p-4 bg-accent/5 rounded-lg hover:bg-accent/10 transition-all"
              whileHover={{ x: 5 }}
            >
              <div>
                <p className="font-medium text-white">{task.title}</p>
                <p className="text-xs text-gray-400">{task.dueDate}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                task.priority === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {task.priority}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard
