import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "./../../interceptor";
import { Card, Modal, Pagination, Button, Container } from "react-bootstrap";
import { toggleSpinner } from "./../../helper";
import { Link } from "react-router-dom";
const ListMosques = () => {
  const [showDelModal, setShowDelModal] = useState({ show: false, id: null });
  const [mosques, setMosques] = useState([]);
  const dispatch = useDispatch();
  const handleClose = () => setShowDelModal({ ...showDelModal, show: false });
  const handleDelete = () => {
    toggleSpinner(dispatch, true);
    axios
      .post(`/mosques/delete?id=${showDelModal.id}`)
      .then(function ({ data }) {
        loadMosques();
        loadMosques();
        handleClose();
      })
      .catch(function (response) {
        toggleSpinner(dispatch, false);
      });
  };
  const handleShow = () => setShowDelModal({ ...showDelModal, show: true });

  const loadMosques = () => {
    toggleSpinner(dispatch, true);
    axios
      .get("/mosques")
      .then(function ({ data }) {
        setMosques(data);
        toggleSpinner(dispatch, false);
      })
      .catch(function (response) {
        toggleSpinner(dispatch, false);
      });
  };

  useEffect(() => {
    loadMosques();
  }, []);

  const pagination = (pageNumber, pageSize, totalPages, totalRecords) => {
    if (totalRecords === 0) {
      return <></>;
    }
    return (
      <Pagination>
        <Pagination.First onClick={() => {}} />
        {[...Array(1)].map(() => {
          if (pageNumber > 1) {
            return <Pagination.Prev key={-1} onClick={() => {}} />;
          }
          return <></>;
        })}
        {/* <Pagination.Item>{1}</Pagination.Item> */}
        {/* <Pagination.Ellipsis /> */}

        {[...Array(totalPages > 5 ? 5 : totalPages)].map((x, i) => {
          let base = pageNumber % 5 === 0 ? pageNumber : 0;
          let num = base + i + 1;
          if (pageNumber === num) {
            return <Pagination.Item onClick={() => {}}>{num}</Pagination.Item>;
          } else {
            return (
              <Pagination.Item key={num}>
                {num} onClick={() => {}}
              </Pagination.Item>
            );
          }
        })}
        {/* <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item>{11}</Pagination.Item>
        <Pagination.Item active>{12}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Item disabled>{14}</Pagination.Item> */}
        {/* <Pagination.Ellipsis /> */}
        {/* <Pagination.Item>{20}</Pagination.Item> */}
        <Pagination.Next onClick={() => {}} />
        <Pagination.Last onClick={() => {}} />
      </Pagination>
    );
  };

  if (mosques.length == 0)
    return (
      <Container>
        <Link
          to="/mosques/new"
          className="btn btn-success float-right"
          style={{ margin: "20px 0px" }}
        >
          New Mosque
        </Link>
        <h1>No mosques saved !</h1>
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
            Are you sure you want to delete mosque `{showDelModal.name}` ?
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
          to="/mosques/new"
          className="btn btn-success float-right"
          style={{ margin: "20px 0px" }}
        >
          New Mosque
        </Link>
        <h1>List of Mosques</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexFlow: "flex-wrap",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          {mosques.map((x, y) => (
            // <Card style={{ width: "20rem", flexGrow: "1" }}>
            <Card style={{ width: "20rem" }}>
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
                <Link to={"/mosques/" + x._id} className="card-link">
                  View
                </Link>
                <Link to={"/mosques/edit/" + x._id} className="card-link">
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
      {/* {pagination(3, 12, 100, 1)} */}
    </>
  );
};
export default ListMosques;
