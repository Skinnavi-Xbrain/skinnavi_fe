import { Outlet } from 'react-router-dom'
import Header from '@/features/navigation/components/Header'
import Footer from '@/features/navigation/components/Footer'
import { ChatBox } from '@/features/home/components/ChatBox'

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans selection:bg-[#67AEFF]/30 dark:bg-gray-950">
      <Header />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />

      {/* Floating AI Chatbox */}
      <ChatBox />
    </div>
  )
}
