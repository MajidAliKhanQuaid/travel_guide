import { useState } from "react";
import { useEffect } from "react";
import axios from "./../../interceptor";
import {
  Carousel,
  CarouselItem,
  Nav,
  Navbar,
  NavbarBrand,
  NavDropdown,
  Form,
  FormControl,
  Container,
  Card,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import ProfileViews from "../../components/ProfileViews";
import RecentlyViewedPlaces from "../../components/RecentlyViewPlaces";
import {
  toggleSpinner,
  addBreadcrumbItems,
  toggleBreadcrumb,
  toggleNav,
  toggleSearchButton,
} from "./../../helper";
import favService from "../../services/fav.service";
import recentlyViewedService from "../../services/recentlyviewed.service";
const TouristHome = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [favs, setFavs] = useState([]);

  const [name, setName] = useState(
    JSON.parse(localStorage.getItem("userInfo")).name
  );
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(async () => {
    const viewedPlaces = await recentlyViewedService.getAll();
    setRecentlyViewed(viewedPlaces);

    const favPlaces = await favService.getFavs();
    // setFavs(favPlaces);

    addBreadcrumbItems(dispatch, [
      { text: "Home", url: "/" },
      { text: "Edit Account", url: location.pathname },
    ]);

    //toggleNav(dispatch, true);
    toggleSearchButton(dispatch, true);
    toggleBreadcrumb(dispatch, false);
  }, []);

  return (
    <>
      <h1 style={{ margin: "25px 0px" }}>
        <span>Welcome </span>
        <span style={{ color: "#05386b", fontWeight: "bold" }}>
          {name}
        </span>{" "}
        <span style={{ color: "#379683" }}>!!</span>
      </h1>
      <div className="row">
        <div className="col-md-12">
          <RecentlyViewedPlaces places={recentlyViewed} />
        </div>
      </div>
      {/* <div className="row">
        <div className="col-md-12">
          <h1>Profile Views</h1>
          <ProfileViews />
        </div>
      </div> */}
    </>
  );
};

export default TouristHome;
