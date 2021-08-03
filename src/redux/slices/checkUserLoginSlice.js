import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false
};
const CheckUserLoginSlice = createSlice({
  name: 'checkUserLogin',
  initialState: initialState,
  reducers: {
    checkIsLogin: (state, action) => {
      state.isLogin = action.payload;
    }
  }
});
const { actions, reducer } = CheckUserLoginSlice;
export const { checkIsLogin } = actions;
export default reducer;
