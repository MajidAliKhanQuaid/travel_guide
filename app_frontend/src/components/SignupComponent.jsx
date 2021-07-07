import { useEffect, useState } from "react";
import { Container, Button, Form, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import history from "../History";
import { Alert } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import accountService from "./../services/account.service";
import {
  toggleNav,
  toggleSpinner,
  toggleBreadcrumb,
  addBreadcrumbItems,
} from "./../helper";

const SignupComponent = () => {
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
      if (response.result) {
        dispatch({
          type: "USER_UPDATED",
          payload: { token: response.token, isLoggedIn: true },
        });
        const info = await accountService.info();
        if (info) {
          dispatch({
            type: "USER_INFO_UPDATED",
            payload: { name: info.name },
          });
          localStorage.setItem("userInfo", JSON.stringify(info));
          toggleSpinner(dispatch, false);
          history.push("/");
        }
        toggleSpinner(dispatch, false);
        history.push("/");
      } else {
        setLoginAlert({
          show: true,
          text: response.message,
          class: "danger",
        });
        toggleSpinner(dispatch, false);
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
      <Card
        className="glass"
        style={{
          border: "none",
        }}
      >
        <Card.Body>
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
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>

            <Button className="float-right" variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
export default SignupComponent;
