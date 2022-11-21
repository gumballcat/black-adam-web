const AccountReducer = (state = { auth: 0, info: {} }, action) => {
  switch (action.type) {
    case "LOGIN": // Login
      return {
        info: action.payload,
        auth: 1,
        cart: [{ id: "1", name: "Portable", price: 1231 }, { id: "1", name: "Mimsy", price: 588 }],
      };
    case "LOGOUT": // Logout
      return {
        info: {},
        auth: 0,
      };
    default:
      return state;
  }
};

export default AccountReducer;
