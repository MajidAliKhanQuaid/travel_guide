import { useEffect, useState } from "react";
import { Container, Button, Form, Card } from "react-bootstrap";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { useDispatch, useSelector } from "react-redux";
import authService from "./../../authService";
import axios from "./../../interceptor";
import history from "./../../History";
import { toggleNav, toggleSpinner } from "./../../helper";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
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
        if (loginData) {
          if (loginData.isValid) {
            dispatch({
              type: "USER_UPDATED",
              payload: { token: loginData.token, isLoggedIn: true },
            });
            axios
              .get("/account/info")
              .then(({ data }) => {
                if (data.isInvalid == false) {
                  localStorage.setItem("userInfo", JSON.stringify(data));
                  dispatch({
                    type: "USER_INFO_UPDATED",
                    payload: data,
                  });
                }
                toggleSpinner(dispatch, false);
                // redirects to `/` page
                history.push("/");
              })
              .catch((err) => {
                toggleSpinner(dispatch, false);

                // redirects to `/` page
                history.push("/");
                // setLoginAlert({
                //   show: true,
                //   text: "Failed due to system error, please try again",
                //   class: "danger",
                // });
              });
          } else {
            toggleSpinner(dispatch, false);
            setLoginAlert({
              show: true,
              text: "Failed to Login \nPlease enter valid credenetials",
              class: "danger",
            });
          }
        }
      })
      .catch((err) => {
        toggleSpinner(dispatch, false);
        setLoginAlert({
          show: true,
          text: "Failed due to system error, please try again",
          class: "danger",
        });
      });
  }

  async function handleFacebookLogin(fbResponse) {
    console.log("*************** FB RESPONSE *************** ");
    toggleSpinner(dispatch, true);
    if (fbResponse.accessToken) {
      const payload = await authService.facebookLogin(fbResponse);
      if (payload) {
        localStorage.setItem("userInfo", JSON.stringify(payload));
        await dispatch({
          type: "USER_UPDATED",
          payload: { token: payload.token, isLoggedIn: true },
        });
        await dispatch({
          type: "USER_INFO_UPDATED",
          payload: payload,
        });
        history.push("/");
      }
      toggleSpinner(dispatch, false);
    }
  }

  const handleGoogleLogin = async (googleData) => {
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
    //localStorage.setItem("userInfo", JSON.stringify(response.data));
    // dispatch({
    //   type: "USER_INFO_UPDATED",
    //   payload: response.data,
    // });
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
            <span>
              Don't have an account,&nbsp;
              <Link className="" to="/signup">
                register
              </Link>
            </span>
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
        <FacebookLogin
          appId="801007487499371"
          autoLoad={true}
          fields="name,email,picture"
          scope="public_profile,user_friends,email"
          callback={handleFacebookLogin}
        />

        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Log in with Google"
          onSuccess={handleGoogleLogin}
          onFailure={handleGoogleLogin}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </>
  );
};
export default Login;
