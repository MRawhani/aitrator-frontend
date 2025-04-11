export default function ProductSelector({ products, selectedProduct, onSelectProduct }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Select a Product</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedProduct?._id === product._id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => onSelectProduct(product)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 