const CartAction = {
  set: (newCart) => {
    return {
      type: "SET",
      payload: newCart,
    };
  },
};

export default CartAction;
