import { create } from 'zustand'

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
  tasks: [
    { id: 1, title: 'Review Marketing Campaign', status: 'pending', priority: 'high', dueDate: '2024-08-05' },
    { id: 2, title: 'Track Social Media Analytics', status: 'in-progress', priority: 'medium', dueDate: '2024-08-03' },
    { id: 3, title: 'Generate Reports', status: 'pending', priority: 'high', dueDate: '2024-08-04' },
  ],
  
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, { ...task, id: Date.now() }]
  })),
  
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map(task => task.id === id ? { ...task, ...updates } : task)
  })),
  
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter(task => task.id !== id)
  })),

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
