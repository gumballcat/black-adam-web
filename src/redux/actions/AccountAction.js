const AccountAction = {
  login: (profile) => {
    return {
      type: "LOGIN",
      payload: profile,
    };
  },
  logout: () => {
    return {
      type: "LOGOUT",
    };
  },
};

export default AccountAction;
