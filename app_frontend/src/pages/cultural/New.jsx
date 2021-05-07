import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import $ from "jquery";
import axios from "./../../interceptor";
import history from "./../../History";
const NewCultural = () => {
  const [gallery, setGallery] = useState([uuidv4()]);
  const submitForm = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    axios({
      method: "post",
      url: "/culturals/save",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        history.push("/culturals");
      })
      .catch(function (response) {});
  };
  return (
    <>
      <Container>
        <Form onSubmit={submitForm}>
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
      </Container>
    </>
  );
};

export default NewCultural;
