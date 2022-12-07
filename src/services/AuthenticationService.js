import ENDPOINTS from "common/ENDPOINTS";
import HELPER from "common/HELPER";

async function login(username, password) {
  return HELPER.HTTP.executePost(ENDPOINTS.LOGIN, {
    body: { username: username, password: password },
  });
}

async function logout() {
  return HELPER.HTTP.executePost(ENDPOINTS.LOGOUT);
}

async function signUp(name, username, password, email) {
  return HELPER.HTTP.executePost(ENDPOINTS.SIGN_UP, {
    body: {
      name,
      username,
      password,
      email,
    },
  });
}

async function changePassword(id, token, oldPassword, newPassword) {
  return HELPER.HTTP.executePut(ENDPOINTS.CHANGE_PASSWORD, {
    headers: { Authorization: "Bearer " + token },
    body: { id, oldPassword, password: newPassword },
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
  changePassword,
  getProfile,
};

export default AuthenticationService;
