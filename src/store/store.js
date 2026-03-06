import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

const store = createStore(
  rootReducer,
  // Redux DevTools Extension support
  window.__REDUX_DEVTOOLS_EXTENSION__?.()
);

export default store;