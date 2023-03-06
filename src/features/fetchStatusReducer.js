import { createSlice } from '@reduxjs/toolkit';

export const fetchStatusSlice = createSlice({
  name: 'fetchStatus',
  initialState:{
    isLoading: false,
    fetchError: null,
  },
  
  reducers: {
    setIsLoading:(state, action) => {
      state.isLoading = action.payload
    },

    setFetchError:(state, action) => {
      state.fetchError = action.payload
    },
  }
});

export const { setIsLoading, setFetchError } = fetchStatusSlice.actions;
export const selectIsLoading = (state) => state.fetchStatus.isLoading;
export const selectFetchError = (state) => state.fetchStatus.fetchError;
export default fetchStatusSlice.reducer;
