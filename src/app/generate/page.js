export default function Generate() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Generate Images</h1>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Image Generation</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Prompt</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows={4}
                placeholder="Describe the image you want to generate..."
              />
            </div>
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
              Generate Image
            </button>
          </div>
        </div>
      </div>
    </main>
  )
} 