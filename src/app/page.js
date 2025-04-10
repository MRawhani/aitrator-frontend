export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Aitrator</h1>
      <p className="text-xl mb-4">Your AI Image Generation Platform</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Generate Images</h2>
          <p className="text-gray-600">Create stunning AI-generated images with our advanced tools.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Image Library</h2>
          <p className="text-gray-600">Browse and manage your generated images.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Cart</h2>
          <p className="text-gray-600">Manage your selected images and purchases.</p>
        </div>
      </div>
    </main>
  )
} 