import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import authService from "./../authService";
import jwt_decode from "jwt-decode";
import AdminHome from "../pages/homepages/AdminHome";
import TouristHome from "../pages/homepages/TouristHome";
import TourGuideHome from "../pages/homepages/TourGuideHome";

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
          var decoded = jwt_decode(user.token);
          if (decoded.roles && decoded.roles.indexOf("admin") > -1) {
            return <AdminHome {...rest} {...props} />;
          } else if (decoded.roles && decoded.roles.indexOf("guide") > -1) {
            return <TourGuideHome {...rest} {...props} />;
          } else if (decoded.roles && decoded.roles.indexOf("tourist") > -1) {
            return <TouristHome {...rest} {...props} />;
          }
        }
        return <FailureComponent {...rest} {...props} />;
      }}
    />
  );
};

const NotAllowed = () => {
  return <h1>Hello</h1>;
};

export default ProtectedRoute;
