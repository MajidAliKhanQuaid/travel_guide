import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import authService from "./../authService";
const ProtectedRoute = ({
  successComponent: SuccessComponent,
  failureComponent: FailureComponent,
  condition,
  rolesAllowed,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (condition) {
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
