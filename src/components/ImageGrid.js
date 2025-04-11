'use client'

import { useSelector } from 'react-redux'
import Image from 'next/image'

export default function ImageGrid({ selectedProduct, onAddToCart }) {
  const { libraryImages, loading, error } = useSelector((state) => state.images);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error loading images: {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {libraryImages.map((image) => (
        <div
          key={image._id}
          className="relative aspect-square cursor-pointer group"
        >
          <Image
            src={image.imageUrl}
            alt={image.prompt}
            fill
            className="object-cover rounded-lg transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg" />
          <button
            onClick={() => onAddToCart(image)}
            disabled={!selectedProduct}
            className={`absolute bottom-4 left-4 right-4 py-2 px-4 rounded ${
              selectedProduct
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {selectedProduct ? 'Add to Cart' : 'Select a Product First'}
          </button>
        </div>
      ))}
    </div>
  );
} 