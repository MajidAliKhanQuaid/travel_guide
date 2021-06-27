import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "popper.js";
import store from "./redux/store";
import { Provider } from "react-redux";
import {
  Router,
  Switch,
  Route,
  useParams,
  Redirect,
  Link,
} from "react-router-dom";
import { useLocation } from "react-router";
import history from "./History";

ReactDOM.render(
  <Provider store={store}>
    {/* Router is added here, to use useLocation you need to have <Router> tag in
    parent, wanted to use useLocation in App.js .. But wasn't allowed so did this
    */}
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
