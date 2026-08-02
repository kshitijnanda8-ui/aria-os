import React, { useState, useEffect } from 'react'
import { useStore } from './store/useStore'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import VoiceCommand from './components/VoiceCommand'
import TaskManager from './components/TaskManager'
import MarketingHub from './components/MarketingHub'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const { activeTab, setActiveTab } = useStore()
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    // Initialize any setup
    console.log('🤖 ARIA Operating System Initialized')
  }, [])

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {activeTab === 'dashboard' && <Dashboard key="dashboard" />}
        {activeTab === 'tasks' && <TaskManager key="tasks" />}
        {activeTab === 'marketing' && <MarketingHub key="marketing" />}
        {activeTab === 'voice' && <VoiceCommand key="voice" />}
      </AnimatePresence>
      
      <VoiceCommand isListening={isListening} setIsListening={setIsListening} />
    </Layout>
  )
}

export default App
