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
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import favService from "../../services/fav.service";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleNav,
  toggleSpinner,
  toggleBreadcrumb,
  addBreadcrumbItems,
  updateLocation,
} from "./../../helper";
import { useParams } from "react-router";

import placeService from "../../services/place.service";
import reviewService from "../../services/review.service";
import YourReviews from "../../components/YourReviews";
import jwt_decode from "jwt-decode";

// var Rating = require();

import { commonStyles } from "../../conts";
import NearbyPlaces from "../../components/NearbyPlaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Place = () => {
  const { identifier } = useParams();
  const [roles, setRoles] = useState([]);
  // const userLocation = useSelector((x) => x.commonState.location);
  const [userLocation, setUserLocation] = useState({ lon: 0, lat: 0 });
  const loggedInUser = useSelector((x) => x.userState.user);
  const [place, setPlace] = useState({
    images: [],
    comments: [],
    reviews: [],
    nearbyPlaces: [],
  });
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    class: "success",
  });

  const [dp, setDp] = useState("");
  // const [loc, setLoc] = useState({});
  const location = useLocation();
  const dispatch = useDispatch();

  const loadPlace = async () => {
    console.log("#2 LOADING PLACE");
    toggleSpinner(dispatch, true);
    let place = await placeService.getPlaceById(identifier, true, userLocation);
    place.location = `<iframe src="https://maps.google.com/maps?q=${place.latitude},${place.longitude}&amp;hl=es;z=15&amp;output=embed"></iframe>`;
    console.log("Place ", place);
    setPlace(place);
    // setLoc({ ...loc, lon: place.longitude, lat: place.latitude });
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
    if (userLocation.lon == 0) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("UPDATED_LOCATION", {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        // update state
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
    console.log("USER LOCATION () ", userLocation);

    addBreadcrumbItems(dispatch, [
      { text: "Home", url: "/" },
      { text: "Place", url: location.pathname },
    ]);

    if (userLocation.lon > 0) {
      await loadPlace();
    }

    toggleBreadcrumb(dispatch, true);

    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      const tokenInfo = jwt_decode(token);
      console.log("Token info ", tokenInfo);
      const userRoles = tokenInfo.roles;
      setRoles(userRoles);
    }
  }, [userLocation]);

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
        {roles.filter((x) => x != "admin").length > 0 && (
          <Button
            onClick={toggle}
            variant={"default"}
            style={{ marginBottom: "15px", outline: "none", boxShadow: "none" }}
          >
            <>
              {place.is_fav ? (
                <FontAwesomeIcon
                  icon={faHeart}
                  color={"red"}
                  style={{ fontSize: "50px" }}
                />
              ) : (
                <FontAwesomeIcon icon={faHeart} style={{ fontSize: "50px" }} />
              )}

              {/* <p>
                {place.is_fav ? "Remove from Favourites" : "Add To Favourites"}
              </p> */}
            </>
          </Button>
        )}
      </h1>

      <div className="row">
        <div className="col-sm-6 map-container">
          {place.longitude && place.latitude ? (
            <div dangerouslySetInnerHTML={{ __html: place.location }} />
          ) : (
            <h1>Lon/Lat not available</h1>
          )}
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

      {roles.filter((x) => x != "admin").length > 0 && (
        <YourReviews
          placeId={place._id}
          reviews={place.reviews}
          saveCallback={saveReview}
          removeCallback={removeReview}
        />
      )}

      <NearbyPlaces places={place.nearbyPlaces} />
    </>
  );
};

export default Place;
