import React from 'react'
import { useStore } from '../store/useStore'
import { Zap, BarChart3, Mic, CheckSquare, MessageCircle, Settings } from 'lucide-react'
import { motion } from 'framer-motion'

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Zap },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'marketing', label: 'Marketing', icon: BarChart3 },
  { id: 'voice', label: 'Voice AI', icon: Mic },
]

function Sidebar() {
  const { activeTab, setActiveTab } = useStore()

  return (
    <div className="w-64 glass border-r border-accent/10 p-6 flex flex-col">
      {/* Logo */}
      <motion.div
        className="mb-12 text-center"
        whileHover={{ scale: 1.05 }}
      >
        <div className="text-4xl font-bold text-accent mb-2">ARIA</div>
        <div className="text-xs text-accent/60 tracking-widest">AI OPERATING SYSTEM</div>
      </motion.div>

      {/* Menu Items */}
      <nav className="flex-1 space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-accent/20 text-accent glow'
                  : 'text-gray-400 hover:text-accent hover:bg-accent/5'
              }`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-2 h-2 rounded-full bg-accent"
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                />
              )}
            </motion.button>
          )
        })}
      </nav>

      {/* Settings */}
      <motion.button
        className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-accent rounded-lg hover:bg-accent/5 transition-all"
        whileHover={{ x: 5 }}
      >
        <Settings size={20} />
        <span>Settings</span>
      </motion.button>
    </div>
  )
}

export default Sidebar
