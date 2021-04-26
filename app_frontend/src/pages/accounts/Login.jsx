import { useEffect, useState } from "react";
import { Container, Button, Form, Card } from "react-bootstrap";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import authService from "./../../authService";
import axios from "./../../interceptor";
import history from "./../../History";
import { toggleNav, toggleSpinner } from "./../../helper";
import { Alert } from "react-bootstrap";
const Login = () => {
  const dispatch = useDispatch();

  const loggedInUser = useSelector((x) => x.userState.user);
  const [loginAlert, setLoginAlert] = useState({
    text: "",
    show: true,
    class: "light",
  });

  useEffect(() => {
    if (loggedInUser) {
      history.push("/");
      return;
    }
    toggleNav(dispatch, false);
  }, []);

  const [loginState, setState] = useState({
    username: "usernadiakhan@gmail.com",
    password: "12345",
    payload: null,
  });

  function submitForm(event) {
    event.preventDefault();
    console.log("Fired button click event");
    const formData = new FormData(event.target);
    const username = document.getElementById("txtUsername").value;
    const password = document.getElementById("txtPassword").value;

    toggleSpinner(dispatch, true);

    authService
      .login(username, password)
      .then((loginData) => {
        console.log("Login ", loginData);
        if (loginData) {
          if (loginData.isValid) {
            dispatch({
              type: "USER_UPDATED",
              payload: { token: loginData.token, isLoggedIn: true },
            });
            axios
              .get("/account/info")
              .then(({ data }) => {
                localStorage.setItem("userInfo", JSON.stringify(data));
                dispatch({
                  type: "USER_INFO_UPDATED",
                  payload: data,
                });
                toggleSpinner(dispatch, false);
                // redirects to `/` page
                history.push("/");
              })
              .catch((err) => {
                toggleSpinner(dispatch, false);
                // redirects to `/` page
                history.push("/");
              });
          } else {
            setLoginAlert({
              show: true,
              text: "Failed to Login \nPlease enter valid credenetials",
              class: "danger",
            });
          }
        }
      })
      .catch((err) => {
        setLoginAlert({
          show: true,
          text: "Failed due to system error, please try again",
          class: "danger",
        });
        toggleSpinner(dispatch, false);
      });
  }

  const handleLogin = async (googleData) => {
    const res = await fetch("/accounts/auth/google", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // store returned user somehow
    console.log("Google Result", data);
  };

  return (
    <>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5vh",
        }}
      >
        <div style={{ height: "100px", width: "100px" }}>
          <img src="logo192.png" style={{ height: "100%", width: "100%" }} />
        </div>
        <Card
          style={{
            border: "none",
            width: "50vw",
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
              <Form.Group controlId="txtUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="txtUsername"
                  type="text"
                  value="usernadiakhan@gmail.com"
                  placeholder="Enter Username ..."
                />
                {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
              </Form.Group>

              <Form.Group controlId="txtPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="txtPassword"
                  type="password"
                  value="12345"
                  placeholder="Enter Password ..."
                />
                {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                style={{ float: "right" }}
              >
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleLogin}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </>
  );
};
export default Login;
