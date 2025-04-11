import { createSlice } from '@reduxjs/toolkit';
import { apiEndpoints } from '../../utils/api';

const initialState = {
  generatedImages: [],
  libraryImages: [],
  loading: false,
  error: null,
  isGenerating: false,
  retryCount: 0,
};

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setGeneratedImages: (state, action) => {
      state.generatedImages = action.payload;
      state.error = null;
      state.retryCount = 0;
    },
    setLibraryImages: (state, action) => {
      state.libraryImages = action.payload;
      state.error = null;
      state.retryCount = 0;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsGenerating: (state, action) => {
      state.isGenerating = action.payload;
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
  setGeneratedImages,
  setLibraryImages,
  setLoading,
  setError,
  setIsGenerating,
  incrementRetryCount,
  resetRetryCount,
} = imageSlice.actions;

// Thunks
export const generateImages = (data) => async (dispatch) => {
  try {
    dispatch(setIsGenerating(true));
    const response = await apiEndpoints.generateImage(data);
    dispatch(setGeneratedImages(response.data));
  } catch (error) {
    console.error('Error generating images:', error);
    dispatch(setError(error.message));
  } finally {
    dispatch(setIsGenerating(false));
  }
};

export const fetchLibraryImages = () => async (dispatch, getState) => {
  const { retryCount } = getState().images;
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000;

  try {
    dispatch(setLoading(true));
    const response = await apiEndpoints.getPreGeneratedImages();
    dispatch(setLibraryImages(response.data));
  } catch (error) {
    console.error('Error fetching library images:', error);
    
    if (retryCount < MAX_RETRIES) {
      dispatch(setError(`Failed to load images. Retrying... (${retryCount + 1}/${MAX_RETRIES})`));
      setTimeout(() => {
        dispatch(incrementRetryCount());
      }, RETRY_DELAY);
    } else {
      dispatch(setError('Failed to load images. Please try again later or refresh the page.'));
    }
  } finally {
    dispatch(setLoading(false));
  }
};

export default imageSlice.reducer; 