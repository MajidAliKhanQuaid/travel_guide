import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import {
  toggleSpinner,
  addBreadcrumbItems,
  toggleBreadcrumb,
  toggleNav,
} from "./../../helper";

const EditAccount = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    addBreadcrumbItems(dispatch, [
      { text: "Home", url: "/" },
      { text: "Edit Account", url: location.pathname },
    ]);
    toggleBreadcrumb(dispatch, true);
    toggleNav(dispatch, true);
  }, []);
  return (
    <>
      <div></div>
    </>
  );
};

export default EditAccount;
