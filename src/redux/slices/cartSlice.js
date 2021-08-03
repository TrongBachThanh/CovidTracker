const { createSlice } = require('@reduxjs/toolkit');

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: []
  },
  reducers: {
    setInitialValue(state, action) {
      state.cartItems = action.payload;
    },
    addToCart(state, action) {
      const newItem = action.payload;
      const index = state.cartItems.findIndex(drink => drink.idDrink === newItem.idDrink);
      if (index >= 0) {
        state.cartItems[index].quantity += newItem.quantity;
      } else {
        state.cartItems.push(newItem);
      }
    },
    updateDrinkQuantity(state, action) {
      const { drinkId, quantity } = action.payload;
      const index = state.cartItems.findIndex(drink => drink.idDrink === drinkId);
      if (index >= 0) {
        state.cartItems[index].quantity = quantity;
      }
    },
    removeFromCart(state, action) {
      const idNeedToRemove = action.payload;
      state.cartItems = state.cartItems.filter(drink => drink.idDrink !== idNeedToRemove);
    },
    refreshCarteFromCart(state, action) {
      state.cartItems = [];
    }
  }
});

const { actions, reducer } = cartSlice;
export { actions as CartAction, reducer as CartReducer };
