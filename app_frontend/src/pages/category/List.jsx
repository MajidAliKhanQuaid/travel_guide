import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Table, Button, Pagination, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

import jwt_decode from "jwt-decode";

import {
  toggleSpinner,
  addBreadcrumbItems,
  toggleBreadcrumb,
  toggleNav,
} from "./../../helper";
import { Link } from "react-router-dom";
import categoryService from "../../services/categoryservice";

const ListCategory = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [roles, setRoles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showDelModal, setShowDelModal] = useState({
    show: false,
    id: null,
    name: "",
  });
  const handleClose = () => setShowDelModal({ ...showDelModal, show: false });
  const handleDelete = () => {
    toggleSpinner(dispatch, true);
    loadCategories();
    handleClose();
  };

  const loadCategories = async () => {
    const categories = await categoryService.getCategories();
    setCategories(categories);
    toggleSpinner(dispatch, false);
  };

  useEffect(() => {
    addBreadcrumbItems(dispatch, [
      { text: "Home", url: "/" },
      { text: "Accounts", url: location.pathname },
    ]);

    toggleBreadcrumb(dispatch, true);
    loadCategories();

    const token = localStorage.getItem("token");
    if (token) {
      const tokenInfo = jwt_decode(token);
      const userRoles = tokenInfo.roles;
      setRoles(userRoles);
    }
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
      <Link
        to="/categories/new"
        className="btn btn-success float-right"
        style={{ margin: "20px 0px" }}
      >
        New Category
      </Link>

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
                {roles && (
                  <>
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
                  </>
                )}
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
    </>
  );
};

export default ListCategory;
