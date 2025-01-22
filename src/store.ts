import { createStore, createEvent } from "effector";
import { Product, CartItem } from "./types";

const addToCart = createEvent<CartItem>();
const removeFromCart = createEvent<string>();
const increaseQuantity = createEvent<string>();
const decreaseQuantity = createEvent<string>();
const setProducts = createEvent<Product[]>();

const $cart = createStore<CartItem[]>([])
  .on(addToCart, (state, item) => {
    const existingItem = state.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      return state.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem,
      );
    }
    return [...state, { ...item, quantity: 1 }];
  })
  .on(increaseQuantity, (state, id) => {
    return state.map((cartItem) =>
      cartItem.id === id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem,
    );
  })
  .on(decreaseQuantity, (state, id) => {
    return state.map((cartItem) =>
      cartItem.id === id && cartItem.quantity > 1
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem,
    );
  })
  .on(removeFromCart, (state, id) => {
    return state.filter((cartItem) => cartItem.id !== id);
  });

const $products = createStore<Product[]>([]).on(
  setProducts,
  (_, products) => products,
);

export const store = {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setProducts,
  $cart,
  $products,
};
