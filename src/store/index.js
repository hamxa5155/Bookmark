
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer, autoRehydrate } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'

// Reducers imported
import { supportChatsReducer } from "./supportChats/reducers";
import { authReducer } from "./auth/reducers";
import { booksReducer } from "./books/reducers";
import { cartReducer } from "./cart/reducers";
import { orderReducer } from "./orders/reducers";
import { notificationReducer } from "./notifications/reducers";
import { profileReducer } from "./profile/reducers";
import { aboutUsReducer } from "./aboutUs/reducer";

const rootReducer = combineReducers({
  supportChats: supportChatsReducer,
  auth: authReducer,
  books: booksReducer,
  cart: cartReducer,
  orders: orderReducer,
  notifications: notificationReducer,
  profile: profileReducer,
  aboutUsReducer: aboutUsReducer,
});
// // Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method
  storage,
  // Merge two-levels deep.
  stateReconciler: autoMergeLevel2,
  // Whitelist (Save Specific Reducers)
  whitelist: ["auth"],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [],
};
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);
  let store = createStore(persistedReducer, composeWithDevTools(middleWareEnhancer))
  let persistor = persistStore(store)
  return { store, persistor }
}