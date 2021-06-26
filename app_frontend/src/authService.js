import authaxios from "./interceptor";

class AuthService {
  constructor() {
    // this.login = this.login.bind(this);
    // this.setToken = this.setToken.bind(this);
    // this.getToken = this.getToken.bind(this);
    // this.logout = this.logout.bind(this);
    // this.clearLocalStorage = this.clearLocalStorage.bind(this);
    // this.getJwtToken = this.getJwtToken.bind(this);
    // this.getRefreshToken = this.getRefreshToken.bind(this);
    // this.saveJwtToken = this.saveJwtToken.bind(this);
    // this.saveRefreshToken = this.saveRefreshToken.bind(this);
  }

  _checkStatus() {
    return authaxios
      .post("/verifytoken")
      .then(({ data }) => {
        console.log("_checkStatus ", data);
        return Promise.resolve(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  login(username, password) {
    return authaxios
      .post("/login", {
        Username: username,
        Password: password,
      })
      .then(({ data }) => {
        if (data.isValid && data.token) {
          this.setToken(data);
          // localStorage.setItem("user", "loggedas" + username);
          return Promise.resolve(data);
        } else {
          return Promise.resolve(data);
        }
      })
      .catch(function (error) {
        console.log("Promise broken");
        return Promise.reject(error);
      });
  }

  facebookLogin(fbResponse) {
    return authaxios
      .post("/account/auth/facebook", fbResponse)
      .then(({ data }) => {
        if (data.success && data.token) {
          this.setToken(data);
          // localStorage.setItem("user", "loggedas" + username);
          return Promise.resolve(data);
        } else {
          return Promise.resolve(data);
        }
      })
      .catch(function (error) {
        console.log("Promise broken");
        return Promise.reject(error);
      });
  }

  setToken(res) {
    console.log(res);
    // sessionStorage.setItem("activeSession", "true");
    // localStorage.setItem("userInfo", JSON.stringify(res.userInfo));
    // localStorage.setItem("user", "loggedas" + res.userInfo.username);
    // localStorage.setItem(
    //   "memberpermissions",
    //   JSON.stringify(res.memberPermissions)
    // );
    // localStorage.setItem("ownpermissions", JSON.stringify(res.ownPermissions));
    // localStorage.setItem(
    //   "scopepermissions",
    //   JSON.stringify(res.scopePermissions)
    // );
    localStorage.setItem("token", res.token);
    // localStorage.setItem("scopeaccess", JSON.stringify(res.scopeAccess));
    localStorage.setItem("refreshToken", res.refreshToken);
    //   localStorage.setItem("logout-event", "logout" + Math.random());
  }

  getToken() {
    return {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
    };
  }

  logout() {
    console.log("logout called from auth service.");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    localStorage.removeItem("memberpermissions");
    localStorage.removeItem("memberdetailpermissions");
    localStorage.removeItem("ownpermissions");
    localStorage.removeItem("scopepermissions");
    //localStorage.removeItem("refreshToken");
    //localStorage.setItem("logout-event", "logout" + Math.random());
    //localStorage.removeItem("logout-event");
    localStorage.clear();
    sessionStorage.clear();
  }

  clearLocalStorage() {
    console.log("logout called from auth service.");
    localStorage.removeItem("userInfo");
    //localStorage.removeItem("token");
    localStorage.removeItem("memberpermissions");
    localStorage.removeItem("memberdetailpermissions");
    localStorage.removeItem("ownpermissions");
    localStorage.removeItem("scopepermissions");
    localStorage.removeItem("refreshToken");
    //localStorage.setItem("logout-event", "logout" + Math.random());
    //localStorage.removeItem("logout-event");
    localStorage.removeItem("token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");

    sessionStorage.clear();
  }

  getJwtToken() {
    return localStorage.getItem("token");
  }

  getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }

  saveJwtToken(token) {
    localStorage.removeItem("token");
    localStorage.setItem("token", token);
  }

  saveRefreshToken(refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }
}
export default new AuthService();
