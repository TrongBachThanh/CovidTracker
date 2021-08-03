import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false
};

const loadingSlice = createSlice({
  name: 'Loading Page',
  initialState: initialState,
  reducers: {
    toggleLoading(state, action) {
      state.loading = action.payload;
    }
  }
});

const { actions, reducer } = loadingSlice;
export const { toggleLoading } = actions;
export default reducer;
