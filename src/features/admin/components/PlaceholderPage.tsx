interface PlaceholderPageProps {
  title: string
}

const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
  return (
    <div className="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-4">Content coming soon...</p>
    </div>
  )
}

export default PlaceholderPage
