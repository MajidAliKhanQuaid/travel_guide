import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import $ from "jquery";
import axios from "./../../interceptor";
const NewFood = () => {
  const [gallery, setGallery] = useState([uuidv4()]);
  const submitForm = (event) => {
    event.preventDefault();
    // console.log($(event.target));
    const formData = new FormData(event.target);
    // console.log(formData);
    // const form = document.querySelector("form");
    // const data = new URLSearchParams(new FormData(form).entries());
    // console.log(data);
    // let formData = $("form").serialize();
    // console.log(formData);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    axios({
      method: "post",
      url: "/foods/save",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };
  return (
    <>
      <Container>
        <Form onSubmit={submitForm}>
          <Form.Group controlId="txtName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="txtName"
              type="text"
              placeholder="Enter Name ..."
            />
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>

          <Form.Group controlId="txtLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              name="txtLocation"
              type="text"
              placeholder="Enter Location ..."
            />
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>

          <Form.Group controlId="imagesField">
            <Form.Label>Gallery</Form.Label>
            <div className="galleryContainer">
              <Form.Control
                name="imagesField"
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
      </Container>
    </>
  );
};

export default NewFood;
