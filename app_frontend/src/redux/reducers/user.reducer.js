import store from "./../store";
import axios from "./../../interceptor";
let initalState = {};
if (localStorage.getItem("token")) {
  initalState = {
    user: {
      token: localStorage.getItem("token"),
      roles: ["admin"],
      isLoggedIn: true,
    },
  };

  axios
    .get("/account/info")
    .then(({ data }) => {
      localStorage.setItem("userInfo", JSON.stringify(data));
      store.dispatch({
        type: "USER_INFO_UPDATED",
        payload: JSON.stringify(data),
      });
    })
    .catch((err) => {
      store.dispatch({
        type: "USER_INFO_UPDATED",
        payload: null,
      });
    });
}
export default function userReducer(state = initalState, action) {
  console.log("user.reducer  [state]", state, " [action] ", action);
  if (action.type === "USER_UPDATED") {
    const { payload } = action;
    console.log("--> user.reducer [payload] ", payload);
    return { ...state, user: payload };
  }

  if (action.type === "USER_INFO_UPDATED") {
    const { payload } = action;
    console.log("--> user.reducer [payload] ", payload);
    return { ...state, userInfo: payload };
  }

  return state;
}
