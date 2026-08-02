import React, { useState } from 'react'
import { useStore } from '../store/useStore'
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react'
import { motion } from 'framer-motion'

function TaskManager() {
  const { tasks, addTask, updateTask, deleteTask } = useStore()
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask({
        title: newTask,
        status: 'pending',
        priority: 'medium',
        dueDate: new Date().toISOString().split('T')[0]
      })
      setNewTask('')
    }
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return task.status === 'pending'
    if (filter === 'completed') return task.status === 'completed'
    return true
  })

  return (
    <div className="space-y-6">
      <motion.div
        className="glass rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">Task Manager</h2>
        
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            placeholder="Add a new task..."
            className="flex-1 bg-accent/10 border border-accent/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50"
          />
          <motion.button
            onClick={handleAddTask}
            className="bg-accent/20 hover:bg-accent/30 text-accent px-6 py-3 rounded-lg flex items-center gap-2 transition-all glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} /> Add
          </motion.button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {['all', 'pending', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg capitalize transition-all ${
                filter === f ? 'bg-accent/30 text-accent glow' : 'bg-accent/5 text-gray-400 hover:text-accent'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {filteredTasks.map((task, idx) => (
            <motion.div
              key={task.id}
              className="flex items-center gap-4 p-4 bg-accent/5 rounded-lg hover:bg-accent/10 transition-all"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ x: 5 }}
            >
              <button
                onClick={() => updateTask(task.id, { status: task.status === 'completed' ? 'pending' : 'completed' })}
                className="text-accent hover:text-white transition-colors"
              >
                {task.status === 'completed' ? (
                  <CheckCircle2 size={24} />
                ) : (
                  <Circle size={24} />
                )}
              </button>

              <div className="flex-1">
                <p className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-white'}`}>
                  {task.title}
                </p>
                <p className="text-xs text-gray-400">{task.dueDate}</p>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                task.priority === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {task.priority}
              </span>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default TaskManager
