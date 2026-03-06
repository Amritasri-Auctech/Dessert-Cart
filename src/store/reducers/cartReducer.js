import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QTY, CLEAR_CART } from "../actionTypes";

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };
    }

    case REMOVE_FROM_CART:
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) };

    case UPDATE_QTY:
      return {
        ...state,
        items: state.items
          .map((i) => i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i)
          .filter((i) => i.qty > 0),
      };

    case CLEAR_CART:
      return { ...state, items: [] };

    default:
      return state;
  }
};

export default cartReducer;