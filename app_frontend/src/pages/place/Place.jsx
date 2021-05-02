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

import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import axios from "./../../interceptor";
const Place = () => {
  const { identifier } = useParams();
  const [place, setPlace] = useState({ images: [] });
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    class: "success",
  });
  const [dp, setDp] = useState("");
  // const paths = [
  //   "https://images.unsplash.com/photo-1611580338398-2a63a34c61f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
  //   "https://images.unsplash.com/photo-1607455849506-2b56d8d9c2c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=667&q=80",
  //   "https://images.unsplash.com/photo-1581983055134-6f93a59450ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80",
  // ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "TOGGLE_SPINNER",
      payload: true,
    });
    axios
      .get(`/places/get?id=${identifier}`)
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

        dispatch({
          type: "TOGGLE_SPINNER",
          payload: false,
        });
      })
      .catch((err) => {
        dispatch({
          type: "TOGGLE_SPINNER",
          payload: false,
        });
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
        dispatch({
          type: "TOGGLE_SPINNER",
          payload: false,
        });
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
        dispatch({
          type: "TOGGLE_SPINNER",
          payload: false,
        });
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
      </Container>
    </>
  );
};

export default Place;
