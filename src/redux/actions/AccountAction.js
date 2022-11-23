const AccountAction = {
  login: (profile, token) => {
    return {
      type: "LOGIN",
      payload: { profile: profile, token: token },
    };
  },
  logout: () => {
    return {
      type: "LOGOUT",
    };
  },
};

export default AccountAction;
