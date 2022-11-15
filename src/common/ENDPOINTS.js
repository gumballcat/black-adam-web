const BASE_ENDPOINT = "http://0.0.0.0:3001/api/v1/";

const ENDPOINTS = {
  GET_HOME_SECTIONS: BASE_ENDPOINT + "home-sections",
  GET_LATEST_PRODUCTS: BASE_ENDPOINT + "products",
  GET_MEN_PRODUCTS: BASE_ENDPOINT + "products/men",
  GET_WOMEN_PRODUCTS: BASE_ENDPOINT + "products/women",
  GET_KIDS_PRODUCTS: BASE_ENDPOINT + "products/kids",
  GET_ACCESSORIES_PRODUCTS: BASE_ENDPOINT + "products/accessories",
  GET_PRODUCT: BASE_ENDPOINT + "product",
  LOGIN: BASE_ENDPOINT + "login",
};

export default ENDPOINTS;
