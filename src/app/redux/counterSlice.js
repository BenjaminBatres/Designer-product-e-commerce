import { createSlice } from "@reduxjs/toolkit";

const initialState = { totalQuantity: 0 };

export const counterSlice = createSlice({
  name: "counter",
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);
      // state.items.push(action.payload)
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
    },

    increaseQuantity(state, action) {
      const id = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) item.quantity += 1;
    },

    decreaseQuantity(state, action) {
      const id = action.payload;
      const item = state.items.find(i => i.id === id);

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // optional: remove item if quantity reaches 0
        state.items = state.items.filter(i => i.id !== id);
      }
    },

    updateCartQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existing = state.items.find(i => i.id === id);
      if (existing) {
        existing.quantity = quantity;
      }
    },

    updateCartSize: (state, action) => {
      const {id, size} = action.payload;
      const existing = state.items.find(i => i.id === id) ;
        if (existing) {
          existing.existing = size
        }
      },
    
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    }

  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, updateCartQuantity, increaseQuantity, decreaseQuantity } =
  counterSlice.actions;

export default counterSlice.reducer;
