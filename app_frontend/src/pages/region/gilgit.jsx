import { useEffect, useState } from "react";
import { Col, Figure, Row, Card } from "react-bootstrap";
import placeservice from "./../../services/place.service";
import { Link } from "react-router-dom";

export const Gilgit = () => {
  const [places, setPlaces] = useState([]);
  useEffect(async () => {
    const rPlaces = await placeservice.getPlacesByRegion("gt");
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

      <h1 style={{ margin: "15px 0px" }}>Gilgit</h1>

      <div style={{ textAlign: "justify", textJustify: "inter-word" }}>
        Gilgit-Baltistan (Urdu: گِلگِت بَلتِسْتان‎,Balti: རྒྱལ་སྐྱིད་
        སྦལྟི་ཡུལ།[citation needed]), formerly known as the Northern Areas, is a
        region administered by Pakistan as an administrative territory, and
        constitutes the northern portion of the larger Kashmir region, which has
        been the subject of a dispute between India and Pakistan since 1947, and
        between India and China since somewhat later.It is the northernmost area
        administered by Pakistan.It borders Azad Kashmir to the south, the
        province of Khyber Pakhtunkhwa to the west, the Wakhan Corridor of
        Afghanistan to the north, the Xinjiang region of China, to the east and
        northeast, and the Indian-administered union territories Jammu and
        Kashmir and Ladakh to the southeast.
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
