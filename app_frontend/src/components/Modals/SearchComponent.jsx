import {
  Carousel,
  CarouselItem,
  Nav,
  Navbar,
  NavbarBrand,
  NavDropdown,
  Form,
  FormControl,
  Spinner,
  Modal,
  Breadcrumb,
  Button,
  Container,
} from "react-bootstrap";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SearchComponent = ({ display, searchClick, dismissClick }) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  return (
    <Modal className="searchModal" show={display}>
      {/* <Modal.Header closeButton>
      <Modal.Title>Delete</Modal.Title>
    </Modal.Header> */}
      <Modal.Body>
        <Container>
          <h1>Search</h1>
          <Form>
            <Form.Group controlId="searchTerm">
              <Form.Label>Search</Form.Label>
              <Form.Control
                name="searchTerm"
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Enter Search Term ..."
              />
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>
          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={dismissClick}>
          Dismiss
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            dispatch({ type: "SEARCH_TEXT", payload: searchText });
            searchClick();
          }}
        >
          Search
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SearchComponent;
