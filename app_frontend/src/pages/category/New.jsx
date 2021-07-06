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

const NewCategory = () => {
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
          history.push("/categories");
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
