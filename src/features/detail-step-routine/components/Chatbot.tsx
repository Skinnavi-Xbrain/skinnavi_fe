import { useState } from 'react'
import { X, Send, Mic } from 'lucide-react'

// Mock chat messages
const initialMessages = [
  {
    id: 1,
    sender: 'bot',
    text: "Hello, I'm SkinNavi Bot! 🤖 I'm your personal skincare assistant. How can I help you?",
    time: '2 mins ago'
  },
  {
    id: 2,
    sender: 'user',
    text: 'Hi, my skin feels dry lately.',
    time: 'Just now'
  },
  {
    id: 3,
    sender: 'bot',
    text: 'Hi 👋 Is it dry all over or just certain areas?',
    time: 'Just now'
  },
  {
    id: 4,
    sender: 'user',
    text: 'Mostly on my cheeks.',
    time: 'Just now'
  },
  {
    id: 5,
    sender: 'bot',
    text: 'Got it! You may need more hydration 💧 Try a gentle cleanser and a moisturizer with Hyaluronic Acid.',
    time: 'Just now'
  },
  {
    id: 6,
    sender: 'bot',
    text: 'Should I exfoliate?',
    time: 'Just now',
    isLink: true
  }
]

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [inputMessage, setInputMessage] = useState('')

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: inputMessage,
        time: 'Just now'
      }
      setMessages([...messages, newMessage])
      setInputMessage('')

      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          sender: 'bot',
          text: "I'm here to help! Let me know if you have more questions.",
          time: 'Just now'
        }
        setMessages((prev) => [...prev, botResponse])
      }, 1000)
    }
  }

  return (
    <>
      {/* Fixed Chatbot Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 md:w-16 md:h-16 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 z-50"
      >
        {isChatOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2 22l5.71-.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.68-.29-3.86-.81l-.28-.14-2.86.49.49-2.86-.14-.28C4.29 14.68 4 13.38 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" />
            <circle cx="9" cy="12" r="1.5" />
            <circle cx="15" cy="12" r="1.5" />
            <path d="M12 15c1.66 0 3-1.34 3-3h-6c0 1.66 1.34 3 3 3z" />
          </svg>
        )}
      </button>

      {/* Chat Popup */}
      {isChatOpen && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 md:left-auto md:right-8 lg:right-16 md:translate-x-0 w-[90vw] md:w-[85vw] max-w-sm bg-white rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden border border-gray-200 animate-in slide-in-from-bottom-4 duration-300 max-h-[500px]">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-500 px-3 py-2.5 flex items-center gap-2">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2 22l5.71-.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.68-.29-3.86-.81l-.28-.14-2.86.49.49-2.86-.14-.28C4.29 14.68 4 13.38 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" />
                <circle cx="9" cy="12" r="1.5" />
                <circle cx="15" cy="12" r="1.5" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white text-sm">SkinNavi Bot</h3>
              <p className="text-xs text-blue-100">● Always active</p>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="w-7 h-7 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-3 space-y-2.5 overflow-y-auto bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-3 py-2 ${
                    message.sender === 'user'
                      ? 'bg-blue-400 text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <p className="text-xs leading-relaxed">{message.text}</p>
                  {message.isLink && (
                    <button className="text-xs text-blue-500 underline mt-1">
                      Should I exfoliate?
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-3 py-2 rounded-full border border-gray-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 text-xs"
              />
              <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors flex-shrink-0">
                <Mic className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={handleSendMessage}
                className="w-8 h-8 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatBot
