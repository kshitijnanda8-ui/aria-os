import React, { useState, useEffect } from 'react'
import { useStore } from '../store/useStore'
import { Bell, Clock, Wifi } from 'lucide-react'
import { motion } from 'framer-motion'

function TopBar() {
  const { systemHealth } = useStore()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="glass border-b border-accent/10 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white">ARIA System</h1>
        <p className="text-xs text-accent/60">Active & Online</p>
      </div>

      <div className="flex items-center gap-6">
        {/* Time */}
        <motion.div className="flex items-center gap-2 text-sm" whileHover={{ scale: 1.05 }}>
          <Clock size={16} className="text-accent" />
          <span className="font-mono text-accent">{time.toLocaleTimeString()}</span>
        </motion.div>

        {/* System Health */}
        <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
          <div className="w-8 h-8 rounded-full glass flex items-center justify-center text-xs text-accent">
            {Math.round((systemHealth.cpu + systemHealth.memory) / 2)}%
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.button
          className="p-2 rounded-lg hover:bg-accent/10 text-accent relative"
          whileHover={{ scale: 1.1 }}
        >
          <Bell size={20} />
          <motion.span
            className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full pulse-glow"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>

        {/* Status */}
        <motion.div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs">
          <Wifi size={14} className="scan" />
          ONLINE
        </motion.div>
      </div>
    </div>
  )
}

export default TopBar
