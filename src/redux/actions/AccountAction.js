const AccountAction = {
  login: (profile) => {
    return {
      type: 1,
      payload: profile,
    };
  },
  logout: () => {
    return {
      type: 2,
    };
  },
};

export default AccountAction;
