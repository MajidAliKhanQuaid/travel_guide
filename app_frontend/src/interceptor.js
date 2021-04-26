import axios from "axios";
import $ from "jquery";
import authService from "./authService";
import history from "./History";

const instance = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });
const DEBUG = process.env.NODE_ENV === "development";
instance.interceptors.request.use(
  (request) => {
    /** In dev, intercepts request and logs it into console for dev */
    console.log("AuthService ", request.url);
    const AUTH_TOKEN = authService.getJwtToken();

    if (AUTH_TOKEN) {
      // Alter defaults after instance has been created
      if (DEBUG) {
        // console.log("set the header");
        //console.log(`Bearer ${AUTH_TOKEN}`)
      }
      // alert('here')
      request.headers.common["Authorization"] = `Bearer ${AUTH_TOKEN}`;
    }
    // if (request.url.includes('AdvancedFilteredData')) {
    //     console.log('loading for filter data')
    //     $('.loading').show();
    // }
    if (DEBUG) {
      //  console.info("✉️ request's config", request);
    }
    return request;
  },
  (error) => {
    if (true) {
      console.error("✉️ request", error);
    }
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (DEBUG) {
      //console.info("✉️ in response success block");
      ///console.info("✉️ response", response);
    }

    return response;
  },
  (error) => {
    if (DEBUG) {
      console.info("✉️ in response error block");
      console.info("✉️ response", error.response);
    }
    console.log(error);
    const originalRequest = error.config;
    if (error.response) {
      const responseHeaders = error.response.headers;

      if (DEBUG) {
        console.log("Is Authenticate :", responseHeaders);
      }
      if (
        error.response.status === 401 &&
        responseHeaders["www-authenticate"].includes("invalid_token")
      ) {
        if (DEBUG) {
          //alert("log out called from 2")
          console.log("log out called from auth-header, due to 401");
        }
        authService.logout();
        history.push("/login");
        //error.response.data.message = "You are unauthorized!";
        /// return error.response;

        $(".loading").hide();
        return Promise.reject();
      }

      if (
        error.response.status === 404 &&
        originalRequest.url.includes("/api/Account/Refresh")
      ) {
        if (DEBUG) {
          // alert("log out called from 404 account refresh")
          console.log(error.response.message);
          console.log("log out called becoz 404. ");
        }
        // authService.logoutAuthO();
        //history.push("/login");
        $(".loading").hide();
        return Promise.reject();
        //return error.response;
      }

      if (
        error.response.status === 401 &&
        responseHeaders["token-expired"] === "true" &&
        !originalRequest._retry
      ) {
        if (DEBUG) {
          console.log("refresh called!");
        }

        originalRequest._retry = true;

        return instance
          .get(
            "/api/Account/Refresh?refresh_token=" +
              authService.getRefreshToken()
          )
          .then((jsonRefreshResponse) => {
            if (jsonRefreshResponse.status === 200) {
              // 0) Check If token Updated Already
              if (
                !jsonRefreshResponse.data.status &&
                !jsonRefreshResponse.data.status === "AlreadyRefreshed"
              ) {
                // 1) put token to LocalStorage
                authService.saveJwtToken(jsonRefreshResponse.data.token);
                authService.saveRefreshToken(
                  jsonRefreshResponse.data.refreshToken
                );
              }

              // 2) Change Authorization header

              const newAccessToken = authService.getJwtToken();
              //instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
              setAuthHeader(newAccessToken);

              if (DEBUG) {
                console.log(
                  "Updated the Bearer header " +
                    axios.defaults.headers.common["Authorization"]
                );
                console.log("New access token is:" + authService.getJwtToken());
              }

              // 3) return originalRequest object with Axios.
              error.response.config.headers[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;

              return axios(error.response.config);
            }
          })
          .catch((err) => {
            console.warn(err);
          })
          .finally();
      }

      //$('.modal-backdrop').hide();
      // $('.loading').hide();
    }
    if (error.config) {
      console.log(error.config);
      return Promise.reject();
    }
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.response.data);
  }
);
export const setAuthHeader = (token) => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default instance;
