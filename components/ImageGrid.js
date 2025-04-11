export default function ImageGrid({ images, selectedProduct, onAddToCart }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Pre-generated Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image._id} className="border rounded-lg overflow-hidden">
            <img
              src={image.imageUrl}
              alt={image.prompt}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-2">{image.prompt}</p>
              <button
                onClick={() => onAddToCart(image)}
                disabled={!selectedProduct}
                className={`w-full py-2 px-4 rounded ${
                  selectedProduct
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {selectedProduct ? 'Add to Cart' : 'Select a Product First'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 