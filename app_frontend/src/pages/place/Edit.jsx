import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "./../../interceptor";
import history from "./../../History";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleNav,
  toggleSpinner,
  toggleBreadcrumb,
  addBreadcrumbItems,
} from "./../../helper";
import { Container, Form, Button, Figure } from "react-bootstrap";
import { regions } from "./../../conts";
import placeService from "../../services/place.service";

const EditPlace = () => {
  const [categories, setCategories] = useState([]);
  const { identifier } = useParams();
  const dispatch = useDispatch();

  const [place, setPlace] = useState({ name: "", location: "", images: [] });
  const loadCategories = () => {
    return axios
      .get("/category")
      .then(function ({ data }) {
        setCategories(data);
        toggleSpinner(dispatch, false);
      })
      .catch(function (response) {
        toggleSpinner(dispatch, false);
      });
  };
  useEffect(() => {
    addBreadcrumbItems(dispatch, [
      { text: "Home", url: "/" },
      { text: "Places", url: "/places" },
    ]);
    toggleBreadcrumb(dispatch, true);
    //toggleNav(dispatch, true);

    axios
      .get(`/places/get?id=${identifier}`)
      .then(function ({ data }) {
        loadCategories();
        //handle success
        console.log(data);
        setPlace(data);
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
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    axios({
      url: "/places/update",
      method: "post",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
        history.push("/places");
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  const imageRemoveContainer = (x) => {
    return (
      <>
        <Button
          onClick={() => {
            // delete x
            console.log("TEST");
          }}
        >
          x
        </Button>
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
      <Form onSubmit={submitForm}>
        <input type="hidden" name="_id" value={place._id} />
        <Form.Group controlId="txtName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            value={place.name}
            onChange={(e) => {
              setPlace({ ...place, name: e.target.value });
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
            name="description"
            as="textarea"
            rows={3}
            value={place.description}
            onChange={(e) => {
              setPlace({ ...place, description: e.target.value });
            }}
            placeholder="Enter Description ..."
          />
          {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            name="category"
            as="select"
            value={place.category}
            onChange={(e) => {
              setPlace({ ...place, category: e.target.value });
            }}
          >
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
          <Form.Control
            name="region"
            as="select"
            value={place.region}
            onChange={(e) => {
              setPlace({ ...place, region: e.target.value });
            }}
          >
            {regions.map((x) => (
              <option value={x.key}>{x.text}</option>
            ))}
          </Form.Control>
          {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
        </Form.Group>

        <Form.Group controlId="txtLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control
            name="location"
            type="text"
            value={place.location}
            onChange={(e) => {
              setPlace({ ...place, location: e.target.value });
            }}
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
            {place.images.map((imageName) => (
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
                    onClick={async () => {
                      // alert x
                      const response = await placeService.deletePic(
                        place._id,
                        imageName
                      );
                      // const response = await axios.post(`/places/deletepic`, {
                      //   identifier: place._id,
                      //   image: imageName,
                      // });
                      if (response.data.success) {
                        setPlace({
                          ...place,
                          images: place.images.filter((x) => x != imageName),
                        });
                        alert("Image has been deleted");
                      } else {
                        alert("Image could not be deleted");
                      }
                    }}
                  >
                    x
                  </Button>
                </div>

                <Figure style={{ margin: "10px 10px 0px 0px" }}>
                  <Figure.Image
                    style={{ height: "80px", width: "100px" }}
                    alt={`${process.env.REACT_APP_API_BASE_URL}/uploads/${imageName}`}
                    src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${imageName}`}
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
    </>
  );
};

export default EditPlace;
