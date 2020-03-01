import thunk from "redux-thunk";
import rootReducer from "./reducers";
import promise from "redux-promise-middleware";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const middleware = applyMiddleware(thunk, promise);
const enhancer = composeWithDevTools(middleware);
const persistConfig = {
  key: "garahub",
  storage
  // stateReconciler: hardSet
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, enhancer);
  let persistor = persistStore(store);
  return { store, persistor };
};
