import React from 'react'
import { useStore } from '../store/useStore'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import { motion } from 'framer-motion'

function Layout({ children }) {
  return (
    <div className="flex h-screen bg-dark overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <Sidebar />
      
      <div className="flex-1 flex flex-col relative z-10">
        <TopBar />
        
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-accent/30 scrollbar-track-darker">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default Layout
