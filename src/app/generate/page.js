'use client'

import { useState, useEffect } from 'react'
import { apiEndpoints } from '../../utils/api'
import { toast } from 'react-toastify'
import Image from 'next/image'
import Layout from '../../components/Layout'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage'
import { addItemToCart } from '../../store/slices/cartSlice'
import { useDispatch } from 'react-redux'

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export default function GeneratePage() {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState('')
  const [prompt, setPrompt] = useState('')
  const [generatedImages, setGeneratedImages] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)
  const dispatch = useDispatch()
  const fetchProducts = async () => {
    try {
      setError(null)
      const response = await apiEndpoints.getProducts()
      setProducts(response.data)
      if (response.data.length > 0) {
        setSelectedProduct(response.data[0]._id)
      }
      setRetryCount(0) // Reset retry count on success
    } catch (err) {
      console.error('Error fetching products:', err)
      
      if (retryCount < MAX_RETRIES) {
        setError(`Failed to load products. Retrying... (${retryCount + 1}/${MAX_RETRIES})`)
        setTimeout(() => {
          setRetryCount(prev => prev + 1)
        }, RETRY_DELAY)
      } else {
        setError('Failed to load products. Please try again later or refresh the page.')
      }
    } finally {
      setIsLoadingProducts(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [retryCount])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedProduct) {
      toast.error('Please select a product')
      return
    }
    
    if (!prompt.trim()) {
      toast.error('Please enter a prompt')
      return
    }

    setIsGenerating(true)
    try {
      const response = await apiEndpoints.generateImage({
        productId: selectedProduct,
        prompt: prompt.trim()
      })
      setGeneratedImages(response.data)
      toast.success('Images generated successfully!')
    } catch (err) {
      console.error('Error generating images:', err)
      toast.error('Failed to generate images. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleAddToCart = async (image) => {
    if (!selectedProduct) {
      toast.error('Please select a product first');
      return;
    }
    try {
      await dispatch(addItemToCart({
        image: image,
        productId: selectedProduct,
        quantity: 1
      }));
      toast.success('Added to cart successfully!')
    } catch (err) {
      console.error('Error adding to cart:', err)
      toast.error('Failed to add to cart. Please try again.')
    }
  }

  const handleRetry = () => {
    setRetryCount(0) // Reset retry count and trigger fetch
  }

  if (isLoadingProducts && !error) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      </Layout>
    )
  }

  if (error && retryCount >= MAX_RETRIES) {
    return (
      <Layout>
        <ErrorMessage 
          message={error}
          onRetry={handleRetry}
        />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Generate Images</h1>
        
        {error && retryCount < MAX_RETRIES && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-yellow-800">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="max-w-2xl mb-12">
          <div className="mb-6">
            <label htmlFor="product" className="block text-lg font-medium mb-2">
              Select Product
            </label>
            <select
              id="product"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Choose a product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name} - ${product.price}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="prompt" className="block text-lg font-medium mb-2">
              Enter Prompt
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Describe the image you want to generate..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          >
            {isGenerating ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner size="small" />
                <span className="ml-2">Generating...</span>
              </div>
            ) : (
              'Generate Images'
            )}
          </button>
        </form>

        {generatedImages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {generatedImages.map((image) => (
              <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image
                    src={image.imageUrl}
                    alt={image.prompt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    unoptimized
                    priority={false}
                  />
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-4">{image.prompt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">${image.product.price}</span>
                    <button
                      onClick={() => handleAddToCart(image)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
} 