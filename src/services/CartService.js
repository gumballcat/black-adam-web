import ENDPOINTS from "common/ENDPOINTS";
import HELPER from "common/HELPER";

const setItem = (token, itemID, quantity) => {
  return HELPER.HTTP.executePost(ENDPOINTS.ADD_CART_ITEM, {
    body: { productId: itemID, quantity: quantity },
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

const getCart = (token, userID) => {
  console.log(token, userID);
  return HELPER.HTTP.executeGet(ENDPOINTS.GET_CART(userID), {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const CartService = {
  setItem,
  getCart,
};

export default CartService;
