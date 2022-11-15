const AccountReducer = (state = { auth: 2, info: {} }, action) => {
  switch (action.type) {
    case 1: // Login
      console.log(1);
      return {
        info: action.payload,
        auth: 1,
      };
    case 2: // Logout
      console.log(2);
      return {
        info: {},
        auth: 2,
      };
    default:
      return state;
  }
};

export default AccountReducer;
