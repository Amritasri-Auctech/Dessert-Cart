// ─── CART SELECTORS ───────────────────────────────────────────────────────────
export const selectCartItems     = (state) => state.cart.items;
export const selectCartItemById  = (id) => (state) => state.cart.items.find((i) => i.id === id);
export const selectCartTotalQty  = (state) => state.cart.items.reduce((sum, i) => sum + i.qty, 0);
export const selectCartSubtotal  = (state) => state.cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);

// ─── AUTH SELECTORS ───────────────────────────────────────────────────────────
export const selectUser          = (state) => state.auth.user;
export const selectIsLoggedIn    = (state) => Boolean(state.auth.user);