import ENDPOINTS from "common/ENDPOINTS";
import HELPER from "common/HELPER";

const addItem = (itemID, quantity) => {
  return HELPER.HTTP.executePost(ENDPOINTS.ADD_CART_ITEM, {
    productId: itemID,
    quantity: quantity,
  });
};

const removeItem = (itemID) => {
  return HELPER.HTTP.executeDelete(ENDPOINTS.REMOVE_CART_ITEM, itemID);
};

const CartService = {
  addItem,
  removeItem,
};

export default CartService;
