import { useEffect, useState } from "react";
import { Container, Button, Form, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import authService from "./../../authService";
import axios from "./../../interceptor";
import history from "./../../History";
import { toggleNav, toggleSpinner } from "./../../helper";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
const SignUp = () => {
  const submitForm = (event) => {
    event.preventDefault();

    // converting `form data` to json
    var object = {};
    const formData = new FormData(event.target);
    formData.forEach((value, key) => (object[key] = value));

    axios
      .post("/account/create", object)
      .then(function (response) {
        history.push("/login");
      })
      .catch(function (response) {});
  };

  return (
    <>
      <Container>
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

          <Form.Group controlId="firstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="firstname"
              type="text"
              placeholder="Enter First Name ..."
            />
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>

          <Form.Group controlId="lastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="lastname"
              type="text"
              placeholder="Enter Last Name ..."
            />
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
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
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
