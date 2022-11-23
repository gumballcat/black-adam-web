const CartReducer = (
  state = { items: [], totalPrice: 0, totalItems: 0 },
  action
) => {
  if (action.type === "SET") {
    return {
      items: action.payload.items,
      totalPrice: action.payload.totalPrice,
      totalItems: action.payload.totalItems,
    };
  }
  return state;
};

export default CartReducer;
