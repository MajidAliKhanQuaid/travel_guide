import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleNav,
  toggleSpinner,
  toggleBreadcrumb,
  addBreadcrumbItems,
} from "./../../helper";
import axios from "./../../interceptor";
import { Card, Modal, Pagination, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const ListPlaces = () => {
  const [showDelModal, setShowDelModal] = useState({ show: false, id: null });
  const [places, setPlaces] = useState([]);
  const dispatch = useDispatch();
  const handleClose = () => setShowDelModal({ ...showDelModal, show: false });
  const handleDelete = () => {
    toggleSpinner(dispatch, true);
    axios
      .post(`/places/delete?id=${showDelModal.id}`)
      .then(function ({ data }) {
        loadPlaces();
        handleClose();
      })
      .catch(function (response) {
        toggleSpinner(dispatch, false);
      });
  };
  const handleShow = () => setShowDelModal({ ...showDelModal, show: true });

  const loadPlaces = () => {
    toggleSpinner(dispatch, true);
    axios
      .get("/places")
      .then(function ({ data }) {
        setPlaces(data);
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
    toggleNav(dispatch, true);

    loadPlaces();
  }, []);

  if (places.length == 0)
    return (
      <Container>
        <Link
          to="/places/new"
          className="btn btn-success float-right"
          style={{ margin: "20px 0px" }}
        >
          New Place
        </Link>
        <h1>No places saved !</h1>
      </Container>
    );

  return (
    <>
      <Container>
        <Modal show={showDelModal.show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete place `{showDelModal.name}` ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button variant="primary" onClick={handleDelete}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
        <Link
          to="/places/new"
          className="btn btn-success float-right"
          style={{ margin: "20px 0px" }}
        >
          New Place
        </Link>
        <h1>List of Places</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexFlow: "flex-wrap",
            flexWrap: "wrap",
            justifyContent: "left",
            marginTop: "50px",
          }}
        >
          {places.map((x, y) => (
            // <Card style={{ width: "20rem", flexGrow: "1" }}>
            <Card
              style={{
                flex: "0 1 30%",
                margin: "1.6%",
              }}
              key={x._id}
            >
              <Card.Img
                variant="top"
                src={
                  x.images.length > 0
                    ? "http://localhost:4000/uploads/" + x.images[0]
                    : ""
                }
              />
              <Card.Body>
                <Card.Title>{x.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle>
                <Card.Text>{x.description}</Card.Text>
                <Link to={"/places/" + x._id} className="card-link">
                  View
                </Link>
                <Link to={"/places/edit/" + x._id} className="card-link">
                  Edit
                </Link>
                <Card.Link
                  className="card-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowDelModal({ id: x._id, show: true, name: x.name });
                  }}
                >
                  Delete
                </Card.Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
};
export default ListPlaces;
