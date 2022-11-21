import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AccountReducer from "redux/reducers/AccountReducer";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';


const persistConfig = {
  key: 'root',
  storage
}

const reducers = combineReducers({
  account: AccountReducer
});

const persistedReducer = persistReducer(persistConfig, reducers)

export const Store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const Persistor = persistStore(Store);
