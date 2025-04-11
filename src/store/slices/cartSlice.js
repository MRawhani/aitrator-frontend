import { createSlice } from '@reduxjs/toolkit';
import { apiEndpoints } from '../../utils/api';

const initialState = {
  items: [],
  loading: false,
  error: null,
  checkoutStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  retryCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
      state.error = null;
      state.retryCount = 0;
    },
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCheckoutStatus: (state, action) => {
      state.checkoutStatus = action.payload;
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
  setCartItems,
  addToCart,
  removeFromCart,
  clearCart,
  setLoading,
  setError,
  setCheckoutStatus,
  incrementRetryCount,
  resetRetryCount,
} = cartSlice.actions;

// Thunks
export const fetchCartItems = () => async (dispatch, getState) => {
  const { retryCount } = getState().cart;
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000;

  try {
    dispatch(setLoading(true));
    const response = await apiEndpoints.getCart();
    dispatch(setCartItems(response.data));
  } catch (error) {
    console.error('Error fetching cart items:', error);
    
    if (retryCount < MAX_RETRIES) {
      dispatch(setError(`Failed to load cart. Retrying... (${retryCount + 1}/${MAX_RETRIES})`));
      setTimeout(() => {
        dispatch(incrementRetryCount());
      }, RETRY_DELAY);
    } else {
      dispatch(setError('Failed to load cart. Please try again later or refresh the page.'));
    }
  } finally {
    dispatch(setLoading(false));
  }
};

export const addItemToCart = (item) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await apiEndpoints.addToCart(item);
    console.log(item);
    dispatch(addToCart(item));
  } catch (error) {
    debugger
    console.error('Error adding to cart:', error);
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const checkoutCart = () => async (dispatch, getState) => {
  try {
    dispatch(setCheckoutStatus('loading'));
    const { items } = getState().cart;
    const response = await apiEndpoints.createOrder({ cart: items });
    if (response.data.success) {
      dispatch(clearCart());
      dispatch(setCheckoutStatus('succeeded'));
    } else {
      dispatch(setCheckoutStatus('failed'));
    }
  } catch (error) {
    console.error('Error during checkout:', error);
    dispatch(setError(error.message));
    dispatch(setCheckoutStatus('failed'));
  }
};

export default cartSlice.reducer; 