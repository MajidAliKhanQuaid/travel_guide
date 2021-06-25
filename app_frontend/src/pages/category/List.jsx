import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Table, Button, Pagination, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "./../../interceptor";
import {
  toggleSpinner,
  addBreadcrumbItems,
  toggleBreadcrumb,
  toggleNav,
} from "./../../helper";
import { Link } from "react-router-dom";
const ListCategory = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [showDelModal, setShowDelModal] = useState({
    show: false,
    id: null,
    name: "",
  });
  const handleClose = () => setShowDelModal({ ...showDelModal, show: false });
  const handleDelete = () => {
    toggleSpinner(dispatch, true);
    axios
      .get(`/category/delete?id=${showDelModal.id}`)
      .then(function ({ data }) {
        loadCategories();
        handleClose();
      })
      .catch(function (response) {
        toggleSpinner(dispatch, false);
      });
  };

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
      { text: "Accounts", url: location.pathname },
    ]);
    toggleBreadcrumb(dispatch, true);
    toggleNav(dispatch, true);
    loadCategories();
  }, []);

  return (
    <>
      <Modal show={showDelModal.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete user `{showDelModal.name}` ?
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
      <Container>
        {
          <Link
            to="/categories/new"
            className="btn btn-success float-right"
            style={{ margin: "20px 0px" }}
          >
            New Category
          </Link> /* <Link
          to="/accounts/new"
          className="btn btn-success float-right"
          style={{ margin: "20px 0px" }}
        >
          New User
        </Link> */
        }
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>Added By</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((x, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{x.name}</td>
                <td>{x.createdBy}</td>
                <td>
                  <Button
                    className="float-right"
                    variant="danger"
                    style={{ marginLeft: "10px" }}
                    onClick={(e) => {
                      e.preventDefault();
                      setShowDelModal({
                        id: x._id,
                        show: true,
                        name: x.name,
                      });
                    }}
                  >
                    Delete
                  </Button>
                  <Button className="float-right" variant="success">
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Item>{11}</Pagination.Item>
          <Pagination.Item active>{12}</Pagination.Item>
          <Pagination.Item>{13}</Pagination.Item>
          <Pagination.Item disabled>{14}</Pagination.Item>

          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination> */}
      </Container>
    </>
  );
};

export default ListCategory;
