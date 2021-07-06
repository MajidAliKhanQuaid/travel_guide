import { useEffect, useState } from "react";
import { Col, Figure, Row, Card, Container } from "react-bootstrap";
import placeservice from "./../../services/place.service";
import { Link } from "react-router-dom";
export const Punjab = () => {
  const [places, setPlaces] = useState([]);
  useEffect(async () => {
    const rPlaces = await placeservice.getPlacesByRegion("pu");
    setPlaces(rPlaces);
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-8">
          <Figure>
            <Figure.Image
              style={{ width: "100%" }}
              alt={`lepa-valley.jpg`}
              src={`${process.env.PUBLIC_URL}/lepa-valley.jpg`}
            />
          </Figure>
        </div>
        <div className="col-md-4 d-none d-lg-block d-md-block">
          <div className="row">
            <div className="col-md-6">
              <Figure>
                <Figure.Image
                  style={{ width: "100%" }}
                  alt={`lepa-valley.jpg`}
                  src={`${process.env.PUBLIC_URL}/lepa-valley.jpg`}
                />
              </Figure>
            </div>
            <div className="col-md-6">
              <Figure>
                <Figure.Image
                  style={{ width: "100%" }}
                  alt={`lepa-valley.jpg`}
                  src={`${process.env.PUBLIC_URL}/lepa-valley.jpg`}
                />
              </Figure>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Figure>
                <Figure.Image
                  style={{ width: "100%" }}
                  alt={`lepa-valley.jpg`}
                  src={`${process.env.PUBLIC_URL}/lepa-valley.jpg`}
                />
              </Figure>
            </div>
            <div className="col-md-6">
              <Figure>
                <Figure.Image
                  style={{ width: "100%" }}
                  alt={`lepa-valley.jpg`}
                  src={`${process.env.PUBLIC_URL}/lepa-valley.jpg`}
                />
              </Figure>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Figure>
                <Figure.Image
                  style={{ width: "100%" }}
                  alt={`lepa-valley.jpg`}
                  src={`${process.env.PUBLIC_URL}/lepa-valley.jpg`}
                />
              </Figure>
            </div>
          </div>
        </div>
      </div>

      <h1 style={{ margin: "15px 0px" }}>Punjab</h1>

      <div style={{ textAlign: "justify", textJustify: "inter-word" }}>
        Punjab (Urdu & Punjabi: پنجاب, romanized: Panjāb (pronounced
        [pənˈdʒaːb]), About this soundlisten (help·info); lit. ' "Five waters"')
        is Pakistan's most populous province, with a population of about
        110,012,442 as of 2017.Forming the bulk of the transnational Punjab
        region of Pakistan and India, it is bordered by the Pakistani provinces
        of Sindh, Balochistan, and Khyber Pakhtunkhwa, the enclave of Islamabad,
        and Pakistan administered Azad Kashmir. It also shares borders with the
        Indian states of Punjab, Rajasthan, and the Indian-administered
        territory of Jammu and Kashmir. The capital is Lahore, a cultural,
        historical, economic and cosmopolitan centre of Pakistan where the
        country's cinema industry, and much of its fashion industry, are based.
        Punjab is also the world's fifth-most populous subnational entity, and
        the most populous outside China or India.
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexFlow: "flex-wrap",
          flexWrap: "wrap",
          justifyContent: "left",
          marginTop: "50px",
        }}
      >
        {places.map((x, y) => (
          // <Card style={{ width: "20rem", flexGrow: "1" }}>
          <Card
            style={{
              flex: "0 1 30%",
              margin: "1.6%",
            }}
            key={x._id}
          >
            <Card.Img
              variant="top"
              src={
                x.images && x.images.length > 0
                  ? `http://localhost:4000/uploads/${x.images[0]}`
                  : ""
              }
            />
            <Card.Body>
              <Card.Title>{x.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Card Subtitle
              </Card.Subtitle>
              <Card.Text>{x.description}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};
