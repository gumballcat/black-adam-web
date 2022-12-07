import ENVS from "./ENVS";

const BASE_ENDPOINT = ENVS.BASE_ENDPOINT;
const BASE_IMAGE_ENDPOINT = ENVS.BASE_IMAGE_ENDPOINT;

const ENDPOINTS = {
  SIGN_UP: `${BASE_ENDPOINT}users/sign-up`,
  GET_LATEST_PRODUCTS: `${BASE_ENDPOINT}product`,
  GET_MEN_PRODUCTS: `${BASE_ENDPOINT}product`,
  GET_WOMEN_PRODUCTS: `${BASE_ENDPOINT}product`,
  GET_KIDS_PRODUCTS: `${BASE_ENDPOINT}product`,
  GET_ACCESSORIES_PRODUCTS: `${BASE_ENDPOINT}product`,
  GET_PRODUCT: (productID) => `${BASE_ENDPOINT}product/${productID}`,
  LOGIN: `${BASE_ENDPOINT}auth/login`,
  ADD_PRODUCT: `${BASE_ENDPOINT}product`,
  UPDATE_PRODUCT: (productID) => `${BASE_ENDPOINT}product/${productID}`,
  DELETE_PRODUCT: (productID) => `${BASE_ENDPOINT}product/${productID}`,
  GET_ORDERS: `${BASE_ENDPOINT}order`,
  GET_USER_ORDERS: (userID) => `${BASE_ENDPOINT}users/${userID}/get-orders`,
  ADD_ORDER: `${BASE_ENDPOINT}order`,
  GET_PROFILE: `${BASE_ENDPOINT}users/current-login-user`,
  ADD_CART_ITEM: `${BASE_ENDPOINT}cart`,
  REMOVE_CART_ITEM: `${BASE_ENDPOINT}cart`,
  GET_CART: (userID) => `${BASE_ENDPOINT}users/${userID}/get-cart`,
  UPLOAD_IMAGE: BASE_IMAGE_ENDPOINT,
  CHANGE_PASSWORD: `${BASE_ENDPOINT}users/change-password`,
};

export default ENDPOINTS;
