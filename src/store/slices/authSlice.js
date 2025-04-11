import { createSlice } from '@reduxjs/toolkit';
import { apiEndpoints } from '../../utils/api';

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const {
  setUser,
  setToken,
  setLoading,
  setError,
  logout,
} = authSlice.actions;

// Thunks
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await apiEndpoints.login(credentials);
    dispatch(setUser(response.data.user));
    dispatch(setToken(response.data.token));
    localStorage.setItem('token', response.data.token);
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await apiEndpoints.register(userData);
    dispatch(setUser(response.data.user));
    dispatch(setToken(response.data.token));
    localStorage.setItem('token', response.data.token);
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const checkAuth = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setLoading(true));
      const response = await apiEndpoints.getUserProfile();
      dispatch(setUser(response.data));
      dispatch(setToken(token));
    }
  } catch (error) {
    dispatch(logout());
    localStorage.removeItem('token');
  } finally {
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer; 