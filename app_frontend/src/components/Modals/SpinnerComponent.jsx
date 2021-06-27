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

const SpinnerComponent = ({ busy }) => {
  return (
    <Modal className="busySpinner" show={busy}>
      {/* <Modal.Header closeButton>
      <Modal.Title>Delete</Modal.Title>
    </Modal.Header> */}
      <Modal.Body
        style={{
          border: "none",
        }}
      >
        <Spinner
          animation="border"
          role="status"
          style={
            !busy
              ? {
                  display: "none",
                  color: "white",
                  background: "transparent",
                }
              : { color: "white", background: "transparent" }
          }
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Modal.Body>
      {/* <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        No
      </Button>
      <Button variant="primary" onClick={handleClose}>
        Yes
      </Button>
    </Modal.Footer> */}
    </Modal>
  );
};

export default SpinnerComponent;
