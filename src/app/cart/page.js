'use client'

import { useState, useEffect } from 'react'
import { apiEndpoints } from '../../utils/api'
import { toast } from 'react-toastify'
import Image from 'next/image'
import Layout from '../../components/Layout'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage'

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export default function CartPage() {
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  const fetchCartItems = async () => {
    try {
      setError(null)
      const response = await apiEndpoints.getCart()
      setCartItems(response.data)
      setRetryCount(0) // Reset retry count on success
    } catch (err) {
      console.error('Error fetching cart items:', err)
      
      if (retryCount < MAX_RETRIES) {
        setError(`Failed to load cart. Retrying... (${retryCount + 1}/${MAX_RETRIES})`)
        setTimeout(() => {
          setRetryCount(prev => prev + 1)
        }, RETRY_DELAY)
      } else {
        setError('Failed to load cart. Please try again later or refresh the page.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCartItems()
  }, [retryCount])

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    try {
      const response = await apiEndpoints.createOrder({ cart: cartItems })
      if (response.data.success) {
        toast.success('Order placed successfully!')
        setCartItems([]) // Clear cart after successful checkout
      } else {
        toast.error('Checkout failed. Please try again.')
      }
    } catch (err) {
      console.error('Error during checkout:', err)
      toast.error('Checkout failed. Please try again.')
    } finally {
      setIsCheckingOut(false)
    }
  }

  const handleRetry = () => {
    setRetryCount(0) // Reset retry count and trigger fetch
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price, 0)
  }

  if (isLoading && !error) {
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
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {error && retryCount < MAX_RETRIES && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-yellow-800">{error}</p>
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {cartItems.map((item) => (
                <div key={item?.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-64 w-full">
                    <Image
                      src={item?.image?.imageUrl}
                      alt={item?.image?.prompt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      unoptimized
                      priority={false}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{item.product.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">${item.product.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-semibold">Total</span>
                <span className="text-2xl font-bold">${calculateTotal().toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
              >
                {isCheckingOut ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner size="small" />
                    <span className="ml-2">Processing...</span>
                  </div>
                ) : (
                  'Checkout'
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
} 