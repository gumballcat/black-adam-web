import ENDPOINTS from "common/ENDPOINTS";
import HELPER from "common/HELPER";

async function login(username, password) {
  var params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);

  return HELPER.HTTP.executePostForm(ENDPOINTS.LOGIN, params);
}

const AuthenticationService = {
  login,
};

export default AuthenticationService;
