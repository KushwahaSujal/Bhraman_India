'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2,
  X,
  Loader2
} from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
}

interface AIChatAssistantProps {
  isOpen: boolean
  onToggle: () => void
}

export default function AIChatAssistant({ isOpen, onToggle }: AIChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'নমস্কার! Welcome to Bhromon! I\'m your AI travel assistant for West Bengal. How can I help you plan your perfect Bengali adventure today?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: inputMessage,
          context: 'West Bengal tourism assistant'
        })
      })

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: data.success ? data.response : 'I apologize, I\'m having trouble responding right now. Please try again.',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'I\'m sorry, I\'m experiencing some technical difficulties. Please try again later.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const quickQuestions = [
    "Best time to visit Darjeeling?",
    "Traditional Bengali food recommendations",
    "How to reach Sundarbans?",
    "Cultural festivals in Kolkata",
    "Budget for 5-day West Bengal trip"
  ]

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question)
  }

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-14 h-14 heritage-gradient rounded-full shadow-lg flex items-center justify-center text-white z-50"
      >
        <MessageCircle size={24} />
      </motion.button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className={`fixed bottom-6 right-6 z-50 bg-white rounded-xl shadow-2xl border border-heritage-bronze/20 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
      } transition-all duration-300`}
    >
      {/* Header */}
      <div className="heritage-gradient text-white p-4 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot size={20} />
          <div>
            <h3 className="font-semibold">Bhromon AI Assistant</h3>
            {!isMinimized && <p className="text-xs text-heritage-beige">Your West Bengal travel guide</p>}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-heritage-beige hover:text-white transition-colors"
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button
            onClick={onToggle}
            className="text-heritage-beige hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto h-80 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-heritage-gold text-white' 
                        : 'bg-heritage-maroon text-white'
                    }`}>
                      {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-heritage-gold text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-heritage-maroon rounded-full flex items-center justify-center text-white">
                    <Bot size={16} />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none">
                    <div className="flex items-center space-x-1">
                      <Loader2 size={16} className="animate-spin text-heritage-maroon" />
                      <span className="text-sm text-gray-600">Thinking...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-1">
                {quickQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs bg-heritage-beige/50 text-heritage-maroon px-2 py-1 rounded-full hover:bg-heritage-gold/20 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about West Bengal travel..."
                className="flex-1 px-3 py-2 border border-heritage-bronze/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-heritage-gold text-sm"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="w-10 h-10 heritage-gradient rounded-lg flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  )
}
