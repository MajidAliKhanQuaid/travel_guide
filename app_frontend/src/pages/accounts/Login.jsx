import { useEffect, useState } from "react";
import { Container, Button, Form, Card } from "react-bootstrap";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { useDispatch, useSelector } from "react-redux";
import authService from "./../../authService";
import history from "./../../History";
import {
  toggleNav,
  toggleSpinner,
  toggleBreadcrumb,
  addCategories,
} from "./../../helper";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import accountService from "./../../services/account.service";
import categoryService from "./../../services/category.service";

const Login = () => {
  const dispatch = useDispatch();

  // const loggedInUser = useSelector((x) => x.userState.user);
  const [loginAlert, setLoginAlert] = useState({
    text: "",
    show: false,
    class: "light",
  });

  useEffect(() => {
    toggleBreadcrumb(dispatch, false);
    //toggleNav(dispatch, false);
    if (localStorage.getItem("token")) {
      history.push("/");
      return;
    }
  }, []);

  // const [loginState, setState] = useState({
  //   username: "",
  //   password: "",
  //   payload: null,
  // });

  const submitForm = async (event) => {
    event.preventDefault();
    console.log("Fired button click event");
    const formData = new FormData(event.target);
    const username = document.getElementById("txtUsername").value;
    const password = document.getElementById("txtPassword").value;

    toggleSpinner(dispatch, true);
    const loginResult = await accountService.login(username, password);
    if (loginResult.result) {
      dispatch({
        type: "USER_UPDATED",
        payload: { token: loginResult.token, isLoggedIn: true },
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
        text: loginResult.message,
        class: "danger",
      });
      toggleSpinner(dispatch, false);
    }
  };

  async function handleFacebookLogin(fbResponse) {
    console.log("*************** FB RESPONSE *************** ");
    if (fbResponse.accessToken) {
      try {
        const payload = await authService.facebookLogin(fbResponse);
        if (payload) {
          await dispatch({
            type: "USER_UPDATED",
            payload: { token: payload.token, isLoggedIn: true },
          });
          localStorage.setItem("userInfo", JSON.stringify(payload.user));
          await dispatch({
            type: "USER_INFO_UPDATED",
            payload: payload.user,
          });
          toggleSpinner(dispatch, false);

          history.push("/");
        }
        toggleSpinner(dispatch, false);
      } catch (error) {
        toggleSpinner(dispatch, false);
      }
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
        <div style={{ height: "200px", width: "200px" }}>
          <img src="logo.png" style={{ height: "100%", width: "100%" }} />
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
          autoLoad={false}
          fields="name,email,picture"
          scope="public_profile,email"
          callback={handleFacebookLogin}
        />

        {/* <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Log in with Google"
          onSuccess={handleGoogleLogin}
          onFailure={handleGoogleLogin}
          cookiePolicy={"single_host_origin"}
        /> */}
      </div>
    </>
  );
};
export default Login;
