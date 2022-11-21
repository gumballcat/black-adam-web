import ENDPOINTS from "common/ENDPOINTS";
import HELPER from "common/HELPER";

async function login(username, password) {
  var params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);

  return HELPER.HTTP.executePostForm(ENDPOINTS.LOGIN, params);
}

async function logout() {
  return HELPER.HTTP.executePost(ENDPOINTS.LOGOUT);
}

async function getProfile() {
  return HELPER.HTTP.executeGet(ENDPOINTS.GET_PROFILE);
}

const AuthenticationService = {
  login,
  logout,
  getProfile,
};

export default AuthenticationService;
