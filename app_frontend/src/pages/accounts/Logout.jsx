import { useDispatch, useSelector } from "react-redux";
import history from "./../../History";
import authService from "./../../authService";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";
const Logout = () => {
  const user = useSelector((x) => x.userState.user);
  const dispatch = useDispatch();
  useEffect(() => {
    authService.clearLocalStorage();
    if (user) {
      dispatch({ type: "USER_UPDATED", payload: null });
      dispatch({ type: "USER_INFO_UPDATED", payload: null });
    }
  }, []);
  return <Redirect to="/" />;
};
export default Logout;
