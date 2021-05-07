import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "./../../interceptor";
import { Card, Modal, Pagination, Button, Container } from "react-bootstrap";
import { toggleSpinner } from "./../../helper";
import { Link } from "react-router-dom";
const ListCulturals = () => {
  const [showDelModal, setShowDelModal] = useState({ show: false, id: null });
  const [culturals, setculturals] = useState([]);
  const dispatch = useDispatch();
  const handleClose = () => setShowDelModal({ ...showDelModal, show: false });
  const handleDelete = () => {
    toggleSpinner(dispatch, true);
    axios
      .post(`/culturals/delete?id=${showDelModal.id}`)
      .then(function ({ data }) {
        loadculturals();
        handleClose();
      })
      .catch(function (response) {
        toggleSpinner(dispatch, false);
      });
  };
  const handleShow = () => setShowDelModal({ ...showDelModal, show: true });

  const loadculturals = () => {
    toggleSpinner(dispatch, true);
    axios
      .get("/culturals")
      .then(function ({ data }) {
        setculturals(data);
        toggleSpinner(dispatch, false);
      })
      .catch(function (response) {
        toggleSpinner(dispatch, false);
      });
  };

  useEffect(() => {
    loadculturals();
  }, []);

  if (culturals.length == 0)
    return (
      <Container>
        <Link
          to="/culturals/new"
          className="btn btn-success float-right"
          style={{ margin: "20px 0px" }}
        >
          New Cultural
        </Link>
        <h1>No culturals saved !</h1>
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
            Are you sure you want to delete Cultural `{showDelModal.name}` ?
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
          to="/culturals/new"
          className="btn btn-success float-right"
          style={{ margin: "20px 0px" }}
        >
          New Cultural
        </Link>
        <h1>List of culturals</h1>
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
          {culturals.map((x, y) => (
            // <Card style={{ width: "20rem", flexGrow: "1" }}>
            <Card style={{ flex: "0 1 30%", margin: "1.6%" }} key={x._id}>
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
                  {/*Card Subtitle*/}
                </Card.Subtitle>
                <Card.Text
                  style={{
                    textOverflow: "ellipsis",
                    wordWrap: "break-word",
                    overflow: "hidden",
                  }}
                >
                  {x.description}
                </Card.Text>
                <Link to={"/culturals/" + x._id} className="card-link">
                  View
                </Link>
                <Link to={"/culturals/edit/" + x._id} className="card-link">
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
export default ListCulturals;
