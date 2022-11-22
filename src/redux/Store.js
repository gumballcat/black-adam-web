import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import AccountReducer from "redux/reducers/AccountReducer";
import CartReducer from "./reducers/CartReducer";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  account: AccountReducer,
  cart: CartReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const Store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const Persistor = persistStore(Store);
