import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleNav,
  toggleSpinner,
  toggleBreadcrumb,
  addBreadcrumbItems,
} from "./../../helper";
import axios from "./../../interceptor";
import history from "./../../History";
import categoryService from "../../services/category.service";
import placeService from "../../services/place.service";

const NewPlace = () => {
  const [regions, setRegions] = useState([
    {
      key: "fed",
      value: "Federal",
    },
    {
      key: "pu",
      value: "Punjab",
    },
    {
      key: "sd",
      value: "Sindh",
    },
    {
      key: "bl",
      value: "Balouchistan",
    },
    {
      key: "kp",
      value: "KPK",
    },
    {
      key: "gt",
      value: "Gilgit",
    },
    {
      key: "kh",
      value: "Kashmir",
    },
  ]);
  const [categories, setCategories] = useState([]);
  const [showDelModal, setShowDelModal] = useState({
    show: false,
    id: null,
    name: "",
  });
  const handleClose = () => setShowDelModal({ ...showDelModal, show: false });
  const loadCategories = async () => {
    const categories = await categoryService.getCategories();
    setCategories(categories);
    toggleSpinner(dispatch, false);
  };
  const dispatch = useDispatch();
  const [gallery, setGallery] = useState([uuidv4()]);

  const submitForm = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    const response = await placeService.savePlace(formData);
    history.push("/places");
  };

  useEffect(() => {
    loadCategories();
    addBreadcrumbItems(dispatch, [
      { text: "Home", url: "/" },
      { text: "New Place", url: "/places/new" },
    ]);
    toggleBreadcrumb(dispatch, true);
    //toggleNav(dispatch, true);
  }, []);

  return (
    <>
      <Form onSubmit={submitForm}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" type="text" placeholder="Enter Name ..." />
          {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            rows={3}
            placeholder="Enter Description ..."
          />
          {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control name="category" as="select">
            {categories.map((x) => (
              <option value={x._id}>{x.name}</option>
            ))}
          </Form.Control>
          {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
        </Form.Group>

        <Form.Group controlId="region">
          <Form.Label>Region</Form.Label>
          <Form.Control name="region" as="select">
            {regions.map((x) => (
              <option value={x.key}>{x.value}</option>
            ))}
          </Form.Control>
          {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
        </Form.Group>

        <Form.Group controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            name="location"
            type="text"
            placeholder="Enter Location ..."
          />
          {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
        </Form.Group>

        <Form.Group controlId="attachments">
          <Form.Label>Gallery</Form.Label>
          <div className="galleryContainer">
            <Form.Control
              name="attachments"
              className="galleryImage"
              type="file"
              placeholder="Add Image file ..."
              multiple="multiple"
            />
          </div>
          {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
        </Form.Group>

        {/* <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default NewPlace;
