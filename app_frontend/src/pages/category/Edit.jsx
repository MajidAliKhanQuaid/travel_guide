import { Container, Form, Button } from "react-bootstrap";
import axios from "../../interceptor";
import history from "../../History";
import { useEffect, useState } from "react";

import {
  toggleSpinner,
  addBreadcrumbItems,
  toggleBreadcrumb,
  toggleNav,
} from "../../helper";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";

import categoryService from "../../services/category.service";
import { useParams } from "react-router";

const EditCategory = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { identifier } = useParams();
  const [category, setCategory] = useState({ name: "", _id: null });

  const submitForm = async (event) => {
    event.preventDefault();

    // converting `form data` to json
    var object = {};
    const formData = new FormData(event.target);
    formData.forEach((value, key) => (object[key] = value));

    const result = await categoryService.updateCategory(object);
    if (result.success) {
      history.push("/categories");
    }
  };

  useEffect(async () => {
    addBreadcrumbItems(dispatch, [
      { text: "Home", url: "/" },
      { text: "Categories", url: location.pathname },
    ]);
    toggleBreadcrumb(dispatch, true);
    //toggleNav(dispatch, true);

    const category = await categoryService.getCategory(identifier);
    setCategory(category);
  }, []);

  return (
    <>
      <Form onSubmit={submitForm}>
        <Form.Control name="_id" type="hidden" value={category._id} />
        <Form.Group controlId="name">
          <Form.Label>Category</Form.Label>
          <Form.Control
            name="name"
            type="text"
            value={category.name}
            onChange={(e) => {
              setCategory({ ...category, name: e.target.value });
            }}
            placeholder="Enter Category ..."
          />
          {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
        </Form.Group>

        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </>
  );
};

export default EditCategory;
