'use client'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Layout from '../../components/Layout'
import ProductSelector from '../../components/ProductSelector'
import ImageGrid from '../../components/ImageGrid'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage'
import { fetchProducts, setSelectedProduct } from '../../store/slices/productSlice'
import { fetchLibraryImages } from '../../store/slices/imageSlice'
import { addItemToCart } from '../../store/slices/cartSlice'

export default function LibraryPage() {
  const dispatch = useDispatch();
  
  // Select state from Redux store
  const { 
    selectedProduct,
    loading: productsLoading, 
    error: productsError,
    retryCount: productsRetryCount 
  } = useSelector((state) => state.products);

  const { 
    loading: imagesLoading, 
    error: imagesError,
    retryCount: imagesRetryCount 
  } = useSelector((state) => state.images);

  const { error: cartError } = useSelector((state) => state.cart);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchLibraryImages());
  }, [dispatch]);

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
      debugger
      toast.success('Added to cart successfully!');
    } catch (error) {
      toast.error('Failed to add to cart. Please try again.');
    }
  };

  const handleProductSelect = (productId) => {
    console.log(productId);
    dispatch(setSelectedProduct(productId));
  };

  const handleRetry = () => {
    if (productsError) {
      dispatch(fetchProducts());
    }
    if (imagesError) {
      dispatch(fetchLibraryImages());
    }
  };

  // Show loading state if either products or images are loading
  if ((productsLoading || imagesLoading) && !productsError && !imagesError) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  // Show error state if either products or images have failed after max retries
  if ((productsError && productsRetryCount >= 3) || (imagesError && imagesRetryCount >= 3)) {
    return (
      <Layout>
        <ErrorMessage 
          message={productsError || imagesError}
          onRetry={handleRetry}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Image Library</h1>
        
        {(productsError || imagesError) && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-yellow-800">{productsError || imagesError}</p>
          </div>
        )}
        
        {cartError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
            <p className="text-red-800">{cartError}</p>
          </div>
        )}
        
        <ProductSelector onSelectProduct={handleProductSelect} />
        <ImageGrid selectedProduct={selectedProduct} onAddToCart={handleAddToCart} />
      </div>
    </Layout>
  );
}
