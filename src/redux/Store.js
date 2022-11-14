import { configureStore } from "@reduxjs/toolkit";
import AccountReducer from "redux/reducers/AccountReducer";

const Store = configureStore({
  reducer: {
    accountReducers: AccountReducer,
  },
});

export default Store;
