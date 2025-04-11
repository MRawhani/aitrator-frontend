import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if it exists
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// API endpoints
export const apiEndpoints = {
  // Auth
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  
  // Products
  getProducts: () => api.get('/products'),
  getProduct: (id) => api.get(`/products/${id}`),
  
  // Library
  getPreGeneratedImages: () => api.get('/library'),
  
  // Generate
  generateImage: (data) => api.post('/generate', data),
  
  // Cart
  getCart: () => api.get('/cart'),
  addToCart: (data) => api.post('/cart', data),
  updateCartItem: (id, data) => api.put(`/cart/${id}`, data),
  removeFromCart: (id) => api.delete(`/cart/${id}`),
  
  // Checkout
  createOrder: (data) => api.post('/checkout', data),
};

export default api; 