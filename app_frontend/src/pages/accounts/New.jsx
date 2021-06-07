import { Container, Form, Button } from "react-bootstrap";
import axios from "./../../interceptor";
import history from "./../../History";
import { useEffect } from "react";

import {
  toggleSpinner,
  addBreadcrumbItems,
  toggleBreadcrumb,
  toggleNav,
} from "./../../helper";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";

const NewAccount = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const submitForm = (event) => {
    event.preventDefault();

    // converting `form data` to json
    var object = {};
    const formData = new FormData(event.target);
    formData.forEach((value, key) => (object[key] = value));

    axios
      .post("/account/create", object)
      .then(function (response) {
        history.push("/accounts");
      })
      .catch(function (response) {});
  };

  useEffect(() => {
    addBreadcrumbItems(dispatch, [
      { text: "Home", url: "/" },
      { text: "New Account", url: location.pathname },
    ]);
    toggleBreadcrumb(dispatch, true);
    toggleNav(dispatch, true);
  }, []);

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
      </Container>
    </>
  );
};

export default NewAccount;
