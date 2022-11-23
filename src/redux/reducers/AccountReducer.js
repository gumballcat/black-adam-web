const AccountReducer = (
  state = { auth: 0, profile: {}, token: "" },
  action
) => {
  switch (action.type) {
    case "LOGIN": // Login
      return {
        profile: action.payload.profile,
        token: action.payload.token,
        auth: 1,
      };
    case "LOGOUT": // Logout
      return {
        profile: {},
        token: "",
        auth: 0,
      };
    default:
      return state;
  }
};

export default AccountReducer;
