import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Figure,
  Accordion,
  Card,
  Button,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import {
  toggleNav,
  toggleSpinner,
  toggleBreadcrumb,
  addBreadcrumbItems,
} from "./../../helper";
import { useParams } from "react-router";
import axios from "./../../interceptor";
import TravelPackages from "../../components/TravelPackages";
const Place = () => {
  const { identifier } = useParams();
  const loggedInUser = useSelector((x) => x.userState.user);
  const [place, setPlace] = useState({ images: [] });
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    class: "success",
  });
  const [dp, setDp] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    addBreadcrumbItems(dispatch, [
      { text: "Home", url: "/" },
      { text: "Place", url: location.pathname },
    ]);
    toggleBreadcrumb(dispatch, true);
    toggleNav(dispatch, true);
    toggleSpinner(dispatch, true);

    axios
      .get(`/places/get?id=${identifier}&view=1`)
      .then(function ({ data }) {
        //handle success
        console.log(data);
        setPlace(data);
        if (data.images && data.images.length > 0) {
          setDp(
            `${process.env.REACT_APP_API_BASE_URL}/uploads/${data.images[0]}`
          );
        }
        console.log(data);

        toggleSpinner(dispatch, false);
      })
      .catch((err) => {
        toggleSpinner(dispatch, false);
      });
  }, []);

  const toggle = () => {
    let url = `/favourites/remove?identifier=${identifier}&category=place`;
    if (place.is_fav == false) {
      url = `/favourites/add?identifier=${identifier}&category=place`;
    }
    axios
      .get(url)
      .then(function ({ data }) {
        toggleSpinner(dispatch, false);
        if (data.added) {
          setAlert({
            ...alert,
            class: "success",
            show: true,
            message: "Place added to favourites",
          });
          setPlace({ ...place, is_fav: true });
        } else if (data.deleted) {
          setAlert({
            ...alert,
            class: "success",
            show: true,
            message: "Place removed from favourites",
          });
          setPlace({ ...place, is_fav: false });
        }
      })
      .catch((err) => {
        toggleSpinner(dispatch, false);
        setAlert({
          ...alert,
          class: "danger",
          show: true,
          message: "Please try again",
        });
      });
  };

  return (
    <>
      <Container>
        <Alert variant={alert.class} show={alert.show}>
          {alert.message}
        </Alert>
        <div className="row">
          <div className="col-sm-6">
            <Figure>
              <Figure.Image width={500} height={500} alt="171x180" src={dp} />
              <Figure.Caption>{place.name}</Figure.Caption>
            </Figure>
            <FontAwesomeIcon
              onClick={toggle}
              icon={faHeart}
              style={
                place.is_fav
                  ? {
                      fontSize: "50px",
                      color: "red",
                    }
                  : {
                      fontSize: "50px",
                      color: "black",
                    }
              }
            />
          </div>
          <div className="col-sm-6 map-container">
            <div
              style={{ height: "100%", width: "100%" }}
              dangerouslySetInnerHTML={{ __html: place.location }}
            />
          </div>
        </div>

        <div>
          {place.images.map((x) => (
            <Figure
              style={{ marginRight: "5px" }}
              onClick={(ev) => {
                console.log(ev.target.src);
                setDp(ev.target.src);
              }}
            >
              <Figure.Image
                width={100}
                height={100}
                alt="171x180"
                src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${x}`}
              />
            </Figure>
          ))}
        </div>

        <p>{place.description}</p>
        <TravelPackages isLoggedIn={loggedInUser} />
      </Container>
    </>
  );
};

export default Place;
