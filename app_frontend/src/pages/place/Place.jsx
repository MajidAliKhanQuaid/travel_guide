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
import favService from "../../services/fav.service";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleNav,
  toggleSpinner,
  toggleBreadcrumb,
  addBreadcrumbItems,
} from "./../../helper";
import { useParams } from "react-router";

import placeService from "../../services/place.service";
import reviewService from "../../services/review.service";
import YourReviews from "../../components/YourReviews";
import Rating from "react-rating";
// var Rating = require();

import { commonStyles } from "../../conts";
const Place = () => {
  const { identifier } = useParams();
  const loggedInUser = useSelector((x) => x.userState.user);
  const [place, setPlace] = useState({ images: [], comments: [], reviews: [] });
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    class: "success",
  });

  const [dp, setDp] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();

  const loadPlace = async () => {
    toggleSpinner(dispatch, true);

    const place = await placeService.getPlaceById(identifier, true);
    console.log("Place ", place);
    setPlace(place);
    if (place.images && place.images.length > 0) {
      setDp(`${process.env.REACT_APP_API_BASE_URL}/uploads/${place.images[0]}`);
    }

    toggleSpinner(dispatch, false);
  };

  const saveReview = async (_identifier, review) => {
    try {
      const result = await reviewService.saveReview(
        _identifier,
        review.rating,
        review.text
      );
    } catch (err) {}
    await loadPlace();
    return true;
  };

  const removeReview = async (reviewId) => {
    try {
      await reviewService.removeReviewById(reviewId);
    } catch (err) {}
    await loadPlace();
  };

  useEffect(async () => {
    addBreadcrumbItems(dispatch, [
      { text: "Home", url: "/" },
      { text: "Place", url: location.pathname },
    ]);
    await loadPlace();
    toggleBreadcrumb(dispatch, true);
  }, []);

  const toggle = async () => {
    let isAddCall = false;
    // let url = `/favourites/remove?identifier=${identifier}&category=place`;
    if (place.is_fav == false) {
      isAddCall = true;
      // url = `/favourites/add?identifier=${identifier}&category=place`;
    }
    let response;
    if (isAddCall) {
      response = await favService.addToFavs(identifier);
    } else {
      response = await favService.removeFromFavs(identifier);
    }
    toggleSpinner(dispatch, false);
    if (response.added) {
      setAlert({
        ...alert,
        class: "success",
        show: true,
        message: "Place added to favourites",
      });
      setPlace({ ...place, is_fav: true });
    } else if (response.deleted) {
      setAlert({
        ...alert,
        class: "danger",
        show: true,
        message: "Place removed from favourites",
      });
      setPlace({ ...place, is_fav: false });
    }
  };

  return (
    <>
      <Alert
        variant={alert.class}
        show={alert.show}
        onClose={() => setAlert({ ...alert, show: false })}
        dismissible
      >
        {alert.message}
      </Alert>

      <h1 style={commonStyles.heading}>
        {place.name}{" "}
        <Button onClick={toggle} style={{ marginBottom: "15px" }}>
          {place.is_fav ? "Remove from Favourites" : "Add To Favourites"}
        </Button>
      </h1>

      <div className="row">
        <div className="col-sm-6 map-container">
          <div dangerouslySetInnerHTML={{ __html: place.location }} />
        </div>
        <div className="col-sm-6">
          {dp && (
            <Figure style={{ minHeight: "400px", height: "400px" }}>
              <Figure.Image
                style={{ height: "100%", width: "100%" }}
                src={dp}
              />
            </Figure>
          )}
        </div>
      </div>

      <div>
        {place.images.map((x) => (
          <Figure
            style={{ marginRight: "5px", height: "100px", width: "100px" }}
            onClick={(ev) => {
              console.log(ev.target.src);
              setDp(ev.target.src);
            }}
          >
            <Figure.Image
              style={{ height: "100%", width: "100%" }}
              src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${x}`}
            />
          </Figure>
        ))}
      </div>
      <div className="row">
        <div className="col-md-12">
          <h4>About</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <p style={{ textAlign: "justify" }}>{place.description}</p>
        </div>

        <div className="col-md-4"></div>
      </div>
      {/* <TravelPackages isLoggedIn={loggedInUser} /> */}

      <YourReviews
        placeId={place._id}
        reviews={place.reviews}
        saveCallback={saveReview}
        removeCallback={removeReview}
      />
    </>
  );
};

export default Place;
