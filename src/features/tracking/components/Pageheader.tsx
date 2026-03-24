import { useNavigate } from 'react-router-dom'

export const PageHeader = ({ title }: { title: string }) => {
  const navigate = useNavigate()

  return (
    <section className="bg-gradient-to-r from-blue-100 to-blue-50 py-12 md:py-16 animate-fadeIn">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-3 animate-slideInRight uppercase">
          {title}
        </h1>
        <nav className="flex items-center justify-center gap-2 text-sm md:text-base">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
          >
            Home
          </button>
          <span className="text-gray-400">&gt;&gt;</span>
          <span className="text-blue-500 font-medium">{title}</span>
        </nav>
      </div>
    </section>
  )
}
