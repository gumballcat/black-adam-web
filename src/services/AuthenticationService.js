import ENDPOINTS from "common/ENDPOINTS";
import HELPER from "common/HELPER";

async function login(username, password) {
  return HELPER.HTTP.executePost(ENDPOINTS.LOGIN, {
    username: username,
    password: password,
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

async function getProfile(token) {
  return HELPER.HTTP.executeGet(ENDPOINTS.GET_PROFILE, {
    headers: { Authorization: "Bearer " + token },
  });
}

const AuthenticationService = {
  login,
  logout,
  signUp,
  getProfile,
};

export default AuthenticationService;
