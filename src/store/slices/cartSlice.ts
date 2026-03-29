import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

type CartItem = any;

interface CartState {
  isCartOpen: boolean;
  cartItems: CartItem[];
}

const initialState: CartState = {
  isCartOpen: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart(state, action: PayloadAction<any>) {
      state.isCartOpen = action.payload;
    },

    addItem(state, action: PayloadAction<any>) {
      const newItemId = action.payload.id;

      const existingItem = state.cartItems.find(
        (item: any) => item.id === newItemId
      );

      toast.success("Add item card")

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },

    removeItem(state, action: PayloadAction<any>) {
      state.cartItems = state.cartItems.filter(
        (item: any) => item.id !== action.payload
      );
    },

    incrementItem(state, action: PayloadAction<any>) {
      state.cartItems = state.cartItems.map((item: any) => {
        if (item.id === action.payload) {
          item.quantity++;
        }
        return item;
      });
    },

    decrementItem(state, action: PayloadAction<any>) {
      state.cartItems = state.cartItems
        .map((item: any) => {
          if (item.id === action.payload) {
            item.quantity--;
          }
          return item;
        })
        .filter((item: any) => item.quantity !== 0);
    },
  },
});

export const {
  toggleCart,
  addItem,
  removeItem,
  incrementItem,
  decrementItem,
} = cartSlice.actions;

export default cartSlice.reducer;