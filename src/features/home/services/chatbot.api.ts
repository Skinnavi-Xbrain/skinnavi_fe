import apiClient from '@/shared/lib/api-client'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatResponse {
  reply: string
}

export const sendChatMessage = async (message: string, history: ChatMessage[]): Promise<string> => {
  const res = await apiClient.post<ChatResponse>('/chatbot/chat', {
    message,
    history
  })
  return res.data.reply
}
