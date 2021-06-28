import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import authService from "./../authService";
import jwt_decode from "jwt-decode";
import AdminHome from "../pages/homepages/AdminHome";
import TouristHome from "../pages/homepages/TouristHome";

const ProtectedRoute = ({
  successComponent: SuccessComponent,
  failureComponent: FailureComponent,
  user: user,
  condition,
  rolesAllowed,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          // var decoded = jwt_decode(user.token);
          // console.log("#### DECODED", decoded);
          // if (decoded.roles && decoded.roles.indexOf("") - 1) {
          //   return <TouristHome />;
          // } else {
          //   return <AdminHome />;
          // }
          // alert(decoded);
          // alert(JSON.stringify(user));
          // if (
          //   rolesAllowed &&
          //   rolesAllowed.length > 0 &&
          //   rolesAllowed.filter((x) => user.roles.indexOf(x) > -1).length == 0
          // ) {
          //   return <NotAllowed />;
          // }
          return <SuccessComponent {...rest} {...props} />;
        } else {
          return <FailureComponent {...rest} {...props} />;
        }
      }}
    />
  );
};

const NotAllowed = () => {
  return <h1>Hello</h1>;
};

export default ProtectedRoute;
