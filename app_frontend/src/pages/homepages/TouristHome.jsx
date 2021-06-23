import { useState } from "react";
import { useEffect } from "react";
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
} from "./../../helper";

const TouristHome = () => {
  const [name, setName] = useState("Nadia Khan");
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    addBreadcrumbItems(dispatch, [
      { text: "Home", url: "/" },
      { text: "Edit Account", url: location.pathname },
    ]);
    toggleBreadcrumb(dispatch, false);
    toggleNav(dispatch, true);
  }, []);

  return (
    <Container>
      <h1>
        Welcome <span className="bg-succces">{name}</span>
      </h1>
      <div className="row">
        <div className="col-md-12">
          <RecentlyViewedPlaces />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h1>Profile Views</h1>
          <ProfileViews />
        </div>
      </div>
    </Container>
  );
};

export default TouristHome;
