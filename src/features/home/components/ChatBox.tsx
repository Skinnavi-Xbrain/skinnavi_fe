import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react'
import { sendChatMessage } from '../services/chatbot.api'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Chào bạn! 🧴✨ Mình là SkinNavi AI Assistant — trợ lý thông minh chuyên về chăm sóc da. Bạn có thể hỏi mình về:\n\n• Phân tích da bằng AI\n• Quy trình skincare phù hợp\n• Sản phẩm dưỡng da\n• Cách sử dụng SkinNavi\n\nBạn cần hỗ trợ gì nào? 😊',
  timestamp: new Date()
}

const SUGGESTED_QUESTIONS = [
  'SkinNavi phân tích da như thế nào?',
  'Da mình hay bị mụn nên làm gì?',
  'Hướng dẫn sử dụng SkinNavi'
]

export const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
    if (isOpen) {
      setHasUnread(false)
    }
  }, [isOpen])

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText || isLoading) return

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    // Resize textarea back
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
    }

    try {
      // Build history (excluding welcome message)
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({ role: m.role, content: m.content }))

      const reply = await sendChatMessage(messageText, history)

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date()
      }

      setMessages((prev) => [...prev, assistantMsg])

      if (!isOpen) {
        setHasUnread(true)
      }
    } catch {
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content:
          'Xin lỗi, mình đang gặp sự cố kết nối. Bạn vui lòng thử lại sau nhé! 🙏',
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    // Auto-resize
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
  }

  const formatContent = (content: string) => {
    return content.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i < content.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  return (
    <>
      {/* ── Floating Action Button ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            id="chatbox-toggle-btn"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#67AEFF] to-[#4F8ADB] text-white shadow-lg shadow-[#67AEFF]/30 transition-shadow hover:shadow-xl hover:shadow-[#67AEFF]/40"
            aria-label="Open AI Chat"
          >
            <MessageCircle className="h-6 w-6" />
            {hasUnread && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white"
              >
                !
              </motion.span>
            )}

            {/* Pulse ring */}
            <span className="absolute inset-0 animate-ping rounded-full bg-[#67AEFF]/30" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbox-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 flex h-[560px] w-[400px] flex-col overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl shadow-black/10 dark:border-white/10 dark:bg-gray-900"
          >
            {/* ── Header ── */}
            <div className="relative flex items-center gap-3 bg-gradient-to-r from-[#67AEFF] to-[#4F8ADB] px-5 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white">
                  SkinNavi AI Assistant
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-400 shadow-sm shadow-green-400/50" />
                  <span className="text-xs text-white/80">Online</span>
                </div>
              </div>
              <button
                id="chatbox-close-btn"
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* ── Messages Area ── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 no-scrollbar">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Avatar */}
                    <div
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                        msg.role === 'assistant'
                          ? 'bg-gradient-to-br from-[#67AEFF] to-[#4F8ADB] text-white'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {msg.role === 'assistant' ? (
                        <Bot className="h-4 w-4" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'rounded-br-md bg-gradient-to-br from-[#67AEFF] to-[#4F8ADB] text-white'
                          : 'rounded-bl-md bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                      }`}
                    >
                      {formatContent(msg.content)}
                    </div>
                  </motion.div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2.5"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#67AEFF] to-[#4F8ADB] text-white">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-gray-100 px-4 py-3 dark:bg-gray-800">
                      <Loader2 className="h-4 w-4 animate-spin text-[#67AEFF]" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Đang suy nghĩ...
                      </span>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* ── Quick Suggestions (only when few messages) ── */}
            {messages.length <= 1 && (
              <div className="border-t border-gray-100 px-4 py-2 dark:border-gray-800">
                <p className="mb-2 text-xs font-medium text-gray-400 dark:text-gray-500">
                  Gợi ý câu hỏi
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_QUESTIONS.map((q, i) => (
                    <button
                      key={i}
                      id={`chatbox-suggestion-${i}`}
                      onClick={() => sendMessage(q)}
                      disabled={isLoading}
                      className="rounded-full border border-[#67AEFF]/30 bg-[#67AEFF]/5 px-3 py-1.5 text-xs text-[#4F8ADB] transition-all hover:border-[#67AEFF]/50 hover:bg-[#67AEFF]/10 disabled:opacity-50 dark:border-[#67AEFF]/20 dark:bg-[#67AEFF]/10 dark:text-[#67AEFF]"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Input Area ── */}
            <div className="border-t border-gray-100 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  id="chatbox-input"
                  value={input}
                  onChange={handleTextareaInput}
                  onKeyDown={handleKeyDown}
                  placeholder="Nhập câu hỏi về skincare..."
                  disabled={isLoading}
                  rows={1}
                  className="max-h-[120px] min-h-[40px] flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#67AEFF] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#67AEFF]/20 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-[#67AEFF] dark:focus:bg-gray-800"
                />
                <button
                  id="chatbox-send-btn"
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#67AEFF] to-[#4F8ADB] text-white shadow-md shadow-[#67AEFF]/20 transition-all hover:shadow-lg hover:shadow-[#67AEFF]/30 disabled:opacity-40 disabled:shadow-none"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-1.5 text-center text-[10px] text-gray-400 dark:text-gray-500">
                Powered by SkinNavi AI • Chỉ mang tính tham khảo
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
