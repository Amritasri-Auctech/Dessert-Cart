import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QTY,
  CLEAR_CART,
  SET_USER,
  LOGOUT,
} from "./actionTypes";

// ─── CART ACTIONS ─────────────────────────────────────────────────────────────
export const addToCart     = (item)            => ({ type: ADD_TO_CART,      payload: item });
export const removeFromCart = (id)             => ({ type: REMOVE_FROM_CART, payload: id   });
export const updateQty     = (id, qty)         => ({ type: UPDATE_QTY,       payload: { id, qty } });
export const clearCart     = ()                => ({ type: CLEAR_CART });

// ─── AUTH ACTIONS ─────────────────────────────────────────────────────────────
export const setUser = (user) => ({ type: SET_USER, payload: user });
export const logout  = ()     => ({ type: LOGOUT });