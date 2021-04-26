import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "./../../interceptor";
import history from "./../../History";
import { Container, Form, Button, Figure } from "react-bootstrap";
const EditMosque = () => {
  const { identifier } = useParams();
  const [mosque, setMosque] = useState({ name: "", location: "", images: [] });
  useEffect(() => {
    axios
      .get(`/mosques/get?id=${identifier}`)
      .then(function ({ data }) {
        //handle success
        console.log(data);
        setMosque(data);
        console.log(data);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }, []);

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
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    axios({
      method: "post",
      url: "/mosques/update",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
        history.push(["/mosques"]);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  const imageRemoveContainer = (x) => {
    return (
      <>
        <Button>x</Button>
        <Figure style={{ margin: "10px 10px 0px 0px" }}>
          <Figure.Image
            style={{ height: "80px", width: "100px" }}
            alt={"http://localhost:4000/uploads/" + x}
            src={"http://localhost:4000/uploads/" + x}
          />
        </Figure>
      </>
    );
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
              value={mosque.name}
              onChange={(e) => {
                setMosque({ ...mosque, name: e.target.value });
              }}
              placeholder="Enter Name ..."
            />
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>

          <Form.Group controlId="txtDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="txtDescription"
              as="textarea"
              rows={3}
              value={mosque.description}
              placeholder="Enter Description ..."
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
              value={mosque.location}
              onChange={(e) => {
                setMosque({ ...mosque, location: e.target.value });
              }}
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
              {mosque.images.map((x) => (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ position: "absolute" }}>
                    <Button
                      style={{
                        position: "relative",
                        fontSize: "10px",
                        padding: "5px 10px",
                        borderRadius: "50%",
                        left: "85px",
                        top: "-5px",
                      }}
                    >
                      x
                    </Button>
                  </div>

                  <Figure style={{ margin: "10px 10px 0px 0px" }}>
                    <Figure.Image
                      style={{ height: "80px", width: "100px" }}
                      alt={"http://localhost:4000/uploads/" + x}
                      src={"http://localhost:4000/uploads/" + x}
                    />
                  </Figure>
                </div>
              ))}
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

export default EditMosque;
