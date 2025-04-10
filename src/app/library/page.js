export default function Library() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Image Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for image grid */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          <div className="aspect-square bg-gray-200 rounded-md mb-4"></div>
          <h3 className="text-lg font-semibold">Image Title</h3>
          <p className="text-gray-600">Description</p>
        </div>
      </div>
    </main>
  )
} 