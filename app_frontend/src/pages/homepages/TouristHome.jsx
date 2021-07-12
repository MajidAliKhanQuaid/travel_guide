import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
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
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  toggleSpinner,
  addBreadcrumbItems,
  toggleBreadcrumb,
  toggleNav,
  toggleSearchButton,
} from "./../../helper";
import { regions } from "../../conts";
import RecentlyViewedPlaces from "../../components/RecentlyViewPlaces";
import recentlyViewedService from "../../services/recentlyviewed.service";
const AnonymousHome = () => {
  const [name, setName] = useState(
    JSON.parse(localStorage.getItem("userInfo")).name
  );
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(async () => {
    const viewedPlaces = await recentlyViewedService.getAll();
    setRecentlyViewed(viewedPlaces);

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

      <SliderComponent
        slides={[
          {
            identifier: uuidv4(),
            imageUrl: "/slider_images/badshahi-mosque.jpg",
            title: "Badshahi Mosque, Lahore",
          },
          {
            identifier: uuidv4(),
            imageUrl: "/slider_images/saif-ul-malook.jpg",
            title: "Saif Ul Malook, Naran",
          },
          {
            identifier: uuidv4(),
            imageUrl: "/slider_images/uch-sharif.jpg",
            title: "Uch Sharif, Bahawalpur",
          },
        ]}
      />

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

      <h1 className="m-5 text-center">
        Explore the beauty of <span className="text-success">Pakistan</span>
      </h1>

      <div
        style={{
          margin: "10px",
          display: "flex",
          flexDirection: "row",
          flexFlow: "flex-wrap",
          flexWrap: "wrap",
          alignContent: "left",
          justifyContent: "left",
        }}
      >
        {regions.map((x, i) => (
          <Link
            style={{ flex: "0 1 30%", margin: "1.6%" }}
            to={x.url}
            className="card-region-link"
            key={"region-cards" + i}
          >
            <Card className="glass card-region" x={x.text}>
              <Card.Img variant="top" src={x.image} />
              <Card.Body>
                <Card.Title className="mb-2 text-center">{x.text}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted text-center">
                  Card Subtitle
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

const SliderComponent = ({ slides }) => {
  return (
    <Carousel>
      {slides.map((x) => (
        <Carousel.Item key={x.identifier}>
          <img className="d-block w-100" src={x.imageUrl} alt={x.title} />
          <Carousel.Caption>
            <h3>{x.title}</h3>
            <p>{"description goes here"}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default AnonymousHome;
