import { configureStore } from "@reduxjs/toolkit";
import AccountReducer from "redux/reducers/AccountReducer";

const Store = configureStore({
  reducer: { account: AccountReducer },
});

export default Store;
