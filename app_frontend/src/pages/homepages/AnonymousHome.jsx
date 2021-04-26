import { useDispatch, useSelector } from "react-redux";
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
import { useEffect } from "react";
import { toggleNav, toggleSearchButton } from "./../../helper";

const AnonymousHome = () => {
  const dispatch = useDispatch();
  const regions = [
    { url: "/region/balouchistan", text: "Balouchistan", image: "gwadar.jpg" },
    { url: "/region/khyber", text: "Khyber Pakhtunkhwa", image: "kumrat.jpg" },
    { url: "/region/punjab", text: "Punjab", image: "multan.jpg" },
    { url: "/region/sindh", text: "Sindh", image: "darawar.jpg" },
    { url: "/region/gilgit", text: "Gilgit Baltistan", image: "naltar.jpg" },
    { url: "/region/kashmir", text: "Kashmir", image: "lepa-valley.jpg" },
  ];

  useEffect(() => {
    toggleNav(dispatch, true);
    toggleSearchButton(dispatch, true);
  }, []);

  return (
    <>
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
          justifyContent: "center",
        }}
      >
        {regions.map((x, i) => (
          <Link
            to={x.url}
            className="card-region-link"
            key={"region-cards" + i}
          >
            <Card
              className="card-region"
              x={x.text}
              style={{ width: "20rem", margin: "10px" }}
            >
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
