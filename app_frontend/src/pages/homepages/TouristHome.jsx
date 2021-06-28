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
import favService from "../../services/favservice";
import recentlyViewedService from "../../services/recentlyviewedservice";
const TouristHome = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [favs, setFavs] = useState([]);

  const [name, setName] = useState("??");
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
    <Container>
      <h1>
        Welcome <span className="bg-succces">{name}</span>
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
    </Container>
  );
};

export default TouristHome;
