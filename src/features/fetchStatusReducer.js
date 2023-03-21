import { createSlice } from '@reduxjs/toolkit';

export const fetchStatusSlice = createSlice({
  name: 'fetchStatus',
  initialState:{
    isLoading: false,
    fetchError: null,
    newVoteFinished: 0,
  },
  
  reducers: {
    setIsLoading:(state, action) => {
      state.isLoading = action.payload
    },

    setFetchError:(state, action) => {
      state.fetchError = action.payload
    },

    setNewVoteFinished:(state) => {
      state.newVoteFinished += 1
    },
  }
});

export const { setIsLoading, setFetchError, setNewVoteFinished } = fetchStatusSlice.actions;
export const selectIsLoading = (state) => state.fetchStatus.isLoading;
export const selectFetchError = (state) => state.fetchStatus.fetchError;
export const selectNewVoteFinished = (state) => state.fetchStatus.newVoteFinished;
export default fetchStatusSlice.reducer;
