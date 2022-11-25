const BASE_ENDPOINT = "http://localhost:3001/api/v1/";
const BASE = "http://localhost:8080/api/v1/";

const ENDPOINTS = {
  SIGN_UP: `${BASE}users/sign-up`,
  GET_LATEST_PRODUCTS: `${BASE}product`,
  GET_MEN_PRODUCTS: `${BASE}product`,
  GET_WOMEN_PRODUCTS: `${BASE}product`,
  GET_KIDS_PRODUCTS: `${BASE}product`,
  GET_ACCESSORIES_PRODUCTS: `${BASE}product`,
  GET_PRODUCT: (productID) => `${BASE}product/${productID}`,
  LOGIN: `${BASE}auth/login`,
  LOGOUT: BASE_ENDPOINT + "logout",
  ADD_PRODUCT: `${BASE}product`,
  UPDATE_PRODUCT: (productID) => `${BASE}product/${productID}`,
  DELETE_PRODUCT: (productID) => `${BASE}product/${productID}`,
  GET_ORDERS: BASE_ENDPOINT + "orders",
  GET_PROFILE: `${BASE}users/current-login-user`,
  ADD_CART_ITEM: `${BASE}cart`,
  REMOVE_CART_ITEM: `${BASE}cart`,
  GET_CART: (userID) => `${BASE}users/${userID}/get-cart`,
};

export default ENDPOINTS;
