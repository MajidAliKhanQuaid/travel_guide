import { useEffect, useState } from "react";
import { Container, Button, Form, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import history from "./../../History";
import { Alert } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import accountService from "../../services/accountservice";
import {
  toggleNav,
  toggleSpinner,
  toggleBreadcrumb,
  addBreadcrumbItems,
} from "./../../helper";

const SignUp = () => {
  const [loginAlert, setLoginAlert] = useState({
    text: "random text here",
    show: false,
    class: "danger",
  });
  const location = useLocation();
  const dispatch = useDispatch();

  const submitForm = async (event) => {
    event.preventDefault();

    // converting `form data` to json
    var rData = {};
    const formData = new FormData(event.target);
    formData.forEach((value, key) => (rData[key] = value));

    try {
      const response = await accountService.register(rData);
      if (response.success) {
        history.push("/login");
      } else {
        setLoginAlert({
          show: true,
          text: response.message,
          class: "danger",
        });
      }
    } catch (err) {
      setLoginAlert({
        show: true,
        text: "Failed due to system error, Please try again",
        class: "danger",
      });
    }
  };

  useEffect(() => {
    toggleBreadcrumb(dispatch, false);
    //toggleNav(dispatch, false);
  }, []);

  return (
    <>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "5vh",
        }}
      >
        <div style={{ height: "100px", width: "100px" }}>
          <img src="logo.png" style={{ height: "100%", width: "100%" }} />
        </div>

        <Alert
          show={loginAlert.show}
          onClose={() => setLoginAlert({ ...loginAlert, show: false })}
          dismissible
          variant={loginAlert.class}
        >
          {loginAlert.text}
        </Alert>

        <Form onSubmit={submitForm}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="Enter Username ..."
            />
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>

          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Enter Name ..."
            />
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>

          <Form.Group controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control name="role" as="select">
              <option value={1}>Tourist</option>
              <option value={2}>Guide</option>
            </Form.Control>
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Enter Password ..."
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <span>
          Don't have an account,&nbsp;
          <Link className="" to="/login">
            Login
          </Link>
        </span>
      </Container>
    </>
  );
};
export default SignUp;
