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
const ListAccount = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [accounts, setAccouts] = useState([]);
  const [showDelModal, setShowDelModal] = useState({
    show: false,
    id: null,
    name: "",
  });
  const handleClose = () => setShowDelModal({ ...showDelModal, show: false });
  const handleDelete = () => {
    toggleSpinner(dispatch, true);
    axios
      .get(`/account/delete?id=${showDelModal.id}`)
      .then(function ({ data }) {
        loadAccounts();
        handleClose();
      })
      .catch(function (response) {
        toggleSpinner(dispatch, false);
      });
  };

  const loadAccounts = () => {
    return axios
      .get("/account")
      .then(function ({ data }) {
        setAccouts(data);
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
    loadAccounts();
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
        {/* <Link
          to="/accounts/new"
          className="btn btn-success float-right"
          style={{ margin: "20px 0px" }}
        >
          New User
        </Link> */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((x, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{x.firstname}</td>
                <td>{x.lastname}</td>
                <td>{x.username}</td>
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
                        name: x.username,
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

export default ListAccount;
