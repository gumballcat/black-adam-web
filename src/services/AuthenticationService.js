import ENDPOINTS from "common/ENDPOINTS";
import HELPER from "common/HELPER";

async function login(username, password) {
  HELPER.HTTP.executePost(ENDPOINTS.LOGIN, {
    username: username,
    password: password,
  }).then((response) => {
    return {
      token: response.header.authorization,
      profile: response.data.content,
    };
  });
}

async function logout() {
  return HELPER.HTTP.executePost(ENDPOINTS.LOGOUT);
}

async function signUp(username, password, email) {
  return HELPER.HTTP.executePost(ENDPOINTS.SIGN_UP, {
    username: username,
    password: password,
    email: email,
    name: "string",
    address: { city: "string" },
  });
}

async function getProfile() {
  return HELPER.HTTP.executeGet(ENDPOINTS.GET_PROFILE);
}

const AuthenticationService = {
  login,
  logout,
  signUp,
  getProfile,
};

export default AuthenticationService;
