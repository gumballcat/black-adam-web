const AccountReducer = (state = { auth: 0, info: {} }, action) => {
  switch (action.type) {
    case "LOGIN": // Login
      return {
        info: action.payload,
        auth: 1,
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
