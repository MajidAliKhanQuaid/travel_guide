import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "./../../interceptor";
import history from "./../../History";
import { useEffect, useState } from "react";

import {
  toggleSpinner,
  addBreadcrumbItems,
  toggleBreadcrumb,
  toggleNav,
} from "./../../helper";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";

const NewCategory = () => {
  const [alert, setAlert] = useState({
    show: false,
    class: "danger",
    text: "",
  });
  const location = useLocation();
  const dispatch = useDispatch();
  const submitForm = (event) => {
    event.preventDefault();

    // converting `form data` to json
    var object = {};
    const formData = new FormData(event.target);
    formData.forEach((value, key) => (object[key] = value));

    axios
      .post("/category/create", object)
      .then(function ({ data }) {
        if (data.success) {
          setAlert({
            ...alert,
            show: true,
            text: "New category created",
            class: "success",
          });
          history.push("/categories");
        } else {
          setAlert({
            ...alert,
            show: true,
            text: data.message,
            class: "danger",
          });
        }
      })
      .catch(function (response) {});
  };

  useEffect(() => {
    addBreadcrumbItems(dispatch, [
      { text: "Home", url: "/" },
      { text: "Categories", url: location.pathname },
    ]);
    toggleBreadcrumb(dispatch, true);
    //toggleNav(dispatch, true);
  }, []);

  return (
    <>
      <Alert
        show={alert.show}
        onClose={() => setAlert({ ...alert, show: false })}
        dismissible
        variant={alert.class}
      >
        {alert.text}
      </Alert>

      <Form onSubmit={submitForm}>
        <Form.Group controlId="name">
          <Form.Label>Category</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter Category ..."
          />
          {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default NewCategory;
