import { createSlice } from '@reduxjs/toolkit';
import { apiEndpoints } from '../../utils/api';

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  retryCount: 0,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.error = null;
      state.retryCount = 0;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    incrementRetryCount: (state) => {
      state.retryCount += 1;
    },
    resetRetryCount: (state) => {
      state.retryCount = 0;
    },
  },
});

export const {
  setProducts,
  setSelectedProduct,
  setLoading,
  setError,
  incrementRetryCount,
  resetRetryCount,
} = productSlice.actions;

// Thunks
export const fetchProducts = () => async (dispatch, getState) => {
  const { retryCount } = getState().products;
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000;

  try {
    dispatch(setLoading(true));
    const response = await apiEndpoints.getProducts();
    dispatch(setProducts(response.data));
    if (response.data.length > 0) {
      dispatch(setSelectedProduct(response.data[0]._id));
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    
    if (retryCount < MAX_RETRIES) {
      dispatch(setError(`Failed to load products. Retrying... (${retryCount + 1}/${MAX_RETRIES})`));
      setTimeout(() => {
        dispatch(incrementRetryCount());
      }, RETRY_DELAY);
    } else {
      dispatch(setError('Failed to load products. Please try again later or refresh the page.'));
    }
  } finally {
    dispatch(setLoading(false));
  }
};

export default productSlice.reducer; 