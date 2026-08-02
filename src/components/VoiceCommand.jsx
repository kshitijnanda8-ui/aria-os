import React, { useState, useEffect, useRef } from 'react'
import { useStore } from '../store/useStore'
import { Mic, MicOff, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

function VoiceCommand({ isListening, setIsListening }) {
  const { addTask, setLastCommand } = useStore()
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const recognitionRef = useRef(null)

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true

      recognitionRef.current.onstart = () => {
        setIsListening(true)
        setTranscript('')
      }

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            setTranscript(transcript)
            processCommand(transcript)
          } else {
            interimTranscript += transcript
          }
        }
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [])

  const processCommand = (command) => {
    setLastCommand(command)
    
    // Simple command processing
    if (command.toLowerCase().includes('add task')) {
      const taskTitle = command.replace(/add task/i, '').trim()
      if (taskTitle) {
        addTask({
          title: taskTitle,
          status: 'pending',
          priority: 'medium',
          dueDate: new Date().toISOString().split('T')[0]
        })
        setResponse(`✓ Added task: "${taskTitle}"`)
      }
    } else if (command.toLowerCase().includes('hello')) {
      setResponse('👋 Hello! Ready to assist you with anything.')
    } else {
      setResponse(`💭 Command received: "${command}"`)
    }
  }

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
    } else {
      recognitionRef.current?.start()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {response && (
          <motion.div
            className="mb-4 glass rounded-lg p-4 max-w-xs glow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onAnimationComplete={() => {
              setTimeout(() => setResponse(''), 3000)
            }}
          >
            <p className="text-sm text-accent">{response}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleListening}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all glow ${
          isListening ? 'bg-red-500/20 text-red-400' : 'bg-accent/20 text-accent'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isListening ? { scale: [1, 1.1, 1] } : {}}
        transition={isListening ? { duration: 1, repeat: Infinity } : {}}
      >
        {isListening ? <MicOff size={24} /> : <Mic size={24} />}
      </motion.button>

      {isListening && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-accent"
          animate={{ scale: [1, 1.3], opacity: [1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </div>
  )
}

export default VoiceCommand
