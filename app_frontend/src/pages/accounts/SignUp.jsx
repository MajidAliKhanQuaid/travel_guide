import { useEffect, useState } from "react";
import { Container, Button, Form, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import authService from "./../../authService";
import axios from "./../../interceptor";
import history from "./../../History";
import { Alert } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

import {
  toggleNav,
  toggleSpinner,
  toggleBreadcrumb,
  addBreadcrumbItems,
} from "./../../helper";

const SignUp = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const submitForm = (event) => {
    event.preventDefault();

    // converting `form data` to json
    var object = {};
    const formData = new FormData(event.target);
    formData.forEach((value, key) => (object[key] = value));

    axios
      .post("/account/register", object)
      .then(function (response) {
        history.push("/login");
      })
      .catch(function (response) {});
  };

  useEffect(() => {
    console.log("CHILDD");
    toggleBreadcrumb(dispatch, false);
    //toggleNav(dispatch, false);
  }, []);

  return (
    <>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "5vh",
        }}
      >
        <div style={{ height: "100px", width: "100px" }}>
          <img src="logo192.png" style={{ height: "100%", width: "100%" }} />
        </div>

        <Form onSubmit={submitForm}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="Enter Username ..."
            />
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>

          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Enter Name ..."
            />
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>

          <Form.Group controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control name="role" as="select">
              <option value={1}>Tourist</option>
              <option value={2}>Guide</option>
            </Form.Control>
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Enter Password ..."
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <span>
          Don't have an account,&nbsp;
          <Link className="" to="/login">
            Login
          </Link>
        </span>
      </Container>
    </>
  );
};
export default SignUp;
