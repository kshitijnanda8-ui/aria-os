import { create } from 'zustand'

const API_BASE_URL = 'http://localhost:5000/api'

export const useStore = create((set) => ({
  // UI State
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Voice State
  isListening: false,
  setIsListening: (listening) => set({ isListening: listening }),
  lastCommand: '',
  setLastCommand: (command) => set({ lastCommand: command }),

  // Tasks State
  tasks: [],
  
  // Fetch tasks from backend
  fetchTasks: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`)
      const data = await response.json()
      set({ tasks: data })
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  },

  addTask: async (task) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      })
      const newTask = await response.json()
      set((state) => ({
        tasks: [...state.tasks, newTask]
      }))
    } catch (error) {
      console.error('Error adding task:', error)
    }
  },
  
  updateTask: async (id, updates) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      const updatedTask = await response.json()
      set((state) => ({
        tasks: state.tasks.map(task => task._id === id ? updatedTask : task)
      }))
    } catch (error) {
      console.error('Error updating task:', error)
    }
  },
  
  deleteTask: async (id) => {
    try {
      await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE'
      })
      set((state) => ({
        tasks: state.tasks.filter(task => task._id !== id)
      }))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  },

  // Marketing State
  campaigns: [
    { id: 1, name: 'Summer Sale Campaign', status: 'active', reach: 15000, engagement: 8.5 },
    { id: 2, name: 'Product Launch', status: 'scheduled', reach: 0, engagement: 0 },
  ],

  // System Stats
  systemHealth: {
    cpu: 45,
    memory: 62,
    performance: 98,
  },
}))
