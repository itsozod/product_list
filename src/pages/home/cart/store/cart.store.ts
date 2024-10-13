import { create } from "zustand";

export type CartItem = {
  id: number;
  name: string;
  img: string;
  title: string;
  price: number;
  quantity: number;
};

type Cart = {
  cart: CartItem[];
  setCart: (value: CartItem[]) => void;
  addToCart: (value: CartItem) => void;
};

export const useCartStore = create<Cart>()((set) => ({
  cart: [],
  setCart: (cartItems) => set((state) => ({ cart: (state.cart = cartItems) })),
  addToCart: (value) => set((state) => ({ cart: [...state.cart, value] })),
}));
