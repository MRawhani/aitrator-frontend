'use client'

import { useSelector } from 'react-redux'

export default function ProductSelector({ onSelectProduct }) {
  const { products, selectedProduct, loading } = useSelector((state) => state.products);

  if (loading) {
    return (
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Loading products...
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
          disabled
        >
          <option>Loading...</option>
        </select>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select a Product
      </label>
      <select
        className="w-full p-2 border border-gray-300 rounded-md"
        value={selectedProduct || ''}
        onChange={(e) => onSelectProduct(e.target.value)}
      >
        <option value="">Choose a product</option>
        {products.map((product) => (
          <option key={product._id} value={product._id}>
            {product.name} - ${product.price}
          </option>
        ))}
      </select>
    </div>
  );
} 