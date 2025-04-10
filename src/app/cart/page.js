export default function Cart() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            {/* Placeholder for cart items */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded-md"></div>
                <div>
                  <h3 className="text-lg font-semibold">Image Title</h3>
                  <p className="text-gray-600">Description</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">$10.00</p>
                <button className="text-red-600 hover:text-red-800">Remove</button>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold">Total</span>
                <span className="text-xl font-semibold">$10.00</span>
              </div>
              <button className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 