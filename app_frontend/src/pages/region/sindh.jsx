import { useEffect, useState } from "react";
import { Col, Figure, Row, Card } from "react-bootstrap";
import placeservice from "./../../services/placeservice";
import { Link } from "react-router-dom";

export const Sindh = () => {
  const [places, setPlaces] = useState([]);
  useEffect(async () => {
    const rPlaces = await placeservice.getPlacesByRegion("sd");
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

      <h1 style={{ margin: "15px 0px" }}>Sindh</h1>

      <div style={{ textAlign: "justify", textJustify: "inter-word" }}>
        Sindh (Sindhi: سنڌ‎; Urdu: سندھ‎, pronounced [sɪnd̪ʰ];historically
        romanised as Sind) is one of the four provinces of Pakistan. Located in
        the southeast of the country, it is the home of the Sindhi people.[5][6]
        Sindh is the third largest province of Pakistan by area and second
        largest province by population after Punjab. Sindh is bordered by
        Balochistan province to the west and Punjab province to the north. Sindh
        also borders the Indian states of Gujarat and Rajasthan to the east and
        Arabian Sea to the south. Sindh's landscape consists mostly of alluvial
        plains flanking the Indus River, the Thar desert in the eastern portion
        of the province closest to the border with India and the Kirthar
        Mountains in the western part of Sindh.
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
