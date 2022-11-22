const CartAction = {
  add: (item) => {
    return {
      type: "ADD",
      payload: item,
    };
  },
  remove: (itemID) => {
    return {
      type: "REMOVE",
      payload: itemID,
    };
  },
};

export default CartAction;
